import { PublishedBlocksProvider } from "@/components/PublishedContent";
import { publishedBlocksById } from "@/lib/published-fields";
import { loadPublishedPage } from "@/lib/published-page";

export async function PublishedPage({ slug, children }: { slug: string; children: React.ReactNode }) {
  const page = await loadPublishedPage(slug);
  return <PublishedBlocksProvider blocks={publishedBlocksById(page)}>{children}</PublishedBlocksProvider>;
}
