import { type NextRequest, NextResponse } from "next/server"
import { addOrder } from "@/lib/orders-store"

export async function POST(request: NextRequest) {
  try {
    console.log("🛒 Simulating shop order placement...")

    // This simulates a real customer order from the shop page
    const customerOrder = {
      orderId: "FD" + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase(),
      customerDetails: {
        name: "Rajesh Kumar",
        email: "rajesh.kumar@gmail.com",
        phone: "9123456789",
        address: "78 Anna Salai, T Nagar",
        city: "Hosur",
        pincode: "635109",
        specialInstructions: "Please ring the bell twice. Flat 2B",
      },
      orderDetails:
        "Fresh Cow Milk 1000ml (Qty: 1, Price: ₹60) - Subscription: monthly - Delivery starts: Jan 18, 2025 to Feb 16, 2025 (30 days)",
      totalAmount: "60.00",
      paymentMethod: "Online Payment",
      orderDate: new Date().toISOString(),
      status: "Confirmed",
      items: [
        {
          name: "Fresh Cow Milk 1000ml",
          quantity: 1,
          price: 60,
          subscription: "monthly",
          deliveryDate: new Date().toISOString(),
          totalDays: 30,
          holidays: [],
        },
      ],
    }

    console.log("📦 Processing simulated order:", customerOrder.orderId)
    console.log("👤 Customer:", customerOrder.customerDetails.name)

    // Add to orders store (same as real checkout)
    addOrder(customerOrder)

    console.log("✅ Simulated order placed successfully")

    return NextResponse.json({
      success: true,
      orderId: customerOrder.orderId,
      customerName: customerOrder.customerDetails.name,
      totalAmount: customerOrder.totalAmount,
      message: "Shop order simulated successfully",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("❌ Error simulating shop order:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to simulate shop order",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Shop order simulation endpoint - POST to simulate an order",
    usage: "POST /api/simulate-shop-order",
  })
}
