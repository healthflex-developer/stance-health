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
import { BASE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    images: [{ url: "/assets/images/og-default.png", width: 1200, height: 630 }],
  },
};

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
            text: "You can book an appointment online through our patient dashboard at dashboard.stance.health, or contact us directly through the website.",
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

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <Navbar />
      <main>
        <Hero />
        <Framework />
        <Technology />
        <Testimonials />
        <Team />
        <Programs />
        <Centers />
      </main>
      <Footer />
    </>
  );
}
