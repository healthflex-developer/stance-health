import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ServicesSections } from "@/components/sections/ServicesSections";
import { PublishedPage } from "@/components/published/PublishedPage";
import { OG_ASSETS } from "@/lib/constants";
import { fixedPageMetadataFor } from "@/lib/page-metadata";
import { getAllServices } from "@/lib/seo-pages";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return fixedPageMetadataFor("services", {
    title: "Services",
    description:
      "Explore Stance Health's clinical services — pain & injury recovery, post-surgery rehab, sports injury, running assessment, strength training, and corporate wellness.",
    image: `${OG_ASSETS}/og-default.png`,
  });
}

export default async function ServicesHubPage() {
  const services = await getAllServices();
  return (
    <PublishedPage slug="services">
      <Navbar />
      <ServicesSections services={services.map((service) => ({ slug: service.slug, title: service.title, summary: service.summary }))} />
      <Footer />
    </PublishedPage>
  );
}
