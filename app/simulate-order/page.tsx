"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, CheckCircle, AlertCircle } from "lucide-react"

export default function SimulateOrderPage() {
  const [isSimulating, setIsSimulating] = useState(false)
  const [result, setResult] = useState<any>(null)

  const simulateShopOrder = async () => {
    setIsSimulating(true)
    setResult(null)

    try {
      console.log("🛒 Starting shop order simulation...")

      const response = await fetch("/api/simulate-shop-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()
      console.log("📦 Simulation result:", data)

      setResult(data)

      if (data.success) {
        console.log("🎉 Shop order simulated successfully!")
        console.log("📋 Order ID:", data.orderId)
        console.log("👤 Customer:", data.customerName)
        console.log("💰 Amount:", data.totalAmount)
      }
    } catch (error) {
      console.error("❌ Error simulating order:", error)
      setResult({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setIsSimulating(false)
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-text mb-4">Simulate Shop Order</h1>
          <p className="text-lg text-text">This simulates a customer placing an order through the normal shop flow</p>
        </div>

        <Card className="card border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Shop Order Simulation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-mint-light p-4 rounded-lg">
              <h3 className="font-semibold text-text mb-2">This will simulate:</h3>
              <ul className="text-sm text-text space-y-1">
                <li>• Customer browsing shop page</li>
                <li>• Adding Fresh Cow Milk 1000ml to cart</li>
                <li>• Selecting monthly subscription</li>
                <li>• Filling checkout form with customer details</li>
                <li>• Completing online payment</li>
                <li>• Order confirmation and storage</li>
              </ul>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2">Simulated Customer Details:</h4>
              <div className="text-sm text-yellow-700 space-y-1">
                <p>• Name: Rajesh Kumar</p>
                <p>• Email: rajesh.kumar@gmail.com</p>
                <p>• Phone: 9123456789</p>
                <p>• Product: Fresh Cow Milk 1000ml</p>
                <p>• Subscription: Monthly (30 days)</p>
                <p>• Amount: ₹60</p>
                <p>• Payment: Online Payment</p>
              </div>
            </div>

            <Button onClick={simulateShopOrder} disabled={isSimulating} className="btn-primary w-full">
              {isSimulating ? "Simulating Order..." : "Simulate Shop Order"}
            </Button>

            {result && (
              <div
                className={`p-4 rounded-lg ${
                  result.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
                }`}
              >
                <div className="flex items-center mb-2">
                  {result.success ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                  )}
                  <h4 className={`font-semibold ${result.success ? "text-green-800" : "text-red-800"}`}>
                    {result.success ? "Order Simulated Successfully!" : "Simulation Failed"}
                  </h4>
                </div>

                {result.success ? (
                  <div className="text-sm text-green-700 space-y-1">
                    <p>📋 Order ID: {result.orderId}</p>
                    <p>👤 Customer: {result.customerName}</p>
                    <p>💰 Amount: ₹{result.totalAmount}</p>
                    <p>⏰ Time: {new Date(result.timestamp).toLocaleString()}</p>
                    <p className="mt-3 font-medium text-green-800">
                      ✅ Now check the admin dashboard to see this order!
                    </p>
                  </div>
                ) : (
                  <div className="text-sm text-red-700">
                    <p>❌ Error: {result.error}</p>
                  </div>
                )}
              </div>
            )}

            <div className="text-center space-y-4">
              <p className="text-sm text-text opacity-70">
                After simulating the order, check the admin dashboard to verify it appears.
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
