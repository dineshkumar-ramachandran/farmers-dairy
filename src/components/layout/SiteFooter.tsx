import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { ADDRESS, EMAIL, LOGO, PHONE, PHONE_PRETTY, SOCIAL } from "@/lib/products";
import { useRevealRoot } from "@/lib/motion";

const explore = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/shop", label: "Shop" },
  { to: "/contact", label: "Contact" },
];

const legal = [
  { to: "/terms-and-conditions", label: "Terms & Conditions" },
  { to: "/shipping-and-delivery", label: "Shipping & Delivery" },
  { to: "/cancellation-and-refund", label: "Cancellation & Refund" },
  { to: "/privacy-policy", label: "Privacy Policy" },
];

export function SiteFooter() {
  const ref = useRevealRoot<HTMLElement>();

  return (
    <footer ref={ref} className="relative overflow-hidden bg-green-deep text-cream">
      <div className="bg-grain" />
      <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div data-reveal className="reveal max-w-3xl">
          <span className="eyebrow !text-butter before:!bg-butter">Farmer's Dairy</span>
          <h2 className="display-hero mt-5 !text-cream text-4xl md:text-6xl">
            From Our Farm{" "}
            <span className="italic text-butter">to Your Home</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-10 border-t border-cream/15 pt-12 md:grid-cols-4">
          <div>
            <div className="inline-flex rounded-2xl bg-cream p-3">
              <img src={LOGO} alt="Farmer's Dairy logo" className="h-12 w-auto" />
            </div>
            <p className="mt-5 max-w-xs text-sm text-cream/75">
              Fresh farm milk delivered to your doorstep daily. Pure, natural, and healthy.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { href: SOCIAL.facebook, Icon: Facebook, label: "Facebook" },
                { href: SOCIAL.instagram, Icon: Instagram, label: "Instagram" },
                { href: SOCIAL.youtube, Icon: Youtube, label: "YouTube" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-cream/25 transition-colors hover:border-butter hover:bg-butter hover:text-green-deep"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="!text-butter text-sm font-bold uppercase tracking-[0.24em]">Explore</h3>
            <ul className="mt-5 space-y-3 text-sm text-cream/80">
              {explore.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-butter">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="!text-butter text-sm font-bold uppercase tracking-[0.24em]">Legal</h3>
            <ul className="mt-5 space-y-3 text-sm text-cream/80">
              {legal.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-butter">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="!text-butter text-sm font-bold uppercase tracking-[0.24em]">Reach Us</h3>
            <ul className="mt-5 space-y-4 text-sm text-cream/80">
              <li className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-butter text-green-deep">
                  <Phone className="h-4 w-4" />
                </span>
                <a href={`tel:${PHONE}`} className="hover:text-butter">
                  {PHONE_PRETTY}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-butter text-green-deep">
                  <Mail className="h-4 w-4" />
                </span>
                <a href={`mailto:${EMAIL}`} className="hover:text-butter">
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-butter text-green-deep">
                  <MapPin className="h-4 w-4" />
                </span>
                {ADDRESS}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-cream/15 pt-6 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2024 Farmer's Dairy. All rights reserved.</p>
          <p>
            Designed by{" "}
            <a
              href="https://onprimehub.com"
              target="_blank"
              rel="external noopener"
              className="text-butter hover:text-butter-deep"
            >
              Onprimehub
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
