import { supabaseAdmin } from "./supabase.server";

/**
 * Cheapest full-round-trip query that definitively counts as Supabase
 * activity. We hit `orders` because it always exists in this project.
 * `limit(1)` bounds the plan; `select("orderId")` keeps the payload tiny.
 *
 * The previous HEAD-only variant used `{ head: true, count: "exact" }` and
 * appeared to be flaky — Supabase paused despite the cron running — so this
 * now does a real GET.
 */
export async function pingSupabase(): Promise<{ ok: boolean; error?: string }> {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const { error } = await supabaseAdmin()
        .from("orders")
        .select("orderId")
        .limit(1);
      if (!error) return { ok: true };
      // Non-Postgres-level errors (RLS, auth) fail fast; only network-shaped
      // failures are worth retrying.
      if (!/fetch|timeout|network/i.test(error.message)) {
        return { ok: false, error: error.message };
      }
      if (attempt === 3) return { ok: false, error: error.message };
    } catch (err) {
      const msg = err instanceof Error ? err.message : "unknown";
      if (attempt === 3) return { ok: false, error: msg };
    }
    // Brief backoff between attempts
    await new Promise((r) => setTimeout(r, 800 * attempt));
  }
  return { ok: false, error: "exhausted retries" };
}
