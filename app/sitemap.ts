import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/shop", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
    {
      path: "/terms-and-conditions",
      priority: 0.3,
      changeFrequency: "yearly" as const,
    },
    {
      path: "/shipping-and-delivery",
      priority: 0.3,
      changeFrequency: "yearly" as const,
    },
    {
      path: "/cancellation-and-refund",
      priority: 0.3,
      changeFrequency: "yearly" as const,
    },
    {
      path: "/privacy-policy",
      priority: 0.3,
      changeFrequency: "yearly" as const,
    },
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
