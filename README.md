# Farmer's Dairy 2.0

Premium editorial e-commerce site for Farmer's Dairy — Hosur, Tamil Nadu.
Built on TanStack Start (Vite + React 19 + Nitro) with Supabase orders,
Razorpay payments, and Resend contact-form email.

## Quick start

```bash
pnpm install
cp .env.example .env.local        # fill in your keys
pnpm dev                          # http://localhost:5173
pnpm build && pnpm preview        # production build
```

See **[DEPLOY.md](./DEPLOY.md)** for the full Vercel checklist, environment
variable table, and cutover plan.

## Project structure

```
src/
  routes/
    index.tsx                 home
    shop.index.tsx            shop grid
    shop.$slug.tsx            product detail
    cart.tsx, checkout.tsx    cart + checkout
    order-confirmation.tsx
    admin.tsx                 password-gated dashboard
    about.tsx, contact.tsx    marketing
    *.tsx                     4 legal pages
    api/                      server endpoints (Nitro)
      razorpay/create-order.ts
      razorpay/verify.ts
      orders.ts               POST — insert into Supabase
      send-contact-email.ts   Resend
      admin/orders.ts         GET — list orders (bearer passphrase)
      admin/update-status.ts  POST — mark delivered/cancelled
  components/                 UI primitives + editorial pieces
  lib/
    products.ts               product catalogue (single source of truth)
    cart.tsx                  cart context (localStorage-backed)
    supabase-server.ts        service-role client (server only)
    env-server.ts             env reader with legacy aliases
    motion.ts                 reveal + count-up + Lenis helpers
```

## Editing content

All product data — names, prices, variants, descriptions, images — lives in
`src/lib/products.ts`. Image URLs point to raw files in this repo's
`farmers-dairy` branch, so they render even before you deploy.

Homepage sections and testimonials live in `src/routes/index.tsx`.

## Original Lovable notes

This project was scaffolded from a [Lovable](https://lovable.dev) starter.
The Lovable editor can be reconnected to the repo if you want to keep iterating
visually, but the code is standalone and does not require Lovable to build,
run, or deploy.
