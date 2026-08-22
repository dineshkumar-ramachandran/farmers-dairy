# Maintenance mode

A branded static maintenance page lives at `public/maintenance.html`. Vercel
serves it at `https://www.farmersdairy.in/maintenance.html` as soon as it's
deployed. To put the whole site behind it (or take it back out), edit
`vercel.json` and redeploy — 30 seconds either way.

## Enable maintenance mode

1. Open `vercel.json`.
2. **Add** the `rewrites` block so the whole file looks like this
   (Vercel's `vercel.json` schema doesn't accept JSON comments, so the
   rewrites are documented here — not commented out in the file itself):

   ```json
   {
     "$schema": "https://openapi.vercel.sh/vercel.json",
     "framework": null,
     "buildCommand": "pnpm build",
     "installCommand": "pnpm install --frozen-lockfile=false",
     "outputDirectory": ".vercel/output",
     "rewrites": [
       { "source": "/((?!maintenance.html|images/.*|favicon.*|.well-known/.*).*)", "destination": "/maintenance.html" }
     ]
   }
   ```

3. Commit and push:

   ```bash
   git add vercel.json
   git commit -m "chore: enable maintenance mode"
   git push
   ```

Every request except `/maintenance.html` itself, `/images/*`, `/favicon.*` and
`/.well-known/*` (SSL renewal) rewrites to the maintenance page while still
serving a 200 — so browsers, ad crawlers, and the WhatsApp / call links on
the page all keep working.

## Disable maintenance mode

Remove the `rewrites` block (or comment it out), commit and push.

## Preview locally

```bash
pnpm dev
```

Then open http://localhost:8080/maintenance.html directly. The rewrite rule
only takes effect on Vercel — `pnpm dev` always serves the real site so you
can keep working while the production URL is under maintenance.

## Test on a preview URL first

Push a branch other than `farmers-dairy-2.0` with the rewrite enabled. Vercel
gives it its own preview URL — you can confirm the maintenance page looks
right on your phone and desktop before you flip the production branch.
