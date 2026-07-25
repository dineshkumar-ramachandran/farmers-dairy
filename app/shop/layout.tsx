import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Choose from our selection of farm-fresh milk products and set up your convenient delivery subscription.",
  alternates: { canonical: "/shop" },
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
