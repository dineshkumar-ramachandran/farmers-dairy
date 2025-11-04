// Test Supabase connection and add a sample order
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://ddcungvetvmbikwfvytq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkY3VuZ3ZldHZtYmlrd2Z2eXRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyMjM3NzMsImV4cCI6MjA3Nzc5OTc3M30.LM4_tt01RWYrO42uq37QY2wvn4oFBUuFXJ7RkfJulvM";

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log("🔍 Testing Supabase connection...");

    // Test connection
    const { data, error } = await supabase
      .from("orders")
      .select("count", { count: "exact", head: true });

    if (error) {
      console.error("❌ Connection failed:", error.message);
      return;
    }

    console.log("✅ Connection successful!");
    console.log("📊 Current orders count:", data);

    // Add a test order
    const testOrder = {
      order_id: "TEST_" + Date.now(),
      customer_name: "Test Customer",
      customer_email: "test@example.com",
      customer_phone: "9876543210",
      customer_address: "123 Test Street, Test Area",
      customer_city: "Test City",
      customer_pincode: "123456",
      special_instructions: "Test order from script",
      order_details: "Sample Milk 500ml - One-time sample",
      total_amount: 25.0,
      payment_method: "Cash on Delivery",
      order_date: new Date().toISOString(),
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
    };

    console.log("📦 Adding test order...");
    const { data: insertData, error: insertError } = await supabase
      .from("orders")
      .insert([testOrder])
      .select();

    if (insertError) {
      console.error("❌ Failed to add test order:", insertError.message);
      return;
    }

    console.log("✅ Test order added successfully!");
    console.log("🆔 Order ID:", insertData[0].id);

    // Fetch all orders
    console.log("📋 Fetching all orders...");
    const { data: allOrders, error: fetchError } = await supabase
      .from("orders")
      .select("*")
      .order("order_date", { ascending: false });

    if (fetchError) {
      console.error("❌ Failed to fetch orders:", fetchError.message);
      return;
    }

    console.log(`📊 Total orders in database: ${allOrders.length}`);
    allOrders.forEach((order, index) => {
      console.log(
        `  ${index + 1}. ${order.order_id} - ${order.customer_name} - ₹${order.total_amount}`
      );
    });
  } catch (error) {
    console.error("❌ Script error:", error.message);
  }
}

testConnection();
