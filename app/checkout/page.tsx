"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/components/cart-context";
import { format, addDays } from "date-fns";
import { CreditCard, Building, CheckCircle, AlertCircle } from "lucide-react";
import { SuccessPopup } from "@/components/success-popup";
import { useRouter } from "next/navigation";

// Razorpay integration
declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    specialInstructions: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  // Ensure client-side rendering to avoid hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };

    switch (name) {
      case "name":
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          newErrors.name = "Name should contain only letters and spaces";
        } else {
          delete newErrors.name;
        }
        break;
      case "phone":
        if (!/^\d{10}$/.test(value)) {
          newErrors.phone = "Phone number should be exactly 10 digits";
        } else {
          delete newErrors.phone;
        }
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = "Please enter a valid email address";
        } else {
          delete newErrors.email;
        }
        break;
      case "pincode":
        if (!/^\d{6}$/.test(value)) {
          newErrors.pincode = "Pincode should be exactly 6 digits";
        } else {
          delete newErrors.pincode;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Restrict input based on field type
    if (name === "name" && !/^[a-zA-Z\s]*$/.test(value)) return;
    if (name === "phone" && (!/^\d*$/.test(value) || value.length > 10)) return;
    if (name === "pincode" && (!/^\d*$/.test(value) || value.length > 6))
      return;

    const updatedDetails = { ...customerDetails, [name]: value };
    setCustomerDetails(updatedDetails);

    // Validate field
    validateField(name, value);

    // Check if all required fields are filled and valid
    const requiredFields = [
      "name",
      "email",
      "phone",
      "address",
      "city",
      "pincode",
    ];
    const isValid =
      requiredFields.every(
        (field) =>
          updatedDetails[field as keyof typeof updatedDetails].trim() !== ""
      ) && Object.keys(errors).length === 0;
    setIsFormValid(isValid);
  };

  const calculateEndDate = (
    startDate: Date,
    subscription: string,
    holidayCount = 0
  ) => {
    let days = 0;
    switch (subscription) {
      case "weekly":
        days = 7;
        break;
      case "monthly":
        days = 30;
        break;
      default:
        return startDate;
    }
    return addDays(startDate, days - 1 + holidayCount);
  };

  const generateOrderId = () => {
    return (
      "FD" + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase()
    );
  };

  const getOrderDetails = () => {
    return items
      .map((item) => {
        let details = `${item.name} (Qty: ${item.quantity}, Price: ₹${
          item.totalPrice || item.price
        })`;
        if (item.sampleSize) details += ` - Size: ${item.sampleSize}`;
        if (item.subscription !== "sample")
          details += ` - Subscription: ${item.subscription}`;
        if (item.dateRange?.from && item.dateRange?.to) {
          details += ` - Date Range: ${format(
            item.dateRange.from,
            "MMM dd, yyyy"
          )} to ${format(item.dateRange.to, "MMM dd, yyyy")} (${
            item.totalDays
          } days)`;
        } else if (item.deliveryDate) {
          details += ` - Delivery starts: ${format(
            item.deliveryDate,
            "MMM dd, yyyy"
          )}`;
          if (
            item.subscription === "weekly" ||
            item.subscription === "monthly"
          ) {
            const endDate = calculateEndDate(
              item.deliveryDate,
              item.subscription,
              item.holidays?.length || 0
            );
            details += ` to ${format(endDate, "MMM dd, yyyy")} (${
              item.totalDays
            } days)`;
          }
        }
        if (item.holidays && item.holidays.length > 0) {
          details += ` - Holidays: ${item.holidays
            .map((h) => format(h, "MMM dd"))
            .join(", ")}`;
        }
        return details;
      })
      .join("\n");
  };

  // Create Razorpay order on server
  const createRazorpayOrder = async (amount: number) => {
    try {
      const response = await fetch("/api/create-razorpay-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount * 100, // Convert to paise
          currency: "INR",
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to create Razorpay order");
      }

      return data.order;
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      throw error;
    }
  };

  const saveOrderToDatabase = async (
    orderId: string,
    paymentType: string,
    razorpayPaymentId?: string
  ) => {
    try {
      const orderData = {
        orderId,
        customerDetails: {
          name: customerDetails.name,
          email: customerDetails.email,
          phone: customerDetails.phone,
          address: customerDetails.address,
          city: customerDetails.city,
          pincode: customerDetails.pincode,
          specialInstructions: customerDetails.specialInstructions,
        },
        orderDetails: getOrderDetails(),
        totalAmount: getTotalPrice().toFixed(2),
        paymentMethod: paymentType,
        razorpayPaymentId: razorpayPaymentId || null,
        orderDate: new Date().toISOString(),
        status: "Confirmed",
        items: items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.totalPrice || item.price,
          subscription: item.subscription,
          sampleSize: item.sampleSize,
          deliveryDate: item.deliveryDate?.toISOString(),
          dateRange: item.dateRange
            ? {
                from: item.dateRange.from?.toISOString(),
                to: item.dateRange.to?.toISOString(),
              }
            : null,
          totalDays: item.totalDays,
          holidays: item.holidays?.map((h) => h.toISOString()),
        })),
      };

      console.log("Saving order to database:", orderData);

      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      console.log("Order save result:", result);

      if (!result.success) {
        throw new Error(result.error || "Failed to save order");
      }

      return result;
    } catch (error) {
      console.error("Error saving order to database:", error);
      throw error;
    }
  };

  const handleRazorpayPayment = async () => {
    try {
      setIsProcessing(true);
      setPaymentError("");

      // Check if Razorpay is loaded
      if (typeof window === "undefined" || !window.Razorpay) {
        throw new Error(
          "Payment gateway is not loaded. Please refresh and try again."
        );
      }

      // Create order on server first
      console.log("Creating Razorpay order...");
      const razorpayOrder = await createRazorpayOrder(getTotalPrice());
      console.log("Razorpay order created:", razorpayOrder);

      const orderId = generateOrderId();

      const options = {
        key:
          process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_live_your_key_here", // Use environment variable
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Farmer's Dairy",
        description: "Fresh Milk Subscription",
        order_id: razorpayOrder.id, // Use server-created order ID
        image: "/images/farmers-dairy-logo.png",
        handler: async (response: any) => {
          console.log("Payment successful:", response);

          try {
            // Verify payment on server
            const verifyResponse = await fetch("/api/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyResult = await verifyResponse.json();

            if (!verifyResult.success) {
              throw new Error("Payment verification failed");
            }

            // Save order to database
            await saveOrderToDatabase(
              orderId,
              "Online Payment",
              response.razorpay_payment_id
            );

            // Show success popup
            setShowSuccessPopup(true);

            // Clear cart and redirect after delay
            setTimeout(() => {
              clearCart();
              setIsProcessing(false);
              const params = new URLSearchParams({
                orderId,
                customerName: customerDetails.name,
                totalAmount: getTotalPrice().toFixed(2),
                paymentMethod: "Online Payment",
              });
              router.push(`/order-confirmation?${params.toString()}`);
            }, 3000);
          } catch (error) {
            console.error("Error after payment:", error);
            setPaymentError(
              "Payment completed but order processing failed. Please contact support."
            );
            setIsProcessing(false);
          }
        },
        prefill: {
          name: customerDetails.name,
          email: customerDetails.email,
          contact: customerDetails.phone,
        },
        notes: {
          order_id: orderId,
          customer_name: customerDetails.name,
        },
        theme: {
          color: "#2d5016",
        },
        modal: {
          ondismiss: () => {
            console.log("Payment modal dismissed");
            setIsProcessing(false);
          },
        },
        retry: {
          enabled: true,
          max_count: 3,
        },
      };

      console.log("Opening Razorpay with options:", options);
      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", (response: any) => {
        console.error("Payment failed:", response.error);
        setPaymentError(
          `Payment failed: ${response.error.description || "Unknown error"}`
        );
        setIsProcessing(false);
      });

      rzp.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
      setPaymentError(
        error instanceof Error ? error.message : "Failed to initiate payment"
      );
      setIsProcessing(false);
    }
  };

  const handleCashOnDelivery = async () => {
    setIsProcessing(true);
    const orderId = generateOrderId();

    try {
      // Save order to database
      await saveOrderToDatabase(orderId, "Cash on Delivery");

      // Clear cart
      clearCart();

      // Redirect to order confirmation page
      const params = new URLSearchParams({
        orderId,
        customerName: customerDetails.name,
        totalAmount: getTotalPrice().toFixed(2),
        paymentMethod: "Cash on Delivery",
      });

      router.push(`/order-confirmation?${params.toString()}`);
    } catch (error) {
      console.error("Error processing COD order:", error);
      setPaymentError(
        "There was an error processing your order. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayment = () => {
    if (!isFormValid || !paymentMethod || isProcessing) return;

    setPaymentError(""); // Clear previous errors

    if (paymentMethod === "online") {
      handleRazorpayPayment();
    } else {
      handleCashOnDelivery();
    }
  };

  // Don't render until client-side to avoid hydration mismatch
  if (!isClient) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green mx-auto"></div>
            <p className="mt-4 text-lg text-text">Loading checkout...</p>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-text mb-4">
              No Items to Checkout
            </h1>
            <p className="text-lg text-text mb-8">
              Add some products to your cart first!
            </p>
            <Button
              onClick={() => (window.location.href = "/shop")}
              className="btn-primary">
              Go to Shop
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-text mb-4">Checkout</h1>
          <p className="text-lg text-text">Complete your order details</p>
        </div>

        {/* Payment Error Display */}
        {paymentError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
            <p className="text-sm text-red-800">{paymentError}</p>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Customer Details Form */}
          <div className="space-y-6">
            <Card className="card border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-text">
                  Contact Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Name *
                    </label>
                    <Input
                      name="name"
                      value={customerDetails.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                      className={errors.name ? "border-red-500" : ""}
                      disabled={isProcessing}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Phone *
                    </label>
                    <Input
                      name="phone"
                      value={customerDetails.phone}
                      onChange={handleInputChange}
                      placeholder="10-digit phone number"
                      required
                      className={errors.phone ? "border-red-500" : ""}
                      disabled={isProcessing}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Email *
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={customerDetails.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                    className={errors.email ? "border-red-500" : ""}
                    disabled={isProcessing}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Address *
                  </label>
                  <Textarea
                    name="address"
                    value={customerDetails.address}
                    onChange={handleInputChange}
                    placeholder="Your complete address"
                    rows={3}
                    required
                    disabled={isProcessing}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Pincode *
                    </label>
                    <Input
                      name="pincode"
                      value={customerDetails.pincode}
                      onChange={handleInputChange}
                      placeholder="6-digit pincode"
                      required
                      className={errors.pincode ? "border-red-500" : ""}
                      disabled={isProcessing}
                    />
                    {errors.pincode && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.pincode}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      City *
                    </label>
                    <Input
                      name="city"
                      value={customerDetails.city}
                      onChange={handleInputChange}
                      placeholder="Your city"
                      required
                      disabled={isProcessing}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Special Instructions
                  </label>
                  <Textarea
                    name="specialInstructions"
                    value={customerDetails.specialInstructions}
                    onChange={handleInputChange}
                    placeholder="Any special delivery instructions..."
                    rows={2}
                    disabled={isProcessing}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="card border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-text">
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <button
                    onClick={() => setPaymentMethod("online")}
                    className={`p-4 border rounded-lg flex items-center space-x-3 transition-all duration-300 ${
                      paymentMethod === "online"
                        ? "border-green bg-mint-light"
                        : "border-mint hover:border-mint"
                    }`}
                    disabled={!isFormValid || isProcessing}>
                    <CreditCard className="w-5 h-5 text-green" />
                    <div className="text-left">
                      <span className="font-medium block">
                        Online Payment (Razorpay)
                      </span>
                      <span className="text-xs text-gray-500">
                        Credit Card, Debit Card, UPI, Net Banking
                      </span>
                    </div>
                  </button>

                  {/* Only show COD for sample products */}
                  {items.some((item) => item.subscription === "sample") &&
                    !items.some((item) => item.subscription !== "sample") && (
                      <button
                        onClick={() => setPaymentMethod("cod")}
                        className={`p-4 border rounded-lg flex items-center space-x-3 transition-all duration-300 ${
                          paymentMethod === "cod"
                            ? "border-green bg-mint-light"
                            : "border-mint hover:border-mint"
                        }`}
                        disabled={!isFormValid || isProcessing}>
                        <Building className="w-5 h-5 text-green" />
                        <span className="font-medium">Cash on Delivery</span>
                      </button>
                    )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="card border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-text">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-text">{item.name}</h4>
                        {item.sampleSize && (
                          <p className="text-sm text-text opacity-70">
                            Size: {item.sampleSize}
                          </p>
                        )}
                        <p className="text-sm text-text opacity-70 capitalize">
                          {item.subscription === "sample"
                            ? "One-time sample"
                            : `${item.subscription} subscription`}
                        </p>

                        {/* Subscription dates - improved layout */}
                        {item.deliveryDate &&
                          item.subscription !== "sample" && (
                            <div className="text-xs text-text opacity-70 mt-1">
                              <div>
                                Starts:{" "}
                                {format(item.deliveryDate, "MMM dd, yyyy")}
                              </div>
                              {(item.subscription === "weekly" ||
                                item.subscription === "monthly") && (
                                <div>
                                  Ends:{" "}
                                  {format(
                                    calculateEndDate(
                                      item.deliveryDate,
                                      item.subscription,
                                      item.holidays?.length || 0
                                    ),
                                    "MMM dd, yyyy"
                                  )}
                                </div>
                              )}
                            </div>
                          )}

                        {item.dateRange?.from && item.dateRange?.to && (
                          <div className="text-xs text-text opacity-70 mt-1">
                            <div>
                              {format(item.dateRange.from, "MMM dd")} -{" "}
                              {format(item.dateRange.to, "MMM dd")} (
                              {item.totalDays} days)
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          ₹{item.totalPrice || item.price} ×{" "}
                          {item.totalDays || 1}{" "}
                          {item.totalDays && item.totalDays > 1
                            ? "days"
                            : "day"}
                        </p>
                        <p className="text-sm text-text opacity-70">
                          ₹
                          {(
                            (item.totalPrice || item.price) * item.quantity
                          ).toFixed(2)}
                        </p>
                        <div className="text-xs text-text opacity-70 mt-1">
                          <div>Per day cost: ₹{item.price}</div>
                          <div>
                            for{" "}
                            {item.name.includes("500ml") ? "500ml" : "1000ml"}{" "}
                            milk
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < items.length - 1 && <div className="h-4"></div>}
                  </div>
                ))}

                <div className="pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-text">Subtotal:</span>
                    <span className="font-semibold">
                      ₹{getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text">Delivery:</span>
                    <span className="font-semibold text-green">Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2">
                    <span className="text-text">Total:</span>
                    <span className="text-green">
                      ₹{getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={!isFormValid || !paymentMethod || isProcessing}
                  className="btn-primary w-full mt-6">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>

                {(!isFormValid || !paymentMethod) && (
                  <p className="text-sm text-text opacity-70 text-center">
                    Please fill all required fields correctly and select a
                    payment method
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      <SuccessPopup
        isOpen={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
      />
    </div>
  );
}
