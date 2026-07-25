import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Have questions about our products or services? Get in touch with Farmer's Dairy, Hosur — we'll respond as soon as possible.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
