# Maintenance mode

## Why this is complicated

TanStack Start's Nitro Vercel preset writes `.vercel/output/config.json` from
scratch at build time, and **Vercel ignores the top-level `vercel.json`
whenever that file exists**. So neither `rewrites` nor `redirects` in
`vercel.json` ever actually fire on this project. The toggle needs to patch
`.vercel/output/config.json` directly after the Nitro build.

That's what `scripts/maintenance-postbuild.mjs` does. It runs after
`pnpm build` (wired into Vercel's `buildCommand` in `vercel.json`) and
injects a 302 redirect at the top of the output's routes array when
maintenance is on. The redirect runs at Vercel's edge, before the request
reaches the serverless function.

## Enable maintenance mode

Edit `src/lib/maintenance.ts`:

```ts
export const MAINTENANCE_ENABLED = true;
```

Commit and push:

```bash
git add src/lib/maintenance.ts
git commit -m "chore: enable maintenance mode"
git push
```

Vercel redeploys (~60–90 s). Every path except the exempt list below
302-redirects to `/maintenance.html` at the edge.

## Disable maintenance mode

Flip the same constant back to `false`, commit, push.

## Alternative: Vercel env var (no commit)

Set `MAINTENANCE_MODE=true` in **Vercel → Project → Settings → Environment
Variables → Production** and redeploy. The postbuild script honours either
source. Delete the env var and redeploy to turn it off.

## Exempt paths (keep working during maintenance)

Defined in `scripts/maintenance-postbuild.mjs`:

- `/maintenance.html` — the static page itself
- `/keep-alive` — the Supabase keep-alive route (so the Free-plan DB
  doesn't auto-pause while the site is down)
- `/images/*` — the logo on the maintenance page
- `/assets/*` — Vite hashed CSS/JS (so the browser can render anything
  from the real site if someone deep-links)
- `/favicon*` — tab icon
- `/.well-known/*` — SSL renewal

## How to verify after push

```bash
curl -sSI https://www.farmersdairy.in/ | head -5
```

Expect `HTTP/2 302` with `location: /maintenance.html`.

```bash
curl -sSI https://www.farmersdairy.in/keep-alive | head -3
```

Expect `HTTP/2 200` — the Supabase ping still works.

## Preview locally

The postbuild only affects the Vercel edge router, not local dev. In
`pnpm dev` you'll see the real site regardless of the flag. To verify the
toggle changes anything, run `pnpm build && node scripts/maintenance-postbuild.mjs`
and inspect `.vercel/output/config.json`.
