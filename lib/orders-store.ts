// Simplified orders store compatible with all environments
interface Order {
  orderId: string
  customerDetails: {
    name: string
    email: string
    phone: string
    address: string
    city: string
    pincode: string
    specialInstructions?: string
  }
  orderDetails: string
  totalAmount: string
  paymentMethod: string
  orderDate: string
  status: string
  items: Array<{
    name: string
    quantity: number
    price: number
    subscription: string
    sampleSize?: string
    deliveryDate?: string
    dateRange?: any
    totalDays?: number
    holidays?: any[]
  }>
}

// Enhanced global store with better persistence
declare global {
  var farmersDairyOrdersStore:
    | {
        orders: Order[]
        initialized: boolean
        lastUpdate: number
      }
    | undefined
}

// Initialize global store
function initGlobalStore() {
  if (typeof global !== "undefined") {
    if (!global.farmersDairyOrdersStore) {
      global.farmersDairyOrdersStore = {
        orders: [],
        initialized: true,
        lastUpdate: Date.now(),
      }
      console.log("🆕 Initialized new enhanced global store")
    }
    return global.farmersDairyOrdersStore
  }
  return null
}

// Module-level fallback store
const moduleStore = {
  orders: [] as Order[],
  initialized: false,
  lastUpdate: 0,
}

// Get store instance
function getStore() {
  const globalStore = initGlobalStore()
  if (globalStore) {
    return globalStore
  }

  // Fallback to module-level store
  if (!moduleStore.initialized) {
    moduleStore.initialized = true
    moduleStore.lastUpdate = Date.now()
    console.log("🔄 Using module-level store fallback")
  }
  return moduleStore
}

export function addOrder(order: Order): void {
  try {
    console.log(`🚀 Adding order: ${order.orderId} for ${order.customerDetails?.name}`)

    const store = getStore()

    // Check for duplicates
    const existingIndex = store.orders.findIndex((o) => o.orderId === order.orderId)

    if (existingIndex >= 0) {
      console.log(`🔄 Updating existing order: ${order.orderId}`)
      store.orders[existingIndex] = order
    } else {
      console.log(`➕ Adding new order: ${order.orderId}`)
      store.orders.push(order)
    }

    store.lastUpdate = Date.now()

    console.log(`✅ Order added successfully. Total orders: ${store.orders.length}`)

    if (store.orders.length > 0) {
      console.log(`📋 Recent orders:`)
      store.orders.slice(-3).forEach((o, i) => {
        console.log(`  ${i + 1}. ${o.orderId} - ${o.customerDetails?.name} - ₹${o.totalAmount}`)
      })
    }
  } catch (error) {
    console.error("❌ Error adding order:", error)
    throw error
  }
}

export function getAllOrders(): Order[] {
  try {
    const store = getStore()
    console.log(`📋 Fetching ${store.orders.length} orders`)

    if (store.orders.length > 0) {
      console.log(`📋 Orders in store:`)
      store.orders.slice(-5).forEach((o, i) => {
        console.log(`  ${i + 1}. ${o.orderId} - ${o.customerDetails?.name} - ₹${o.totalAmount}`)
      })
    }

    return [...store.orders]
  } catch (error) {
    console.error("❌ Error getting orders:", error)
    return []
  }
}

export function getOrdersCount(): number {
  try {
    const store = getStore()
    console.log(`📊 Total orders count: ${store.orders.length}`)
    return store.orders.length
  } catch (error) {
    console.error("❌ Error getting orders count:", error)
    return 0
  }
}

export function clearAllOrders(): void {
  try {
    const store = getStore()
    store.orders = []
    store.lastUpdate = Date.now()
    console.log("🗑️ All orders cleared")
  } catch (error) {
    console.error("❌ Error clearing orders:", error)
  }
}

// Debug function to check store status
export function debugStore(): void {
  const store = getStore()
  console.log("🔍 Store Debug Info:")
  console.log(`  Store initialized: ${store.initialized}`)
  console.log(`  Last update: ${new Date(store.lastUpdate).toISOString()}`)
  console.log(`  Orders count: ${store.orders.length}`)
  console.log(`  Global available: ${typeof global !== "undefined"}`)
  console.log(`  Using global store: ${typeof global !== "undefined" && !!global.farmersDairyOrdersStore}`)

  if (store.orders.length > 0) {
    console.log(`  Recent orders:`)
    store.orders.slice(-3).forEach((o, i) => {
      console.log(`    ${i + 1}. ${o.orderId} - ${o.customerDetails?.name}`)
    })
  }
}

// Add a test order function
export function addTestOrder(): string {
  const testOrderId = "FD" + Date.now() + "TEST"
  const testOrder: Order = {
    orderId: testOrderId,
    customerDetails: {
      name: "Test Customer " + new Date().getTime(),
      email: "test@farmersdairy.com",
      phone: "9876543210",
      address: "123 Test Street",
      city: "Hosur",
      pincode: "635109",
      specialInstructions: "Test order for debugging",
    },
    orderDetails: "Fresh Cow Milk 500ml (Qty: 1, Price: ₹35) - Test order",
    totalAmount: "35.00",
    paymentMethod: "Cash on Delivery",
    orderDate: new Date().toISOString(),
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

  addOrder(testOrder)
  return testOrderId
}
