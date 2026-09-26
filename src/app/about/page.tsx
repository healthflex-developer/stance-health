import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ASSETS, OG_ASSETS } from "@/lib/constants";
import BookingCta from "@/components/BookingCta";
import AboutTeam from "@/components/sections/AboutTeam";
import AdminPreviewSection from "@/components/AdminPreviewSection";
import { assetAlt, isDecorative } from "@/lib/asset-label";
import { publishedBlock } from "@/lib/published-seo";

import type { Metadata } from "next";
import { withPublishedSeo } from "@/lib/published-seo";

export const metadata: Metadata = withPublishedSeo("about", {
  title: "We are Stance",
  description:
    "Meet the expert team behind Stance Health — leading physiotherapists and strength coaches dedicated to evidence-backed orthopaedic rehabilitation.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "We are Stance – Stance Health",
    description:
      "Meet the expert team behind Stance Health — leading physiotherapists and strength coaches.",
    url: "/about",
    images: [{ url: `${OG_ASSETS}/og-about.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "We are Stance – Stance Health",
    description: "Meet the expert team behind Stance Health.",
    images: [`${OG_ASSETS}/og-about.png`],
  },
});

// These are the public-site defaults. The admin seeds the same values into the
// MongoDB `pages.about` document and applies draft values only inside its
// ?adminPreview=1 iframe, preserving normal public-site rendering.
const VALUES = [
  {
    title: "Patient Education",
    description:
      "We believe in empowering our patients with knowledge. Understanding your condition and recovery process is key to long-term success.",
  },
  {
    title: "Evidence-Based Technology",
    description:
      "Our clinical decisions are guided by data. We use cutting-edge diagnostic tools to measure, track, and optimise your recovery objectively.",
  },
  {
    title: "Expert Therapists",
    description:
      "Our team comprises continuously trained professionals with diverse experience across sports, orthopaedics, and performance.",
  },
  {
    title: "Multidisciplinary Integration",
    description:
      "We combine sports orthopaedics, physical therapy, and strength & conditioning across all phases of recovery and performance.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AdminPreviewSection blockId="about-hero" blockType="AboutHero">
          <section className="relative min-h-[420px] flex items-end pb-16 pt-32 bg-[#132644]">
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={`${ASSETS}/about-banner.svg`}
                alt="About Stance Health"
                fill
                className="object-cover object-center opacity-30"
                priority
                data-admin-field="backgroundImage"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#132644]/60 to-[#132644]" />
            </div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p data-admin-field="eyebrow" className="text-[#cdfe71] text-sm font-semibold uppercase tracking-widest mb-3">
                About Us
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
                <span data-admin-field="headingPrefix">We are </span>
                <span data-admin-field="headingHighlight" className="text-[#cdfe71]">Stance</span>
              </h1>
              <p data-admin-field="description" className="text-white/70 text-lg max-w-2xl">
                Evidence-backed Orthopaedic Rehab, where Medical Science &amp; Technology are
                tailored for your performance and recovery.
              </p>
            </div>
          </section>
        </AdminPreviewSection>

        <AdminPreviewSection blockId="about-mission" blockType="AboutMission">
          <section className="py-20 bg-[#0c1b30]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="section-title mb-6">
                    <span data-admin-field="headingPrefix" className="heading-prefix" style={{ color: "#ffffff" }}>Our </span>
                    <span data-admin-field="headingHighlight" className="text-[#cdfe71] heading-highlight">Mission</span>
                  </h2>
                  <p data-admin-field="paragraphOne" className="text-white/70 text-lg leading-relaxed mb-6">
                    At Stance, we&apos;re committed to providing high-quality care to all who aspire to
                    have an active life. Our goal is to redefine healthcare standards by fostering
                    innovation and integrating cutting-edge technology with expert clinical practice.
                  </p>
                  <p data-admin-field="paragraphTwo" className="text-white/70 text-lg leading-relaxed mb-8">
                    We restore function, reduce pain, and promote overall well-being through
                    personalised physiotherapy and strengthening programmes, guided by a
                    multi-disciplinary team of professionals.
                  </p>
                  <BookingCta dataAdminField="ctaHref" className="btn-primary">
                    <span data-admin-field="ctaLabel">Book an Appointment</span>
                  </BookingCta>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl overflow-hidden aspect-[4/5] relative">
                    <Image
                      src={`${ASSETS}/about-1-img.PNG`}
                      alt={assetAlt(publishedBlock("about-mission")?.props, "imageOne", "Stance clinic")}
                      aria-hidden={isDecorative(publishedBlock("about-mission")?.props, "imageOne") || undefined}
                      fill
                      className="object-cover"
                      data-admin-field="imageOne"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden aspect-[4/5] relative mt-8">
                    <Image
                      src={`${ASSETS}/about-2-img.jpeg`}
                      alt={assetAlt(publishedBlock("about-mission")?.props, "imageTwo", "Stance team in action")}
                      aria-hidden={isDecorative(publishedBlock("about-mission")?.props, "imageTwo") || undefined}
                      fill
                      className="object-cover"
                      data-admin-field="imageTwo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AdminPreviewSection>

        <AdminPreviewSection blockId="about-values" blockType="AboutValues">
          <section className="py-20 bg-[#132644]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="section-title text-center mb-4">
                <span data-admin-field="headingPrefix" className="heading-prefix">What Sets Us </span>
                <span data-admin-field="headingHighlight" className="text-[#cdfe71] heading-highlight">Apart</span>
              </h2>
              <p data-admin-field="intro" className="text-white/50 text-center text-lg mb-12 max-w-2xl mx-auto">
                Our approach combines the best of clinical expertise, technology, and personalised care.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {VALUES.map((value, index) => (
                  <div
                    key={value.title}
                    className="card-navy border border-white/10"
                    data-admin-list="values"
                    data-admin-list-index={index}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#cdfe71]/15 flex items-center justify-center mb-4">
                      <div className="w-3 h-3 rounded-full bg-[#cdfe71]" />
                    </div>
                    <h3 data-admin-list-field="title" className="text-white font-bold text-lg mb-2">{value.title}</h3>
                    <p data-admin-list-field="description" className="text-white/60 text-sm leading-relaxed">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AdminPreviewSection>

        <AdminPreviewSection blockId="about-team" blockType="AboutTeam">
          <AboutTeam />
        </AdminPreviewSection>

        <AdminPreviewSection blockId="about-cta" blockType="AboutCta">
          <section className="py-20 bg-[#cdfe71]">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 data-admin-field="heading" className="text-3xl sm:text-4xl font-extrabold text-black mb-4">
                Ready to begin your journey?
              </h2>
              <p data-admin-field="description" className="text-black/70 mb-8">
                Our team is ready to help you achieve your performance and recovery goals.
              </p>
              <BookingCta dataAdminField="ctaHref" className="inline-block bg-black text-white font-semibold px-8 py-3 rounded-full hover:bg-black/80 transition-colors">
                <span data-admin-field="ctaLabel">Book an Appointment</span>
              </BookingCta>
            </div>
          </section>
        </AdminPreviewSection>
      </main>
      <Footer />
    </>
  );
}
