import { Reveal } from "@/components/motion/reveal";

interface SectionHeaderProps {
  num: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  dark?: boolean;
}

/** Editorial section masthead: number + eyebrow, display title, side note. */
export function SectionHeader({
  num,
  eyebrow,
  title,
  description,
  dark = false,
}: SectionHeaderProps) {
  return (
    <div className="mb-12 sm:mb-16">
      <Reveal>
        <div className="flex items-center gap-4 mb-5">
          <span className="section-num" aria-hidden="true">
            {num}
          </span>
          <span className={`eyebrow ${dark ? "!text-mint" : ""}`}>{eyebrow}</span>
        </div>
      </Reveal>
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6 lg:items-end">
        <Reveal delay={0.08}>
          <h2
            className={`font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.04] tracking-tight text-balance ${
              dark ? "!text-cream" : ""
            }`}>
            {title}
          </h2>
        </Reveal>
        {description && (
          <Reveal delay={0.16}>
            <p
              className={`text-base sm:text-lg leading-relaxed lg:pb-1 ${
                dark ? "text-cream/70" : "text-text/70"
              }`}>
              {description}
            </p>
          </Reveal>
        )}
      </div>
    </div>
  );
}
