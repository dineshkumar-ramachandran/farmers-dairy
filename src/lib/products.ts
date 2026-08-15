export const IMG_BASE =
  "https://raw.githubusercontent.com/dineshkumar-ramachandran/farmers-dairy/farmers-dairy/public/images";

export const LOGO = `${IMG_BASE}/farmers-dairy-logo.png`;

export const PHONE = "9363778989";
export const PHONE_PRETTY = "93637 78989";
export const EMAIL = "info@farmersdairy.com";
export const ADDRESS = "Hosur, Tamil Nadu";
export const WHATSAPP = "https://wa.me/919363778989?text=Hi%20Farmer%27s%20Dairy";

export const SOCIAL = {
  facebook: "https://www.facebook.com/farmersdairy.in/",
  instagram: "https://www.instagram.com/farmersdairy.in/#",
  youtube: "https://www.youtube.com/@farmersdairy-28",
};

export type Variant = { label: string; price: number };

export type Product = {
  id: number;
  name: string;
  price: number | string;
  slug: string;
  image: string;
  description: string;
  comingSoon?: boolean;
  variantLabel?: string;
  variants?: Variant[];
  subscription?: boolean;
  isSubscription?: boolean;
  note1: string;
  note2: string;
  categories: string[];
  hero?: string;
};

