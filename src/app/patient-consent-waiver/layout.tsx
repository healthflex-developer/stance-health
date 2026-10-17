import { PublishedPage } from "@/components/published/PublishedPage";
import { OG_ASSETS } from "@/lib/constants";
import { fixedPageMetadataFor } from "@/lib/page-metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return fixedPageMetadataFor("patient-consent-waiver", {
    title: "Patient Consent & Waiver",
    description: "Please read this carefully before beginning your care at Stance Health.",
    image: `${OG_ASSETS}/og-default.png`,
  });
}

export default function PatientConsentLayout({ children }: { children: React.ReactNode }) {
  return <PublishedPage slug="patient-consent-waiver">{children}</PublishedPage>;
}
