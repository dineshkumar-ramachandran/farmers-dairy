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

const featuredProducts = [
  {
    id: 3,
    name: "Sample Pack",
    price: "35 - 60",
    image: "/images/sample-milk.png",
    description: "Try our milk with this sample pack",
  },
  {
    id: 1,
    name: "Fresh Cow Milk 500ml",
    price: 35,
    image: "images/500ml-milk.png",
    description: "Pure farm-fresh cow milk in convenient 500ml bottles",
  },
  {
    id: 2,
    name: "Fresh Cow Milk 1000ml",
    price: 60,
    image: "images/1000ml-milk.png",
    description: "Pure farm-fresh cow milk in family-size 1000ml bottles",
  },
];

const testimonials = [
  {
    name: "MS. NIRMALA",
    location: "Hosur",
    rating: 5,
    text: "Fat and Thickness of the milk is very good. Bottles are also well Cleaned.",
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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text mb-4 animate-slide-up">
              Our Fresh Products
            </h2>
            <p className="text-lg text-text max-w-2xl mx-auto animate-fade-in">
              Choose from our selection of farm-fresh milk products delivered
              straight to your doorstep.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="card text-center animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-full h-48 bg-mint-light rounded-xl mb-4 flex items-center justify-center p-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-text mb-2">
                  {product.name}
                </h3>
                <p className="text-text opacity-80 mb-4">
                  {product.description}
                </p>
                <div className="text-2xl font-bold text-green mb-4">
                  ₹{product.price}
                </div>
                <Link
                  href="/shop"
                  className="btn-primary inline-flex items-center">
                  Buy Now
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
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
            running world we deliver milk through eco friendly glass bottles to
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
                Milked in the morning, delivered the same day for maximum
                freshness.
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
