// Script to simulate a customer placing an order through the shop page
async function simulateShopOrder() {
  console.log("🛒 Simulating customer order from shop page...")

  // This simulates what happens when a customer:
  // 1. Adds items to cart from shop page
  // 2. Goes to checkout
  // 3. Fills out customer details
  // 4. Completes payment

  const customerOrder = {
    orderId: "FD" + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase(),
    customerDetails: {
      name: "Priya Sharma",
      email: "priya.sharma@gmail.com",
      phone: "9876543210",
      address: "45 MG Road, Near City Mall",
      city: "Hosur",
      pincode: "635109",
      specialInstructions: "Please deliver before 7 AM. Gate code: 1234",
    },
    orderDetails:
      "Fresh Cow Milk 500ml (Qty: 2, Price: ₹35) - Subscription: weekly - Delivery starts: Jan 18, 2025 to Jan 24, 2025 (7 days)",
    totalAmount: "70.00",
    paymentMethod: "Online Payment",
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
        holidays: [],
      },
    ],
  }

  try {
    console.log("📦 Placing order:", customerOrder.orderId)
    console.log("👤 Customer:", customerOrder.customerDetails.name)
    console.log("💰 Amount:", customerOrder.totalAmount)

    const response = await fetch("/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerOrder),
    })

    const result = await response.json()
    console.log("✅ Order placement result:", result)

    if (result.success) {
      console.log("🎉 Order placed successfully!")
      console.log("📋 Order ID:", result.orderId)

      // Verify the order was saved
      const fetchResponse = await fetch("/api/get-orders")
      const fetchResult = await fetchResponse.json()
      console.log("📊 Total orders in system:", fetchResult.orders?.length || 0)

      if (fetchResult.orders?.length > 0) {
        console.log("📋 Recent orders:")
        fetchResult.orders.slice(-3).forEach((order, index) => {
          console.log(`  ${index + 1}. ${order.orderId} - ${order.customerDetails?.name} - ₹${order.totalAmount}`)
        })
      }

      return {
        success: true,
        orderId: result.orderId,
        customerName: customerOrder.customerDetails.name,
        totalAmount: customerOrder.totalAmount,
      }
    } else {
      console.error("❌ Order placement failed:", result.error)
      return { success: false, error: result.error }
    }
  } catch (error) {
    console.error("❌ Error simulating shop order:", error)
    return { success: false, error: error.message }
  }
}

// Execute the simulation
simulateShopOrder().then((result) => {
  if (result.success) {
    console.log(`
🎉 SUCCESS! Order simulation completed!
📋 Order ID: ${result.orderId}
👤 Customer: ${result.customerName}
💰 Amount: ₹${result.totalAmount}

Now check the admin dashboard to see this order!
    `)
  } else {
    console.log(`❌ Order simulation failed: ${result.error}`)
  }
})
