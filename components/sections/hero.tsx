"use client";

import { useEffect, useState } from "react";
import { HeroSequence } from "./hero-sequence";
import { HeroClassic } from "./hero-classic";
import { Ticker } from "./ticker";
import { prefersReducedMotion } from "@/lib/gsap";

/**
 * Hero entrypoint — a scroll-scrubbed image-sequence hero on capable desktops,
 * with the clean product-forward hero as the mobile / reduced-motion fallback
 * (the frame sequence is heavy to preload on small/low-power devices).
 *
 * Frames are extracted from hero-video.mp4, so they carry the video's quality
 * while scrubbing far more smoothly than seeking a compressed video ever can.
 */
export function Hero() {
  const [mode, setMode] = useState<"pending" | "sequence" | "classic">(
    "pending"
  );

  useEffect(() => {
    const smallScreen = window.matchMedia("(max-width: 1023px)").matches;
    setMode(prefersReducedMotion() || smallScreen ? "classic" : "sequence");
  }, []);

  if (mode === "pending") {
    return <div className="h-[100svh]" aria-hidden="true" />;
  }

  return (
    <>
      {mode === "sequence" ? <HeroSequence /> : <HeroClassic />}
      <Ticker />
    </>
  );
}
