import { NextRequest, NextResponse } from "next/server";
import { verifyPayPalWebhookSignature } from "@/lib/paypal";
import { writeClient } from "@/lib/sanityWriteClient";
import { fulfillOrder } from "@/lib/fulfillOrder";

// Backup confirmation path: if a customer's browser closes or loses
// connection right after PayPal approves payment, the client-side
// capture-order call may never complete. PayPal also sends this webhook
// independently, so we use it to fulfill the order server-side even when
// the client never checked back in. fulfillOrder() is idempotent, so it's
// safe if both paths run.
export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  let event: any;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    const verified = await verifyPayPalWebhookSignature({
      headers: req.headers,
      body: event,
    });

    if (!verified) {
      console.error("PayPal webhook signature verification failed");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    if (event.event_type !== "PAYMENT.CAPTURE.COMPLETED") {
      // Acknowledge anything we don't act on so PayPal stops retrying it.
      return NextResponse.json({ received: true });
    }

    const resource = event.resource ?? {};
    const captureId = resource.id;
    const paypalOrderId =
      resource.supplementary_data?.related_ids?.order_id ??
      resource.supplementary_data?.related_ids?.orderId;
    const referenceId = resource.purchase_units?.[0]?.reference_id;

    // Our reference_id set at create-order time IS the Sanity order _id,
    // so we can fulfill directly without a second lookup by paypalOrderId.
    let sanityOrderId = referenceId;

    if (!sanityOrderId && paypalOrderId) {
      const order = await writeClient.fetch(
        `*[_type == "order" && paypalOrderId == $id][0]{ _id }`,
        { id: paypalOrderId }
      );
      sanityOrderId = order?._id;
    }

    if (!sanityOrderId) {
      console.error("PayPal webhook: could not resolve Sanity order", event.resource);
      return NextResponse.json({ received: true });
    }

    await fulfillOrder(sanityOrderId, captureId);

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("PayPal webhook error", err);
    // Return 500 so PayPal retries the webhook later.
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
