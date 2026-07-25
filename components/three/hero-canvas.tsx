"use client";

import { useEffect, useState, type MutableRefObject } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const HeroScene = dynamic(() => import("./hero-scene"), {
  ssr: false,
  loading: () => null,
});

/**
 * Gate for the full-viewport 3D hero. Renders WebGL only on motion-friendly,
 * larger viewports; everyone else gets a floating product still — same art
 * direction, zero WebGL cost.
 */
export function HeroCanvas({
  className,
  progress,
}: {
  className?: string;
  progress: MutableRefObject<number>;
}) {
  const [mode, setMode] = useState<"pending" | "webgl" | "static">("pending");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const smallScreen = window.matchMedia("(max-width: 767px)").matches;
    setMode(reduce || smallScreen ? "static" : "webgl");
  }, []);

  if (mode === "pending") return <div className={className} />;

  if (mode === "static") {
    return (
      <div className={`${className ?? ""} flex items-center justify-center`} aria-hidden="true">
        <div className="relative animate-float">
          <Image
            src="/images/fd-milk-pouch.svg"
            alt=""
            width={360}
            height={390}
            priority
            className="w-56 sm:w-64 h-auto drop-shadow-[0_36px_54px_rgba(15,46,43,0.32)]"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={className} aria-hidden="true">
      <HeroScene progress={progress} />
    </div>
  );
}
