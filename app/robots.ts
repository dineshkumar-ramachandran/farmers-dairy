import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/api/",
        "/test-order",
        "/test-supabase",
        "/simulate-order",
        "/checkout",
        "/cart",
        "/order-confirmation",
      ],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
