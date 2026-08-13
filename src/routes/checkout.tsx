import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { saveOrder, shippingFor, useCart, type CartItem } from "@/lib/cart";
import { inr } from "@/lib/products";
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "@/lib/razorpay.server";
import { saveOrderToDb } from "@/lib/orders.server";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Farmer's Dairy" },
      { name: "description", content: "Enter your delivery address and complete your order." },
      { property: "og:title", content: "Checkout — Farmer's Dairy" },
      { property: "og:description", content: "Enter your delivery address and complete your order." },
    ],
  }),
  component: Checkout,
});

type Fields = {
  fullName: string;
  phone: string;
  email: string;
  house: string;
  street: string;
  landmark: string;
  city: string;
  pincode: string;
  state: string;
  specialInstructions: string;
};

const initial: Fields = {
  fullName: "",
  phone: "",
  email: "",
  house: "",
  street: "",
  landmark: "",
  city: "Hosur",
  pincode: "",
  state: "Tamil Nadu",
  specialInstructions: "",
};

function validate(f: Fields) {
  const e: Partial<Record<keyof Fields, string>> = {};
  if (!f.fullName.trim()) e.fullName = "Enter your full name";
  if (!/^\d{10}$/.test(f.phone)) e.phone = "Enter a valid 10 digit phone number";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email)) e.email = "Enter a valid email address";
  if (!f.house.trim()) e.house = "Enter your house or flat";
  if (!f.street.trim()) e.street = "Enter your street";
  if (!f.city.trim()) e.city = "Enter your city";
  if (!/^\d{6}$/.test(f.pincode)) e.pincode = "Enter a valid 6 digit pincode";
  if (!f.state.trim()) e.state = "Enter your state";
  return e;
}

// Lazy-load Razorpay checkout.js from the CDN once and cache the promise.
let razorpayLoader: Promise<boolean> | null = null;
function loadRazorpay(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if ((window as unknown as { Razorpay?: unknown }).Razorpay) return Promise.resolve(true);
  if (razorpayLoader) return razorpayLoader;
  razorpayLoader = new Promise((resolve) => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.async = true;
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
  return razorpayLoader;
}

type RazorpayHandlerArgs = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type OrderPayload = {
  orderId: string;
  customerDetails: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
    specialInstructions: string;
  };
  orderDetails: string;
  totalAmount: number;
  paymentMethod: "Razorpay" | "Cash on Delivery";
  orderDate: string;
  status: string;
  items: CartItem[];
  razorpayPaymentId?: string | null;
};

function buildAddressLine(f: Fields): string {
  return [f.house, f.street, f.landmark].filter(Boolean).join(", ");
}

function itemsSummary(items: CartItem[]): string {
  return items
    .map((i) =>
      `${i.quantity} × ${i.name}${i.variant ? ` (${i.variant})` : ""}${
        i.days && i.days > 1 ? ` · ${i.days} days` : ""
      }`,
    )
    .join("; ");
}

async function persistOrder(payload: OrderPayload): Promise<void> {
  const res = await saveOrderToDb({ data: payload });
  if (!res.success) throw new Error(res.error ?? "Order save failed");
  // Also keep a local copy so /order-confirmation can show details without
  // a second server round-trip.
  saveOrder({
    id: payload.orderId,
    createdAt: payload.orderDate,
    items: payload.items,
    address: payload.customerDetails as unknown as Record<string, string>,
    subtotal: payload.totalAmount,
    shipping: 0,
    total: payload.totalAmount,
    paymentMethod: payload.paymentMethod,
    status: payload.status,
  });
}

