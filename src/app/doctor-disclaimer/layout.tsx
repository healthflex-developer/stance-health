import { PublishedPage } from "@/components/published/PublishedPage";
import { OG_ASSETS } from "@/lib/constants";
import { fixedPageMetadataFor } from "@/lib/page-metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return fixedPageMetadataFor("doctor-disclaimer", {
    title: "Doctor Disclaimer",
    description: "Important information regarding orthopaedic consultations at Stance Health.",
    image: `${OG_ASSETS}/og-default.png`,
  });
}

export default function DoctorDisclaimerLayout({ children }: { children: React.ReactNode }) {
  return <PublishedPage slug="doctor-disclaimer">{children}</PublishedPage>;
}
