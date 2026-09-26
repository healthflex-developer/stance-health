import ServicesContent from "./ServicesContent";
import { getAllServices } from "@/lib/seo-pages";
import type { Metadata } from "next";
import { withPublishedSeo } from "@/lib/published-seo";

export const metadata: Metadata = withPublishedSeo("services", {
  title: "Services",
  description:
    "Explore Stance Health's clinical services — pain & injury recovery, post-surgery rehab, sports injury, running assessment, strength training, and corporate wellness.",
  alternates: { canonical: "/services" },
});

export default async function ServicesHubPage() {
  const services = await getAllServices();
  return <ServicesContent services={services} />;
}
