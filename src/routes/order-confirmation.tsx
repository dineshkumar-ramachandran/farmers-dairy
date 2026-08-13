import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { loadOrders, type Order } from "@/lib/cart";
import { inr, PHONE } from "@/lib/products";
import { prefersReduced } from "@/lib/motion";

export const Route = createFileRoute("/order-confirmation")({
  validateSearch: (search: Record<string, unknown>) => ({ id: (search["id"] as string) ?? "" }),
  head: () => ({
    meta: [
      { title: "Order Confirmed — Farmer's Dairy" },
      { name: "description", content: "Thank you for your order. Your farm fresh delivery is on the way." },
      { property: "og:title", content: "Order Confirmed — Farmer's Dairy" },
      { property: "og:description", content: "Thank you for your order from Farmer's Dairy." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Confirmation,
});

function Confetti() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!prefersReduced()) setOn(true);
  }, []);
  if (!on) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {Array.from({ length: 40 }).map((_, i) => (
        <span
          key={i}
          className="absolute h-2 w-2 rounded-sm"
          style={{
            left: `${(i * 37) % 100}%`,
            top: "-10px",
            background: i % 3 === 0 ? "#F9BB6A" : i % 3 === 1 ? "#1C4610" : "#E89A47",
            animation: `confetti-fall ${1.6 + (i % 7) * 0.22}s ease-in ${(i % 10) * 0.06}s forwards`,
          }}
        />
      ))}
      <style>{`@keyframes confetti-fall{to{transform:translateY(90vh) rotate(540deg);opacity:0}}`}</style>
    </div>
  );
}

function Confirmation() {
  const { id } = Route.useSearch();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const orders = loadOrders();
    setOrder(orders.find((o) => o.id === id) ?? orders[0] ?? null);
  }, [id]);

  const firstDelivery = order?.items[0]?.startDate;

  return (
    <div className="relative mx-auto max-w-2xl px-6 py-24 text-center">
      <Confetti />
      <div className="card-fd relative p-10">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-green text-cream">
          <Check className="h-9 w-9" />
        </span>
        <h1 className="display-hero mt-7 text-4xl">Thank you for your order!</h1>
        {order && (
          <div className="mt-6 space-y-2 text-sm text-text">
            <p>
              Order ID <span className="font-display font-bold text-green-deep">{order.id}</span>
            </p>
            <p>
              Total <span className="font-display font-bold text-green-deep">{inr(order.total)}</span>
            </p>
            {firstDelivery && <p>First delivery on {firstDelivery}</p>}
          </div>
        )}
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a
            href={`https://wa.me/91${PHONE}?text=${encodeURIComponent(`Hi Farmer's Dairy, tracking order ${order?.id ?? id}`)}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            Track Order
          </a>
          <Link to="/shop" className="btn btn-secondary">
            Back to Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
