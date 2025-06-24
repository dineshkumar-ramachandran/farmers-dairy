import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://ugxqilcquusfwvkmlzwo.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVneHFpbGNxdXVzZnd2a21rendvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyMjkyMjQsImV4cCI6MjA2NTgwNTIyNH0._9-SE7_ADmiZusVlZ5zGCJ9vCeCEoLB7p8ojIx7iJ0A"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
})

// Test connection function
export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase.from("orders").select("count", { count: "exact", head: true })
    if (error) throw error
    return { success: true, count: data }
  } catch (error) {
    console.error("Supabase connection test failed:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}
