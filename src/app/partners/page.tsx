"use client";

import Image from "next/image";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePreviewProps } from "@/components/preview/usePreviewDraft";
import { PartnerTypesSection } from "@/components/sections/PartnerTypesSection";
import { ASSETS } from "@/lib/constants";
import { track } from "@/lib/analytics";
import { previewAsset, previewJoinedPrefix, previewString } from "@/lib/preview-draft";

export default function PartnersPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    organisation: "",
    role: "Doctor",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formMeta = {
      form_name: "partner_contact",
      role: form.role,
      has_organisation: Boolean(form.organisation.trim()),
      has_message: Boolean(form.message.trim()),
    };
    track("web_form_submit", formMeta);
    track("web_lead_created", { ...formMeta, lead_type: "partner" });

    setSubmitted(true);
  }

  const hero = usePreviewProps("PartnersHero");
  const formCopy = usePreviewProps("PartnerContactForm");

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative min-h-[320px] sm:min-h-[380px] flex items-end pb-12 sm:pb-16 pt-28 sm:pt-32 bg-[#132644]" data-preview-block="PartnersHero">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={previewAsset(hero?.backgroundImage, `${ASSETS}/about-banner.svg`)}
              alt="Partner with us"
              fill
              className="object-cover object-center opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#132644]/60 to-[#132644]" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <p className="text-[#cdfe71] text-xs sm:text-sm font-semibold uppercase tracking-widest mb-2 sm:mb-3">
              {previewString(hero?.eyebrow, "Partnerships")}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3 sm:mb-4">
              {previewJoinedPrefix(hero?.headingPrefix, "Partner")} <span className="text-[#cdfe71]">{previewString(hero?.headingHighlight, "with us")}</span>
            </h1>
            <p className="text-white/60 text-base sm:text-lg max-w-2xl">
              {previewString(
                hero?.description,
                "Our multi-disciplinary approach can help you maximise outcomes for your tribe. We collaborate with Doctors, Hospitals, Sports Academies & Corporates.",
              )}
            </p>
          </div>
        </section>

        <PartnerTypesSection />

        {/* Contact Form */}
        <section className="py-16 sm:py-20 bg-[#132644]" data-preview-block="PartnerContactForm">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="section-title text-center mb-3 sm:mb-4">
              {previewJoinedPrefix(formCopy?.headingPrefix, "Get in")} <span className="text-[#cdfe71]">{previewString(formCopy?.headingHighlight, "touch")}</span>
            </h2>
            <p className="text-white/50 text-center text-base sm:text-lg mb-10 sm:mb-12">
              {previewString(formCopy?.description, "Tell us about your organisation and how you'd like to collaborate.")}
            </p>

            {submitted ? (
              <div className="card-navy text-center py-12 sm:py-16 border border-[#cdfe71]/30 hover:shadow-[0_8px_30px_rgba(205,254,113,0.08)] transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-[#cdfe71]/10 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-[#cdfe71]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-xl mb-2">{previewString(formCopy?.successTitle, "Thank you!")}</h3>
                <p className="text-white/60">
                  {previewString(formCopy?.successMessage, "We've received your message and will be in touch within 2 business days.")}
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl bg-[#1a3358] border border-white/10 p-6 sm:p-8 space-y-6 hover:border-white/20 transition-colors duration-300"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">{previewString(formCopy?.nameLabel, "Full Name")}</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Dr. Jane Smith"
                      className="w-full bg-[#132644] border border-white/20 rounded-xl px-4 py-3.5 text-white text-base placeholder-white/40 focus:outline-none focus:border-[#cdfe71]/60 focus:shadow-[0_0_12px_rgba(205,254,113,0.1)] transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">{previewString(formCopy?.emailLabel, "Email")}</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="jane@hospital.com"
                      className="w-full bg-[#132644] border border-white/20 rounded-xl px-4 py-3.5 text-white text-base placeholder-white/40 focus:outline-none focus:border-[#cdfe71]/60 focus:shadow-[0_0_12px_rgba(205,254,113,0.1)] transition-all duration-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">{previewString(formCopy?.organisationLabel, "Organisation")}</label>
                  <input
                    type="text"
                    name="organisation"
                    value={form.organisation}
                    onChange={handleChange}
                    required
                    placeholder="City Sports Hospital"
                    className="w-full bg-[#132644] border border-white/20 rounded-xl px-4 py-3.5 text-white text-base placeholder-white/40 focus:outline-none focus:border-[#cdfe71]/60 focus:shadow-[0_0_12px_rgba(205,254,113,0.1)] transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">{previewString(formCopy?.roleLabel, "I am a...")}</label>
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="w-full bg-[#132644] border border-white/20 rounded-xl px-4 py-3.5 text-white text-base focus:outline-none focus:border-[#cdfe71]/60 focus:shadow-[0_0_12px_rgba(205,254,113,0.1)] transition-all duration-200"
                  >
                    <option value="Doctor">Doctor</option>
                    <option value="Physiotherapist">Physiotherapist</option>
                    <option value="Sports Academy">Sports Academy / Club</option>
                    <option value="Corporate">Corporate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">{previewString(formCopy?.messageLabel, "Message")}</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your organisation and how you'd like to collaborate..."
                    className="w-full bg-[#132644] border border-white/20 rounded-xl px-4 py-3.5 text-white text-base placeholder-white/40 focus:outline-none focus:border-[#cdfe71]/60 focus:shadow-[0_0_12px_rgba(205,254,113,0.1)] transition-all duration-200 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-white text-[#132644] font-bold py-3.5 rounded-full text-base hover:bg-[#cdfe71] hover:shadow-[0_8px_25px_rgba(205,254,113,0.3)] hover:scale-[1.02] active:scale-95 transition-all duration-200"
                >
                  {previewString(formCopy?.submitLabel, "Send Message")}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
