import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingCta from "@/components/BookingCta";

interface Feature {
  icon: string;
  title: string;
  description?: string;
}

interface Condition {
  name: string;
}

interface ProgramPageLayoutProps {
  title: string;
  subtitle: string;
  bannerImage: string;
  intro: string;
  whyTitle?: string;
  features: Feature[];
  expectTitle?: string;
  expectItems?: string[];
  conditions?: Condition[];
  conditionsTitle?: string;
  ctaText?: string;
}

export default function ProgramPageLayout({
  title,
  subtitle,
  bannerImage,
  intro,
  whyTitle = "Why Join This Program?",
  features,
  expectTitle = "What You Can Expect",
  expectItems = [],
  conditions = [],
  conditionsTitle = "Conditions We Treat",
  ctaText = "Book Your Assessment",
}: ProgramPageLayoutProps) {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Banner */}
        <section className="relative min-h-[420px] flex items-end pb-16 pt-32">
          <div className="absolute inset-0">
            <Image
              src={bannerImage}
              alt={title}
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0c1b30]/90 via-[#132644]/75 to-transparent" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-[#cdfe71] text-sm font-semibold uppercase tracking-widest mb-3">
              Program
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
              {title}
            </h1>
            <p className="text-white/70 text-lg max-w-xl mb-8">{subtitle}</p>
            <BookingCta className="btn-primary" label={ctaText} />
          </div>
        </section>

        {/* Intro */}
        <section className="py-16 bg-[#132644]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-white/70 text-lg leading-relaxed">{intro}</p>
          </div>
        </section>

        {/* Features / Why Join */}
        <section className="py-20 bg-[#0c1b30]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="section-title text-center mb-12">
              {whyTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f) => (
                <div key={f.title} className="card-navy flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#cdfe71]/10 flex items-center justify-center shrink-0">
                    <Image src={f.icon} alt={f.title} width={28} height={28} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{f.title}</h3>
                    {f.description && (
                      <p className="text-white/60 text-sm leading-relaxed">{f.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What to Expect */}
        {expectItems.length > 0 && (
          <section className="py-20 bg-[#132644]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="section-title mb-8">{expectTitle}</h2>
                  <ul className="space-y-4">
                    {expectItems.map((item, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <svg
                          viewBox="0 0 20 20"
                          fill="none"
                          className="mt-0.5 shrink-0 w-5 h-5 text-[#cdfe71]"
                        >
                          <circle cx="10" cy="10" r="10" fill="currentColor" fillOpacity="0.15" />
                          <path
                            d="M6 10.5l2.5 2.5L14 7.5"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-white/70">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-center">
                  <div className="w-full max-w-sm aspect-square rounded-2xl bg-[#1a3358] border border-white/10 overflow-hidden relative">
                    <Image
                      src={bannerImage}
                      alt="Program assessment"
                      fill
                      className="object-cover opacity-80"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Conditions Treated */}
        {conditions.length > 0 && (
          <section className="py-20 bg-[#0c1b30]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="section-title text-center mb-12">{conditionsTitle}</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {conditions.map((c) => (
                  <span
                    key={c.name}
                    className="px-5 py-2.5 rounded-full border border-white/20 text-white/70 text-sm hover:border-[#cdfe71] hover:text-[#cdfe71] transition-colors"
                  >
                    {c.name}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Banner */}
        <section className="py-20 bg-[#cdfe71]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-4">
              Ready to get started?
            </h2>
            <p className="text-black/70 mb-8">
              Our clinical team is here to help you achieve your goals. Book your first session today.
            </p>
            <BookingCta className="btn-primary bg-black text-white hover:bg-black/80" label="Book an Appointment" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
