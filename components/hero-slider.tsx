"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

/**
 * Farmer's Dairy hero slider — four product slides (Milk, Ghee, Paneer,
 * Butter). Each background is a 1920×960 studio composite generated from the
 * product photography with a soft feather blend into the brand cream.
 *
 * Premium refinements: cross-fade + subtle background zoom on active slide,
 * elongated pill dot indicators, autoplay pause on hover, and staggered
 * copy reveal per slide.
 */
const slides = [
  {
    id: 1,
    title: "Raw Cow Milk",
    subtitle: "From Farm to Home",
    description:
      "Unprocessed Organic Cow Milk directly from our Farm to your Home.",
    bullets: ["No Preservatives", "No Antibiotics"],
    backgroundImage: "/images/hero-milk.jpg",
    cta: "Start Subscription",
    href: "/shop/raw-cow-milk-1000ml",
  },
  {
    id: 2,
    title: "Organic Cow Ghee",
    subtitle: "Pure & Aromatic",
    description:
      "Pure and Aromatic Organic Cow Ghee made from fresh Organic Cream, extracted from our Organic Milk.",
    bullets: [],
    backgroundImage: "/images/hero-ghee.jpg",
    cta: "Shop Ghee",
    href: "/shop/organic-cow-ghee",
  },
  {
    id: 3,
    title: "Organic Paneer",
    subtitle: "Soft & Healthy",
    description:
      "Soft and Healthy Paneer made from Organic Cow milk & Lemon. Comes with paneer water inside.",
    bullets: [],
    backgroundImage: "/images/hero-paneer.jpg",
    cta: "Shop Paneer",
    href: "/shop/organic-paneer",
  },
  {
    id: 4,
    title: "Organic Butter",
    subtitle: "Creamy & Fresh",
    description:
      "Churned from Organic Cream. Soft and creamy butter for tasty dosas.",
    bullets: [],
    backgroundImage: "/images/hero-butter.jpg",
    cta: "Shop Butter",
    href: "/shop/organic-butter",
  },
];

const AUTOPLAY_MS = 6500;

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Autoplay — pauses on hover so a shopper can read a slide they care about. */
  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % slides.length),
      AUTOPLAY_MS
    );
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused]);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div
      className="relative h-[440px] sm:h-[520px] md:h-[620px] lg:h-[700px] overflow-hidden bg-bg-deep"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, index) => {
        const active = index === currentSlide;
        return (
          <div
            key={slide.id}
            aria-hidden={!active}
            className={`absolute inset-0 transition-all duration-[900ms] ease-out ${
              active ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Background image with a subtle Ken-Burns zoom on the active slide. */}
            <div
              className={`absolute inset-0 transition-transform duration-[8000ms] ease-out ${
                active ? "scale-[1.04]" : "scale-100"
              }`}
              style={{
                backgroundImage: `url('${slide.backgroundImage}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />

            {/* Cream scrim — vertical stack on mobile, left-fade on desktop */}
            <div
              className="absolute inset-0 pointer-events-none md:hidden"
              style={{
                background:
                  "linear-gradient(180deg, rgba(251,235,209,0.95) 0%, rgba(251,235,209,0.82) 55%, rgba(251,235,209,0.35) 100%)",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none hidden md:block"
              style={{
                background:
                  "linear-gradient(90deg, rgba(251,235,209,0.9) 0%, rgba(251,235,209,0.55) 32%, rgba(251,235,209,0) 62%)",
              }}
            />

            {/* Copy — each element eases in with a small stagger. */}
            <div className="relative z-10 flex items-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
              <div
                className={`max-w-xl md:max-w-2xl md:ml-4 lg:ml-10 ${
                  active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                } transition-all duration-700 ease-out`}
                style={{ transitionDelay: active ? "150ms" : "0ms" }}
              >
                <p
                  className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.32em] text-butter-deep mb-4"
                  style={{
                    transitionDelay: active ? "150ms" : "0ms",
                  }}
                >
                  {slide.subtitle}
                </p>
                <h1 className="display-hero text-[2.4rem] sm:text-5xl md:text-6xl lg:text-[4.4rem] mb-4 md:mb-6">
                  {slide.title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-text mb-4 sm:mb-5 leading-relaxed max-w-md sm:max-w-lg">
                  {slide.description}
                </p>
                {slide.bullets.length > 0 && (
                  <ul className="mb-6 sm:mb-7 space-y-2">
                    {slide.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-center gap-2 text-sm sm:text-base text-text font-medium"
                      >
                        <span
                          className="inline-flex h-1.5 w-1.5 rounded-full bg-green"
                          aria-hidden="true"
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
                <Link
                  href={slide.href}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        );
      })}

      {/* Prev / next — softer, more editorial */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/85 text-green shadow-soft transition-all duration-300 ease-out hover:bg-white hover:-translate-y-[calc(50%+2px)]"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/85 text-green shadow-soft transition-all duration-300 ease-out hover:bg-white hover:-translate-y-[calc(50%+2px)]"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
      </button>

      {/* Elongated pill dots */}
      <div
        className="absolute bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2"
        role="tablist"
        aria-label="Hero slides"
      >
        {slides.map((s, index) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={index === currentSlide}
            aria-label={`${s.title} slide`}
            onClick={() => setCurrentSlide(index)}
            className={`h-[3px] rounded-full transition-all duration-500 ease-out ${
              index === currentSlide
                ? "w-12 bg-green"
                : "w-6 bg-green/40 hover:bg-green/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
