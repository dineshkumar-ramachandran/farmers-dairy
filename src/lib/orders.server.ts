import { createServerFn } from "@tanstack/react-start";
import { ADMIN_PASSPHRASE } from "@/lib/env.server";
import { supabaseAdmin } from "@/lib/supabase.server";
import type {
  AdminOrder,
  OrderItemInput,
  SaveOrderInput,
} from "@/lib/order-types";

/** Persist a confirmed order (COD or paid) into public.orders. */
export const saveOrderToDb = createServerFn({ method: "POST" })
  .validator((input: unknown) => input as SaveOrderInput)
  .handler(async ({ data }) => {
    const c = data.customerDetails ?? ({} as SaveOrderInput["customerDetails"]);
    if (!data.orderId || !c.name || !data.totalAmount || !data.items) {
      return { success: false as const, error: "Missing required order fields" };
    }
    if (c.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email)) {
      return { success: false as const, error: "Invalid email" };
    }
    if (c.phone && !/^\d{10}$/.test(c.phone)) {
      return { success: false as const, error: "Phone must be 10 digits" };
    }

    const { error } = await supabaseAdmin().from("orders").insert([
      {
        orderId: data.orderId,
        name: c.name,
        email: c.email ?? null,
        phone: c.phone ?? null,
        address: c.address ?? null,
        city: c.city ?? null,
        pincode: c.pincode ?? null,
        specialInstructions: c.specialInstructions ?? "",
        orderDetails: data.orderDetails ?? "",
        totalAmount: Number(data.totalAmount),
        paymentMethod: data.paymentMethod,
        orderDate: data.orderDate
          ? new Date(data.orderDate).toISOString()
          : new Date().toISOString(),
        status: data.status ?? "Confirmed",
        items: data.items,
        razorpayorderid: data.razorpayPaymentId ?? null,
      },
    ] as never);

    if (error) {
      return { success: false as const, error: `Database error: ${error.message}` };
    }
    return { success: true as const, orderId: data.orderId };
  });

/** List every order (admin only, passphrase verified server-side). */
export const listAdminOrders = createServerFn({ method: "POST" })
  .validator((input: unknown) => ({ passphrase: String((input as { passphrase?: string })?.passphrase ?? "") }))
  .handler(async ({ data }) => {
    if (!data.passphrase || data.passphrase !== ADMIN_PASSPHRASE) {
      return { success: false as const, error: "Unauthorized", orders: [] };
    }
    const { data: rows, error } = await supabaseAdmin()
      .from("orders")
      .select("*")
      .order("orderDate", { ascending: false });
    if (error) {
      return {
        success: false as const,
        error: `DB error: ${error.message}`,
        orders: [] as AdminOrder[],
      };
    }
    const orders: AdminOrder[] = (rows ?? []).map((o: Record<string, unknown>) => ({
      id: (o["orderId"] as string) ?? "",
      createdAt: (o["orderDate"] as string) ?? new Date().toISOString(),
      paymentMethod: (o["paymentMethod"] as string) ?? "Unknown",
      status: (o["status"] as string) ?? "Confirmed",
      total: Number(o["totalAmount"] ?? 0),
      subtotal: Number(o["totalAmount"] ?? 0),
      shipping: 0,
      address: {
        fullName: (o["name"] as string) ?? "",
        email: (o["email"] as string) ?? "",
        phone: (o["phone"] as string) ?? "",
        house: "",
        street: (o["address"] as string) ?? "",
        landmark: "",
        city: (o["city"] as string) ?? "",
        pincode: (o["pincode"] as string) ?? "",
        state: "Tamil Nadu",
        specialInstructions: (o["specialInstructions"] as string) ?? "",
      },
      items: (o["items"] as OrderItemInput[]) ?? [],
      razorpayId: (o["razorpayorderid"] as string) ?? null,
    }));
    return { success: true as const, orders };
  });

const ALLOWED = new Set([
  "Confirmed",
  "paid",
  "cod_pending",
  "delivered",
  "cancelled",
]);

export const updateAdminOrderStatus = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const i = (input ?? {}) as {
      passphrase?: string;
      orderId?: string;
      status?: string;
    };
    return {
      passphrase: String(i.passphrase ?? ""),
      orderId: String(i.orderId ?? ""),
      status: String(i.status ?? ""),
    };
  })
  .handler(async ({ data }) => {
    if (!data.passphrase || data.passphrase !== ADMIN_PASSPHRASE) {
      return { success: false as const, error: "Unauthorized" };
    }
    if (!data.orderId || !ALLOWED.has(data.status)) {
      return {
        success: false as const,
        error: "orderId and a valid status are required",
      };
    }
    const { error } = await supabaseAdmin()
      .from("orders")
      .update({ status: data.status } as never)
      .eq("orderId", data.orderId);
    if (error) {
      return { success: false as const, error: `DB error: ${error.message}` };
    }
    return { success: true as const };
  });
