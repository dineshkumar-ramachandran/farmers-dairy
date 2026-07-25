"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Leaf, Truck, ShieldCheck } from "lucide-react";
import { Magnetic } from "@/components/animations/magnetic";
import { SplitReveal } from "@/components/animations/split-reveal";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/components/animations";

const TRUST = [
  { Icon: Leaf, label: "100% pure & natural" },
  { Icon: ShieldCheck, label: "No preservatives" },
  { Icon: Truck, label: "Delivered by 7 AM" },
];

/**
 * Static-image hero used as the mobile / reduced-motion fallback for the
 * cinematic scroll-scrubbed hero. The image is one still from the same
 * commercial sequence so mobile and desktop tell an identical story.
 */
export function HeroClassic() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      gsap.set(el.querySelectorAll("[data-hero-in]"), { opacity: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-in]", {
        opacity: 0,
        y: 28,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.1,
      });
      gsap.from("[data-hero-product]", {
        opacity: 0,
        y: 30,
        scale: 0.96,
        duration: 1.1,
        ease: "power3.out",
        delay: 0.2,
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative min-h-[100svh] flex items-center overflow-hidden bg-[#eef0ef]"
      aria-label="Farmer's Dairy — fresh farm milk delivered"
    >
      {/* Full-bleed hero still from the same commercial sequence */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          data-hero-product
          src="/hero-frames/ezgif-frame-240.jpg"
          alt=""
          className="h-full w-full object-cover"
          style={{ objectPosition: "70% 50%" }}
        />
        {/* Legibility scrim — reads copy against the soft studio backdrop */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(238,240,239,0.95) 0%, rgba(238,240,239,0.55) 22%, rgba(238,240,239,0) 45%), linear-gradient(90deg, rgba(238,240,239,0.85) 0%, rgba(238,240,239,0.55) 40%, rgba(238,240,239,0) 68%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[88rem] mx-auto w-full px-4 sm:px-6 lg:px-10 pt-20 sm:pt-24 pb-24 lg:py-16">
        <div className="max-w-md lg:max-w-lg">
          <p data-hero-in className="eyebrow mb-6">
            Hosur · Tamil Nadu · Farm fresh daily
          </p>
          <h1 className="display-hero text-[2.4rem] leading-[1.02] sm:text-5xl lg:text-[4.2rem]">
            <SplitReveal text="Fresh farm milk" as="span" className="block" />
            <SplitReveal
              text="delivered"
              as="span"
              className="block"
              wordClassName="text-gradient-green"
              delay={0.08}
            />
            <SplitReveal text="before dawn." as="span" className="block" delay={0.16} />
          </h1>

          <p data-hero-in className="mt-6 sm:mt-7 max-w-md text-base sm:text-lg text-ink-soft/80 leading-relaxed">
            Pure, unprocessed cow milk from our own Hosur pastures — no water,
            no preservatives. Sealed at 2 AM and at your door before 7.
          </p>

          <div data-hero-in className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <Magnetic>
              <Link href="/shop" className="btn-primary">
                Start your subscription
                <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
              </Link>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Link href="/about" className="btn-secondary">
                Our farm story
              </Link>
            </Magnetic>
          </div>

          <ul data-hero-in className="mt-10 sm:mt-12 flex flex-wrap gap-x-6 gap-y-3">
            {TRUST.map(({ Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-[13px] sm:text-sm font-semibold text-ink-soft/75"
              >
                <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-mint-light text-teal">
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 z-10" aria-hidden="true">
        <span className="inline-flex flex-col items-center gap-1 text-[10px] font-bold uppercase tracking-[0.3em] text-ink-soft/45">
          Scroll
          <ChevronDown className="w-4 h-4 animate-float" />
        </span>
      </div>
    </section>
  );
}
