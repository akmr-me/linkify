import { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { Card, CardContent } from "@/components/ui/card";
import { OFFRINGS, REASONS_TO_CHOOSE_US } from "@/constants/about";
import publicConfig from "@/lib/publicConfig";

export const metadata: Metadata = {
  title: "About - Linkify | Our Story & Mission",
  description:
    "Learn about Linkify's mission to make link management simple, secure, and efficient. Discover how we're revolutionizing URL shortening for businesses and individuals.",
  openGraph: {
    title: "About - Linkify | Our Story & Mission",
    description:
      "Learn about Linkify's mission to make link management simple, secure, and efficient.",
    url: `${publicConfig.host}/about`,
    type: "website",
  },
  twitter: {
    title: "About - Linkify | Our Story & Mission",
    description:
      "Learn about Linkify's mission to make link management simple, secure, and efficient.",
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Linkify",
  description: "Learn about Linkify's mission and story",
  mainEntity: {
    "@type": "Organization",
    name: "Linkify",
    description: "Professional URL shortening and link management platform",
    foundingDate: "2024",
    offers: OFFRINGS,
  },
};

export default async function About() {
  return (
    <>
      <JsonLd data={aboutSchema} />
      <div className="container mx-auto py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              About Linkify
            </h1>
            <p className="text-muted-foreground text-lg">
              Simplifying link management for everyone
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-muted-foreground">
                At Linkify, we&apos;re committed to making link management
                simple and efficient. Our platform helps individuals and
                businesses take control of their online presence through
                powerful link shortening and management tools.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
                <ul className="space-y-2 text-muted-foreground">
                  {OFFRINGS.map((offer) => (
                    <li key={offer}>{offer}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">Why Choose Us</h2>
                <ul className="space-y-2 text-muted-foreground">
                  {REASONS_TO_CHOOSE_US.map((reason) => (
                    <li key={reason}>{reason}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-muted-foreground">
                Have questions or need support? Reach out to us at{" "}
                <a
                  href="mailto:support@linkify.com"
                  className="text-primary hover:underline"
                >
                  support@linkify.com
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
