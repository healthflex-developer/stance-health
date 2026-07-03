import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ASSETS } from "@/lib/constants";
import BookingCta from "@/components/BookingCta";

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

const PILLARS = [
  {
    id: "tech",
    label: "Technology Assessment",
    tabIcon: `${ASSETS}/tab-1.svg`,
    tabIconHov: `${ASSETS}/tab-1-hov.png`,
    image1: `${ASSETS}/tf-1.png`,
    image2: `${ASSETS}/tf-2.png`,
    heading: "State-of-the-Art Technology Assessments",
    body: "We use the latest tools across running analysis, muscle strength, range of motion, and endurance tracking to measure and contextualise your progress. Our technology-driven assessments provide objective data that guides clinical decision-making and personalised treatment.",
    points: [
      "Running gait and biomechanical analysis with RunScribe",
      "Isometric strength testing with VALD Force Frame",
      "Explosive power and balance assessment with VALD Force Decks",
      "Portable dynamometry with VALD Dynamo",
    ],
  },
  {
    id: "physio",
    label: "Physiotherapy",
    tabIcon: `${ASSETS}/tab-2.svg`,
    tabIconHov: `${ASSETS}/tab-2-hov.png`,
    image1: `${ASSETS}/ph-1.png`,
    image2: `${ASSETS}/ph-2.png`,
    heading: "Expert Physiotherapy Care",
    body: "Our physiotherapists conduct comprehensive MSK evaluations and deliver targeted injury management through evidence-based manual therapy. We create customised preventive exercise regimens tailored to your unique condition and goals.",
    points: [
      "Comprehensive musculoskeletal health evaluation",
      "Injury management via manual therapy techniques",
      "Customised preventive exercise programmes",
      "Maitland, McKenzie and neurodynamic treatment approaches",
    ],
  },
  {
    id: "sc",
    label: "Strength & Conditioning",
    tabIcon: `${ASSETS}/tab-3.svg`,
    tabIconHov: `${ASSETS}/tab-3-hov.png`,
    image1: `${ASSETS}/sc-1.png`,
    image2: `${ASSETS}/sc-2.png`,
    heading: "Performance-Focused Strength & Conditioning",
    body: "Our strength and conditioning programmes are designed to build the functional capacity needed for daily activities and sporting performance. We use advanced progress measurement technology to ensure every session delivers measurable improvement.",
    points: [
      "Functional strength for everyday activities and sport",
      "Data-driven progress tracking and programme adjustment",
      "Sport-specific conditioning protocols",
      "Injury-resilience training and load management",
    ],
  },
  {
    id: "athome",
    label: "At-Home Technology",
    tabIcon: `${ASSETS}/tab-4.svg`,
    tabIconHov: `${ASSETS}/tab-4-hov.png`,
    image1: `${ASSETS}/at-1.png`,
    image2: `${ASSETS}/at-2.png`,
    heading: "AI-Powered At-Home Recovery",
    body: "Through our HealthFlex platform with AI-driven motion sensors, we deliver remote sessions with real-time feedback and movement tracking. This ensures continuity of care and consistent progress monitoring regardless of where you are.",
    points: [
      "Remote sessions via HealthFlex AI platform",
      "Real-time movement feedback and correction",
      "Progress tracking between clinic visits",
      "Self-paced recovery pathways with clinical oversight",
    ],
  },
];

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
              Our Approach
            </h1>
            <p className="text-white/60 text-xl">Clinical and Data-Backed</p>
          </div>
        </section>

        {/* Intro */}
        <section className="py-16 bg-[#0c1b30]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="section-title mb-6">How we do it?</h2>
            <p className="text-white/60 text-lg leading-relaxed">
              At Stance, our clinical philosophy centres on four integrated pillars that work together
              to deliver outcomes that are measurable, sustainable, and personalised to you.
            </p>
          </div>
        </section>

        {/* Four Pillars */}
        {PILLARS.map((pillar, idx) => (
          <section
            key={pillar.id}
            className={`py-20 ${idx % 2 === 0 ? "bg-[#132644]" : "bg-[#0c1b30]"}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  idx % 2 !== 0 ? "lg:grid-flow-dense" : ""
                }`}
              >
                {/* Text */}
                <div className={idx % 2 !== 0 ? "lg:col-start-2" : ""}>
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#cdfe71]/10 flex items-center justify-center">
                      <Image src={pillar.tabIcon} alt={pillar.label} width={28} height={28} />
                    </div>
                    <p className="text-[#cdfe71] text-sm font-semibold uppercase tracking-widest">
                      {pillar.label}
                    </p>
                  </div>
                  <h2 className="section-title mb-4">{pillar.heading}</h2>
                  <p className="text-white/60 leading-relaxed mb-6">{pillar.body}</p>
                  <ul className="space-y-3">
                    {pillar.points.map((pt) => (
                      <li key={pt} className="flex gap-3 items-start">
                        <Image
                          src={`${ASSETS}/tick.svg`}
                          alt=""
                          width={18}
                          height={18}
                          className="mt-0.5 shrink-0"
                        />
                        <span className="text-white/70 text-sm">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Images */}
                <div
                  className={`grid grid-cols-2 gap-4 ${
                    idx % 2 !== 0 ? "lg:col-start-1 lg:row-start-1" : ""
                  }`}
                >
                  <div className="rounded-2xl overflow-hidden aspect-[4/5] relative bg-[#1a3358]">
                    <Image src={pillar.image1} alt={pillar.label} fill className="object-cover" />
                  </div>
                  <div className="rounded-2xl overflow-hidden aspect-[4/5] relative mt-8 bg-[#1a3358]">
                    <Image src={pillar.image2} alt={pillar.label} fill className="object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

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
              {DIFFERENTIATORS.map((d) => (
                <div
                  key={d.title}
                  className="bg-black/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-black/20 transition-colors"
                >
                  <div className="w-14 h-14 rounded-xl bg-black/15 flex items-center justify-center mb-4">
                    <Image src={d.icon} alt={d.title} width={36} height={36} />
                  </div>
                  <h3 className="text-black font-bold text-lg mb-2">{d.title}</h3>
                  <p className="text-black/70 text-sm leading-relaxed">{d.description}</p>
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
