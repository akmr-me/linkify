import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";
import HeaderContainer from "@/containers/header/Header";
import { GoogleOAuthProvider } from "@react-oauth/google";
import FeedbackFloatingButton from "@/components/FeedbackButton";
import JsonLd from "@/components/JsonLd";
import publicConfig from "@/lib/publicConfig";
// import { Toaster } from "@/components/ui/sonner";

// import LayoutClient from "@/components/LayoutClient";
// import Loader from "@/components/Loader";
// import Loading from "./loading";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Linkify",
  url:
    publicConfig.host ||
    process.env.NEXT_PUBLIC_AUTHORITY ||
    "https://linkify.app",
  logo: `${publicConfig.host}/logo.png`,
  description: "Smart & Secure URL Shortener for individuals and businesses",
  sameAs: [
    "https://twitter.com/linkifyapp",
    // Add other social media URLs here
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "support@linkify.app",
  },
};

export const metadata: Metadata = {
  title: "Linkify — Smart & Secure URL Shortener",
  description:
    "Linkify lets you shorten, manage, and track your links with ease. Fast, secure, and user-friendly URL shortener for individuals and businesses.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_AUTHORITY || "https://linkify.app"
  ),
  applicationName: "Linkify",
  authors: [{ name: process.env.NEXT_PUBLIC_CREATOR_NAME || "Amresh Kumar" }],
  generator: "Next.js",
  keywords: [
    "URL shortener",
    "link management",
    "link analytics",
    "QR code generator",
    "short links",
    "custom URLs",
    "link tracking",
    "link in bio",
    "URL analytics",
  ],
  referrer: "origin-when-cross-origin",
  // themeColor: [
  //   { media: "(prefers-color-scheme: light)", color: "white" },
  //   { media: "(prefers-color-scheme: dark)", color: "black" },
  // ],
  // robots: {
  //   index: true,
  //   follow: true,
  //   googleBot: {
  //     index: true,
  //     follow: true,
  //     "max-video-preview": -1,
  //     "max-image-preview": "large",
  //     "max-snippet": -1,
  //   },
  // },

  openGraph: {
    title: "Linkify — Smart & Secure URL Shortener",
    description:
      "Shorten URLs, monitor performance, and manage your links with Linkify — a modern, secure, and intelligent URL shortening service.",
    url: publicConfig.host,
    siteName: "Linkify",
    images: [
      {
        url: `${publicConfig.host}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Linkify URL Shortener",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Linkify — Smart & Secure URL Shortener",
    description:
      "Shorten and manage your URLs easily with Linkify. Fast, private, and reliable link shortening service.",
    images: [`${publicConfig.host}/og-image.png`],
    creator: "@linkifyapp",
    site: "@linkifyapp",
  },
  verification: {
    google: "your-google-site-verification", // Add your Google verification code
  },
  category: "Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd data={organizationSchema} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID!}
          >
            <div className="grid grid-rows-[60px_1fr_60px] items-center justify-items-center min-h-screen p-1 pt-0! sm:p-4 md:p-6 lg:p-8 xl:p-10 font-[family-name:var(--font-geist-sans)]">
              <HeaderContainer />
              <main className="container mx-auto lg:px-15 xl:px-40">
                {children}
              </main>
              <Footer />
            </div>
            <FeedbackFloatingButton />
          </GoogleOAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
