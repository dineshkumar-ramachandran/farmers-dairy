import Link from "next/link";
import {
  ArrowRight,
  Truck,
  Shield,
  Clock,
  Heart,
  Star,
  Quote,
} from "lucide-react";
import { HeroSlider } from "@/components/hero-slider";
import { productDetails } from "@/lib/product-details";

const featuredProducts = [
  {
    id: 3,
    name: "Sample Pack",
    price: "35 - 63",
    image: "/images/sample-raw-cow-milk.png",
    description: "Try & Taste our Milk with the Sample Pack.",
    comingSoon: false,
  },
  {
    id: 1,
    name: "Raw Cow Milk 500ml",
    price: 35,
    image: "/images/500ml-raw-cow-milk.png",
    description: "Each drop of Farmer's Dairy milk carries Purity & Trust.",
    comingSoon: false,
  },
  {
    id: 2,
    name: "Raw Cow Milk 1000ml",
    price: 63,
    image: "/images/1000ml-raw-cow-milk.png",
    description: "Each drop of Farmer's Dairy milk carries Purity & Trust.",
    comingSoon: false,
  },
  {
    id: 4,
    name: "Organic Cow Ghee",
    price: "629 - 1249",
    image: "/images/organic-ghee.png",
    description: "Pure organic cow ghee, slow-made from farm-fresh milk.",
    comingSoon: false,
  },
  {
    id: 5,
    name: "Organic Paneer",
    price: "159 - 719",
    image: "/images/organic-paneer.png",
    description:
      "Soft and Healthy Paneer made from Organic Cow milk & Lemon. Comes with paneer water inside.",
    comingSoon: false,
  },
  {
    id: 6,
    name: "Organic Butter",
    price: "249 - 449",
    image: "/images/organic-butter.png",
    description: "Churned from Organic Cream. Soft and creamy butter for tasty dosas.",
    comingSoon: false,
  },
  {
    id: 10,
    name: "Honey",
    price: "Coming Soon",
    image: "/images/honey.png",
    description: "Raw, unprocessed, unfiltered honey — coming soon.",
    comingSoon: true,
  },
  {
    id: 9,
    name: "Nutri Mix",
    price: "Coming Soon",
    image: "/images/nutri-mix.png",
    description: "Nourishing multi-grain nutri mix — coming soon.",
    comingSoon: true,
  },
  {
    id: 8,
    name: "Coconut Oil",
    price: "Coming Soon",
    image: "/images/coconut-oil.png",
    description: "Cold wood-pressed coconut oil — coming soon.",
    comingSoon: true,
  },
  {
    id: 7,
    name: "Groundnut Oil",
    price: "Coming Soon",
    image: "/images/groundnut-oil.png",
    description: "Cold wood-pressed groundnut oil — coming soon.",
    comingSoon: true,
  },
];

