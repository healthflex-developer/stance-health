import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Framework from "@/components/sections/Framework";
import Technology from "@/components/sections/Technology";
import Testimonials from "@/components/sections/Testimonials";
import Team from "@/components/sections/Team";
import Programs from "@/components/sections/Programs";
import Centers from "@/components/sections/Centers";
import Footer from "@/components/Footer";
import AdminPreviewBridge from "@/components/AdminPreviewBridge";
import { PublishedBlocksProvider } from "@/components/PublishedContent";
import { BASE_URL, OG_ASSETS } from "@/lib/constants";
import { homePageMetadata } from "@/lib/page-metadata";
import { publishedBlocksById } from "@/lib/published-fields";
import { loadPublishedPage } from "@/lib/published-page";
import { loadPublishedSite } from "@/lib/site-content";

const HOME_SOCIAL_IMAGE = `${OG_ASSETS}/og-default.png`;

export async function generateMetadata(): Promise<Metadata> {
  const [page, site] = await Promise.all([loadPublishedPage("home"), loadPublishedSite()]);
  return homePageMetadata(page?.seo, site, {
    image: HOME_SOCIAL_IMAGE,
    twitterSite: "@stancehealth",
    twitterCreator: "@stancehealth",
  });
}

// WebSite + FAQPage JSON-LD for the home page
const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Stance Health",
      publisher: { "@id": `${BASE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${BASE_URL}/blog?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What conditions does Stance Health treat?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Stance Health treats ACL injuries, knee pain, back pain, running injuries, post-surgical rehab, ankle sprains, shoulder injuries, and a wide range of orthopaedic and musculoskeletal conditions.",
          },
        },
        {
          "@type": "Question",
          name: "Where are Stance Health clinics located?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Stance Health clinics are located in Bangalore, India. Visit our centres page for exact addresses and directions.",
          },
        },
        {
          "@type": "Question",
          name: "How do I book an appointment at Stance Health?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can book an appointment online through our booking portal at book.stance.health, or contact us directly through the website.",
          },
        },
        {
          "@type": "Question",
          name: "Does Stance Health offer at-home physiotherapy?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Through our HealthFlex AI platform, Stance Health offers remote sessions with real-time movement feedback and progress tracking between clinic visits.",
          },
        },
      ],
    },
  ],
};

export default async function Home() {
  const published = await loadPublishedPage("home");
  return (
    <PublishedBlocksProvider blocks={publishedBlocksById(published)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <Navbar />
      <AdminPreviewBridge />
      <main>
        <div data-preview-block="Hero"><Hero /></div>
        <div data-preview-block="Framework"><Framework /></div>
        <div data-preview-block="Technology"><Technology /></div>
        <div data-preview-block="Testimonials"><Testimonials /></div>
        <div data-preview-block="Team"><Team /></div>
        {/* <Programs /> */}
        <div data-preview-block="Centers"><Centers /></div>
      </main>
      <Footer />
    </PublishedBlocksProvider>
  );
}
