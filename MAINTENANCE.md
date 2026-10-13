# Maintenance mode

The maintenance toggle lives in `src/lib/maintenance.ts` and intercepts every
request inside the serverless function entry (`src/server.ts`) **before**
TanStack handles it. This replaces the earlier `vercel.json` rewrites
approach, which silently stopped working because the Nitro Vercel preset
generates its own routing config that overrides `vercel.json` rewrites.

## Enable maintenance mode

Edit `src/lib/maintenance.ts`:

```ts
export const MAINTENANCE_ENABLED = true;   // flip to true
```

Commit and push:

```bash
git add src/lib/maintenance.ts
git commit -m "chore: enable maintenance mode"
git push
```

Vercel redeploys (~60–90 s). Every route except the exempt list below returns
the maintenance page as a 200. Browser URL is preserved.

## Disable maintenance mode

Flip the same constant back to `false`, commit, push.

## Alternative: Vercel env var (no commit)

Set `MAINTENANCE_MODE=true` in **Vercel → Project → Settings → Environment
Variables** and redeploy. The server honours either source (constant or env
var). Delete the env var to turn it back off.

## Exempt routes

These keep working even in maintenance mode (defined in
`src/lib/maintenance.ts`):

- `/maintenance.html` — the static copy, for direct linking
- `/keep-alive` — Supabase keep-alive cron must keep hitting the DB so the
  Free-plan project doesn't auto-pause while the site is down
- `/images/*` — logo on the maintenance page
- `/assets/*` — Vite hashed CSS/JS the maintenance page uses
- `/.well-known/*` — SSL renewal
- `/favicon*` — browser tab icon

## Where the page comes from

`src/lib/maintenance-html.ts` holds the maintenance page inlined as a
template literal, generated from `public/maintenance.html`. Keep both in
sync — the Vercel serverless function reads the inlined copy because the
public tree isn't bundled into the function.

To regenerate the inlined copy after editing `public/maintenance.html`:

```bash
node scratch/inline-maint.mjs   # or re-run whatever generator you prefer
```

(There's no committed generator script; the two files are small and manual
sync is fine.)

## Preview locally

```bash
pnpm dev
```

Then open http://localhost:8080 — the maintenance middleware runs in dev too
when the flag or env var is on.