const testimonials = [
  {
    name: "MS. NIRMALA",
    location: "Hosur",
    rating: 5,
    text: "Fat and Thickness of the milk is very good. Packets are also well sealed.",
  },
  {
    name: "MR. LOKESH",
    location: "Hosur",
    rating: 5,
    text: "My mother certified your milk product She is happy. Thanks for your good product and service.",
  },
  {
    name: "MS. SELVA",
    location: "Hosur",
    rating: 5,
    text: "Milk taste very good sir My family members all liked your milk very much",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Product Showcase Section */}
      <section className="relative py-20 sm:py-28 overflow-hidden bg-white">
        <div className="pointer-events-none absolute -top-32 -right-24 w-[28rem] h-[28rem] blob animate-blob-slow bg-butter/10" aria-hidden="true" />
        <div className="relative max-w-[110rem] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="eyebrow mx-auto mb-5 justify-center">Our Products</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tightest mb-4">
              Our Fresh <span className="italic text-gradient-green">Products</span>
            </h2>
            <p className="text-lg text-text/80 max-w-2xl mx-auto leading-relaxed">
              From our Farm to your Home. Explore our wide range of Pure and
              Healthy Dairy Products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="card text-center animate-slide-up flex flex-col group !p-4 sm:!p-5"
                style={{ animationDelay: `${index * 0.06}s` }}>
                {/* Product stage with a soft radial glow behind the image */}
                <Link
                  href={`/shop/${productDetails[product.id]?.slug || ""}`}
                  aria-label={`View details for ${product.name}`}
                  className="relative block">
                  <div
                    className="absolute inset-x-4 top-4 bottom-16 rounded-full opacity-70"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 55%, rgba(255,251,243,0.9) 0%, rgba(245,219,174,0.35) 55%, rgba(251,235,209,0) 80%)",
                    }}
                    aria-hidden="true"
                  />
                  <div className="relative w-full h-96 md:h-64 lg:h-56 mb-3 flex items-center justify-center">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      loading="lazy"
                      className="max-w-full max-h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-rotate-1"
                    />
                  </div>
                  <h3 className="text-base sm:text-lg font-display font-bold text-green-deep mb-2 group-hover:text-green transition-colors leading-snug">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-sm text-text/75 mb-4 flex-1 leading-relaxed">
                  {product.description}
                </p>
                {product.comingSoon ? (
                  <span className="chip mx-auto">Coming Soon</span>
                ) : (
                  <>
                    <div className="stamp mx-auto text-sm mb-4">₹{product.price}</div>
                    <Link
                      href={`/shop/${productDetails[product.id]?.slug || ""}`}
                      aria-label={`Buy ${product.name}`}
                      className="btn-primary inline-flex items-center justify-center gap-2 text-[12px] w-full">
                      Buy Now
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="relative py-20 sm:py-28 overflow-hidden bg-mint-light bg-grain">
        <div className="pointer-events-none absolute -top-24 -left-16 w-[26rem] h-[26rem] blob animate-blob bg-butter/25" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="eyebrow mx-auto mb-5 justify-center">Our Story</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tightest mb-4 animate-slide-up">
            A LITTLE STORY <span className="italic text-green">ABOUT US</span>
          </h2>
          <h3 className="text-xl sm:text-2xl font-display italic text-butter-deep mb-8 animate-slide-up">
            Farmers Dairy
          </h3>
          <p className="text-base sm:text-lg text-text leading-[1.85] max-w-3xl mx-auto animate-fade-in first-letter:font-display first-letter:text-5xl first-letter:sm:text-6xl first-letter:font-bold first-letter:text-green first-letter:float-left first-letter:mr-3 first-letter:leading-[0.85]">
            A small start up with a big vision started by two youngsters,
            Farmer's dairy is a fresh dairy based product based company in
            Hosur. Farmer's Dairy is a company that acts as a direct
            intermediate between a farmer and a consumer to provide fresh raw
            cow milk without adding any water or other preservatives. Farmer's
            Dairy is a small initiative that helps in benefiting both farmer's
            and the consumer with good price and good health. In this busy
            running world we deliver milk through eco friendly packets to
            your doorstep.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-20 sm:py-28 overflow-hidden bg-white">
        <div className="pointer-events-none absolute -bottom-32 -right-24 w-[28rem] h-[28rem] blob animate-blob bg-butter/10" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="eyebrow mx-auto mb-5 justify-center">Why Us</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tightest mb-4">
              Why Choose Our <span className="italic text-gradient-green">Farm Fresh Milk?</span>
            </h2>
            <p className="text-lg text-text/80 max-w-2xl mx-auto leading-relaxed">
              We're committed to delivering the purest, most nutritious milk
              from our family farm to your family table.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { Icon: Truck, title: "Daily Delivery", text: "Fresh milk delivered to your doorstep every morning before 7 AM." },
              { Icon: Shield, title: "100% Pure", text: "No additives, no preservatives. Just pure, natural farm milk." },
              { Icon: Clock, title: "Always Fresh", text: "We assure the milk delivered to each and every customer is fresh and completely hygienic." },
              { Icon: Heart, title: "Family Farm", text: "From our family farm to your family, with love and care in every drop." },
            ].map(({ Icon, title, text }, index) => (
              <div
                key={title}
                className="card text-center animate-slide-up group"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="relative w-16 h-16 mx-auto mb-5">
                  <div className="absolute inset-0 rounded-full bg-butter/20 group-hover:bg-butter/40 transition-colors duration-500" aria-hidden="true" />
                  <div className="relative w-full h-full flex items-center justify-center rounded-full border border-butter/40 group-hover:border-butter transition-colors duration-500">
                    <Icon className="w-7 h-7 text-green transition-transform duration-500 group-hover:scale-110" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-green-deep mb-2">
                  {title}
                </h3>
                <p className="text-sm sm:text-base text-text/75 leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20 sm:py-28 overflow-hidden bg-mint-light bg-grain">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="eyebrow mx-auto mb-5 justify-center">Testimonials</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tightest mb-4">
              What Our <span className="italic text-gradient-green">Customers Say</span>
            </h2>
            <p className="text-lg text-text/80 max-w-2xl mx-auto leading-relaxed">
              Join thousands of satisfied families who trust us for their daily
              milk needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="card text-center animate-slide-up relative"
                style={{ animationDelay: `${index * 0.1}s` }}>
                <Quote className="absolute -top-3 left-6 w-10 h-10 text-butter/70 rotate-180" aria-hidden="true" />
                <div className="flex justify-center mb-4 gap-0.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-butter fill-current"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="text-text/85 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                <div className="rule pt-4">
                  <h4 className="font-display font-bold text-green-deep">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-text/60 uppercase tracking-wider mt-1">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 sm:py-28 overflow-hidden bg-white">
        <div className="pointer-events-none absolute -top-24 left-1/4 w-[24rem] h-[24rem] blob animate-blob bg-butter/15" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-24 right-1/4 w-[24rem] h-[24rem] blob animate-blob-slow bg-mint/10" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <p className="eyebrow mx-auto mb-5 justify-center">Taste the Difference</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tightest mb-6 leading-[1.05]">
            Ready to Experience <span className="italic text-gradient-green">Farm Fresh</span> Milk?
          </h2>
          <p className="text-base sm:text-lg text-text/80 mb-9 leading-relaxed max-w-2xl mx-auto">
            Join thousands of families who trust us for their daily milk needs.
            Start your subscription today and taste the difference.
          </p>
          <Link href="/shop" className="btn-primary inline-flex items-center gap-2">
            Browse Products
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
