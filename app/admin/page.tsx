"use client";
import { supabase } from "@/lib/supabase";
import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  EyeOff,
  Package,
  User,
  Calendar,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  FileText,
} from "lucide-react";
import { format } from "date-fns";

interface Order {
  id: string;
  orderId: string;
  customerDetails: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
    specialInstructions?: string;
  };
  orderDetails: string;
  totalAmount: string;
  paymentMethod: string;
  orderDate: string;
  status: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    subscription: string;
    sampleSize?: string;
    deliveryDate?: string;
    dateRange?: any;
    totalDays?: number;
    holidays?: any[];
  }>;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (password === "milkman@123") {
      setIsAuthenticated(true);
      setError("");
      fetchOrders();
    } else {
      setError("Invalid password");
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("orders").select("*"); // 👈 No .order()

      if (error) {
        console.error("Error fetching orders:", error.message);
        setOrders([]);
      } else {
        const parsed = (data || []).map((order) => ({
          ...order,
          customerDetails: {
            name: order.name,
            email: order.email,
            phone: order.phone,
            address: order.address,
            city: order.city,
            pincode: order.pincode,
            specialInstructions: order.specialInstructions,
          },
          items:
            typeof order.items === "string"
              ? JSON.parse(order.items)
              : order.items,
        }));
        console.log("✅ Parsed Orders:", parsed);
        setOrders(parsed);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Admin Login
            </CardTitle>
            <p className="text-gray-600">
              Enter password to access admin dashboard
            </p>
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
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button
              onClick={handleLogin}
              className="w-full bg-green hover:bg-green/90">
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Package className="w-8 h-8 text-green" />
              <h1 className="text-2xl font-bold text-gray-900">
                Farmer's Dairy Admin
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green/10 text-green">
                {orders.length} Orders
              </Badge>
              <Button
                onClick={() => {
                  setIsAuthenticated(false);
                  setPassword("");
                  setOrders([]);
                  setSelectedOrder(null);
                }}
                variant="outline"
                size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="w-8 h-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Orders
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {orders.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CreditCard className="w-8 h-8 text-green" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Revenue
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹
                    {orders
                      .reduce(
                        (sum, order) =>
                          sum + Number.parseFloat(order.totalAmount || "0"),
                        0
                      )
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
                  <p className="text-sm font-medium text-gray-600">
                    Unique Customers
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      new Set(
                        orders
                          .map((order) => order.customerDetails?.email)
                          .filter(Boolean)
                      ).size
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-orange-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Today's Orders
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      orders.filter((order) => {
                        if (!order.orderDate) return false;
                        const orderDate = new Date(order.orderDate);
                        const today = new Date();
                        return (
                          orderDate.toDateString() === today.toDateString()
                        );
                      }).length
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Orders List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Button onClick={fetchOrders} size="sm" disabled={loading}>
                  {loading ? "Loading..." : "Refresh"}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {orders.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                      No orders found
                    </p>
                  ) : (
                    orders
                      .sort(
                        (a, b) =>
                          new Date(b.orderDate || 0).getTime() -
                          new Date(a.orderDate || 0).getTime()
                      )
                      .map((order) => (
                        <div
                          key={order.orderId || order.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                            selectedOrder?.orderId === order.orderId
                              ? "border-green bg-green/5"
                              : "border-gray-200"
                          }`}
                          onClick={() => setSelectedOrder(order)}>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                            <div>
                              <p className="font-semibold text-gray-900">
                                #{order.orderId || order.id}
                              </p>
                              <p className="text-sm text-gray-600">
                                {order.customerDetails?.name || "Unknown"}
                              </p>
                              <p className="text-xs text-gray-500">
                                {order.orderDate
                                  ? format(
                                      new Date(order.orderDate),
                                      "MMM dd, yyyy HH:mm"
                                    )
                                  : "No date"}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-green">
                                ₹{order.totalAmount || "0"}
                              </p>
                              <Badge
                                variant={
                                  order.paymentMethod === "Cash on Delivery"
                                    ? "secondary"
                                    : "default"
                                }
                                className="text-xs">
                                {order.paymentMethod || "Unknown"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))
                  )}
                </div>
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
                          <span className="font-medium">Order ID:</span>{" "}
                          {selectedOrder.orderId}
                        </p>
                        <p>
                          <span className="font-medium">Date:</span>{" "}
                          {selectedOrder.orderDate
                            ? format(
                                new Date(selectedOrder.orderDate),
                                "MMM dd, yyyy HH:mm"
                              )
                            : "No date"}
                        </p>
                        <p>
                          <span className="font-medium">Status:</span>{" "}
                          <Badge variant="default">
                            {selectedOrder.status || "Pending"}
                          </Badge>
                        </p>
                        <p>
                          <span className="font-medium">Payment:</span>{" "}
                          {selectedOrder.paymentMethod || "Unknown"}
                        </p>
                        <p>
                          <span className="font-medium">Total:</span>{" "}
                          <span className="font-bold text-green">
                            ₹{selectedOrder.totalAmount || "0"}
                          </span>
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
                              {selectedOrder.customerDetails.address ||
                                "Unknown"}
                              ,{" "}
                              {selectedOrder.customerDetails.city || "Unknown"}{" "}
                              -{" "}
                              {selectedOrder.customerDetails.pincode ||
                                "Unknown"}
                            </span>
                          </p>
                          {selectedOrder.customerDetails
                            .specialInstructions && (
                            <p className="flex items-start">
                              <FileText className="w-3 h-3 mr-2 mt-0.5" />
                              <span className="italic">
                                {
                                  selectedOrder.customerDetails
                                    .specialInstructions
                                }
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Items */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Order Items
                      </h3>
                      <div className="space-y-3">
                        {selectedOrder.items &&
                        selectedOrder.items.length > 0 ? (
                          selectedOrder.items.map((item, index) => (
                            <div
                              key={index}
                              className="p-3 bg-gray-50 rounded-lg">
                              <p className="font-medium">{item.name}</p>
                              <div className="text-sm text-gray-600 space-y-1">
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: ₹{item.price}</p>
                                {item.sampleSize && (
                                  <p>Size: {item.sampleSize}</p>
                                )}
                                <p className="capitalize">
                                  Type: {item.subscription}
                                </p>
                                {item.totalDays && (
                                  <p>Duration: {item.totalDays} days</p>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 text-sm">
                            No items found
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    Select an order to view details
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
