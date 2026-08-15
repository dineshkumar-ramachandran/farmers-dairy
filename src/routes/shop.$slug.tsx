import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Droplets, Leaf, Star, Truck } from "lucide-react";
import { fallbackDetail, productDetails } from "@/lib/product-details";
import { Configurator } from "@/components/Configurator";
import { ProductCard } from "@/components/ProductCard";
import { getProduct, products } from "@/lib/products";
import { useRevealRoot } from "@/lib/motion";

export const Route = createFileRoute("/shop/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product not found — Farmer's Dairy" }, { name: "robots", content: "noindex" }] };
    }
    const { product } = loaderData;
    const title = `${product.name} — Farmer's Dairy`;
    return {
      meta: [
        { title },
        { name: "description", content: product.description },
        { property: "og:title", content: title },
        { property: "og:description", content: product.description },
        { property: "og:image", content: product.image },
        { name: "twitter:image", content: product.image },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            image: product.image,
            description: product.description,
            brand: { "@type": "Brand", name: "Farmer's Dairy" },
          }),
        },
      ],
    };
  },
  component: ProductDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="display-hero text-4xl">Product not found</h1>
      <Link to="/shop" className="btn btn-primary mt-8">
        Back to Shop
      </Link>
    </div>
  ),
});

const why = [
  { Icon: Droplets, title: "Fresh Every Morning", text: "Milked at dawn and packed the same hour." },
  { Icon: Leaf, title: "No Preservatives", text: "Nothing added, nothing removed. Ever." },
  { Icon: Truck, title: "Farm Direct", text: "Straight from our family farm to your door." },
];

