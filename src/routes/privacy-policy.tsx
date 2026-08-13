import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Farmer's Dairy" },
      { name: "description", content: "How Farmer's Dairy collects, uses and protects your data." },
      { property: "og:title", content: "Privacy Policy — Farmer's Dairy" },
      { property: "og:description", content: "How Farmer's Dairy collects, uses and protects your data." },
    ],
  }),
  component: () => (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      updated="1 January 2024"
      sections={[
        {
          id: "collect",
          heading: "Information We Collect",
          body: [
            "We collect the name, phone number, email and delivery address you provide when placing an order. Placeholder copy to be replaced.",
          ],
        },
        {
          id: "use",
          heading: "How We Use It",
          body: ["Your details are used only to deliver your order and to contact you about it."],
        },
        {
          id: "sharing",
          heading: "Sharing",
          body: [
            "We never sell your data. We share it only with delivery and payment partners needed to fulfil your order.",
          ],
        },
        {
          id: "rights",
          heading: "Your Rights",
          body: ["Write to info@farmersdairy.com to access, correct or delete your information."],
        },
      ]}
    />
  ),
});
