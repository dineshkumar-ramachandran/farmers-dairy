"use client";

/**
 * Central GSAP entrypoint. Registers ScrollTrigger once on the client and
 * exposes shared helpers so animation logic stays in one place rather than
 * scattered inline across components.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

registerGsap();

/** True when the visitor asked for reduced motion — animations should no-op. */
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export { gsap, ScrollTrigger };
