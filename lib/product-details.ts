/**
 * Per-product long-form content shown on the individual product detail pages
 * (routed at /shop/[slug]). Purchase controls live on the detail page itself
 * — this module only supplies the marketing copy and the id ↔ slug mapping.
 */

export type ProductVariant = { label: string; price: number }

export type ProductDetailContent = {
  /** URL slug used at /shop/[slug]. */
  slug: string
  /** Display name shown on the detail page. */
  name: string
  /** Product photo shown large at the top of the detail page. */
  image: string
  /** Display price string (e.g. "35 - 60" or "Coming Soon"). */
  price: string | number
  /** Optional variants for products with size choices. */
  variants?: ProductVariant[]
  /** Label used above the variant selector (defaults to "Choose Size"). */
  variantLabel?: string
  /** True for the actual Sample Pack — enables Cash on Delivery. */
  codEligible?: boolean
  /** True for products awaiting launch — hides purchase controls. */
  comingSoon?: boolean
  /** Category label (used for the breadcrumb / filter). */
  category: string
  /** One-sentence hero tagline shown under the product name. */
  tagline: string
  /** 2-4 short paragraphs describing the product. */
  paragraphs: string[]
  /** Key selling points shown as a bulleted list. */
  features: string[]
  /** Storage / freshness note shown in a callout. */
  freshness: string
  /** Delivery / packaging note shown in a callout. */
  delivery: string
}

/** Turn a product name into a URL-safe slug. */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

/** id → detail content. Product data (price, variants, image) still lives
 *  next to the shop product array; this map only supplies detail-page copy. */
