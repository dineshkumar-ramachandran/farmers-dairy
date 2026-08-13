import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { inr } from "@/lib/products";
import { listAdminOrders, updateAdminOrderStatus } from "@/lib/orders.server";
import type { AdminOrder as ApiAdminOrder } from "@/lib/order-types";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Orders Dashboard — Farmer's Dairy" },
      {
        name: "description",
        content: "Internal orders dashboard for Farmer's Dairy staff.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Orders Dashboard — Farmer's Dairy" },
      {
        property: "og:description",
        content: "Internal orders dashboard for Farmer's Dairy staff.",
      },
    ],
  }),
  component: Admin,
});

type AdminOrder = ApiAdminOrder;

const AUTH_KEY = "fd_admin_pass";

function Admin() {
  const [pass, setPass] = useState<string>("");
  const [authed, setAuthed] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [payment, setPayment] = useState("all");
  const [status, setStatus] = useState("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [open, setOpen] = useState<AdminOrder | null>(null);

  // Load stored passphrase on first mount (avoids re-typing on refresh)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.sessionStorage.getItem(AUTH_KEY);
    if (stored) setAuthed(stored);
  }, []);

  const fetchOrders = useCallback(async (token: string) => {
    setLoading(true);
    setLoadError("");
    try {
      const data = await listAdminOrders({ data: { passphrase: token } });
      if (!data.success) {
        setLoadError(data.error || "Failed to load orders");
        if (data.error === "Unauthorized") {
          setAuthed(null);
          window.sessionStorage.removeItem(AUTH_KEY);
        }
        setOrders([]);
        return;
      }
      setOrders(data.orders);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : "Network error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authed) void fetchOrders(authed);
  }, [authed, fetchOrders]);

  const filtered = useMemo(
    () =>
      orders.filter((o) => {
        if (payment !== "all" && o.paymentMethod !== payment) return false;
        if (status !== "all" && o.status !== status) return false;
        const d = (o.createdAt || "").slice(0, 10);
        if (from && d < from) return false;
        if (to && d > to) return false;
        return true;
      }),
    [orders, payment, status, from, to],
  );

  const exportCsv = () => {
    const rows = [
      ["Date", "Order", "Customer", "Phone", "Items", "Total", "Payment", "Status"],
      ...filtered.map((o) => [
        new Date(o.createdAt).toLocaleString("en-IN"),
        o.id,
        o.address["fullName"] ?? "",
        o.address["phone"] ?? "",
        o.items.map((i) => `${i.quantity}x ${i.name}`).join("; "),
        String(o.total),
        o.paymentMethod,
        o.status,
      ]),
    ];
    const csv = rows
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "farmers-dairy-orders.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const mark = async (orderId: string, next: string) => {
    if (!authed) return;
    const res = await updateAdminOrderStatus({
      data: { passphrase: authed, orderId, status: next },
    });
    if (!res.success) {
      setLoadError(res.error || "Update failed");
      return;
    }
    await fetchOrders(authed);
    setOpen(null);
  };

  if (!authed) {
    return (
      <div className="mx-auto max-w-sm px-6 py-28">
        <h1 className="display-hero text-3xl">Admin</h1>
        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!pass) return;
            window.sessionStorage.setItem(AUTH_KEY, pass);
            setAuthed(pass);
          }}
        >
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Passphrase"
            className="h-12 w-full rounded-xl border border-green/20 bg-card px-4 outline-none focus:border-green"
            autoComplete="current-password"
          />
          <button className="btn btn-primary w-full" type="submit">
            Unlock
          </button>
          {loadError && <p className="text-sm text-destructive">{loadError}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="eyebrow">Admin</span>
          <h1 className="display-hero mt-5 text-4xl">Orders</h1>
        </div>
        <button
          className="text-xs uppercase tracking-[0.16em] text-green underline"
          onClick={() => {
            window.sessionStorage.removeItem(AUTH_KEY);
            setAuthed(null);
          }}
        >
          Sign out
        </button>
      </div>

      <div className="mt-8 flex flex-wrap items-end gap-3">
        <label className="text-xs uppercase tracking-[0.16em] text-green">
          From
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="mt-1 block h-11 rounded-xl border border-green/20 bg-card px-3"
          />
        </label>
        <label className="text-xs uppercase tracking-[0.16em] text-green">
          To
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="mt-1 block h-11 rounded-xl border border-green/20 bg-card px-3"
          />
        </label>
        <select
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
          className="h-11 rounded-xl border border-green/20 bg-card px-3"
          aria-label="Filter by payment method"
        >
          <option value="all">All payments</option>
          <option value="Razorpay">Razorpay</option>
          <option value="Cash on Delivery">Cash on Delivery</option>
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-11 rounded-xl border border-green/20 bg-card px-3"
          aria-label="Filter by status"
        >
          <option value="all">All statuses</option>
          <option value="Confirmed">Confirmed</option>
          <option value="paid">Paid</option>
          <option value="cod_pending">COD pending</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button className="btn btn-secondary" onClick={exportCsv}>
          Export CSV
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => authed && fetchOrders(authed)}
          disabled={loading}
        >
          {loading ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      {loadError && (
        <p className="mt-6 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {loadError}
        </p>
      )}

      {filtered.length === 0 && !loading ? (
        <p className="mt-12 text-text/70">No orders yet.</p>
      ) : (
        <div className="mt-10 space-y-3">
          {filtered.map((o) => (
            <button
              key={o.id}
              onClick={() => setOpen(o)}
              className="card-fd grid w-full gap-2 p-5 text-left md:grid-cols-7 md:items-center"
            >
              <span className="text-sm">
                {new Date(o.createdAt).toLocaleDateString("en-IN")}
              </span>
              <span className="font-display font-bold text-green-deep">
                {o.address["fullName"]}
              </span>
              <span className="text-sm">{o.address["phone"]}</span>
              <span className="text-sm text-text/75 md:col-span-2">
                {o.items.map((i) => `${i.quantity}× ${i.name}`).join(", ")}
              </span>
              <span className="font-semibold">{inr(o.total)}</span>
              <span className="chip w-fit">{o.status}</span>
            </button>
          ))}
        </div>
      )}

      {open && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-green-deep/40"
          onClick={() => setOpen(null)}
        >
          <div
            className="h-full w-full max-w-md overflow-y-auto bg-card p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-display text-2xl">Order {open.id}</h2>
            <p className="mt-1 text-sm text-text/70">
              {new Date(open.createdAt).toLocaleString("en-IN")} · {open.paymentMethod}
            </p>
            <div className="rule mt-6 pt-6 text-sm">
              <p className="font-semibold text-green-deep">{open.address["fullName"]}</p>
              <p>{open.address["phone"]}</p>
              <p>{open.address["email"]}</p>
              <p className="mt-2">
                {[
                  open.address["house"],
                  open.address["street"],
                  open.address["landmark"],
                  open.address["city"],
                  open.address["pincode"],
                  open.address["state"],
                ]
                  .filter(Boolean)
                  .join(", ")}
              </p>
              {open.address["specialInstructions"] && (
                <p className="mt-3 rounded-xl bg-butter/20 p-3 text-xs text-green-deep">
                  Note: {open.address["specialInstructions"]}
                </p>
              )}
            </div>
            <ul className="rule mt-6 space-y-3 pt-6 text-sm">
              {open.items.map((i, idx) => (
                <li key={i.key ?? idx} className="flex justify-between gap-4">
                  <span>
                    {i.quantity} × {i.name} {i.variant ? `(${i.variant})` : ""}
                    {i.days && i.days > 1 ? ` · ${i.days} days` : ""}
                  </span>
                  <span>{inr(i.unitPrice * i.quantity * (i.days || 1))}</span>
                </li>
              ))}
            </ul>
            <p className="rule mt-6 flex justify-between pt-4 font-display text-lg font-bold text-green-deep">
              <span>Total</span>
              <span>{inr(open.total)}</span>
            </p>
            <div className="mt-8 flex gap-3">
              <button
                className="btn btn-primary flex-1"
                onClick={() => mark(open.id, "delivered")}
              >
                Delivered
              </button>
              <button
                className="btn btn-secondary flex-1"
                onClick={() => mark(open.id, "cancelled")}
              >
                Cancelled
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
