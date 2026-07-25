# Farmers Dairy — Refactor Summary

## 1. Refactor Summary

The site was rebuilt from a v0-generated template into a premium, 3D-interactive
brand experience while preserving every piece of business content: all copy,
prices, contact details, social links, legal pages, brand colors and the
Onprimehub credit. The maintenance middleware that 503'd every request was
deleted, so the site loads normally. Two new products were added — **Organic Cow
Ghee** (1/2 litre ₹629, 1 litre ₹1250) and **Fresh Paneer** (200g ₹159, 400g
₹318, 1kg ₹745) — and milk imagery was switched from glass bottles to the new
pouch packaging. `next build` completes with zero errors.

## 2. Architecture Overview

```
lib/site.ts               single source of truth (contact, socials, products,
                          slides, testimonials, timeline, gallery)
components/
  motion/                 Reveal/Stagger, TextReveal, Parallax, AnimatedCounter,
                          Magnetic, TiltCard, SectionHeading, SmoothScroll (Lenis)
  three/                  hero-canvas (responsive/reduced-motion gate, dynamic
                          import) → hero-scene (R3F floating dairy trio)
  sections/               home page sections: Hero, ProductShowcase, Story,
                          Benefits, FarmGallery, Testimonials, CTA
  navigation / footer     redesigned in place; cart/checkout/API logic untouched
```

The cart, checkout, Razorpay, Supabase and Resend flows were deliberately left
functionally intact; server clients are now created lazily inside handlers so
builds no longer require production secrets (missing keys degrade to handled
500 responses instead of module crashes).

## 3. Performance Improvements

- Razorpay script moved from the root layout (every page) to checkout only.
- 3D layer is dynamically imported (`ssr: false`), renders only on
  motion-friendly viewports ≥1024px, DPR capped at 1.75; mobile and
  reduced-motion users get a zero-WebGL static composition.
- All imagery via `next/image` with dimensions (no CLS) and lazy loading below
  the fold; SVG product artwork is vector (few KB each).
- Home first-load JS: 153 kB (3D chunk excluded, loads lazily).
- Dead `crypto` npm package removed; module-scope secret logging removed.

## 4. Animation Inventory

- **Hero**: crossfading pasture photography with Ken Burns zoom, word-by-word
  masked headline reveal cycling all four original slide messages, animated
  2/4/7 AM counters, magnetic CTAs, ambient blobs, scroll cue, 3D scene with
  pointer parallax.
- **3D scene**: floating milk pouch, ghee jar (physical glass material), paneer
  cubes, 28 orbiting milk droplets, contact shadows, procedural studio
  environment (no network HDR).
- **Scroll**: Lenis inertial smooth scrolling, viewport-triggered
  Reveal/Stagger on every section, parallax image drift, marquee testimonial
  loop with hover-pause, animated nav underline (layout animation), morphing
  hamburger, card hover lift + 3D tilt with glare, gallery lightbox with spring
  zoom, footer link slide-ins.
- Every animation is disabled or simplified under `prefers-reduced-motion`.

## 5. Components Added

`lib/site.ts`; `components/motion/*` (8 primitives); `components/three/*`
(canvas gate + scene); `components/sections/*` (7 home sections);
`app/robots.ts`; `app/sitemap.ts`; `app/shop/layout.tsx`;
`app/contact/layout.tsx`; brand SVG artwork `fd-milk-pouch.svg`,
`fd-ghee-jar.svg`, `fd-paneer.svg`.

## 6. Components Refactored

Navigation (glass sticky bar), Footer (dark premium), Home page, About,
Contact (logic intact), Shop (logic intact + variants + category filters),
`ui/calendar.tsx` (react-day-picker v8 → v9 API — date pickers were rendering
broken), cart-context (variant-aware merge/update/remove), checkout labels
("One-time purchase", per-day cost only for subscriptions), layout.tsx (fonts,
metadata, skip link, JSON-LD).

## 7. SEO Improvements

Full metadata with title template + canonical, Open Graph + Twitter cards,
LocalBusiness JSON-LD, robots.txt (admin/api/test routes disallowed),
sitemap.xml, per-page titles/descriptions, semantic landmarks.

## 8. Accessibility Improvements

Skip-to-content link, global focus-visible rings, ARIA labels on all icon
buttons/carousel controls/lightbox, `aria-current` nav state, keyboard
lightbox (Esc/arrows), form `aria-invalid` + `role="alert"` errors, star
ratings exposed via `role="img"` labels, reduced-motion support end-to-end,
decorative elements hidden from AT.

## 9. Lighthouse Expectations

- Performance: high 80s–95+ on desktop (3D is lazy and gated); mobile scores
  benefit from the WebGL-free fallback. Largest remaining cost: the original
  hero PNGs (`images.unoptimized: true` is kept because the hosting target is
  unknown — enabling the optimizer or pre-generating WebP would push higher).
- Accessibility / SEO / Best Practices: 95+ expected (labels, contrast on
  brand greens, metadata, no console errors).

## 10. Future Enhancement Suggestions

1. Replace the three SVG artwork files with real product photography — paths
   live only in `lib/site.ts` and `app/shop/page.tsx`.
2. Enable Next image optimization (or precompress hero PNGs to WebP) once the
   hosting platform is confirmed.
3. Copy still references "glass bottles" in the story/benefits/gallery text;
   update wording if pouch packaging is now universal (left untouched per the
   preserve-copy rule).
4. Persist cart to localStorage; add order history via Supabase auth.
5. Consider a GLB-modeled pouch/jar for the hero once real 3D assets exist.
6. Add `NEXT_PUBLIC_SUPABASE_*`/`RESEND_API_KEY`/`RAZORPAY_*` to the deploy
   environment — routes degrade gracefully without them but need keys to work.
