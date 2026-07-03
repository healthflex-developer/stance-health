import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and conditions for using Stance Health services and website.",
  alternates: { canonical: "/terms-and-conditions" },
};

const TERMS = [
  {
    title: "1. Terms",
    body: "By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, applicable laws and regulations and their compliance. If you disagree with any of the stated terms and conditions, you are prohibited from using or accessing this site. The materials contained in this site are secured by relevant copyright and trade mark law.",
  },
  {
    title: "2. Use License",
    body: "Permission is allowed to temporarily download one duplicate of the materials on Stance Health's site for individual and non-business use only. This is a permit of license only, not a transfer of title. Under this permit you may not: modify or copy the materials; use the materials for any commercial purpose or public presentation; attempt to decompile or rebuild any product or material contained on the site; remove any copyright or other restrictive documentation from the materials; or transfer the materials to someone else or mirror the materials on another server. This permit may be terminated if you disregard any of these restrictions. After termination, you must destroy any downloaded materials in your possession whether in electronic or printed form.",
  },
  {
    title: "3. Disclaimer",
    body: "The materials on Stance Health's site are provided \"as is\". Stance Health makes no warranties, expressed or implied, and hereby disclaims all other warranties, including without limitation implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property. Stance Health does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website.",
  },
  {
    title: "4. Limitations",
    body: "In no event shall Stance Health or its suppliers be liable for any damages (including without limitation damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Stance Health's website, even if Stance Health or an authorised representative has been notified of the possibility of such damage.",
  },
  {
    title: "5. Amendments and Errata",
    body: "The materials appearing on Stance Health's site could include typographical or photographic errors. Stance Health does not warrant that any of the materials on its site are accurate, complete, or current. Stance Health may make changes to the materials contained on its site at any time without notice.",
  },
  {
    title: "6. Links",
    body: "Stance Health has not reviewed all of the websites or links connected to its website and is not responsible for the content of any such linked site. The inclusion of any link does not imply endorsement by Stance Health of the site. Use of any such linked website is at the user's own risk.",
  },
  {
    title: "7. Site Terms of Use Modifications",
    body: "Stance Health may revise these terms of use for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms and Conditions of Use.",
  },
  {
    title: "8. Governing Law",
    body: "Any claim relating to Stance Health's website shall be governed by the laws of India without regard to its conflict of law provisions.",
  },
];

export default function TermsAndConditionsPage() {
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
              Terms and Conditions
            </h1>
            <p className="text-white/60 text-lg">
              Please read these terms and conditions carefully before using our services.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-[#0c1b30]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
            {TERMS.map((term) => (
              <div
                key={term.title}
                className="bg-white/[0.02] border border-[#cdfe71]/8 rounded-2xl p-7"
              >
                <h2 className="text-white font-semibold text-lg mb-3 pb-3 border-b border-[#cdfe71]/12">
                  {term.title}
                </h2>
                <p className="text-white/70 text-sm leading-relaxed">{term.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
