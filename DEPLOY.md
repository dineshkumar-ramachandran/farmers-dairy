# Deploying Farmer's Dairy 2.0

This branch (`farmers-dairy-2.0`) ships the redesigned site as a **TanStack Start** (Vite + React 19 + Nitro) application. It replaces the previous Next.js codebase on `farmers-dairy` / `pagination`.

## What's new vs the old branches

- **Framework**: Next.js → TanStack Start (React 19). Deploys with Vercel's default framework preset.
- **Design**: full editorial refresh, Bricolage Grotesque + Plus Jakarta Sans typography, scroll animations (Lenis + IntersectionObserver), Ken-Burns hero, animated stats, marquee tickers.
- **Backend, all wired up**:
  - `POST /api/razorpay/create-order` — server-side Razorpay order creation
  - `POST /api/razorpay/verify` — HMAC-SHA256 signature verification
  - `POST /api/orders` — inserts confirmed orders into `public.orders`
  - `POST /api/send-contact-email` — Resend transactional email to `CONTACT_EMAIL_TO`
  - `GET  /api/admin/orders` — passphrase-gated, reads real orders from Supabase
  - `POST /api/admin/update-status` — mark Delivered / Cancelled
- **Admin**: real Supabase-backed orders list, filters, CSV export. Passphrase is verified **server-side** (not in the client bundle).

## Environment variables

All required keys are documented in `.env.example`. In Vercel → Project → Settings → Environment Variables, make sure these exist (any Environment scope you want the deployment to serve):

| Name | Scope | Source |
|---|---|---|
| `SUPABASE_SERVICE_ROLE_KEY` | server | Supabase → Settings → API → service_role key |
| `VITE_SUPABASE_URL` | client | `https://ddcungvetvmbikwfvytq.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | client | Supabase → Settings → API → anon public |
| `RAZORPAY_KEY_ID` | server | Razorpay → Settings → API Keys |
| `RAZORPAY_KEY_SECRET` | server | Razorpay → Settings → API Keys |
| `VITE_RAZORPAY_KEY_ID` | client | Same value as `RAZORPAY_KEY_ID` |
| `RESEND_API_KEY` | server | resend.com → API Keys |
| `CONTACT_EMAIL_TO` | server | Inbox that receives contact-form submissions |
| `ADMIN_PASSPHRASE` | server | Choose a strong passphrase for `/admin` |

Aliases the server code will also honour (so you can leave your existing Next.js vars in place):

- `SUPABASE_SERVICE_API_KEY` and `NEXT_PUBLIC_SUPABASE_SERVICE_API_KEY` → treated as `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SUPABASE_URL` → treated as `VITE_SUPABASE_URL`

Client-side variables **must** carry the `VITE_` prefix because Vite (unlike Next.js) does not read `NEXT_PUBLIC_*`. The values are identical — just create the `VITE_` twins.

## Vercel setup

1. **Branch Tracking** (Project → Settings → Git): change **Production Branch** from `farmers-dairy` to `farmers-dairy-2.0` **only after you have tested the preview build**.
2. **Environment Variables**: verify the table above. Add the three `VITE_*` twins if they don't exist yet.
3. **Framework Preset**: leave as auto-detected — Vercel picks up TanStack Start / Vite automatically.
4. **Domains**: `www.farmersdairy.in` will follow whichever branch is the production branch. To test safely, keep the production branch on the old `farmers-dairy` and open the preview URL Vercel creates for `farmers-dairy-2.0` (looks like `<project>-git-farmers-dairy-2-0-<team>.vercel.app`).
5. **First test on preview**:
   - Open the preview URL, place a Sample Pack order via Cash on Delivery — should reach `/admin` (with the passphrase you set).
   - Do one live Razorpay test payment (₹1 works — Razorpay minimum) — verify the `orders` row appears with `paymentMethod=Razorpay`, `status=paid`, and `razorpayorderid` populated.
   - Submit the contact form — check the inbox listed in `CONTACT_EMAIL_TO`.
6. **Cut over**: once the three checks pass, change Branch Tracking to `farmers-dairy-2.0`. The next push (or redeploy) goes live on `www.farmersdairy.in`.

## Local development

Requires Node 20+ and pnpm (or bun — the repo has a `bun.lock` too).

```bash
pnpm install
cp .env.example .env.local
# fill in your development values in .env.local
pnpm dev
```

Dev server runs on http://localhost:5173 (Vite default). The `/api/*` routes are served by Nitro's dev handler in the same process.

## Legacy branches

- `farmers-dairy` — Next.js production (still deployable if you need to roll back)
- `pagination` — Next.js dev
- `farmers-dairy-2.0` — new TanStack Start production (this branch)

Do **not** delete the old branches until 2.0 has been in production for at least a week and orders are flowing through `admin` reliably.

## Supabase schema (already exists in the project)

The `public.orders` table is unchanged from the Next.js days — the new API routes write the same columns. No migration needed. If you ever recreate it, this is the shape:

```sql
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  orderId text unique,
  name text, email text, phone text,
  address text, city text, pincode text,
  specialInstructions text,
  orderDetails text,
  totalAmount numeric,
  paymentMethod text,
  orderDate timestamptz default now(),
  status text default 'Confirmed',
  items jsonb,
  razorpayorderid text
);
```
