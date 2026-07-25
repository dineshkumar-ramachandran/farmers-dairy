import { Hero } from "@/components/sections/hero";
import { Signature } from "@/components/sections/signature";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { Journey } from "@/components/sections/journey";
import { Story } from "@/components/sections/story";
import { Benefits } from "@/components/sections/benefits";
import { FarmGallery } from "@/components/sections/farm-gallery";
import { Testimonials } from "@/components/sections/testimonials";
import { CTA } from "@/components/sections/cta";

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-clip">
      <Hero />
      <Signature />
      <ProductShowcase />
      <Journey />
      <Story />
      <Benefits />
      <FarmGallery />
      <Testimonials />
      <CTA />
    </div>
  );
}
