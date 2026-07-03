import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Patient Consent & Waiver",
  description: "Read the Stance Health patient consent and waiver before beginning your care.",
  alternates: { canonical: "/patient-consent-waiver" },
};

export default function PatientConsentWaiverPage() {
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
              Patient Consent &amp; Waiver
            </h1>
            <p className="text-white/60 text-lg">
              Please read this carefully before beginning your care at Stance Health.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-[#0c1b30]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="border-l-[3px] border-[#cdfe71] bg-[#cdfe71]/6 rounded-r-xl px-6 py-5">
              <p className="text-white/75 text-sm leading-relaxed">
                By registering and receiving services at Stance Health (Deftronin Technologies Pvt Ltd),
                you acknowledge and agree to the following.
              </p>
            </div>

            <div className="bg-white/[0.02] border border-[#cdfe71]/8 rounded-2xl p-7">
              <SectionHeader number="01" title="Consent to Receive Services" />
              <p className="text-white/75 text-sm leading-relaxed">
                I agree to receive physiotherapy, assessments, exercise, strength &amp; conditioning, and
                related services from Stance Health, and understand that outcomes may vary and temporary
                soreness, discomfort, or symptom flare-ups may occur.
              </p>
            </div>

            <div className="bg-white/[0.02] border border-[#cdfe71]/8 rounded-2xl p-7">
              <SectionHeader number="02" title="Accuracy of Medical Information" />
              <p className="text-white/75 text-sm leading-relaxed">
                I agree that the medical information provided by me is accurate and complete, and I will
                inform Stance of any relevant health conditions, medications, surgeries, allergies,
                pregnancy, or restrictions.
              </p>
            </div>

            <div className="bg-[#cdfe71]/4 border border-[#cdfe71]/20 rounded-2xl p-7">
              <SectionHeader number="03" title="Questions" />
              <p className="text-white/75 text-sm leading-relaxed mb-4">
                For any queries about your care or this consent, please contact us.
              </p>
              <div className="bg-black/25 border border-[#cdfe71]/10 rounded-xl overflow-hidden">
                <div className="flex items-center px-5 py-3.5">
                  <span className="text-white/40 text-xs font-bold uppercase tracking-widest w-28 flex-shrink-0">
                    Email
                  </span>
                  <a href="mailto:hello@stance.health" className="text-[#cdfe71] text-sm hover:underline">
                    hello@stance.health
                  </a>
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
