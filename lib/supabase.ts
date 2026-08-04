import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ddcungvetvmbikwfvytq.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_API_KEY!;

// 🔄 Client-side Supabase client (for components)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database
export interface Order {
  orderId: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  pincode?: string;
  specialInstructions?: string;
  orderDetails?: string;
  totalAmount: number;
  paymentMethod?: string;
  orderDate?: string;
  status?: string;
  items: any[];
  razorpayorderid?: string;
}
