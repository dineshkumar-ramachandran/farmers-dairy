"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Leaf, Truck, ShieldCheck } from "lucide-react";
import { Magnetic } from "@/components/animations/magnetic";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/components/animations";

const TRUST = [
  { Icon: Leaf, label: "100% pure & natural" },
  { Icon: ShieldCheck, label: "No preservatives" },
  { Icon: Truck, label: "Delivered by 7 AM" },
];

/**
 * Scroll-scrubbed video hero. The commercial MP4 is scrubbed by scroll (crisp
 * direct decode, no frame re-compression). The clip sits in the right ~60% with
 * a blend into the left copy column so text and product never overlap. Pins via
 * CSS sticky. Mobile / reduced-motion falls back to HeroClassic.
 */
export function HeroVideo() {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [, setReady] = useState(false);

  /* Scroll → video time scrub */
  useIsomorphicLayoutEffect(() => {
    const el = rootRef.current;
    const video = videoRef.current;
    if (!el || !video) return;

    let st: ScrollTrigger | null = null;

    const start = () => {
      const dur = video.duration || 10;
      video.pause();
      try {
        video.currentTime = 0.001;
      } catch {}
      if (prefersReducedMotion()) {
        video.currentTime = dur * 0.5;
        return;
      }
      st = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (video.readyState >= 1) {
            video.currentTime = Math.min(dur - 0.05, self.progress * dur);
          }
        },
      });
      ScrollTrigger.refresh();
      setReady(true);
    };

    if (video.readyState >= 1) start();
    else video.addEventListener("loadedmetadata", start, { once: true });
    video.load();

    return () => {
      st?.kill();
      video.removeEventListener("loadedmetadata", start);
    };
  }, []);

  /* Intro reveal for copy */
  useIsomorphicLayoutEffect(() => {
    const el = rootRef.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-in]", { opacity: 0, y: 26, duration: 1, ease: "power3.out", stagger: 0.1, delay: 0.15 });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative h-[500vh]" aria-label="Farmer's Dairy — fresh farm milk delivered">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#eceeec]">
        {/* Video occupies the right portion */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[64%]">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            style={{ objectPosition: "50% 45%" }}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          {/* Blend the video's left edge into the copy column */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(90deg, #eceeec 0%, rgba(236,238,236,0.55) 22%, rgba(236,238,236,0) 48%)" }}
            aria-hidden="true"
          />
        </div>

        {/* Copy — left column */}
        <div className="relative z-10 max-w-[88rem] mx-auto h-full px-4 sm:px-6 lg:px-10 flex items-center">
          <div className="max-w-md lg:max-w-lg">
            <p data-in className="eyebrow mb-6">Hosur · Tamil Nadu · Farm fresh daily</p>
            <h1 data-in className="display-hero text-[2.6rem] leading-[1.03] sm:text-6xl lg:text-[4.2rem]">
              <span className="block whitespace-nowrap">Fresh farm milk</span>
              <span className="block text-gradient-green">delivered before dawn.</span>
            </h1>
            <p data-in className="mt-7 max-w-sm text-lg text-ink-soft/80 leading-relaxed">
              Pure, unprocessed cow milk from our own Hosur pastures — no water,
              no preservatives. Sealed at 2 AM and at your door before 7.
            </p>
            <div data-in className="mt-9 flex flex-wrap items-center gap-4">
              <Magnetic>
                <Link href="/shop" className="btn-primary">
                  Start your subscription
                  <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                </Link>
              </Magnetic>
              <Magnetic strength={0.25}>
                <Link href="/about" className="btn-secondary">Our farm story</Link>
              </Magnetic>
            </div>
            <ul data-in className="mt-12 flex flex-wrap gap-x-8 gap-y-4">
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
        </div>

        {/* Scroll cue */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 z-10" aria-hidden="true">
          <span className="inline-flex flex-col items-center gap-1 text-[10px] font-bold uppercase tracking-[0.3em] text-ink-soft/45">
            Scroll
            <ChevronDown className="w-4 h-4 animate-float" />
          </span>
        </div>
      </div>
    </section>
  );
}
