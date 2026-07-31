"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { useCart } from "@/components/cart-context"
import { format, addDays } from "date-fns"
import Link from "next/link"

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart()

  const calculateEndDate = (startDate: Date, subscription: string, holidayCount = 0) => {
    let days = 0
    switch (subscription) {
      case "weekly":
        days = 7
        break
      case "monthly":
        days = 30
        break
      default:
        return startDate
    }
    return addDays(startDate, days - 1 + holidayCount)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ShoppingBag className="w-24 h-24 text-sage-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-earth-900 mb-4">Your Cart is Empty</h1>
            <p className="text-lg text-earth-600 mb-8">Add some fresh milk products to get started!</p>
            <Link href="/shop" className="btn-primary inline-flex items-center">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-earth-900 mb-4">Shopping Cart 🛒</h1>
          <p className="text-lg text-earth-600">Review your items and proceed to checkout</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <Card key={`${item.id}-${index}`} className="card border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-earth-900">{item.name}</h3>
                      {item.sampleSize && <p className="text-sm text-sage-600">Size: {item.sampleSize}</p>}
                      {/* Show subscription line only for milk products.
                          Ghee / paneer / butter / honey are inherently one-time
                          purchases, so no label needed. */}
                      {item.subscription === "sample" && item.codEligible ? (
                        <p className="text-sm text-sage-600">One-time sample</p>
                      ) : item.subscription !== "sample" ? (
                        <p className="text-sm text-sage-600 capitalize">
                          Subscription: {item.subscription}
                        </p>
                      ) : null}

                      {/* Date Information */}
                      {item.subscription === "custom" && item.dateRange?.from && item.dateRange?.to && (
                        <div className="mt-2 p-2 bg-sage-50 rounded-lg">
                          <p className="text-sm text-sage-700">
                            <strong>Date Range:</strong> {format(item.dateRange.from, "MMM dd, yyyy")} -{" "}
                            {format(item.dateRange.to, "MMM dd, yyyy")}
                          </p>
                          <p className="text-sm text-sage-700">
                            <strong>Days selected:</strong> {item.totalDays} days
                          </p>
                        </div>
                      )}

                      {item.subscription === "weekly" && item.deliveryDate && (
                        <div className="mt-2 p-2 bg-sage-50 rounded-lg">
                          <p className="text-sm text-sage-700">
                            <strong>Selected week:</strong> {format(item.deliveryDate, "MMM dd, yyyy")} -{" "}
                            {format(
                              calculateEndDate(item.deliveryDate, "weekly", item.holidays?.length || 0),
                              "MMM dd, yyyy",
                            )}
                          </p>
                          <p className="text-sm text-sage-700">
                            <strong>7 days selected</strong>
                          </p>
                        </div>
                      )}

                      {item.subscription === "monthly" && item.deliveryDate && (
                        <div className="mt-2 p-2 bg-sage-50 rounded-lg">
                          <p className="text-sm text-sage-700">
                            <strong>Selected month:</strong> {format(item.deliveryDate, "MMM dd, yyyy")} -{" "}
                            {format(
                              calculateEndDate(item.deliveryDate, "monthly", item.holidays?.length || 0),
                              "MMM dd, yyyy",
                            )}
                          </p>
                          <p className="text-sm text-sage-700">
                            <strong>30 days selected</strong>
                          </p>
                        </div>
                      )}

                      {/* Holiday Information */}
                      {item.holidays && item.holidays.length > 0 && (
                        <div className="mt-2 p-2 bg-red-50 rounded-lg border border-red-200">
                          <p className="text-sm text-red-700">
                            <strong>Holidays:</strong> {item.holidays.map((h) => format(h, "MMM dd")).join(", ")}
                          </p>
                          <p className="text-xs text-red-600">
                            Your subscription will be extended by {item.holidays.length} day(s) and will end on{" "}
                            {item.adjustedEndDate && format(item.adjustedEndDate, "MMM dd, yyyy")}
                          </p>
                        </div>
                      )}

                      <p className="text-lg font-bold text-btngreen mt-2">
                        ₹{item.totalPrice ? item.totalPrice : item.price}
                        {item.totalDays && item.totalDays > 1 && (
                          <span className="text-sm text-sage-600 ml-2">
                            (₹{item.price} × {item.totalDays} days)
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="flex items-center space-x-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 p-0 rounded-full"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="text-lg font-medium w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 p-0 rounded-full"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="card border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-earth-900">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-earth-600">Subtotal:</span>
                  <span className="font-semibold">₹{getTotalPrice().toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-earth-600">Delivery:</span>
                  <span className="font-semibold text-btngreen">Free</span>
                </div>

                <div className="pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-earth-900">Total:</span>
                    <span className="text-lg font-bold text-btngreen">₹{getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <Link href="/checkout" className="btn-primary w-full block text-center">
                    Proceed to Checkout
                  </Link>
                  <Link href="/shop" className="btn-secondary w-full block text-center">
                    Continue Shopping
                  </Link>
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Clear Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
