import Image from "next/image";
import BookingCta from "@/components/BookingCta";
import { ASSETS } from "@/lib/constants";

export default function AdHero() {
  return (
    <section className="relative min-h-[640px] sm:min-h-[720px] flex items-center pt-24 pb-16 overflow-hidden bg-[#132644]">
      <div className="absolute inset-0">
        <Image
          src={`${ASSETS}/pt-3.svg`}
          alt=""
          fill
          className="object-cover object-center opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c1b30] via-[#132644]/90 to-[#132644]/60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <p className="inline-block text-[#cdfe71] text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4 border border-[#cdfe71]/30 rounded-full px-4 py-1.5">
            Free MSK Assessment Consult
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5">
            Stop Guessing Why It{" "}
            <span className="text-[#cdfe71]">Still Hurts</span>
          </h1>
          <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl">
            Get a data-driven diagnosis of your pain in one visit — powered by VALD force
            testing and expert physiotherapists. Find the root cause, not just the symptom.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <BookingCta className="btn-primary text-base px-8 py-4 text-center">
              Book My Assessment
            </BookingCta>
            <p className="text-white/50 text-sm">
              Bangalore clinics · Slots open this week
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3 mt-10 pt-8 border-t border-white/10">
            <div>
              <p className="text-white text-2xl font-bold">3</p>
              <p className="text-white/50 text-xs uppercase tracking-wide">Bangalore Clinics</p>
            </div>
            <div>
              <p className="text-white text-2xl font-bold">1000+</p>
              <p className="text-white/50 text-xs uppercase tracking-wide">Patients Treated</p>
            </div>
            <div>
              <p className="text-white text-2xl font-bold">VALD</p>
              <p className="text-white/50 text-xs uppercase tracking-wide">Diagnostic Tech</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
