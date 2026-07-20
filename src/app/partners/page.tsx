"use client";

import Image from "next/image";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ASSETS } from "@/lib/constants";
import { track } from "@/lib/analytics";

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

  const PARTNER_TYPES = [
    {
      icon: `${ASSETS}/grad.svg`,
      title: "Medical Professionals",
      description:
        "We elevate services for orthopaedic specialists, physiotherapists, and hospitals through assessments, outcome-focused treatment protocols, and remote patient engagement.",
      points: [
        "Shared outcome-based treatment protocols",
        "Advanced diagnostic assessments for referred patients",
        "Remote patient monitoring and engagement tools",
        "Collaborative clinical reporting",
      ],
    },
    {
      icon: `${ASSETS}/grad.svg`,
      title: "Sports Academies & Clubs",
      description:
        "We develop sport-specific protocols and support both amateur and professional organisations, working with teams and individual athletes to enhance performance and reduce injury risk.",
      points: [
        "Sport-specific injury prevention programmes",
        "Return-to-play protocols and monitoring",
        "Performance screening and benchmarking",
        "Strength & conditioning integration",
      ],
    },
    {
      icon: `${ASSETS}/grad.svg`,
      title: "Corporate Entities",
      description:
        "Our corporate wellness solutions combine in-office musculoskeletal assessments, expert practitioners, and technology-enabled remote solutions for employee health programmes.",
      points: [
        "On-site MSK health screening camps",
        "Employee wellness programme design",
        "Remote physiotherapy and recovery tools",
        "Workplace injury prevention training",
      ],
    },
  ];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative min-h-[320px] sm:min-h-[380px] flex items-end pb-12 sm:pb-16 pt-28 sm:pt-32 bg-[#132644]">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={`${ASSETS}/about-banner.svg`}
              alt="Partner with us"
              fill
              className="object-cover object-center opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#132644]/60 to-[#132644]" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <p className="text-[#cdfe71] text-xs sm:text-sm font-semibold uppercase tracking-widest mb-2 sm:mb-3">
              Partnerships
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3 sm:mb-4">
              Partner <span className="text-[#cdfe71]">with us</span>
            </h1>
            <p className="text-white/60 text-base sm:text-lg max-w-2xl">
              Our multi-disciplinary approach can help you maximise outcomes for your tribe. We
              collaborate with Doctors, Hospitals, Sports Academies &amp; Corporates.
            </p>
          </div>
        </section>

        {/* Partner Types */}
        <section className="py-16 sm:py-20 bg-[#0c1b30]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="section-title text-center mb-3 sm:mb-4">
              Who we <span className="text-[#cdfe71]">partner with</span>
            </h2>
            <p className="text-white/50 text-center text-base sm:text-lg mb-10 sm:mb-12 max-w-2xl mx-auto">
              Whether you&apos;re a clinician, sports organisation, or corporate entity — we have a
              tailored collaboration model for you.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {PARTNER_TYPES.map((pt) => (
                <div
                  key={pt.title}
                  className="group card-navy border border-white/10 flex flex-col hover:border-[#cdfe71]/40 hover:-translate-y-2 hover:shadow-[0_16px_50px_rgba(205,254,113,0.1)] transition-all duration-300"
                >
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-[#cdfe71]/10 flex items-center justify-center mb-5 group-hover:bg-[#cdfe71]/20 group-hover:scale-110 transition-all duration-300">
                    <Image src={pt.icon} alt={pt.title} width={32} height={32} />
                  </div>

                  {/* Title */}
                  <h3 className="text-[#cdfe71] font-bold text-lg sm:text-xl mb-3">{pt.title}</h3>

                  {/* Description */}
                  <p className="text-white/60 text-sm leading-relaxed mb-5">{pt.description}</p>

                  {/* Points with green tick SVG */}
                  <ul className="space-y-3 mt-auto">
                    {pt.points.map((p) => (
                      <li key={p} className="flex gap-3 items-start group-hover:text-white/80 transition-colors duration-200">
                        <svg viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0 w-4 h-4 text-[#cdfe71]">
                          <circle cx="10" cy="10" r="10" fill="currentColor" fillOpacity="0.15" />
                          <path d="M6 10.5l2.5 2.5L14 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-white/60 text-sm">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 sm:py-20 bg-[#132644]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="section-title text-center mb-3 sm:mb-4">
              Get in <span className="text-[#cdfe71]">touch</span>
            </h2>
            <p className="text-white/50 text-center text-base sm:text-lg mb-10 sm:mb-12">
              Tell us about your organisation and how you&apos;d like to collaborate.
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
                <h3 className="text-white font-bold text-xl mb-2">Thank you!</h3>
                <p className="text-white/60">
                  We&apos;ve received your message and will be in touch within 2 business days.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl bg-[#1a3358] border border-white/10 p-6 sm:p-8 space-y-6 hover:border-white/20 transition-colors duration-300"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Full Name</label>
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
                    <label className="block text-white text-sm font-medium mb-2">Email</label>
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
                  <label className="block text-white text-sm font-medium mb-2">Organisation</label>
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
                  <label className="block text-white text-sm font-medium mb-2">I am a...</label>
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
                  <label className="block text-white text-sm font-medium mb-2">Message</label>
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
                  Send Message
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
