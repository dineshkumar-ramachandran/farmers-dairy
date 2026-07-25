"use client";

import { useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";

/** Brand phrases — all lifted verbatim from existing site copy. */
const phrases = [
  "Fresh Farm Milk",
  "100% Pure & Natural",
  "No Preservatives",
  "Delivered Daily",
  "Farm to Table",
  "Eco-Friendly Delivery",
];

/** Full-bleed marquee strip separating hero from content. */
export function Ticker({ reverse = false }: { reverse?: boolean }) {
  const reduce = useReducedMotion();
  const row = [...phrases, ...phrases, ...phrases];

  return (
    <div
      className="relative overflow-hidden border-y border-green/20 bg-green py-3.5"
      aria-hidden="true">
      <div
        className={`flex w-max gap-0 animate-marquee ${reduce ? "!animate-none" : ""}`}
        style={
          {
            "--marquee-duration": "36s",
            animationDirection: reverse ? "reverse" : "normal",
          } as CSSProperties
        }>
        {row.map((phrase, i) => (
          <span
            key={`${phrase}-${i}`}
            className="flex items-center gap-6 pr-6 whitespace-nowrap">
            <span className="font-display italic text-cream/95 text-lg sm:text-xl">
              {phrase}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          </span>
        ))}
      </div>
    </div>
  );
}
