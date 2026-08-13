import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import Image from "next/image";

/**
 * Editorial 4-column footer on the deep-forest palette. Same links and
 * contact info as before — only the layout and typography are refined.
 */
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-green-deep text-cream/85">
      {/* Ambient butter blob for warmth against the deep green */}
      <div
        className="pointer-events-none absolute -top-24 -right-16 w-[24rem] h-[24rem] blob bg-butter/10"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        {/* Editorial masthead */}
        <div className="mb-12 border-b border-cream/15 pb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-butter mb-4">
            Farmer&apos;s Dairy
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tightest text-cream leading-[1.05]">
            From Our Farm{" "}
            <span className="italic text-butter">to Your Home</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="space-y-5">
            <div className="inline-flex items-center rounded-2xl bg-cream/95 px-3 py-2">
              <Image
                src="/images/farmers-dairy-logo.png"
                alt="Farmer's Dairy Logo"
                width={120}
                height={60}
                className="h-auto w-[90px]"
              />
            </div>
            <p className="text-sm leading-relaxed text-cream/70 max-w-xs">
              Fresh farm milk delivered to your doorstep daily. Pure, natural,
              and healthy.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://www.facebook.com/farmersdairy.in/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/8 text-cream/85 transition-all duration-300 ease-out hover:bg-butter hover:text-green-deep hover:-translate-y-0.5">
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/farmersdairy.in/#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/8 text-cream/85 transition-all duration-300 ease-out hover:bg-butter hover:text-green-deep hover:-translate-y-0.5">
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@farmersdairy-28"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/8 text-cream/85 transition-all duration-300 ease-out hover:bg-butter hover:text-green-deep hover:-translate-y-0.5">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.28em] text-butter mb-5">
              Explore
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/shop", label: "Shop" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-cream/80 transition-colors duration-300 hover:text-butter">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.28em] text-butter mb-5">
              Legal
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/terms-and-conditions", label: "Terms & Conditions" },
                {
                  href: "/shipping-and-delivery",
                  label: "Shipping & Delivery",
                },
                {
                  href: "/cancellation-and-refund",
                  label: "Cancellation & Refund",
                },
                { href: "/privacy-policy", label: "Privacy Policy" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-cream/80 transition-colors duration-300 hover:text-butter">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.28em] text-butter mb-5">
              Reach Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cream/8 text-butter">
                  <Phone className="w-3.5 h-3.5" />
                </span>
                <a
                  href="tel:9363778989"
                  className="text-sm text-cream/85 hover:text-butter transition-colors">
                  93637 78989
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cream/8 text-butter">
                  <Mail className="w-3.5 h-3.5" />
                </span>
                <a
                  href="mailto:info@farmersdairy.com"
                  className="text-sm text-cream/85 hover:text-butter transition-colors break-all">
                  info@farmersdairy.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cream/8 text-butter mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </span>
                <span className="text-sm text-cream/85">Hosur, Tamil Nadu</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Colophon */}
        <div className="mt-14 pt-6 border-t border-cream/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/60">
          <p>© 2024 Farmer&apos;s Dairy. All rights reserved.</p>
          <p className="tracking-wider uppercase">
            Designed by{" "}
            <span className="text-butter font-semibold">Onprimehub</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
