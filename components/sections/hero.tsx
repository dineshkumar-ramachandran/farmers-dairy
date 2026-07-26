"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Magnetic } from "@/components/animations/magnetic";
import { heroSlides } from "@/lib/site";
import { Ticker } from "./ticker";

/**
 * Hero carousel — four product slides (Milk, Ghee, Paneer, Butter). Auto-
 * rotates every 6s, pauses on hover, supports dot + arrow navigation.
 * Replaces the earlier scroll-scrubbed video hero at client request.
 */
const AUTOPLAY_MS = 6000;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = heroSlides.length;

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
  const slide = heroSlides[index];

  return (
    <>
      <section
        className="relative overflow-hidden bg-milk"
        aria-label="Farmer's Dairy — hero"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Ambient wash */}
        <div
          className="pointer-events-none absolute -top-40 -left-40 w-[34rem] h-[34rem] blob animate-blob bg-teal-bright/15"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-52 -right-40 w-[32rem] h-[32rem] blob animate-blob-slow bg-butter/15"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-10 pt-8 pb-16 sm:pt-14 sm:pb-24 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[520px] lg:min-h-[560px]">
            {/* ---- Copy ---- */}
            <div className="relative order-2 lg:order-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id}
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -18 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="eyebrow mb-5">{slide.eyebrow}</p>
                  <h1 className="display-hero text-[2.4rem] leading-[1.02] sm:text-5xl lg:text-[3.8rem]">
                    <span className="block text-gradient-green">{slide.title}</span>
                  </h1>
                  <p className="mt-5 sm:mt-6 max-w-lg text-[15px] sm:text-lg text-ink-soft/85 leading-relaxed">
                    {slide.description}
                  </p>
                  {slide.bullets.length > 0 && (
                    <ul className="mt-4 space-y-1.5">
                      {slide.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-center gap-2 text-[15px] sm:text-base text-ink-soft"
                        >
                          <span
                            className="inline-flex h-1.5 w-1.5 rounded-full bg-teal"
                            aria-hidden="true"
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Magnetic>
                      <Link href={slide.href} className="btn-primary">
                        {slide.cta}
                        <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                      </Link>
                    </Magnetic>
                    <Magnetic strength={0.25}>
                      <Link href="/about" className="btn-secondary">
                        Our farm story
                      </Link>
                    </Magnetic>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dot indicators */}
              <div
                className="mt-10 flex items-center gap-2"
                role="tablist"
                aria-label="Hero slides"
              >
                {heroSlides.map((s, i) => (
                  <button
                    key={s.id}
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`${s.title} slide`}
                    onClick={() => goto(i)}
                    className={`h-[3px] rounded-full transition-all duration-500 ${
                      i === index
                        ? "w-10 bg-teal"
                        : "w-6 bg-teal/25 hover:bg-teal/60"
                    }`}
                  />
                ))}
                <div className="ml-4 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => goto(index - 1)}
                    aria-label="Previous slide"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-teal/30 text-teal transition-colors hover:bg-teal hover:text-cloud"
                  >
                    <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => goto(index + 1)}
                    aria-label="Next slide"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-teal/30 text-teal transition-colors hover:bg-teal hover:text-cloud"
                  >
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            {/* ---- Product image ---- */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative aspect-square max-w-md lg:max-w-lg mx-auto">
                {/* Soft studio glow */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 55%, rgba(255,255,255,0.85) 0%, rgba(220,235,232,0.35) 45%, rgba(242,241,234,0) 72%)",
                  }}
                  aria-hidden="true"
                />
                <AnimatePresence mode="wait">
                  <motion.img
                    key={slide.id}
                    src={slide.image}
                    alt={slide.title}
                    initial={reduce ? false : { opacity: 0, scale: 0.94, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, scale: 0.98, y: -20 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 h-full w-full object-contain mix-blend-multiply drop-shadow-[0_30px_45px_rgba(15,46,43,0.18)]"
                  />
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Ticker />
    </>
  );
}
