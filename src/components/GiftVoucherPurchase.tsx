"use client";

import { useState, useRef } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

type Treatment = { _id: string; name: string; price: string };

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "";

export default function GiftVoucherPurchase({
  treatments,
  initialOpen = false,
  initialVoucherType = "amount",
  initialTreatmentId,
}: {
  treatments: Treatment[];
  initialOpen?: boolean;
  initialVoucherType?: "treatment" | "amount";
  initialTreatmentId?: string;
}) {
  const [open, setOpen] = useState(initialOpen);
  const [voucherType, setVoucherType] = useState<"treatment" | "amount">(
    initialVoucherType
  );
  const [treatmentId, setTreatmentId] = useState(
    initialTreatmentId ?? (treatments[0]?._id ?? "")
  );
  const [amount, setAmount] = useState(100);
  const [purchaserName, setPurchaserName] = useState("");
  const [purchaserEmail, setPurchaserEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successCode, setSuccessCode] = useState<string | null>(null);
  const [orderRef, setOrderRef] = useState<{
    sanityOrderId: string;
    voucherMeta: any;
  } | null>(null);
  const orderRefRef = useRef<{ sanityOrderId: string; voucherMeta: any } | null>(null);

  const canPay = purchaserName.trim() && purchaserEmail.trim();

  if (successCode) {
    return (
      <div className="mt-8 rounded-2xl border border-sage-200 bg-sage-50 p-6 text-center">
        <p className="font-display text-xl text-sage-800">
          Voucher purchased!
        </p>
        <p className="mt-2 text-sm text-ink/70">
          Your gift voucher code is
        </p>
        <p className="mt-1 font-mono text-lg tracking-wide text-sage-700">
          {successCode}
        </p>
        <p className="mt-3 text-sm text-ink/60">
          We&apos;ve also emailed a copy to {purchaserEmail}.
        </p>
      </div>
    );
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="btn-primary mt-8 inline-flex">
        Purchase a Gift Certificate
      </button>
    );
  }

  return (
    <div className="mt-8 rounded-2xl border border-sage-100 bg-white p-6 shadow-sm">
      <div className="flex gap-3 text-sm">
        <button
          className={`rounded-full px-4 py-1.5 border ${
            voucherType === "amount"
              ? "bg-sage-600 text-white border-sage-600"
              : "border-sage-200 text-ink/70"
          }`}
          onClick={() => setVoucherType("amount")}
        >
          Dollar value
        </button>
        <button
          className={`rounded-full px-4 py-1.5 border ${
            voucherType === "treatment"
              ? "bg-sage-600 text-white border-sage-600"
              : "border-sage-200 text-ink/70"
          }`}
          onClick={() => setVoucherType("treatment")}
        >
          Specific treatment
        </button>
      </div>

      <div className="mt-4 grid sm:grid-cols-2 gap-4">
        {voucherType === "amount" ? (
          <label className="text-sm text-ink/70">
            Amount (A$)
            <input
              type="number"
              min={20}
              max={1000}
              step={5}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-sage-200 px-3 py-2"
            />
          </label>
        ) : (
          <label className="text-sm text-ink/70">
            Treatment
            <select
              value={treatmentId}
              onChange={(e) => setTreatmentId(e.target.value)}
              className="mt-1 w-full rounded-lg border border-sage-200 px-3 py-2"
            >
              {treatments.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.name} — {t.price}
                </option>
              ))}
            </select>
          </label>
        )}

        <label className="text-sm text-ink/70">
          Your name
          <input
            type="text"
            value={purchaserName}
            onChange={(e) => setPurchaserName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-sage-200 px-3 py-2"
          />
        </label>

        <label className="text-sm text-ink/70">
          Your email
          <input
            type="email"
            value={purchaserEmail}
            onChange={(e) => setPurchaserEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-sage-200 px-3 py-2"
          />
        </label>

        <label className="text-sm text-ink/70">
          Recipient&apos;s name (optional)
          <input
            type="text"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-sage-200 px-3 py-2"
          />
        </label>

        <label className="text-sm text-ink/70 sm:col-span-2">
          Gift message (optional)
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={2}
            className="mt-1 w-full rounded-lg border border-sage-200 px-3 py-2"
          />
        </label>
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <div className="mt-5">
        {!canPay ? (
          <p className="text-sm text-ink/50">
            Enter your name and email to continue to payment.
          </p>
        ) : !PAYPAL_CLIENT_ID ? (
          <p className="text-sm text-red-600">
            Online payment isn&apos;t configured yet — please call Jane to
            arrange your voucher.
          </p>
        ) : (
          <PayPalScriptProvider
            options={{ clientId: PAYPAL_CLIENT_ID, currency: "AUD" }}
          >
            <PayPalButtons
              style={{ layout: "horizontal", height: 45 }}
              forceReRender={[voucherType, treatmentId, amount, purchaserName, purchaserEmail]}
              createOrder={async () => {
                setError(null);
                const res = await fetch("/api/paypal/create-order", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    voucherType,
                    treatmentId: voucherType === "treatment" ? treatmentId : undefined,
                    amount: voucherType === "amount" ? amount : undefined,
                    purchaserName,
                    purchaserEmail,
                    recipientName,
                    message,
                  }),
                });
                const data = await res.json();
                if (!res.ok) {
                  setError(data.error ?? "Could not start checkout.");
                  throw new Error(data.error ?? "create-order failed");
                }
                const orderData = {
                  sanityOrderId: data.sanityOrderId,
                  voucherMeta: data.voucherMeta,
                };
                orderRefRef.current = orderData;
                setOrderRef(orderData);
                return data.paypalOrderId;
              }}
              onApprove={async (data) => {
                const res = await fetch("/api/paypal/capture-order", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    paypalOrderId: data.orderID,
                    sanityOrderId: orderRefRef.current?.sanityOrderId,
                    voucherMeta: orderRefRef.current?.voucherMeta,
                  }),
                });
                const result = await res.json();
                if (!res.ok) {
                  setError(result.error ?? "Payment could not be completed.");
                  return;
                }
                setSuccessCode(result.code ?? "Sent to your email");
              }}
              onError={() => {
                setError((prev) => prev ?? "Something went wrong with PayPal. Please try again.");
              }}
            />
          </PayPalScriptProvider>
        )}
      </div>
    </div>
  );
}
