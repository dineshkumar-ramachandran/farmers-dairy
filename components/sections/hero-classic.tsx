"use client";

import { useEffect, useRef } from "react";
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
 * Clean, product-forward editorial hero. Used as the mobile / reduced-motion /
 * low-power fallback for the cinematic WebGL hero.
 */
export function HeroClassic() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

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
        y: 40,
        scale: 0.94,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.25,
      });
    }, el);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const el = stage.current;
    if (!el || prefersReducedMotion()) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const layers = el.querySelectorAll<HTMLElement>("[data-depth]");
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const cy = (e.clientY - (r.top + r.height / 2)) / r.height;
      layers.forEach((layer) => {
        const d = Number(layer.dataset.depth || 0);
        gsap.to(layer, { x: cx * d * 40, y: cy * d * 40, duration: 0.8, ease: "power3.out" });
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={root}
      className="relative min-h-[100svh] flex items-center overflow-hidden"
      aria-label="Farmer's Dairy — fresh farm milk delivered"
    >
      <div className="absolute -top-40 -left-40 w-[36rem] h-[36rem] blob animate-blob bg-teal-bright/25" aria-hidden="true" />
      <div className="absolute -bottom-52 -right-40 w-[34rem] h-[34rem] blob animate-blob-slow bg-butter/25" aria-hidden="true" />

      <div className="relative z-10 max-w-[88rem] mx-auto w-full px-4 sm:px-6 lg:px-10 grid lg:grid-cols-[1.02fr_0.98fr] items-center gap-10 lg:gap-6 py-24 lg:py-16">
        <div className="order-2 lg:order-1">
          <p data-hero-in className="eyebrow mb-6">
            Hosur · Tamil Nadu · Farm fresh daily
          </p>
          <h1 className="display-hero text-[3rem] leading-[0.92] sm:text-6xl lg:text-[5.2rem]">
            <SplitReveal text="Fresh farm milk," as="span" className="block" />
            <SplitReveal text="delivered" as="span" className="block" wordClassName="text-gradient-green" delay={0.08} />
            <SplitReveal text="before dawn." as="span" className="block" delay={0.16} />
          </h1>

          <p data-hero-in className="mt-7 max-w-lg text-lg text-ink-soft/80 leading-relaxed">
            Pure, unprocessed cow milk from our own Hosur pastures — no water,
            no preservatives. Sealed at 2 AM and at your door before 7.
          </p>

          <div data-hero-in className="mt-9 flex flex-wrap items-center gap-4">
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

          <ul data-hero-in className="mt-12 flex flex-wrap gap-x-8 gap-y-4">
            {TRUST.map(({ Icon, label }) => (
              <li key={label} className="flex items-center gap-2.5 text-sm font-semibold text-ink-soft/75">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mint-light text-teal">
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div ref={stage} className="order-1 lg:order-2 relative h-[380px] sm:h-[480px] lg:h-[600px]">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[78%] aspect-square rounded-full bg-gradient-to-br from-white/70 to-mint-light/50 blur-2xl" aria-hidden="true" />

          <div data-hero-product data-depth="0.6" className="absolute inset-0 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/product-milk-pouch.png"
              alt="Farmer's Dairy fresh cow milk packet"
              className="max-h-[86%] w-auto object-contain mix-blend-multiply drop-shadow-[0_30px_45px_rgba(15,46,43,0.18)] animate-float"
            />
          </div>

          <div data-depth="1.2" className="absolute bottom-[4%] left-[2%] w-[30%] max-w-[180px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/product-ghee.png"
              alt="Farmer's Dairy organic cow ghee"
              className="w-full h-auto object-contain mix-blend-multiply drop-shadow-[0_20px_30px_rgba(15,46,43,0.16)]"
              style={{ animation: "floatY 7s ease-in-out infinite" }}
            />
          </div>

          <div data-depth="1.5" className="absolute top-[2%] right-[0%] w-[28%] max-w-[168px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/product-paneer.png"
              alt="Farmer's Dairy organic malai paneer"
              className="w-full h-auto object-contain mix-blend-multiply drop-shadow-[0_20px_30px_rgba(15,46,43,0.16)]"
              style={{ animation: "floatY 8s ease-in-out infinite" }}
            />
          </div>
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
