import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Delete Account",
  description: "Request deletion of your Stance Health account and data.",
  alternates: { canonical: "/delete-account" },
};

export default function DeleteAccountPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative min-h-[280px] flex items-end pb-14 pt-32 bg-[#132644]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#132644] via-[#0c1b30] to-[#1a3358]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
            <p className="text-[#cdfe71] text-sm font-semibold uppercase tracking-widest mb-3">
              Account
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-3">
              Delete Your Account
            </h1>
            <p className="text-white/60 text-lg max-w-xl mx-auto">
              You can request deletion of your Stance Health account and all associated data by
              contacting us. We will process your request within 30 days.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-[#0c1b30]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="bg-white/[0.02] border border-[#cdfe71]/8 rounded-2xl p-7">
              <SectionHeader number="01" title="How to request account deletion" />
              <ol className="space-y-3">
                {[
                  <>
                    Send an email to{" "}
                    <a href="mailto:support@stance.health" className="text-[#cdfe71] hover:underline">
                      support@stance.health
                    </a>
                  </>,
                  <>
                    Use subject line: <strong className="text-white">Account Deletion Request</strong>
                  </>,
                  "Include your registered phone number or email address",
                  "We will confirm deletion within 30 days",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start text-white/75 text-sm leading-relaxed">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#cdfe71]/10 text-[#cdfe71] text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{item}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-white/[0.02] border border-[#cdfe71]/8 rounded-2xl p-7">
              <SectionHeader number="02" title="What gets deleted" />
              <BulletList
                items={[
                  "Your profile (name, phone number, email, date of birth)",
                  "Appointment history and session records",
                  "Payment and billing information",
                  "Device tokens and notification preferences",
                ]}
              />
            </div>

            <div className="bg-[#cdfe71]/4 border border-[#cdfe71]/20 rounded-2xl p-7">
              <h2 className="text-white font-semibold text-lg mb-3">Data retained after deletion</h2>
              <p className="text-white/75 text-sm leading-relaxed">
                We may retain certain data for up to <strong className="text-white">90 days</strong>{" "}
                for legal and compliance purposes (e.g. billing records, tax documents). After this
                period, all data is permanently deleted.
              </p>
            </div>

            <div className="text-center pt-4">
              <a
                href="mailto:support@stance.health?subject=Account%20Deletion%20Request"
                className="btn-primary"
              >
                Email Us to Delete Account
              </a>
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

function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-0">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex gap-3 items-start text-white/75 text-sm leading-relaxed py-2 border-b border-white/4 last:border-0"
        >
          <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#cdfe71] flex-shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}
