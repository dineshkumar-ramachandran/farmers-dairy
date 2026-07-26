"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Ticker } from "./ticker";

/**
 * Full-bleed hero slider — four product slides (Milk, Ghee, Paneer, Butter).
 * Each background image is a 1920×960 studio composite generated from the
 * product photography. Auto-rotates every 6s, pauses on hover.
 * Matches the pagination-branch original: dark scrim over the bg image with
 * light copy overlaid on the left.
 */

type Slide = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  bg: string;
  cta: string;
  href: string;
};

const SLIDES: Slide[] = [
  {
    id: 1,
    title: "Raw Cow Milk",
    subtitle: "From Farm to Home",
    description:
      "Unprocessed Organic Cow Milk directly from our Farm to your Home.",
    bullets: ["No Preservatives", "No Antibiotics"],
    bg: "/images/hero-milk.jpg",
    cta: "Start Subscription",
    href: "/shop",
  },
  {
    id: 2,
    title: "Organic Cow Ghee",
    subtitle: "Pure & Aromatic",
    description:
      "Pure and Aromatic Organic Cow Ghee made from fresh Organic Cream, extracted from our Organic Milk.",
    bullets: [],
    bg: "/images/hero-ghee.jpg",
    cta: "Shop Ghee",
    href: "/shop",
  },
  {
    id: 3,
    title: "Organic Paneer",
    subtitle: "Soft & Healthy",
    description:
      "Soft and Healthy Paneer made from Organic Cow milk & Lemon. Comes with paneer water inside.",
    bullets: [],
    bg: "/images/hero-paneer.jpg",
    cta: "Shop Paneer",
    href: "/shop",
  },
  {
    id: 4,
    title: "Organic Butter",
    subtitle: "Creamy & Fresh",
    description:
      "Churned from Organic Cream. Soft and creamy butter for tasty dosas.",
    bullets: [],
    bg: "/images/hero-butter.jpg",
    cta: "Shop Butter",
    href: "/shop",
  },
];

const AUTOPLAY_MS = 6000;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = SLIDES.length;

  useEffect(() => {
    if (paused || reduce) return;
    timer.current = setInterval(
      () => setIndex((i) => (i + 1) % total),
      AUTOPLAY_MS
    );
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, reduce, total]);

  const goto = (i: number) => setIndex(((i % total) + total) % total);
  const slide = SLIDES[index];

  return (
    <>
      <section
        className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[680px] overflow-hidden"
        aria-label="Farmer's Dairy — hero"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Slides */}
        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-700 ease-out-expo ${
              i === index ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            style={{
              backgroundImage: `url('${s.bg}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        ))}

        {/* Dark scrim for text readability */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(15,46,43,0.55) 0%, rgba(15,46,43,0.35) 40%, rgba(15,46,43,0) 65%)",
          }}
          aria-hidden="true"
        />

        {/* Copy overlay */}
        <div className="relative z-10 h-full max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-10 flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              className="max-w-xl md:max-w-2xl"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -20 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.32em] text-butter mb-4">
                {slide.subtitle}
              </p>
              <h1 className="font-display font-extrabold tracking-tightest text-white leading-[0.98] text-[2.2rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                {slide.title}
              </h1>
              <p className="mt-4 sm:mt-6 max-w-lg text-[15px] sm:text-lg text-white/90 leading-relaxed drop-shadow">
                {slide.description}
              </p>
              {slide.bullets.length > 0 && (
                <ul className="mt-4 space-y-1.5">
                  {slide.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-center gap-2 text-white/95 text-[15px] sm:text-base font-medium"
                    >
                      <span
                        className="inline-flex h-1.5 w-1.5 rounded-full bg-butter"
                        aria-hidden="true"
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-7 flex items-center gap-3">
                <Link href={slide.href} className="btn-accent">
                  {slide.cta}
                  <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Prev / next */}
        <button
          type="button"
          onClick={() => goto(index - 1)}
          aria-label="Previous slide"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/85 text-pine transition-all duration-300 hover:bg-white hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => goto(index + 1)}
          aria-label="Next slide"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/85 text-pine transition-all duration-300 hover:bg-white hover:scale-110"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
        </button>

        {/* Dot indicators */}
        <div
          className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2"
          role="tablist"
          aria-label="Hero slides"
        >
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={i === index}
              aria-label={`${s.title} slide`}
              onClick={() => goto(i)}
              className={`h-[3px] rounded-full transition-all duration-500 ${
                i === index
                  ? "w-10 bg-white"
                  : "w-6 bg-white/45 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </section>

      <Ticker />
    </>
  );
}
