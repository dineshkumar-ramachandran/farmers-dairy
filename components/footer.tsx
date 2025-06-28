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

export function Footer() {
  return (
    <footer className="bg-mint-light text-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4 animate-slide-up">
            <div className="flex items-center">
              <Image
                src="/images/farmers-dairy-logo.png"
                alt="Farmer's Dairy Logo"
                width={120}
                height={60}
                className="h-auto w-[90px]"
              />
            </div>
            <p className="text-text text-sm">
              Fresh farm milk delivered to your doorstep daily. Pure, natural,
              and healthy.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/farmersdairy.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text hover:text-green cursor-pointer transition-colors duration-300 animate-float">
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/farmersdairy.in/#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text hover:text-green cursor-pointer transition-colors duration-300 animate-float"
                style={{ animationDelay: "0.5s" }}>
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/@farmersdairy-28"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text hover:text-green cursor-pointer transition-colors duration-300 animate-float"
                style={{ animationDelay: "1s" }}>
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-slide-left">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-text hover:text-green transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-text hover:text-green transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="text-text hover:text-green transition-colors duration-300">
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-text hover:text-green transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="animate-scale-in">
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="text-text hover:text-green transition-colors duration-300">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping-and-delivery"
                  className="text-text hover:text-green transition-colors duration-300">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link
                  href="/cancellation-and-refund"
                  className="text-text hover:text-green transition-colors duration-300">
                  Cancellation & Refund
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-text hover:text-green transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-slide-right">
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-green animate-wiggle" />
                <span className="text-text">9363778989</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-green animate-pulse-slow" />
                <span className="text-text">info@farmersdairy.com</span>
              </div>
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 text-green mt-1 animate-bounce-gentle" />
                <span className="text-text text-sm">Hosur, Tamil Nadu</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-mint mt-8 pt-8 text-center">
          <p className="text-text text-sm animate-fade-in">
            © 2024 Farmer's Dairy. All rights reserved. | Designed by
            Onprimehub
          </p>
        </div>
      </div>
    </footer>
  );
}
