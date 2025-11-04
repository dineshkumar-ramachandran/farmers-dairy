import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ddcungvetvmbikwfvytq.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkY3VuZ3ZldHZtYmlrd2Z2eXRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyMjM3NzMsImV4cCI6MjA3Nzc5OTc3M30.LM4_tt01RWYrO42uq37QY2wvn4oFBUuFXJ7RkfJulvM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
});

// Test connection function
export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("count", { count: "exact", head: true });
    if (error) throw error;
    return { success: true, count: data };
  } catch (error) {
    console.error("Supabase connection test failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
