// app/api/create-razorpay-order/route.ts
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://ugxqilcquusfwvkmlzwo.supabase.co'

// Supabase Server Client
const supabase = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_API_KEY!
);


export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const {
      orderId,
      customerDetails,
      orderDetails,
      totalAmount,
      paymentMethod,
      orderDate,
      status = "Pending",
      items,
    } = data;

    const { name, email, phone, address, city, pincode, specialInstructions = "" } =
      customerDetails || {};

    // Basic validation
    if (!totalAmount || totalAmount < 1 || !orderId) {
      return NextResponse.json(
        { error: "Invalid totalAmount or missing orderId" },
        { status: 400 }
      );
    }

    // Create Razorpay order (in paise)
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const razorpayOrder = await razorpay.orders.create({
      amount: totalAmount * 100, // in paise
      currency: "INR",
      receipt: `receipt_${orderId}`,
      notes: {
        created_by: "farmers_dairy_website",
        created_at: new Date().toISOString(),
      },
    });

    // Insert into Supabase
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
        orderDetails,
        totalAmount,
        paymentMethod,
        orderDate,
        status,
        items,
        razorpayOrderId: razorpayOrder.id,
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { success: false, error: "Database insert failed" },
        { status: 500 }
      );
    }

    // Success response
    return NextResponse.json({
      success: true,
      razorpayOrder: {
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        receipt: razorpayOrder.receipt,
      },
    });
  } catch (error) {
    console.error(" Razorpay + Supabase Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unexpected error",
      },
      { status: 500 }
    );
  }
}
