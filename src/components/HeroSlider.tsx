import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides, type HeroSlide } from "@/lib/products";
import { prefersReduced } from "@/lib/motion";

/**
 * Premium 4-slide hero.
 *
 * Layout — desktop: text left (≈42 % col), photograph right (≈58 %); mobile:
 * responsive art on top, copy stack below.
 *
 * Motion —
 *  • Typewriter reveal on the H1 (55 ms/char desktop, 40 ms/char mobile).
 *  • Product image enters translateX(50 px) scale(0.97) → 0/1 with a subtle
 *    continuous 5 – 7 s float once it's landed.
 *  • Everything runs on transform + opacity only (compositor-friendly) and
 *    fully respects prefers-reduced-motion.
 *
 * A11y — arrow-key navigation, aria-labels on every control, live region
 * announces the active slide title.
 */

const AUTOPLAY_MS = 6000;
const TYPE_SPEED_DESKTOP = 55;
const TYPE_SPEED_MOBILE = 40;
const POST_TYPE_HOLD = 1600;
const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

function useIsMobile(breakpoint = 768) {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const on = () => setMobile(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [breakpoint]);
  return mobile;
}

/**
 * Typewriter — mounts fresh per-slide (via the caller's `key`), animates one
 * character at a time, then fades in a soft underline swipe.
 * Reserves the full heading height up-front (invisible sibling) so the page
 * never shifts as characters appear.
 */
