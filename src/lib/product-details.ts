export type ProductDetail = {
  intro: string;
  benefits: string[];
  nutrition: { label: string; value: string }[];
  usage: string[];
  storage: string;
  faqs: { q: string; a: string }[];
};

const milk: ProductDetail = {
  intro:
    "Our raw cow milk comes from indigenous cows that graze on open, chemical-free pasture around Hosur. It is milked at dawn, filtered, chilled and sealed within the hour — never homogenised, never standardised, never watered down. What reaches your door is milk exactly as the cow gave it.",
  benefits: [
    "Unhomogenised, so the cream naturally rises to the top",
    "No preservatives, no antibiotics, no added water",
    "Rich in A2 protein, calcium and natural fat",
    "Delivered within hours of milking, every single morning",
  ],
  nutrition: [
    { label: "Energy", value: "67 kcal / 100 ml" },
    { label: "Protein", value: "3.4 g" },
    { label: "Fat", value: "4.1 g" },
    { label: "Calcium", value: "120 mg" },
  ],
  usage: [
    "Boil once before use — raw milk is unpasteurised",
    "Skim the cream for homemade butter and ghee",
    "Perfect for filter coffee, curd setting and payasam",
  ],
  storage: "Refrigerate immediately on delivery and use within 24 hours of boiling.",
  faqs: [
    {
      q: "What time is the milk delivered?",
      a: "Before 7 AM every morning, at your doorstep in eco friendly packets.",
    },
    {
      q: "Can I pause my subscription?",
      a: "Yes. Use the skip-dates picker while ordering, or call us at 93637 78989 any time before 5 AM.",
    },
    {
      q: "Is the milk pasteurised?",
      a: "No. It is raw and unprocessed — please boil once before consuming.",
    },
  ],
};

export const productDetails: Record<string, ProductDetail> = {
  "raw-cow-milk-500ml": milk,
  "raw-cow-milk-1000ml": milk,
  "sample-pack": {
    ...milk,
    intro:
      "New to raw milk? The sample pack lets you taste a single morning's delivery before committing to a subscription. Same milk, same dawn milking, same eco friendly packet.",
  },
  "organic-cow-ghee": {
    intro:
      "Made the slow bilona way — fresh cream is cultured overnight, churned into butter, then simmered on a low flame until the milk solids turn golden and the kitchen fills with a nutty aroma. Nothing is rushed, and nothing is added.",
    benefits: [
      "Cultured cream, hand-churned and slow-simmered",
      "Deep golden grain with a natural nutty aroma",
      "High smoke point — ideal for everyday Indian cooking",
      "No palm oil, no vegetable fat, no colouring",
    ],
    nutrition: [
      { label: "Energy", value: "900 kcal / 100 g" },
      { label: "Total fat", value: "100 g" },
      { label: "Vitamin A", value: "Naturally present" },
      { label: "Trans fat", value: "0 g added" },
    ],
    usage: [
      "A spoon over hot rice, dosa or pongal",
      "Tempering dal, sweets and festive cooking",
      "Warm gently if it solidifies — that is a sign of purity",
    ],
    storage: "Store in a cool, dry place away from sunlight. Refrigeration is not required.",
    faqs: [
      {
        q: "Why does my ghee turn grainy?",
        a: "Graininess is natural in slow-cooked bilona ghee and is a marker of genuine cream, not a defect.",
      },
      { q: "How long does it keep?", a: "Six months from packing when kept dry and sealed." },
      { q: "Is it made from cow milk?", a: "Yes — only from our own organic cow milk cream." },
    ],
  },
  "organic-paneer": {
    intro:
      "Set fresh each morning with nothing but our organic cow milk and lemon juice. No vinegar, no chemical coagulants, no firming agents. It arrives sitting in its own paneer water so it stays soft until you cook it.",
    benefits: [
      "Set with lemon only, never chemical coagulants",
      "Packed in paneer water to keep it soft and moist",
      "High protein, made the same day it is delivered",
      "Crumbles clean and holds shape when pan-fried",
    ],
    nutrition: [
      { label: "Energy", value: "296 kcal / 100 g" },
      { label: "Protein", value: "18 g" },
      { label: "Fat", value: "22 g" },
      { label: "Carbohydrate", value: "3 g" },
    ],
    usage: [
      "Cube and sear for butter masala or tikka",
      "Crumble raw into parathas and salads",
      "Soak in warm water for five minutes for extra softness",
    ],
    storage: "Keep refrigerated in its water and use within three days of delivery.",
    faqs: [
      {
        q: "Why is there water in the pack?",
        a: "That is paneer water — it prevents the block from drying out and hardening.",
      },
      { q: "Can I freeze it?", a: "Yes, for up to a month, though the texture softens slightly." },
      { q: "Is it made daily?", a: "Yes, every batch is set the morning it goes out for delivery." },
    ],
  },
  "organic-butter": {
    intro:
      "Small-batch butter churned from fresh organic cream, with nothing else in it. Pale gold, soft enough to spread straight from the fridge, and made in quantities small enough that every batch is tasted before it leaves the farm.",
    benefits: [
      "Churned in small batches from fresh organic cream",
      "Creamy, spreadable texture with a clean finish",
      "No emulsifiers, no colouring, no preservatives",
      "Perfect for dosas, toast and home-made ghee",
    ],
    nutrition: [
      { label: "Energy", value: "717 kcal / 100 g" },
      { label: "Total fat", value: "81 g" },
      { label: "Protein", value: "0.9 g" },
      { label: "Added colour", value: "None" },
    ],
    usage: [
      "Spread on toast or melt over hot dosas",
      "Finish curries and gravies just before serving",
      "Simmer down at home for your own fresh ghee",
    ],
    storage: "Keep refrigerated and use within a week of delivery.",
    faqs: [
      { q: "Is it salted?", a: "No — it is unsalted, so you control the seasoning." },
      { q: "Why is the colour pale?", a: "Because no colouring is added; shade varies with the season's grazing." },
      { q: "Can I make ghee with it?", a: "Yes, it is ideal for home-made ghee." },
    ],
  },
};

export const fallbackDetail: ProductDetail = {
  intro:
    "This product is being readied on the farm right now. Same standards as everything else we make — sourced honestly, made slowly, and delivered fresh.",
  benefits: [
    "Sourced and made close to our Hosur farm",
    "No preservatives or artificial additives",
    "Small batches, checked before dispatch",
  ],
  nutrition: [],
  usage: ["Details will be published closer to launch."],
  storage: "Storage guidance will be shared at launch.",
  faqs: [
    {
      q: "When will this be available?",
      a: "Get in touch and we will let you know the moment it launches.",
    },
  ],
};
