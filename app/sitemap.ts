import type { MetadataRoute } from "next";
import { business, pageInfo } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", ...Object.keys(pageInfo)].map(section => ({
    url: `${business.url}/${section ? `${section}/` : ""}`,
    changeFrequency: section === "products" ? "monthly" : "yearly",
    priority: section === "" ? 1 : section === "products" || section === "services" ? .8 : .5,
  }));
}
