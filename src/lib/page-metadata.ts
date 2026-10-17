import type { Metadata } from "next";
import { normalizeAssetUrl } from "@/lib/constants";
import { isPublishedCopy } from "@/lib/published-fields";
import { loadPublishedPage, type PublishedSeo } from "@/lib/published-page";
import { loadPublishedSite, type PublishedSite } from "@/lib/site-content";

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

export type HomeMetadataFallback = {
  image: string;
  twitterSite?: string;
  twitterCreator?: string;
};

function usableMeta(value: string | undefined): string {
  const text = value?.trim() ?? "";
  return text && isPublishedCopy(text) ? text : "";
}

function firstUsable(...values: Array<string | undefined>): string {
  for (const value of values) {
    const text = usableMeta(value);
    if (text) return text;
  }
  return "";
}

// Home's title, description, and canonical come from content/pages/home.json.
// content/site.json fills only a title or description the page left blank.
// The title is absolute so the root template cannot append the site name again.
export function homePageMetadata(
  seo: PublishedSeo | undefined,
  site: PublishedSite | null,
  fallback: HomeMetadataFallback,
): Metadata {
  const title = firstUsable(seo?.title, site?.title);
  const description = firstUsable(seo?.description, site?.description);
  const canonical = sitePath(seo?.canonical, "home");
  const socialTitle = usableMeta(seo?.ogTitle);
  const socialDescription = usableMeta(seo?.ogDescription);
  const image = firstUsable(seo?.ogImage, site?.ogImage) || fallback.image;
  const siteName = usableMeta(site?.siteName);
  const metadata: Metadata = {
    alternates: { canonical },
    openGraph: {
      url: canonical,
      ...(siteName ? { siteName } : {}),
      ...(socialTitle ? { title: socialTitle } : {}),
      ...(socialDescription ? { description: socialDescription } : {}),
      images: [{ url: image, width: 1200, height: 630 }],
    },
  };
  if (title) metadata.title = { absolute: title };
  if (description) metadata.description = description;
  if (title || description) {
    metadata.twitter = {
      card: seo?.twitterCard === "summary" ? "summary" : "summary_large_image",
      ...(fallback.twitterSite ? { site: fallback.twitterSite } : {}),
      ...(fallback.twitterCreator ? { creator: fallback.twitterCreator } : {}),
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      images: [image],
    };
  }
  if (seo?.noIndex || seo?.noFollow) {
    metadata.robots = { index: !seo.noIndex, follow: !seo.noFollow };
  }
  return metadata;
}

export type FixedPageFallback = {
  title?: string;
  description?: string;
  image?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterSite?: string;
  twitterCreator?: string;
};

function usableImage(value: string | undefined): string {
  const text = usableMeta(value);
  if (!text) return "";
  return usableMeta(normalizeAssetUrl(text));
}

// Fixed pages keep a string title so an intermediate layout can still apply "| Stance Health".
// Home is the exception: its title is absolute. content/site.json does not replace a page title,
// because that file holds the home title. It still supplies the Open Graph site name.
export function fixedPageMetadata(
  slug: string,
  seo: PublishedSeo | undefined,
  site: PublishedSite | null,
  fallback: FixedPageFallback = {},
): Metadata {
  const title = firstUsable(seo?.title) || fallback.title || "";
  const description = firstUsable(seo?.description) || fallback.description || "";
  const canonical = sitePath(usableMeta(seo?.canonical) ? seo?.canonical : undefined, slug);
  const image = usableImage(seo?.ogImage) || fallback.image || "";
  const socialTitle = firstUsable(seo?.ogTitle) || fallback.ogTitle || "";
  const socialDescription = firstUsable(seo?.ogDescription) || fallback.ogDescription || "";
  const siteName = usableMeta(site?.siteName);
  const metadata: Metadata = {
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: canonical,
      ...(siteName ? { siteName } : {}),
      ...(socialTitle ? { title: socialTitle } : {}),
      ...(socialDescription ? { description: socialDescription } : {}),
      ...(image ? { images: [{ url: image, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      card: seo?.twitterCard === "summary" ? "summary" : "summary_large_image",
      site: fallback.twitterSite || "@stancehealth",
      creator: fallback.twitterCreator || "@stancehealth",
      ...(socialTitle || title ? { title: socialTitle || title } : {}),
      ...(socialDescription || description ? { description: socialDescription || description } : {}),
      ...(image ? { images: [image] } : {}),
    },
  };
  if (title) metadata.title = title;
  if (description) metadata.description = description;
  if (seo?.noIndex || seo?.noFollow) {
    metadata.robots = { index: !seo.noIndex, follow: !seo.noFollow };
  }
  return metadata;
}

export async function fixedPageMetadataFor(slug: string, fallback: FixedPageFallback = {}): Promise<Metadata> {
  const [page, site] = await Promise.all([loadPublishedPage(slug), loadPublishedSite()]);
  return fixedPageMetadata(slug, page?.seo, site, fallback);
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
