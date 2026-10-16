"use client";

import Hero from "@/components/sections/Hero";
import Framework from "@/components/sections/Framework";
import Technology from "@/components/sections/Technology";
import Testimonials from "@/components/sections/Testimonials";
import Team from "@/components/sections/Team";
import Centers from "@/components/sections/Centers";
import Programs from "@/components/sections/Programs";
import AboutTeam from "@/components/sections/AboutTeam";
import PhilosophyPillars from "@/components/PhilosophyPillars";
import AdHero from "@/components/lp/AdHero";
import PainPoints from "@/components/lp/PainPoints";
import HowItWorks from "@/components/lp/HowItWorks";
import TechCredibility from "@/components/lp/TechCredibility";
import SocialProof from "@/components/lp/SocialProof";
import FaqCta from "@/components/lp/FaqCta";
import {
  AboutCtaSection,
  AboutHeroSection,
  AboutMissionSection,
  AboutValuesSection,
} from "@/components/sections/AboutSections";
import { ServiceCardsSection, ServicesCtaSection, ServicesHeroSection } from "@/components/sections/ServicesSections";
import { ConditionDirectorySection, ConditionsCtaSection, ConditionsHeroSection } from "@/components/sections/ConditionsSections";
import { BlogPostsSection, BlogHeroSection } from "@/components/sections/BlogSections";
import { BlogArticleHeader, BlogBodySection, BlogCtaSection } from "@/components/sections/BlogArticle";
import { LocationConditionsSection, LocationCtaSection, LocationHeroSection, LocationInfoSection } from "@/components/sections/LocationDetail";
import { LocationCentersSection, LocationNeighbourhoodsSection, LocationsCtaSection, LocationsHeroSection } from "@/components/sections/LocationsSections";
import { ResourceArticleHeader, ResourceBodySection, ResourceCtaSection } from "@/components/sections/ResourceArticle";
import { PartnerTypesSection } from "@/components/sections/PartnerTypesSection";
import { PhilosophyDifferentiatorsSection } from "@/components/sections/PhilosophyDifferentiators";
import { ResourceListSection, ResourcesHeroSection } from "@/components/sections/ResourcesSections";
import { TeamDirectorySection, TeamHeroSection } from "@/components/sections/TeamPageSections";
import AssessmentHero from "@/components/sections/AssessmentHero";
import {
  CareerFAQ,
  CareerOpenRoles,
  CareerStatistics,
  CareerTeamStories,
  CareerTracks,
  CareerValues,
  CareersCTA,
  CareersHero,
} from "@/components/sections/CareersSections";
import { AssessmentPerformanceData, AssessmentToolDetails } from "@/components/sections/AssessmentSections";
import { FaqListSection, GradientHero } from "@/components/sections/FaqSections";
import {
  DetailCta,
  FeatureListSection,
  LegalSections,
  LinkGridSection,
  PartnerFormSection,
  ProseSection,
} from "@/components/composed/CmsBlocks";

const SERVICE_PLACEHOLDERS = [
  { slug: "item", title: "Sample service", summary: "Describe this service.", ctaLabel: "Learn more", href: "" },
];

const HERO_COPY: Record<string, [string, string, string, string]> = {
  FAQHero: ["Support", "Frequently Asked", "Questions", "Everything you need to know before your first visit."],
  PrivacyHero: ["Legal", "Privacy", "Policy", "Your privacy is important to us."],
  TermsHero: ["Legal", "Terms", "and Conditions", "How we provide care, and how this website may be used."],
  PackagePolicyHero: ["Legal", "Package", "Validity", "How package validity and renewals work."],
  ConsentHero: ["Legal", "Patient", "Consent", "What you agree to before treatment."],
  DisclaimerHero: ["Legal", "Doctor", "Disclaimer", "Important information about medical advice on this website."],
  DeleteAccountHero: ["Account", "Delete", "Account", "How to request deletion of your Stance account."],
  ResourcesHero: ["Learn", "Patient", "Resources", "Guides you can use between visits."],
  PhilosophyHero: ["Philosophy", "How we", "work", "Technology, physiotherapy, and strength, used together."],
  PageHero: ["Stance", "Page", "title", "Add a short introduction."],
  RoleHero: ["Careers", "Open", "role", "Add the role summary."],
  LocationHero: ["Locations", "Your", "centre", "Add the centre introduction."],
  ServiceHero: ["Services", "Service", "name", "Add a summary of who this service is for."],
  ConditionHero: ["Conditions", "Condition", "name", "Add a summary of this condition."],
};

