"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Minus,
  Plus,
  ShoppingCart,
  CalendarIcon,
  Info,
  AlertTriangle,
  LayoutGrid,
  List,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, differenceInDays, addDays } from "date-fns";
import type { DateRange } from "react-day-picker";
import { useCart } from "@/components/cart-context";
import { useRouter } from "next/navigation";
import { HolidaySelector } from "@/components/holiday-selector";

interface ProductVariant {
  label: string;
  price: number;
}

// Typed loosely on purpose — the page's handlers already treat products as `any`
const products: any[] = [
  {
    id: 3,
    name: "Sample Pack",
    price: "35 - 60",
    image: "/images/sample-raw-cow-milk.png",
    description: "Try & Taste our Milk with the Sample Pack.",
    details: {
      note1:
        "Sample pack allows you to try our fresh milk before committing to a subscription.",
      note2: "Choose between 500ml (₹35) or 1000ml (₹60) sample packs.",
      categories: ["Booking", "Raw Cow Milk", "Sample"],
    },
    isSample: true,
    category: "Milk",
    ctaLabel: "Get Sample",
    variantLabel: "Choose Quantity",
    variants: [
      { label: "500ml", price: 35 },
      { label: "1000ml", price: 60 },
    ] as ProductVariant[],
  },
  {
    id: 1,
    name: "Raw Cow Milk 500ml",
    price: 35,
    image: "/images/500ml-raw-cow-milk.png",
    description: "Each drop of Farmer's Dairy milk carries Purity & Trust.",
    details: {
      note1:
        "If the milk is not delivered to you on any day after weekly or monthly subscription, the payments will be adjusted to the upcoming week or month.",
      note2:
        "Kindly note if you are ordering after 5 AM on the respective day please select the next day as your first day.",
      categories: ["Booking", "Raw Cow Milk"],
    },
    category: "Milk",
  },
  {
    id: 2,
    name: "Raw Cow Milk 1000ml",
    price: 60,
    image: "/images/1000ml-raw-cow-milk.png",
    description: "Each drop of Farmer's Dairy milk carries Purity & Trust.",
    details: {
      note1:
        "If the milk is not delivered to you on any day after weekly or monthly subscription, the payments will be adjusted to the upcoming week or month.",
      note2:
        "Kindly note if you are ordering after 5 AM on the respective day please select the next day as your first day.",
      categories: ["Booking", "Raw Cow Milk"],
    },
    category: "Milk",
  },
  {
    id: 4,
    name: "Organic Cow Ghee",
    price: "629 - 1249",
    image: "/images/organic-ghee.png",
    description: "Pure organic cow ghee, slow-made from farm-fresh milk",
    details: {
      note1:
        "Our organic cow ghee is prepared from pure farm-fresh cow milk without any additives.",
      note2: "Choose between 1/2 litre (₹629) or 1 litre (₹1249) jars.",
      categories: ["Ghee", "Organic"],
    },
    isSample: true,
    category: "Ghee",
    ctaLabel: "Order Now",
    variantLabel: "Choose Size",
    variants: [
      { label: "1/2 litre", price: 629 },
      { label: "1 litre", price: 1249 },
    ] as ProductVariant[],
  },
  {
    id: 5,
    name: "Organic Paneer",
    price: "159 - 719",
    image: "/images/organic-paneer.png",
    description: "Soft, fresh paneer made from pure cow milk",
    details: {
      note1:
        "Our paneer is made fresh from pure cow milk for the softest texture.",
      note2: "Choose between 200g (₹159), 400g (₹299) or 1kg (₹719) packs.",
      categories: ["Paneer", "Organic"],
    },
    isSample: true,
    category: "Paneer",
    ctaLabel: "Order Now",
    variantLabel: "Choose Weight",
    variants: [
      { label: "200g", price: 159 },
      { label: "400g", price: 299 },
      { label: "1kg", price: 719 },
    ] as ProductVariant[],
  },
  {
    id: 6,
    name: "Organic Butter",
    price: "249 - 449",
    image: "/images/organic-butter.png",
    description: "Creamy organic butter churned from farm-fresh cream",
    details: {
      note1:
        "Our organic butter is churned from pure farm-fresh cream — rich, wholesome and additive-free.",
      note2: "Choose between 250g (₹249) or 500g (₹449) packs.",
      categories: ["Butter", "Organic"],
    },
    isSample: true,
    category: "Butter",
    ctaLabel: "Order Now",
    variantLabel: "Choose Size",
    variants: [
      { label: "250g", price: 249 },
      { label: "500g", price: 449 },
    ] as ProductVariant[],
  },
  {
    id: 7,
    name: "Wood Pressed Groundnut Oil",
    price: "Coming Soon",
    image: "/images/wood-pressed-groundnut-oil.png",
    description: "Cold wood-pressed groundnut oil — coming soon.",
    details: {
      note1:
        "Traditional wood-pressed (chekku) groundnut oil, made the slow, natural way.",
      note2: "Launching soon — stay tuned.",
      categories: ["Oil", "Organic"],
    },
    category: "Oil",
    comingSoon: true,
  },
  {
    id: 8,
    name: "Wood Pressed Coconut Oil",
    price: "Coming Soon",
    image: "/images/coconut-oil.png",
    description: "Cold wood-pressed coconut oil — coming soon.",
    details: {
      note1:
        "Traditional wood-pressed (chekku) coconut oil, made the slow, natural way.",
      note2: "Launching soon — stay tuned.",
      categories: ["Oil", "Organic"],
    },
    category: "Oil",
    comingSoon: true,
  },
  {
    id: 9,
    name: "Healthy Mix",
    price: "Coming Soon",
    image: "/images/health-mix.png",
    description: "Nourishing multi-grain mix — coming soon.",
    details: {
      note1:
        "A wholesome multi-grain mix crafted for daily nutrition.",
      note2: "Launching soon — stay tuned.",
      categories: ["Mix", "Wellness"],
    },
    category: "Mix",
    comingSoon: true,
  },
];

