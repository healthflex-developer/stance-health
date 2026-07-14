import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ASSETS, TEAM } from "@/lib/constants";
import BookingCta from "@/components/BookingCta";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "We are Stance",
  description:
    "Meet the expert team behind Stance Health — leading physiotherapists and strength coaches dedicated to evidence-backed orthopaedic rehabilitation.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "We are Stance – Stance Health",
    description:
      "Meet the expert team behind Stance Health — leading physiotherapists and strength coaches.",
    url: "/about",
    images: [{ url: "/assets/images/og-about.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "We are Stance – Stance Health",
    description: "Meet the expert team behind Stance Health.",
    images: ["/assets/images/og-about.png"],
  },
};

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
        {/* Hero */}
        <section className="relative min-h-[420px] flex items-end pb-16 pt-32 bg-[#132644]">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={`${ASSETS}/about-banner.svg`}
              alt="About Stance Health"
              fill
              className="object-cover object-center opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#132644]/60 to-[#132644]" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-[#cdfe71] text-sm font-semibold uppercase tracking-widest mb-3">
              About Us
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
              We are <span className="text-[#cdfe71]">Stance</span> 
            </h1>
            <p className="text-white/70 text-lg max-w-2xl">
              Evidence-backed Orthopaedic Rehab, where Medical Science &amp; Technology are
              tailored for your performance and recovery.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 bg-[#0c1b30]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="section-title mb-6">
                  Our <span className="text-[#cdfe71]">Mission</span>
                </h2>
                <p className="text-white/70 text-lg leading-relaxed mb-6">
                  At Stance, we're committed to providing high-quality care to all who aspire to
                  have an active life. Our goal is to redefine healthcare standards by fostering
                  innovation and integrating cutting-edge technology with expert clinical practice.
                </p>
                <p className="text-white/70 text-lg leading-relaxed mb-8">
                  We restore function, reduce pain, and promote overall well-being through
                  personalised physiotherapy and strengthening programmes, guided by a
                  multi-disciplinary team of professionals.
                </p>
                <BookingCta className="btn-primary" label="Book an Appointment" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden aspect-[4/5] relative">
                  <Image
                    src={`${ASSETS}/about-1-img.png`}
                    alt="Stance clinic"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-[4/5] relative mt-8">
                  <Image
                    src={`${ASSETS}/about-2-img.png`}
                    alt="Stance team in action"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-[#132644]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="section-title text-center mb-4">
              What Sets Us <span className="text-[#cdfe71]">Apart</span>
            </h2>
            <p className="text-white/50 text-center text-lg mb-12 max-w-2xl mx-auto">
              Our approach combines the best of clinical expertise, technology, and personalised care.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {VALUES.map((v) => (
                <div key={v.title} className="card-navy border border-white/10">
                  <div className="w-10 h-10 rounded-full bg-[#cdfe71]/15 flex items-center justify-center mb-4">
                    <div className="w-3 h-3 rounded-full bg-[#cdfe71]" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{v.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-[#0c1b30]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="section-title text-center mb-4">
              Meet Our <span className="text-[#cdfe71]">Team</span>
            </h2>
            <p className="text-white/50 text-center text-lg mb-12 max-w-2xl mx-auto">
              Our clinical team brings decades of combined experience in sports physiotherapy,
              rehabilitation, and performance.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TEAM.map((member) => (
                <div key={member.name} className="card-navy text-center">
                  <div className="w-24 h-24 rounded-full bg-[#132644] border border-white/10 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-white font-bold mb-1">{member.name}</h3>
                  <p className="text-[#cdfe71] text-sm font-medium mb-1">{member.role}</p>
                  {member.experience && (
                    <p className="text-white/40 text-xs">{member.experience}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team extended bios */}
        <section className="py-20 bg-[#132644]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {/* Durga */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="rounded-2xl overflow-hidden aspect-video relative bg-[#1a3358]">
                <Image
                  src={`${ASSETS}/team-1.svg`}
                  alt="Durga Joshi"
                  fill
                  className="object-contain p-6"
                />
              </div>
              <div>
                <p className="text-[#cdfe71] text-sm font-semibold uppercase tracking-widest mb-2">
                  Lead Physiotherapist
                </p>
                <h3 className="text-3xl font-extrabold text-white mb-4">Durga Joshi</h3>
                <p className="text-white/70 leading-relaxed mb-4">
                  With 12+ years of experience, Durga specialises in manual therapy including
                  Maitland, McKenzie, Clinical Pilates, and neurodynamic treatments. She has
                  previously collaborated with Sakra World Hospital and YOS Sports Health Specialists.
                </p>
                <p className="text-white/70 leading-relaxed">
                  Her expertise spans comprehensive MSK health evaluation, injury prevention, and
                  personalised recovery planning for athletes and active individuals.
                </p>
              </div>
            </div>

            {/* Sumesh */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="lg:order-2 rounded-2xl overflow-hidden aspect-video relative bg-[#1a3358]">
                <Image
                  src={`${ASSETS}/team-2.svg`}
                  alt="Sumesh Ashokan"
                  fill
                  className="object-contain p-6"
                />
              </div>
              <div className="lg:order-1">
                <p className="text-[#cdfe71] text-sm font-semibold uppercase tracking-widest mb-2">
                  Senior Physiotherapist
                </p>
                <h3 className="text-3xl font-extrabold text-white mb-4">Sumesh Ashokan</h3>
                <p className="text-white/70 leading-relaxed mb-4">
                  A former athlete himself, Sumesh brings a unique perspective to rehabilitation.
                  His deep understanding of anatomy and sports-specific demands allows him to
                  create targeted recovery pathways.
                </p>
                <p className="text-white/70 leading-relaxed">
                  He emphasises holistic injury prevention and accurate diagnosis, ensuring athletes
                  return to sport stronger and more resilient than before.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#cdfe71]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-4">
              Ready to begin your journey?
            </h2>
            <p className="text-black/70 mb-8">
              Our team is ready to help you achieve your performance and recovery goals.
            </p>
            <BookingCta className="inline-block bg-black text-white font-semibold px-8 py-3 rounded-full hover:bg-black/80 transition-colors" label="Book an Appointment" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
