"use client";

import { Truck, Shield, Clock, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeader } from "./section-header";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

const benefits = [
  {
    icon: Truck,
    title: "Daily Delivery",
    description:
      "Fresh milk delivered to your doorstep every morning before 7 AM.",
  },
  {
    icon: Shield,
    title: "100% Pure",
    description:
      "No additives, no preservatives. Just pure, natural farm milk.",
  },
  {
    icon: Clock,
    title: "Always Fresh",
    description:
      "We assure the milk delivered to each and every customer is fresh and completely hygienic.",
  },
  {
    icon: Heart,
    title: "Family Farm",
    description:
      "From our family farm to your family, with love and care in every drop.",
  },
];

/** Numbered editorial grid with hairline rules. */
export function Benefits() {
  return (
    <section
      className="relative py-20 sm:py-28 overflow-hidden"
      aria-labelledby="benefits-heading">
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-10">
        <SectionHeader
          num="03"
          eyebrow="Why Choose Us"
          title={
            <>
              Why Choose Our{" "}
              <span className="italic text-gradient-green">Farm Fresh</span> Milk?
            </>
          }
          description="We're committed to delivering the purest, most nutritious milk from our family farm to your family table."
        />

        <Stagger
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10"
          staggerDelay={0.1}>
          {benefits.map((benefit, i) => (
            <StaggerItem key={benefit.title}>
              <motion.article
                className="group rule pt-6 h-full"
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}>
                <div className="flex items-start justify-between mb-6">
                  <motion.span
                    className="flex h-14 w-14 items-center justify-center rounded-full border-[1.5px] border-green/30 bg-mint-light/60 transition-colors duration-500 group-hover:bg-green"
                    whileHover={{ rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.5 }}>
                    <benefit.icon
                      className="w-6 h-6 text-green transition-colors duration-500 group-hover:text-cream"
                      aria-hidden="true"
                    />
                  </motion.span>
                  <span className="section-num" aria-hidden="true">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-semibold mb-2.5">
                  {benefit.title}
                </h3>
                <p className="text-sm text-text/65 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
