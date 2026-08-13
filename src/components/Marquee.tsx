export function Marquee({
  items,
  duration = 40,
  className = "",
  itemClassName = "",
}: {
  items: string[];
  duration?: number;
  className?: string;
  itemClassName?: string;
}) {
  const loop = [...items, ...items];
  return (
    <div className={`marquee-wrap overflow-hidden ${className}`} tabIndex={0} aria-label="Value propositions">
      <div className="marquee" style={{ ["--marquee-duration" as string]: `${duration}s` }}>
        {loop.map((item, i) => (
          <span key={`${item}-${i}`} className={`flex shrink-0 items-center ${itemClassName}`}>
            {item}
            <span aria-hidden="true" className="mx-4 opacity-60">
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
