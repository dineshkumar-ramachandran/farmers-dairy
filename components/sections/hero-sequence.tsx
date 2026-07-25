"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  Leaf,
  Truck,
  ShieldCheck,
} from "lucide-react";
import { Magnetic } from "@/components/animations/magnetic";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/components/animations";

/* ---- Frame sequence config ---- */
const FRAME_COUNT = 240; // frames extracted from hero-video.mp4 @24fps
const FRAME_DIR = "/hero-frames";
const FRAME_EXT = "jpg";
/** Frames needed before scrubbing is enabled (avoids scrolling past gaps). */
const WARMUP_FRAMES = 48;
const framePath = (i: number) =>
  `${FRAME_DIR}/ezgif-frame-${String(i).padStart(3, "0")}.${FRAME_EXT}`;

const TRUST = [
  { Icon: Leaf, label: "100% pure & natural" },
  { Icon: ShieldCheck, label: "No preservatives" },
  { Icon: Truck, label: "Delivered by 7 AM" },
];

/**
 * Apple-style scroll-scrubbed image-sequence hero. The frames are a full-bleed
 * studio product shot (packet + milk splash on a soft backdrop); scrolling
 * scrubs the sequence frame-by-frame on a 2D canvas while the hero pins via CSS
 * sticky. A left scrim keeps the overlaid copy readable.
 *
 * Smoothness notes: draws are batched into a single rAF per animation frame and
 * skipped entirely when the frame index hasn't changed, so fast scrolling never
 * queues redundant canvas work. If a frame hasn't decoded yet the nearest ready
 * frame is drawn instead, which keeps motion continuous rather than flickering.
 */
