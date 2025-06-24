import { NextResponse } from "next/server"
import { addTestOrder, getAllOrders } from "@/lib/orders-store"

export async function POST() {
  try {
    console.log("🧪 Adding test order...")

    const testOrderId = addTestOrder()
    const allOrders = getAllOrders()

    console.log(`✅ Test order added: ${testOrderId}`)
    console.log(`📊 Total orders now: ${allOrders.length}`)

    return NextResponse.json({
      success: true,
      testOrderId,
      totalOrders: allOrders.length,
      message: "Test order added successfully",
      orders: allOrders.map((o) => ({
        id: o.orderId,
        customer: o.customerDetails?.name,
        amount: o.totalAmount,
      })),
    })
  } catch (error) {
    console.error("❌ Error adding test order:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to add test order",
      },
      { status: 500 },
    )
  }
}
