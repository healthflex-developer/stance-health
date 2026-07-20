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
        <section className="program-banner">
          <div className="program-banner-slide">
            <Image
              src={bannerImage}
              alt={title}
              fill
              className="object-cover object-center"
              priority
            />
            <div className="banner-overlay" />
            <div className="banner-inner">
              <div className="banner-con">
                <p className="text-[#cdfe71] text-xs sm:text-sm font-semibold uppercase tracking-widest mb-2 sm:mb-3">
                  Program
                </p>
                <h1>
                  {title.split(" ").slice(0, -1).join(" ")}{" "}
                  <span>{title.split(" ").slice(-1)[0]}</span>
                </h1>
                <p className="para">{subtitle}</p>
                <BookingCta className="main-btn">
                  <span>{ctaText}</span>
                </BookingCta>
              </div>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-14 sm:py-20 bg-[#132644] relative overflow-hidden">
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center border border-white/10 rounded-2xl p-8 sm:p-12 bg-[#1a3358]/40 backdrop-blur-sm">
              {/* Top green accent bar */}
              <div className="flex justify-center mb-6">
                <div className="w-12 h-1 bg-[#cdfe71] rounded-full" />
              </div>
              <p className="text-white/85 text-base sm:text-lg lg:text-xl leading-relaxed font-medium">
                {intro.split("—").length > 1 ? (
                  <>
                    {intro.split("—")[0]}—
                    <span className="text-[#cdfe71] font-semibold">{intro.split("—")[1]}</span>
                  </>
                ) : (
                  <>
                    {intro.split(".").slice(0, -1).map((sentence, i, arr) => (
                      <span key={i}>
                        {i === arr.length - 1 ? (
                          <span className="text-[#cdfe71]">{sentence}.</span>
                        ) : (
                          <>{sentence}. </>
                        )}
                      </span>
                    ))}
                  </>
                )}
              </p>
              {/* Bottom green accent bar */}
              <div className="flex justify-center mt-6">
                <div className="w-12 h-1 bg-[#cdfe71] rounded-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Features / Why Join */}
        <section className="py-16 sm:py-20 bg-[#0c1b30]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="section-title text-center mb-10 sm:mb-12">
              {whyTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {features.map((f) => (
                <div key={f.title} className="card-navy flex gap-4 border border-white/5 hover:border-[#cdfe71]/30 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(205,254,113,0.08)] transition-all duration-300">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#cdfe71]/10 shrink-0 overflow-hidden relative">
                    <Image
                      src={f.icon}
                      alt={f.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-white font-semibold mb-1 text-sm sm:text-base">{f.title}</h3>
                    {f.description && (
                      <p className="text-white/60 text-xs sm:text-sm leading-relaxed">{f.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What to Expect */}
        {expectItems.length > 0 && (
          <section className="py-16 sm:py-20 bg-[#132644]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
                <div>
                  <h2 className="section-title mb-6 sm:mb-8">{expectTitle}</h2>
                  <ul className="space-y-3 sm:space-y-4">
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
                        <span className="text-white/70 text-sm sm:text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-center">
                  <div className="w-full max-w-xs sm:max-w-sm aspect-square rounded-2xl bg-[#1a3358] border border-white/10 overflow-hidden relative hover:shadow-[0_12px_40px_rgba(205,254,113,0.1)] hover:border-[#cdfe71]/20 transition-all duration-300 group/expect">
                    <Image
                      src={bannerImage}
                      alt="Program assessment"
                      fill
                      className="object-cover opacity-80 group-hover/expect:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Conditions Treated */}
        {conditions.length > 0 && (
          <section className="py-16 sm:py-20 bg-[#0c1b30]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="section-title text-center mb-8 sm:mb-12">{conditionsTitle}</h2>
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-2 sm:gap-3">
                {conditions.map((c) => (
                  <span
                    key={c.name}
                    className="px-3 sm:px-5 py-2.5 rounded-full border border-white/20 text-white/70 text-xs sm:text-sm text-center hover:border-[#cdfe71] hover:text-[#cdfe71] hover:bg-[#cdfe71]/5 hover:shadow-[0_4px_15px_rgba(205,254,113,0.1)] active:border-[#cdfe71] active:text-[#cdfe71] active:bg-[#cdfe71]/10 transition-all duration-300 cursor-default select-none"
                  >
                    {c.name}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Banner */}
        <section className="py-16 sm:py-20 bg-[#cdfe71]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black mb-4">
              Ready to get started?
            </h2>
            <p className="text-black/70 mb-6 sm:mb-8 text-sm sm:text-base">
              Our clinical team is here to help you achieve your goals. Book your first session today.
            </p>
            <BookingCta className="inline-block bg-black text-white font-semibold px-8 py-3 rounded-full hover:bg-black/80 transition-colors" label="Book an Appointment" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
