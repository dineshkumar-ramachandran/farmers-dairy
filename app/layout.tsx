import type React from "react";
import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/components/cart-context";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { siteConfig } from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-sans",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Farmer's Dairy - Fresh Farm Milk Delivered",
    template: "%s | Farmer's Dairy",
  },
  description: siteConfig.description,
  keywords: [
    "farm fresh milk",
    "raw cow milk",
    "milk delivery Hosur",
    "glass bottle milk",
    "milk subscription",
    "Farmer's Dairy",
  ],
  generator: "v0.dev",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Farmer's Dairy - Fresh Farm Milk Delivered",
    description: siteConfig.description,
    images: [
      {
        url: "/images/Hero-slider-image-2.png",
        width: 1920,
        height: 960,
        alt: "Farmer's Dairy - cows grazing on open pasture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Farmer's Dairy - Fresh Farm Milk Delivered",
    description: siteConfig.description,
    images: ["/images/Hero-slider-image-2.png"],
  },
  icons: {
    icon: "/images/farmers-dairy-logo.png",
    apple: "/images/farmers-dairy-logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0F2E2B",
  width: "device-width",
  initialScale: 1,
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: `+91${siteConfig.phone}`,
  email: siteConfig.email,
  image: `${siteConfig.url}/images/farmers-dairy-logo.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hosur",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  openingHours: "Mo-Su 04:00-07:00",
  sameAs: [
    siteConfig.socials.facebook,
    siteConfig.socials.instagram,
    siteConfig.socials.youtube,
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${jakarta.variable} ${bricolage.variable} font-sans`}
        suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-green focus:px-5 focus:py-2.5 focus:text-white focus:shadow-lg">
          Skip to main content
        </a>
        <CartProvider>
          <SmoothScroll>
            <Navigation />
            <main id="main-content">{children}</main>
            <Footer />
            <FloatingWhatsApp />
            <ScrollToTop />
          </SmoothScroll>
        </CartProvider>
      </body>
    </html>
  );
}
