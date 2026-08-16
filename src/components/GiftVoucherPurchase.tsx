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
  const [voucherType, setVoucherType] = useState<"treatment" | "amount">(initialVoucherType);
  const [treatmentId, setTreatmentId] = useState(initialTreatmentId ?? (treatments[0]?._id ?? ""));
  const [amount, setAmount] = useState(100);

  // Purchaser fields
  const [purchaserFirstName, setPurchaserFirstName] = useState("");
  const [purchaserLastName, setPurchaserLastName] = useState("");
  const [purchaserEmail, setPurchaserEmail] = useState("");

  // Recipient fields
  const [recipientFirstName, setRecipientFirstName] = useState("");
  const [recipientLastName, setRecipientLastName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [sendToRecipient, setSendToRecipient] = useState(false);

  // Message
  const [message, setMessage] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [successCode, setSuccessCode] = useState<string | null>(null);
  const orderRefRef = useRef<{ sanityOrderId: string; voucherMeta: any } | null>(null);

  const purchaserName = `${purchaserFirstName.trim()} ${purchaserLastName.trim()}`.trim();
  const recipientName = `${recipientFirstName.trim()} ${recipientLastName.trim()}`.trim();
  const canPay = purchaserFirstName.trim() && purchaserLastName.trim() && purchaserEmail.trim();

  if (successCode) {
    return (
      <div className="mt-8 rounded-2xl border border-[#c8d8c8] bg-[#f0f6f0] p-8 text-center">
        <div className="text-[#4d7355] text-4xl mb-3">✓</div>
        <p className="font-serif text-xl text-[#2c4234]">Voucher purchased successfully</p>
        <p className="mt-2 text-sm text-[#5a5850]">Your voucher code is</p>
        <p className="mt-2 font-mono text-2xl font-bold tracking-widest text-[#2c4234] bg-white border border-[#c8d8c8] rounded-xl px-6 py-3 inline-block">
          {successCode}
        </p>
        <div className="mt-4 text-sm text-[#5a5850] space-y-1">
          <p>A copy has been emailed to <strong>{purchaserEmail}</strong>.</p>
          {sendToRecipient && recipientEmail && (
            <p>The voucher has also been sent directly to <strong>{recipientEmail}</strong>.</p>
          )}
        </div>
      </div>
    );
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="mt-8 inline-flex items-center justify-center bg-[#4d7355] hover:bg-[#3d5e44] text-white font-semibold px-7 py-3 rounded-full transition-colors text-sm"
      >
        Purchase a Gift Certificate
      </button>
    );
  }

  return (
    <div className="mt-4 rounded-2xl border border-[#e8e2d9] bg-white p-6 shadow-sm space-y-6">

      {/* Voucher type toggle */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[#8a8880] mb-2">Voucher type</p>
        <div className="flex gap-3 text-sm">
          <button
            className={`rounded-full px-4 py-1.5 border font-medium transition-colors ${
              voucherType === "amount"
                ? "bg-[#4d7355] text-white border-[#4d7355]"
                : "border-[#ddd8ce] text-[#5a5850] hover:border-[#4d7355]"
            }`}
            onClick={() => setVoucherType("amount")}
          >
            Dollar value
          </button>
          <button
            className={`rounded-full px-4 py-1.5 border font-medium transition-colors ${
              voucherType === "treatment"
                ? "bg-[#4d7355] text-white border-[#4d7355]"
                : "border-[#ddd8ce] text-[#5a5850] hover:border-[#4d7355]"
            }`}
            onClick={() => setVoucherType("treatment")}
          >
            Specific treatment
          </button>
        </div>
      </div>

      {/* Amount or treatment */}
      {voucherType === "amount" ? (
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-[#8a8880] mb-1">
            Amount (A$)
          </label>
          <input
            type="number"
            min={20}
            max={1000}
            step={5}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full rounded-lg border border-[#ddd8ce] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4d7355]"
          />
        </div>
      ) : (
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-[#8a8880] mb-1">
            Treatment
          </label>
          <select
            value={treatmentId}
            onChange={(e) => setTreatmentId(e.target.value)}
            className="w-full rounded-lg border border-[#ddd8ce] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4d7355]"
          >
            {treatments.map((t) => (
              <option key={t._id} value={t._id}>
                {t.name} — {t.price}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-[#f0ece6]" />

      {/* Purchaser details */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[#8a8880] mb-3">Your details</p>
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-[#5a5850] mb-1">First name <span className="text-red-400">*</span></label>
            <input
              type="text"
              value={purchaserFirstName}
              onChange={(e) => setPurchaserFirstName(e.target.value)}
              className="w-full rounded-lg border border-[#ddd8ce] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4d7355]"
            />
          </div>
          <div>
            <label className="block text-xs text-[#5a5850] mb-1">Last name <span className="text-red-400">*</span></label>
            <input
              type="text"
              value={purchaserLastName}
              onChange={(e) => setPurchaserLastName(e.target.value)}
              className="w-full rounded-lg border border-[#ddd8ce] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4d7355]"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs text-[#5a5850] mb-1">Your email <span className="text-red-400">*</span></label>
            <input
              type="email"
              value={purchaserEmail}
              onChange={(e) => setPurchaserEmail(e.target.value)}
              placeholder="You will always receive a copy of the voucher"
              className="w-full rounded-lg border border-[#ddd8ce] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4d7355]"
            />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#f0ece6]" />

      {/* Recipient details */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[#8a8880] mb-3">Recipient details</p>
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-[#5a5850] mb-1">Recipient first name</label>
            <input
              type="text"
              value={recipientFirstName}
              onChange={(e) => setRecipientFirstName(e.target.value)}
              className="w-full rounded-lg border border-[#ddd8ce] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4d7355]"
            />
          </div>
          <div>
            <label className="block text-xs text-[#5a5850] mb-1">Recipient last name</label>
            <input
              type="text"
              value={recipientLastName}
              onChange={(e) => setRecipientLastName(e.target.value)}
              className="w-full rounded-lg border border-[#ddd8ce] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4d7355]"
            />
          </div>
        </div>

        {/* Send directly to recipient toggle */}
        <div className="mt-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={sendToRecipient}
              onChange={(e) => setSendToRecipient(e.target.checked)}
              className="mt-0.5 rounded border-[#ddd8ce] text-[#4d7355] focus:ring-[#4d7355]"
            />
            <span className="text-sm text-[#5a5850]">
              Send the voucher directly to the recipient&apos;s email
              <span className="block text-xs text-[#8a8880] mt-0.5">
                You will always receive a copy regardless
              </span>
            </span>
          </label>

          {sendToRecipient && (
            <div className="mt-3">
              <label className="block text-xs text-[#5a5850] mb-1">Recipient email <span className="text-red-400">*</span></label>
              <input
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                className="w-full rounded-lg border border-[#ddd8ce] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4d7355]"
              />
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#f0ece6]" />

      {/* Personal message */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-[#8a8880] mb-1">
          Personal message (optional)
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          placeholder="Add a heartfelt note to appear on the voucher…"
          className="w-full rounded-lg border border-[#ddd8ce] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4d7355]"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      {/* Payment */}
      <div className="border-t border-[#f0ece6] pt-4">
        {!canPay ? (
          <p className="text-sm text-[#8a8880]">
            Please fill in your first name, last name and email to continue.
          </p>
        ) : !PAYPAL_CLIENT_ID ? (
          <p className="text-sm text-red-600">
            Online payment isn&apos;t configured yet — please call Jane to arrange your voucher.
          </p>
        ) : (
          <PayPalScriptProvider options={{ clientId: PAYPAL_CLIENT_ID, currency: "AUD" }}>
            <PayPalButtons
              style={{ layout: "horizontal", height: 45 }}
              forceReRender={[voucherType, treatmentId, amount, purchaserEmail, sendToRecipient]}
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
                    purchaserFirstName: purchaserFirstName.trim(),
                    purchaserLastName: purchaserLastName.trim(),
                    purchaserEmail,
                    recipientName: recipientName || undefined,
                    recipientFirstName: recipientFirstName.trim() || undefined,
                    recipientLastName: recipientLastName.trim() || undefined,
                    recipientEmail: sendToRecipient ? recipientEmail.trim() : undefined,
                    sendToRecipient,
                    message: message.trim() || undefined,
                  }),
                });
                const data = await res.json();
                if (!res.ok) {
                  setError(data.error ?? "Could not start checkout.");
                  throw new Error(data.error ?? "create-order failed");
                }
                orderRefRef.current = {
                  sanityOrderId: data.sanityOrderId,
                  voucherMeta: data.voucherMeta,
                };
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
