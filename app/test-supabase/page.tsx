"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertCircle, Database, Package, Loader2 } from "lucide-react"

export default function TestSupabasePage() {
  const [isTestingConnection, setIsTestingConnection] = useState(false)
  const [isAddingTestOrder, setIsAddingTestOrder] = useState(false)
  const [connectionResult, setConnectionResult] = useState<any>(null)
  const [testOrderResult, setTestOrderResult] = useState<any>(null)

  const testConnection = async () => {
    setIsTestingConnection(true)
    setConnectionResult(null)

    try {
      console.log("🧪 Testing Supabase connection...")

      const response = await fetch("/api/test-supabase", {
        method: "GET",
      })

      const result = await response.json()
      console.log("📊 Connection test result:", result)

      setConnectionResult(result)
    } catch (error) {
      console.error("❌ Error testing connection:", error)
      setConnectionResult({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        connected: false,
      })
    } finally {
      setIsTestingConnection(false)
    }
  }

  const addTestOrder = async () => {
    setIsAddingTestOrder(true)
    setTestOrderResult(null)

    try {
      console.log("🧪 Adding test order to Supabase...")

      const response = await fetch("/api/test-supabase", {
        method: "POST",
      })

      const result = await response.json()
      console.log("📦 Test order result:", result)

      setTestOrderResult(result)
    } catch (error) {
      console.error("❌ Error adding test order:", error)
      setTestOrderResult({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setIsAddingTestOrder(false)
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-text mb-4">Supabase Connection Test</h1>
          <p className="text-lg text-text">Test the connection to Supabase database and verify order storage</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Connection Test */}
          <Card className="card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="w-5 h-5 mr-2" />
                Database Connection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-mint-light p-4 rounded-lg">
                <h3 className="font-semibold text-text mb-2">Connection Details:</h3>
                <ul className="text-sm text-text space-y-1">
                  <li>• Database: Supabase PostgreSQL</li>
                  <li>• URL: ugxqilcquusfwvkmzxwo.supabase.co</li>
                  <li>• Table: orders</li>
                  <li>• API Key: Configured</li>
                </ul>
              </div>

              <Button onClick={testConnection} disabled={isTestingConnection} className="btn-primary w-full">
                {isTestingConnection ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Testing Connection...
                  </>
                ) : (
                  "Test Database Connection"
                )}
              </Button>

              {connectionResult && (
                <div
                  className={`p-4 rounded-lg ${
                    connectionResult.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
                  }`}
                >
                  <div className="flex items-center mb-2">
                    {connectionResult.success ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                    )}
                    <h4 className={`font-semibold ${connectionResult.success ? "text-green-800" : "text-red-800"}`}>
                      {connectionResult.success ? "Connection Successful!" : "Connection Failed"}
                    </h4>
                  </div>

                  {connectionResult.success ? (
                    <div className="text-sm text-green-700 space-y-1">
                      <p>✅ Database connected successfully</p>
                      <p>📊 Total orders in database: {connectionResult.totalOrders}</p>
                      {connectionResult.sampleOrders?.length > 0 && (
                        <div className="mt-2">
                          <p className="font-medium">Recent orders:</p>
                          {connectionResult.sampleOrders.slice(0, 3).map((order: any, index: number) => (
                            <p key={index} className="text-xs">
                              • {order.order_id} - {order.customer_name} - ₹{order.total_amount}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-sm text-red-700">
                      <p>❌ Error: {connectionResult.error}</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Test Order */}
          <Card className="card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Test Order Creation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-text mb-2">Test Order Details:</h3>
                <ul className="text-sm text-text space-y-1">
                  <li>• Customer: Test Customer</li>
                  <li>• Product: Fresh Cow Milk 500ml</li>
                  <li>• Amount: ₹35</li>
                  <li>• Payment: Cash on Delivery</li>
                  <li>• Purpose: Database verification</li>
                </ul>
              </div>

              <Button onClick={addTestOrder} disabled={isAddingTestOrder} className="btn-primary w-full">
                {isAddingTestOrder ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adding Test Order...
                  </>
                ) : (
                  "Add Test Order"
                )}
              </Button>

              {testOrderResult && (
                <div
                  className={`p-4 rounded-lg ${
                    testOrderResult.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
                  }`}
                >
                  <div className="flex items-center mb-2">
                    {testOrderResult.success ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                    )}
                    <h4 className={`font-semibold ${testOrderResult.success ? "text-green-800" : "text-red-800"}`}>
                      {testOrderResult.success ? "Test Order Added!" : "Test Order Failed"}
                    </h4>
                  </div>

                  {testOrderResult.success ? (
                    <div className="text-sm text-green-700 space-y-1">
                      <p>📋 Order ID: {testOrderResult.testOrderId}</p>
                      <p>🆔 Supabase ID: {testOrderResult.supabaseId}</p>
                      <p className="mt-2 font-medium text-green-800">
                        ✅ Now check the admin dashboard to see this order!
                      </p>
                    </div>
                  ) : (
                    <div className="text-sm text-red-700">
                      <p>❌ Error: {testOrderResult.error}</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8 space-y-4">
          <p className="text-sm text-text opacity-70">
            After testing, check the admin dashboard to verify orders are being stored correctly.
          </p>
          <div className="space-x-4">
            <Button onClick={() => window.open("/admin", "_blank")} variant="outline">
              Open Admin Dashboard
            </Button>
            <Button onClick={() => (window.location.href = "/shop")} variant="outline">
              Go to Shop
            </Button>
            <Button onClick={() => window.open("/api/debug-supabase", "_blank")} variant="outline">
              Debug API
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
