import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase-client"

export async function POST() {
  try {
    console.log("🧪 Creating test order...")

    const testOrderId = `FD_TEST_${Date.now()}`

    const testOrder = {
      order_id: testOrderId,
      customer_name: "Test Customer",
      customer_email: "test@farmersdairy.com",
      customer_phone: "9876543210",
      customer_address: "123 Test Street, Test Area",
      customer_city: "Test City",
      customer_pincode: "123456",
      special_instructions: "Test order for verification",
      order_details: "Sample Milk 500ml - Cash on Delivery",
      total_amount: 25.0,
      payment_method: "Cash on Delivery",
      status: "Confirmed",
      items: [
        {
          name: "Sample Milk 500ml",
          quantity: 1,
          price: 25,
          subscription: "sample",
          sampleSize: "500ml",
        },
      ],
    }

    const { data, error } = await supabase.from("orders").insert([testOrder]).select()

    if (error) {
      throw new Error(`Database error: ${error.message}`)
    }

    console.log("✅ Test order created:", testOrderId)

    return NextResponse.json({
      success: true,
      orderId: testOrderId,
      supabaseId: data?.[0]?.id,
      message: "Test order created successfully",
    })
  } catch (error) {
    console.error("❌ Test order error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create test order",
      },
      { status: 500 },
    )
  }
}
