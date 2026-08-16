"use client";

import { useState, useEffect, useMemo } from "react";

type Order = {
  _id: string;
  createdAt: string;
  itemName: string;
  amount: number;
  customerName: string;
  customerFirstName?: string;
  customerLastName?: string;
  customerEmail: string;
  status: string;
  emailSent: boolean;
  paypalOrderId?: string;
  paypalCaptureId?: string;
  orderType?: string;
  treatmentName?: string;
  recipientName?: string;
  recipientFirstName?: string;
  recipientLastName?: string;
  recipientEmail?: string;
  sendToRecipient?: boolean;
  giftMessage?: string;
  billingAddress?: string;
  voucherCode?: string;
};

type Voucher = {
  _id: string;
  code: string;
  sequenceNumber?: number;
  voucherType: string;
  amount: number;
  treatmentName?: string;
  purchaserName: string;
  purchaserFirstName?: string;
  purchaserEmail: string;
  recipientName?: string;
  recipientFirstName?: string;
  recipientLastName?: string;
  recipientEmail?: string;
  message?: string;
  status: string;
  purchasedAt: string;
  expiresAt: string;
  paypalCaptureId?: string;
};

const STATUS_COLOURS: Record<string, string> = {
  completed: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  failed: "bg-red-100 text-red-800",
  unredeemed: "bg-blue-100 text-blue-800",
  redeemed: "bg-gray-100 text-gray-600",
  expired: "bg-red-50 text-red-400",
};

