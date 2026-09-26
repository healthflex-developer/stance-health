import type { Metadata } from "next";
import { withPublishedSeo } from "@/lib/published-seo";

export const metadata: Metadata = withPublishedSeo("privacy-policy", {});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
