import type { Metadata } from "next";
import Image from "next/image";
import { Heart, Award, Truck, Users, Target, Eye } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";
import { freshnessTimeline } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "A small start up with a big vision started by two youngsters, Farmer's dairy is a fresh dairy based product based company in Hosur.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: Heart,
    title: "Family Values",
    text: "Our farm has been built on family values. We treat every customer like family and every cow with the love and care they deserve.",
  },
  {
    icon: Award,
    title: "Quality First",
    text: "We maintain the highest standards of quality control, from milking to packing. Every batch is tested to ensure purity and freshness without any preservatives.",
  },
  {
    icon: Truck,
    title: "Eco-Friendly Delivery",
    text: "We deliver milk in eco-friendly glass bottles to reduce environmental impact. Our delivery team takes pride in punctual, reliable service.",
  },
  {
    icon: Users,
    title: "Community Focus",
    text: "We're proud to be part of the Hosur community. Supporting local families with nutritious milk while maintaining sustainable farming practices.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen overflow-x-clip">
      {/* Editorial page hero */}
      <section className="relative pt-14 sm:pt-20 pb-14">
        <div
          className="absolute top-[-6rem] right-[-8rem] w-96 h-96 blob animate-blob bg-mint/20"
          aria-hidden="true"
        />
        <div className="relative max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-10">
          <Reveal>
            <div className="flex items-center gap-4 mb-6">
              <span className="section-num" aria-hidden="true">
                About
              </span>
              <span className="eyebrow">Our Journey</span>
            </div>
          </Reveal>
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-end">
            <Reveal delay={0.08}>
              <h1 className="display-hero text-5xl sm:text-6xl lg:text-7xl">
                About{" "}
                <span className="italic text-gradient-green">
                  Farmer's Dairy
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="text-lg sm:text-xl text-text/70 leading-relaxed lg:pb-2">
                A small start up with a big vision started by two youngsters,
                Farmer's dairy is a fresh dairy based product based company in
                Hosur.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Arch image band */}
      <section className="pb-20" aria-label="Our pastures">
        <div className="max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-10">
          <Parallax offset={30}>
            <Reveal>
              <div
                className="relative overflow-hidden h-[320px] sm:h-[460px] rounded-[2rem]"
                style={{
                  WebkitMaskImage:
                    "radial-gradient(115% 100% at 50% 50%, #000 60%, transparent 100%)",
                  maskImage:
                    "radial-gradient(115% 100% at 50% 50%, #000 60%, transparent 100%)",
                }}
              >
                <Image
                  src="/images/Hero-slider-image-2.png"
                  alt="Our cows grazing on natural pastures"
                  fill
                  sizes="100vw"
                  className="object-cover object-[center_60%]"
                  priority
                />
                {/* Blend into the light page background on every edge */}
                <div className="absolute inset-0 bg-gradient-to-t from-milk/70 via-transparent to-milk/30" />
                <div className="absolute inset-0 bg-gradient-to-r from-milk/40 via-transparent to-milk/40" />
              </div>
            </Reveal>
          </Parallax>
        </div>
      </section>

      {/* Mission & Vision — rule columns */}
      <section className="pb-20" aria-label="Mission and vision">
        <div className="max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-10 grid md:grid-cols-2 gap-x-10 gap-y-12">
          <Reveal>
            <article className="rule pt-7">
              <div className="flex items-start justify-between mb-6">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border-[1.5px] border-green/30 bg-mint-light/60">
                  <Target className="w-6 h-6 text-green" aria-hidden="true" />
                </span>
                <span className="section-num" aria-hidden="true">
                  01
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-4">
                Our Mission
              </h2>
              <p className="text-text/70 leading-[1.9]">
                Farmer's Dairy is a company that acts as a direct intermediate
                between a farmer and a consumer to provide fresh raw cow milk
                without adding any water or other preservatives. We help in
                benefiting both farmer's and the consumer with good price and
                good health.
              </p>
            </article>
          </Reveal>

          <Reveal delay={0.12}>
            <article className="rule pt-7">
              <div className="flex items-start justify-between mb-6">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border-[1.5px] border-green/30 bg-mint-light/60">
                  <Eye className="w-6 h-6 text-green" aria-hidden="true" />
                </span>
                <span className="section-num" aria-hidden="true">
                  02
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-4">
                Our Vision
              </h2>
              <p className="text-text/70 leading-[1.9]">
                In this busy running world we deliver milk through eco friendly
                glass bottles to your doorstep. We envision a future where every
                family has access to pure, fresh, and nutritious milk directly
                from the farm.
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Values — green editorial band */}
      <section
        className="relative py-20 sm:py-24 bg-green-deep bg-grain overflow-hidden"
        aria-label="What we stand for">
        <div
          className="absolute bottom-[-25%] left-[-5%] w-96 h-96 blob animate-blob-slow bg-mint/15"
          aria-hidden="true"
        />
        <div className="relative max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-10">
          <Reveal>
            <div className="flex items-center gap-4 mb-6">
              <span className="section-num" aria-hidden="true">
                03
              </span>
              <span className="eyebrow !text-mint">Our Values</span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold leading-[1.05] !text-cream max-w-2xl mb-14">
              Rooted in the farm,{" "}
              <span className="italic text-mint">built on trust</span>
            </h2>
          </Reveal>

          <Stagger className="grid sm:grid-cols-2 gap-6" staggerDelay={0.1}>
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <article className="group h-full rounded-3xl border border-cream/15 p-7 transition-all duration-500 hover:border-mint/50 hover:bg-cream/5 hover:-translate-y-1.5 flex items-start gap-5">
                  <span className="flex h-13 w-13 h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-mint/15 border border-mint/30 transition-colors duration-500 group-hover:bg-mint">
                    <value.icon
                      className="w-5.5 h-5.5 w-[22px] h-[22px] text-mint transition-colors duration-500 group-hover:text-green-deep"
                      aria-hidden="true"
                    />
                  </span>
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-semibold !text-cream mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-cream/70 leading-relaxed">
                      {value.text}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Freshness Promise timeline */}
      <section className="py-20 sm:py-24" aria-label="Our freshness promise">
        <div className="max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-10">
          <Reveal>
            <div className="flex items-center gap-4 mb-6 justify-center">
              <span className="section-num" aria-hidden="true">
                04
              </span>
              <span className="eyebrow">Freshness Promise</span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-center mb-16">
              Our Freshness{" "}
              <span className="italic text-gradient-green">Promise</span>
            </h2>
          </Reveal>

          <div className="relative grid sm:grid-cols-3 gap-12 sm:gap-6 max-w-3xl mx-auto">
            <div
              className="hidden sm:block absolute top-[2.4rem] left-[16%] right-[16%] rule"
              aria-hidden="true"
            />
            {freshnessTimeline.map((step, i) => (
              <Reveal key={step.time} delay={i * 0.14}>
                <div className="relative text-center">
                  <div className="relative z-10 mx-auto mb-5 flex h-[4.8rem] w-[4.8rem] items-center justify-center rounded-full bg-cream border-[1.5px] border-green/30 shadow-soft">
                    <span className="font-display text-xl font-semibold text-green">
                      {step.time}
                    </span>
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-text/60">
                    {step.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4}>
            <p className="font-display italic mt-16 text-center text-xl sm:text-2xl text-text/75 max-w-2xl mx-auto">
              "From Our Farm to your Home" - that's our commitment to freshness.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