export const products: Product[] = [
  {
    id: 3,
    name: "Sample Pack",
    price: "₹35 – ₹63",
    slug: "sample-pack",
    image: `${IMG_BASE}/sample-raw-cow-milk.png`,
    description: "Try & Taste our Milk with the Sample Pack.",
    // One-time try-before-you-subscribe pack — no weekly/monthly plan
    isSubscription: false,
    variantLabel: "Choose Quantity",
    variants: [
      { label: "500ml", price: 35 },
      { label: "1000ml", price: 63 },
    ],
    note1: "Delivered fresh between 4 AM and 6:30 AM.",
    note2: "No preservatives, no antibiotics, no added water.",
    categories: ["Milk", "Sample"],
  },
  {
    id: 1,
    name: "Raw Cow Milk 500ml",
    price: 35,
    slug: "raw-cow-milk-500ml",
    image: `${IMG_BASE}/500ml-raw-cow-milk.png`,
    description: "Hygienically sourced organic Cow Milk directly from the farm to your home.",
    subscription: true,
    isSubscription: true,
    note1: "Untouched by human hands from milking to packing.",
    note2: "Delivered between 4 AM and 6:30 AM in eco friendly packets.",
    categories: ["Milk", "Daily"],
  },
  {
    id: 2,
    name: "Raw Cow Milk 1000ml",
    price: 63,
    slug: "raw-cow-milk-1000ml",
    image: `${IMG_BASE}/1000ml-raw-cow-milk.png`,
    description: "Hygienically sourced organic Cow Milk directly from the farm to your home.",
    subscription: true,
    isSubscription: true,
    note1: "Untouched by human hands from milking to packing.",
    note2: "Delivered between 4 AM and 6:30 AM in eco friendly packets.",
    categories: ["Milk", "Daily"],
  },
  {
    id: 4,
    name: "Organic Cow Ghee",
    price: "₹629 – ₹1249",
    slug: "organic-cow-ghee",
    image: `${IMG_BASE}/organic-ghee.png`,
    description: "Pure organic cow ghee, slow-made from farm-fresh milk.",
    variantLabel: "Choose Size",
    variants: [
      { label: "1/2 litre", price: 629 },
      { label: "1 litre", price: 1249 },
    ],
    note1: "Made from Pure & Organic Butter churned from fresh cream.",
    note2: "Slow-made for a rich taste and deep, nutty aroma.",
    categories: ["Ghee", "Staples"],
  },
  {
    id: 5,
    name: "Organic Paneer",
    price: "₹159 – ₹719",
    slug: "organic-paneer",
    image: `${IMG_BASE}/organic-paneer.png`,
    description:
      "Soft and Healthy Paneer made from Organic Cow milk & Lemon. Comes with paneer water inside.",
    variantLabel: "Choose Weight",
    variants: [
      { label: "200g", price: 159 },
      { label: "400g", price: 299 },
      { label: "1kg", price: 719 },
    ],
    note1: "Set with lemon only, never with chemical coagulants.",
    note2: "Packed with paneer water inside to keep it soft.",
    categories: ["Paneer", "Fresh"],
  },
  {
    id: 6,
    name: "Organic Butter",
    price: "₹249 – ₹449",
    slug: "organic-butter",
    image: `${IMG_BASE}/organic-butter.png`,
    description: "Churned from Organic Cream. Soft and creamy butter for tasty dosas.",
    variantLabel: "Choose Size",
    variants: [
      { label: "250g", price: 249 },
      { label: "500g", price: 449 },
    ],
    note1: "Churned in small batches from fresh organic cream.",
    note2: "Keep refrigerated at all times to avoid off-smell.",
    categories: ["Butter", "Fresh"],
  },
  {
    id: 10,
    name: "Honey",
    price: "Coming Soon",
    slug: "honey",
    image: `${IMG_BASE}/honey.png`,
    description: "Raw, unprocessed, unfiltered honey — coming soon.",
    comingSoon: true,
    note1: "Sourced from hives near our grazing land.",
    note2: "Raw, unprocessed and unfiltered.",
    categories: ["Pantry"],
  },
  {
    id: 9,
    name: "Nutri Mix",
    price: "Coming Soon",
    slug: "nutri-mix",
    image: `${IMG_BASE}/nutri-mix.png`,
    description: "Nourishing multi-grain nutri mix — coming soon.",
    comingSoon: true,
    note1: "A nourishing multi-grain blend for daily strength.",
    note2: "Stone milled in small batches.",
    categories: ["Pantry"],
  },
  {
    id: 8,
    name: "Coconut Oil",
    price: "Coming Soon",
    slug: "coconut-oil",
    image: `${IMG_BASE}/coconut-oil.png`,
    description: "Cold wood-pressed coconut oil — coming soon.",
    comingSoon: true,
    note1: "Cold wood-pressed in a traditional chekku.",
    note2: "Unrefined, with the natural aroma retained.",
    categories: ["Oils"],
  },
  {
    id: 7,
    name: "Groundnut Oil",
    price: "Coming Soon",
    slug: "groundnut-oil",
    image: `${IMG_BASE}/groundnut-oil.png`,
    description: "Cold wood-pressed groundnut oil — coming soon.",
    comingSoon: true,
    note1: "Cold wood-pressed in a traditional chekku.",
    note2: "Unrefined, with the natural aroma retained.",
    categories: ["Oils"],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const basePrice = (p: Product) =>
  typeof p.price === "number" ? p.price : (p.variants?.[0]?.price ?? 0);

export const inr = (n: number) =>
  `₹${n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// Hero uses the *transparent* product PNGs from the farmers-dairy branch so
// the products sit directly on the cream site background — no rectangular
// beige frame like the earlier hero-desktop composites had. IMG_BASE already
// points at the right place; we just reuse it.
const HERO_ART_BASE = IMG_BASE;

export type HeroSlide = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  cta: string;
  href: string;
  imageDesktop: string;
  imageMobile: string;
  alt: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "milk",
    eyebrow: "From Farm to Home",
    title: "Fresh Cow Milk",
    description:
      "Pure, fresh cow milk delivered from our farm to your doorstep every morning.",
    bullets: ["No Preservatives", "No Antibiotics"],
    cta: "Start Subscription",
    href: "/shop/raw-cow-milk-1000ml",
    imageDesktop: `${HERO_ART_BASE}/1000ml-raw-cow-milk.png`,
    imageMobile: `${HERO_ART_BASE}/1000ml-raw-cow-milk.png`,
    alt: "Farmer's Dairy fresh cow milk",
  },
  {
    id: "ghee",
    eyebrow: "Pure & Traditional",
    title: "Organic Cow Ghee",
    description:
      "Slowly crafted from pure organic cow milk for rich flavour, aroma and everyday goodness.",
    bullets: ["Slow-Made Bilona Style", "Rich & Nutty Aroma"],
    cta: "Shop Ghee",
    href: "/shop/organic-cow-ghee",
    imageDesktop: `${HERO_ART_BASE}/organic-ghee.png`,
    imageMobile: `${HERO_ART_BASE}/organic-ghee.png`,
    alt: "Farmer's Dairy organic cow ghee",
  },
  {
    id: "butter",
    eyebrow: "Creamy & Fresh",
    title: "Organic Butter",
    description:
      "Soft, creamy butter churned from organic cream for delicious everyday meals.",
    bullets: ["Small-Batch Churned", "No Colouring, No Additives"],
    cta: "Shop Butter",
    href: "/shop/organic-butter",
    imageDesktop: `${HERO_ART_BASE}/organic-butter.png`,
    imageMobile: `${HERO_ART_BASE}/organic-butter.png`,
    alt: "Farmer's Dairy organic butter",
  },
  {
    id: "paneer",
    eyebrow: "Soft & Healthy",
    title: "Organic Paneer",
    description:
      "Soft and fresh organic paneer made from pure cow milk, perfect for everyday cooking.",
    bullets: ["Set with Lemon Only", "Packed in Paneer Water"],
    cta: "Shop Paneer",
    href: "/shop/organic-paneer",
    imageDesktop: `${HERO_ART_BASE}/organic-paneer.png`,
    imageMobile: `${HERO_ART_BASE}/organic-paneer.png`,
    alt: "Farmer's Dairy organic malai paneer",
  },
];
