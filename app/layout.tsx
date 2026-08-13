import type React from "react";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/components/cart-context";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { ScrollToTop } from "@/components/scroll-to-top";

/** Body typography — Plus Jakarta Sans reads warm and modern at body sizes. */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-sans",
});

/** Display typography — Bricolage Grotesque gives editorial weight to hero
 *  and section titles without feeling ornamental. */
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Farmer's Dairy - Fresh Farm Milk Delivered",
  description:
    "Premium quality farm-fresh milk delivered to your doorstep. Subscribe for daily, weekly, or monthly delivery.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Razorpay Script - Load in head to avoid hydration issues */}
        <script
          src="https://checkout.razorpay.com/v1/checkout.js"
          async
          defer
        />
      </head>
      <body
        className={`${jakarta.variable} ${bricolage.variable} font-sans`}
        suppressHydrationWarning>
        <CartProvider>
          <Navigation />
          <main>{children}</main>
          <Footer />
          <FloatingWhatsApp />
          <ScrollToTop />
        </CartProvider>
      </body>
    </html>
  );
}
