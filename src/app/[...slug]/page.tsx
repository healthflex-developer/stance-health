import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ComposedSitePage from "@/components/composed/ComposedSitePage";
import { resolvePublishedMetadata } from "@/lib/page-metadata";
import { loadPublishedPage } from "@/lib/published-page";

type Props = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ adminPreview?: string }>;
};

export const dynamic = "force-dynamic";

function joinedSlug(slug: string[]): string {
  return slug.map((part) => {
    try {
      return decodeURIComponent(part);
    } catch {
      return part;
    }
  }).join("/");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const joined = joinedSlug(slug);
  return resolvePublishedMetadata(joined, { title: joined });
}

// A slug with no page file renders its published JSON. The admin preview of a
// page that has not been published yet keeps an empty main so the editor can
// drop sections into it.
export default async function UnpublishedPage({ params, searchParams }: Props) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  if (query.adminPreview === "1") {
    return (
      <>
        <Navbar />
        <main data-admin-draft-root className="min-h-screen bg-[#0d1f3c] pt-24" />
        <Footer />
      </>
    );
  }
  const published = await loadPublishedPage(joinedSlug(slug));
  if (!published) notFound();
  return (
    <ComposedSitePage
      slug={published.slug}
      title={published.title}
      initialBlocks={published.blocks.map((block) => ({
        id: block.id,
        type: block.type,
        props: block.props,
      }))}
    />
  );
}
