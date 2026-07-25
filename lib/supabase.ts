import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ddcungvetvmbikwfvytq.supabase.co";
// Falls back to the anon key used by supabase-client.ts so module import
// never crashes when the env var is absent (e.g. at build time)
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_API_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkY3VuZ3ZldHZtYmlrd2Z2eXRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyMjM3NzMsImV4cCI6MjA3Nzc5OTc3M30.LM4_tt01RWYrO42uq37QY2wvn4oFBUuFXJ7RkfJulvM";

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
