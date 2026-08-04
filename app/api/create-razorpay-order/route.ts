import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = "INR" } = await request.json()

    console.log("Creating Razorpay order for amount:", amount)

    // Validate amount
    if (!amount || amount < 100) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid amount. Minimum amount is ₹1.00",
        },
        { status: 400 },
      )
    }

    // 🔄 Check if Razorpay credentials are available
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.warn("⚠️ Razorpay credentials not found, returning mock response")
      return NextResponse.json({
        success: true,
        order: {
          id: `order_mock_${Date.now()}`,
          amount: amount,
          currency: currency,
          receipt: `receipt_${Date.now()}`,
        },
        message: "Mock order created (Razorpay not configured)",
      })
    }

    // ✅ Initialize Razorpay here instead of module level
    const Razorpay = (await import("razorpay")).default
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    })

    const order = await razorpay.orders.create({
      amount: amount, // Amount in paise
      currency: currency,
      receipt: `receipt_${Date.now()}`,
      notes: {
        created_by: "farmers_dairy_website",
        created_at: new Date().toISOString(),
      },
    })

    console.log("✅ Razorpay order created successfully:", order.id)

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
      },
    })
  } catch (error) {
    console.error("❌ Error creating Razorpay order:", error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create order",
      },
      { status: 500 },
    )
  }
}
