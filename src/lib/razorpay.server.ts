import { createServerFn } from "@tanstack/react-start";
import crypto from "node:crypto";
import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from "@/lib/env.server";

/**
 * Server functions for the Razorpay flow. `createServerFn` is TanStack Start's
 * RPC primitive — the client imports these directly and calls them; the runtime
 * routes the invocation to the server, keeping secrets out of the browser bundle.
 */

export const createRazorpayOrder = createServerFn({ method: "POST" })
  .validator(
    (input: unknown) => {
      const i = (input ?? {}) as {
        amount?: number;
        currency?: string;
        receipt?: string;
      };
      return {
        amount: Math.round(Number(i.amount ?? 0)),
        currency: i.currency ?? "INR",
        receipt: i.receipt ?? `receipt_${Date.now()}`,
      };
    },
  )
  .handler(async ({ data }) => {
    if (!data.amount || data.amount < 100) {
      return { success: false as const, error: "Invalid amount. Minimum is ₹1.00" };
    }
    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      return {
        success: false as const,
        error:
          "Online payment is not configured. Please choose Cash on Delivery or call us at 9363778989.",
      };
    }
    const RazorpayMod = await import("razorpay");
    const Razorpay =
      (RazorpayMod as unknown as { default?: unknown }).default ?? RazorpayMod;
    const rp = new (Razorpay as new (opts: {
      key_id: string;
      key_secret: string;
    }) => {
      orders: {
        create: (o: Record<string, unknown>) => Promise<{
          id: string;
          amount: number;
          currency: string;
          receipt?: string;
        }>;
      };
    })({ key_id: RAZORPAY_KEY_ID, key_secret: RAZORPAY_KEY_SECRET });

    try {
      const order = await rp.orders.create({
        amount: data.amount,
        currency: data.currency,
        receipt: data.receipt,
        notes: {
          created_by: "farmers_dairy_website",
          created_at: new Date().toISOString(),
        },
      });
      return {
        success: true as const,
        order: {
          id: order.id,
          amount: order.amount,
          currency: order.currency,
          receipt: order.receipt,
        },
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create order";
      return { success: false as const, error: message };
    }
  });

export const verifyRazorpayPayment = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const i = (input ?? {}) as {
      razorpay_order_id?: string;
      razorpay_payment_id?: string;
      razorpay_signature?: string;
    };
    return {
      razorpay_order_id: String(i.razorpay_order_id ?? ""),
      razorpay_payment_id: String(i.razorpay_payment_id ?? ""),
      razorpay_signature: String(i.razorpay_signature ?? ""),
    };
  })
  .handler(async ({ data }) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return {
        success: false as const,
        error: "Missing payment verification parameters",
      };
    }
    if (!RAZORPAY_KEY_SECRET) {
      return {
        success: false as const,
        error: "Payment verification not configured",
      };
    }
    const expected = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");
    if (expected !== razorpay_signature) {
      return { success: false as const, error: "Payment verification failed" };
    }
    return { success: true as const, paymentId: razorpay_payment_id };
  });
