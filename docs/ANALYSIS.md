# Farmers Dairy — Codebase Analysis Report

_Audit date: 2026-07-10 · Auditor: pre-refactor deep scan of every route, component, asset and config._

## 1. Framework & Tooling

| Area | Finding |
| --- | --- |
| Framework | Next.js **14.2.16**, App Router, React 18, TypeScript 5 |
| Styling | Tailwind CSS **3.4**, shadcn/ui (full Radix component set), `tailwindcss-animate` |
| Fonts | Montserrat via `next/font/google` (weights 300–800) |
| Icons | lucide-react |
| Payments | Razorpay (client script in root layout + `/api/create-razorpay-order`, `/api/verify-payment`) |
| Data | Supabase (`lib/supabase*.ts`, orders table) with in-memory fallback store |
| Email | Resend (`/api/send-contact-email`, `/api/notify`) |
| Origin | v0.dev generated project (`generator: "v0.dev"`) |
| Package manager | npm (`package-lock.json`; `pnpm-lock.yaml` is an empty stub) |

## 2. Routing Map

| Route | Purpose | State |
| --- | --- | --- |
| `/` | Home: hero slider, products, story, benefits, testimonials, CTA | Active |
| `/about` | Mission/vision/values + freshness timeline | Active |
| `/contact` | Form (Resend), Google Maps embed, FAQ | Active |
| `/shop` | Products w/ subscription (weekly/monthly/custom), date pickers, holiday selector | Active |
| `/cart`, `/checkout`, `/order-confirmation` | Cart context → Razorpay/bank-transfer checkout | Active |
| `/privacy-policy`, `/terms-and-conditions`, `/shipping-and-delivery`, `/cancellation-and-refund` | Legal pages | Active |
| `/admin` | Order dashboard (Supabase + XLSX export) | Internal |
| `/simulate-order`, `/test-order`, `/test-supabase` | Developer/debug utilities | Internal |
| `/api/*` | 12 route handlers (orders, payment, email, WhatsApp, debug) | Active |

## 3. Maintenance Blocker (critical)

`middleware.ts` matches **every path** (`/:path*`) and returns a hard-coded 503
"Website Service Suspended" HTML page. The entire site is unreachable.
Git history confirms this was deliberate ("Made site down"). **Must be deleted.**

## 4. Assets Inventory (all must be preserved)

- `public/images/farmers-dairy-logo.png` — green cow-illustration wordmark
- `public/images/Hero-slider-image-{1..4}.png` — farm/cow pasture photography
- `public/images/fd-500ml-milk.png`, `fd-1000ml-milk.png`, `fd-sample-milk.png` — branded glass bottle renders (gold cap, green label)
- Legacy duplicates: `public/images/{500ml,1000ml,sample}-milk.png`, root-level `/images/*` copies
- `public/cow-vacation.png` — maintenance-era illustration
- No farmer/employee portrait photos exist in the repo (nothing to lose, nothing to fabricate)

**Brand identity:** deep forest green `#2d5016`, fresh green `#7fb069`, mint `#e8f5e8`,
cream `#f8faf6`, dark green-gray text `#2c3e2d`. Phone 9363778989, email
info@farmersdairy.com, Hosur (Tamil Nadu), Facebook/Instagram/YouTube links,
"Designed by Onprimehub" credit.

## 5. Defects & Weaknesses Found

1. **Maintenance middleware** blocks the whole site (see §3).
2. **Hero slider background paths are relative** (`url('images/…')` without leading
   slash) — backgrounds break on any nested route and depend on trailing-slash behavior.
3. **react-day-picker v8/v9 mismatch**: `components/ui/calendar.tsx` uses the v8 API
   (`caption`, `nav_button`, `IconLeft`) while the lockfile pins **v9.7.0** — the shop
   date pickers render with broken styling and dead classNames.
4. **Razorpay checkout script loads on every page** from the root layout `<head>`,
   penalising first-load performance site-wide when only checkout needs it.
5. `crypto: "latest"` listed as an npm dependency — Node's built-in always wins;
   the package is dead weight.
6. `next.config.mjs` ignores TypeScript and ESLint errors; `images.unoptimized: true`.
7. Plain `<img>` tags (no lazy-loading, no dimensions → CLS risk) on home/shop.
8. SEO is minimal: no Open Graph, Twitter cards, canonical, structured data,
   robots.txt, or sitemap; only a title/description in the root layout.
9. Animations are one-shot CSS keyframes that all fire on page load (not scroll-triggered),
   `hover:scale-105` on every card, no `prefers-reduced-motion` support.
10. No skip-link; carousel controls lack labels; several icon buttons lack ARIA.

## 6. What Works Well (leave intact)

- Cart context, subscription pricing/holiday logic, checkout + Razorpay flow,
  contact form validation + Resend integration, admin dashboard, all API routes.
- Content copy is complete and grammatically sound — presentation is the weak layer.
