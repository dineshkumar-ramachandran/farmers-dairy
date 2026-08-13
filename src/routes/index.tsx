import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Heart, Quote, Shield, Star, Truck } from "lucide-react";
import { HeroSlider } from "@/components/HeroSlider";
import { ProductCard } from "@/components/ProductCard";
import { Marquee } from "@/components/Marquee";
import { StatBand } from "@/components/StatBand";
import { products } from "@/lib/products";
import { useCountUp, useRevealRoot } from "@/lib/motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Farmer's Dairy — Fresh Farm Milk Delivered Daily in Hosur" },
      {
        name: "description",
        content:
          "Unprocessed raw cow milk, organic ghee, paneer and butter — delivered fresh to your doorstep every morning. No preservatives, no antibiotics. Serving Hosur & Bangalore.",
      },
      { property: "og:title", content: "Farmer's Dairy — Fresh Farm Milk Delivered Daily in Hosur" },
      {
        property: "og:description",
        content:
          "Unprocessed raw cow milk, organic ghee, paneer and butter — delivered fresh to your doorstep every morning. No preservatives, no antibiotics.",
      },
    ],
  }),
  component: Home,
});

const whyUs = [
  {
    Icon: Truck,
    title: "Daily Delivery",
    text: "Fresh milk delivered to your doorstep every morning before 7 AM.",
  },
  {
    Icon: Shield,
    title: "100% Pure",
    text: "No additives, no preservatives. Just pure, natural farm milk.",
  },
  {
    Icon: Clock,
    title: "Always Fresh",
    text: "We assure the milk delivered to each and every customer is fresh and completely hygienic.",
  },
  {
    Icon: Heart,
    title: "Family Farm",
    text: "From our family farm to your family, with love and care in every drop.",
  },
];

const testimonials = [
  {
    name: "MS. NIRMALA",
    location: "Hosur",
    quote: "Fat and Thickness of the milk is very good. Packets are also well sealed.",
  },
  {
    name: "MR. LOKESH",
    location: "Hosur",
    quote:
      "My mother certified your milk product She is happy. Thanks for your good product and service.",
  },
  {
    name: "MS. SELVA",
    location: "Hosur",
    quote: "Milk taste very good sir My family members all liked your milk very much",
  },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const { ref, value } = useCountUp(target);
  return (
    <span ref={ref} className="font-display text-3xl font-extrabold text-green-deep">
      {value}
      {suffix}
    </span>
  );
}

