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

export const heroSlides = [
  {
    id: 1,
    title: "Fresh Farm Milk",
    subtitle: "Delivered Daily",
    description:
      "Experience the pure taste of farm-fresh milk delivered straight to your doorstep.",
    image: "/images/Hero-slider-image-2.png",
    cta: "Start Subscription",
  },
  {
    id: 2,
    title: "100% Pure & Natural",
    subtitle: "No Preservatives",
    description:
      "Our cows graze on natural pastures, ensuring the highest quality and nutrition.",
    image: "/images/Hero-slider-image-2.png",
    cta: "Shop Now",
  },
  {
    id: 3,
    title: "Eco-Friendly Delivery",
    subtitle: "Glass Bottles",
    description:
      "We deliver milk in eco-friendly glass bottles to reduce environmental impact.",
    image: "/images/Hero-slider-image-3.png",
    cta: "Learn More",
  },
  {
    id: 4,
    title: "Farm to Table",
    subtitle: "Fresh Daily",
    description:
      "From our family farm to your family table, ensuring freshness in every drop.",
    image: "/images/Hero-slider-image-4.png",
    cta: "Order Now",
  },
] as const;

/**
 * Milk is now delivered in eco-friendly pouches (packaging updated from the
 * earlier glass bottles). Swap the .svg artwork for real product photos by
 * replacing these image paths once the photos are added to public/images.
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
    image: "/images/product-ghee.png",
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
    name: "Wood Pressed Oil",
    price: "Coming Soon",
    image: "/images/wood-pressed-oil.png",
    fallback: "/images/fd-ghee-jar.svg",
    description: "Cold wood-pressed oil — coming soon to Farmer's Dairy.",
    category: "Oil",
    comingSoon: true,
  },
] as const;

export const testimonials = [
  {
    name: "MS. NIRMALA",
    location: "Hosur",
    rating: 5,
    text: "Fat and Thickness of the milk is very good. Bottles are also well Cleaned.",
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
  { time: "2 AM", label: "Bottling and Sealing" },
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
    alt: "Fresh milk in eco-friendly glass bottles",
  },
  {
    src: "/images/Hero-slider-image-4.png",
    alt: "From our family farm to your family table",
  },
] as const;
