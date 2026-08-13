import { useEffect, useMemo, useState } from "react";
import { addDays, format } from "date-fns";
import { Minus, Plus, CalendarDays, Info, X } from "lucide-react";
import { toast } from "sonner";
import { Link, useNavigate } from "@tanstack/react-router";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useCart } from "@/lib/cart";
import { inr, type Product } from "@/lib/products";

const PLANS = [
  { id: "weekly", label: "Weekly (7 days)", days: 7 },
  { id: "monthly", label: "Monthly (30 days)", days: 30 },
  { id: "custom", label: "Custom range", days: 0 },
];

// Milk cut-offs (all times in the browser's local timezone, so a customer
// in Hosur always sees Hosur time regardless of where our server sits).
const EARLY_CUTOFF_HOUR = 5; // Orders placed BEFORE 05:00 → delivered same day after 5 AM
const LATE_CUTOFF_HOUR = 19; // Orders placed AT/AFTER 19:00 → earliest delivery is tomorrow

function earliestDeliveryFor(now: Date): Date {
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return now.getHours() >= LATE_CUTOFF_HOUR ? addDays(midnight, 1) : midnight;
}

type DeliveryNotice = {
  tone: "info" | "warn";
  message: string;
};

function deliveryNoticeFor(now: Date): DeliveryNotice | null {
  const h = now.getHours();
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (h < EARLY_CUTOFF_HOUR) {
    return {
      tone: "info",
      message: `Since you're ordering before 5 AM, your first delivery will arrive after 5 AM today (${format(midnight, "d MMM yyyy")}).`,
    };
  }
  if (h >= LATE_CUTOFF_HOUR) {
    return {
      tone: "warn",
      message: `Orders after 7 PM are queued for the next day — your first delivery will arrive on ${format(addDays(midnight, 1), "d MMM yyyy")}.`,
    };
  }
  return null;
}

