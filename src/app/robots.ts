import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/adminpanel/", "adminlogin"],
    },
    sitemap: "https://vetpraca.vettech.pl/sitemap.xml",
  };
}
