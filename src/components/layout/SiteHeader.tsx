import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Menu, Phone, ShoppingBag, X, Youtube } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { LOGO, PHONE, PHONE_PRETTY, SOCIAL, inr } from "@/lib/products";
import { useScrolled } from "@/lib/motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact Us" },
  { to: "/shop", label: "Shop" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(40);
  const { getTotalItems, getTotalPrice } = useCart();
  const count = getTotalItems();

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden bg-green-deep text-cream md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-[12px]">
          <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 hover:text-butter">
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            {PHONE}
          </a>
          <p className="tracking-[0.18em] uppercase text-[11px] text-cream/80">
            Free delivery on subscriptions
          </p>
          <div className="flex items-center gap-3">
            <a href={SOCIAL.facebook} aria-label="Facebook" target="_blank" rel="noreferrer">
              <Facebook className="h-3.5 w-3.5 hover:text-butter" />
            </a>
            <a href={SOCIAL.instagram} aria-label="Instagram" target="_blank" rel="noreferrer">
              <Instagram className="h-3.5 w-3.5 hover:text-butter" />
            </a>
            <a href={SOCIAL.youtube} aria-label="YouTube" target="_blank" rel="noreferrer">
              <Youtube className="h-3.5 w-3.5 hover:text-butter" />
            </a>
          </div>
        </div>
      </div>

      <nav
        className={`transition-all duration-300 ${scrolled ? "glass-scrolled" : "glass"}`}
        aria-label="Main"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <Link to="/" className="flex items-center gap-3" aria-label="Farmer's Dairy home">
            <img src={LOGO} alt="Farmer's Dairy logo" className="h-14 w-auto md:h-16" />
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-[12px] font-bold uppercase tracking-[0.2em] text-green transition-colors hover:text-butter-deep"
                  activeProps={{ className: "text-green-deep" }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              to="/cart"
              className="group relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-green/20 text-green transition-colors hover:bg-green hover:text-cream"
              aria-label={`Cart, ${count} items`}
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-butter-deep px-1 text-[11px] font-bold text-green-deep">
                  {count}
                </span>
              )}
              {count > 0 && (
                <span className="pointer-events-none absolute right-0 top-full mt-2 hidden whitespace-nowrap rounded-full bg-green-deep px-3 py-1 text-[11px] text-cream group-hover:block">
                  {count} items · {inr(getTotalPrice())}
                </span>
              )}
            </Link>
            <button
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-green/20 text-green md:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-50 bg-cream md:hidden">
          <div className="flex items-center justify-between px-4 py-4">
            <img src={LOGO} alt="Farmer's Dairy logo" className="h-14 w-auto md:h-16" />
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-green/20 text-green"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <ul className="flex flex-col gap-2 px-6 pt-6">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block border-b border-green/10 py-4 font-display text-2xl font-bold text-green-deep"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-6 pt-8">
            <a href={`tel:${PHONE}`} className="btn btn-primary w-full">
              Call {PHONE_PRETTY}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