export const productDetails: Record<number, ProductDetailContent> = {
  3: {
    slug: "sample-pack",
    name: "Sample Pack",
    image: "/images/sample-raw-cow-milk.png",
    price: "35 - 63",
    category: "Milk",
    codEligible: true,
    variantLabel: "Choose Quantity",
    variants: [
      { label: "500ml", price: 35 },
      { label: "1000ml", price: 63 },
    ],
    tagline: "Try & Taste our Milk with the Sample Pack.",
    paragraphs: [
      "New to Farmer's Dairy? Start with a single sample pack of our raw cow milk. It's the easiest way to taste the difference before you commit to a subscription.",
      "Every sample pack is filled and sealed the same morning it's delivered — the same milk our regular customers wake up to.",
    ],
    features: [
      "Two sizes: 500 ml (₹35) and 1000 ml (₹63)",
      "Unprocessed, unadulterated raw cow milk",
      "No preservatives, no antibiotics",
      "One-time purchase — no subscription required",
    ],
    freshness: "Please boil the milk within one hour of delivery.",
    delivery:
      "Free delivery in Hosur — order after 5 AM will be delivered from the next morning.",
  },
  1: {
    slug: "raw-cow-milk-500ml",
    name: "Raw Cow Milk 500ml",
    image: "/images/500ml-raw-cow-milk.png",
    price: 35,
    category: "Milk",
    tagline: "Each drop of Farmer's Dairy milk carries Purity & Trust.",
    paragraphs: [
      "Our 500 ml pack is sized for singles, couples, and small families who want farm-fresh milk without waste. Subscribe daily, weekly, or monthly and skip delivery on any day you're travelling.",
      "The milk is drawn from our own herd in Hosur, sealed at 2 AM in food-grade packets, and delivered to your door between 4 and 7 AM.",
    ],
    features: [
      "Unprocessed raw cow milk — 16g protein per pack",
      "No water, no preservatives, no antibiotics",
      "Weekly, monthly, or custom-range subscriptions",
      "Skip any day with the holiday selector — the subscription extends automatically",
    ],
    freshness: "Boil within one hour of delivery for best flavour and shelf life.",
    delivery: "Free delivery in Hosur (pincodes starting 6351).",
  },
  2: {
    slug: "raw-cow-milk-1000ml",
    name: "Raw Cow Milk 1000ml",
    image: "/images/1000ml-raw-cow-milk.png",
    price: 63,
    category: "Milk",
    tagline: "Each drop of Farmer's Dairy milk carries Purity & Trust.",
    paragraphs: [
      "The 1000 ml family pack is our most popular size — right-sized for families of three or more, and works beautifully for households that use milk for both drinking and cooking.",
      "Filled and sealed at 2 AM every morning, at your door before you're out of bed. Subscribe once and forget about the daily milk run.",
    ],
    features: [
      "Family-size 1 litre pack of raw cow milk",
      "16g protein per pack — nothing added",
      "Weekly, monthly, or custom-range subscriptions",
      "Holiday selector automatically extends the subscription",
    ],
    freshness: "Boil within one hour of delivery for best flavour and shelf life.",
    delivery: "Free delivery in Hosur (pincodes starting 6351).",
  },
  4: {
    slug: "organic-cow-ghee",
    name: "Organic Cow Ghee",
    image: "/images/organic-ghee.png",
    price: "629 - 1249",
    category: "Ghee",
    variantLabel: "Choose Size",
    variants: [
      { label: "1/2 litre", price: 629 },
      { label: "1 litre", price: 1249 },
    ],
    tagline: "Pure and Aromatic Organic Cow Ghee.",
    paragraphs: [
      "Slow-made in small batches from fresh organic cream, our cow ghee has the rich golden colour, granular texture and unmistakable aroma of ghee made the traditional way.",
      "It's a genuine kitchen upgrade — a spoonful over dosa or hot rice, a base for tempering, or a finishing touch for sweets. No hydrogenated oils, no additives, no shortcuts.",
    ],
    features: [
      "Made from fresh organic cream, extracted from our own milk",
      "Traditional slow-cook method — rich aroma and granular texture",
      "Two sizes: 1/2 litre (₹629) and 1 litre (₹1249)",
      "Prepaid orders only — Cash on Delivery not available",
    ],
    freshness: "Store in a cool, dry place. No refrigeration required.",
    delivery:
      "Free delivery in Hosur. Addresses outside Hosur have a ₹99 standard delivery fee.",
  },
  5: {
    slug: "organic-paneer",
    name: "Organic Paneer",
    image: "/images/organic-paneer.png",
    price: "159 - 719",
    category: "Paneer",
    variantLabel: "Choose Weight",
    variants: [
      { label: "200g", price: 159 },
      { label: "400g", price: 299 },
      { label: "1kg", price: 719 },
    ],
    tagline: "Soft and Healthy Paneer made fresh from Organic Cow milk.",
    paragraphs: [
      "Our paneer is set fresh from our own organic cow milk using lemon — no vinegar, no additives, no preservatives. The result is a soft, crumbly paneer that soaks up flavour without turning rubbery.",
      "Each pack comes with a little paneer water inside — the whey that keeps it fresh and gives you a nutritious head start for kneading dough or drinking on its own.",
    ],
    features: [
      "Set fresh with lemon from organic cow milk",
      "Comes with paneer water inside for freshness",
      "Three sizes: 200 g (₹159), 400 g (₹299), 1 kg (₹719)",
      "Prepaid orders only — Cash on Delivery not available",
    ],
    freshness: "Refrigerate on arrival. Best used within 3 days.",
    delivery: "Free delivery everywhere.",
  },
  6: {
    slug: "organic-butter",
    name: "Organic Butter",
    image: "/images/organic-butter.png",
    price: "249 - 449",
    category: "Butter",
    variantLabel: "Choose Size",
    variants: [
      { label: "250g", price: 249 },
      { label: "500g", price: 449 },
    ],
    tagline: "Churned fresh from organic cream.",
    paragraphs: [
      "White, soft and creamy — our butter is churned in small batches from fresh organic cream. Nothing added, nothing removed, just butter the way it used to be.",
      "It melts beautifully on hot dosas and idlis, gives baked goods a proper crumb, and works wonderfully in traditional South Indian dishes.",
    ],
    features: [
      "Churned from organic cream, no additives",
      "Soft, creamy, unsalted — versatile for cooking and baking",
      "Two sizes: 250 g (₹249) and 500 g (₹449)",
      "Prepaid orders only — Cash on Delivery not available",
    ],
    freshness: "Refrigerate on arrival. Best used within 7 days of opening.",
    delivery:
      "Free delivery in Hosur. Addresses outside Hosur have a ₹99 standard delivery fee.",
  },
  10: {
    slug: "honey",
    name: "Honey",
    image: "/images/honey.png",
    price: "Coming Soon",
    category: "Honey",
    comingSoon: true,
    tagline: "Raw, unprocessed, unfiltered honey — coming soon.",
    paragraphs: [
      "From happy bees to healthy families — our honey is raw, unprocessed, and unfiltered. Straight from the hive, straight to your table.",
      "We're finalising sourcing and packaging. Sign up for updates and we'll let you know as soon as it launches.",
    ],
    features: [
      "100% raw and unpasteurised",
      "Unfiltered — retains natural pollen and enzymes",
      "500 g glass jar",
    ],
    freshness: "Store in a cool, dry place. No refrigeration required.",
    delivery: "Delivery details will be announced at launch.",
  },
  9: {
    slug: "nutri-mix",
    name: "Nutri Mix",
    image: "/images/nutri-mix.png",
    price: "Coming Soon",
    category: "Mix",
    comingSoon: true,
    tagline: "Nourishing multi-grain nutri mix — coming soon.",
    paragraphs: [
      "A wholesome blend of grains, millets and seeds crafted for daily nutrition. Perfect for growing kids, working adults, and everyone in between.",
      "We're perfecting the recipe. Watch this space.",
    ],
    features: [
      "Multi-grain, high-protein blend",
      "Locally sourced, minimally processed",
      "Kid-friendly and easy to prepare",
    ],
    freshness: "Store in an airtight container in a cool, dry place.",
    delivery: "Delivery details will be announced at launch.",
  },
  8: {
    slug: "coconut-oil",
    name: "Coconut Oil",
    image: "/images/coconut-oil.png",
    price: "Coming Soon",
    category: "Oil",
    comingSoon: true,
    tagline: "Cold wood-pressed coconut oil — coming soon.",
    paragraphs: [
      "Traditional wood-pressed (chekku) coconut oil, made the slow, natural way. Rich in aroma, honest in taste, and true to how our grandmothers cooked with it.",
      "Coming to Farmer's Dairy soon.",
    ],
    features: [
      "Wood-pressed, cold-extracted",
      "No chemicals, no refinement",
      "For cooking, hair care, and skin care",
    ],
    freshness: "Store in a cool, dry place away from direct sunlight.",
    delivery: "Delivery details will be announced at launch.",
  },
  7: {
    slug: "groundnut-oil",
    name: "Groundnut Oil",
    image: "/images/groundnut-oil.png",
    price: "Coming Soon",
    category: "Oil",
    comingSoon: true,
    tagline: "Cold wood-pressed groundnut oil — coming soon.",
    paragraphs: [
      "Traditional wood-pressed (chekku) groundnut oil pressed from premium groundnuts. Chemical-free, unrefined, and rich in nutrients.",
      "Coming to Farmer's Dairy soon.",
    ],
    features: [
      "100% natural, chemical-free",
      "Cold wood-pressed for maximum flavour and nutrition",
      "Perfect for everyday South Indian cooking",
    ],
    freshness: "Store in a cool, dry place away from direct sunlight.",
    delivery: "Delivery details will be announced at launch.",
  },
}

/** All slugs (used by generateStaticParams). */
export const allProductSlugs = Object.values(productDetails).map((d) => d.slug)

/** Look up a product's detail content by slug. */
export function findBySlug(slug: string): { id: number; content: ProductDetailContent } | null {
  for (const [id, content] of Object.entries(productDetails)) {
    if (content.slug === slug) return { id: Number(id), content }
  }
  return null
}
