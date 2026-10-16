import type { Metadata } from "next";
import { loadPublishedPage, type PublishedSeo } from "@/lib/published-page";

export function metadataFromSeo(slug: string, seo: PublishedSeo | undefined, fallback: Metadata): Metadata {
  if (!seo) return fallback;
  const hasCopy = Boolean(seo.title?.trim() || seo.description?.trim() || seo.canonical?.trim() || seo.ogTitle?.trim() || seo.ogImage?.trim() || seo.noIndex || seo.noFollow);
  if (!hasCopy) return fallback;
  const path = sitePath(seo.canonical, slug);
  const title = seo.title?.trim() || textTitle(fallback.title) || slug;
  const description = seo.description?.trim() || textTitle(fallback.description);
  const socialTitle = seo.ogTitle?.trim() || title;
  const socialDescription = seo.ogDescription?.trim() || description;
  const image = seo.ogImage?.trim();
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: { index: !seo.noIndex, follow: !seo.noFollow },
    openGraph: {
      title: socialTitle,
      description: socialDescription,
      url: path,
      type: "website",
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: seo.twitterCard === "summary" ? "summary" : "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export async function resolvePublishedMetadata(slug: string, fallback: Metadata): Promise<Metadata> {
  const published = await loadPublishedPage(slug);
  return metadataFromSeo(slug, published?.seo, fallback);
}

export function sitePath(canonical: string | undefined, slug: string): string {
  const value = canonical?.trim() ?? "";
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  if (slug === "home" || slug === "") return "/";
  return `/${slug}`;
}

function textTitle(value: Metadata["title"] | Metadata["description"]): string {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && "absolute" in value && typeof value.absolute === "string") return value.absolute;
  return "";
}
