/**
 * Shared order types. Client-safe (no server-only imports) so both the browser
 * and the server modules can import them without triggering TanStack Start's
 * import-protection plugin.
 */

export type OrderItemInput = {
  key?: string;
  slug?: string;
  name: string;
  image?: string;
  variant?: string;
  unitPrice: number;
  quantity: number;
  days?: number;
  plan?: string;
  startDate?: string;
  endDate?: string;
  holidays?: string[];
};

export type SaveOrderInput = {
  orderId: string;
  customerDetails: {
    name: string;
    email?: string;
    phone: string;
    address: string;
    city?: string;
    pincode: string;
    specialInstructions?: string;
  };
  orderDetails?: string;
  totalAmount: number;
  paymentMethod: "Razorpay" | "Cash on Delivery";
  orderDate?: string;
  status?: string;
  items: OrderItemInput[];
  razorpayPaymentId?: string | null;
};

export type AdminOrder = {
  id: string;
  createdAt: string;
  paymentMethod: string;
  status: string;
  total: number;
  subtotal: number;
  shipping: number;
  address: Record<string, string>;
  items: OrderItemInput[];
  razorpayId: string | null;
};
