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
      <span ref={ref} className="font-display text-4xl font-extrabold text-cream md:text-5xl">
        {display(value)}
      </span>
      <span className="mx-auto mt-3 block h-[2px] w-10 bg-butter" aria-hidden="true" />
      <p className="mt-3 text-[11px] uppercase tracking-[0.24em] text-cream/80">{label}</p>
    </div>
  );
}

export function StatBand() {
  return (
    <section className="bg-green-deep py-14">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-butter/30">
        <Stat target={1200} display={(v) => `${v.toLocaleString("en-IN")}+`} label="Families served" />
        <Stat target={7} display={(v) => `${v} AM`} label="Doorstep delivery" />
        <Stat target={0} display={(v) => `${v}`} label="Preservatives ever" />
      </div>
    </section>
  );
}
