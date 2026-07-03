import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/constants";
import { getAllBlogs } from "@/lib/blogs";
import {
  getAllConditions,
  getAllLocations,
  getAllServices,
  getAllResources,
} from "@/lib/seo-pages";

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  {
    url: BASE_URL,
    lastModified: new Date("2025-05-20"),
    changeFrequency: "weekly",
    priority: 1.0,
  },
  {
    url: `${BASE_URL}/about`,
    lastModified: new Date("2025-05-20"),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/philosophy`,
    lastModified: new Date("2025-05-20"),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/partners`,
    lastModified: new Date("2025-05-20"),
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/running`,
    lastModified: new Date("2025-05-20"),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/back-to-sports`,
    lastModified: new Date("2025-05-20"),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/surgical-rehab`,
    lastModified: new Date("2025-05-20"),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/injury-management`,
    lastModified: new Date("2025-05-20"),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/performance-training`,
    lastModified: new Date("2025-05-20"),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  // SEO hub pages
  {
    url: `${BASE_URL}/conditions`,
    lastModified: new Date("2026-01-01"),
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/locations`,
    lastModified: new Date("2026-01-01"),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/services`,
    lastModified: new Date("2026-01-01"),
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/resources`,
    lastModified: new Date("2026-01-01"),
    changeFrequency: "weekly",
    priority: 0.7,
  },
  // Blog hub (legacy)
  {
    url: `${BASE_URL}/blog`,
    lastModified: new Date("2025-05-20"),
    changeFrequency: "weekly",
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/privacy-policy`,
    lastModified: new Date("2025-05-20"),
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    url: `${BASE_URL}/terms-and-conditions`,
    lastModified: new Date("2025-05-20"),
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    url: `${BASE_URL}/package-validity-policy`,
    lastModified: new Date("2026-07-03"),
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    url: `${BASE_URL}/patient-consent-waiver`,
    lastModified: new Date("2026-07-03"),
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    url: `${BASE_URL}/doctor-disclaimer`,
    lastModified: new Date("2026-07-03"),
    changeFrequency: "yearly",
    priority: 0.3,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogs, conditions, locations, services, resources] = await Promise.all([
    getAllBlogs(),
    getAllConditions(),
    getAllLocations(),
    getAllServices(),
    getAllResources(),
  ]);

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((b) => ({
    url: `${BASE_URL}/blog/${b.slug}`,
    lastModified: new Date(b.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const conditionRoutes: MetadataRoute.Sitemap = conditions.map((c) => ({
    url: `${BASE_URL}/conditions/${c.slug}`,
    lastModified: new Date(c.lastModified),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const conditionLocationRoutes: MetadataRoute.Sitemap = conditions.flatMap((c) =>
    c.locations.map((loc) => ({
      url: `${BASE_URL}/conditions/${c.slug}/in-${loc}`,
      lastModified: new Date(c.lastModified),
      changeFrequency: "monthly",
      priority: 0.7,
    }))
  );

  const locationRoutes: MetadataRoute.Sitemap = locations.map((l) => ({
    url: `${BASE_URL}/locations/${l.slug}`,
    lastModified: new Date(l.lastModified),
    changeFrequency: "monthly",
    priority: l.type === "centre" ? 0.8 : 0.6,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    lastModified: new Date(s.lastModified),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const resourceRoutes: MetadataRoute.Sitemap = resources.map((r) => ({
    url: `${BASE_URL}/resources/${r.slug}`,
    lastModified: new Date(r.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...STATIC_ROUTES,
    ...blogRoutes,
    ...conditionRoutes,
    ...conditionLocationRoutes,
    ...locationRoutes,
    ...serviceRoutes,
    ...resourceRoutes,
  ];
}
