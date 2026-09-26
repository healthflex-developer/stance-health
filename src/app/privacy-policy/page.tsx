"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SECTIONS = [
  { id: "commitments", number: "01", title: "Our Privacy Commitments" },
  { id: "categories", number: "02", title: "Categories of Information Collected" },
  { id: "purpose", number: "03", title: "Purpose of Collection and Use" },
  { id: "deidentification", number: "04", title: "De-identification and Research Use" },
  { id: "technology", number: "05", title: "Use of Technology Platforms" },
  { id: "consent", number: "06", title: "Consent and Acceptance" },
  { id: "rights", number: "07", title: "User Rights and Data Requests" },
  { id: "retention", number: "08", title: "Data Retention" },
  { id: "sharing", number: "09", title: "Data Sharing and Disclosure" },
  { id: "advertising", number: "10", title: "Advertising and Communication" },
  { id: "security", number: "11", title: "Data Security" },
  { id: "children", number: "12", title: "Children's Privacy" },
  { id: "grievance", number: "13", title: "Grievance Officer" },
  { id: "updates", number: "14", title: "Updates to this Policy" },
];

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative min-h-[280px] flex items-end pb-14 pt-32 bg-[#132644]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#132644] via-[#0c1b30] to-[#1a3358]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
            <p className="text-[#cdfe71] text-sm font-semibold uppercase tracking-widest mb-3">
              Legal
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-3">
              Privacy <span className="text-[#cdfe71]">Policy</span>
            </h1>
            <p className="text-white/60 text-lg">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-[#0c1b30]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">

              {/* Sticky TOC */}
              <aside className="hidden lg:block">
                <div className="sticky top-24 bg-white/[0.03] border border-[#cdfe71]/12 rounded-xl p-5">
                  <p className="text-[#cdfe71] text-[11px] font-bold tracking-[2px] uppercase mb-4">
                    Contents
                  </p>
                  <ul className="space-y-0.5">
                    {SECTIONS.map((s) => (
                      <li key={s.id}>
                        <button
                          onClick={() => scrollTo(s.id)}
                          className={`flex items-start gap-2 w-full text-left px-2 py-1.5 rounded-md text-xs leading-relaxed transition-all duration-200 ${
                            activeSection === s.id
                              ? "bg-[#cdfe71]/10 text-[#cdfe71]"
                              : "text-white/50 hover:bg-[#cdfe71]/5 hover:text-[#cdfe71]"
                          }`}
                        >
                          <span
                            className={`text-[10px] font-bold flex-shrink-0 mt-0.5 ${
                              activeSection === s.id ? "text-[#cdfe71]" : "text-[#cdfe71]/40"
                            }`}
                          >
                            {s.number}
                          </span>
                          <span>{s.title}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>

              {/* Mobile TOC */}
              <div className="lg:hidden bg-white/[0.03] border border-[#cdfe71]/12 rounded-xl p-4">
                <p className="text-[#cdfe71] text-[11px] font-bold tracking-[2px] uppercase mb-3">
                  Contents
                </p>
                <div className="grid grid-cols-2 gap-1">
                  {SECTIONS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => scrollTo(s.id)}
                      className="flex items-center gap-1.5 text-left px-2 py-1.5 rounded-md text-xs text-white/50 hover:bg-[#cdfe71]/5 hover:text-[#cdfe71] active:text-[#cdfe71] transition-colors"
                    >
                      <span className="text-[10px] font-bold text-[#cdfe71]/40">{s.number}</span>
                      <span className="truncate">{s.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Main content */}
              <div className="space-y-6">
                {/* Intro callout */}
                <div className="border-l-[3px] border-[#cdfe71] bg-[#cdfe71]/6 rounded-r-xl px-6 py-5">
                  <p className="text-white/75 text-sm leading-relaxed">
                    Stance Health (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;) is committed to protecting the privacy and security of your personal and health-related information. This Privacy Policy outlines how we collect, use, process, and safeguard your data when you access our services, website, or platform.
                  </p>
                </div>

                {/* Section 1 */}
                <div id="commitments" className="pp-section scroll-mt-28 bg-white/[0.02] border border-[#cdfe71]/8 rounded-2xl p-7">
                  <SectionHeader number="01" title="Our Privacy Commitments" />
                  <p className="text-white/75 text-sm leading-relaxed mb-4">We are committed to ensuring that:</p>
                  <BulletList items={[
                    "Personal information is collected for specific, clear, and legitimate purposes.",
                    "Data is used only for purposes relevant to the services we provide, including clinical care, performance improvement, and related operations.",
                    "We maintain appropriate safeguards to protect personal and health data from unauthorized access, disclosure, or misuse.",
                    "Data is retained only for as long as necessary for service delivery, legal compliance, and operational requirements.",
                    "We maintain transparency regarding how data is collected, used, and shared.",
                  ]} />
                </div>

                {/* Section 2 */}
                <div id="categories" className="scroll-mt-28 bg-white/[0.02] border border-[#cdfe71]/8 rounded-2xl p-7">
                  <SectionHeader number="02" title="Categories of Information Collected" />
                  <p className="text-white/75 text-sm leading-relaxed mb-4">We may collect the following categories of information:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { title: "Personal Information", body: "Name, age, gender, phone number, email address, and basic identification details.", purpose: "For communication, and data attribution." },
                      { title: "Health & Clinical Information", body: "Information relating to injuries, symptoms, movement patterns, strength levels, assessments, treatment notes, and progress tracking.", purpose: "In order to improve clinical diagnosis, tracking and improvement of protocols." },
                      { title: "Usage & Device Information", body: "Device type, IP address, app or website usage patterns, and interaction data.", purpose: "To understand usage patterns, and improve program adherence." },
                      { title: "Communication & Engagement Data", body: "Interactions through calls, WhatsApp, forms, or other communication channels, including responses to campaigns or outreach.", purpose: "To understand usage patterns, and improve program adherence." },
                    ].map((c) => (
                      <div key={c.title} className="bg-[#cdfe71]/4 border border-[#cdfe71]/10 rounded-xl p-4">
                        <h3 className="text-[#cdfe71] text-xs font-bold uppercase tracking-wide mb-2">{c.title}</h3>
                        <p className="text-white/65 text-xs leading-relaxed mb-2">{c.body}</p>
                        <p className="text-white/45 text-xs leading-relaxed italic border-t border-[#cdfe71]/10 pt-2">{c.purpose}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 3 */}
                <div id="purpose" className="scroll-mt-28 bg-white/[0.02] border border-[#cdfe71]/8 rounded-2xl p-7">
                  <SectionHeader number="03" title="Purpose of Collection and Use" />
                  <p className="text-white/75 text-sm leading-relaxed mb-4">The information collected is used for the following purposes:</p>
                  <BulletList items={[
                    "To assess, plan, and deliver physiotherapy and performance-related services.",
                    "To monitor progress and improve outcomes across sessions.",
                    "To communicate with users regarding appointments, services, and relevant updates.",
                    "To improve our services, systems, and user experience.",
                    "To conduct internal analysis and generate insights, including through aggregated or de-identified data.",
                  ]} />
                </div>

                {/* Section 4 */}
                <div id="deidentification" className="scroll-mt-28 bg-white/[0.02] border border-[#cdfe71]/8 rounded-2xl p-7">
                  <SectionHeader number="04" title="De-identification and Research Use" />
                  <BulletList items={[
                    "Certain data may be processed in a de-identified or anonymized form for the purpose of improving clinical outcomes, service quality, and internal research.",
                    "Such data does not identify individual users and is used only in aggregated formats.",
                  ]} />
                </div>

                {/* Section 5 */}
                <div id="technology" className="scroll-mt-28 bg-white/[0.02] border border-[#cdfe71]/8 rounded-2xl p-7">
                  <SectionHeader number="05" title="Use of Technology Platforms and Data Processing" />
                  <BulletList items={[
                    "We may use third-party tools, software platforms, and technology solutions to support assessment, measurement, data processing, and service delivery.",
                    "Information may be processed, stored, or transmitted through such systems as part of normal operations.",
                    "These tools function solely as infrastructure or support systems, and all clinical interpretation, decision-making, and medical responsibility remain exclusively with Stance Health.",
                    "No independent diagnosis or treatment decisions are made by any third-party systems.",
                  ]} />
                </div>

                {/* Section 6 */}
                <div id="consent" className="scroll-mt-28 bg-white/[0.02] border border-[#cdfe71]/8 rounded-2xl p-7">
                  <SectionHeader number="06" title="Consent and Acceptance" />
                  <BulletList items={[
                    "By accessing our services, booking an appointment, or engaging with our platform, you acknowledge and agree to the collection and use of information as described in this Privacy Policy.",
                    "Where required, additional consent may be obtained for specific use cases.",
                    "Continued use of our services shall be deemed as acceptance of this Privacy Policy and its terms.",
                  ]} />
                </div>

                {/* Section 7 */}
                <div id="rights" className="scroll-mt-28 bg-white/[0.02] border border-[#cdfe71]/8 rounded-2xl p-7">
                  <SectionHeader number="07" title="User Rights and Data Requests" />
                  <BulletList items={[
                    "Users may request access to their personal data.",
                    "Users may request correction of inaccurate or incomplete data.",
                    "Users may request deletion or anonymization of their data, subject to applicable legal and operational requirements.",
                    "Requests may be submitted through the contact details provided below and will be addressed within a reasonable timeframe.",
                  ]} />
                </div>

                {/* Section 8 */}
                <div id="retention" className="scroll-mt-28 bg-white/[0.02] border border-[#cdfe71]/8 rounded-2xl p-7">
                  <SectionHeader number="08" title="Data Retention" />
                  <p className="text-white/75 text-sm leading-relaxed mb-4">Unless a longer retention period is required by applicable law or is necessary for ongoing clinical care or legal obligations, personal and clinical information will generally be retained for a period of up to seven (7) years from the date of the user&apos;s last interaction with the Company.</p>
                  <p className="text-white/75 text-sm leading-relaxed mb-4">Personal and clinical data is retained only for as long as necessary for:</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["Service delivery", "Clinical continuity", "Legal & regulatory compliance"].map((tag) => (
                      <span key={tag} className="bg-[#cdfe71]/10 text-[#cdfe71] border border-[#cdfe71]/20 rounded-full px-4 py-1 text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-white/75 text-sm leading-relaxed">Data that is no longer required may be anonymized or securely deleted.</p>
                </div>

                {/* Section 9 */}
                <div id="sharing" className="scroll-mt-28 bg-white/[0.02] border border-[#cdfe71]/8 rounded-2xl p-7">
                  <SectionHeader number="09" title="Data Sharing and Disclosure" />
                  <div className="border-l-[3px] border-[#cdfe71] bg-[#cdfe71]/8 rounded-r-lg px-4 py-3 mb-4">
                    <p className="text-[#cdfe71] text-sm font-semibold">We do not sell personal data to third parties.</p>
                  </div>
                  <p className="text-white/75 text-sm leading-relaxed mb-3">Data may be shared with:</p>
                  <BulletList items={[
                    "Internal clinical and operational teams",
                    "Technology service providers supporting our systems",
                    "Regulatory authorities, if required by law",
                    "These third parties will also be required to comply with applicable laws and contractual obligations relating to data privacy.",
                  ]} />
                  <p className="text-white/75 text-sm leading-relaxed mt-3">Any such sharing is limited to what is necessary for the intended purpose.</p>
                </div>

                {/* Section 10 */}
                <div id="advertising" className="scroll-mt-28 bg-white/[0.02] border border-[#cdfe71]/8 rounded-2xl p-7">
                  <SectionHeader number="10" title="Advertising and Communication" />
                  <BulletList items={[
                    "We may use platforms such as Meta (Facebook/Instagram) and Google for communication, outreach, and service awareness.",
                    "Limited, non-sensitive data may be used to understand engagement and improve communication effectiveness.",
                    "We do not share identifiable health or clinical information with advertising platforms.",
                    "Users may opt out of promotional communication at any time.",
                  ]} />
                </div>

                {/* Section 11 */}
                <div id="security" className="scroll-mt-28 bg-white/[0.02] border border-[#cdfe71]/8 rounded-2xl p-7">
                  <SectionHeader number="11" title="Data Security" />
                  <BulletList items={[
                    "We implement reasonable administrative, technical, and physical safeguards to protect data.",
                    "Access to data is restricted to authorized personnel based on role and necessity.",
                  ]} />
                </div>

                {/* Section 12 */}
                <div id="children" className="scroll-mt-28 bg-white/[0.02] border border-[#cdfe71]/8 rounded-2xl p-7">
                  <SectionHeader number="12" title="Children's Privacy" />
                  <p className="text-white/75 text-sm leading-relaxed">
                    Our services are not intended for individuals under the age of 18 without appropriate supervision or consent from a parent or guardian.
                  </p>
                </div>

                {/* Section 13 */}
                <div id="grievance" className="scroll-mt-28 bg-[#cdfe71]/4 border border-[#cdfe71]/20 rounded-2xl p-7">
                  <SectionHeader number="13" title="Grievance Officer" />
                  <p className="text-white/75 text-sm leading-relaxed mb-4">
                    If you have any complaints, concerns, or requests regarding this Privacy Policy or your data, you may contact:
                  </p>
                  <div className="bg-black/25 border border-[#cdfe71]/10 rounded-xl overflow-hidden">
                    {[
                      { label: "Name", value: "Rohit Arora" },
                      { label: "Email", value: "grievance.officer@healthflex.in", href: "mailto:grievance.officer@healthflex.in" },
                      { label: "Designation", value: "Grievance Officer" },
                    ].map((row, i) => (
                      <div key={row.label} className={`flex flex-col sm:flex-row sm:items-center px-5 py-3.5 gap-1 sm:gap-0 ${i < 2 ? "border-b border-white/5" : ""}`}>
                        <span className="text-white/40 text-xs font-bold uppercase tracking-widest sm:w-28 flex-shrink-0">{row.label}</span>
                        {row.href ? (
                          <a href={row.href} className="text-[#cdfe71] text-sm hover:underline break-all">{row.value}</a>
                        ) : (
                          <span className="text-white text-sm">{row.value}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 14 */}
                <div id="updates" className="scroll-mt-28 bg-white/[0.02] border border-[#cdfe71]/8 rounded-2xl p-7">
                  <SectionHeader number="14" title="Updates to this Policy" />
                  <BulletList items={[
                    "This Privacy Policy may be updated from time to time to reflect changes in our practices, services, or legal requirements.",
                    "Continued use of our services after such updates constitutes acceptance of the revised policy.",
                  ]} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#cdfe71]/12">
      <span className="text-[#cdfe71] bg-[#cdfe71]/10 text-[11px] font-black tracking-widest px-2 py-1 rounded-md flex-shrink-0">
        {number}
      </span>
      <h2 className="text-white font-semibold text-lg">{title}</h2>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 items-start text-white/75 text-sm leading-relaxed py-1.5 hover:text-white/90 transition-colors duration-200">
          <svg viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0 w-4 h-4 text-[#cdfe71]">
            <circle cx="10" cy="10" r="10" fill="currentColor" fillOpacity="0.15" />
            <path d="M6 10.5l2.5 2.5L14 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
