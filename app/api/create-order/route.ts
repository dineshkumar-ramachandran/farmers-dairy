import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";


const supabaseUrl = 'https://ugxqilcquusfwvkmlzwo.supabase.co'

// Supabase Server Client
const supabase = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_API_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();

    const {
      orderId,
      customerDetails,
      orderDetails,
      totalAmount,
      paymentMethod,
      orderDate,
      status,
      items,
    } = orderData;

    const {
      name,
      email,
      phone,
      address,
      city,
      pincode,
      specialInstructions = "",
    } = customerDetails || {};

    if (!orderId || !name || !totalAmount || !items) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

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
      },
    ]);

    if (error) {
      console.error("Supabase Insert Error:", error);
      return NextResponse.json(
        { error: "Failed to insert order" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Order saved" });
  } catch (err) {
    console.error("Unexpected Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
