import { NextRequest, NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "sunshine2026";
const SANITY_PROJECT_ID = "rc840ke9";
const SANITY_DATASET = "production";
const SANITY_API_VERSION = "2025-01-01";

async function sanityFetch(query: string) {
  const encoded = encodeURIComponent(query);
  const token = process.env.SANITY_API_WRITE_TOKEN;
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(
    `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${encoded}`,
    { headers, cache: "no-store" }
  );
  if (!res.ok) throw new Error(`Sanity error ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.result ?? [];
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get("x-admin-password");
  if (auth !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  try {
    const [orders, vouchers] = await Promise.all([
      sanityFetch(
        `*[_type == "order"] | order(createdAt desc){
          _id, createdAt, itemName, amount, customerName, customerEmail,
          status, emailSent, paypalOrderId, paypalCaptureId,
          orderType, voucherType, treatmentName, recipientName, giftMessage,
          billingAddress,
          "voucherCode": giftVoucher->code
        }`
      ),
      sanityFetch(
        `*[_type == "giftVoucher"] | order(purchasedAt desc){
          _id, code, voucherType, amount, treatmentName,
          purchaserName, purchaserEmail, recipientName, message,
          status, purchasedAt, expiresAt, paypalCaptureId
        }`
      ),
    ]);

    return NextResponse.json({ orders, vouchers });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: "Sanity query failed", detail: message }, { status: 500 });
  }
}
