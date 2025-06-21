import { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import publicConfig from "@/lib/publicConfig";
import PricingContainer from "@/containers/PricingContainer";

export const metadata: Metadata = {
  title: "Pricing - Linkify | Simple & Transparent Plans",
  description:
    "Choose the perfect Linkify plan for your needs. From free personal use to enterprise solutions, we offer flexible pricing for URL shortening and link management.",
  openGraph: {
    title: "Pricing - Linkify | Simple & Transparent Plans",
    description:
      "Choose the perfect Linkify plan for your needs. From free personal use to enterprise solutions.",
    url: `${publicConfig.host}/pricing`,
    type: "website",
  },
  twitter: {
    title: "Pricing - Linkify | Simple & Transparent Plans",
    description:
      "Choose the perfect Linkify plan for your needs. From free personal use to enterprise solutions.",
  },
};

const pricingSchema = {
  "@context": "https://schema.org",
  "@type": "PriceSpecification",
  name: "Linkify Pricing Plans",
  description: "Flexible pricing plans for URL shortening and link management",
  offers: [
    {
      "@type": "Offer",
      name: "Free Plan",
      price: "0",
      priceCurrency: "USD",
      description: "Perfect for personal use",
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "Pro Plan",
      price: "0.99",
      priceCurrency: "USD",
      description: "For professionals and small teams",
      availability: "https://schema.org/InStock",
    },
  ],
};

export default async function Pricing() {
  return (
    <>
      <JsonLd data={pricingSchema} />
      <PricingContainer />
    </>
  );
}
