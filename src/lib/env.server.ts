/**
 * Server-only environment reader. Falls back through the aliases used across
 * previous deployments so a Vercel project that still has the old variable
 * name keeps working. Never import this from client code.
 */
function pick(...names: Array<string | undefined>): string | undefined {
  for (const n of names) {
    if (!n) continue;
    const v = process.env[n];
    if (v && v.length > 0) return v;
  }
  return undefined;
}

export const SUPABASE_URL =
  pick("SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL", "VITE_SUPABASE_URL") ??
  "https://ddcungvetvmbikwfvytq.supabase.co";

export const SUPABASE_SERVICE_KEY = pick(
  "SUPABASE_SERVICE_ROLE_KEY",
  "SUPABASE_SERVICE_API_KEY",
  "NEXT_PUBLIC_SUPABASE_SERVICE_API_KEY",
);

export const RAZORPAY_KEY_ID = pick("RAZORPAY_KEY_ID");
export const RAZORPAY_KEY_SECRET = pick("RAZORPAY_KEY_SECRET");

export const RESEND_API_KEY = pick("RESEND_API_KEY");

export const ADMIN_PASSPHRASE = pick("ADMIN_PASSPHRASE") ?? "farmersdairy";

export const CONTACT_TO = pick("CONTACT_EMAIL_TO") ?? "onprimehub@gmail.com";
