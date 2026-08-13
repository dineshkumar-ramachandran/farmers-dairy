import { createFileRoute, Link } from "@tanstack/react-router";
import { Configurator } from "@/components/Configurator";
import { products } from "@/lib/products";
import { useRevealRoot } from "@/lib/motion";

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: [
      { title: "Shop Organic Milk, Ghee, Paneer & Butter — Farmer's Dairy" },
      {
        name: "description",
        content:
          "Choose your daily essentials, subscribe by the week or month, and let us handle the rest. Raw cow milk, ghee, paneer and butter from Hosur.",
      },
      { property: "og:title", content: "Shop Organic Milk, Ghee, Paneer & Butter — Farmer's Dairy" },
      {
        property: "og:description",
        content: "Subscribe to daily raw cow milk or order organic ghee, paneer and butter.",
      },
    ],
  }),
  component: Shop,
});

function Shop() {
  const ref = useRevealRoot<HTMLDivElement>();

  return (
    <div ref={ref} className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <div data-reveal className="reveal max-w-2xl">
        <span className="eyebrow">Shop</span>
        <h1 className="display-hero mt-5 text-4xl md:text-6xl">
          Our <span className="text-gradient-green">Complete Range</span>
        </h1>
        <p className="mt-4 text-text/80">
          Choose your daily essentials, subscribe by the week or month, and let us handle the rest.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((p, i) => (
          <article
            key={p.id}
            data-reveal
            data-reveal-delay={i * 100}
            className={`card-fd reveal group flex flex-col p-6 ${p.comingSoon ? "opacity-80" : ""}`}
          >
            <Link
              to="/shop/$slug"
              params={{ slug: p.slug }}
              aria-label={`View ${p.name}`}
              className="relative block aspect-square w-full"
            >
              <div className="product-glow absolute inset-0 rounded-full" />
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                className="relative h-full w-full object-contain transition-transform duration-500 group-hover:-rotate-1 group-hover:scale-105"
              />
            </Link>
            <Link
              to="/shop/$slug"
              params={{ slug: p.slug }}
              className="mt-4 font-display text-xl font-bold text-green-deep hover:text-butter-deep"
            >
              {p.name}
            </Link>
            <p className="mt-1 text-sm text-text/75">{p.description}</p>
            <div className="mt-4">
              {p.comingSoon ? (
                <span className="chip">Coming Soon</span>
              ) : (
                <span className="stamp">
                  {typeof p.price === "number" ? `₹${p.price}` : p.price}
                </span>
              )}
            </div>
            <div className="rule mt-5 pt-5">
              <Configurator product={p} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
