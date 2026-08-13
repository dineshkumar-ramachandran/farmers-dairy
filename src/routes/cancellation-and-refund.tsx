import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/cancellation-and-refund")({
  head: () => ({
    meta: [
      { title: "Cancellation & Refund — Farmer's Dairy" },
      { name: "description", content: "How to cancel a delivery or subscription and request a refund." },
      { property: "og:title", content: "Cancellation & Refund — Farmer's Dairy" },
      {
        property: "og:description",
        content: "How to cancel a delivery or subscription and request a refund.",
      },
    ],
  }),
  component: () => (
    <LegalPage
      eyebrow="Legal"
      title="Cancellation & Refund"
      updated="1 January 2024"
      sections={[
        {
          id: "cancellation",
          heading: "Cancelling an Order",
          body: [
            "Daily deliveries can be cancelled before 5 AM on the delivery date. Placeholder copy to be replaced.",
          ],
        },
        {
          id: "subscriptions",
          heading: "Pausing a Subscription",
          body: [
            "Use the skip-dates option while ordering, or call us at 9363778989 to pause an active subscription.",
          ],
        },
        {
          id: "refunds",
          heading: "Refunds",
          body: [
            "Approved refunds for prepaid orders are returned to the original payment method within 5-7 working days.",
          ],
        },
        {
          id: "quality",
          heading: "Quality Issues",
          body: ["If a delivery arrives damaged, contact us the same day and we will replace it."],
        },
      ]}
    />
  ),
});
