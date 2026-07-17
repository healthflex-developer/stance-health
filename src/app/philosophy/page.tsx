import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ASSETS } from "@/lib/constants";
import BookingCta from "@/components/BookingCta";
import PhilosophyPillars from "@/components/PhilosophyPillars";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Philosophy",
  description:
    "Our clinical and data-backed approach combines technology assessment, physiotherapy, strength & conditioning, and at-home technology for complete recovery.",
  alternates: { canonical: "/philosophy" },
  openGraph: {
    title: "Our Philosophy – Stance Health",
    description:
      "Clinical and data-backed rehab: technology assessment, physiotherapy, S&C, and at-home recovery.",
    url: "/philosophy",
    images: [{ url: "/assets/images/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Philosophy – Stance Health",
    description: "Clinical and data-backed approach to orthopaedic rehab.",
    images: ["/assets/images/og-default.png"],
  },
};

const DIFFERENTIATORS = [
  {
    icon: `${ASSETS}/f-1.png`,
    title: "Patient Education",
    description:
      "We equip patients with the knowledge to understand their condition and take ownership of their recovery. An informed patient achieves better long-term outcomes.",
  },
  {
    icon: `${ASSETS}/f-2.png`,
    title: "Evidence-Based Technology",
    description:
      "Every clinical decision is supported by objective data. Our technology tools eliminate guesswork and ensure your programme is precisely calibrated to your needs.",
  },
  {
    icon: `${ASSETS}/f-3.png`,
    title: "Expert Therapists",
    description:
      "Our team continuously trains and updates their skills across diverse clinical and sporting contexts, bringing the highest level of expertise to every patient.",
  },
  {
    icon: `${ASSETS}/f-4.png`,
    title: "Multidisciplinary Approach",
    description:
      "Sports orthopaedics, physical therapy, and strength & conditioning work seamlessly together across all phases of your recovery and performance journey.",
  },
];

export default function PhilosophyPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative min-h-[380px] flex items-end pb-16 pt-32 bg-[#132644]">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={`${ASSETS}/philosophy-banner.svg`}
              alt="Philosophy"
              fill
              className="object-cover object-center opacity-25"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#132644]/50 to-[#132644]" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
            <p className="text-[#cdfe71] text-sm font-semibold uppercase tracking-widest mb-3">
              Philosophy
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
              Our <span className="text-[#cdfe71]">Approach</span>
            </h1>
            <p className="text-white/60 text-xl">Clinical and Data-Backed</p>
          </div>
        </section>

        {/* How We Do It — Interactive Pillars */}
        <PhilosophyPillars />

        {/* Differentiators */}
        <section className="py-20 bg-[#cdfe71]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black text-center mb-4">
              Why choose Stance?
            </h2>
            <p className="text-black/60 text-center text-lg mb-12 max-w-2xl mx-auto">
              Four pillars that make our approach uniquely effective.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {DIFFERENTIATORS.map((d, i) => (
                <div
                  key={d.title}
                  className="group relative bg-white rounded-2xl overflow-hidden border border-[#132644]/8 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(19,38,68,0.15)] transition-all duration-300"
                >
                  {/* Top half — large icon area */}
                  <div className="relative h-44 bg-[#132644] flex items-center justify-center overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 right-4 w-20 h-20 rounded-full border border-white/30" />
                      <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full border border-white/20" />
                    </div>
                    {/* Icon — large and visible */}
                    <Image
                      src={d.icon}
                      alt={d.title}
                      width={80}
                      height={80}
                      className="relative z-10 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* Step number in corner */}
                    <span className="absolute bottom-3 right-4 text-white/10 text-4xl font-extrabold leading-none select-none group-hover:text-white/20 transition-colors duration-300">
                      0{i + 1}
                    </span>
                  </div>

                  {/* Bottom half — text content */}
                  <div className="p-5">
                    <h3 className="text-[#132644] font-bold text-lg mb-2">{d.title}</h3>
                    <p className="text-[#132644]/60 text-sm leading-relaxed">{d.description}</p>
                  </div>

                  {/* Bottom accent line that grows on hover */}
                  <div className="absolute bottom-0 left-0 h-1 bg-[#cdfe71] w-0 group-hover:w-full transition-all duration-500 ease-out" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#0c1b30]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="section-title mb-4">
              Experience our <span className="text-[#cdfe71]">approach</span> first-hand
            </h2>
            <p className="text-white/60 mb-8">
              Book an assessment and see how our clinical and data-backed methodology transforms your
              recovery and performance.
            </p>
            <BookingCta className="btn-primary" label="Book an Appointment" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
