import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/constants";
import { listPublishedPages, publishedPath } from "@/lib/published-page";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const published = await listPublishedPages();
  const hidden = published.filter((page) => page.seo?.noIndex).map((page) => publishedPath(page));
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Drafts are not written into the site. noindex pages and the admin
        // preview query stay out of search results.
        disallow: ["/api/", "/_next/", "/admin/", "/a/", "/*?adminPreview=", ...hidden],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