function Badge({ status }: { status: string }) {
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${STATUS_COLOURS[status] ?? "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
}

function fmt(dateStr: string) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-AU", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

function fmtAmt(n: number) {
  return `A$${Number(n ?? 0).toFixed(2)}`;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [tab, setTab] = useState<"orders" | "vouchers">("orders");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setAuthError(false);
    try {
      const res = await fetch("/api/admin/data", {
        headers: { "x-admin-password": password },
      });
      if (res.status === 401) { setAuthError(true); setLoading(false); return; }
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert("Dashboard error: " + (err.detail || err.error || "Unknown error. Please try again."));
        setLoading(false);
        return;
      }
      const data = await res.json();
      setOrders(data.orders ?? []);
      setVouchers(data.vouchers ?? []);
      setAuthed(true);
    } catch {
      setAuthError(true);
    }
    setLoading(false);
  }

  const filteredOrders = useMemo(() => {
    const q = search.toLowerCase();
    return orders.filter(o => {
      const matchSearch = !q ||
        o.customerName?.toLowerCase().includes(q) ||
        o.customerFirstName?.toLowerCase().includes(q) ||
        o.customerLastName?.toLowerCase().includes(q) ||
        o.customerEmail?.toLowerCase().includes(q) ||
        o.recipientName?.toLowerCase().includes(q) ||
        o.recipientFirstName?.toLowerCase().includes(q) ||
        o.recipientLastName?.toLowerCase().includes(q) ||
        o.recipientEmail?.toLowerCase().includes(q) ||
        o.itemName?.toLowerCase().includes(q) ||
        o.treatmentName?.toLowerCase().includes(q) ||
        o.voucherCode?.toLowerCase().includes(q) ||
        o.createdAt?.slice(0, 10).includes(q) ||
        o._id?.toLowerCase().includes(q);
      const matchStatus = statusFilter === "all" || o.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [orders, search, statusFilter]);

  const filteredVouchers = useMemo(() => {
    const q = search.toLowerCase();
    return vouchers.filter(v => {
      const matchSearch = !q ||
        v.purchaserName?.toLowerCase().includes(q) ||
        v.purchaserFirstName?.toLowerCase().includes(q) ||
        v.purchaserEmail?.toLowerCase().includes(q) ||
        v.recipientName?.toLowerCase().includes(q) ||
        v.recipientFirstName?.toLowerCase().includes(q) ||
        v.recipientLastName?.toLowerCase().includes(q) ||
        v.recipientEmail?.toLowerCase().includes(q) ||
        v.code?.toLowerCase().includes(q) ||
        String(v.sequenceNumber ?? "").includes(q) ||
        v.treatmentName?.toLowerCase().includes(q) ||
        v.purchasedAt?.slice(0, 10).includes(q);
      const matchStatus = statusFilter === "all" || v.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [vouchers, search, statusFilter]);

  const orderStatuses = ["all", ...Array.from(new Set(orders.map(o => o.status)))];
  const voucherStatuses = ["all", ...Array.from(new Set(vouchers.map(v => v.status)))];

  const totalRevenue = orders
    .filter(o => o.status === "completed")
    .reduce((sum, o) => sum + (o.amount ?? 0), 0);

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#f6f3ee] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-[#e8e2d9] p-10 w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="font-serif text-2xl text-[#2c4234]">Sunshine Beauty</h1>
            <p className="text-sm text-[#8a8880] mt-1 tracking-widest uppercase">Admin</p>
          </div>
          <form onSubmit={login} className="space-y-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border border-[#ddd8ce] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#4d7355]"
              autoFocus
            />
            {authError && <p className="text-red-500 text-sm">Incorrect password — please try again</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#4d7355] hover:bg-[#3d5e44] text-white rounded-lg py-3 text-sm font-medium transition-colors"
            >
              {loading ? "Checking…" : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f3ee]">
      {/* Header */}
      <div className="bg-white border-b border-[#e8e2d9] px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-xl text-[#2c4234]">Sunshine Beauty Therapy</h1>
          <p className="text-xs text-[#8a8880] tracking-widest uppercase mt-0.5">Admin Dashboard</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-[#8a8880]">Total revenue (completed)</p>
          <p className="font-serif text-xl text-[#2c4234]">{fmtAmt(totalRevenue)}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total orders", value: orders.length },
            { label: "Completed", value: orders.filter(o => o.status === "completed").length },
            { label: "Pending", value: orders.filter(o => o.status === "pending").length },
            { label: "Gift vouchers", value: vouchers.length },
          ].map(card => (
            <div key={card.label} className="bg-white rounded-xl border border-[#e8e2d9] px-5 py-4">
              <p className="text-xs text-[#8a8880] uppercase tracking-widest">{card.label}</p>
              <p className="font-serif text-3xl text-[#2c4234] mt-1">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-5">
          {(["orders", "vouchers"] as const).map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); setSearch(""); setStatusFilter("all"); }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                tab === t
                  ? "bg-[#4d7355] text-white"
                  : "bg-white text-[#4d7355] border border-[#4d7355]"
              }`}
            >
              {t} ({t === "orders" ? orders.length : vouchers.length})
            </button>
          ))}
        </div>

        {/* Search + filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <input
            type="text"
            placeholder={tab === "orders" ? "Search by sender, recipient, email, voucher code, date (YYYY-MM-DD)…" : "Search by sender, recipient, email, code, voucher #, date…"}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 border border-[#ddd8ce] rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#4d7355]"
          />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="border border-[#ddd8ce] rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#4d7355]"
          >
            {(tab === "orders" ? orderStatuses : voucherStatuses).map(s => (
              <option key={s} value={s}>{s === "all" ? "All statuses" : s}</option>
            ))}
          </select>
        </div>

        {/* Orders table */}
        {tab === "orders" && (
          <div className="bg-white rounded-xl border border-[#e8e2d9] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#f6f3ee] border-b border-[#e8e2d9]">
                  <tr>
                    {["Date", "Customer", "Email", "Item", "Amount", "Status", "Voucher code", "Email sent", ""].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#8a8880] uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0ece6]">
                  {filteredOrders.length === 0 && (
                    <tr><td colSpan={9} className="px-4 py-8 text-center text-[#8a8880]">No orders found</td></tr>
                  )}
                  {filteredOrders.map(o => (
                    <>
                      <tr key={o._id} className="hover:bg-[#faf8f5] cursor-pointer" onClick={() => setExpanded(expanded === o._id ? null : o._id)}>
                        <td className="px-4 py-3 whitespace-nowrap">{fmt(o.createdAt)}</td>
                        <td className="px-4 py-3 font-medium text-[#2c4234] whitespace-nowrap">{o.customerName}</td>
                        <td className="px-4 py-3 text-[#8a8880] whitespace-nowrap">{o.customerEmail}</td>
                        <td className="px-4 py-3 max-w-[200px] truncate">{o.itemName}</td>
                        <td className="px-4 py-3 font-medium whitespace-nowrap">{fmtAmt(o.amount)}</td>
                        <td className="px-4 py-3"><Badge status={o.status} /></td>
                        <td className="px-4 py-3 font-mono text-xs">{o.voucherCode ?? "—"}</td>
                        <td className="px-4 py-3">{o.emailSent ? <span className="text-green-600">✓</span> : <span className="text-[#8a8880]">—</span>}</td>
                        <td className="px-4 py-3 text-[#8a8880] text-xs">{expanded === o._id ? "▲" : "▼"}</td>
                      </tr>
                      {expanded === o._id && (
                        <tr key={o._id + "-detail"}>
                          <td colSpan={9} className="bg-[#faf8f5] px-6 py-4 border-b border-[#e8e2d9]">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-[#5a5850]">
                              <div><span className="font-semibold text-[#8a8880] uppercase tracking-wider">Recipient name</span><p className="mt-1">{o.recipientName ?? "—"}</p></div>
                              <div><span className="font-semibold text-[#8a8880] uppercase tracking-wider">Recipient email</span><p className="mt-1">{o.recipientEmail ?? "—"}</p></div>
                              <div><span className="font-semibold text-[#8a8880] uppercase tracking-wider">Sent to recipient</span><p className="mt-1">{o.sendToRecipient ? "Yes" : "No — buyer only"}</p></div>
                              <div><span className="font-semibold text-[#8a8880] uppercase tracking-wider">Gift message</span><p className="mt-1 italic">{o.giftMessage ?? "—"}</p></div>
                              <div><span className="font-semibold text-[#8a8880] uppercase tracking-wider">Billing address</span><p className="mt-1">{o.billingAddress ?? "—"}</p></div>
                              <div><span className="font-semibold text-[#8a8880] uppercase tracking-wider">PayPal order ID</span><p className="mt-1 font-mono break-all">{o.paypalOrderId ?? "—"}</p></div>
                              <div><span className="font-semibold text-[#8a8880] uppercase tracking-wider">PayPal capture ID</span><p className="mt-1 font-mono break-all">{o.paypalCaptureId ?? "—"}</p></div>
                              <div><span className="font-semibold text-[#8a8880] uppercase tracking-wider">Sanity ID</span><p className="mt-1 font-mono break-all">{o._id}</p></div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Vouchers table */}
        {tab === "vouchers" && (
          <div className="bg-white rounded-xl border border-[#e8e2d9] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#f6f3ee] border-b border-[#e8e2d9]">
                  <tr>
                    {["Code", "Type", "Value", "Purchaser", "Email", "Recipient", "Status", "Purchased", "Expires", ""].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#8a8880] uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0ece6]">
                  {filteredVouchers.length === 0 && (
                    <tr><td colSpan={10} className="px-4 py-8 text-center text-[#8a8880]">No vouchers found</td></tr>
                  )}
                  {filteredVouchers.map(v => (
                    <>
                      <tr key={v._id} className="hover:bg-[#faf8f5] cursor-pointer" onClick={() => setExpanded(expanded === v._id ? null : v._id)}>
                        <td className="px-4 py-3 font-mono font-bold text-[#4d7355]">{v.code}</td>
                        <td className="px-4 py-3 capitalize whitespace-nowrap">{v.voucherType === "amount" ? "Dollar value" : "Treatment"}</td>
                        <td className="px-4 py-3 font-medium whitespace-nowrap">
                          {v.voucherType === "treatment" ? (v.treatmentName ?? "—") : fmtAmt(v.amount)}
                        </td>
                        <td className="px-4 py-3 font-medium text-[#2c4234] whitespace-nowrap">{v.purchaserName}</td>
                        <td className="px-4 py-3 text-[#8a8880] whitespace-nowrap">{v.purchaserEmail}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{v.recipientName ?? "—"}</td>
                        <td className="px-4 py-3"><Badge status={v.status} /></td>
                        <td className="px-4 py-3 whitespace-nowrap">{fmt(v.purchasedAt)}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{fmt(v.expiresAt)}</td>
                        <td className="px-4 py-3 text-[#8a8880] text-xs">{expanded === v._id ? "▲" : "▼"}</td>
                      </tr>
                      {expanded === v._id && (
                        <tr key={v._id + "-detail"}>
                          <td colSpan={10} className="bg-[#faf8f5] px-6 py-4 border-b border-[#e8e2d9]">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-[#5a5850]">
                              <div><span className="font-semibold text-[#8a8880] uppercase tracking-wider">Recipient email</span><p className="mt-1">{v.recipientEmail ?? "—"}</p></div>
                              <div><span className="font-semibold text-[#8a8880] uppercase tracking-wider">Gift message</span><p className="mt-1 italic">{v.message ?? "—"}</p></div>
                              <div><span className="font-semibold text-[#8a8880] uppercase tracking-wider">Voucher #</span><p className="mt-1 font-mono">{v.sequenceNumber ?? "—"}</p></div>
                              <div><span className="font-semibold text-[#8a8880] uppercase tracking-wider">PayPal capture ID</span><p className="mt-1 font-mono break-all">{v.paypalCaptureId ?? "—"}</p></div>
                              <div><span className="font-semibold text-[#8a8880] uppercase tracking-wider">Sanity ID</span><p className="mt-1 font-mono break-all">{v._id}</p></div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
