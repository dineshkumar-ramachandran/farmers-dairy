import { NextResponse } from "next/server"
import { getAllOrders, debugStore, addTestOrder } from "@/lib/orders-store"

export async function GET() {
  try {
    console.log("🔍 Debug store endpoint called")

    debugStore()

    const orders = getAllOrders()

    return NextResponse.json({
      success: true,
      debug: {
        globalAvailable: typeof global !== "undefined",
        globalStoreExists: typeof global !== "undefined" && !!global.farmersDairyOrdersStore,
        globalStoreLength:
          typeof global !== "undefined" && global.farmersDairyOrdersStore
            ? global.farmersDairyOrdersStore.orders.length
            : 0,
        ordersLength: orders.length,
        timestamp: new Date().toISOString(),
      },
      orders: orders.map((o) => ({
        orderId: o.orderId,
        customerName: o.customerDetails?.name,
        totalAmount: o.totalAmount,
        orderDate: o.orderDate,
      })),
      message: "Store debug information",
    })
  } catch (error) {
    console.error("❌ Error in debug store:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Debug failed",
      },
      { status: 500 },
    )
  }
}

export async function POST() {
  try {
    console.log("🧪 Adding test order via debug endpoint")

    const testOrderId = addTestOrder()
    debugStore()

    const orders = getAllOrders()

    return NextResponse.json({
      success: true,
      testOrderId,
      totalOrders: orders.length,
      message: "Test order added via debug endpoint",
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
