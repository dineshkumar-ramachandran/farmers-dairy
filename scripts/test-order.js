// Test script to place a dummy order
async function testOrderPlacement() {
  console.log("🧪 Testing order placement...")

  const testOrder = {
    orderId: "FD" + Date.now() + "TEST",
    customerDetails: {
      name: "John Doe",
      email: "john.doe@test.com",
      phone: "9876543210",
      address: "123 Test Street, Test Area",
      city: "Hosur",
      pincode: "635109",
      specialInstructions: "Test order - please handle with care",
    },
    orderDetails:
      "Fresh Cow Milk 500ml (Qty: 2, Price: ₹35) - Subscription: weekly - Delivery starts: Jan 18, 2025 to Jan 24, 2025 (7 days)",
    totalAmount: "70.00",
    paymentMethod: "Cash on Delivery",
    orderDate: new Date().toISOString(),
    status: "Confirmed",
    items: [
      {
        name: "Fresh Cow Milk 500ml",
        quantity: 2,
        price: 35,
        subscription: "weekly",
        deliveryDate: new Date().toISOString(),
        totalDays: 7,
      },
    ],
  }

  try {
    const response = await fetch("/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testOrder),
    })

    const result = await response.json()
    console.log("✅ Test order result:", result)

    if (result.success) {
      console.log("🎉 Test order placed successfully!")
      console.log("Order ID:", result.orderId)

      // Now test fetching orders
      const fetchResponse = await fetch("/api/get-orders")
      const fetchResult = await fetchResponse.json()
      console.log("📦 Orders after test:", fetchResult)

      return result.orderId
    } else {
      console.error("❌ Test order failed:", result.error)
    }
  } catch (error) {
    console.error("❌ Error placing test order:", error)
  }
}

// Run the test
testOrderPlacement()
