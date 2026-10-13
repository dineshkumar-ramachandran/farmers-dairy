#!/usr/bin/env node
/**
 * Post-build hook — injects a maintenance redirect into the Vercel output.
 *
 * Why: TanStack Start's Nitro Vercel preset writes `.vercel/output/config.json`
 * from scratch and Vercel ignores the top-level `vercel.json` when that file
 * exists. So any `rewrites` / `redirects` in vercel.json silently stop working.
 *
 * This script runs after `pnpm build` and patches the generated config.json
 * directly, inserting a 302 redirect at the top of its routes array when
 * maintenance mode is on.
 *
 * Maintenance is on when EITHER:
 *   - process.env.MAINTENANCE_MODE === "true"          (Vercel env var)
 *   - src/lib/maintenance.ts exports MAINTENANCE_ENABLED = true
 */
import fs from "node:fs";
import path from "node:path";

const CONFIG_PATH = path.resolve(".vercel/output/config.json");
const FLAG_FILE = path.resolve("src/lib/maintenance.ts");

const envOn = process.env.MAINTENANCE_MODE === "true";
const fileOn = (() => {
  try {
    const src = fs.readFileSync(FLAG_FILE, "utf8");
    return /MAINTENANCE_ENABLED\s*=\s*true/.test(src);
  } catch {
    return false;
  }
})();

const enabled = envOn || fileOn;

if (!fs.existsSync(CONFIG_PATH)) {
  console.log("[maintenance-postbuild] no .vercel/output/config.json — skipping");
  process.exit(0);
}

const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
config.routes = Array.isArray(config.routes) ? config.routes : [];

// Strip any previous maintenance redirect so toggling off actually turns off.
// We identify it by the Location header's value — unique enough.
config.routes = config.routes.filter(
  (r) => r?.headers?.Location !== "/maintenance.html",
);

if (enabled) {
  // Match everything EXCEPT the exempt list, redirect to the static page.
  // Vercel's output-config route syntax: `src` is a regex (anchored at start
  // automatically), `headers.Location` carries the redirect target,
  // `status` sets the HTTP code. 302 keeps crawlers from caching the
  // maintenance page as the real site.
  const maintenanceRoute = {
    src: "^/(?!maintenance\\.html|keep-alive|images/|assets/|favicon|\\.well-known/).*",
    status: 302,
    headers: { Location: "/maintenance.html" },
  };
  config.routes.unshift(maintenanceRoute);
  console.log("[maintenance-postbuild] MAINTENANCE MODE ON — redirect injected");
} else {
  console.log("[maintenance-postbuild] maintenance off — no redirect injected");
}

fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
