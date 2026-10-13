/**
 * Site-wide maintenance toggle.
 *
 * TanStack Start + Nitro's Vercel preset writes `.vercel/output/config.json`
 * from scratch, and Vercel ignores the top-level `vercel.json` when that file
 * exists. So neither `rewrites` nor `redirects` in vercel.json actually fire.
 *
 * The real toggle lives in `scripts/maintenance-postbuild.mjs`, which runs
 * after `pnpm build` and injects a 302 redirect at the TOP of config.json's
 * routes array when maintenance is on. The postbuild script reads this
 * constant and the MAINTENANCE_MODE env var.
 *
 * To toggle:
 *   1. Flip MAINTENANCE_ENABLED here, commit, push. Vercel redeploys, the
 *      postbuild hook injects the redirect, every path except the exempt
 *      list redirects to /maintenance.html.
 *   OR
 *   2. Set MAINTENANCE_MODE=true in Vercel env vars and redeploy.
 */
export const MAINTENANCE_ENABLED = true;
