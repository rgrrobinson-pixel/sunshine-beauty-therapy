import { NextRequest, NextResponse } from "next/server";
import { createPayPalOrder } from "@/lib/paypal";
import { writeClient } from "@/lib/sanityWriteClient";
import { client as readClient } from "@/sanity/client";

const MIN_VOUCHER_AMOUNT = 20;
const MAX_VOUCHER_AMOUNT = 1000;

export async function POST(req: NextRequest) {
  try {
    console.error("DIAGNOSTIC - PAYPAL_ENV:", JSON.stringify(process.env.PAYPAL_ENV));
    console.error("DIAGNOSTIC - NEXT_PUBLIC_PAYPAL_CLIENT_ID:", process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ? `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID.slice(0, 10)}...${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID.slice(-10)}` : "MISSING");
    console.error("DIAGNOSTIC - PAYPAL_CLIENT_ID:", process.env.PAYPAL_CLIENT_ID ? `${process.env.PAYPAL_CLIENT_ID.slice(0, 10)}...${process.env.PAYPAL_CLIENT_ID.slice(-10)}` : "MISSING");
    console.error("DIAGNOSTIC - PAYPAL_CLIENT_SECRET:", process.env.PAYPAL_CLIENT_SECRET ? `${process.env.PAYPAL_CLIENT_SECRET.slice(0, 5)}...${process.env.PAYPAL_CLIENT_SECRET.slice(-5)}` : "MISSING");
    const body = await req.json();
    const {
      voucherType,
      treatmentId,
      amount,
      purchaserName,
      purchaserEmail,
      recipientName,
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
        return NextResponse.json(
          { error: "Treatment not found" },
          { status: 404 }
        );
      }
      treatmentName = treatment.name;
      treatmentDescription = treatment.description;
      treatmentDuration = treatment.duration;
      // price is stored like "A$99" — extract the number
      finalAmount = parseFloat(String(treatment.price).replace(/[^0-9.]/g, ""));
      itemName = `Gift Voucher — ${treatment.name}`;
    } else if (voucherType === "amount") {
      finalAmount = Number(amount);
      if (
        !Number.isFinite(finalAmount) ||
        finalAmount < MIN_VOUCHER_AMOUNT ||
        finalAmount > MAX_VOUCHER_AMOUNT
      ) {
        return NextResponse.json(
          {
            error: `Amount must be between A$${MIN_VOUCHER_AMOUNT} and A$${MAX_VOUCHER_AMOUNT}`,
          },
          { status: 400 }
        );
      }
      itemName = `Gift Voucher — A$${finalAmount.toFixed(2)}`;
    } else {
      return NextResponse.json(
        { error: "voucherType must be 'treatment' or 'amount'" },
        { status: 400 }
      );
    }

    // Create a pending order record first so we always have a paper trail,
    // even if the buyer never completes payment.
    const orderDoc = await writeClient.create({
      _type: "order",
      orderType: "voucher",
      itemName,
      amount: finalAmount,
      customerName: purchaserName,
      customerEmail: purchaserEmail,
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

    await writeClient
      .patch(orderDoc._id)
      .set({ paypalOrderId: paypalOrder.id })
      .commit();

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
        purchaserEmail,
        recipientName: recipientName ?? null,
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
