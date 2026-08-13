import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/shipping-and-delivery")({
  head: () => ({
    meta: [
      { title: "Shipping & Delivery — Farmer's Dairy" },
      { name: "description", content: "Delivery windows, coverage areas and shipping charges." },
      { property: "og:title", content: "Shipping & Delivery — Farmer's Dairy" },
      { property: "og:description", content: "Delivery windows, coverage areas and shipping charges." },
    ],
  }),
  component: () => (
    <LegalPage
      eyebrow="Legal"
      title="Shipping & Delivery"
      updated="1 January 2024"
      sections={[
        {
          id: "areas",
          heading: "Delivery Areas",
          body: [
            "We currently deliver across Hosur and selected parts of Bangalore. Placeholder copy to be replaced with your final policy.",
          ],
        },
        {
          id: "timing",
          heading: "Delivery Timing",
          body: [
            "Milk is delivered to your doorstep every morning before 7 AM. Orders placed after 5 AM begin from the next day.",
          ],
        },
        {
          id: "charges",
          heading: "Shipping Charges",
          body: [
            "Delivery is free within Hosur for pincodes starting with 6351. A flat charge of ₹40 applies elsewhere.",
          ],
        },
        {
          id: "packaging",
          heading: "Packaging",
          body: ["All milk is packed in eco friendly packets sealed at the farm."],
        },
      ]}
    />
  ),
});
