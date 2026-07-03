import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdHero from "@/components/lp/AdHero";
import PainPoints from "@/components/lp/PainPoints";
import HowItWorks from "@/components/lp/HowItWorks";
import TechCredibility from "@/components/lp/TechCredibility";
import SocialProof from "@/components/lp/SocialProof";
import FaqCta from "@/components/lp/FaqCta";
import StickyMobileCta from "@/components/lp/StickyMobileCta";

// Ad-only landing page for paid campaigns — not linked in nav, excluded from
// the sitemap, and marked noindex so it doesn't compete with /  in search.
export const metadata: Metadata = {
  title: "Stop Guessing Why It Still Hurts | Stance Health Assessment",
  description:
    "Book a data-driven MSK assessment at Stance Health. Find the root cause of your pain with VALD diagnostics and a personalised recovery plan — Bangalore.",
  robots: { index: false, follow: false },
};

export default function AdAssessmentLandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <AdHero />
        <PainPoints />
        <HowItWorks />
        <TechCredibility />
        <SocialProof />
        <FaqCta />
      </main>
      <div className="pb-16 sm:pb-0">
        <Footer />
      </div>
      <StickyMobileCta />
    </>
  );
}
