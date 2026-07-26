"use client";

import { useRef } from "react";
import { Sprout, Milk, PackageCheck, Truck } from "lucide-react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/components/animations";

const STAGES = [
  {
    no: "01",
    title: "On Our Pastures",
    time: "Every morning",
    copy: "Our cows graze on open, natural pastures around Hosur — no shortcuts, no additives, just calm mornings and good grass.",
    Icon: Sprout,
  },
  {
    no: "02",
    title: "Fresh Raw Milk",
    time: "Direct from farmer",
    copy: "We act as a direct link between the farmer and you, drawing pure raw cow milk without a drop of water or preservative added.",
    Icon: Milk,
  },
  {
    no: "03",
    title: "Packing & Sealing",
    time: "2:00 AM",
    copy: "Each batch is filled and sealed in the small hours so every pack reaches you at its freshest, still cool from the dairy.",
    Icon: PackageCheck,
  },
  {
    no: "04",
    title: "To Your Doorstep",
    time: "4 – 7 AM",
    copy: "Our delivery starts before dawn and finishes by 7 AM — fresh milk waiting at your door before the day begins.",
    Icon: Truck,
  },
];

/**
 * Farm-to-doorstep journey. On motion-friendly desktops the panels pin and
 * scroll horizontally; elsewhere they stack vertically.
 */
export function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    if (
      prefersReducedMotion() ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.innerWidth < 1024
    ) {
      return; // narrow / touch / reduced-motion → panels stack vertically
    }

    const ctx = gsap.context(() => {
      const getScroll = () => track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: () => -getScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScroll()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-pine bg-grain text-cloud overflow-hidden"
      aria-label="From our farm to your doorstep"
    >
      <div ref={trackRef} className="flex flex-col lg:flex-row lg:h-[100svh] lg:flex-nowrap">
        {/* Intro panel */}
        <div
          data-panel
          className="shrink-0 lg:w-[44vw] flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-16 lg:py-0"
        >
          <p className="eyebrow !text-butter mb-6">From farm to doorstep</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[0.95] !text-cloud">
            Four steps from{" "}
            <span className="text-gradient-butter">pasture to pack.</span>
          </h2>
          <p className="mt-6 max-w-md text-cloud/70 text-lg leading-relaxed">
            No middlemen, no warehouses. Follow the short, honest path your milk
            takes each morning.
          </p>
          <p className="mt-8 hidden lg:flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-cloud/50">
            Scroll to travel →
          </p>
        </div>

        {/* Stage panels */}
        {STAGES.map(({ no, title, time, copy, Icon }) => (
          <article
            data-panel
            key={no}
            className="shrink-0 lg:w-[34vw] flex flex-col justify-center px-6 sm:px-10 lg:px-14 py-14 lg:py-0 border-t lg:border-t-0 lg:border-l border-cloud/10"
          >
            <div className="flex items-center gap-5 mb-8">
              <span className="relative flex h-20 w-20 items-center justify-center rounded-full border border-butter/40 bg-butter/10">
                <Icon className="h-9 w-9 text-butter" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <span className="font-display text-6xl font-extrabold text-cloud/10">{no}</span>
            </div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-butter mb-3">
              {time}
            </p>
            <h3 className="font-display text-2xl sm:text-3xl font-bold !text-cloud">{title}</h3>
            <p className="mt-3 max-w-sm text-cloud/70 leading-relaxed">{copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
