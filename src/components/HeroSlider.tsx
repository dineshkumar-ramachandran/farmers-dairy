import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/lib/products";
import { prefersReduced } from "@/lib/motion";

/**
 * Hero slider — desktop uses a full-bleed background with copy laid over a
 * left-fade scrim. Mobile stacks the product photo above the copy so both are
 * clearly visible on narrow screens (image is a fixed-height media card, copy
 * follows below).
 */
export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [offset, setOffset] = useState(0);
  const touchX = useRef(0);

  useEffect(() => {
    if (prefersReduced()) return;
    const onScroll = () => setOffset(Math.min(60, window.scrollY * 0.18));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = useCallback(
    (n: number) => setIndex((i) => (n + heroSlides.length) % heroSlides.length),
    [],
  );

  useEffect(() => {
    if (paused || prefersReduced()) return;
    const t = window.setInterval(() => go(index + 1), 6500);
    return () => window.clearInterval(t);
  }, [index, paused, go]);

  const slide = heroSlides[index]!;

  const shell =
    "relative overflow-hidden md:h-[520px] lg:h-[620px] xl:h-[700px]";

  return (
    <section
      className={shell}
      aria-roledescription="carousel"
      aria-label="Featured products"
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
        if (e.key === "Home") setIndex(0);
        if (e.key === "End") setIndex(heroSlides.length - 1);
        if (e.key === " ") {
          e.preventDefault();
          setPaused((p) => !p);
        }
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0]!.clientX)}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0]!.clientX - touchX.current;
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
      }}
    >
      {/* ─────────────── MOBILE (< md): stacked image + copy ─────────────── */}
      <div className="md:hidden">
        {/* Image card — full width, fixed height, no scrim */}
        <div className="relative h-[300px] overflow-hidden bg-cream sm:h-[360px]">
          {heroSlides.map((s, i) => (
            <img
              key={s.title}
              src={s.image}
              alt={s.title}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "low"}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms]"
              style={{
                opacity: i === index ? 1 : 0,
                transform: `scale(${i === index ? 1.04 : 1})`,
                transition: "opacity 900ms, transform 8000ms ease-out",
              }}
              aria-hidden={i !== index}
            />
          ))}
          {/* Prev / next — smaller, sit inside the image card */}
          <button
            onClick={() => go(index - 1)}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-card/90 text-green shadow-lg"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => go(index + 1)}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-card/90 text-green shadow-lg"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
            {heroSlides.map((s, i) => (
              <button
                key={s.title}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-[3px] rounded-full transition-all ${
                  i === index ? "w-10 bg-cream" : "w-5 bg-cream/60"
                }`}
              />
            ))}
          </div>
        </div>
        {/* Copy card — flows below on a warm cream background */}
        <div
          key={`mcopy-${index}`}
          className="bg-cream px-5 py-8"
          style={{ animation: prefersReduced() ? undefined : "fade-in 700ms 100ms both" }}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-butter-deep">
            {slide.subtitle}
          </p>
          <h1 className="display-hero mt-3 text-3xl">{slide.title}</h1>
          <p className="mt-4 text-[15px] leading-relaxed text-text">{slide.description}</p>
          {slide.bullets.length > 0 && (
            <ul className="mt-4 space-y-1.5">
              {slide.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-2 text-sm font-semibold text-green-deep"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-green" />
                  {b}
                </li>
              ))}
            </ul>
          )}
          <Link
            to="/shop/$slug"
            params={{ slug: slide.slug }}
            key={`mcta-${index}`}
            className="btn btn-primary mt-6 w-full"
          >
            {slide.cta}
          </Link>
        </div>
      </div>

      {/* ─────────────── DESKTOP (>= md): overlaid on hero art ─────────────── */}
      <div className="hidden md:block">
        {heroSlides.map((s, i) => (
          <div
            key={s.title}
            aria-hidden={i !== index}
            className="absolute inset-0 transition-opacity duration-[900ms]"
            style={{ opacity: i === index ? 1 : 0 }}
          >
            <img
              src={s.image}
              alt={s.title}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "low"}
              className="h-full w-full object-cover transition-transform duration-[8000ms] ease-out"
              style={{
                transform: `translate3d(0, ${i === index ? -offset : 0}px, 0) scale(${i === index ? 1.06 : 1})`,
              }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(251,235,209,0.9)_0%,rgba(251,235,209,0)_62%)]" />
          </div>
        ))}

        <div className="relative mx-auto flex h-full max-w-7xl items-center px-6">
          <div
            key={`dcopy-${index}`}
            className="max-w-xl"
            style={{ animation: prefersReduced() ? undefined : "fade-in 700ms 150ms both" }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-butter-deep">
              {slide.subtitle}
            </p>
            <h1 className="display-hero mt-4 text-5xl lg:text-7xl">{slide.title}</h1>
            <p className="mt-5 max-w-md text-base text-text">{slide.description}</p>
            {slide.bullets.length > 0 && (
              <ul className="mt-4 space-y-2">
                {slide.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-center gap-3 text-sm font-semibold text-green-deep"
                  >
                    <span className="h-2 w-2 rounded-full bg-green" />
                    {b}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/shop/$slug"
                params={{ slug: slide.slug }}
                key={`dcta-${index}`}
                className="btn btn-primary"
                style={{ animation: prefersReduced() ? undefined : "cta-pulse 1200ms ease-out 1" }}
              >
                {slide.cta}
              </Link>
              <Link to="/shop" className="btn btn-secondary">
                Browse all products
              </Link>
            </div>
            <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-green-deep/80">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-butter" /> 4 – 6:30 AM Delivery
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-butter" /> Free within Hosur
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-butter" /> 4.9★ from 1,200+ families
              </li>
            </ul>
          </div>
        </div>

        <button
          onClick={() => go(index - 1)}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-card/90 text-green shadow-lg transition-transform hover:-translate-y-[calc(50%+2px)]"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => go(index + 1)}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-card/90 text-green shadow-lg transition-transform hover:-translate-y-[calc(50%+2px)]"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div
          key={`progress-${index}`}
          aria-hidden="true"
          className="hero-progress"
          style={{
            animation: prefersReduced() ? undefined : "hero-progress-fill 6500ms linear forwards",
            animationPlayState: paused ? "paused" : "running",
          }}
        />

        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2">
          {heroSlides.map((s, i) => (
            <button
              key={s.title}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-[3px] rounded-full transition-all ${
                i === index ? "w-12 bg-green" : "w-6 bg-green/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
