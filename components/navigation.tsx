"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useCart } from "./cart-context";
import { siteConfig } from "@/lib/site";

const navItems = [
  { name: "HOME", href: "/" },
  { name: "ABOUT US", href: "/about" },
  { name: "CONTACT US", href: "/contact" },
  { name: "SHOP", href: "/shop" },
];

export function Navigation() {
  const pathname = usePathname();
  const { getTotalItems, getTotalPrice } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`transition-all duration-500 ${
          scrolled || menuOpen ? "glass" : "bg-transparent"
        }`}>
        {/* Top hairline strip */}
        <div className="hidden md:block border-b border-green/15">
          <div className="max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-text/60">
            <span>Farm Fresh · Hosur, Tamil Nadu</span>
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center gap-1.5 hover:text-green transition-colors"
              aria-label={`Call us at ${siteConfig.phone}`}>
              <Phone className="w-3 h-3" aria-hidden="true" />
              {siteConfig.phone}
            </a>
          </div>
        </div>

        <div className="max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between gap-4 py-3">
            <Link
              href="/"
              aria-label="Farmer's Dairy home"
              className="flex-shrink-0 transition-opacity duration-300 hover:opacity-80">
              <Image
                src="/images/farmers-dairy-logo.png"
                alt="Farmer's Dairy Logo"
                width={120}
                height={60}
                priority
                className="h-auto w-[72px] sm:w-[84px]"
              />
            </Link>

            <nav
              className="hidden md:flex items-center gap-8"
              aria-label="Main navigation">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative py-2 text-[12.5px] font-bold uppercase tracking-[0.18em] transition-colors duration-300 ${
                      active ? "text-green" : "text-text/65 hover:text-green"
                    }`}>
                    {item.name}
                    {active && (
                      <motion.span
                        layoutId="nav-rule"
                        className="absolute inset-x-0 -bottom-px h-[2px] bg-green"
                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2.5">
              <Link
                href="/cart"
                aria-label={`Cart: ${getTotalItems()} items, total ₹${getTotalPrice().toFixed(2)}`}
                className="group inline-flex items-center gap-2.5 rounded-full border-[1.5px] border-green px-4 py-2 text-[12px] font-bold uppercase tracking-wider text-green transition-all duration-300 hover:bg-green hover:text-cream hover:-translate-y-0.5">
                <span className="relative">
                  <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-0.5 text-[9px] font-bold text-green-deep">
                      {getTotalItems()}
                    </span>
                  )}
                </span>
                <span className="hidden sm:inline">
                  ₹{getTotalPrice().toFixed(2)}
                </span>
              </Link>

              {/* Morphing hamburger */}
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="md:hidden relative h-10 w-10 rounded-full border-[1.5px] border-green flex items-center justify-center"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? "Close menu" : "Open menu"}>
                <span className="relative block h-3.5 w-[18px]">
                  <motion.span
                    className="absolute left-0 top-0 h-[2px] w-full rounded bg-green"
                    animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                    transition={{ duration: reduce ? 0 : 0.25 }}
                  />
                  <motion.span
                    className="absolute left-0 top-1.5 h-[2px] w-full rounded bg-green"
                    animate={{ opacity: menuOpen ? 0 : 1 }}
                    transition={{ duration: reduce ? 0 : 0.15 }}
                  />
                  <motion.span
                    className="absolute left-0 top-3 h-[2px] w-full rounded bg-green"
                    animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                    transition={{ duration: reduce ? 0 : 0.25 }}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-menu"
              aria-label="Mobile navigation"
              className="md:hidden overflow-hidden border-t border-green/15"
              initial={reduce ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduce ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.21, 0.65, 0.35, 1] }}>
              <div className="px-4 py-4 space-y-1">
                {navItems.map((item, i) => {
                  const active = pathname === item.href;
                  return (
                    <motion.div
                      key={item.name}
                      initial={reduce ? false : { opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.3 }}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-lg transition-colors duration-300 ${
                          active
                            ? "bg-mint-light text-green"
                            : "text-text/80 hover:bg-mint-light/60 hover:text-green"
                        }`}>
                        {item.name}
                        <span className="section-num">
                          0{i + 1}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="btn-primary w-full mt-3">
                  <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
                  {siteConfig.phone}
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
