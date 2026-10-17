import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ContactIntro } from "@/components/sections/ContactIntro";
import { PublishedPage } from "@/components/published/PublishedPage";
import { OG_ASSETS } from "@/lib/constants";
import { fixedPageMetadataFor } from "@/lib/page-metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return fixedPageMetadataFor("contact", {
    title: "Contact Us",
    description: "Get in touch with the Stance Health team.",
    image: `${OG_ASSETS}/og-default.png`,
  });
}

export default function ContactPage() {
  return (
    <PublishedPage slug="contact">
      <Navbar />
      <main className="min-h-screen bg-[#0c1b30] flex items-center justify-center">
        <ContactIntro />
      </main>
      <Footer />
    </PublishedPage>
  );
}
