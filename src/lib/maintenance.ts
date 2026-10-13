/**
 * Site-wide maintenance toggle.
 *
 * TanStack Start + Nitro generates its own .vercel/output/config.json routing
 * when deploying with the vercel preset, which overrides vercel.json's
 * `rewrites`. That means toggling maintenance via vercel.json rewrites does
 * NOT actually block requests — the generated router catches them first and
 * serves the full app.
 *
 * This flag runs inside src/server.ts (the serverless function entry) so it
 * fires BEFORE TanStack handles the request — guaranteed to actually block.
 *
 * Two ways to turn it on:
 *   1. Flip MAINTENANCE_ENABLED below to true, commit, push.
 *   2. Set MAINTENANCE_MODE=true as an environment variable in Vercel, redeploy.
 *
 * The browser URL is preserved (no redirect) — the maintenance page is
 * returned as a 200 for every blocked path. Status code is deliberate: 503
 * would be semantically correct but confuses crawlers and some monitors.
 */
export const MAINTENANCE_ENABLED = true;

/** Routes always served normally even when maintenance is on. */
const EXEMPT_PATHS = [
  "/maintenance.html",
  "/keep-alive",
];

const EXEMPT_PREFIXES = [
  "/images/",
  "/assets/", // Vite build hashes — needed so the maintenance page's own CSS can load
  "/.well-known/",
  "/favicon",
];

export function shouldServeMaintenance(request: Request): boolean {
  const flagOn =
    MAINTENANCE_ENABLED ||
    (typeof process !== "undefined" &&
      process.env?.["MAINTENANCE_MODE"] === "true");
  if (!flagOn) return false;

  const { pathname } = new URL(request.url);
  if (EXEMPT_PATHS.includes(pathname)) return false;
  if (EXEMPT_PREFIXES.some((p) => pathname.startsWith(p))) return false;
  return true;
}
