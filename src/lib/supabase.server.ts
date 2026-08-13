import { createClient } from "@supabase/supabase-js";
import { SUPABASE_SERVICE_KEY, SUPABASE_URL } from "./env.server";

/**
 * Service-role Supabase client — bypasses RLS. NEVER import from client code.
 * If the service key is missing, this throws at first use so a broken deploy
 * fails loud instead of silently accepting orders that never persist.
 */
let cached: ReturnType<typeof createClient> | null = null;

export function supabaseAdmin() {
  if (cached) return cached;
  if (!SUPABASE_SERVICE_KEY) {
    throw new Error(
      "Supabase service key missing. Set SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SERVICE_API_KEY) in the deployment environment.",
    );
  }
  cached = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
