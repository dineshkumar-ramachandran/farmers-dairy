import { supabaseAdmin } from "./supabase.server";

/**
 * Cheapest possible query that still counts as Supabase activity. `head: true`
 * makes it a HEAD request (no rows over the wire), `limit(1)` bounds the plan.
 * Any 2xx response is enough to reset the free-plan pause timer.
 */
export async function pingSupabase(): Promise<{ ok: boolean; error?: string }> {
  try {
    const { error } = await supabaseAdmin()
      .from("orders")
      .select("orderId", { head: true, count: "exact" })
      .limit(1);
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "unknown" };
  }
}
