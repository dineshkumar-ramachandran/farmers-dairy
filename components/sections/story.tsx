import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";

/** Editorial storytelling band — original copy verbatim, drop-cap treatment. */
export function Story() {
  return (
    <section
      className="relative py-20 sm:py-28 overflow-hidden bg-green-deep bg-grain"
      aria-labelledby="story-heading">
      <div
        className="absolute top-[-15%] right-[-8%] w-[26rem] h-[26rem] blob animate-blob bg-mint/15"
        aria-hidden="true"
      />

      <div className="relative max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-center">
          {/* Arch pasture photograph */}
          <Parallax offset={36}>
            <Reveal direction="right">
              <div className="relative">
                <div
                  className="relative overflow-hidden h-[360px] sm:h-[460px]"
                  style={{
                    WebkitMaskImage:
                      "radial-gradient(120% 100% at 50% 45%, #000 55%, transparent 100%)",
                    maskImage:
                      "radial-gradient(120% 100% at 50% 45%, #000 55%, transparent 100%)",
                  }}
                >
                  <Image
                    src="/images/Hero-slider-image-4.png"
                    alt="Cows at Farmer's Dairy pasture — from our family farm to your family table"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-[center_70%] transition-transform duration-[2500ms] hover:scale-105"
                  />
                  {/* Blend the photo into the dark section on every edge */}
                  <div className="absolute inset-0 bg-gradient-to-t from-pine via-pine/10 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-pine/40 to-transparent" />
                </div>
                <p className="mt-2 text-center font-display italic text-cream/85 text-lg">
                  “From Our Farm to your Home”
                </p>
              </div>
            </Reveal>
          </Parallax>

          {/* Story copy */}
          <div>
            <Reveal>
              <div className="flex items-center gap-4 mb-6">
                <span className="section-num" aria-hidden="true">
                  02
                </span>
                <span className="eyebrow !text-mint">Our Story</span>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="story-heading"
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02] !text-cream">
                A LITTLE STORY{" "}
                <span className="italic text-mint">ABOUT US</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-3 font-display text-xl sm:text-2xl text-gold italic">
                Farmers Dairy
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="mt-7 text-cream/80 text-base sm:text-lg leading-[1.9] first-letter:font-display first-letter:text-6xl first-letter:font-semibold first-letter:text-mint first-letter:float-left first-letter:mr-3 first-letter:leading-[0.85]">
                A small start up with a big vision started by two youngsters,
                Farmer's dairy is a fresh dairy based product based company in
                Hosur. Farmer's Dairy is a company that acts as a direct
                intermediate between a farmer and a consumer to provide fresh
                raw cow milk without adding any water or other preservatives.
                Farmer's Dairy is a small initiative that helps in benefiting
                both farmer's and the consumer with good price and good health.
                In this busy running world we deliver milk through eco friendly
                glass bottles to your doorstep.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
