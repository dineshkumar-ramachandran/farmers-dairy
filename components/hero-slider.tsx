"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

const slides = [
  {
    id: 1,
    title: "Fresh Farm Milk",
    subtitle: "Delivered Daily",
    description: "Experience the pure taste of farm-fresh milk delivered straight to your doorstep.",
    backgroundImage: "url('/placeholder.svg?height=700&width=1200&text=Fresh+Farm+Milk')",
    cta: "Start Subscription",
    textPosition: "left",
  },
  {
    id: 2,
    title: "100% Pure & Natural",
    subtitle: "No Preservatives",
    description: "Our cows graze on natural pastures, ensuring the highest quality and nutrition.",
    backgroundImage: "url('/placeholder.svg?height=700&width=1200&text=Pure+Natural+Milk')",
    cta: "Shop Now",
    textPosition: "right",
  },
  {
    id: 3,
    title: "Eco-Friendly Delivery",
    subtitle: "Glass Bottles",
    description: "We deliver milk in eco-friendly glass bottles to reduce environmental impact.",
    backgroundImage: "url('/placeholder.svg?height=700&width=1200&text=Eco+Friendly+Delivery')",
    cta: "Learn More",
    textPosition: "left",
  },
  {
    id: 4,
    title: "Farm to Table",
    subtitle: "Fresh Daily",
    description: "From our family farm to your family table, ensuring freshness in every drop.",
    backgroundImage: "url('/placeholder.svg?height=700&width=1200&text=Farm+to+Table')",
    cta: "Order Now",
    textPosition: "left",
  },
]

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? "translate-x-0" : index < currentSlide ? "-translate-x-full" : "translate-x-full"
          }`}
          style={{
            backgroundImage: slide.backgroundImage,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>

          <div className="relative z-10 flex items-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`max-w-2xl animate-slide-up ${
                slide.textPosition === "right"
                  ? "ml-auto text-right md:mr-8 lg:mr-16"
                  : slide.textPosition === "center"
                    ? "mx-auto text-center"
                    : "mr-auto text-left md:ml-8 lg:ml-16"
              }`}
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight">
                {slide.title}
                <span className="block text-green-400">{slide.subtitle}</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-4 sm:mb-6 md:mb-8 leading-relaxed max-w-xl">
                {slide.description}
              </p>
              <Link href="/shop" className="btn-primary inline-flex items-center text-sm sm:text-base">
                {slide.cta}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-green p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 z-20"
      >
        <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-green p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110 z-20"
      >
        <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-green-400 scale-125" : "bg-white/60 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
