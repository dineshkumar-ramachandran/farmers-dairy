"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Package } from "lucide-react"

export default function TestOrderPage() {
  const [isPlacing, setIsPlacing] = useState(false)
  const [result, setResult] = useState<any>(null)

  const placeTestOrder = async () => {
    setIsPlacing(true)
    setResult(null)

    const testOrder = {
      orderId: "FD" + Date.now() + "TEST",
      customerDetails: {
        name: "Test Customer",
        email: "test@farmersdairy.com",
        phone: "9876543210",
        address: "123 Test Street, Test Area",
        city: "Hosur",
        pincode: "635109",
        specialInstructions: "This is a test order for admin dashboard verification",
      },
      orderDetails: "Fresh Cow Milk 500ml (Qty: 1, Price: ₹35) - Subscription: weekly - Test order",
      totalAmount: "35.00",
      paymentMethod: "Cash on Delivery",
      orderDate: new Date().toISOString(),
      status: "Confirmed",
      items: [
        {
          name: "Fresh Cow Milk 500ml",
          quantity: 1,
          price: 35,
          subscription: "weekly",
          deliveryDate: new Date().toISOString(),
          totalDays: 7,
        },
      ],
    }

    try {
      console.log("🧪 Placing test order:", testOrder.orderId)

      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testOrder),
      })

      const result = await response.json()
      console.log("✅ Test order result:", result)

      setResult(result)

      if (result.success) {
        // Also fetch orders to verify
        const fetchResponse = await fetch("/api/get-orders")
        const fetchResult = await fetchResponse.json()
        console.log("📦 Orders after test:", fetchResult)
      }
    } catch (error) {
      console.error("❌ Error placing test order:", error)
      setResult({ success: false, error: error.message })
    } finally {
      setIsPlacing(false)
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-text mb-4">Test Order Placement</h1>
          <p className="text-lg text-text">Use this page to test order creation for admin dashboard</p>
        </div>

        <Card className="card border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Place Test Order
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-mint-light p-4 rounded-lg">
              <h3 className="font-semibold text-text mb-2">Test Order Details:</h3>
              <ul className="text-sm text-text space-y-1">
                <li>• Customer: Test Customer</li>
                <li>• Product: Fresh Cow Milk 500ml</li>
                <li>• Quantity: 1</li>
                <li>• Price: ₹35</li>
                <li>• Payment: Cash on Delivery</li>
                <li>• Subscription: Weekly</li>
              </ul>
            </div>

            <Button onClick={placeTestOrder} disabled={isPlacing} className="btn-primary w-full">
              {isPlacing ? "Placing Order..." : "Place Test Order"}
            </Button>

            {result && (
              <div
                className={`p-4 rounded-lg ${result.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
              >
                <div className="flex items-center mb-2">
                  {result.success ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  ) : (
                    <Package className="w-5 h-5 text-red-600 mr-2" />
                  )}
                  <h4 className={`font-semibold ${result.success ? "text-green-800" : "text-red-800"}`}>
                    {result.success ? "Order Placed Successfully!" : "Order Failed"}
                  </h4>
                </div>

                {result.success ? (
                  <div className="text-sm text-green-700">
                    <p>Order ID: {result.orderId}</p>
                    <p>Message: {result.message}</p>
                    <p className="mt-2 font-medium">✅ Check the admin dashboard to see this order!</p>
                  </div>
                ) : (
                  <div className="text-sm text-red-700">
                    <p>Error: {result.error}</p>
                  </div>
                )}
              </div>
            )}

            <div className="text-center">
              <p className="text-sm text-text opacity-70 mb-4">
                After placing the test order, go to the admin dashboard to verify it appears.
              </p>
              <div className="space-x-4">
                <Button onClick={() => window.open("/admin", "_blank")} variant="outline">
                  Open Admin Dashboard
                </Button>
                <Button onClick={() => (window.location.href = "/shop")} variant="outline">
                  Go to Shop
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
