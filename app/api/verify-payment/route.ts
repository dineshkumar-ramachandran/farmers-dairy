import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const keySecret = process.env.RAZORPAY_KEY_SECRET

    if (!keySecret) {
      console.warn("⚠️ Razorpay key secret not found, returning mock verification")
      return NextResponse.json({
        success: true,
        message: "Mock payment verification (credentials not configured)",
      })
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json()

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      throw new Error("Missing payment verification parameters")
    }

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto.createHmac("sha256", keySecret).update(body.toString()).digest("hex")

    if (expectedSignature !== razorpay_signature) {
      throw new Error("Payment verification failed")
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
    })
  } catch (error) {
    console.error("Error verifying payment:", error)
    const errorMessage = error instanceof Error ? error.message : "Payment verification failed"

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 400 },
    )
  }
}
