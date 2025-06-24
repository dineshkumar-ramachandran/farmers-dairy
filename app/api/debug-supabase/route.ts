import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    console.log("🔍 Debug Supabase connection and data...")

    // Test basic connection
    const { data: testData, error: testError } = await supabase
      .from("orders")
      .select("count", { count: "exact", head: true })

    if (testError) {
      return NextResponse.json({
        success: false,
        error: `Connection failed: ${testError.message}`,
        connected: false,
      })
    }

    // Get recent orders
    const { data: orders, error: ordersError } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10)

    if (ordersError) {
      return NextResponse.json({
        success: false,
        error: `Orders fetch failed: ${ordersError.message}`,
        connected: true,
      })
    }

    // Get table info
    const { data: tableInfo, error: tableError } = await supabase
      .rpc("get_table_info", { table_name: "orders" })
      .single()

    return NextResponse.json({
      success: true,
      connected: true,
      debug: {
        totalOrders: testData?.length || 0,
        recentOrdersCount: orders?.length || 0,
        tableExists: !tableError,
        supabaseUrl: "https://ugxqilcquusfwvkmlzwo.supabase.co",
        timestamp: new Date().toISOString(),
      },
      recentOrders:
        orders?.map((order) => ({
          id: order.id,
          order_id: order.order_id,
          customer_name: order.customer_name,
          total_amount: order.total_amount,
          payment_method: order.payment_method,
          created_at: order.created_at,
        })) || [],
      message: "Supabase debug information retrieved successfully",
    })
  } catch (error) {
    console.error("❌ Error in Supabase debug:", error)
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
