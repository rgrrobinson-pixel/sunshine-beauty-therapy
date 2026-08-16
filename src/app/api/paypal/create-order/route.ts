import { NextRequest, NextResponse } from "next/server";
import { createPayPalOrder } from "@/lib/paypal";
import { writeClient } from "@/lib/sanityWriteClient";
import { client as readClient } from "@/sanity/client";

const MIN_VOUCHER_AMOUNT = 20;
const MAX_VOUCHER_AMOUNT = 1000;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      voucherType,
      treatmentId,
      amount,
      purchaserName,
      purchaserFirstName,
      purchaserLastName,
      purchaserEmail,
      recipientName,
      recipientFirstName,
      recipientLastName,
      recipientEmail,
      sendToRecipient,
      message,
    } = body ?? {};

    if (!purchaserName || !purchaserEmail) {
      return NextResponse.json(
        { error: "Purchaser name and email are required" },
        { status: 400 }
      );
    }

    let finalAmount: number;
    let itemName: string;
    let treatmentName: string | undefined;
    let treatmentDescription: string | undefined;
    let treatmentDuration: string | undefined;

    if (voucherType === "treatment") {
      const treatment = await readClient.fetch(
        `*[_type == "treatment" && _id == $id][0]{ name, price, description, duration }`,
        { id: treatmentId },
        { cache: "no-store" }
      );
      if (!treatment) {
        return NextResponse.json({ error: "Treatment not found" }, { status: 404 });
      }
      treatmentName = treatment.name;
      treatmentDescription = treatment.description;
      treatmentDuration = treatment.duration;
      finalAmount = parseFloat(String(treatment.price).replace(/[^0-9.]/g, ""));
      itemName = `Gift Voucher — ${treatment.name}`;
    } else if (voucherType === "amount") {
      finalAmount = Number(amount);
      if (!Number.isFinite(finalAmount) || finalAmount < MIN_VOUCHER_AMOUNT || finalAmount > MAX_VOUCHER_AMOUNT) {
        return NextResponse.json(
          { error: `Amount must be between A$${MIN_VOUCHER_AMOUNT} and A$${MAX_VOUCHER_AMOUNT}` },
          { status: 400 }
        );
      }
      itemName = `Gift Voucher — A$${finalAmount.toFixed(2)}`;
    } else {
      return NextResponse.json({ error: "voucherType must be 'treatment' or 'amount'" }, { status: 400 });
    }

    // Create pending order record — paper trail even if buyer abandons
    const orderDoc = await writeClient.create({
      _type: "order",
      orderType: "voucher",
      itemName,
      amount: finalAmount,
      customerName: purchaserName,
      customerFirstName: purchaserFirstName ?? undefined,
      customerLastName: purchaserLastName ?? undefined,
      customerEmail: purchaserEmail,
      recipientName: recipientName ?? undefined,
      recipientFirstName: recipientFirstName ?? undefined,
      recipientLastName: recipientLastName ?? undefined,
      recipientEmail: sendToRecipient ? (recipientEmail ?? undefined) : undefined,
      sendToRecipient: sendToRecipient ?? false,
      giftMessage: message ?? undefined,
      treatmentName,
      treatmentDescription,
      treatmentDuration,
      status: "pending",
      emailSent: false,
      createdAt: new Date().toISOString(),
    });

    const paypalOrder = await createPayPalOrder({
      amount: finalAmount,
      currency: "AUD",
      description: itemName,
      referenceId: orderDoc._id,
    });

    await writeClient.patch(orderDoc._id).set({ paypalOrderId: paypalOrder.id }).commit();

    return NextResponse.json({
      paypalOrderId: paypalOrder.id,
      sanityOrderId: orderDoc._id,
      voucherMeta: {
        voucherType,
        treatmentId: treatmentId ?? null,
        treatmentName: treatmentName ?? null,
        treatmentDescription: treatmentDescription ?? null,
        treatmentDuration: treatmentDuration ?? null,
        amount: finalAmount,
        purchaserName,
        purchaserFirstName: purchaserFirstName ?? null,
        purchaserLastName: purchaserLastName ?? null,
        purchaserEmail,
        recipientName: recipientName ?? null,
        recipientFirstName: recipientFirstName ?? null,
        recipientLastName: recipientLastName ?? null,
        recipientEmail: sendToRecipient ? (recipientEmail ?? null) : null,
        sendToRecipient: sendToRecipient ?? false,
        message: message ?? null,
      },
    });
  } catch (err) {
    console.error("create-order error", err);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 500 }
    );
  }
}
