# Farmers Dairy — QA Validation Report

_Run: 2026-07-22 · production build (`next build` → `next start`) · driven as a
general user through the real UI (clicks, keyboard, form input)._

## Result: PASS — all critical journeys work; 2 cosmetic issues found and fixed during the run

## 1. Purchase Journey (critical path)

| # | Step | Expected | Result |
| --- | --- | --- | --- |
| 1 | Home loads | All sections render, no console errors | ✅ PASS |
| 2 | Shop → 5 products | Sample, 500ml, 1000ml, Ghee, Paneer with correct prices | ✅ PASS |
| 3 | Category filter "Ghee" | Only ghee card remains | ✅ PASS |
| 4 | Milk 500ml → pick delivery date (Jul 27) | Calendar opens, date selects, popover closes | ✅ PASS |
| 5 | Weekly price | Total ₹245 (₹35 × 7) | ✅ PASS |
| 6 | Holiday selector | Dialog restricted to subscription window (Jul 28–Aug 2 enabled only), "1 date(s) selected", badge "Jul 28 ×", "extended by 1 day(s)" | ✅ PASS |
| 7 | Holiday does not change price | Still ₹245 (end date extends instead) | ✅ PASS |
| 8 | Add to cart | Nav badge: "1 items, ₹245.00" | ✅ PASS |
| 9 | Paneer variant select (keyboard: Enter → ArrowDown → Enter) | Options 200g ₹159 / 400g ₹318 / 1kg ₹745; 400g selected | ✅ PASS |
| 10 | Add paneer 400g | Badge "2 items, ₹563.00" | ✅ PASS |
| 11 | Cart page | Milk: weekly Jul 28–Aug 04, holiday note, ₹245; Paneer: Size 400g ₹318; Total ₹563 | ✅ PASS |
| 12 | Quantity + / − on paneer | ₹881 → ₹563; milk line unaffected (variant-aware) | ✅ PASS |
| 13 | Checkout summary | Correct lines, dates, per-day cost only on subscription item | ✅ PASS |
| 14 | COD visibility rule | Hidden for mixed cart (subscription present) — as designed | ✅ PASS |
| 15 | Place Order gating | Disabled until form valid + payment chosen | ✅ PASS |
| 16 | Field validation | "Phone must be exactly 10 digits" appears on bad input | ✅ PASS |
| 17 | Razorpay order creation | `/api/create-razorpay-order` 200, amount 56300 paise = ₹563 (mock fallback without keys, real order with keys) | ✅ PASS |

## 2. Contact

- Invalid email → inline "valid email" error: ✅ PASS
- Valid submit without `RESEND_API_KEY` → friendly failure box, no crash: ✅ PASS
- Map iframe renders, 4 form fields present: ✅ PASS

## 3. Content & Pages

- About: mission/vision, values, 2/4/7 AM timeline, closing quote: ✅ PASS
- Terms / Privacy / Shipping / Cancellation: HTTP 200, restyled via shared classes: ✅ PASS
- Gallery filmstrip scrolls horizontally inside itself; lightbox keyboard accessible: ✅ PASS
- All original copy verified verbatim on home/about/shop: ✅ PASS

## 4. Responsive (375 px)

- Home, Shop, About, Contact: zero horizontal document overflow: ✅ PASS
- Hamburger visible, desktop nav hidden, mobile menu animates: ✅ PASS
- 3D scene replaced by static product composition below 1024px: ✅ PASS

## 5. Technical

- `next build`: zero errors, 33/33 pages: ✅ PASS
- Browser console: zero errors on every page visited: ✅ PASS
- robots.txt, sitemap.xml, LocalBusiness JSON-LD, OG image: ✅ PASS
- WebGL context creates cleanly at desktop width: ✅ PASS

## Issues found during QA (both fixed in this run)

1. **Cart labeled ghee/paneer "One-time sample"** → changed to "One-time
   purchase" ([cart/page.tsx](../app/cart/page.tsx)). Checkout had the same fix earlier.
2. **Earlier mobile run** had 80px horizontal overflow from decorative blobs /
   marquee — fixed via section-level clipping; re-verified 375px clean on all pages.

## Known environment caveats (not site bugs)

- Payment/email/order-persistence run in fallback/mock mode until
  `RAZORPAY_*`, `RESEND_API_KEY`, `SUPABASE_SERVICE_API_KEY` are configured in
  the deployment environment.
- Animated counters and scroll reveals are IntersectionObserver-driven; they
  were verified visually in a visible browser session (hidden-tab automation
  cannot trigger IO, which is a browser behavior, not a defect).
- Product artwork is brand-drawn SVG awaiting the real pouch/ghee photographs
  (paths swap in `lib/site.ts` + `app/shop/page.tsx`).
