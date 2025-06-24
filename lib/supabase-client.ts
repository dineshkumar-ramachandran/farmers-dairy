import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://ugxqilcquusfwvkmlzwo.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVneHFpbGNxdXVzZnd2a21rendvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyMjkyMjQsImV4cCI6MjA2NTgwNTIyNH0._9-SE7_ADmiZusVlZ5zGCJ9vCeCEoLB7p8ojIx7iJ0A"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
  global: {
    headers: {
      "Content-Type": "application/json",
    },
  },
})

// Helper function to handle Supabase operations with better error handling
export async function safeSupabaseOperation<T>(
  operation: () => Promise<{ data: T; error: any }>,
  operationName: string,
): Promise<{ data: T | null; error: string | null }> {
  try {
    console.log(`🔄 Executing ${operationName}...`)
    const result = await operation()

    if (result.error) {
      console.error(`❌ ${operationName} error:`, result.error)
      return { data: null, error: result.error.message || `${operationName} failed` }
    }

    console.log(`✅ ${operationName} successful`)
    return { data: result.data, error: null }
  } catch (err) {
    console.error(`❌ ${operationName} exception:`, err)

    // Handle JSON parsing errors specifically
    if (err instanceof SyntaxError && err.message.includes("JSON")) {
      return { data: null, error: "Database connection error - please check your Supabase configuration" }
    }

    return { data: null, error: err instanceof Error ? err.message : `${operationName} failed` }
  }
}
