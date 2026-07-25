"use client";

import { useRef, type ElementType } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "./use-isomorphic-layout-effect";

interface SplitRevealProps {
  text: string;
  as?: ElementType;
  className?: string;
  wordClassName?: string;
  start?: string;
  delay?: number;
}

/**
 * Word-by-word masked reveal for headings — each word rises out of an
 * overflow-clipped line. A lightweight, dependency-free SplitText.
 */
export function SplitReveal({
  text,
  as,
  className,
  wordClassName,
  start = "top 85%",
  delay = 0,
}: SplitRevealProps) {
  const Tag = (as ?? "h2") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>("[data-word]");

    if (prefersReducedMotion()) {
      gsap.set(targets, { yPercent: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        yPercent: 115,
        opacity: 0,
        duration: 0.9,
        delay,
        ease: "power4.out",
        stagger: 0.06,
        scrollTrigger: { trigger: el, start },
      });
    }, el);

    return () => ctx.revert();
  }, [text, start, delay]);

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-flex overflow-hidden align-bottom"
          style={{ paddingBottom: "0.06em", marginBottom: "-0.06em" }}
        >
          <span data-word className={`inline-block ${wordClassName ?? ""}`}>
            {word}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