const categories = ["All", "Milk", "Ghee", "Paneer", "Butter", "Oil", "Mix"];

export default function ShopPage() {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [subscriptions, setSubscriptions] = useState<{ [key: number]: string }>(
    {}
  );
  const [deliveryDates, setDeliveryDates] = useState<{
    [key: number]: Date | undefined;
  }>({});
  const [dateRanges, setDateRanges] = useState<{
    [key: number]: DateRange | undefined;
  }>({});
  const [sampleSizes, setSampleSizes] = useState<{ [key: number]: string }>({});
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [holidays, setHolidays] = useState<{ [key: number]: Date[] }>({});
  const [showTimeAlert, setShowTimeAlert] = useState(false);
  const [openCalendars, setOpenCalendars] = useState<{
    [key: number]: boolean;
  }>({});

  const { addToCart, items } = useCart();
  const router = useRouter();

  // Which variant of a product is currently selected (undefined for plain milk).
  const selectedVariant = (product: any): string | undefined =>
    product.variants?.length
      ? sampleSizes[product.id] ?? product.variants[0].label
      : sampleSizes[product.id];

  // Is the product (with its currently-selected size) already in the cart?
  const isInCart = (product: any) =>
    items.some(
      (i) => i.id === product.id && i.sampleSize === selectedVariant(product)
    );

  // Silences Chrome’s benign ResizeObserver loop error so it never reaches the console
  useEffect(() => {
    const handler = (e: ErrorEvent) => {
      const msg = e?.message || "";
      if (
        msg.includes("ResizeObserver loop") ||
        msg.includes("ResizeObserver loop limit exceeded")
      ) {
        e.stopImmediatePropagation();
      }
    };
    window.addEventListener("error", handler);
    return () => window.removeEventListener("error", handler);
  }, []);

  const updateQuantity = (productId: number, change: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + change),
    }));
  };

  const getQuantity = (productId: number) => quantities[productId] || 1;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isCustomSubscription = (productId: number) =>
    subscriptions[productId] === "custom";

  const checkTimeRestriction = (selectedDate: Date) => {
    const now = new Date();
    const isToday = selectedDate.toDateString() === now.toDateString();
    const currentHour = now.getHours();

    if (isToday && currentHour >= 5) {
      setShowTimeAlert(true);
      return false;
    }
    return true;
  };

  const calculateTotalDays = (dateRange: DateRange | undefined) => {
    if (!dateRange?.from || !dateRange?.to) return 0;
    return differenceInDays(dateRange.to, dateRange.from) + 1;
  };

  const calculateSubscriptionDays = (subscription: string) => {
    switch (subscription) {
      case "weekly":
        return 7;
      case "monthly":
        return 30;
      default:
        return 0;
    }
  };

  const calculateEndDate = (
    startDate: Date,
    subscription: string,
    holidayCount = 0
  ) => {
    const days = calculateSubscriptionDays(subscription);
    if (days > 0) {
      const endDate = addDays(startDate, days - 1 + holidayCount);
      return endDate;
    }
    return startDate;
  };

  // Resolve the price for a product, honouring its selected variant if any
  const getVariantPrice = (product: any, selected?: string): number => {
    if (product.variants?.length) {
      const variant =
        product.variants.find((v: ProductVariant) => v.label === selected) ??
        product.variants[0];
      return variant.price;
    }
    return typeof product.price === "number" ? product.price : 0;
  };

  const calculateTotalPrice = (
    product: any,
    subscription: string,
    dateRange?: DateRange,
    holidayCount = 0
  ) => {
    let price = product.price;
    if (product.isSample) {
      price = getVariantPrice(product, sampleSizes[product.id]);
    }

    if (subscription === "custom" && dateRange?.from && dateRange?.to) {
      const days = calculateTotalDays(dateRange);
      return price * days;
    } else if (subscription === "weekly" || subscription === "monthly") {
      const days = calculateSubscriptionDays(subscription);
      return price * days;
    }

    return price;
  };

  // Check if date is selected for a product
  const isDateSelected = (productId: number) => {
    if (isCustomSubscription(productId)) {
      return dateRanges[productId]?.from && dateRanges[productId]?.to;
    } else {
      return !!deliveryDates[productId];
    }
  };

  const handleDateSelect = (productId: number, date: Date | undefined) => {
    setDeliveryDates((prev) => ({ ...prev, [productId]: date }));
    // Auto-close calendar when date is selected
    if (date) {
      setOpenCalendars((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const handleDateRangeSelect = (
    productId: number,
    range: DateRange | undefined
  ) => {
    setDateRanges((prev) => ({ ...prev, [productId]: range }));
    // Auto-close calendar when both dates are selected
    if (range?.from && range?.to) {
      setOpenCalendars((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const handleAddToCart = (product: any) => {
    const quantity = getQuantity(product.id);
    const subscription = subscriptions[product.id] || "weekly";
    const deliveryDate = deliveryDates[product.id];
    const dateRange = dateRanges[product.id];
    // Fall back to the first variant so the cart always records a size
    const sampleSize = product.variants?.length
      ? sampleSizes[product.id] ?? product.variants[0].label
      : sampleSizes[product.id];
    const productHolidays = holidays[product.id] || [];

    // Check if date is selected for non-sample products
    if (!product.isSample && !isDateSelected(product.id)) {
      alert("Please select a delivery date before adding to cart.");
      return;
    }

    // Time validation for non-sample products
    if (!product.isSample) {
      if (subscription !== "custom" && deliveryDate) {
        if (!checkTimeRestriction(deliveryDate)) return;
      }
      if (subscription === "custom" && dateRange?.from) {
        if (!checkTimeRestriction(dateRange.from)) return;
      }
    }

    let price = product.price;
    if (product.isSample) {
      price = getVariantPrice(product, sampleSize);
    }

    const totalPrice = calculateTotalPrice(
      product,
      subscription,
      dateRange,
      productHolidays.length
    );
    const adjustedEndDate = deliveryDate
      ? calculateEndDate(deliveryDate, subscription, productHolidays.length)
      : undefined;

    // Calculate total days properly
    let totalDays = 1; // Default for samples
    if (!product.isSample) {
      if (subscription === "custom") {
        totalDays = calculateTotalDays(dateRange);
      } else {
        totalDays = calculateSubscriptionDays(subscription);
      }
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      price: typeof price === "number" ? price : 35,
      quantity,
      subscription: product.isSample ? "sample" : subscription,
      deliveryDate,
      dateRange,
      sampleSize,
      totalDays,
      holidays: productHolidays,
      adjustedEndDate,
      totalPrice: product.isSample
        ? typeof price === "number"
          ? price
          : 35
        : totalPrice,
    };

    addToCart(cartItem);
  };

  const handleSubscribeNow = (product: any) => {
    // Check if date is selected for non-sample products
    if (!product.isSample && !isDateSelected(product.id)) {
      alert("Please select a delivery date before subscribing.");
      return;
    }

    const subscription = subscriptions[product.id] || "weekly";
    const deliveryDate = deliveryDates[product.id];
    const dateRange = dateRanges[product.id];

    // Time validation for non-sample products
    if (!product.isSample) {
      if (subscription !== "custom" && deliveryDate) {
        if (!checkTimeRestriction(deliveryDate)) return;
      }
      if (subscription === "custom" && dateRange?.from) {
        if (!checkTimeRestriction(dateRange.from)) return;
      }
    }

    handleAddToCart(product);
    router.push("/cart");
  };

  const handleGetSample = (product: any) => {
    handleAddToCart(product);
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen py-8 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="absolute -top-24 right-[-8rem] w-96 h-96 blob animate-blob bg-mint/20 pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative mb-12 pt-8">
          <div className="flex items-center gap-4 mb-6">
            <span className="section-num" aria-hidden="true">
              Shop
            </span>
            <span className="eyebrow">Farm Fresh · Delivered Daily</span>
          </div>
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-end">
            <h1 className="display-hero text-5xl sm:text-6xl">
              Our Fresh{" "}
              <span className="italic text-gradient-green">Products</span>
            </h1>
            <p className="text-lg text-text/70 leading-relaxed lg:pb-1.5">
              Choose from our selection of farm-fresh milk products and set up
              your convenient delivery subscription.
            </p>
          </div>
        </div>

        {/* Time Alert Dialog */}
        <Dialog open={showTimeAlert} onOpenChange={setShowTimeAlert}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center text-orange-600">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Order Time Notice
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-text">
                Kindly note if you are ordering after 5 AM on the respective day
                please select the next day as your first day. If you need today
                check with us for stock availability through WhatsApp or call -{" "}
                <strong>9363778989</strong>
              </p>
              <Button
                onClick={() => setShowTimeAlert(false)}
                className="btn-primary w-full">
                Understood
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Category filters + view toggle */}
        <div className="rule flex flex-wrap items-center justify-between gap-4 mb-12 pt-6">
          <div
            className="flex flex-wrap items-center gap-2"
            role="group"
            aria-label="Filter products by category">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
                className={`rounded-full px-5 py-2 text-[12px] font-bold uppercase tracking-[0.14em] transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-green text-cream -translate-y-0.5 shadow-soft"
                    : "bg-transparent text-text/60 border-[1.5px] border-green/25 hover:border-green hover:text-green"
                }`}>
                {category}
              </button>
            ))}
          </div>
          <div
            className="flex items-center gap-1 rounded-full border-[1.5px] border-green/25 p-1"
            role="group"
            aria-label="Choose product view">
            <button
              onClick={() => setViewMode("grid")}
              aria-pressed={viewMode === "grid"}
              aria-label="Grid view"
              className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                viewMode === "grid" ? "bg-green text-cream" : "text-text/60 hover:text-green"
              }`}>
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              aria-pressed={viewMode === "list"}
              aria-label="List view"
              className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                viewMode === "list" ? "bg-green text-cream" : "text-text/60 hover:text-green"
              }`}>
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          className={
            viewMode === "list"
              ? "grid grid-cols-1 gap-6 max-w-3xl mx-auto"
              : "grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8"
          }>
          {products
            .filter(
              (product) =>
                activeCategory === "All" || product.category === activeCategory
            )
            .map((product, index) =>
            product.comingSoon ? (
              <Card
                key={product.id}
                className="card group border-0 !p-0 overflow-hidden animate-slide-up opacity-95"
                style={{ animationDelay: `${index * 0.12}s` }}>
                <CardHeader className={viewMode === "grid" ? "text-center pb-2 !p-3" : "text-center pb-4"}>
                  <div className={`relative w-full mb-3 mx-auto flex items-center justify-center ${viewMode === "grid" ? "h-32 sm:h-44 p-2" : "h-64 p-4"}`}>
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/images/fd-ghee-jar.svg";
                      }}
                      className="relative max-w-full max-h-full object-contain mix-blend-multiply opacity-80"
                    />
                  </div>
                  <CardTitle className={`font-display font-semibold text-text ${viewMode === "grid" ? "text-sm sm:text-base leading-snug" : "text-xl sm:text-2xl"}`}>
                    {product.name}
                  </CardTitle>
                  {viewMode === "list" && (
                    <p className="text-text text-sm opacity-80">
                      {product.description}
                    </p>
                  )}
                </CardHeader>
                <CardContent className={viewMode === "grid" ? "!px-3 !pt-0 !pb-4" : ""}>
                  <div className={`flex flex-col items-center gap-3 ${viewMode === "grid" ? "py-2" : "py-10"}`}>
                    <span className="chip text-sm">Coming Soon</span>
                    {viewMode === "list" && (
                      <p className="text-sm text-text/70 text-center px-4">
                        {product.details.note2}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
            <Card
              key={product.id}
              className="card group border-0 !p-0 overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 0.12}s` }}>
              <CardHeader className={viewMode === "grid" ? "text-center pb-2 !p-3" : "text-center pb-4"}>
                <div className={`relative w-full mb-3 mx-auto flex items-center justify-center ${viewMode === "grid" ? "h-32 sm:h-44 p-2" : "h-64 p-4"}`}>
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    loading="lazy"
                    className="relative max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardTitle className={`font-display font-semibold text-text ${viewMode === "grid" ? "text-sm sm:text-base leading-snug" : "text-xl sm:text-2xl"}`}>
                  {product.name}
                </CardTitle>
                {viewMode === "list" && (
                  <p className="text-text text-sm opacity-80">
                    {product.description}
                  </p>
                )}
                <div className={`font-display font-semibold text-green ${viewMode === "grid" ? "text-base sm:text-lg mt-1" : "text-2xl"}`}>
                  ₹{product.price}
                </div>

                {viewMode === "list" && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-green hover:text-text">
                        <Info className="w-4 h-4 mr-1" />
                        Product Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>{product.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p className="text-sm text-text">
                          {product.details.note1}
                        </p>
                        <p className="text-sm text-text">
                          {product.details.note2}
                        </p>
                        <div>
                          <h4 className="font-medium text-text mb-2">
                            Categories:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {product.details.categories.map((category, idx) => (
                              <span
                                key={idx}
                                className="bg-mint-light text-text px-2 py-1 rounded-full text-xs">
                                {category}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </CardHeader>

              {viewMode === "grid" ? (
                <CardContent className="!px-3 !pt-0 !pb-3">
                  <Button
                    onClick={() => setViewMode("list")}
                    className="btn-primary w-full text-xs sm:text-sm !py-2.5 !px-3">
                    <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
                    Order
                  </Button>
                </CardContent>
              ) : (
              <CardContent className="space-y-4">
                {/* Variant Size Selection (sample pack, ghee, paneer) */}
                {product.variants?.length && (
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      {product.variantLabel || "Choose Quantity"}
                    </label>
                    <Select
                      value={
                        sampleSizes[product.id] || product.variants[0].label
                      }
                      onValueChange={(value) =>
                        setSampleSizes((prev) => ({
                          ...prev,
                          [product.id]: value,
                        }))
                      }>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        {product.variants.map((variant) => (
                          <SelectItem key={variant.label} value={variant.label}>
                            {variant.label} - ₹{variant.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Quantity Selector */}
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center justify-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(product.id, -1)}
                      className="w-8 h-8 p-0 rounded-full hover:bg-mint-light transition-colors duration-300">
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="text-lg font-medium w-8 text-center">
                      {getQuantity(product.id)}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(product.id, 1)}
                      className="w-8 h-8 p-0 rounded-full hover:bg-mint-light transition-colors duration-300">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Subscription Options - Only for non-sample products */}
                {!product.isSample && (
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Subscription
                    </label>
                    <Select
                      value={subscriptions[product.id] || "weekly"}
                      onValueChange={(value) =>
                        setSubscriptions((prev) => ({
                          ...prev,
                          [product.id]: value,
                        }))
                      }>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly (7 days)</SelectItem>
                        <SelectItem value="monthly">
                          Monthly (30 days)
                        </SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Date Selection - Only for non-sample products */}
                {!product.isSample &&
                  (isCustomSubscription(product.id) ? (
                    <div>
                      <label className="block text-sm font-medium text-text mb-2">
                        Select Date Range{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <Popover
                        open={openCalendars[product.id] || false}
                        onOpenChange={(open) =>
                          setOpenCalendars((prev) => ({
                            ...prev,
                            [product.id]: open,
                          }))
                        }>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dateRanges[product.id]?.from ? (
                              dateRanges[product.id]?.to ? (
                                <>
                                  {format(
                                    dateRanges[product.id]!.from!,
                                    "LLL dd, y"
                                  )}{" "}
                                  -{" "}
                                  {format(
                                    dateRanges[product.id]!.to!,
                                    "LLL dd, y"
                                  )}
                                </>
                              ) : (
                                format(
                                  dateRanges[product.id]!.from!,
                                  "LLL dd, y"
                                )
                              )
                            ) : (
                              <span>Pick date range</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            autoFocus
                            mode="range"
                            defaultMonth={dateRanges[product.id]?.from}
                            selected={dateRanges[product.id]}
                            onSelect={(range) =>
                              handleDateRangeSelect(product.id, range)
                            }
                            numberOfMonths={2}
                            disabled={(date) => date < today}
                          />
                        </PopoverContent>
                      </Popover>
                      {dateRanges[product.id]?.from &&
                        dateRanges[product.id]?.to && (
                          <p className="text-sm text-text opacity-70 mt-2">
                            Days selected:{" "}
                            {calculateTotalDays(dateRanges[product.id])} days
                          </p>
                        )}
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-text mb-2">
                        Delivery Start Date{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <Popover
                        open={openCalendars[product.id] || false}
                        onOpenChange={(open) =>
                          setOpenCalendars((prev) => ({
                            ...prev,
                            [product.id]: open,
                          }))
                        }>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {deliveryDates[product.id] ? (
                              format(deliveryDates[product.id]!, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={deliveryDates[product.id]}
                            onSelect={(date) =>
                              handleDateSelect(product.id, date)
                            }
                            disabled={(date) => date < today}
                            autoFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {deliveryDates[product.id] &&
                        subscriptions[product.id] &&
                        subscriptions[product.id] !== "custom" && (
                          <p className="text-sm text-text opacity-70 mt-2">
                            {subscriptions[product.id] === "weekly" &&
                              "Selected week: "}
                            {subscriptions[product.id] === "monthly" &&
                              "Selected month: "}
                            {format(deliveryDates[product.id]!, "MMM dd, yyyy")}{" "}
                            -{" "}
                            {format(
                              calculateEndDate(
                                deliveryDates[product.id]!,
                                subscriptions[product.id] || "weekly",
                                holidays[product.id]?.length || 0
                              ),
                              "MMM dd, yyyy"
                            )}{" "}
                            (
                            {calculateSubscriptionDays(
                              subscriptions[product.id] || "weekly"
                            )}{" "}
                            days)
                          </p>
                        )}
                    </div>
                  ))}

                {/* Holiday Selector - Only for non-sample products */}
                {!product.isSample &&
                  (deliveryDates[product.id] ||
                    dateRanges[product.id]?.from) && (
                    <HolidaySelector
                      dateRange={dateRanges[product.id]}
                      deliveryDate={deliveryDates[product.id]}
                      subscription={subscriptions[product.id] || "weekly"}
                      holidays={holidays[product.id] || []}
                      onHolidaysChange={(newHolidays) =>
                        setHolidays((prev) => ({
                          ...prev,
                          [product.id]: newHolidays,
                        }))
                      }
                    />
                  )}

                {/* Price Display */}
                {!product.isSample && (
                  <div className="bg-mint-light p-3 rounded-lg">
                    <p className="text-sm text-text">
                      <strong>
                        Total Price: ₹
                        {calculateTotalPrice(
                          product,
                          subscriptions[product.id] || "weekly",
                          dateRanges[product.id],
                          holidays[product.id]?.length || 0
                        )}
                      </strong>
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col space-y-2 pt-4">
                  {product.isSample ? (
                    <Button
                      onClick={() => handleGetSample(product)}
                      className="btn-primary w-full">
                      {product.ctaLabel || "Get Sample"}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleSubscribeNow(product)}
                      className="btn-primary w-full"
                      disabled={!isDateSelected(product.id)}>
                      Subscribe Now
                    </Button>
                  )}
                  {isInCart(product) ? (
                    <Button
                      onClick={() => router.push("/cart")}
                      variant="outline"
                      className="w-full border-green text-green hover:bg-mint-light transition-colors duration-300">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Go to Cart
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleAddToCart(product)}
                      variant="outline"
                      className="w-full hover:bg-mint-light transition-colors duration-300"
                      disabled={!product.isSample && !isDateSelected(product.id)}>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  )}
                </div>
              </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
