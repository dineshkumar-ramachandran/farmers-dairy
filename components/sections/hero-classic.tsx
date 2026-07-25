"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Leaf, Truck, ShieldCheck } from "lucide-react";
import { Magnetic } from "@/components/animations/magnetic";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/components/animations";

const TRUST = [
  { Icon: Leaf, label: "100% pure & natural" },
  { Icon: ShieldCheck, label: "No preservatives" },
  { Icon: Truck, label: "Delivered by 7 AM" },
];

/**
 * Static hero used on mobile (and as the reduced-motion desktop fallback for
 * the scroll-scrubbed sequence). Deliberately minimal: text stack + a single
 * milk-packet still, no scenery, no scroll effects, no floating decorations.
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
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.1,
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-milk"
      aria-label="Farmer's Dairy — fresh farm milk delivered"
    >
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-10 pt-10 pb-14 sm:pt-14 sm:pb-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          {/* Copy */}
          <div className="order-1">
            <p data-hero-in className="eyebrow mb-5">
              Hosur · Tamil Nadu · Farm fresh daily
            </p>
            <h1
              data-hero-in
              className="display-hero text-[2.2rem] leading-[1.05] sm:text-5xl lg:text-[4rem]"
            >
              <span className="block">Fresh farm milk</span>
              <span className="block text-gradient-green">
                delivered before dawn.
              </span>
            </h1>

            <p
              data-hero-in
              className="mt-5 sm:mt-6 max-w-md text-[15px] sm:text-base lg:text-lg text-ink-soft/80 leading-relaxed"
            >
              Pure, unprocessed cow milk from our own Hosur pastures — no water,
              no preservatives. Sealed at 2 AM and at your door before 7.
            </p>

            <div data-hero-in className="mt-7 flex flex-wrap items-center gap-3">
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

            <ul
              data-hero-in
              className="mt-8 sm:mt-10 flex flex-wrap gap-x-5 gap-y-3"
            >
              {TRUST.map(({ Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 text-[13px] font-semibold text-ink-soft/75"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-mint-light text-teal">
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* Milk packet — single still, no animation */}
          <div
            data-hero-in
            className="order-2 flex items-center justify-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/product-milk-pouch-transparent.png"
              alt="Farmer's Dairy fresh cow milk packet"
              className="max-h-[340px] sm:max-h-[420px] lg:max-h-[520px] w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
