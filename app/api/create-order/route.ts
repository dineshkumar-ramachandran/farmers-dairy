import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://ugxqilcquusfwvkmlzwo.supabase.co"

console.log(supabaseUrl, process.env.SUPABASE_SERVICE_API_KEY!)
// Supabase Server Client
const supabase = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()
    console.log("📦 Received order data:", orderData)

    const {
      orderId,
      customerDetails,
      orderDetails,
      totalAmount,
      paymentMethod,
      orderDate,
      status,
      items,
      razorpayPaymentId, // 🔄 Added this field
    } = orderData

    const { name, email, phone, address, city, pincode, specialInstructions = "" } = customerDetails || {}

    // 🔄 Enhanced validation
    if (!orderId || !name || !totalAmount || !items) {
      console.error("❌ Missing required fields:", { orderId, name, totalAmount, items: !!items })
      return NextResponse.json(
        { error: "Missing required fields: orderId, name, totalAmount, or items" },
        { status: 400 },
      )
    }

    // 🔄 Validate email format if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // 🔄 Validate phone format if provided
    if (phone && !/^\d{10}$/.test(phone)) {
      return NextResponse.json({ error: "Invalid phone number format (should be 10 digits)" }, { status: 400 })
    }

    console.log("💾 Inserting order into Supabase...")

    const { error } = await supabase.from("orders").insert([
      {
        orderId,
        name,
        email,
        phone,
        address,
        city,
        pincode,
        specialInstructions,
        orderDetails: typeof orderDetails === "object" ? JSON.stringify(orderDetails) : orderDetails,
        totalAmount: Number(totalAmount),
        paymentMethod,
        orderDate: orderDate ? new Date(orderDate).toISOString() : new Date().toISOString(),
        status: status || "Confirmed",
        items, // must be plain JS object or array (valid JSON)
        razorpayorderid: razorpayPaymentId || null, // 🔄 Map to correct column name
      },
    ])

    if (error) {
      console.error("❌ Supabase Insert Error:", error)
      return NextResponse.json({ error: `Failed to insert order: ${error.message}` }, { status: 500 })
    }

    console.log("✅ Order saved successfully:", orderId)

    return NextResponse.json({
      success: true,
      message: "Order saved successfully",
      orderId: orderId,
    })
  } catch (err) {
    console.error("❌ Unexpected Error:", err)
    return NextResponse.json(
      { error: `Internal Server Error: ${err instanceof Error ? err.message : "Unknown error"}` },
      { status: 500 },
    )
  }
}
