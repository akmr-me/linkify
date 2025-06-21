import { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import features from "@/constants/features";

export const metadata: Metadata = {
  title: "Features - Linkify | Advanced URL Shortening Tools",
  description:
    "Discover Linkify's powerful features: URL shortening, analytics, QR code generation, custom domains, and more. Everything you need for professional link management.",
  openGraph: {
    title: "Features - Linkify | Advanced URL Shortening Tools",
    description:
      "Discover Linkify's powerful features: URL shortening, analytics, QR code generation, custom domains, and more.",
    url: "https://linkify.app/features",
    type: "website",
  },
  twitter: {
    title: "Features - Linkify | Advanced URL Shortening Tools",
    description:
      "Discover Linkify's powerful features: URL shortening, analytics, QR code generation, custom domains, and more.",
  },
};

const featuresSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Linkify URL Shortener",
  description: "Professional URL shortening and link management platform",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  features: features.map((feature) => feature.description),
};

export default function FeaturesPage() {
  return (
    <>
      <JsonLd data={featuresSchema} />
      <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto py-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
          Powerful Features for Link Management
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
