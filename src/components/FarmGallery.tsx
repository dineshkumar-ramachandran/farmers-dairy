import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type FarmPhoto = { src: string; alt: string };

/**
 * Farm gallery — landscape sliding carousel on desktop, stacked cards on
 * mobile. Uses embla-carousel-react (already in the dependency tree) with
 * a `loop: true` behaviour and prev/next controls.
 */
export function FarmGallery({ photos }: { photos: FarmPhoto[] }) {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "center" });
  const [selected, setSelected] = useState(0);

  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    onSelect();
    embla.on("select", onSelect);
    // Autoplay: advance every 5 s, pause on hover of the viewport
    const id = window.setInterval(() => embla.scrollNext(), 5000);
    const viewport = embla.rootNode();
    const pause = () => window.clearInterval(id);
    viewport.addEventListener("mouseenter", pause);
    return () => {
      embla.off("select", onSelect);
      viewport.removeEventListener("mouseenter", pause);
      window.clearInterval(id);
    };
  }, [embla]);

  return (
    <div className="relative">
      {/* Mobile: stacked cards, keeps existing behaviour */}
      <div className="grid gap-6 md:hidden">
        {photos.map((p) => (
          <figure
            key={p.src}
            className="group overflow-hidden rounded-3xl bg-cream shadow-[0_10px_30px_-14px_rgba(15,46,10,0.35)]"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <figcaption className="border-t border-green/10 px-5 py-4 text-xs uppercase tracking-[0.18em] text-text/70">
              {p.alt}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Desktop: landscape carousel */}
      <div className="hidden md:block">
        <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
          <div className="flex">
            {photos.map((p) => (
              <figure
                key={p.src}
                className="relative flex min-w-0 shrink-0 grow-0 basis-full items-end overflow-hidden bg-cream"
              >
                <div className="aspect-[16/7] w-full overflow-hidden">
                  <img
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgba(15,46,10,0.75)_0%,transparent_60%)] px-8 py-6 text-cream">
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-butter">
                    Inside the Farm
                  </p>
                  <p className="mt-2 font-display text-2xl leading-tight">{p.alt}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <button
          onClick={scrollPrev}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-cream/95 text-green shadow-lg transition-transform hover:-translate-y-[calc(50%+2px)]"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={scrollNext}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-cream/95 text-green shadow-lg transition-transform hover:-translate-y-[calc(50%+2px)]"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="mt-5 flex justify-center gap-2">
          {photos.map((p, i) => (
            <button
              key={p.src}
              onClick={() => embla?.scrollTo(i)}
              aria-label={`Go to photo ${i + 1}`}
              className={`h-[3px] rounded-full transition-all ${
                i === selected ? "w-12 bg-green" : "w-6 bg-green/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
