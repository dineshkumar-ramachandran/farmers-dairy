"use client";

import { useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** Pull strength — higher follows the cursor more closely. */
  strength?: number;
}

/**
 * Magnetic pointer attraction for buttons / interactive chips. Eases toward
 * the cursor on hover and springs back on leave. Disabled for reduced-motion
 * and touch (no hover) so it never traps taps.
 */
export function Magnetic({ children, className, strength = 0.4 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
    gsap.to(el, { x, y, duration: 0.6, ease: "power3.out" });
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-block will-change-transform ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
