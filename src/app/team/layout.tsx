import type { Metadata } from "next";
import { withPublishedSeo } from "@/lib/published-seo";

export const metadata: Metadata = withPublishedSeo("team", {});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
