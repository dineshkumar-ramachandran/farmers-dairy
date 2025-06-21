"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Search, ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "./cart-context";
import Image from "next/image";

export function Navigation() {
  const pathname = usePathname();
  const { getTotalItems, getTotalPrice } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "HOME", href: "/" },
    { name: "ABOUT US", href: "/about" },
    { name: "CONTACT US", href: "/contact" },
    { name: "SHOP", href: "/shop" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="border-b border-mint-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2 text-sm">
            <div className="flex items-center text-text hover:text-green transition-colors duration-300 animate-slide-left">
              <Phone className="w-4 h-4 mr-2 icon-hover" />
              <span className="bg-green text-white px-2 py-1 rounded font-semibold">
                9363778989
              </span>
            </div>
            <div className="flex items-center space-x-4 animate-slide-right">
              <button className="text-text hover:text-green transition-colors duration-300">
                <Search className="w-4 h-4 icon-hover" />
              </button>
              <Link
                href="/cart"
                className="text-text hover:text-green flex items-center transition-colors duration-300">
                <ShoppingCart className="w-4 h-4 mr-1 icon-hover" />
                <span className="bg-green text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-1 animate-pulse-slow">
                  {getTotalItems()}
                </span>
                ₹{getTotalPrice().toFixed(2)}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="bg-mint-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex-shrink-0 animate-scale-in">
              <Link href="/">
                <Image
                  src="https://farmersdairy.in/images/farmers-dairy-logo.png"
                  alt="Farmer's Dairy Logo"
                  width={120}
                  height={60}
                  className="h-12 w-auto"
                />
              </Link>
            </div>

            {/* Desktop Navigation items - centered */}
            <nav className="hidden md:flex items-center justify-center flex-1">
              <div className="flex space-x-8">
                {navItems.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-sm font-medium transition-all duration-300 hover:scale-105 animate-fade-in ${
                      pathname === item.href
                        ? "text-text border-b-2 border-green pb-1"
                        : "text-text hover:text-green"
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}>
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-text hover:text-green transition-colors duration-300">
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* Empty div for spacing on desktop */}
            <div className="hidden md:block w-[120px]"></div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-mint">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 text-base font-medium transition-colors duration-300 ${
                      pathname === item.href
                        ? "text-green bg-mint-light border-l-4 border-green"
                        : "text-text hover:text-green hover:bg-mint-light"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
