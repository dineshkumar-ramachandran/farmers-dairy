# Farmers Dairy — Premium 3D Refactor Plan

## Guiding Rules

- **Preserve** every piece of business content: text, product data, prices, images,
  logo, brand colors, contact info, social links, legal pages, the Onprimehub credit.
- **Never touch** the money paths' logic: cart context, checkout, Razorpay, Supabase,
  email APIs. Presentation only.
- 3D and motion are **progressive enhancements**: SSR-safe, dynamically imported,
  disabled under `prefers-reduced-motion`, tuned for 60 fps.

## New Dependencies

| Package | Why |
| --- | --- |
| `framer-motion` | Scroll-triggered reveals, parallax, micro-interactions, page polish |
| `three` + `@react-three/fiber@8` + `@react-three/drei@9` | Real 3D hero: procedural glass milk bottle, milk particles, ambient light rig |
| `lenis` | Buttery smooth scrolling (cinematic feel) |
| `@types/three` (dev) | Type safety for the 3D layer |

## Architecture

```
components/
  motion/        Reveal, TextReveal, Parallax, AnimatedCounter, Magnetic,
                 TiltCard, Marquee, SmoothScroll (Lenis), SectionHeading
  three/         hero-canvas (dynamic wrapper) → hero-scene (bottle, milk
                 particles, lights, mouse rig)
  sections/      home: Hero, ProductShowcase, Story, Benefits, FarmGallery,
                 Testimonials, CTA  (each self-contained, content = existing copy)
  navigation / footer / floating-whatsapp  (redesigned in place)
lib/site.ts      single source of truth: contact info, socials, products, copy
```

## Workstream Detail

1. **Unblock the site** — delete `middleware.ts` entirely.
2. **Design system** — rewrite `globals.css` tokens & utilities (glass, gradient
   mesh, blobs, noise, grain), upgrade `.card`/`.btn-primary`/`.btn-secondary` so
   untouched pages (cart, checkout, policies, admin) inherit the premium look for
   free; add Fraunces display serif alongside Montserrat; global focus-visible
   rings + reduced-motion guards; fix scrollbar styling.
3. **Motion layer** — Framer Motion primitives + Lenis provider in root layout.
4. **3D hero** — R3F scene: lathe-profile glass bottle (transmission material),
   inner milk body, gold cap, instanced milk droplets, soft key/fill/rim lights,
   pointer-driven parallax. Canvas `dpr` capped, `frameloop` demand-friendly,
   dynamic import with elegant static fallback (mobile & reduced-motion).
5. **Home rebuild** — cinematic hero cycling all four existing slide messages
   (text preserved verbatim) over the existing pasture photography with slow-zoom
   + gradient veil; animated stats (2 AM / 4 AM / 7 AM freshness facts); product
   showcase with 3D-tilt glass cards (existing bottles); story section; benefits
   grid; **farm gallery** (masonry + lightbox) housing the four hero photographs;
   testimonial marquee (glass cards, existing quotes); CTA band.
6. **Navigation/Footer** — scroll-aware glass navbar, animated underline, morphing
   hamburger, cart pill; footer restyled dark-green premium, all links intact.
7. **About** — split layouts, floating shapes, animated freshness timeline,
   value cards with hover lift. Copy verbatim.
8. **Contact** — glass form card (logic untouched), floating contact icons,
   map reveal, FAQ cards, animated success state.
9. **Shop** — restyle cards, fix `calendar.tsx` to react-day-picker v9 API so
   date pickers work + look right. All booking logic untouched.
10. **Performance** — move Razorpay script from root layout to checkout only;
    `next/image` for above-fold imagery; dynamic-import 3D; remove dead `crypto`
    dep; font `display: swap`.
11. **SEO** — full metadata (OG/Twitter/canonical/keywords), LocalBusiness +
    Product JSON-LD, `app/robots.ts`, `app/sitemap.ts`, per-page metadata.
12. **Accessibility** — skip link, ARIA on all icon buttons/carousel controls,
    semantic sections + landmarks, focus rings, reduced-motion everywhere.
13. **Verification** — `next build` green, browser preview of all routes,
    console clean, mobile/tablet/desktop passes, refactor summary docs.

## Explicitly Out of Scope

- Admin, debug and API routes (working business tooling; presentation refresh
  arrives free via shared classes).
- Any change to prices, product definitions, legal copy, or contact details.
