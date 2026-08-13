import { useRef } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import type { Product } from "@/lib/products";
import { basePrice } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { prefersReduced } from "@/lib/motion";

export function ProductCard({ product, delay = 0 }: { product: Product; delay?: number }) {
  const magnet = useRef<HTMLAnchorElement | null>(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = magnet.current;
    if (!el || prefersReduced()) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const dist = Math.hypot(dx, dy);
    if (dist > 40 + r.width / 2) return;
    el.style.transform = `translate(${(dx / r.width) * 12}px, ${(dy / r.height) * 6}px)`;
  };

  const onLeave = () => {
    if (magnet.current) magnet.current.style.transform = "";
  };

  const buyNow = () => {
    const variant = product.variants?.[0]?.label;
    const unitPrice = basePrice(product);
    addToCart({
      key: `${product.slug}|${variant ?? ""}|once|now`,
      slug: product.slug,
      name: product.name,
      image: product.image,
      variant,
      unitPrice,
      quantity: 1,
      days: 1,
      holidays: [],
    });
    toast.success(`${product.name} added to cart`);
    navigate({ to: "/checkout" });
  };

  return (
    <article
      data-reveal
      data-reveal-delay={delay}
      className={`card-fd reveal group flex flex-col overflow-hidden p-5 ${
        product.comingSoon ? "opacity-80" : ""
      }`}
    >
      <Link
        to="/shop/$slug"
        params={{ slug: product.slug }}
        aria-label={`View ${product.name}`}
        className="relative block aspect-square w-full"
      >
        <div className="product-glow absolute inset-0 rounded-full opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="relative h-full w-full object-contain transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-2 group-hover:scale-[1.06]"
        />
      </Link>
      <Link
        to="/shop/$slug"
        params={{ slug: product.slug }}
        className="mt-4 font-display text-lg font-bold text-green-deep transition-colors hover:text-butter-deep"
      >
        {product.name}
      </Link>
      <p className="mt-1 flex-1 text-sm text-text/75">{product.description}</p>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        {product.comingSoon ? (
          <span className="chip">Coming Soon</span>
        ) : (
          <>
            <span className="stamp">
              {typeof product.price === "number" ? `₹${product.price}` : product.price}
            </span>
            <button onClick={buyNow} className="btn btn-accent h-10 px-4 text-xs">
              Buy Now
            </button>
          </>
        )}
      </div>
      <div className="rule mt-4 pt-4">
        <Link
          ref={magnet}
          to="/shop/$slug"
          params={{ slug: product.slug }}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className="inline-block text-[13px] font-bold uppercase tracking-[0.16em] text-green transition-transform duration-200 hover:text-butter-deep"
        >
          View Details →
        </Link>
      </div>
    </article>
  );
}
