"use client"
import { supabase } from "@/lib/supabase"
import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Eye,
  EyeOff,
  Package,
  User,
  CalendarIcon,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  FileText,
  RefreshCw,
  AlertCircle,
  Search,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react"
import { format, isWithinInterval } from "date-fns"
import * as XLSX from "xlsx"

interface Order {
  id: string
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

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [error, setError] = useState("")
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null)

  // 🔄 New state for pagination and filtering
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [showDatePicker, setShowDatePicker] = useState(false)

  const ordersPerPage = 10

  const handleLogin = () => {
    if (password === "milkman@123") {
      setIsAuthenticated(true)
      setError("")
      fetchOrders()
    } else {
      setError("Invalid password")
    }
  }

  // 🔄 Updated fetchOrders with better error handling
  const fetchOrders = async () => {
    setLoading(true)
    setError("")
    try {
      console.log("🔄 Fetching orders from Supabase...")

      const { data, error } = await supabase.from("orders").select("*").order("orderDate", { ascending: false }) // 🔄 Added proper ordering

      if (error) {
        console.error("❌ Supabase error:", error)
        setError(`Database error: ${error.message}`)
        setOrders([])
        setFilteredOrders([])
        return
      }

      if (!data) {
        console.log("⚠️ No data returned from Supabase")
        setOrders([])
        setFilteredOrders([])
        return
      }

      console.log(`✅ Fetched ${data.length} orders from Supabase`)

      const parsed = data.map((order) => ({
        ...order,
        customerDetails: {
          name: order.customer_name || order.name || "Unknown",
          email: order.customer_email || order.email || "Unknown",
          phone: order.customer_phone || order.phone || "Unknown",
          address: order.customer_address || order.address || "Unknown",
          city: order.customer_city || order.city || "Unknown",
          pincode: order.customer_pincode || order.pincode || "Unknown",
          specialInstructions: order.special_instructions || order.specialInstructions || "",
        },
        orderId: order.order_id || order.orderId || order.id,
        totalAmount: order.total_amount?.toString() || order.totalAmount || "0",
        paymentMethod: order.payment_method || order.paymentMethod || "Unknown",
        orderDate: order.order_date || order.orderDate || order.created_at,
        items: typeof order.items === "string" ? JSON.parse(order.items) : order.items || [],
      }))

      console.log("✅ Parsed orders:", parsed.length)
      setOrders(parsed)
      setFilteredOrders(parsed)
      setLastRefresh(new Date())
    } catch (error) {
      console.error("❌ Fetch orders error:", error)
      setError(`Connection error: ${error instanceof Error ? error.message : "Unknown error"}`)
      setOrders([])
      setFilteredOrders([])
    } finally {
      setLoading(false)
    }
  }

  // 🔄 Filter orders based on search and date range
  useEffect(() => {
    let filtered = [...orders]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerDetails?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerDetails?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerDetails?.phone?.includes(searchTerm),
      )
    }

    // Date range filter
    if (dateRange.from && dateRange.to) {
      filtered = filtered.filter((order) => {
        if (!order.orderDate) return false
        const orderDate = new Date(order.orderDate)
        return isWithinInterval(orderDate, {
          start: dateRange.from!,
          end: dateRange.to!,
        })
      })
    } else if (dateRange.from) {
      filtered = filtered.filter((order) => {
        if (!order.orderDate) return false
        const orderDate = new Date(order.orderDate)
        return orderDate.toDateString() === dateRange.from!.toDateString()
      })
    }

    setFilteredOrders(filtered)
    setCurrentPage(1) // Reset to first page when filtering
  }, [orders, searchTerm, dateRange])

  // 🔄 Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)
  const startIndex = (currentPage - 1) * ordersPerPage
  const endIndex = startIndex + ordersPerPage
  const currentOrders = filteredOrders.slice(startIndex, endIndex)

  // 🔄 Excel export function
  const exportToExcel = () => {
    const exportData = filteredOrders.map((order) => ({
      "Order ID": order.orderId,
      Date: order.orderDate ? format(new Date(order.orderDate), "yyyy-MM-dd HH:mm") : "",
      "Customer Name": order.customerDetails?.name || "",
      Email: order.customerDetails?.email || "",
      Phone: order.customerDetails?.phone || "",
      Address: `${order.customerDetails?.address || ""}, ${order.customerDetails?.city || ""} - ${order.customerDetails?.pincode || ""}`,
      "Total Amount": `₹${order.totalAmount || "0"}`,
      "Payment Method": order.paymentMethod || "",
      Status: order.status || "Pending",
      Items: order.items?.map((item) => `${item.name} (${item.quantity}x)`).join(", ") || "",
      "Special Instructions": order.customerDetails?.specialInstructions || "",
    }))

    const ws = XLSX.utils.json_to_sheet(exportData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Orders")

    const fileName = `orders_${dateRange.from ? format(dateRange.from, "yyyy-MM-dd") : "all"}_${dateRange.to ? format(dateRange.to, "yyyy-MM-dd") : "latest"}.xlsx`
    XLSX.writeFile(wb, fileName)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin()
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders()
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">Admin Login</CardTitle>
            <p className="text-gray-600">Enter password to access admin dashboard</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button onClick={handleLogin} className="w-full bg-green hover:bg-green/90">
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Package className="w-8 h-8 text-green" />
              <h1 className="text-2xl font-bold text-gray-900">Farmer's Dairy Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green/10 text-green">
                {filteredOrders.length} Orders
              </Badge>
              {lastRefresh && (
                <span className="text-xs text-gray-500">Last updated: {format(lastRefresh, "HH:mm:ss")}</span>
              )}
              <Button
                onClick={() => {
                  setIsAuthenticated(false)
                  setPassword("")
                  setOrders([])
                  setFilteredOrders([])
                  setSelectedOrder(null)
                }}
                variant="outline"
                size="sm"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Display */}
        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 text-red-800">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">Error: {error}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="w-8 h-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{filteredOrders.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CreditCard className="w-8 h-8 text-green" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹
                    {filteredOrders
                      .reduce((sum, order) => sum + Number.parseFloat(order.totalAmount || "0"), 0)
                      .toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <User className="w-8 h-8 text-purple-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Unique Customers</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {new Set(filteredOrders.map((order) => order.customerDetails?.email).filter(Boolean)).size}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CalendarIcon className="w-8 h-8 text-orange-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Today's Orders</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      filteredOrders.filter((order) => {
                        if (!order.orderDate) return false
                        const orderDate = new Date(order.orderDate)
                        const today = new Date()
                        return orderDate.toDateString() === today.toDateString()
                      }).length
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 🔄 Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search by Order ID, Name, Email, or Phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Popover open={showDatePicker} onOpenChange={setShowDatePicker}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange.from}
                      selected={{ from: dateRange.from, to: dateRange.to }}
                      onSelect={(range) => {
                        setDateRange({ from: range?.from, to: range?.to })
                      }}
                      numberOfMonths={2}
                      disabled={(date) => date > new Date()}
                    />
                    <div className="p-3 border-t">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setDateRange({ from: undefined, to: undefined })
                          setShowDatePicker(false)
                        }}
                        className="w-full"
                      >
                        Clear Filter
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>

                <Button onClick={exportToExcel} variant="outline" size="sm" disabled={filteredOrders.length === 0}>
                  <Download className="w-4 h-4 mr-2" />
                  Export Excel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Orders List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                  Orders {filteredOrders.length !== orders.length && `(${filteredOrders.length} filtered)`}
                </CardTitle>
                <Button onClick={fetchOrders} size="sm" disabled={loading}>
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                  {loading ? "Loading..." : "Refresh"}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentOrders.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                      {filteredOrders.length === 0 ? "No orders found" : "No orders on this page"}
                    </p>
                  ) : (
                    currentOrders.map((order) => (
                      <div
                        key={order.orderId || order.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                          selectedOrder?.orderId === order.orderId ? "border-green bg-green/5" : "border-gray-200"
                        }`}
                        onClick={() => setSelectedOrder(order)}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                          <div>
                            <p className="font-semibold text-gray-900">#{order.orderId || order.id}</p>
                            <p className="text-sm text-gray-600">{order.customerDetails?.name || "Unknown"}</p>
                            <p className="text-xs text-gray-500">
                              {order.orderDate ? format(new Date(order.orderDate), "MMM dd, yyyy HH:mm") : "No date"}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green">₹{order.totalAmount || "0"}</p>
                            <Badge
                              variant={order.paymentMethod === "Cash on Delivery" ? "secondary" : "default"}
                              className="text-xs"
                            >
                              {order.paymentMethod || "Unknown"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* 🔄 Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6 pt-4 border-t">
                    <div className="text-sm text-gray-600">
                      Showing {startIndex + 1} to {Math.min(endIndex, filteredOrders.length)} of {filteredOrders.length}{" "}
                      orders
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </Button>

                      <div className="flex items-center space-x-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          const pageNum = i + 1
                          return (
                            <Button
                              key={pageNum}
                              variant={currentPage === pageNum ? "default" : "outline"}
                              size="sm"
                              onClick={() => setCurrentPage(pageNum)}
                              className="w-8 h-8 p-0"
                            >
                              {pageNum}
                            </Button>
                          )
                        })}
                        {totalPages > 5 && (
                          <>
                            <span className="text-gray-400">...</span>
                            <Button
                              variant={currentPage === totalPages ? "default" : "outline"}
                              size="sm"
                              onClick={() => setCurrentPage(totalPages)}
                              className="w-8 h-8 p-0"
                            >
                              {totalPages}
                            </Button>
                          </>
                        )}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Details */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedOrder ? (
                  <div className="space-y-6">
                    {/* Order Info */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Package className="w-4 h-4 mr-2" />
                        Order Information
                      </h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Order ID:</span> {selectedOrder.orderId}
                        </p>
                        <p>
                          <span className="font-medium">Date:</span>{" "}
                          {selectedOrder.orderDate
                            ? format(new Date(selectedOrder.orderDate), "MMM dd, yyyy HH:mm")
                            : "No date"}
                        </p>
                        <p>
                          <span className="font-medium">Status:</span>{" "}
                          <Badge variant="default">{selectedOrder.status || "Pending"}</Badge>
                        </p>
                        <p>
                          <span className="font-medium">Payment:</span> {selectedOrder.paymentMethod || "Unknown"}
                        </p>
                        <p>
                          <span className="font-medium">Total:</span>{" "}
                          <span className="font-bold text-green">₹{selectedOrder.totalAmount || "0"}</span>
                        </p>
                      </div>
                    </div>

                    {/* Customer Info */}
                    {selectedOrder.customerDetails && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          Customer Details
                        </h3>
                        <div className="space-y-2 text-sm">
                          <p className="flex items-center">
                            <User className="w-3 h-3 mr-2" />
                            {selectedOrder.customerDetails.name || "Unknown"}
                          </p>
                          <p className="flex items-center">
                            <Phone className="w-3 h-3 mr-2" />
                            {selectedOrder.customerDetails.phone || "Unknown"}
                          </p>
                          <p className="flex items-center">
                            <Mail className="w-3 h-3 mr-2" />
                            {selectedOrder.customerDetails.email || "Unknown"}
                          </p>
                          <p className="flex items-start">
                            <MapPin className="w-3 h-3 mr-2 mt-0.5" />
                            <span>
                              {selectedOrder.customerDetails.address || "Unknown"},{" "}
                              {selectedOrder.customerDetails.city || "Unknown"} -{" "}
                              {selectedOrder.customerDetails.pincode || "Unknown"}
                            </span>
                          </p>
                          {selectedOrder.customerDetails.specialInstructions && (
                            <p className="flex items-start">
                              <FileText className="w-3 h-3 mr-2 mt-0.5" />
                              <span className="italic">{selectedOrder.customerDetails.specialInstructions}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Items */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
                      <div className="space-y-3">
                        {selectedOrder.items && selectedOrder.items.length > 0 ? (
                          selectedOrder.items.map((item, index) => (
                            <div key={index} className="p-3 bg-gray-50 rounded-lg">
                              <p className="font-medium">{item.name}</p>
                              <div className="text-sm text-gray-600 space-y-1">
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: ₹{item.price}</p>
                                {/* 🔄 Fixed: Show Size instead of Type for samples */}
                                {item.sampleSize && <p>Size: {item.sampleSize}</p>}
                                {item.subscription !== "sample" && (
                                  <p className="capitalize">Type: {item.subscription}</p>
                                )}
                                {/* 🔄 Fixed: Only show duration for non-sample orders */}
                                {item.totalDays && item.subscription !== "sample" && (
                                  <p>Duration: {item.totalDays} days</p>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 text-sm">No items found</p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">Select an order to view details</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
