import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AssessmentHero from "@/components/sections/AssessmentHero";
import Testimonials from "@/components/sections/Testimonials";
import Team from "@/components/sections/Team";
import Centers from "@/components/sections/Centers";
import { AboutCtaSection } from "@/components/sections/AboutSections";
import {
  AcademiesStatsSection,
  AcademiesPartnersSection,
  AcademiesWaysSection,
  AcademiesReportSection,
} from "@/components/sections/AcademiesSections";
import { CustomAssessmentEnrollment } from "@/components/sections/custom/CustomAssessmentEnrollment";
import { FaqListSection } from "@/components/sections/FaqSections";
import { PublishedPage } from "@/components/published/PublishedPage";
import { OG_ASSETS } from "@/lib/constants";
import { fixedPageMetadataFor } from "@/lib/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return fixedPageMetadataFor("academies", {
    title: "Stance Health Academies",
    description:
      "Athlete assessments, field programs, and rehab for sports academies and players in Bengaluru.",
    image: `${OG_ASSETS}/og-default.png`,
  });
}

export default function AcademiesPage() {
  return (
    <PublishedPage slug="academies">
      <Navbar />
      <main className="bg-white">
        <AssessmentHero />
        <AcademiesStatsSection />
        <AcademiesPartnersSection />
        <div id="academies-enrollment" data-preview-block="CustomAssessmentEnrollment">
          <CustomAssessmentEnrollment />
        </div>
        <AcademiesWaysSection />
        <AcademiesReportSection />
        <div className="bg-[#0c1b30]">
          <Testimonials />
          <Team />
          <Centers />
        </div>
        <section className="bg-[#0c1b30] pt-16 pb-4">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="section-title mb-3">
              Frequently Asked <span>Questions</span>
            </h2>
          </div>
          <FaqListSection sourceType="FAQList" />
        </section>
        <AboutCtaSection sourceType="AboutCta" />
      </main>
      <Footer />
    </PublishedPage>
  );
}
