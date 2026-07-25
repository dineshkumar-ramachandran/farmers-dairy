"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "./use-isomorphic-layout-effect";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Vertical travel distance in px. */
  y?: number;
  delay?: number;
  duration?: number;
  /** When set, animates direct children in sequence instead of the wrapper. */
  stagger?: number;
  /** Fraction of viewport at which the reveal fires (0–1, from top). */
  start?: string;
  once?: boolean;
}

/**
 * Scroll-triggered fade + rise. The default differentiator over plain opacity
 * fades: content lifts in with a soft expo ease. Respects reduced-motion.
 */
export function Reveal({
  children,
  as,
  className,
  y = 40,
  delay = 0,
  duration = 0.9,
  stagger,
  start = "top 82%",
  once = true,
}: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      gsap.set(stagger ? el.children : el, { opacity: 1, y: 0 });
      return;
    }

    const targets = stagger ? el.children : el;
    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y,
        duration,
        delay,
        ease: "power3.out",
        stagger: stagger ?? 0,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: once ? "play none none none" : "play none none reverse",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [y, delay, duration, stagger, start, once]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
