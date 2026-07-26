import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/lib/sanityWriteClient";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "sunshine2026";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("x-admin-password");
  if (auth !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const [orders, vouchers] = await Promise.all([
    writeClient.fetch(
      `*[_type == "order"] | order(createdAt desc){
        _id, createdAt, itemName, amount, customerName, customerEmail,
        status, emailSent, paypalOrderId, paypalCaptureId,
        orderType, voucherType, treatmentName, recipientName, giftMessage,
        billingAddress,
        "voucherCode": giftVoucher->code
      }`,
      {},
    ),
    writeClient.fetch(
      `*[_type == "giftVoucher"] | order(purchasedAt desc){
        _id, code, voucherType, amount, treatmentName,
        purchaserName, purchaserEmail, recipientName, message,
        status, purchasedAt, expiresAt, paypalCaptureId
      }`,
      {},
    ),
  ]);

  return NextResponse.json({ orders, vouchers });
}
