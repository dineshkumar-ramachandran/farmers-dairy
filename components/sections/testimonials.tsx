"use client";

import { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { testimonials } from "@/lib/site";
import { SectionHeader } from "./section-header";
import { Reveal } from "@/components/motion/reveal";

function initials(name: string) {
  return name
    .replace(/^(MS|MR|MRS)\.\s*/i, "")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

const ROTATE_INTERVAL = 6000;

/** One oversized pull-quote at a time, auto-rotating with manual controls. */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const t = testimonials[index];

  useEffect(() => {
    if (reduce) return;
    const timer = setInterval(
      () => setIndex((prev) => (prev + 1) % testimonials.length),
      ROTATE_INTERVAL
    );
    return () => clearInterval(timer);
  }, [reduce]);

  const step = (dir: 1 | -1) =>
    setIndex((prev) => (prev + dir + testimonials.length) % testimonials.length);

  return (
    <section
      className="relative py-20 sm:py-28 overflow-hidden"
      aria-labelledby="testimonials-heading">
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-10">
        <SectionHeader
          num="05"
          eyebrow="Testimonials"
          title={
            <>
              What Our{" "}
              <span className="italic text-gradient-green">Customers</span> Say
            </>
          }
          description="Join thousands of satisfied families who trust us for their daily milk needs."
        />

        <Reveal>
          <div className="relative max-w-4xl mx-auto text-center min-h-[19rem] sm:min-h-[17rem]">
            {/* Giant quote mark */}
            <span
              className="font-display text-[7rem] leading-none text-mint/40 select-none block -mb-10"
              aria-hidden="true">
              &ldquo;
            </span>

            <AnimatePresence mode="wait">
              <motion.figure
                key={t.name}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -14 }}
                transition={{ duration: 0.45 }}>
                <blockquote className="font-display text-2xl sm:text-3xl lg:text-4xl italic leading-snug text-ink text-balance">
                  {t.text}
                </blockquote>
                <figcaption className="mt-8 flex items-center justify-center gap-4">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-green font-display font-semibold text-cream"
                    aria-hidden="true">
                    {initials(t.name)}
                  </span>
                  <span className="text-left">
                    <span className="block font-bold text-sm tracking-wide">
                      {t.name}
                    </span>
                    <span className="mt-0.5 flex items-center gap-2 text-xs text-text/55">
                      {t.location}
                      <span
                        className="flex gap-0.5"
                        role="img"
                        aria-label={`${t.rating} out of 5 stars`}>
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 text-gold fill-current"
                            aria-hidden="true"
                          />
                        ))}
                      </span>
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            {/* Controls */}
            <div className="mt-10 flex items-center justify-center gap-3">
              <button
                onClick={() => step(-1)}
                aria-label="Previous testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-green/40 text-green transition-all duration-300 hover:bg-green hover:text-cream">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-1.5" role="tablist" aria-label="Testimonials">
                {testimonials.map((item, i) => (
                  <button
                    key={item.name}
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Testimonial from ${item.name}`}
                    onClick={() => setIndex(i)}
                    className={`h-[3px] rounded-full transition-all duration-500 ${
                      i === index ? "w-10 bg-green" : "w-5 bg-green/20 hover:bg-green/45"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => step(1)}
                aria-label="Next testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-green/40 text-green transition-all duration-300 hover:bg-green hover:text-cream">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
