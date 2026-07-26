/**
 * Single source of truth for Farmer's Dairy business content.
 * Every string here is the site's original copy — do not reword.
 */

export const siteConfig = {
  name: "Farmer's Dairy",
  tagline: "Fresh Farm Milk Delivered",
  description:
    "Premium quality farm-fresh milk delivered to your doorstep. Subscribe for daily, weekly, or monthly delivery.",
  url: "https://farmersdairy.in",
  phone: "9363778989",
  whatsapp: "919363778989",
  email: "info@farmersdairy.com",
  location: "Hosur, Tamil Nadu, India",
  deliveryHours: "Monday - Sunday, 4:00 AM - 7:00 AM",
  credit: "Designed by Onprimehub",
  socials: {
    facebook: "https://www.facebook.com/farmersdairy.in/",
    instagram: "https://www.instagram.com/farmersdairy.in/#",
    youtube: "https://www.youtube.com/@farmersdairy-28",
  },
} as const;

/**
 * Hero carousel — four product slides. Client content, verbatim.
 * Bullet lines are separated by `\n` so the hero component can render them
 * as a proper list.
 */
export const heroSlides = [
  {
    id: 1,
    eyebrow: "Farm Fresh · Organic",
    title: "Raw Cow Milk",
    description:
      "Unprocessed Organic Cow Milk directly from our Farm to your Home",
    bullets: ["No Preservatives", "No Antibiotics"],
    image: "/images/500ml-raw-cow-milk.png",
    cta: "Start Subscription",
    href: "/shop",
  },
  {
    id: 2,
    eyebrow: "Slow-made · Aromatic",
    title: "Organic Cow Ghee",
    description:
      "Pure and Aromatic Organic Cow Ghee made from fresh Organic Cream, extracted from our Organic Milk.",
    bullets: [],
    image: "/images/organic-ghee.png",
    cta: "Shop Ghee",
    href: "/shop",
  },
  {
    id: 3,
    eyebrow: "Soft · Fresh",
    title: "Organic Paneer",
    description:
      "Soft and Healthy Paneer made from Organic Cow milk & Lemon. Comes with paneer water inside.",
    bullets: [],
    image: "/images/organic-paneer.png",
    cta: "Shop Paneer",
    href: "/shop",
  },
  {
    id: 4,
    eyebrow: "Churned Fresh",
    title: "Organic Butter",
    description:
      "Churned from Organic Cream. Soft and creamy butter for tasty dosas.",
    bullets: [],
    image: "/images/organic-butter.png",
    cta: "Shop Butter",
    href: "/shop",
  },
] as const;

/**
 * Featured product grid on the home page. Order matches the client-approved
 * layout: milk sample → milk sizes → ghee → paneer → butter → coming-soon
 * oils and the healthy-mix blend.
 */
export const featuredProducts = [
  {
    id: 3,
    name: "Sample Pack",
    price: "35 - 60",
    image: "/images/sample-raw-cow-milk.png",
    fallback: "/images/fd-milk-pouch.svg",
    description: "Try & Taste our Milk with the Sample Pack.",
    category: "Milk",
    comingSoon: false,
  },
  {
    id: 1,
    name: "Raw Cow Milk 500ml",
    price: 35,
    image: "/images/500ml-raw-cow-milk.png",
    fallback: "/images/fd-milk-pouch.svg",
    description: "Each drop of Farmer's Dairy milk carries Purity & Trust.",
    category: "Milk",
    comingSoon: false,
  },
  {
    id: 2,
    name: "Raw Cow Milk 1000ml",
    price: 60,
    image: "/images/1000ml-raw-cow-milk.png",
    fallback: "/images/fd-milk-pouch.svg",
    description: "Each drop of Farmer's Dairy milk carries Purity & Trust.",
    category: "Milk",
    comingSoon: false,
  },
  {
    id: 4,
    name: "Organic Cow Ghee",
    price: "629 - 1249",
    image: "/images/organic-ghee.png",
    fallback: "/images/fd-ghee-jar.svg",
    description: "Pure organic cow ghee, slow-made from farm-fresh milk",
    category: "Ghee",
    comingSoon: false,
  },
  {
    id: 5,
    name: "Organic Paneer",
    price: "159 - 719",
    image: "/images/organic-paneer.png",
    fallback: "/images/fd-paneer.svg",
    description: "Soft, fresh paneer made from pure cow milk",
    category: "Paneer",
    comingSoon: false,
  },
  {
    id: 6,
    name: "Organic Butter",
    price: "249 - 449",
    image: "/images/organic-butter.png",
    fallback: "/images/fd-paneer.svg",
    description: "Creamy organic butter churned from farm-fresh cream",
    category: "Butter",
    comingSoon: false,
  },
  {
    id: 7,
    name: "Wood Pressed Groundnut Oil",
    price: "Coming Soon",
    image: "/images/wood-pressed-groundnut-oil.png",
    fallback: "/images/fd-ghee-jar.svg",
    description: "Cold wood-pressed groundnut oil — coming soon.",
    category: "Oil",
    comingSoon: true,
  },
  {
    id: 8,
    name: "Wood Pressed Coconut Oil",
    price: "Coming Soon",
    image: "/images/coconut-oil.png",
    fallback: "/images/fd-ghee-jar.svg",
    description: "Cold wood-pressed coconut oil — coming soon.",
    category: "Oil",
    comingSoon: true,
  },
  {
    id: 9,
    name: "Healthy Mix",
    price: "Coming Soon",
    image: "/images/health-mix.png",
    fallback: "/images/fd-ghee-jar.svg",
    description: "Nourishing multi-grain mix — coming soon.",
    category: "Mix",
    comingSoon: true,
  },
] as const;

export const testimonials = [
  {
    name: "MS. NIRMALA",
    location: "Hosur",
    rating: 5,
    text: "Fat and Thickness of the milk is very good. Packets are also well sealed.",
  },
  {
    name: "MR. LOKESH",
    location: "Hosur",
    rating: 5,
    text: "My mother certified your milk product She is happy. Thanks for your good product and service.",
  },
  {
    name: "MS. SELVA",
    location: "Hosur",
    rating: 5,
    text: "Milk taste very good sir My family members all liked your milk very much",
  },
] as const;

export const freshnessTimeline = [
  { time: "2 AM", label: "Packing and Sealing" },
  { time: "4 AM", label: "Delivery Starts" },
  { time: "7 AM", label: "Delivery Ends" },
] as const;

export const farmGallery = [
  {
    src: "/images/Hero-slider-image-2.png",
    alt: "Our cows on natural pastures",
  },
  {
    src: "/images/Hero-slider-image-3.png",
    alt: "Fresh milk in eco-friendly packets",
  },
  {
    src: "/images/Hero-slider-image-4.png",
    alt: "From our family farm to your family table",
  },
] as const;
