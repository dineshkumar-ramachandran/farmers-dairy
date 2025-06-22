import { type NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = "INR" } = await request.json();

    console.log("Creating Razorpay order for amount:", amount);

    // Validate amount
    if (!amount || amount < 100) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid amount. Minimum amount is ₹1.00",
        },
        { status: 400 }
      );
    }

    // ✅ Initialize Razorpay here instead of module level
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const order = await razorpay.orders.create({
      amount: amount, // Amount in paise
      currency: currency,
      receipt: `receipt_${Date.now()}`,
      notes: {
        created_by: "farmers_dairy_website",
        created_at: new Date().toISOString(),
      },
    });
    console.log("KEY_ID:", process.env.RAZORPAY_KEY_ID);
    console.log("KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET);

    console.log("Razorpay order created successfully:", order.id);

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
      },
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to create order",
      },
      { status: 500 }
    );
  }
}