"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Minus, Plus, ShoppingCart, Check } from "lucide-react"
import { useCart } from "@/components/cart-context"
import { findBySlug, ProductVariant } from "@/lib/product-details"

/**
 * Individual product detail page — one focused page per product with big
 * hero image, marketing copy, feature list, freshness/delivery callouts,
 * and Add to Cart / Buy Now controls.
 *
 * Milk products (500ml / 1000ml) have a full subscription/holiday flow on
 * the /shop page; here we surface a "Subscribe on shop" CTA so buyers land
 * in the right flow rather than a stripped-down copy of it.
 */
export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const match = findBySlug(params.slug)
  if (!match) notFound()

  const { id, content } = match
  const { addToCart, items } = useCart()
  const router = useRouter()

  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState<string>(
    content.variants?.[0]?.label ?? ""
  )

  // Milk subscription products live at /shop with their full flow.
  const isMilkSubscription = id === 1 || id === 2

  const activeVariantPrice = (): number => {
    if (content.variants?.length) {
      const v =
        content.variants.find((x) => x.label === selectedVariant) ??
        content.variants[0]
      return v.price
    }
    return typeof content.price === "number" ? content.price : 0
  }

  const alreadyInCart = items.some(
    (i) =>
      i.id === id &&
      (content.variants?.length ? i.sampleSize === selectedVariant : true)
  )

  const addOneTimeToCart = () => {
    const price = activeVariantPrice()
    addToCart({
      id,
      name: content.name,
      price,
      quantity,
      subscription: "sample",
      sampleSize: content.variants?.length ? selectedVariant : undefined,
      totalDays: 1,
      totalPrice: price,
      codEligible: !!content.codEligible,
    })
  }

  const handleBuyNow = () => {
    if (isMilkSubscription) {
      router.push("/shop")
      return
    }
    addOneTimeToCart()
    router.push("/checkout")
  }

  const handleAddToCart = () => {
    if (isMilkSubscription) {
      router.push("/shop")
      return
    }
    if (alreadyInCart) {
      router.push("/cart")
      return
    }
    addOneTimeToCart()
  }

  return (
    <div className="min-h-screen py-6 sm:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm text-text/70 hover:text-green transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to shop
          </Link>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
          {/* ---- Image ---- */}
          <div className="card !p-4 lg:!p-6">
            <div className="w-full h-[24rem] sm:h-[30rem] md:h-[36rem] flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={content.image}
                alt={content.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>

          {/* ---- Details + purchase ---- */}
          <div>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.28em] text-green mb-3">
              {content.category}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text leading-[1.05] mb-3">
              {content.name}
            </h1>
            <p className="text-lg text-text/80 mb-6">{content.tagline}</p>

            {/* Price */}
            {content.comingSoon ? (
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-butter/25 text-green-deep text-sm font-bold uppercase tracking-wider mb-8">
                Coming Soon
              </span>
            ) : (
              <div className="text-3xl sm:text-4xl font-bold text-green mb-8">
                ₹{content.price}
              </div>
            )}

            {/* Purchase controls */}
            {!content.comingSoon && (
              <div className="space-y-5 mb-8">
                {/* Variant selector */}
                {content.variants?.length ? (
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      {content.variantLabel || "Choose Size"}
                    </label>
                    <Select
                      value={selectedVariant}
                      onValueChange={setSelectedVariant}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        {content.variants.map((v: ProductVariant) => (
                          <SelectItem key={v.label} value={v.label}>
                            {v.label} — ₹{v.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ) : null}

                {/* Quantity — only relevant for non-milk one-time items */}
                {!isMilkSubscription && (
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Quantity
                    </label>
                    <div className="inline-flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        aria-label="Decrease quantity"
                        className="w-10 h-10 p-0 rounded-full"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="text-lg font-medium w-8 text-center">
                        {quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQuantity((q) => q + 1)}
                        aria-label="Increase quantity"
                        className="w-10 h-10 p-0 rounded-full"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Milk-subscription bridge */}
                {isMilkSubscription && (
                  <div className="rounded-2xl border border-mint-light bg-mint-light/60 p-4 text-sm text-text">
                    Milk is delivered on a subscription — pick your start date,
                    subscription length (weekly / monthly / custom range) and
                    optional holiday skip days on the shop page.
                  </div>
                )}

                {/* Actions */}
                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  <Button
                    onClick={handleBuyNow}
                    className="btn-primary w-full"
                  >
                    {isMilkSubscription ? "Configure Subscription" : "Buy Now"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleAddToCart}
                    className="w-full border-green text-green hover:bg-mint-light"
                  >
                    {alreadyInCart && !isMilkSubscription ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Go to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Long-form content */}
            <div className="prose max-w-none space-y-4 mb-8">
              {content.paragraphs.map((p, i) => (
                <p key={i} className="text-text/85 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            {/* Features */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-text mb-3">
                What you get
              </h2>
              <ul className="space-y-2">
                {content.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-text/85">
                    <Check
                      className="w-4 h-4 mt-1 text-green shrink-0"
                      aria-hidden="true"
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Callouts */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="rounded-xl border border-mint-light bg-card p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-green mb-1">
                  Freshness
                </p>
                <p className="text-sm text-text/85">{content.freshness}</p>
              </div>
              <div className="rounded-xl border border-mint-light bg-card p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-green mb-1">
                  Delivery
                </p>
                <p className="text-sm text-text/85">{content.delivery}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
