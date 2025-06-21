import { MetadataRoute } from "next";
import publicConfig from "@/lib/publicConfig";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Linkify - Smart & Secure URL Shortener",
    short_name: "Linkify",
    description:
      "Professional URL shortening and link management platform with analytics, QR codes, and custom domains.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    scope: "/",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      // {
      //   src: "/icon-384x384.png",
      //   sizes: "384x384",
      //   type: "image/png",
      // },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    screenshots: [
      {
        src: "/screenshot-1.png",
        sizes: "1920x1080",
        type: "image/png",
        label: "Homepage of Linkify",
      },
      // {
      //   src: "/screenshot-2.png",
      //   sizes: "1920x1080",
      //   type: "image/png",
      //   label: "Dashboard view of Linkify",
      // },
    ],
    id: publicConfig.host,
    orientation: "portrait",
    categories: ["productivity", "utilities"],
    shortcuts: [
      {
        name: "Login",
        url: "/login",
        description: "Login to your account",
      },
      {
        name: "Pricing",
        url: "/pricing",
        description: "View our pricing plans",
      },
    ],
    prefer_related_applications: false,
  };
}
