"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";

/**
 * Site-wide inertial smooth scrolling, synced to GSAP ScrollTrigger so every
 * pinned/scrubbed animation stays perfectly in step with the Lenis position.
 * Skipped on reduced-motion and coarse-pointer (touch) devices where native
 * scrolling feels better — ScrollTrigger then falls back to native scroll.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    registerGsap();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    if (prefersReducedMotion || isTouch) {
      // Still refresh triggers so scroll-driven reveals fire on native scroll.
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });

    (window as any).__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(update);
      if ((window as any).__lenis === lenis) delete (window as any).__lenis;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
