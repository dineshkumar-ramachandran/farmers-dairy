import { useCountUp } from "@/lib/motion";

function Stat({
  target,
  display,
  label,
}: {
  target: number;
  display: (v: number) => string;
  label: string;
}) {
  const { ref, value } = useCountUp(target);
  return (
    <div className="px-6 text-center">
      <span
        ref={ref}
        className="font-display text-4xl font-extrabold text-cream md:text-5xl"
      >
        {display(value)}
      </span>
      <span
        className="mx-auto mt-3 block h-[2px] w-10 bg-butter"
        aria-hidden="true"
      />
      <p className="mt-3 text-[11px] uppercase tracking-[0.24em] text-cream/80">
        {label}
      </p>
    </div>
  );
}

/**
 * A three-up trust strip that scales cleanly from a stacked mobile layout
 * (2rem gap, no dividers) to the desktop split with butter hairlines.
 */
export function StatBand() {
  return (
    <section className="bg-green-deep py-14">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-butter/30">
        <Stat
          target={1200}
          display={(v) => `${v.toLocaleString("en-IN")}+`}
          label="Families served"
        />
        <Stat
          target={49}
          display={(v) => `${(v / 10).toFixed(1)}★`}
          label="Customer rating"
        />
        <Stat
          target={430}
          display={(v) => {
            // Show 4:30 AM as the "starts by" time, animating from 0 → 430
            const h = Math.floor(v / 100);
            const m = v % 100;
            return `${h}:${m.toString().padStart(2, "0")} AM`;
          }}
          label="Delivery starts"
        />
      </div>
    </section>
  );
}
