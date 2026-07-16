import { writeClient } from "@/lib/sanityWriteClient";
import { generateVoucherCode } from "@/lib/voucherCode";
import { sendVoucherEmail } from "@/lib/email";

/**
 * Marks a Sanity order as completed, issues a gift voucher (if applicable),
 * upserts the customer record, and emails the voucher code.
 *
 * Idempotent: safe to call twice for the same order (e.g. once from the
 * client-side capture request and once from the PayPal webhook racing it).
 */
export async function fulfillOrder(sanityOrderId: string, paypalCaptureId: string, billingAddress?: string) {
  const order = await writeClient.fetch(
    `*[_type == "order" && _id == $id][0]`,
    { id: sanityOrderId }
  );

  if (!order) throw new Error("Order not found in Sanity");

  if (order.status === "completed") {
    if (order.giftVoucher) {
      const existingVoucher = await writeClient.fetch(
        `*[_type == "giftVoucher" && _id == $id][0]{ code }`,
        { id: order.giftVoucher._ref }
      );
      return { order, code: existingVoucher?.code };
    }
    // Already-completed treatment order with no voucher involved.
    return { order, code: undefined };
  }

  let code: string | undefined;

  if (order.orderType === "voucher") {
    // Determine the next sequential number by querying Sanity for the highest number
    const highestVoucher = await writeClient.fetch(
      `*[_type == "giftVoucher" && defined(sequenceNumber)] | order(sequenceNumber desc)[0]{ sequenceNumber }`
    );
    const nextSequenceNumber = highestVoucher?.sequenceNumber 
      ? highestVoucher.sequenceNumber + 1 
      : 1000; // Start sequence at 1000 if none exists yet

    code = `SBT-${nextSequenceNumber}`;
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 3); // 3-year expiry, typical for gift vouchers

    const voucherDoc = await writeClient.create({
      _type: "giftVoucher",
      code,
      sequenceNumber: nextSequenceNumber,
      voucherType: order.voucherType ?? "amount",
      amount: order.amount,
      purchaserName: order.customerName,
      purchaserEmail: order.customerEmail,
      recipientName: order.recipientName,
      message: order.giftMessage,
      treatmentName: order.treatmentName ?? undefined,
      treatmentDescription: order.treatmentDescription ?? undefined,
      treatmentDuration: order.treatmentDuration ?? undefined,
      status: "unredeemed",
      paypalOrderId: order.paypalOrderId,
      paypalCaptureId,
      purchasedAt: new Date().toISOString(),
      expiresAt: expires.toISOString().slice(0, 10),
    });

    await writeClient
      .patch(sanityOrderId)
      .set({
        status: "completed",
        paypalCaptureId,
        billingAddress: billingAddress ?? undefined,
        giftVoucher: { _type: "reference", _ref: voucherDoc._id },
      })
      .commit();
  } else {
    await writeClient
      .patch(sanityOrderId)
      .set({ 
        status: "completed", 
        paypalCaptureId,
        billingAddress: billingAddress ?? undefined,
      })
      .commit();
  }

  // Upsert a lightweight customer record for the admin/customer database view.
  const existingCustomer = await writeClient.fetch(
    `*[_type == "customer" && email == $email][0]`,
    { email: order.customerEmail }
  );

  if (existingCustomer) {
    await writeClient
      .patch(existingCustomer._id)
      .set({ 
        lastPurchaseAt: new Date().toISOString(),
        address: billingAddress ?? existingCustomer.address ?? undefined,
      })
      .inc({ totalSpent: order.amount })
      .commit();
  } else {
    await writeClient.create({
      _type: "customer",
      name: order.customerName,
      email: order.customerEmail,
      address: billingAddress ?? undefined,
      firstPurchaseAt: new Date().toISOString(),
      lastPurchaseAt: new Date().toISOString(),
      totalSpent: order.amount,
    });
  }

  if (code) {
    try {
      await sendVoucherEmail({
        to: order.customerEmail,
        purchaserName: order.customerName,
        recipientName: order.recipientName,
        code,
        itemLabel: order.itemName,
        amount: order.amount,
        message: order.giftMessage,
        treatmentDescription: order.treatmentDescription,
        treatmentDuration: order.treatmentDuration,
      });
      await writeClient.patch(sanityOrderId).set({ emailSent: true }).commit();
    } catch (emailErr) {
      // Payment already succeeded and the voucher is recorded — don't fail
      // the request over email delivery. Jane can resend manually from Studio.
      console.error("Voucher email failed to send", emailErr);
    }
  }

  return { order, code };
}
