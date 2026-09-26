import type { Metadata } from "next";
import { withPublishedSeo } from "@/lib/published-seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return withPublishedSeo(`careers/${slug}`, {});
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
