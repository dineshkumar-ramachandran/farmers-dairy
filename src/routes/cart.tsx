import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { inr } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Farmer's Dairy" },
      { name: "description", content: "Review your farm fresh order before checkout." },
      { property: "og:title", content: "Your Cart — Farmer's Dairy" },
      { property: "og:description", content: "Review your farm fresh order before checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const subtotal = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="relative mx-auto max-w-3xl overflow-hidden px-6 py-28 text-center">
        <div className="blob left-1/2 top-10 h-64 w-64 -translate-x-1/2 bg-butter" style={{ opacity: 0.3 }} />
        <div className="relative">
          <h1 className="display-hero text-4xl">Your cart is empty</h1>
          <Link to="/shop" className="btn btn-primary mt-8">
            Explore products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <span className="eyebrow">Cart</span>
      <h1 className="display-hero mt-5 text-4xl md:text-5xl">Your Order</h1>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_360px]">
        <ul className="space-y-4">
          {items.map((i) => (
            <li key={i.key} className="card-fd flex flex-wrap items-center gap-5 p-5">
              <div className="h-20 w-20 shrink-0 rounded-2xl bg-cream p-2">
                <img src={i.image} alt={i.name} className="h-full w-full object-contain" />
              </div>
              <div className="min-w-40 flex-1">
                <h2 className="font-display text-lg">{i.name}</h2>
                <p className="mt-1 text-xs text-text/75">
                  {[i.variant, i.plan, i.startDate && `From ${i.startDate}`, i.endDate && `to ${i.endDate}`]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
                {i.holidays && i.holidays.length > 0 && (
                  <p className="mt-1 text-xs text-butter-deep">Skipping: {i.holidays.join(", ")}</p>
                )}
              </div>
              <div className="inline-flex items-center gap-1 rounded-full border border-green/25 p-1">
                <button
                  onClick={() => updateQuantity(i.key, i.quantity - 1)}
                  aria-label="Decrease quantity"
                  className="grid h-9 w-9 place-items-center rounded-full text-green hover:bg-cream-deep"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-display font-bold">{i.quantity}</span>
                <button
                  onClick={() => updateQuantity(i.key, i.quantity + 1)}
                  aria-label="Increase quantity"
                  className="grid h-9 w-9 place-items-center rounded-full text-green hover:bg-cream-deep"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <p className="w-28 text-right font-display font-bold text-green-deep">
                {inr(i.unitPrice * i.quantity * (i.days || 1))}
              </p>
              <button
                onClick={() => {
                  removeFromCart(i.key);
                  toast.success(`${i.name} removed from cart`);
                }}
                aria-label={`Remove ${i.name}`}
                className="grid h-11 w-11 place-items-center rounded-full text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>

        <aside className="card-fd h-fit p-7 lg:sticky lg:top-32">
          <h2 className="font-display text-xl">Order Summary</h2>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd className="font-semibold">{inr(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Shipping</dt>
              <dd className="text-text/75">Enter PIN at checkout</dd>
            </div>
            <div className="rule flex justify-between pt-3 font-display text-lg font-bold text-green-deep">
              <dt>Total</dt>
              <dd>{inr(subtotal)}</dd>
            </div>
          </dl>
          <p className="mt-3 text-xs text-text/70">
            Free within Hosur (PIN starts 6351), ₹99 flat outside Hosur.
          </p>
          <Link to="/checkout" className="btn btn-primary mt-6 w-full">
            Proceed to Checkout
          </Link>
          <p className="rule mt-6 pt-4 text-[11px] uppercase tracking-[0.14em] text-text/70">
            SSL secured · Razorpay accepted · 4.9★ from 1200+ deliveries
          </p>
        </aside>
      </div>
    </div>
  );
}