export function HeroSequence() {
  const rootRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const readyFlags = useRef<boolean[]>([]);
  const stateRef = useRef({ frame: 0 });
  const lastDrawn = useRef(-1);
  const rafPending = useRef(false);
  const [warm, setWarm] = useState(false);
  const [loaded, setLoaded] = useState(0);

  /* Preload frames — first WARMUP_FRAMES eagerly, then the rest. */
  useEffect(() => {
    let cancelled = false;
    const imgs: HTMLImageElement[] = new Array(FRAME_COUNT);
    readyFlags.current = new Array(FRAME_COUNT).fill(false);
    let count = 0;
    let warmCount = 0;

    const load = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          if (!cancelled) {
            readyFlags.current[i] = true;
            count++;
            setLoaded(count);
            if (i < WARMUP_FRAMES && ++warmCount >= WARMUP_FRAMES) setWarm(true);
            if (i === 0) requestDraw();
          }
          resolve();
        };
        img.onerror = () => {
          if (!cancelled) {
            count++;
            setLoaded(count);
            if (i < WARMUP_FRAMES && ++warmCount >= WARMUP_FRAMES) setWarm(true);
          }
          resolve();
        };
        img.src = framePath(i + 1);
        imgs[i] = img;
      });

    imagesRef.current = imgs;

    (async () => {
      // Warm-up block first so the opening of the sequence is instantly smooth.
      await Promise.all(
        Array.from({ length: Math.min(WARMUP_FRAMES, FRAME_COUNT) }, (_, i) => load(i))
      );
      if (cancelled) return;
      setWarm(true);
      // Then the remainder, in small batches to avoid saturating the network.
      const BATCH = 12;
      for (let start = WARMUP_FRAMES; start < FRAME_COUNT; start += BATCH) {
        if (cancelled) return;
        await Promise.all(
          Array.from(
            { length: Math.min(BATCH, FRAME_COUNT - start) },
            (_, k) => load(start + k)
          )
        );
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Nearest already-decoded frame, so we never draw a blank. */
  const resolveFrame = (idx: number) => {
    const imgs = imagesRef.current;
    const flags = readyFlags.current;
    if (flags[idx] && imgs[idx]?.naturalWidth) return imgs[idx];
    for (let d = 1; d < FRAME_COUNT; d++) {
      const lo = idx - d;
      const hi = idx + d;
      if (lo >= 0 && flags[lo] && imgs[lo]?.naturalWidth) return imgs[lo];
      if (hi < FRAME_COUNT && flags[hi] && imgs[hi]?.naturalWidth) return imgs[hi];
    }
    return null;
  };

  const drawNow = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const idx = Math.min(
      FRAME_COUNT - 1,
      Math.max(0, Math.round(stateRef.current.frame))
    );
    if (idx === lastDrawn.current) return; // nothing changed — skip the work
    const img = resolveFrame(idx);
    if (!img) return;
    lastDrawn.current = idx;
    const cw = canvas.width;
    const ch = canvas.height;
    // Cover — fill the hero, product stays framed, crop the studio margins.
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
  };

  /** Coalesce many scroll updates into one draw per animation frame. */
  const requestDraw = () => {
    if (rafPending.current) return;
    rafPending.current = true;
    requestAnimationFrame(() => {
      rafPending.current = false;
      drawNow();
    });
  };

  /* Canvas sizing */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let lastW = 0;
    let lastH = 0;
    const resize = () => {
      // Source is 720p — capping DPR keeps fill-rate low without visible loss.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const rect = canvas.getBoundingClientRect();
      const w = Math.round(rect.width * dpr);
      const h = Math.round(rect.height * dpr);
      // Ignore no-op resizes (mobile URL-bar show/hide fires these constantly).
      if (w === lastW && h === lastH) return;
      lastW = w;
      lastH = h;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.imageSmoothingQuality = "high";
      lastDrawn.current = -1; // buffer cleared by the resize — force a redraw
      drawNow();
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Scroll → frame scrub */
  useIsomorphicLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      stateRef.current.frame = Math.round(FRAME_COUNT * 0.5);
      lastDrawn.current = -1;
      requestDraw();
      return;
    }
    if (!warm) return; // wait for the warm-up block so early scroll isn't gappy

    const st = gsap.to(stateRef.current, {
      frame: FRAME_COUNT - 1,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        // Lenis already smooths the scroll; a light scrub avoids double-easing
        // (which reads as laggy/mushy) while still catching up on fast flicks.
        scrub: 0.25,
        invalidateOnRefresh: true,
      },
      onUpdate: requestDraw,
    });
    ScrollTrigger.refresh();
    return () => {
      st.scrollTrigger?.kill();
      st.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [warm]);

  /* Intro reveal for copy */
  useIsomorphicLayoutEffect(() => {
    const el = rootRef.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-in]", {
        opacity: 0,
        y: 26,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.15,
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative h-[420vh]"
      aria-label="Farmer's Dairy — fresh farm milk delivered">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#eef0ef]">
        {/* Full-bleed studio frame canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        />

        {/* Left legibility scrim */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(240,241,238,0.96) 0%, rgba(240,241,238,0.72) 30%, rgba(240,241,238,0) 58%)",
          }}
          aria-hidden="true"
        />

        {/* Copy overlay */}
        <div className="relative z-10 max-w-[88rem] mx-auto h-full px-4 sm:px-6 lg:px-10 flex items-center">
          <div className="max-w-xl">
            <p data-in className="eyebrow mb-6">
              Hosur · Tamil Nadu · Farm fresh daily
            </p>
            <h1
              data-in
              className="display-hero text-[2.7rem] leading-[1.02] sm:text-6xl lg:text-[4.4rem]">
              <span className="block whitespace-nowrap">Fresh farm milk</span>
              <span className="block text-gradient-green">
                delivered before dawn.
              </span>
            </h1>
            <p
              data-in
              className="mt-7 max-w-md text-lg text-ink-soft/80 leading-relaxed">
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
                <Link href="/about" className="btn-secondary">
                  Our farm story
                </Link>
              </Magnetic>
            </div>
            <ul data-in className="mt-12 flex flex-wrap gap-x-8 gap-y-4">
              {TRUST.map(({ Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2.5 text-sm font-semibold text-ink-soft/75">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mint-light text-teal">
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Scroll cue + loading state */}
        <div
          className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
          aria-hidden="true">
          <span className="inline-flex flex-col items-center gap-1 text-[10px] font-bold uppercase tracking-[0.3em] text-ink-soft/45">
            {loaded < FRAME_COUNT
              ? `Loading ${Math.round((loaded / FRAME_COUNT) * 100)}%`
              : "Scroll"}
            <ChevronDown className="w-4 h-4 animate-float" />
          </span>
        </div>
      </div>
    </section>
  );
}
