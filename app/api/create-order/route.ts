import Razorpay from "razorpay";
import { type NextRequest, NextResponse } from "next/server";

const orders: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();

    // Validate data
    const { amount, name, email, phone, address } = orderData;
    if (!amount || typeof amount !== "number") {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    // ✅ Initialize Razorpay only inside the handler
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    // Create Razorpay order
    const paymentOrder = await razorpay.orders.create({
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    // Create internal order
    const orderWithMetadata = {
      ...orderData,
      id: Date.now().toString(),
      razorpayOrderId: paymentOrder.id,
      createdAt: new Date().toISOString(),
    };

    orders.push(orderWithMetadata);

    return NextResponse.json({
      success: true,
      internalOrderId: orderWithMetadata.id,
      razorpayOrder: paymentOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create order" },
      { status: 500 }
    );
  }
}