export function Configurator({ product }: { product: Product }) {
  const { addToCart, hasKey } = useCart();
  const navigate = useNavigate();
  const isSub = product.isSubscription === true;

  // Compute the earliest delivery date. We seed with a placeholder so SSR
  // and client render match, then re-compute in the client effect so the
  // date reflects the visitor's *local* time — dairy cut-offs are IST-critical.
  const [min, setMin] = useState<Date>(() => earliestDeliveryFor(new Date()));
  const [notice, setNotice] = useState<DeliveryNotice | null>(null);

  const [variant, setVariant] = useState(product.variants?.[0]?.label ?? "");
  const [qty, setQty] = useState(1);
  const [plan, setPlan] = useState("weekly");
  const [start, setStart] = useState<Date>(min);
  const [end, setEnd] = useState<Date>(addDays(min, 6));
  const [holidays, setHolidays] = useState<Date[]>([]);
  const [nudged, setNudged] = useState(false);

  // Re-hydrate with the visitor's clock and, for milk products, surface the
  // relevant delivery-window notice.
  useEffect(() => {
    const now = new Date();
    const nextMin = earliestDeliveryFor(now);
    setMin(nextMin);
    setStart(nextMin);
    setEnd(addDays(nextMin, 6));
    if (isSub) {
      const n = deliveryNoticeFor(now);
      setNotice(n);
      if (n) toast.info(n.message, { duration: 6500 });
    }
  }, [isSub]);

  const unitPrice = useMemo(() => {
    if (product.variants) {
      return product.variants.find((v) => v.label === variant)?.price ?? product.variants[0]!.price;
    }
    return typeof product.price === "number" ? product.price : 0;
  }, [product, variant]);

  const planDays =
    plan === "custom"
      ? Math.max(1, Math.round((end.getTime() - start.getTime()) / 86400000) + 1)
      : (PLANS.find((p) => p.id === plan)?.days ?? 7);

  const days = isSub ? planDays : 1;
  const finish = addDays(start, days - 1 + holidays.length);
  const total = unitPrice * qty * days;

  const key = `${product.slug}|${variant}|${isSub ? plan : "once"}|${isSub ? format(start, "yyyy-MM-dd") : "now"}`;
  const inCart = hasKey(key);

  const pickStart = (d?: Date) => {
    if (!d) return;
    const chosen = d < min ? min : d;
    if (d < min) setNudged(true);
    setStart(chosen);
    if (plan === "custom" && end < chosen) setEnd(addDays(chosen, 6));
  };

  const toggleHoliday = (d?: Date) => {
    if (!d) return;
    const iso = format(d, "yyyy-MM-dd");
    setHolidays((prev) =>
      prev.some((h) => format(h, "yyyy-MM-dd") === iso)
        ? prev.filter((h) => format(h, "yyyy-MM-dd") !== iso)
        : [...prev, d],
    );
  };

  if (product.comingSoon) {
    return (
      <Link to="/contact" className="btn btn-secondary w-full">
        Notify Me
      </Link>
    );
  }

  const add = (notify: boolean) => {
    addToCart({
      key,
      slug: product.slug,
      name: product.name,
      image: product.image,
      variant: variant || undefined,
      unitPrice,
      quantity: qty,
      plan: isSub ? PLANS.find((p) => p.id === plan)?.label : undefined,
      days,
      startDate: isSub ? format(start, "d MMM yyyy") : undefined,
      endDate: isSub ? format(finish, "d MMM yyyy") : undefined,
      holidays: isSub ? holidays.map((h) => format(h, "d MMM yyyy")) : [],
    });
    if (notify) toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="space-y-5">
      {isSub && notice && (
        <div
          role="status"
          className={`flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm leading-snug ${
            notice.tone === "warn"
              ? "border-butter-deep/40 bg-butter/25 text-green-deep"
              : "border-green/25 bg-cream text-green-deep"
          }`}
        >
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>
            <strong className="font-display font-bold">Delivery note:</strong>{" "}
            {notice.message}
          </p>
        </div>
      )}

      {product.variants && (
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-green">
            {product.variantLabel}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <button
                key={v.label}
                onClick={() => setVariant(v.label)}
                className={`min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors ${
                  variant === v.label
                    ? "border-green bg-green text-cream"
                    : "border-green/25 text-green hover:border-green"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-green">Quantity</p>
        <div className="mt-2 inline-flex items-center gap-1 rounded-full border border-green/25 p-1">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="grid h-10 w-10 place-items-center rounded-full text-green hover:bg-cream-deep"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-10 text-center font-display font-bold text-green-deep">{qty}</span>
          <button
            onClick={() => setQty((q) => Math.min(50, q + 1))}
            aria-label="Increase quantity"
            className="grid h-10 w-10 place-items-center rounded-full text-green hover:bg-cream-deep"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {isSub && (
        <>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-green">
              Subscription
            </p>
            <div className="mt-2 grid grid-cols-3 gap-1 rounded-full border border-green/25 p-1">
              {PLANS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPlan(p.id)}
                  className={`min-h-10 rounded-full px-2 text-[11px] font-bold uppercase tracking-[0.08em] transition-colors ${
                    plan === p.id ? "bg-green text-cream" : "text-green hover:bg-cream-deep"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <button className="btn btn-secondary flex-1">
                  <CalendarDays className="h-4 w-4" />
                  {plan === "custom"
                    ? `${format(start, "d MMM")} – ${format(end, "d MMM")}`
                    : format(start, "d MMM yyyy")}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={start}
                  onSelect={pickStart}
                  disabled={{ before: min }}
                />
                {plan === "custom" && (
                  <div className="border-t p-2">
                    <p className="px-2 pb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-green">
                      End date
                    </p>
                    <Calendar
                      mode="single"
                      selected={end}
                      onSelect={(d) => d && setEnd(d)}
                      disabled={{ before: start }}
                    />
                  </div>
                )}
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <button className="btn btn-secondary flex-1">Need a Subscription Break</button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="multiple"
                  selected={holidays}
                  onSelect={(d) => setHolidays((d as Date[]) ?? [])}
                  disabled={{ before: start }}
                />
              </PopoverContent>
            </Popover>
          </div>

          {nudged && (
            <p className="flex items-start gap-2 rounded-xl bg-butter/20 px-3 py-2 text-xs text-green-deep">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              Please pick a date from {format(min, "d MMM yyyy")} onwards.
            </p>
          )}

          {holidays.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {holidays.map((h) => (
                <button
                  key={h.toISOString()}
                  onClick={() => toggleHoliday(h)}
                  className="chip gap-1"
                  aria-label={`Remove break day ${format(h, "d MMM")}`}
                >
                  {format(h, "d MMM")}
                  <X className="h-3 w-3" />
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {!isSub && (
        <div className="rounded-2xl bg-cream px-5 py-4 text-right">
          <p className="font-display text-[28px] font-bold leading-none text-green-deep">
            {inr(total)}
          </p>
          <p className="mt-2 text-[11px] text-text/70">
            Inclusive of all taxes · Free delivery within Hosur
          </p>
        </div>
      )}

      {inCart ? (
        <Link to="/cart" className="btn btn-accent w-full">
          In Cart · Edit
        </Link>
      ) : (
        <button className="btn btn-primary w-full" onClick={() => add(true)}>
          Add to Cart
        </button>
      )}

      {!isSub && (
        <button
          className="btn btn-accent w-full"
          onClick={() => {
            add(false);
            navigate({ to: "/checkout" });
          }}
        >
          Buy Now
        </button>
      )}

      {isSub && (
        <p className="rule pt-3 text-xs text-text/80">
          {qty} × {variant || product.name} · {PLANS.find((p) => p.id === plan)?.label} · {days} days
          · {inr(total)} · Starts {format(start, "d MMM yyyy")} · Ends{" "}
          {format(finish, "d MMM yyyy")}
        </p>
      )}
    </div>
  );
}
