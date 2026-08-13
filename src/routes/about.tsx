import { createFileRoute } from "@tanstack/react-router";
import { Heart, Leaf, ShieldCheck, Users } from "lucide-react";
import { useRevealRoot } from "@/lib/motion";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Farmer's Dairy — Our Story, Mission & Values" },
      {
        name: "description",
        content:
          "Farmer's Dairy connects Hosur farmers directly with families, delivering pure raw cow milk in eco friendly packets every morning.",
      },
      { property: "og:title", content: "About Farmer's Dairy — Our Story, Mission & Values" },
      {
        property: "og:description",
        content: "A family-run organic dairy from Hosur, Tamil Nadu, delivering purity daily.",
      },
    ],
  }),
  component: About,
});

const values = [
  {
    Icon: Heart,
    title: "Family Values",
    text: "Our farm has been built on family values. We treat every customer like family and every cow with the love and care they deserve.",
  },
  {
    Icon: ShieldCheck,
    title: "Quality First",
    text: "We maintain the highest standards of quality control, from milking to packing. Every batch is tested to ensure purity and freshness without any preservatives.",
  },
  {
    Icon: Leaf,
    title: "Eco-Friendly Delivery",
    text: "We deliver milk in eco-friendly packets to reduce environmental impact. Our delivery team takes pride in punctual, reliable service.",
  },
  {
    Icon: Users,
    title: "Community Focus",
    text: "Serving families across Hosur with dedication and pride.",
  },
];

const journey = ["Grazing", "Milking", "Filtering", "Packing", "Doorstep"];

function About() {
  const ref = useRevealRoot<HTMLDivElement>();

  return (
    <div ref={ref}>
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="bg-grain" />
        <div className="blob right-[-6%] top-6 h-80 w-80 bg-butter" style={{ opacity: 0.2 }} />
        <div data-reveal className="reveal relative mx-auto max-w-4xl px-6">
          <span className="eyebrow">About Us</span>
          <h1 className="display-hero mt-5 text-4xl md:text-7xl">
            From Our Farm <span className="italic text-butter-deep">to Your Family</span>
          </h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-10 px-6 pb-20 md:grid-cols-2">
        <div data-reveal className="card-fd reveal p-8">
          <h2 className="font-display text-2xl">Our Mission</h2>
          <p className="mt-4 text-text">
            Farmer's Dairy is a company that acts as a direct intermediate between a farmer and a
            consumer to provide fresh raw cow milk without adding any water or other preservatives.
            We help in benefiting both farmer's and the consumer with good price and good health.
          </p>
        </div>
        <div data-reveal data-reveal-delay={120} className="card-fd reveal p-8">
          <h2 className="font-display text-2xl">Our Vision</h2>
          <p className="mt-4 text-text">
            In this busy running world we deliver milk through eco friendly packets to your
            doorstep. We envision a future where every family has access to pure, fresh, and
            nutritious milk directly from the farm.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-mint-light py-20">
        <div className="bg-grain" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div data-reveal className="reveal">
            <span className="eyebrow">Our Values</span>
            <h2 className="mt-5 text-4xl">What We Stand For</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ Icon, title, text }, i) => (
              <div
                key={title}
                data-reveal
                data-reveal-delay={i * 110}
                className="card-fd reveal-pop reveal group p-7"
              >
                <span className="grid h-14 w-14 place-items-center rounded-full bg-butter/30 text-green-deep ring-1 ring-butter/40 transition-transform group-hover:rotate-12">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg">{title}</h3>
                <p className="mt-2 text-sm text-text/80">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div data-reveal className="reveal">
          <span className="eyebrow">The Journey of Every Drop</span>
          <h2 className="mt-5 text-4xl">Five steps, every single morning</h2>
        </div>
        <ol className="relative mt-12 grid gap-8 md:grid-cols-5">
          {journey.map((s, i) => (
            <li key={s} data-reveal data-reveal-delay={i * 120} className="reveal relative">
              {i < journey.length - 1 && (
                <div
                  className="absolute left-14 right-[-2rem] top-6 hidden border-t-2 border-dashed border-green/20 md:block"
                  aria-hidden="true"
                />
              )}
              <span className="grid h-12 w-12 place-items-center rounded-full bg-green font-display font-bold text-cream transition-transform duration-300 hover:scale-110">
                {i + 1}
              </span>
              <h3 className="mt-4 font-display text-lg">{s}</h3>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
