import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    console.log("🧪 Testing Supabase connection...")

    // Test connection by fetching orders
    const { data: orders, error, count } = await supabase.from("orders").select("*", { count: "exact" }).limit(5)

    if (error) {
      console.error("❌ Supabase connection error:", error)
      return NextResponse.json({
        success: false,
        error: error.message,
        connected: false,
      })
    }

    console.log("✅ Supabase connection successful")
    console.log(`📊 Found ${count} total orders`)

    return NextResponse.json({
      success: true,
      connected: true,
      totalOrders: count,
      sampleOrders:
        orders?.map((order) => ({
          id: order.id,
          order_id: order.order_id,
          customer_name: order.customer_name,
          total_amount: order.total_amount,
          created_at: order.created_at,
        })) || [],
      message: "Supabase connection successful",
    })
  } catch (error) {
    console.error("❌ Error testing Supabase:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        connected: false,
      },
      { status: 500 },
    )
  }
}

export async function POST() {
  try {
    console.log("🧪 Adding test order to Supabase...")

    const testOrder = {
      order_id: "FD" + Date.now() + "TEST",
      customer_name: "Test Customer",
      customer_email: "test@farmersdairy.com",
      customer_phone: "9876543210",
      customer_address: "123 Test Street, Test Area",
      customer_city: "Hosur",
      customer_pincode: "635109",
      special_instructions: "Test order for Supabase verification",
      order_details: "Fresh Cow Milk 500ml (Qty: 1, Price: ₹35) - Test order",
      total_amount: 35.0,
      payment_method: "Cash on Delivery",
      order_date: new Date().toISOString(),
      status: "Confirmed",
      items: [
        {
          name: "Fresh Cow Milk 500ml",
          quantity: 1,
          price: 35,
          subscription: "weekly",
          deliveryDate: new Date().toISOString(),
          totalDays: 7,
        },
      ],
    }

    const { data, error } = await supabase.from("orders").insert([testOrder]).select()

    if (error) {
      console.error("❌ Error adding test order:", error)
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 },
      )
    }

    console.log("✅ Test order added successfully:", data?.[0]?.id)

    return NextResponse.json({
      success: true,
      testOrderId: testOrder.order_id,
      supabaseId: data?.[0]?.id,
      message: "Test order added to Supabase successfully",
    })
  } catch (error) {
    console.error("❌ Error in test order:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
