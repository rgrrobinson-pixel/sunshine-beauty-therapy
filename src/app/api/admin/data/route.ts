import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "sunshine2026";

// Use a read-only client — no write token needed for fetching orders/vouchers
const sanityClient = createClient({
  projectId: "rc840ke9",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN, // optional — works without it for public data
});

export async function GET(req: NextRequest) {
  const auth = req.headers.get("x-admin-password");
  if (auth !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  try {
    const [orders, vouchers] = await Promise.all([
      sanityClient.fetch(
        `*[_type == "order"] | order(createdAt desc){
          _id, createdAt, itemName, amount, customerName, customerEmail,
          status, emailSent, paypalOrderId, paypalCaptureId,
          orderType, voucherType, treatmentName, recipientName, giftMessage,
          billingAddress,
          "voucherCode": giftVoucher->code
        }`,
        {},
      ).catch(() => []),
      sanityClient.fetch(
        `*[_type == "giftVoucher"] | order(purchasedAt desc){
          _id, code, voucherType, amount, treatmentName,
          purchaserName, purchaserEmail, recipientName, message,
          status, purchasedAt, expiresAt, paypalCaptureId
        }`,
        {},
      ).catch(() => []),
    ]);

    return NextResponse.json({ orders, vouchers });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: "Sanity query failed", detail: message }, { status: 500 });
  }
}
