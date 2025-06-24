import { Heart, Award, Truck, Users, Target, Eye } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-4xl font-bold text-earth-900 mb-6">About Farmer's Dairy</h1>
          <p className="text-xl text-earth-600 leading-relaxed">
            A small start up with a big vision started by two youngsters, Farmer's dairy is a fresh dairy based product
            based company in Hosur.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="card animate-slide-up">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-earth-900 mb-4">Our Mission</h2>
              <p className="text-earth-600 leading-relaxed">
                Farmer's Dairy is a company that acts as a direct intermediate between a farmer and a consumer to
                provide fresh raw cow milk without adding any water or other preservatives. We help in benefiting both
                farmer's and the consumer with good price and good health.
              </p>
            </div>
          </div>

          <div className="card animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
                <Eye className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-earth-900 mb-4">Our Vision</h2>
              <p className="text-earth-600 leading-relaxed">
                In this busy running world we deliver milk through eco friendly glass bottles to your doorstep. We
                envision a future where every family has access to pure, fresh, and nutritious milk directly from the
                farm.
              </p>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="card animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 animate-float">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-earth-900 mb-2">Family Values</h3>
                <p className="text-earth-600">
                  Our farm has been built on family values. We treat every customer like family and every cow with the
                  love and care they deserve.
                </p>
              </div>
            </div>
          </div>

          <div className="card animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 animate-float">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-earth-900 mb-2">Quality First</h3>
                <p className="text-earth-600">
                  We maintain the highest standards of quality control, from milking to packing. Every batch is tested
                  to ensure purity and freshness without any preservatives.
                </p>
              </div>
            </div>
          </div>

          <div className="card animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 animate-float">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-earth-900 mb-2">Eco-Friendly Delivery</h3>
                <p className="text-earth-600">
                  We deliver milk in eco-friendly glass bottles to reduce environmental impact. Our delivery team takes
                  pride in punctual, reliable service.
                </p>
              </div>
            </div>
          </div>

          <div className="card animate-slide-up" style={{ animationDelay: "0.5s" }}>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 animate-float">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-earth-900 mb-2">Community Focus</h3>
                <p className="text-earth-600">
                  We're proud to be part of the Hosur community. Supporting local families with nutritious milk while
                  maintaining sustainable farming practices.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Freshness Promise */}
        <div className="card bg-green-50 border-green-200 animate-slide-up" style={{ animationDelay: "0.6s" }}>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-earth-900 mb-6">Our Freshness Promise</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="animate-bounce-gentle">
                <div className="text-4xl font-bold text-green-600 mb-2">2 AM</div>
                <p className="text-earth-600">Bottling and Sealing</p>
              </div>
              <div className="animate-bounce-gentle" style={{ animationDelay: "0.5s" }}>
                <div className="text-4xl font-bold text-green-600 mb-2">4 AM</div>
                <p className="text-earth-600">Delivery Starts</p>
              </div>
              <div className="animate-bounce-gentle" style={{ animationDelay: "1s" }}>
                <div className="text-4xl font-bold text-green-600 mb-2">7 AM</div>
                <p className="text-earth-600">Delivery Ends</p>
              </div>
            </div>
            <p className="text-lg text-earth-600 mt-8">
              "From Our Farm to your Home" - that's our commitment to freshness.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
