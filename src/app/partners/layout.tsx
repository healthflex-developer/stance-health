import { PublishedPage } from "@/components/published/PublishedPage";
import { OG_ASSETS } from "@/lib/constants";
import { fixedPageMetadataFor } from "@/lib/page-metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return fixedPageMetadataFor("partners", {
    title: "Partner With Us",
    description:
      "Collaborate with Stance Health — we work with doctors, hospitals, sports academies, and corporates to deliver evidence-backed orthopaedic rehab.",
    image: `${OG_ASSETS}/og-default.png`,
    ogTitle: "Partner With Us – Stance Health",
    ogDescription: "We collaborate with doctors, hospitals, sports academies, and corporates to deliver evidence-backed rehab.",
  });
}

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return <PublishedPage slug="partners">{children}</PublishedPage>;
}