function Home() {
  const ref = useRevealRoot<HTMLDivElement>();

  return (
    <div ref={ref}>
      <HeroSlider />

      <Marquee
        items={[
          "NO PRESERVATIVES",
          "NO ANTIBIOTICS",
          "FARM-DIRECT",
          "DAILY DELIVERY",
          "FREE WITHIN HOSUR",
          "MADE IN TAMIL NADU",
          "SINCE 2020",
        ]}
        duration={40}
        className="bg-butter py-3"
        itemClassName="text-[11px] font-bold uppercase tracking-[0.28em] text-green-deep"
      />

      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div data-reveal className="reveal max-w-2xl">
          <span className="eyebrow">Our Range</span>
          <h2 className="mt-5 text-4xl md:text-5xl">
            Our <span className="text-gradient-green">Farm Fresh</span> Products
          </h2>
          <p className="mt-4 text-text/80">
            From pure raw cow milk to organic staples — every product carries the same purity, made
            the slow, honest way.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} delay={i * 120} />
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-cream py-20 md:py-28">
        <div className="bg-grain" />
        <div
          className="blob right-[-8%] top-10 h-80 w-80 bg-butter"
          style={{ opacity: 0.15 }}
          aria-hidden="true"
        />
        <div
          className="blob left-[-10%] bottom-0 h-72 w-72 bg-mint"
          style={{ opacity: 0.1 }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl px-6">
          <div data-reveal className="reveal">
            <span className="eyebrow">Our Story</span>
            <h2 className="mt-5 text-4xl md:text-5xl">
              Farm Fresh Milk <span className="text-gradient-green">Delivered Daily</span>
            </h2>
            <p className="dropcap mt-8 text-lg leading-relaxed text-text">
              Farmer's Dairy is a company that acts as a direct intermediate between a farmer and a
              consumer to provide fresh raw cow milk without adding any water or other
              preservatives. Farmer's Dairy is a small initiative that helps in benefiting both
              farmer's and the consumer with good price and good health. In this busy running world
              we deliver milk through eco friendly packets to your doorstep.
            </p>
            <p className="mt-6 font-display text-xl italic text-butter-deep">
              "From our family farm to your family table."
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-green/15 pt-8">
              <div>
                <Counter target={1200} suffix="+" />
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-text/70">Families</p>
              </div>
              <div>
                <Counter target={0} suffix="" />
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-text/70">Preservatives</p>
              </div>
              <div>
                <Counter target={7} suffix=" AM" />
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-text/70">Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div data-reveal className="reveal max-w-2xl">
          <span className="eyebrow">Why Us</span>
          <h2 className="mt-5 text-4xl md:text-5xl">
            Why Choose Our <span className="text-gradient-green">Farm Fresh Milk?</span>
          </h2>
          <p className="mt-4 text-text/80">
            We're committed to delivering the purest, most nutritious milk from our family farm to
            your family table.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map(({ Icon, title, text }, i) => (
            <div
              key={title}
              data-reveal
              data-reveal-delay={i * 120}
              className="card-fd reveal-pop reveal group p-7"
            >
              <span className="grid h-14 w-14 place-items-center rounded-full bg-butter/30 text-green-deep ring-1 ring-butter/40 transition-transform duration-300 group-hover:rotate-12 group-hover:ring-green">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-xl">{title}</h3>
              <p className="mt-2 text-sm text-text/80">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <StatBand />

      <section className="relative overflow-hidden bg-mint-light py-20 md:py-28">
        <div className="bg-grain" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div data-reveal className="reveal max-w-2xl">
            <span className="eyebrow">Testimonials</span>
            <h2 className="mt-5 text-4xl md:text-5xl">
              What Our <span className="text-gradient-green">Customers Say</span>
            </h2>
            <p className="mt-4 text-text/80">
              Join thousands of satisfied families who trust us for their daily milk needs.
            </p>
          </div>
          <div className="marquee-wrap relative mt-12" tabIndex={0}>
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-[linear-gradient(to_right,var(--mint-light),transparent)]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-[linear-gradient(to_left,var(--mint-light),transparent)]"
              aria-hidden="true"
            />
            <div className="marquee gap-6" style={{ ["--marquee-duration" as string]: "35s" }}>
              {[...testimonials, ...testimonials].map((t, i) => (
                <figure
                  key={`${t.name}-${i}`}
                  data-reveal
                  data-reveal-delay={(i % 3) * 140}
                  className="card-fd reveal-tilt reveal relative w-[320px] shrink-0 p-8 pt-12"
                >
                  <Quote
                    className="absolute left-6 top-6 h-8 w-8 -rotate-12 text-butter/70"
                    aria-hidden="true"
                  />
                  <div className="flex justify-center gap-1">
                    {Array.from({ length: 5 }).map((_, sIdx) => (
                      <Star
                        key={sIdx}
                        className="h-4 w-4 fill-butter text-butter"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <blockquote className="mt-5 text-center text-sm italic text-text">
                    {t.quote}
                  </blockquote>
                  <figcaption className="rule mt-6 pt-5 text-center">
                    <p className="font-display font-bold text-green-deep">{t.name}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-text/70">
                      {t.location}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-card py-20 md:py-28">
        <div className="blob left-[10%] top-0 h-72 w-72 bg-butter" style={{ opacity: 0.18 }} />
        <div className="blob right-[8%] bottom-0 h-72 w-72 bg-mint" style={{ opacity: 0.12 }} />
        <div data-reveal className="reveal relative mx-auto max-w-3xl px-6 text-center">
          <span className="eyebrow">Taste the Difference</span>
          <h2 className="mt-5 text-4xl md:text-6xl">
            Ready to Experience{" "}
            <span className="text-gradient-green italic">Farm Fresh</span> Milk?
          </h2>
          <p className="mt-5 text-text/80">
            Join our family of satisfied customers and taste the difference of truly fresh, organic
            dairy delivered to your doorstep.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link to="/shop" className="btn btn-primary">
              Shop Now
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
