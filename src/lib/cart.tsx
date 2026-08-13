import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = {
  key: string;
  slug: string;
  name: string;
  image: string;
  variant?: string | undefined;
  unitPrice: number;
  quantity: number;
  plan?: string | undefined;
  days?: number | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
  holidays?: string[] | undefined;
};

export type Order = {
  id: string;
  createdAt: string;
  items: CartItem[];
  address: Record<string, string>;
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  status: string;
};

const CART_KEY = "fd_cart_v1";
const ORDERS_KEY = "fd_orders_v1";

type CartCtx = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  clearCart: () => void;
  hasKey: (key: string) => boolean;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const value = useMemo<CartCtx>(
    () => ({
      items,
      addToCart: (item) =>
        setItems((prev) => {
          const found = prev.find((i) => i.key === item.key);
          if (found)
            return prev.map((i) =>
              i.key === item.key ? { ...item, quantity: i.quantity + item.quantity } : i,
            );
          return [...prev, item];
        }),
      removeFromCart: (key) => setItems((prev) => prev.filter((i) => i.key !== key)),
      updateQuantity: (key, quantity) =>
        setItems((prev) =>
          prev.map((i) => (i.key === key ? { ...i, quantity: Math.max(1, Math.min(50, quantity)) } : i)),
        ),
      getTotalItems: () => items.reduce((s, i) => s + i.quantity, 0),
      getTotalPrice: () => items.reduce((s, i) => s + i.quantity * i.unitPrice * (i.days || 1), 0),
      clearCart: () => setItems([]),
      hasKey: (key) => items.some((i) => i.key === key),
    }),
    [items],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export function saveOrder(order: Order) {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    const list: Order[] = raw ? JSON.parse(raw) : [];
    list.unshift(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(list));
  } catch {
    /* ignore */
  }
}

export function loadOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function updateOrderStatus(id: string, status: string) {
  const list = loadOrders().map((o) => (o.id === id ? { ...o, status } : o));
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(list));
  } catch {
    /* ignore */
  }
  return list;
}

export const HOSUR_PIN_PREFIX = "6351";
export const OUTSIDE_SHIPPING = 99;

/** Returns null until a valid 6 digit pincode is entered. */
export const shippingFor = (pincode?: string): number | null => {
  if (!pincode || !/^\d{6}$/.test(pincode)) return null;
  return pincode.startsWith(HOSUR_PIN_PREFIX) ? 0 : OUTSIDE_SHIPPING;
};
