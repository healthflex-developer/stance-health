import { PublishedPage } from "@/components/published/PublishedPage";
import { OG_ASSETS } from "@/lib/constants";
import { fixedPageMetadataFor } from "@/lib/page-metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return fixedPageMetadataFor("delete-account", {
    title: "Delete Your Account",
    description: "Request deletion of your Stance Health account and associated data.",
    image: `${OG_ASSETS}/og-default.png`,
  });
}

export default function DeleteAccountLayout({ children }: { children: React.ReactNode }) {
  return <PublishedPage slug="delete-account">{children}</PublishedPage>;
}