function Checkout() {
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<"address" | "payment">("address");
  const [fields, setFields] = useState<Fields>(initial);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const errors = validate(fields);
  const valid = Object.keys(errors).length === 0;
  const subtotal = getTotalPrice();
  const shipping = shippingFor(fields.pincode);
  const total = subtotal + (shipping ?? 0);
  const codAllowed = items.every((i) => i.slug === "sample-pack");

  const set = (k: keyof Fields, v: string) => setFields((p) => ({ ...p, [k]: v }));

  // Warm up Razorpay script as soon as user opens the payment step
  useEffect(() => {
    if (step === "payment") void loadRazorpay();
  }, [step]);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-28 text-center">
        <h1 className="display-hero text-4xl">Your cart is empty</h1>
        <Link to="/shop" className="btn btn-primary mt-8">
          Explore products
        </Link>
      </div>
    );
  }

  const buildPayload = (
    id: string,
    method: OrderPayload["paymentMethod"],
    status: string,
    razorpayPaymentId: string | null,
  ): OrderPayload => ({
    orderId: id,
    customerDetails: {
      name: fields.fullName,
      email: fields.email,
      phone: fields.phone,
      address: buildAddressLine(fields),
      city: fields.city,
      pincode: fields.pincode,
      specialInstructions: fields.specialInstructions,
    },
    orderDetails: itemsSummary(items),
    totalAmount: total,
    paymentMethod: method,
    orderDate: new Date().toISOString(),
    status,
    items,
    razorpayPaymentId,
  });

  const place = async (method: "razorpay" | "cod") => {
    setError("");
    setBusy(true);
    try {
      const id = `FD${Date.now().toString().slice(-8)}`;

      if (method === "cod") {
        await persistOrder(buildPayload(id, "Cash on Delivery", "cod_pending", null));
        clearCart();
        toast.success("Order placed — pay on delivery");
        navigate({ to: "/order-confirmation", search: { id } });
        return;
      }

      // Razorpay path
      const created = await createRazorpayOrder({
        data: { amount: Math.round(total * 100), receipt: id },
      }).catch((err: unknown) => ({
        success: false as const,
        error: err instanceof Error ? err.message : "Payment initialisation failed",
      }));

      if (!created.success) {
        setError(
          created.error ||
            "Online payment is not available yet. Please choose Cash on Delivery or call us at 9363778989.",
        );
        setBusy(false);
        return;
      }
      const { order } = created;

      const ok = await loadRazorpay();
      if (!ok) {
        setError("Could not load the payment widget. Check your connection and try again.");
        setBusy(false);
        return;
      }

      const publicKey =
        (import.meta as unknown as { env: Record<string, string | undefined> }).env[
          "VITE_RAZORPAY_KEY_ID"
        ] || "";
      if (!publicKey) {
        setError(
          "Payment widget is not configured (missing VITE_RAZORPAY_KEY_ID). Please contact us at 9363778989.",
        );
        setBusy(false);
        return;
      }

      const win = window as unknown as {
        Razorpay: new (opts: Record<string, unknown>) => {
          open: () => void;
          on: (event: string, cb: (r: unknown) => void) => void;
        };
      };

      const rzp = new win.Razorpay({
        key: publicKey,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "Farmer's Dairy",
        description: itemsSummary(items).slice(0, 240),
        prefill: {
          name: fields.fullName,
          email: fields.email,
          contact: fields.phone,
        },
        theme: { color: "#1C4610" },
        handler: async (resp: RazorpayHandlerArgs) => {
          try {
            const vjson = await verifyRazorpayPayment({ data: resp });
            if (!vjson.success) {
              setError(vjson.error || "Payment verification failed. Please contact us.");
              setBusy(false);
              return;
            }
            await persistOrder(buildPayload(id, "Razorpay", "paid", resp.razorpay_payment_id));
            clearCart();
            toast.success("Payment received — thank you!");
            navigate({ to: "/order-confirmation", search: { id } });
          } catch (err) {
            setError(err instanceof Error ? err.message : "Order save failed.");
            setBusy(false);
          }
        },
        modal: {
          ondismiss: () => setBusy(false),
        },
      });
      rzp.on("payment.failed", (r: unknown) => {
        const description =
          (r as { error?: { description?: string } }).error?.description ??
          "Payment failed. Please try again.";
        setError(description);
        setBusy(false);
      });
      rzp.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setBusy(false);
    }
  };

  const field = (
    k: keyof Fields,
    label: string,
    extra?: { optional?: boolean; type?: string },
  ) => (
    <label className="block">
      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-green">
        {label}
        {extra?.optional ? " (optional)" : ""}
      </span>
      <input
        value={fields[k]}
        type={extra?.type ?? "text"}
        onChange={(e) => set(k, e.target.value)}
        onBlur={() => setTouched((t) => ({ ...t, [k]: true }))}
        className="mt-2 h-12 w-full rounded-xl border border-green/20 bg-card px-4 outline-none focus:border-green"
      />
      {touched[k] && errors[k] && (
        <span className="mt-1 block text-xs text-destructive">{errors[k]}</span>
      )}
    </label>
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <span className="eyebrow">Checkout</span>
      <h1 className="display-hero mt-5 text-4xl md:text-5xl">Almost There</h1>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <section className="card-fd p-7">
            <button
              className="flex w-full items-center justify-between text-left"
              onClick={() => setStep("address")}
            >
              <h2 className="font-display text-xl">1 · Delivery Address</h2>
              <span className="chip">{step === "address" ? "Editing" : "Done"}</span>
            </button>
            {step === "address" && (
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {field("fullName", "Full name")}
                {field("phone", "Phone", { type: "tel" })}
                {field("email", "Email", { type: "email" })}
                {field("house", "House / Flat")}
                {field("street", "Street")}
                {field("landmark", "Landmark", { optional: true })}
                {field("city", "City")}
                {field("pincode", "Pincode")}
                {field("state", "State")}
                <div className="sm:col-span-2">
                  <label className="block">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-green">
                      Special instructions (optional)
                    </span>
                    <textarea
                      value={fields.specialInstructions}
                      onChange={(e) => set("specialInstructions", e.target.value)}
                      rows={2}
                      className="mt-2 w-full rounded-xl border border-green/20 bg-card px-4 py-3 outline-none focus:border-green"
                    />
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <button
                    className="btn btn-primary w-full"
                    disabled={!valid}
                    onClick={() => setStep("payment")}
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}
          </section>

          <section className="card-fd p-7">
            <h2 className="font-display text-xl">2 · Payment</h2>
            {step === "payment" ? (
              <div className="mt-6 space-y-4">
                {error && (
                  <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {error}
                  </p>
                )}
                <button
                  className="btn btn-primary w-full"
                  disabled={busy}
                  onClick={() => place("razorpay")}
                >
                  {busy ? "Processing…" : "Pay with Razorpay (UPI / Card / Netbanking)"}
                </button>
                {codAllowed ? (
                  <button
                    className="btn btn-secondary w-full"
                    disabled={busy}
                    onClick={() => place("cod")}
                  >
                    Cash on Delivery
                  </button>
                ) : (
                  <p className="text-xs text-text/70">
                    Cash on Delivery is available only for the Sample Pack. All other orders are
                    prepaid online.
                  </p>
                )}
              </div>
            ) : (
              <p className="mt-3 text-sm text-text/70">Complete your address to continue.</p>
            )}
          </section>
        </div>

        <aside className="card-fd h-fit p-7 lg:sticky lg:top-32">
          <h2 className="font-display text-xl">Order Summary</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {items.map((i) => (
              <li key={i.key} className="flex justify-between gap-4">
                <span>
                  {i.quantity} × {i.name}
                  {i.variant ? ` (${i.variant})` : ""}
                  {i.days && i.days > 1 ? ` · ${i.days} days` : ""}
                </span>
                <span className="whitespace-nowrap font-semibold">
                  {inr(i.unitPrice * i.quantity * (i.days || 1))}
                </span>
              </li>
            ))}
          </ul>
          <dl className="rule mt-5 space-y-3 pt-5 text-sm">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd>{inr(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Shipping</dt>
              <dd>
                {shipping === null
                  ? "Enter pincode"
                  : shipping === 0
                    ? "Free"
                    : inr(shipping)}
              </dd>
            </div>
            <div className="rule flex justify-between pt-3 font-display text-lg font-bold text-green-deep">
              <dt>Total</dt>
              <dd>{inr(total)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
