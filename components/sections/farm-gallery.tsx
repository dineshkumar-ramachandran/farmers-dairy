"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { farmGallery } from "@/lib/site";
import { SectionHeader } from "./section-header";
import { Reveal } from "@/components/motion/reveal";

/** Filmstrip gallery with snap scrolling and a keyboard-accessible lightbox. */
export function FarmGallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setLightbox((prev) =>
        prev === null
          ? prev
          : (prev + dir + farmGallery.length) % farmGallery.length
      ),
    []
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, step]);

  return (
    <section
      className="relative py-20 sm:py-28 overflow-hidden bg-mint-light/50"
      aria-labelledby="gallery-heading">
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-10">
        <SectionHeader
          num="04"
          eyebrow="Life at the Farm"
          title={
            <>
              Straight From{" "}
              <span className="italic text-gradient-green">Our Pastures</span>
            </>
          }
          description="Our cows graze on natural pastures, ensuring the highest quality and nutrition."
        />
      </div>

      {/* Filmstrip — free horizontal scroll with snap */}
      <Reveal>
        <div
          className="flex gap-5 overflow-x-auto px-4 sm:px-6 lg:px-10 pb-6 snap-x snap-mandatory scroll-px-6"
          role="list"
          aria-label="Farm photographs">
          {farmGallery.map((photo, i) => (
            <div
              key={photo.src}
              role="listitem"
              className="snap-start shrink-0 w-[82vw] sm:w-[46vw] lg:w-[31vw]">
              <motion.button
                type="button"
                onClick={() => setLightbox(i)}
                aria-label={`View larger: ${photo.alt}`}
                className="group relative block w-full overflow-hidden rounded-3xl border border-green/15"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={1280}
                  height={720}
                  loading="lazy"
                  className="h-[300px] sm:h-[360px] w-full object-cover transition-transform duration-[1.8s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-deep/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between gap-3 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-cream text-sm font-medium text-left drop-shadow">
                    {photo.alt}
                  </p>
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream text-green"
                    aria-hidden="true">
                    <Expand className="w-4 h-4" />
                  </span>
                </div>
                <span
                  className="absolute top-4 left-4 section-num bg-cream/85 rounded-full px-2.5 py-1"
                  aria-hidden="true">
                  0{i + 1}
                </span>
              </motion.button>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-green-deep/92 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={farmGallery[lightbox].alt}>
            <motion.div
              className="relative max-w-5xl w-full"
              initial={{ scale: 0.92, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 16, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              onClick={(e) => e.stopPropagation()}>
              <Image
                src={farmGallery[lightbox].src}
                alt={farmGallery[lightbox].alt}
                width={1920}
                height={960}
                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
              />
              <p className="mt-4 text-center text-cream/85 text-sm">
                {farmGallery[lightbox].alt}
              </p>

              <button
                onClick={close}
                aria-label="Close gallery"
                className="absolute -top-3 -right-3 flex h-11 w-11 items-center justify-center rounded-full bg-cream text-green hover:scale-110 transition-transform">
                <X className="w-5 h-5" />
              </button>
              <button
                onClick={() => step(-1)}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-cream/90 text-green hover:scale-110 transition-transform">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => step(1)}
                aria-label="Next image"
                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-cream/90 text-green hover:scale-110 transition-transform">
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