export function SectionForType({ type }: { type: string }) {
  switch (type) {
    case "Hero":
      return <Hero />;
    case "Framework":
      return <Framework />;
    case "Technology":
      return <Technology />;
    case "Testimonials":
      return <Testimonials />;
    case "Team":
      return <Team />;
    case "Centers":
    case "CareerCenters":
      return <Centers previewBlockType={type} />;
    case "Programs":
      return <Programs />;
    case "AboutTeam":
      return <AboutTeam />;
    case "AboutHero":
    case "PartnersHero":
      return <AboutHeroSection sourceType={type} />;
    case "LocationsHero":
      return <LocationsHeroSection />;
    case "ServicesHero":
      return <ServicesHeroSection sourceType={type} />;
    case "TeamHero":
      return <TeamHeroSection />;
    case "AboutMission":
      return <AboutMissionSection />;
    case "AboutValues":
      return <AboutValuesSection sourceType={type} />;
    case "PartnerTypes":
      return <PartnerTypesSection partners={[]} />;
    case "AboutCta":
    case "PhilosophyCTA":
      return <AboutCtaSection sourceType={type} />;
    case "LocationsCTA":
      return <LocationsCtaSection />;
    case "ConditionsHero":
      return <ConditionsHeroSection />;
    case "ConditionsCTA":
      return <ConditionsCtaSection />;
    case "ConditionDirectory":
      return <ConditionDirectorySection conditions={[]} />;
    case "ServicesCTA":
      return <ServicesCtaSection />;
    case "ServiceCards":
      return <ServiceCardsSection services={SERVICE_PLACEHOLDERS} />;
    case "BlogHero":
      return <BlogHeroSection />;
    case "BlogPosts":
      return <BlogPostsSection posts={[]} />;
    case "BlogArticle":
      return <BlogArticleHeader article={null} />;
    case "BlogBody":
      return <BlogBodySection article={null} />;
    case "BlogCta":
      return <BlogCtaSection article={null} />;
    case "ResourcesHero":
      return <ResourcesHeroSection />;
    case "ResourceList":
      return <ResourceListSection resources={[]} />;
    case "ResourceArticle":
      return <ResourceArticleHeader article={null} />;
    case "ResourceBody":
      return <ResourceBodySection article={null} />;
    case "ResourceCta":
      return <ResourceCtaSection article={null} />;
    case "LocationCenters":
      return <LocationCentersSection centres={[]} />;
    case "LocationNeighbourhoods":
      return <LocationNeighbourhoodsSection neighbourhoods={[]} />;
    case "LocationHero":
      return <LocationHeroSection location={null} />;
    case "LocationInfo":
      return <LocationInfoSection location={null} />;
    case "LocationConditions":
      return <LocationConditionsSection location={null} />;
    case "LocationCta":
      return <LocationCtaSection location={null} />;
    case "TeamDirectory":
      return <TeamDirectorySection />;
    case "FAQList":
    case "ConditionFaqs":
      return <FaqListSection sourceType={type} />;
    case "PhilosophyHowWeDoIt":
      return <PhilosophyPillars />;
    case "AssessmentHero":
      return <AssessmentHero />;
    case "CareersHero":
      return <CareersHero />;
    case "CareerStatistics":
      return <CareerStatistics />;
    case "CareerTracks":
      return <CareerTracks />;
    case "CareerOpenRoles":
      return <CareerOpenRoles />;
    case "CareerTeamStories":
      return <CareerTeamStories />;
    case "CareerValues":
      return <CareerValues />;
    case "CareerFAQ":
      return <CareerFAQ />;
    case "CareersCTA":
      return <CareersCTA />;
    case "AssessmentToolNavigation":
      return null;
    case "AssessmentToolDetails":
      return <AssessmentToolDetails />;
    case "AssessmentPerformanceData":
      return <AssessmentPerformanceData />;
    case "AdHero":
      return <AdHero />;
    case "PainPoints":
      return <PainPoints />;
    case "HowItWorks":
      return <HowItWorks />;
    case "TechCredibility":
      return <TechCredibility />;
    case "SocialProof":
      return <SocialProof />;
    case "FaqCta":
      return <FaqCta />;
    case "PartnerContactForm":
    case "RoleApply":
      return <PartnerFormSection sourceType={type} />;
    case "PrivacySections":
    case "TermsSections":
    case "PackagePolicySections":
    case "ConsentSections":
    case "DisclaimerSections":
    case "DeleteAccountSections":
    case "RoleSections":
      return <LegalSections sourceType={type} />;
    case "PhilosophyDifferentiators":
      return <PhilosophyDifferentiatorsSection items={[]} />;
    case "ServiceFeatures":
    case "ConditionSymptoms":
    case "ConditionCauses":
      return <FeatureListSection sourceType={type} heading="This section" />;
    case "ServiceConditions":
    case "ConditionLocations":
    case "ConditionServices":
      return (
        <LinkGridSection
          sourceType={type}
          heading="Related links"
          listKey={
            type === "ServiceConditions"
              ? "conditions"
              : type === "ConditionLocations"
                ? "locations"
                : type === "ConditionServices"
                  ? "services"
                  : "centers"
          }
        />
      );
    case "ServiceCta":
    case "ConditionCta":
      return <DetailCta sourceType={type} />;
    case "RoleAbout":
    case "ServiceAudience":
    case "ServiceApproach":
    case "ConditionApproach":
    case "PageSection":
    case "DownloadRedirect":
    case "QrDownload":
    case "RoleGlance":
      return <ProseSection sourceType={type} heading="Section" body="Add the copy for this section." />;
    default: {
      const hero = HERO_COPY[type];
      if (hero) {
        return <GradientHero sourceType={type} eyebrow={hero[0]} prefix={hero[1]} highlight={hero[2]} description={hero[3]} />;
      }
      return <ProseSection sourceType={type} heading={type} body="Add the copy for this section." />;
    }
  }
}
