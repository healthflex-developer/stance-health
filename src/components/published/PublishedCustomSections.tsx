import { headers } from "next/headers";
import { CustomSectionMount } from "@/components/sections/custom/registry";
import { isCustomSectionType } from "@/lib/custom-sections";
import { loadPublishedPage } from "@/lib/published-page";
import { contentBlocks } from "@/lib/preview-sync";
import { isHardcodedSiteSlug, slugFromPathname } from "@/lib/site-routes";

// Existing pages keep their own markup. After publish, custom sections saved
// on those pages are read from the same JSON file and placed in the page.
export async function PublishedCustomSections() {
  const headerStore = await headers();
  const pathname = headerStore.get("x-pathname");
  if (!pathname) return null;
  const search = headerStore.get("x-search") ?? "";
  if (new URLSearchParams(search).get("adminPreview") === "1") return null;
  const slug = slugFromPathname(pathname);
  if (!isHardcodedSiteSlug(slug)) return null;
  const page = await loadPublishedPage(slug);
  if (!page) return null;
  const blocks = contentBlocks(page.blocks);
  if (!blocks.some((block) => isCustomSectionType(block.type))) return null;
  return <CustomSectionMount blocks={blocks} />;
}
