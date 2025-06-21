"use client"

import { useEffect, useState } from "react"
import { CheckCircle, Heart } from "lucide-react"

interface SuccessPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function SuccessPopup({ isOpen, onClose }: SuccessPopupProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onClose, 300) // Wait for fade out animation
      }, 5000) // Show for 5 seconds

      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white rounded-2xl p-8 max-w-md mx-4 text-center transform transition-all duration-300 ${
          isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        <div className="w-16 h-16 bg-green rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>

        <h2 className="text-2xl font-bold text-text mb-4">Order Confirmed! 🎉</h2>

        <p className="text-text mb-4">
          Thank you for choosing Farmer's Dairy! Your order has been confirmed and we'll contact you shortly.
        </p>

        <div className="bg-mint-light p-4 rounded-lg mb-4">
          <p className="text-sm text-text italic">"From our farm to your family, with love in every drop"</p>
          <div className="flex justify-center mt-2">
            <Heart className="w-4 h-4 text-green animate-pulse" />
          </div>
        </div>

        <p className="text-sm text-text opacity-70">We'll deliver fresh, pure milk right to your doorstep!</p>
      </div>
    </div>
  )
}
