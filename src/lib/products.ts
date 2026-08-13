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
    isSubscription: true,
    variantLabel: "Choose Quantity",
    variants: [
      { label: "500ml", price: 35 },
      { label: "1000ml", price: 63 },
    ],
    note1: "Delivered fresh every morning before 7 AM.",
    note2: "No preservatives, no antibiotics, no added water.",
    categories: ["Milk", "Sample"],
    hero: `${IMG_BASE}/hero-milk.jpg`,
  },
  {
    id: 1,
    name: "Raw Cow Milk 500ml",
    price: 35,
    slug: "raw-cow-milk-500ml",
    image: `${IMG_BASE}/500ml-raw-cow-milk.png`,
    description: "Each drop of Farmer's Dairy milk carries Purity & Trust.",
    subscription: true,
    isSubscription: true,
    note1: "Subscribe weekly or monthly and skip any holiday dates.",
    note2: "Eco friendly packets, delivered to your doorstep.",
    categories: ["Milk", "Daily"],
    hero: `${IMG_BASE}/hero-milk.jpg`,
  },
  {
    id: 2,
    name: "Raw Cow Milk 1000ml",
    price: 63,
    slug: "raw-cow-milk-1000ml",
    image: `${IMG_BASE}/1000ml-raw-cow-milk.png`,
    description: "Each drop of Farmer's Dairy milk carries Purity & Trust.",
    subscription: true,
    isSubscription: true,
    note1: "Subscribe weekly or monthly and skip any holiday dates.",
    note2: "Eco friendly packets, delivered to your doorstep.",
    categories: ["Milk", "Daily"],
    hero: `${IMG_BASE}/hero-milk.jpg`,
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
    note1: "Made from fresh organic cream extracted from our organic milk.",
    note2: "Slow bilona-style cooking for a deep, nutty aroma.",
    categories: ["Ghee", "Staples"],
    hero: `${IMG_BASE}/hero-ghee.jpg`,
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
    hero: `${IMG_BASE}/hero-paneer.jpg`,
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
    note2: "Keep refrigerated and use within a week of delivery.",
    categories: ["Butter", "Fresh"],
    hero: `${IMG_BASE}/hero-butter.jpg`,
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

export const heroSlides = [
  {
    title: "Raw Cow Milk",
    subtitle: "From Farm to Home",
    description: "Unprocessed Organic Cow Milk directly from our Farm to your Home.",
    bullets: ["No Preservatives", "No Antibiotics"],
    cta: "Start Subscription",
    slug: "raw-cow-milk-1000ml",
    image: `${IMG_BASE}/hero-milk.jpg`,
  },
  {
    title: "Organic Cow Ghee",
    subtitle: "Pure & Aromatic",
    description:
      "Pure and Aromatic Organic Cow Ghee made from fresh Organic Cream, extracted from our Organic Milk.",
    bullets: [],
    cta: "Shop Ghee",
    slug: "organic-cow-ghee",
    image: `${IMG_BASE}/hero-ghee.jpg`,
  },
  {
    title: "Organic Paneer",
    subtitle: "Soft & Healthy",
    description:
      "Soft and Healthy Paneer made from Organic Cow milk & Lemon. Comes with paneer water inside.",
    bullets: [],
    cta: "Shop Paneer",
    slug: "organic-paneer",
    image: `${IMG_BASE}/hero-paneer.jpg`,
  },
  {
    title: "Organic Butter",
    subtitle: "Creamy & Fresh",
    description: "Churned from Organic Cream. Soft and creamy butter for tasty dosas.",
    bullets: [],
    cta: "Shop Butter",
    slug: "organic-butter",
    image: `${IMG_BASE}/hero-butter.jpg`,
  },
];
