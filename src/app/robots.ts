import { MetadataRoute } from "next";
import publicConfig from "@/lib/publicConfig";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/about", "/features", "/pricing"],
        disallow: ["/login", "/register", "/dashboard"],
      },
      {
        userAgent: "Googlebot",
        crawlDelay: 1,
      },
      { userAgent: "BingBot", crawlDelay: 1 },
      {
        userAgent: "YandexBot",
        crawlDelay: 2,
      },
      { userAgent: "Baiduspider", crawlDelay: 2 },
      { userAgent: "Sogou", crawlDelay: 2 },
      { userAgent: "Slurp", crawlDelay: 2 },
      { userAgent: "ia_archiver", crawlDelay: 2 },
      { userAgent: "AhrefsBot", crawlDelay: 2 },
      { userAgent: "SemrushBot", crawlDelay: 2 },
      { userAgent: "MJ12bot", crawlDelay: 2 },
      { userAgent: "YisouSpider", crawlDelay: 2 },
      { userAgent: "Sogou web spider", crawlDelay: 2 },
    ],
    sitemap: `${publicConfig.host}/sitemap.xml`,
  };
}
