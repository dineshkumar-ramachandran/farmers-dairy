"use client"

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import type { DateRange } from "react-day-picker"

const STORAGE_KEY = "farmers-dairy-cart"

/** Dates survive JSON as ISO strings — revive them back into Date objects. */
function reviveDates(items: CartItem[]): CartItem[] {
  return items.map((item) => ({
    ...item,
    deliveryDate: item.deliveryDate ? new Date(item.deliveryDate) : undefined,
    adjustedEndDate: item.adjustedEndDate ? new Date(item.adjustedEndDate) : undefined,
    dateRange: item.dateRange
      ? {
          from: item.dateRange.from ? new Date(item.dateRange.from) : undefined,
          to: item.dateRange.to ? new Date(item.dateRange.to) : undefined,
        }
      : undefined,
    holidays: item.holidays?.map((d) => new Date(d)) ?? [],
  }))
}

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  subscription: string
  deliveryDate?: Date
  dateRange?: DateRange
  sampleSize?: string
  totalDays?: number
  holidays?: Date[]
  adjustedEndDate?: Date
  totalPrice?: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: number, sampleSize?: string) => void
  updateQuantity: (id: number, quantity: number, sampleSize?: string) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const hydrated = useRef(false)

  // Rehydrate the cart from localStorage once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setItems(reviveDates(JSON.parse(raw)))
    } catch {
      /* ignore malformed storage */
    }
    hydrated.current = true
  }, [])

  // Persist on every change (after the initial hydration).
  useEffect(() => {
    if (!hydrated.current) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* storage full / unavailable — non-fatal */
    }
  }, [items])

  const addToCart = (item: CartItem) => {
    setItems((prev) => {
      // Same product in a different size (e.g. Ghee 1/2L vs 1L) is its own line
      const matches = (i: CartItem) =>
        i.id === item.id && i.sampleSize === item.sampleSize
      const existingItem = prev.find(matches)
      if (existingItem) {
        return prev.map((i) =>
          matches(i) ? { ...i, quantity: i.quantity + item.quantity } : i
        )
      }
      return [...prev, item]
    })
  }

  const removeFromCart = (id: number, sampleSize?: string) => {
    setItems((prev) =>
      prev.filter(
        (item) =>
          !(item.id === id && (sampleSize === undefined || item.sampleSize === sampleSize))
      )
    )
  }

  const updateQuantity = (id: number, quantity: number, sampleSize?: string) => {
    if (quantity <= 0) {
      removeFromCart(id, sampleSize)
      return
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && (sampleSize === undefined || item.sampleSize === sampleSize)
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      if (item.totalPrice) {
        return total + item.totalPrice * item.quantity
      }
      return total + item.price * item.quantity
    }, 0)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
