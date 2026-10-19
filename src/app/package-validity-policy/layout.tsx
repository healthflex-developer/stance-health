import { PublishedPage } from "@/components/published/PublishedPage";
import { OG_ASSETS } from "@/lib/constants";
import { fixedPageMetadataFor } from "@/lib/page-metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return fixedPageMetadataFor("package-validity-policy", {
    title: "Package Validity Policy",
    description: "How treatment packages work, when they expire, and how to request an extension.",
    image: `${OG_ASSETS}/og-default.png`,
  });
}

export default function PackageValidityLayout({ children }: { children: React.ReactNode }) {
  return <PublishedPage slug="package-validity-policy">{children}</PublishedPage>;
}
