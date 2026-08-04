"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Package, User, CreditCard, Calendar, Home } from "lucide-react"
import Link from "next/link"

function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const [orderDetails, setOrderDetails] = useState<{
    orderId: string
    customerName: string
    totalAmount: string
    paymentMethod: string
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const orderId = searchParams.get("orderId")
    const customerName = searchParams.get("customerName")
    const totalAmount = searchParams.get("totalAmount")
    const paymentMethod = searchParams.get("paymentMethod")

    if (orderId && customerName && totalAmount && paymentMethod) {
      setOrderDetails({
        orderId,
        customerName,
        totalAmount,
        paymentMethod,
      })
    }
    setIsLoading(false)
  }, [searchParams])

  if (isLoading) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green mx-auto"></div>
            <p className="mt-4 text-lg text-text">Loading order confirmation...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-text mb-4">Order Not Found</h1>
            <p className="text-lg text-text mb-8">We couldn't find your order details.</p>
            <Link href="/shop">
              <Button className="btn-primary">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-lg text-gray-600">Thank you for your order. We'll get your fresh milk delivered soon!</p>
        </div>

        {/* Order Details Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Order Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Package className="w-4 h-4 mr-2 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-semibold">{orderDetails.orderId}</p>
                </div>
              </div>

              <div className="flex items-center">
                <User className="w-4 h-4 mr-2 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Customer</p>
                  <p className="font-semibold">{orderDetails.customerName}</p>
                </div>
              </div>

              <div className="flex items-center">
                <CreditCard className="w-4 h-4 mr-2 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="font-semibold text-green-600">₹{orderDetails.totalAmount}</p>
                </div>
              </div>

              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="font-semibold">{orderDetails.paymentMethod}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="btn-primary flex items-center">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link href="/shop">
            <Button variant="outline" className="flex items-center">
              <Package className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen py-8">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green mx-auto"></div>
              <p className="mt-4 text-lg text-text">Loading...</p>
            </div>
          </div>
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  )
}
