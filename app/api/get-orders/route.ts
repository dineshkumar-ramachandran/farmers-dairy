import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ddcungvetvmbikwfvytq.supabase.co";

// 🔄 Use the same Supabase setup as your create-order route
const supabase = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_API_KEY!
);

export async function GET() {
  try {
    console.log("🔍 Fetching orders from Supabase...");

    // 🔄 Fetch orders from Supabase with proper ordering
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("orderDate", { ascending: false });

    if (error) {
      console.error("❌ Supabase error:", error);
      return NextResponse.json(
        {
          success: false,
          error: `Database error: ${error.message}`,
          orders: [],
        },
        { status: 500 }
      );
    }

    if (!data) {
      console.log("⚠️ No data returned from Supabase");
      return NextResponse.json({
        success: true,
        orders: [],
        total: 0,
        message: "No orders found",
      });
    }

    console.log(`✅ Fetched ${data.length} orders from Supabase`);

    // 🔄 Transform data to match your admin interface expectations
    const transformedOrders = data.map((order) => ({
      orderId: order.orderId,
      customerDetails: {
        name: order.name || "Unknown",
        email: order.email || "Unknown",
        phone: order.phone || "Unknown",
        address: order.address || "Unknown",
        city: order.city || "Unknown",
        pincode: order.pincode || "Unknown",
        specialInstructions: order.specialInstructions || "",
      },
      orderDetails: order.orderDetails || "Order placed successfully",
      totalAmount: order.totalAmount?.toString() || "0",
      paymentMethod: order.paymentMethod || "Unknown",
      orderDate: order.orderDate || new Date().toISOString(),
      status: order.status || "Pending",
      items: order.items || [],
      razorpayOrderId: order.razorpayorderid || null,
    }));

    return NextResponse.json({
      success: true,
      orders: transformedOrders,
      total: transformedOrders.length,
      message: `Found ${transformedOrders.length} orders`,
    });
  } catch (error) {
    console.error("❌ Get orders error:", error);
    return NextResponse.json(
      {
        success: false,
        error: `Connection error: ${error instanceof Error ? error.message : "Unknown error"}`,
        orders: [],
      },
      { status: 500 }
    );
  }
}
