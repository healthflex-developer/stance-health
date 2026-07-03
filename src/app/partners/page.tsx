"use client";

import Image from "next/image";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ASSETS } from "@/lib/constants";

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
        <section className="relative min-h-[380px] flex items-end pb-16 pt-32 bg-[#132644]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#132644] via-[#0c1b30] to-[#1a3358]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
            <p className="text-[#cdfe71] text-sm font-semibold uppercase tracking-widest mb-3">
              Partnerships
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
              Partner with us
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Our multi-disciplinary approach can help you maximise outcomes for your tribe. We
              collaborate with Doctors, Hospitals, Sports Academies &amp; Corporates.
            </p>
          </div>
        </section>

        {/* Partner Types */}
        <section className="py-20 bg-[#0c1b30]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="section-title text-center mb-4">
              Who we <span className="text-[#cdfe71]">partner with</span>
            </h2>
            <p className="text-white/50 text-center text-lg mb-12 max-w-2xl mx-auto">
              Whether you're a clinician, sports organisation, or corporate entity — we have a
              tailored collaboration model for you.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {PARTNER_TYPES.map((pt) => (
                <div key={pt.title} className="card-navy border border-white/10 flex flex-col">
                  <div className="w-14 h-14 rounded-full bg-[#cdfe71]/10 flex items-center justify-center mb-5">
                    <Image src={pt.icon} alt={pt.title} width={32} height={32} />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3">{pt.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-5">{pt.description}</p>
                  <ul className="space-y-2 mt-auto">
                    {pt.points.map((p) => (
                      <li key={p} className="flex gap-2 items-start">
                        <Image
                          src={`${ASSETS}/tick.svg`}
                          alt=""
                          width={16}
                          height={16}
                          className="mt-0.5 shrink-0"
                        />
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
        <section className="py-20 bg-[#132644]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="section-title text-center mb-4">
              Get in <span className="text-[#cdfe71]">touch</span>
            </h2>
            <p className="text-white/50 text-center text-lg mb-12">
              Tell us about your organisation and how you'd like to collaborate.
            </p>

            {submitted ? (
              <div className="card-navy text-center py-16 border border-[#cdfe71]/30">
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
                  We've received your message and will be in touch within 2 business days.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="card-navy border border-white/10 space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white/70 text-sm mb-1.5">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Dr. Jane Smith"
                      className="w-full bg-[#132644] border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#cdfe71]/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm mb-1.5">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="jane@hospital.com"
                      className="w-full bg-[#132644] border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#cdfe71]/60 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-1.5">Organisation</label>
                  <input
                    type="text"
                    name="organisation"
                    value={form.organisation}
                    onChange={handleChange}
                    required
                    placeholder="City Sports Hospital"
                    className="w-full bg-[#132644] border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#cdfe71]/60 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-1.5">I am a...</label>
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="w-full bg-[#132644] border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#cdfe71]/60 transition-colors"
                  >
                    <option value="Doctor">Doctor</option>
                    <option value="Physiotherapist">Physiotherapist</option>
                    <option value="Sports Academy">Sports Academy / Club</option>
                    <option value="Corporate">Corporate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/70 text-sm mb-1.5">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your organisation and how you'd like to collaborate..."
                    className="w-full bg-[#132644] border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#cdfe71]/60 transition-colors resize-none"
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
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
