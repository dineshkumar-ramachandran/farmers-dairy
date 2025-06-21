"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Phone, Mail, Home } from "lucide-react"
import Link from "next/link"

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const [orderDetails, setOrderDetails] = useState<any>(null)

  useEffect(() => {
    // Get order details from URL params or localStorage
    const orderId = searchParams.get("orderId")
    const customerName = searchParams.get("customerName")
    const totalAmount = searchParams.get("totalAmount")
    const paymentMethod = searchParams.get("paymentMethod")

    if (orderId) {
      setOrderDetails({
        orderId,
        customerName,
        totalAmount,
        paymentMethod,
      })
    }
  }, [searchParams])

  if (!orderDetails) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-text mb-4">Order Not Found</h1>
            <p className="text-lg text-text mb-8">We couldn't find your order details.</p>
            <Link href="/shop" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-gentle">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-text mb-4">Order Confirmed! 🎉</h1>
          <p className="text-lg text-text">Thank you for choosing Farmer's Dairy, {orderDetails.customerName}!</p>
        </div>

        <Card className="card border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-text text-center">Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-mint-light p-4 rounded-lg">
                <h3 className="font-semibold text-text mb-2">Order Information</h3>
                <p className="text-sm text-text">
                  <strong>Order ID:</strong> {orderDetails.orderId}
                </p>
                <p className="text-sm text-text">
                  <strong>Total Amount:</strong> ₹{orderDetails.totalAmount}
                </p>
                <p className="text-sm text-text">
                  <strong>Payment Method:</strong> {orderDetails.paymentMethod}
                </p>
              </div>

              <div className="bg-mint-light p-4 rounded-lg">
                <h3 className="font-semibold text-text mb-2">What's Next?</h3>
                <ul className="text-sm text-text space-y-1">
                  <li>• We'll contact you shortly for confirmation</li>
                  <li>• Delivery will start as per your schedule</li>
                  <li>• Fresh milk delivered daily to your doorstep</li>
                </ul>
              </div>
            </div>

            <div className="bg-green/10 p-6 rounded-lg text-center">
              <h3 className="text-xl font-semibold text-text mb-4">
                "From our farm to your family, with love in every drop" ❤️
              </h3>
              <p className="text-text">
                We're excited to serve you with the freshest, purest milk straight from our farm!
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="card border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-text">Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-mint-light rounded-lg">
                <Phone className="w-5 h-5 text-green" />
                <div>
                  <p className="font-medium text-text">Call Us</p>
                  <p className="text-sm text-text">9363778989</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-mint-light rounded-lg">
                <Mail className="w-5 h-5 text-green" />
                <div>
                  <p className="font-medium text-text">Email Us</p>
                  <p className="text-sm text-text">info@farmersdairy.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-mint-light rounded-lg">
                <Home className="w-5 h-5 text-green" />
                <div>
                  <p className="font-medium text-text">Visit Us</p>
                  <p className="text-sm text-text">Hosur, Tamil Nadu</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8 space-x-4">
          <Link href="/shop" className="btn-primary">
            Continue Shopping
          </Link>
          <Link href="/" className="btn-secondary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
