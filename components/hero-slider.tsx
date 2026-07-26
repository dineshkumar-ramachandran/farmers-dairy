"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

/**
 * Farmer's Dairy hero slider — four product slides (Milk, Ghee, Paneer,
 * Butter). Each background is a 1920×960 studio composite generated from the
 * product photography with a soft feather blend into the brand cream.
 */
const slides = [
  {
    id: 1,
    title: "Raw Cow Milk",
    subtitle: "From Farm to Home",
    description:
      "Unprocessed Organic Cow Milk directly from our Farm to your Home.",
    bullets: ["No Preservatives", "No Antibiotics"],
    backgroundImage: "url('/images/hero-milk.jpg')",
    cta: "Start Subscription",
  },
  {
    id: 2,
    title: "Organic Cow Ghee",
    subtitle: "Pure & Aromatic",
    description:
      "Pure and Aromatic Organic Cow Ghee made from fresh Organic Cream, extracted from our Organic Milk.",
    bullets: [],
    backgroundImage: "url('/images/hero-ghee.jpg')",
    cta: "Shop Ghee",
  },
  {
    id: 3,
    title: "Organic Paneer",
    subtitle: "Soft & Healthy",
    description:
      "Soft and Healthy Paneer made from Organic Cow milk & Lemon. Comes with paneer water inside.",
    bullets: [],
    backgroundImage: "url('/images/hero-paneer.jpg')",
    cta: "Shop Paneer",
  },
  {
    id: 4,
    title: "Organic Butter",
    subtitle: "Creamy & Fresh",
    description:
      "Churned from Organic Cream. Soft and creamy butter for tasty dosas.",
    bullets: [],
    backgroundImage: "url('/images/hero-butter.jpg')",
    cta: "Shop Butter",
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[680px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          aria-hidden={index !== currentSlide}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${
            index === currentSlide
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
          style={{
            backgroundImage: slide.backgroundImage,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Mobile: strong full-width cream scrim so text never overlaps
              product art. Desktop: soft partial gradient. */}
          <div
            className="absolute inset-0 pointer-events-none md:hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(251,235,209,0.94) 0%, rgba(251,235,209,0.82) 55%, rgba(251,235,209,0.35) 100%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none hidden md:block"
            style={{
              background:
                "linear-gradient(90deg, rgba(251,235,209,0.85) 0%, rgba(251,235,209,0.55) 30%, rgba(251,235,209,0) 60%)",
            }}
          />

          <div className="relative z-10 flex items-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl md:max-w-2xl animate-slide-up md:ml-4 lg:ml-10">
              <p className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.32em] text-butter-deep mb-3 sm:mb-4">
                {slide.subtitle}
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-green-deep mb-3 sm:mb-4 md:mb-6 leading-[1.02]">
                {slide.title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-text mb-4 sm:mb-5 leading-relaxed max-w-md sm:max-w-lg">
                {slide.description}
              </p>
              {slide.bullets.length > 0 && (
                <ul className="mb-6 sm:mb-7 space-y-1.5">
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
                href="/shop"
                className="btn-primary inline-flex items-center text-sm sm:text-base"
              >
                {slide.cta}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/85 hover:bg-white text-green p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 z-20 shadow"
      >
        <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/85 hover:bg-white text-green p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 z-20 shadow"
      >
        <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-[3px] rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-10 bg-green"
                : "w-6 bg-green/40 hover:bg-green/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
