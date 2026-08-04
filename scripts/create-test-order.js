// Test script to create a sample order
async function createTestOrder() {
  try {
    console.log("🧪 Creating test order via API...")

    const response = await fetch("/api/test-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const result = await response.json()

    if (result.success) {
      console.log("✅ Test order created successfully!")
      console.log("Order ID:", result.orderId)
      console.log("Supabase ID:", result.supabaseId)
    } else {
      console.error("❌ Failed to create test order:", result.error)
    }

    return result
  } catch (error) {
    console.error("❌ Error creating test order:", error)
    return { success: false, error: error.message }
  }
}

// Run the test
createTestOrder()
