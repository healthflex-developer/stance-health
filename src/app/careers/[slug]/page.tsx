"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import AdminPreviewSection from "@/components/AdminPreviewSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { previewList, previewText, useAdminPreviewBlock } from "@/components/PreviewDraft";
import { OPEN_ROLES_DETAILED } from "@/lib/constants";

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const role = OPEN_ROLES_DETAILED.find((r) => r.slug === slug);
  const hero = useAdminPreviewBlock("role-hero", "RoleHero");
  const about = useAdminPreviewBlock("role-about", "RoleAbout");
  const sectionsBlock = useAdminPreviewBlock("role-sections", "RoleSections");
  const glance = useAdminPreviewBlock("role-glance", "RoleGlance");
  const apply = useAdminPreviewBlock("role-apply", "RoleApply");
  const [copied, setCopied] = useState(false);
  const title = previewText(hero, "title", role?.title ?? "");
  const description = previewText(hero, "description", role?.description ?? "");
  const sections = previewList<{ title?: string; points?: { text?: string }[] }>(sectionsBlock, "sections", role?.sections.map((section) => ({ title: section.title, points: section.points.map((text) => ({ text })) })) ?? []);
  const whyJoin = previewList<{ text?: string }>(sectionsBlock, "whyJoin", role?.whyJoin.map((text) => ({ text })) ?? []);

  if (!role) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#0d1f3c] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-white text-2xl font-bold mb-4">Role not found</h1>
            <Link href="/careers#open-roles" className="text-[#cdfe71] hover:underline">
              ← Back to all roles
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApply = () => {
    const el = document.getElementById("apply-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar />
      <main className="bg-[#0d1f3c] min-h-screen">

        {/* ─── Hero / Header ───────────────────────────────────────────── */}
        <AdminPreviewSection blockId="role-hero" blockType="RoleHero">
        <section className="pt-28 pb-12 bg-[#0d1f3c]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/careers#open-roles"
              className="text-white/50 text-sm hover:text-[#cdfe71] transition-colors mb-6 inline-block"
            >
              ← All roles
            </Link>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-[#cdfe71] text-black text-xs font-bold uppercase">
                {previewText(hero, "category", role.category)}
              </span>
              <span className="px-3 py-1 rounded-full border border-white/20 text-white/70 text-xs">
                {previewText(hero, "location", role.location)}
              </span>
              <span className="px-3 py-1 rounded-full border border-white/20 text-white/70 text-xs">
                {previewText(hero, "jobType", role.type)}
              </span>
            </div>

            {/* Title */}
            <h1 data-admin-field="title" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight font-[family-name:var(--font-unbounded)] mb-4">
              {title}
            </h1>
            <p className="text-white/60 text-base sm:text-lg max-w-2xl leading-relaxed">
              {description}
            </p>
          </div>
        </section>
        </AdminPreviewSection>

        {/* ─── Content: Left sections + Right sidebar ──────────────────── */}
        <section className="pb-20 bg-[#0d1f3c]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">

              {/* Left: About + Responsibilities */}
              <div className="space-y-6">
                {/* About Stance Health */}
                <AdminPreviewSection blockId="role-about" blockType="RoleAbout">
                <div className="bg-[#132644]/60 border border-white/[0.06] rounded-2xl p-6 sm:p-8">
                  <p data-admin-field="eyebrow" className="text-[#cdfe71] text-xs font-bold uppercase tracking-wider mb-3">
                    {previewText(about, "eyebrow", "About Stance Health")}
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {previewText(about, "body", "Stance Health is an innovative physiotherapy and performance healthcare organization specializing in injury prevention, pain management, movement optimization, and performance enhancement. Three centers in Bengaluru (HSR, Whitefield, Indiranagar) delivering 4,000+ sessions every month, expanding fast across the city.")}
                  </p>
                </div>
                </AdminPreviewSection>

                <AdminPreviewSection blockId="role-sections" blockType="RoleSections">
                {/* Responsibility Sections */}
                {sections.map((section, i) => (
                  <div
                    key={section.title}
                    className="bg-[#132644]/60 border border-white/[0.06] rounded-2xl p-6 sm:p-8"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[#cdfe71] text-xs font-bold">0{i + 1}</span>
                      <h3 className="text-white font-bold text-base sm:text-lg">{section.title}</h3>
                    </div>
                    <ul className="space-y-2.5">
                      {(section.points ?? []).map((point) => (
                        <li key={point.text} className="flex items-start gap-3">
                          <svg viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0 w-4 h-4 text-[#cdfe71]">
                            <circle cx="10" cy="10" r="10" fill="currentColor" fillOpacity="0.15" />
                            <path d="M6 10.5l2.5 2.5L14 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span className="text-white/60 text-sm leading-relaxed">{point.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Why Join */}
                <div className="bg-[#cdfe71]/5 border border-[#cdfe71]/15 rounded-2xl p-6 sm:p-8">
                  <h3 className="text-white font-bold text-base sm:text-lg mb-4">
                    <span data-admin-field="whyHeadingPrefix">{previewText(sectionsBlock, "whyHeadingPrefix", "Why join ")}</span>
                    <span data-admin-field="whyHeadingHighlight" className="text-[#cdfe71]">{previewText(sectionsBlock, "whyHeadingHighlight", "Stance Health?")}</span>
                  </h3>
                  <ul className="space-y-2.5">
                    {whyJoin.map((point) => (
                      <li key={point.text} className="flex items-start gap-3">
                        <svg viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0 w-4 h-4 text-[#cdfe71]">
                          <circle cx="10" cy="10" r="10" fill="currentColor" fillOpacity="0.15" />
                          <path d="M6 10.5l2.5 2.5L14 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-white/60 text-sm leading-relaxed">{point.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                </AdminPreviewSection>
              </div>

              <AdminPreviewSection blockId="role-glance" blockType="RoleGlance">
              {/* Right: Sticky Sidebar */}
              <div className="lg:sticky lg:top-24 self-start space-y-6">
                {/* Role at a Glance */}
                <div className="bg-[#132644]/60 border border-white/[0.06] rounded-2xl p-6">
                  <p data-admin-field="heading" className="text-[#cdfe71] text-xs font-bold uppercase tracking-wider mb-5">
                    {previewText(glance, "heading", "Role at a Glance")}
                  </p>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/40">Location</span>
                      <span data-admin-field="location" className="text-white text-right max-w-[180px]">{previewText(glance, "location", role.location)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">Experience</span>
                      <span data-admin-field="experience" className="text-white text-right max-w-[180px]">{previewText(glance, "experience", role.experience)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">Type</span>
                      <span data-admin-field="jobType" className="text-white">{previewText(glance, "jobType", role.type)}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-white/40">Qualification</span>
                      <span data-admin-field="qualification" className="text-white text-right max-w-[180px] text-xs leading-relaxed">{previewText(glance, "qualification", role.qualification)}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <button
                  onClick={handleApply}
                  className="w-full py-3 rounded-full border border-white text-white font-semibold text-sm hover:bg-white hover:text-[#132644] transition-all duration-300"
                >
                  <span data-admin-field="applyLabel">{previewText(glance, "applyLabel", "Apply for this role")}</span>
                </button>
                <button
                  onClick={handleCopyLink}
                  className="w-full py-3 rounded-full border border-[#cdfe71] text-[#cdfe71] font-semibold text-sm hover:bg-[#cdfe71] hover:text-black transition-all duration-300"
                >
                  {copied ? "Link copied!" : <span data-admin-field="copyLabel">{previewText(glance, "copyLabel", "Copy link")}</span>}
                </button>
              </div>
              </AdminPreviewSection>
            </div>
          </div>
        </section>

        {/* ─── Apply Section ───────────────────────────────────────────── */}
        <AdminPreviewSection blockId="role-apply" blockType="RoleApply">
        <section id="apply-section" className="py-20 bg-[#0a1628]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p data-admin-field="eyebrow" className="text-[#cdfe71] text-xs font-bold uppercase tracking-wider mb-3">{previewText(apply, "eyebrow", "Apply")}</p>
            <h2 data-admin-field="headingPrefix" className="text-2xl sm:text-3xl font-extrabold text-white mb-2 font-[family-name:var(--font-unbounded)]">
              {previewText(apply, "headingPrefix", "Take a stance — apply for")}
            </h2>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#cdfe71] mb-4 font-[family-name:var(--font-unbounded)]">
              {previewText(apply, "headingHighlight", title)}
            </h2>
            <p data-admin-field="description" className="text-white/50 text-sm mb-10">
              {previewText(apply, "description", "We read every application. Share a resume link and one case you're proud of.")}
            </p>

            {/* Application Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = `mailto:careers@stance.health?subject=Application: ${title}&body=Hi Stance Team,%0D%0A%0D%0AI'd like to apply for the ${title} role.%0D%0A%0D%0APlease find my details below.`;
              }}
              className="bg-[#132644] border border-white/[0.08] rounded-2xl p-6 sm:p-8 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-white/50 text-xs font-bold uppercase tracking-wider mb-2">Full Name*</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-[#0d1f3c] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-[#cdfe71]/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-white/50 text-xs font-bold uppercase tracking-wider mb-2">Email*</label>
                  <input
                    type="email"
                    required
                    className="w-full bg-[#0d1f3c] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-[#cdfe71]/50 focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-white/50 text-xs font-bold uppercase tracking-wider mb-2">Phone</label>
                  <input
                    type="tel"
                    className="w-full bg-[#0d1f3c] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-[#cdfe71]/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-white/50 text-xs font-bold uppercase tracking-wider mb-2">Preferred Center</label>
                  <select className="w-full bg-[#0d1f3c] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-[#cdfe71]/50 focus:outline-none transition-colors">
                    <option>No preference</option>
                    <option>HSR Layout</option>
                    <option>Whitefield</option>
                    <option>Indiranagar</option>
                    <option>JP Nagar</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-white/50 text-xs font-bold uppercase tracking-wider mb-2">Resume Link (Drive / LinkedIn / PDF)</label>
                <input
                  type="url"
                  placeholder="https://..."
                  className="w-full bg-[#0d1f3c] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/30 focus:border-[#cdfe71]/50 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-white/50 text-xs font-bold uppercase tracking-wider mb-2">One case, project or moment you&apos;re proud of</label>
                <textarea
                  rows={4}
                  className="w-full bg-[#0d1f3c] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/30 focus:border-[#cdfe71]/50 focus:outline-none transition-colors resize-none"
                />
              </div>
              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => router.push("/careers#open-roles")}
                  className="px-6 py-2.5 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-white text-[#132644] text-sm font-semibold hover:bg-[#cdfe71] transition-all duration-300"
                >
                  Submit application
                </button>
              </div>
            </form>
          </div>
        </section>
        </AdminPreviewSection>
      </main>
      <Footer />
    </>
  );
}
