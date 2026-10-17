import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutSections from "@/components/sections/AboutSections";
import { PublishedPage } from "@/components/published/PublishedPage";
import { OG_ASSETS } from "@/lib/constants";
import { fixedPageMetadataFor } from "@/lib/page-metadata";
import type { Metadata } from "next";

const ABOUT_IMAGE = `${OG_ASSETS}/og-about.png`;

export async function generateMetadata(): Promise<Metadata> {
  return fixedPageMetadataFor("about", {
    title: "We are Stance",
    description:
      "Meet the expert team behind Stance Health — leading physiotherapists and strength coaches dedicated to evidence-backed orthopaedic rehabilitation.",
    image: ABOUT_IMAGE,
    ogTitle: "We are Stance – Stance Health",
    ogDescription: "Meet the expert team behind Stance Health — leading physiotherapists and strength coaches.",
  });
}

export default function AboutPage() {
  return (
    <PublishedPage slug="about">
      <Navbar />
      <AboutSections />
      <Footer />
    </PublishedPage>
  );
}
