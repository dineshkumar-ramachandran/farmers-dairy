import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  ArrowUpRight,
} from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Reveal } from "@/components/motion/reveal";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Shop", href: "/shop" },
  { name: "Contact", href: "/contact" },
];

const legalLinks = [
  { name: "Terms & Conditions", href: "/terms-and-conditions" },
  { name: "Shipping & Delivery", href: "/shipping-and-delivery" },
  { name: "Cancellation & Refund", href: "/cancellation-and-refund" },
  { name: "Privacy Policy", href: "/privacy-policy" },
];

const socials = [
  { name: "Facebook", href: siteConfig.socials.facebook, Icon: Facebook },
  { name: "Instagram", href: siteConfig.socials.instagram, Icon: Instagram },
  { name: "YouTube", href: siteConfig.socials.youtube, Icon: Youtube },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-green-deep bg-grain text-cream">
      <div className="relative max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-10 pt-16 pb-10">
        {/* Big editorial masthead */}
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pb-12">
            <div>
              <p className="eyebrow !text-mint mb-4">From Our Farm to your Home</p>
              <p className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02] !text-cream max-w-2xl">
                Fresh farm milk,{" "}
                <span className="italic text-mint">delivered daily.</span>
              </p>
            </div>
            <Link
              href="/shop"
              className="group inline-flex items-center gap-3 self-start rounded-full border-[1.5px] border-cream/40 px-7 py-4 text-[13px] font-bold uppercase tracking-[0.18em] text-cream transition-all duration-300 hover:bg-cream hover:text-green hover:-translate-y-0.5">
              Start Your Subscription
              <ArrowUpRight
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </Reveal>

        <div className="border-t border-cream/15 pt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-5">
            <div className="inline-flex rounded-2xl bg-cream p-3">
              <Image
                src="/images/farmers-dairy-logo.png"
                alt="Farmer's Dairy Logo"
                width={120}
                height={60}
                className="h-auto w-[86px]"
              />
            </div>
            <p className="text-cream/70 text-sm leading-relaxed max-w-[26ch]">
              Fresh farm milk delivered to your doorstep daily. Pure, natural,
              and healthy.
            </p>
            <div className="flex gap-2.5">
              {socials.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Farmer's Dairy on ${name}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream transition-all duration-300 hover:-translate-y-1 hover:bg-mint hover:border-mint hover:text-green-deep">
                  <Icon className="w-[17px] h-[17px]" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.28em] text-mint mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-display text-lg text-cream/75 transition-all duration-300 hover:text-cream hover:pl-1.5">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Legal">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.28em] text-mint mb-5">
              Legal
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/70 transition-all duration-300 hover:text-cream hover:pl-1.5">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.28em] text-mint mb-5">
              Contact Info
            </h3>
            <div className="space-y-4 text-sm">
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-3 text-cream/75 transition-colors duration-300 hover:text-cream">
                <Phone className="w-4 h-4 text-mint shrink-0" aria-hidden="true" />
                {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 text-cream/75 transition-colors duration-300 hover:text-cream">
                <Mail className="w-4 h-4 text-mint shrink-0" aria-hidden="true" />
                {siteConfig.email}
              </a>
              <p className="flex items-center gap-3 text-cream/75">
                <MapPin className="w-4 h-4 text-mint shrink-0" aria-hidden="true" />
                Hosur, Tamil Nadu
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-cream/15 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-cream/55">
          <p>© 2024 Farmer's Dairy. All rights reserved.</p>
          <p>Designed by Onprimehub</p>
        </div>
      </div>
    </footer>
  );
}