function TypewriterHeading({
  text,
  speed,
  mobile,
}: {
  text: string;
  speed: number;
  mobile: boolean;
}) {
  const [count, setCount] = useState(prefersReduced() ? text.length : 0);

  useEffect(() => {
    if (prefersReduced()) {
      setCount(text.length);
      return;
    }
    setCount(0);
    let i = 0;
    const tick = () => {
      i += 1;
      setCount(i);
      if (i < text.length) id = window.setTimeout(tick, speed);
    };
    let id = window.setTimeout(tick, speed);
    return () => window.clearTimeout(id);
  }, [text, speed]);

  const done = count >= text.length;

  return (
    <h1
      className="font-display font-extrabold text-green-deep"
      style={{
        letterSpacing: "-0.02em",
        lineHeight: 1.02,
        // clamp keeps the ceiling reasonable per breakpoint without a MQ ladder
        fontSize: mobile
          ? "clamp(2.2rem, 8.5vw, 3rem)"
          : "clamp(3rem, 5.4vw, 4.6rem)",
      }}
    >
      {/* Reserved-space placeholder — the invisible copy locks height so the
          typewriter never causes reflow */}
      <span className="relative block">
        <span aria-hidden="true" className="invisible whitespace-pre-wrap">
          {text}
        </span>
        <span className="absolute inset-0 whitespace-pre-wrap">
          {text.slice(0, count)}
          {!done && (
            <span
              aria-hidden="true"
              className="ml-[2px] inline-block align-[-0.05em] text-butter-deep"
              style={{
                width: "0.06em",
                height: "0.9em",
                background: "currentColor",
                animation: "hero-caret 1s steps(2) infinite",
              }}
            />
          )}
          <span className="sr-only">{text}</span>
        </span>
      </span>
    </h1>
  );
}

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [floatY, setFloatY] = useState(0);
  const touchX = useRef(0);
  const mobile = useIsMobile();
  const reduced = prefersReduced();

  const slide = useMemo<HeroSlide>(() => heroSlides[index]!, [index]);
  const nextIndex = useCallback(
    (n: number) => setIndex((i) => (n + heroSlides.length) % heroSlides.length),
    [],
  );
  const goto = useCallback((i: number) => setIndex(i), []);

  // Autoplay — pauses on hover / touch. `paused` is set by handlers below.
  useEffect(() => {
    if (paused || reduced) return;
    const id = window.setTimeout(() => nextIndex(index + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, nextIndex, reduced]);

  // Very subtle continuous product-image float (5.5 s round trip, ~5 px).
  useEffect(() => {
    if (reduced) return;
    const start = performance.now();
    let raf = 0;
    const loop = (t: number) => {
      const cycle = ((t - start) % 5500) / 5500;
      setFloatY(Math.sin(cycle * Math.PI * 2) * 5);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  // Progress bar per slide — resets on every slide change
  const [progressKey, setProgressKey] = useState(0);
  useEffect(() => setProgressKey((k) => k + 1), [index]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured Farmer's Dairy products"
      tabIndex={0}
      className="relative isolate overflow-hidden bg-cream"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") nextIndex(index + 1);
        if (e.key === "ArrowLeft") nextIndex(index - 1);
        if (e.key === "Home") setIndex(0);
        if (e.key === "End") setIndex(heroSlides.length - 1);
      }}
      onTouchStart={(e) => {
        setPaused(true);
        touchX.current = e.touches[0]!.clientX;
      }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0]!.clientX - touchX.current;
        if (Math.abs(dx) > 50) nextIndex(index + (dx < 0 ? 1 : -1));
        // Resume autoplay 3 s after the user lifts their finger
        window.setTimeout(() => setPaused(false), 3000);
      }}
    >

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-5 md:min-h-[650px] md:grid-cols-[minmax(0,44fr)_minmax(0,56fr)] md:gap-8 md:px-8 lg:min-h-[720px]">
        {/* ─────────── MOBILE image (order-first, visually on top) ─────────── */}
        <div className="relative -mx-5 mt-2 md:hidden">
          <div className="relative h-[44vh] min-h-[300px] max-h-[420px] w-full">
            {/* Warm glow so the transparent product sits on a soft base and
                doesn't look like it's floating in space */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 mx-auto max-w-[80%]"
              style={{
                background:
                  "radial-gradient(50% 45% at 50% 60%, rgba(249,187,106,0.32) 0%, rgba(251,235,209,0) 70%)",
              }}
            />
            {heroSlides.map((s, i) => (
              <img
                key={s.id}
                src={s.imageMobile}
                alt={s.alt}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "low"}
                decoding="async"
                aria-hidden={i !== index}
                className="absolute inset-0 h-full w-full object-contain"
                style={{
                  opacity: i === index ? 1 : 0,
                  transform:
                    i === index
                      ? `translate3d(0, ${reduced ? 0 : floatY.toFixed(2)}px, 0) scale(1)`
                      : "translate3d(30px, 0, 0) scale(0.97)",
                  transition: `opacity 900ms ${EASING}, transform 900ms ${EASING}`,
                  // multiply blends any residual warm bg the PNG might have
                  // into the cream site background; on truly transparent PNGs
                  // it's a no-op for the transparent pixels
                  mixBlendMode: "multiply",
                  filter: "drop-shadow(0 24px 30px rgba(15, 46, 10, 0.18))",
                  willChange: i === index ? "transform" : undefined,
                }}
              />
            ))}
          </div>
        </div>

        {/* ─────────── COPY column (left on desktop, below image on mobile) ── */}
        <div className="relative z-10 flex flex-col justify-center py-8 md:py-16">
          {/* Eyebrow + heading are keyed by index so they remount + replay
              their entrance animation on every slide change */}
          <p
            key={`eyebrow-${index}`}
            className="text-[11px] font-bold uppercase tracking-[0.28em] text-butter-deep"
            style={{
              animation: reduced
                ? undefined
                : `hero-rise 700ms ${EASING} both`,
            }}
          >
            {slide.eyebrow}
          </p>

          <div key={`heading-${index}`} className="mt-4">
            <TypewriterHeading
              text={slide.title}
              speed={mobile ? TYPE_SPEED_MOBILE : TYPE_SPEED_DESKTOP}
              mobile={mobile}
            />
          </div>

          <p
            key={`desc-${index}`}
            className="mt-5 max-w-[480px] text-[15px] leading-[1.7] text-text md:text-base"
            style={{
              animation: reduced
                ? undefined
                : `hero-rise 700ms ${EASING} both`,
              animationDelay: reduced ? undefined : `${POST_TYPE_HOLD * 0.4}ms`,
            }}
          >
            {slide.description}
          </p>

          {slide.bullets.length > 0 && (
            <ul
              key={`bullets-${index}`}
              className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-green-deep"
              style={{
                animation: reduced
                  ? undefined
                  : `hero-rise 700ms ${EASING} both`,
                animationDelay: reduced
                  ? undefined
                  : `${POST_TYPE_HOLD * 0.55}ms`,
              }}
            >
              {slide.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-green" />
                  {b}
                </li>
              ))}
            </ul>
          )}

          <div
            key={`cta-${index}`}
            className="mt-8"
            style={{
              animation: reduced
                ? undefined
                : `hero-rise 700ms ${EASING} both`,
              animationDelay: reduced
                ? undefined
                : `${POST_TYPE_HOLD * 0.75}ms`,
            }}
          >
            <Link
              to={slide.href}
              className="group inline-flex items-center gap-2 rounded-full bg-green px-7 py-3.5 text-[13px] font-bold uppercase tracking-[0.16em] text-cream shadow-[0_2px_0_0_var(--green-deep),0_18px_28px_-18px_rgba(28,70,16,0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-deep hover:shadow-[0_3px_0_0_var(--green-deep),0_28px_44px_-20px_rgba(28,70,16,0.7)]"
            >
              {slide.cta}
              <ArrowRight
                className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* Live region — announces the active title to assistive tech */}
          <span className="sr-only" aria-live="polite">
            Slide {index + 1} of {heroSlides.length}: {slide.title}
          </span>

          {/* Slide indicator — desktop position (inline at the bottom of the
              copy column). Mobile version sits at the very bottom of the copy
              stack, below the CTA. */}
          <Indicator
            index={index}
            onGoto={goto}
            progressKey={progressKey}
            paused={paused || reduced}
            className="mt-10"
          />
        </div>

        {/* ─────────── DESKTOP image column ─────────── */}
        <div className="relative hidden md:block">
          <div className="relative flex h-full min-h-[560px] items-center justify-center">
            {/* Warm radial cushion behind the product — gives depth without
                a hard rectangular frame */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(45% 55% at 60% 55%, rgba(249,187,106,0.28) 0%, rgba(251,235,209,0) 68%)",
              }}
            />
            {heroSlides.map((s, i) => (
              <img
                key={s.id}
                src={s.imageDesktop}
                alt={s.alt}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "low"}
                decoding="async"
                aria-hidden={i !== index}
                className="absolute top-1/2 max-h-[92%] max-w-[85%] -translate-y-1/2 object-contain"
                style={{
                  opacity: i === index ? 1 : 0,
                  transform:
                    i === index
                      ? `translate3d(0, calc(-50% + ${reduced ? 0 : floatY.toFixed(2)}px), 0) scale(1)`
                      : "translate3d(50px, -50%, 0) scale(0.97)",
                  transition: `opacity 900ms ${EASING}, transform 900ms ${EASING}`,
                  // multiply blends any residual warm bg into cream (safety
                  // net for PNGs that ship with a faint studio backdrop)
                  mixBlendMode: "multiply",
                  filter: "drop-shadow(0 40px 50px rgba(15, 46, 10, 0.22))",
                  willChange: i === index ? "transform" : undefined,
                }}
              />
            ))}
          </div>

          {/* Prev / next — subtle circular controls, only rendered on desktop */}
          <button
            onClick={() => nextIndex(index - 1)}
            aria-label="Previous slide"
            className="absolute left-2 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-cream/90 text-green shadow-[0_8px_20px_-10px_rgba(15,46,10,0.4)] transition-transform hover:-translate-y-[calc(50%+2px)]"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => nextIndex(index + 1)}
            aria-label="Next slide"
            className="absolute right-2 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-cream/90 text-green shadow-[0_8px_20px_-10px_rgba(15,46,10,0.4)] transition-transform hover:-translate-y-[calc(50%+2px)]"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Keyframes co-located so this component is drop-in usable */}
      <style>{`
        @keyframes hero-rise {
          0%   { opacity: 0; transform: translateY(14px); }
          100% { opacity: 1; transform: translateY(0);    }
        }
        @keyframes hero-caret {
          0%, 50%   { opacity: 1; }
          50.01%, 100% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────── Slide indicator ─────────────────────────── */

function Indicator({
  index,
  onGoto,
  progressKey,
  paused,
  className,
}: {
  index: number;
  onGoto: (i: number) => void;
  progressKey: number;
  paused: boolean;
  className?: string;
}) {
  const count = heroSlides.length;
  return (
    <div
      role="tablist"
      aria-label="Hero slides"
      className={`flex items-center gap-4 ${className ?? ""}`}
    >
      <span className="font-display text-sm font-bold tracking-wider text-green-deep tabular-nums">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="flex flex-1 items-center gap-2">
        {Array.from({ length: count }).map((_, i) => {
          const active = i === index;
          return (
            <button
              key={i}
              role="tab"
              aria-selected={active}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => onGoto(i)}
              className="group relative h-[3px] flex-1 overflow-hidden rounded-full bg-green/15"
            >
              {/* Static fill for slides already viewed */}
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-left bg-green transition-transform duration-500"
                style={{
                  transform: `scaleX(${i < index ? 1 : 0})`,
                }}
              />
              {/* Autoplay progress fill for the current slide */}
              {active && (
                <span
                  key={progressKey}
                  aria-hidden="true"
                  className="absolute inset-0 origin-left bg-green"
                  style={{
                    animation: paused
                      ? undefined
                      : `hero-progress ${AUTOPLAY_MS}ms linear forwards`,
                  }}
                />
              )}
            </button>
          );
        })}
        <style>{`
          @keyframes hero-progress {
            from { transform: scaleX(0); }
            to   { transform: scaleX(1); }
          }
        `}</style>
      </div>
      <span className="font-display text-xs font-medium tracking-wider text-text/60 tabular-nums">
        / {String(count).padStart(2, "0")}
      </span>
    </div>
  );
}
