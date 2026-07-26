"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { featuredProducts } from "@/lib/site";
import { SectionHeader } from "./section-header";

/** The dairy case: product cards that reveal with a staggered 3D flip-in. */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const card = {
  hidden: { opacity: 0, y: 70, rotateX: -34, z: -140 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    z: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export function ProductShowcase() {
  return (
    <section
      className="relative py-20 sm:py-28 overflow-hidden"
      aria-labelledby="products-heading"
    >
      <div className="relative max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-10">
        <SectionHeader
          num="02"
          eyebrow="The Dairy Case"
          title={
            <>
              Our Fresh <span className="italic text-gradient-green">Products</span>
            </>
          }
          description="From our Farm to your Home. Explore our wide range of Pure and Healthy Dairy Products."
        />

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          style={{ perspective: "1200px" }}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {featuredProducts.map((product) => (
            <motion.article
              key={product.id}
              variants={card}
              className="group h-full flex flex-col rounded-4xl border border-pine/12 bg-cloud transition-all duration-500 ease-out-expo hover:border-teal/40 hover:shadow-lifted hover:-translate-y-2 overflow-hidden [transform-style:preserve-3d]"
            >
              {/* Product stage — frameless, no category tag overlay */}
              <div className="relative mx-3 mt-3">
                <div className="flex items-center justify-center h-44 sm:h-52 p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-40 sm:max-h-44 w-auto object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>

              <div className="flex flex-col flex-1 p-4 sm:p-5">
                <h3 className="font-display text-lg sm:text-xl font-bold leading-snug">
                  {product.name}
                </h3>
                <p className="mt-1.5 text-[13px] text-ink-soft/65 leading-relaxed flex-1">
                  {product.description}
                </p>
                <div className="mt-4 flex items-center justify-between gap-2">
                  {product.comingSoon ? (
                    <span className="chip">Coming Soon</span>
                  ) : (
                    <span className="stamp text-sm">₹{product.price}</span>
                  )}
                  {!product.comingSoon && (
                    <Link
                      href="/shop"
                      aria-label={`Buy ${product.name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] border-teal text-teal transition-all duration-300 group-hover:bg-teal group-hover:text-cloud"
                    >
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
