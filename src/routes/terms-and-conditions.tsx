import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Farmer's Dairy" },
      { name: "description", content: "The terms that apply when you order from Farmer's Dairy." },
      { property: "og:title", content: "Terms & Conditions — Farmer's Dairy" },
      { property: "og:description", content: "The terms that apply when you order from Farmer's Dairy." },
    ],
  }),
  component: () => (
    <LegalPage
      eyebrow="Legal"
      title="Terms & Conditions"
      updated="1 January 2024"
      sections={[
        {
          id: "acceptance",
          heading: "Acceptance of Terms",
          body: [
            "By placing an order with Farmer's Dairy you agree to these terms. Please replace this placeholder copy with your final approved legal text.",
          ],
        },
        {
          id: "orders",
          heading: "Orders & Subscriptions",
          body: [
            "Orders placed after 5 AM are scheduled for the next delivery day. Subscriptions run for the selected duration and may be extended by any holiday dates you skip.",
          ],
        },
        {
          id: "pricing",
          heading: "Pricing",
          body: [
            "All prices are listed in Indian Rupees and include applicable taxes unless stated otherwise. Prices may change with notice.",
          ],
        },
        {
          id: "liability",
          heading: "Limitation of Liability",
          body: [
            "Farmer's Dairy is not liable for indirect losses arising from delivery delays outside our control. Placeholder copy to be replaced.",
          ],
        },
        {
          id: "contact",
          heading: "Contact",
          body: ["For any questions about these terms, write to info@farmersdairy.com."],
        },
      ]}
    />
  ),
});
