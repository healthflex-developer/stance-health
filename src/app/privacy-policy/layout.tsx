import { PublishedPage } from "@/components/published/PublishedPage";
import { OG_ASSETS } from "@/lib/constants";
import { fixedPageMetadataFor } from "@/lib/page-metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return fixedPageMetadataFor("privacy-policy", {
    title: "Privacy Policy",
    description: "Stance Health's privacy policy — how we collect, use, and protect your personal and health-related information.",
    image: `${OG_ASSETS}/og-default.png`,
  });
}

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return <PublishedPage slug="privacy-policy">{children}</PublishedPage>;
}