const steps = [
  { title: "Milked", text: "Hand-checked cows milked at dawn on our Hosur farm." },
  { title: "Filtered & Packed", text: "Filtered and sealed into eco friendly packets." },
  { title: "Delivered", text: "At your doorstep between 4 AM and 6:30 AM every morning." },
];

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const ref = useRevealRoot<HTMLDivElement>();
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);
  // Only show the product photo — the marketing hero was duplicating the same
  // subject on every PDP and adding visual clutter, so it is intentionally out.
  const thumbs: string[] = [product.image];
  const [active, setActive] = useState(product.image);
  const detail = productDetails[product.slug] ?? fallbackDetail;

  // Navigating between PDPs reuses this component (same file route with a
  // different :slug param), so React does NOT remount. Manually re-sync the
  // active thumbnail and scroll the window back to the top whenever the slug
  // changes — otherwise the "You may like" tiles look like they do nothing.
  useEffect(() => {
    setActive(product.image);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [product.slug, product.image]);

  return (
    <div ref={ref} className="mx-auto max-w-7xl px-6 py-12 md:py-20">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <div className="group relative aspect-square overflow-hidden rounded-3xl bg-cream">
            <div className="product-glow absolute inset-0 transition-opacity duration-700 group-hover:opacity-100" />
            <img
              key={active}
              src={active}
              alt={product.name}
              className="reveal-visible relative h-full w-full animate-[fade-in_0.5s_ease-out] object-contain p-10 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:-rotate-2"
            />
          </div>
          {thumbs.length > 1 && (
            <div className="mt-4 flex gap-3">
              {thumbs.map((t) => (
                <button
                  key={t}
                  onClick={() => setActive(t)}
                  aria-label={`View image of ${product.name}`}
                  className={`h-20 w-20 overflow-hidden rounded-2xl border bg-cream transition-transform duration-300 hover:-translate-y-1 ${
                    active === t ? "border-green" : "border-green/15"
                  }`}
                >
                  <img src={t} alt={product.name} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <nav className="text-xs uppercase tracking-[0.18em] text-text/70" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-green">
              Home
            </Link>{" "}
            /{" "}
            <Link to="/shop" className="hover:text-green">
              Shop
            </Link>{" "}
            / <span className="text-green-deep">{product.name}</span>
          </nav>

          <h1 className="display-hero mt-4 text-4xl md:text-5xl">{product.name}</h1>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-butter text-butter" aria-hidden="true" />
              ))}
            </div>
            <span className="text-sm text-text/75">Loved by families across India</span>
          </div>

          <div className="mt-5">
            {product.comingSoon ? (
              <span className="chip">Coming Soon</span>
            ) : (
              <span className="stamp">
                {typeof product.price === "number" ? `₹${product.price}` : product.price}
              </span>
            )}
          </div>

          <p className="mt-6 text-text">{product.description}</p>

          <div className="mt-6 space-y-2 rounded-2xl bg-cream p-5 text-sm text-text">
            <p>{product.note1}</p>
            <p>{product.note2}</p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {product.categories.map((c) => (
              <span key={c} className="chip">
                {c}
              </span>
            ))}
          </div>

          <div className="rule mt-8 pt-8">
            <Configurator product={product} />
          </div>
        </div>
      </div>

      <section className="mt-24 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div data-reveal className="reveal">
          <span className="eyebrow">The Full Story</span>
          <p className="dropcap mt-6 text-lg leading-relaxed text-text">{detail.intro}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {detail.benefits.map((b, i) => (
              <li
                key={b}
                data-reveal
                data-reveal-delay={i * 90}
                className="reveal flex items-start gap-3 rounded-2xl bg-cream p-4 text-sm text-text transition-transform duration-300 hover:-translate-y-1"
              >
                <Leaf className="mt-0.5 h-4 w-4 shrink-0 text-green" aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal data-reveal-delay={120} className="reveal space-y-6">
          {detail.nutrition.length > 0 && (
            <div className="card-fd p-7">
              <h2 className="font-display text-lg">Nutrition, typical values</h2>
              <dl className="mt-4 space-y-3 text-sm">
                {detail.nutrition.map((n) => (
                  <div key={n.label} className="rule flex justify-between pt-3 first:border-0 first:pt-0">
                    <dt className="text-text/75">{n.label}</dt>
                    <dd className="font-semibold text-green-deep">{n.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
          <div className="card-fd p-7">
            <h2 className="font-display text-lg">How to use it</h2>
            <ul className="mt-4 space-y-2 text-sm text-text/85">
              {detail.usage.map((u) => (
                <li key={u} className="flex gap-2">
                  <span aria-hidden="true" className="text-butter-deep">
                    —
                  </span>
                  {u}
                </li>
              ))}
            </ul>
            <p className="rule mt-5 pt-4 text-xs text-text/70">{detail.storage}</p>
          </div>
        </div>
      </section>

      <section className="mt-20">
        <span className="eyebrow">Questions</span>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {detail.faqs.map((f, i) => (
            <details
              key={f.q}
              data-reveal
              data-reveal-delay={i * 100}
              className="card-fd reveal group p-6 transition-shadow duration-300 hover:shadow-lg"
            >
              <summary className="cursor-pointer list-none font-display text-base text-green-deep marker:hidden">
                {f.q}
              </summary>
              <p className="mt-3 animate-[fade-in_0.3s_ease-out] text-sm text-text/80">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-24">
        <span className="eyebrow">Why This Product</span>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {why.map(({ Icon, title, text }, i) => (
            <div key={title} data-reveal data-reveal-delay={i * 100} className="card-fd reveal p-7">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-butter/30 text-green-deep">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg">{title}</h3>
              <p className="mt-2 text-sm text-text/80">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <span className="eyebrow">How It's Made</span>
        <div className="relative mt-10 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} data-reveal data-reveal-delay={i * 120} className="reveal relative">
              {i < steps.length - 1 && (
                <div
                  className="absolute left-14 right-[-2rem] top-6 hidden border-t-2 border-dashed border-green/20 md:block"
                  aria-hidden="true"
                />
              )}
              <span className="grid h-12 w-12 place-items-center rounded-full bg-green font-display font-bold text-cream transition-transform duration-300 hover:scale-110">
                {i + 1}
              </span>
              <h3 className="mt-4 font-display text-lg">{s.title}</h3>
              <p className="mt-2 text-sm text-text/80">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <span className="eyebrow">You Might Also Like</span>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {related.map((p, i) => (
            <ProductCard key={p.id} product={p} delay={i * 100} />
          ))}
        </div>
      </section>
    </div>
  );
}
