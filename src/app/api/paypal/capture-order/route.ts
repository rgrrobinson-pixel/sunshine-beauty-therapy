import { NextRequest, NextResponse } from "next/server";
import { capturePayPalOrder } from "@/lib/paypal";
import { writeClient } from "@/lib/sanityWriteClient";
import { fulfillOrder } from "@/lib/fulfillOrder";

export async function POST(req: NextRequest) {
  try {
    const { paypalOrderId, sanityOrderId, voucherMeta } = await req.json();

    let actualSanityOrderId = sanityOrderId;
    if (!actualSanityOrderId && paypalOrderId) {
      console.log("DIAGNOSTIC - sanityOrderId was missing, looking up by paypalOrderId:", paypalOrderId);
      const order = await writeClient.fetch(
        `*[_type == "order" && paypalOrderId == $id][0]`,
        { id: paypalOrderId }
      );
      if (order) {
        actualSanityOrderId = order._id;
        console.log("DIAGNOSTIC - Found matching order in Sanity:", actualSanityOrderId);
      }
    }

    if (!paypalOrderId || !actualSanityOrderId) {
      console.error("DIAGNOSTIC - Missing order reference. paypalOrderId:", paypalOrderId, "actualSanityOrderId:", actualSanityOrderId);
      return NextResponse.json(
        { error: "Missing order reference" },
        { status: 400 }
      );
    }

    // Persist the recipient/message details captured at create-order time,
    // since PayPal's capture response doesn't carry them.
    if (voucherMeta) {
      await writeClient
        .patch(actualSanityOrderId)
        .set({
          recipientName: voucherMeta.recipientName ?? undefined,
          giftMessage: voucherMeta.message ?? undefined,
          voucherType: voucherMeta.voucherType ?? undefined,
        })
        .commit();
    }

    const capture = await capturePayPalOrder(paypalOrderId);
    const captureStatus =
      capture?.purchase_units?.[0]?.payments?.captures?.[0]?.status;
    const captureId = capture?.purchase_units?.[0]?.payments?.captures?.[0]?.id;

    if (capture.status !== "COMPLETED" || captureStatus !== "COMPLETED") {
      await writeClient
        .patch(actualSanityOrderId)
        .set({ status: "failed" })
        .commit();
      return NextResponse.json(
        { error: "Payment was not completed" },
        { status: 402 }
      );
    }

    // Extract billing or shipping address from PayPal capture payload
    const paypalPayer = capture?.payer;
    const paypalShipping = capture?.purchase_units?.[0]?.shipping;
    const addressObj = paypalShipping?.address ?? paypalPayer?.address;

    let formattedAddress: string | undefined;
    if (addressObj) {
      const parts = [
        addressObj.address_line_1,
        addressObj.address_line_2,
        addressObj.admin_area_2,
        addressObj.admin_area_1,
        addressObj.postal_code,
        addressObj.country_code,
      ].filter(Boolean);
      if (parts.length > 0) {
        formattedAddress = parts.join(", ");
      }
    }

    const { code } = await fulfillOrder(actualSanityOrderId, captureId, formattedAddress);

    return NextResponse.json({ success: true, code });
  } catch (err) {
    console.error("capture-order error", err);
    return NextResponse.json(
      { error: "Could not complete payment. Please contact Jane directly." },
      { status: 500 }
    );
  }
}
