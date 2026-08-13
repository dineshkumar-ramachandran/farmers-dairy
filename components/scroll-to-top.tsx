"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/** Floating scroll-to-top affordance. Appears after 500px of scroll and sits
 *  above the WhatsApp float so they don't overlap on mobile. */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className={`fixed bottom-24 right-5 sm:right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-green-deep text-cream shadow-lifted transition-all duration-300 hover:-translate-y-1 hover:bg-green ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
