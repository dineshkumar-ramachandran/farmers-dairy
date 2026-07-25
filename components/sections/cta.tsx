"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";

/** Full-width closing band — light, product-forward, frameless imagery. */
export function CTA() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-mint-light/60 to-milk py-20 sm:py-28"
      aria-labelledby="cta-heading"
    >
      <div className="absolute top-[-30%] left-[5%] w-80 h-80 blob animate-blob bg-teal-bright/20" aria-hidden="true" />
      <div className="absolute bottom-[-35%] right-[0%] w-96 h-96 blob animate-blob-slow bg-butter/20" aria-hidden="true" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="section-num" aria-hidden="true">
              06
            </span>
            <span className="eyebrow">Taste the Difference</span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            id="cta-heading"
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.02] text-ink text-balance"
          >
            Ready to Experience{" "}
            <span className="italic text-gradient-green">Farm Fresh</span> Milk?
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-7 text-ink-soft/75 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Join thousands of families who trust us for their daily milk needs.
            Start your subscription today and taste the difference.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10">
            <Magnetic>
              <Link href="/shop" className="btn-primary">
                Browse Products
                <ArrowRight className="ml-2.5 w-4 h-4" aria-hidden="true" />
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
