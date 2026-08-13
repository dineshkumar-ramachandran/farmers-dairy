export type LegalSection = { id: string; heading: string; body: string[] };

export function LegalPage({
  eyebrow,
  title,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <span className="eyebrow">{eyebrow}</span>
      <h1 className="display-hero mt-5 text-4xl md:text-6xl">{title}</h1>
      <p className="mt-4 text-sm text-text/70">Last updated {updated}</p>

      <div className="mt-14 grid gap-12 lg:grid-cols-[240px_1fr]">
        <nav aria-label="Table of contents" className="h-fit lg:sticky lg:top-32">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-green">Contents</p>
          <ul className="mt-4 space-y-3 text-sm">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-text/80 hover:text-green">
                  {s.heading}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="max-w-2xl space-y-10">
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-32">
              <h2 className="font-display text-2xl">{s.heading}</h2>
              {s.body.map((p, i) => (
                <p key={i} className="mt-3 text-text/85">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
