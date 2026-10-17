import { PublishedPage } from "@/components/published/PublishedPage";
import { OG_ASSETS } from "@/lib/constants";
import { fixedPageMetadataFor } from "@/lib/page-metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return fixedPageMetadataFor("terms-and-conditions", {
    title: "Terms and Conditions",
    description: "Please read these terms and conditions carefully before using Stance Health services.",
    image: `${OG_ASSETS}/og-default.png`,
  });
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <PublishedPage slug="terms-and-conditions">{children}</PublishedPage>;
}
