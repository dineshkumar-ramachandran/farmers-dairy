"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "./section-header";

/**
 * The signature range — the three hero SKUs (milk pouch, ghee, paneer) shown
 * large with real product photography. Cards rise in on scroll (Intersection
 * Observer via framer-motion, robust against the pinned hero above).
 */
const ITEMS = [
  {
    name: "Raw Cow Milk",
    tag: "Unprocessed · Raw",
    price: "from ₹35",
    blurb: "Pure raw cow milk in eco-friendly packets — 16g protein, nothing added.",
    image: "/images/1000ml-raw-cow-milk.png",
    fallback: "/images/fd-milk-pouch.svg",
    accent: "bg-mint-light",
  },
  {
    name: "Organic Cow Ghee",
    tag: "Slow-made · Aromatic",
    price: "from ₹629",
    blurb: "Golden ghee hand-made from farm-fresh milk, rich and pure in every spoon.",
    image: "/images/product-ghee.png",
    fallback: "/images/fd-ghee-jar.svg",
    accent: "bg-butter/15",
  },
  {
    name: "Organic Paneer",
    tag: "Soft · Fresh",
    price: "from ₹159",
    blurb: "Creamy paneer set fresh from pure cow milk — soft, rich and additive-free.",
    image: "/images/organic-paneer.png",
    fallback: "/images/fd-paneer.svg",
    accent: "bg-mint-light",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};
const card = {
  hidden: { opacity: 0, y: 80 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export function Signature() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden" aria-labelledby="signature-heading">
      <div className="relative max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-10">
        <SectionHeader
          num="01"
          eyebrow="Our Signature Range"
          title={
            <>
              Three things we do <span className="italic text-gradient-green">exceptionally</span>
            </>
          }
          description="Milk, ghee and paneer — each made from the same pure, farm-fresh cow milk."
        />

        <motion.div
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {ITEMS.map((item, i) => (
            <motion.article
              key={item.name}
              variants={card}
              className="group relative flex flex-col rounded-[2rem] border border-pine/12 bg-cloud overflow-hidden transition-all duration-500 ease-out-expo hover:-translate-y-2 hover:shadow-lifted hover:border-teal/40"
            >
              <div className="relative h-72 sm:h-80 flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="relative max-h-[86%] w-auto object-contain mix-blend-multiply transition-transform duration-700 ease-out-expo group-hover:scale-110"
                  style={{ animation: `floatY ${6 + i}s ease-in-out infinite` }}
                />
                <span className="absolute top-4 left-4 chip">{item.tag}</span>
              </div>

              <div className="flex flex-col flex-1 p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-xl sm:text-2xl font-bold">{item.name}</h3>
                  <span className="font-display font-bold text-teal whitespace-nowrap">{item.price}</span>
                </div>
                <p className="mt-2 text-[13.5px] text-ink-soft/70 leading-relaxed flex-1">{item.blurb}</p>
                <Link
                  href="/shop"
                  className="mt-5 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-teal transition-colors hover:text-pine"
                >
                  Shop now
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
