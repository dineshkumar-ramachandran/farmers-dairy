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
    price: "35 - 60",
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

      {/* Product Showcase Section — wider container so 5-col grid uses the
          full viewport width on desktops and cards grow with screen size. */}
      <section className="py-16 bg-white">
        <div className="max-w-[110rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text mb-4 animate-slide-up">
              Our Fresh Products
            </h2>
            <p className="text-lg text-text max-w-2xl mx-auto animate-fade-in">
              From our Farm to your Home. Explore our wide range of Pure and
              Healthy Dairy Products.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="card text-center animate-slide-up flex flex-col group"
                style={{ animationDelay: `${index * 0.08}s` }}>
                {/* Image + name link to the individual product page */}
                <Link
                  href={`/shop/${productDetails[product.id]?.slug || ""}`}
                  aria-label={`View details for ${product.name}`}
                  className="block">
                  <div className="w-full h-52 sm:h-60 md:h-64 lg:h-56 mb-3 flex items-center justify-center">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      loading="lazy"
                      className="max-w-full max-h-full object-contain transition-transform duration-300 ease-out group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-base sm:text-xl font-semibold text-text mb-2 group-hover:text-green transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-sm sm:text-base text-text opacity-80 mb-4 flex-1">
                  {product.description}
                </p>
                {product.comingSoon ? (
                  <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-butter/20 text-green-deep text-xs sm:text-sm font-bold uppercase tracking-wider">
                    Coming Soon
                  </span>
                ) : (
                  <>
                    <div className="text-xl sm:text-2xl font-bold text-green mb-4">
                      ₹{product.price}
                    </div>
                    <Link
                      href={`/shop/${productDetails[product.id]?.slug || ""}`}
                      aria-label={`Buy ${product.name}`}
                      className="btn-primary inline-flex items-center justify-center text-sm min-h-[44px]">
                      Buy Now
                      <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                    </Link>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-mint-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-text mb-6 animate-slide-up">
            A LITTLE STORY ABOUT US
          </h2>
          <h3 className="text-2xl font-semibold text-green mb-8 animate-slide-up">
            Farmers Dairy
          </h3>
          <p className="text-lg text-text leading-relaxed animate-fade-in">
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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text mb-4">
              Why Choose Our Farm Fresh Milk?
            </h2>
            <p className="text-lg text-text max-w-2xl mx-auto">
              We're committed to delivering the purest, most nutritious milk
              from our family farm to your family table.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card text-center animate-slide-up">
              <div className="w-16 h-16 bg-mint-light rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
                <Truck className="w-8 h-8 text-green icon-hover" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">
                Daily Delivery
              </h3>
              <p className="text-text opacity-80">
                Fresh milk delivered to your doorstep every morning before 7 AM.
              </p>
            </div>

            <div
              className="card text-center animate-slide-up"
              style={{ animationDelay: "0.1s" }}>
              <div className="w-16 h-16 bg-mint-light rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
                <Shield className="w-8 h-8 text-green icon-hover" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">
                100% Pure
              </h3>
              <p className="text-text opacity-80">
                No additives, no preservatives. Just pure, natural farm milk.
              </p>
            </div>

            <div
              className="card text-center animate-slide-up"
              style={{ animationDelay: "0.2s" }}>
              <div className="w-16 h-16 bg-mint-light rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
                <Clock className="w-8 h-8 text-green icon-hover" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">
                Always Fresh
              </h3>
              <p className="text-text opacity-80">
                We assure the milk delivered to each and every customer is fresh
                and completely hygienic.
              </p>
            </div>

            <div
              className="card text-center animate-slide-up"
              style={{ animationDelay: "0.3s" }}>
              <div className="w-16 h-16 bg-mint-light rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
                <Heart className="w-8 h-8 text-green icon-hover" />
              </div>
              <h3 className="text-xl font-semibold text-text mb-2">
                Family Farm
              </h3>
              <p className="text-text opacity-80">
                From our family farm to your family, with love and care in every
                drop.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-mint-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-text">
              Join thousands of satisfied families who trust us for their daily
              milk needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="card text-center animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-green mx-auto mb-4 animate-float" />
                  <div className="flex justify-center mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-text mb-4 italic">"{testimonial.text}"</p>
                <div className="text-center">
                  <h4 className="font-semibold text-text">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-text opacity-70">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text mb-4">
            Ready to Experience Farm Fresh Milk?
          </h2>
          <p className="text-lg text-text mb-8">
            Join thousands of families who trust us for their daily milk needs.
            Start your subscription today and taste the difference.
          </p>
          <Link href="/shop" className="btn-primary inline-flex items-center">
            Browse Products
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
