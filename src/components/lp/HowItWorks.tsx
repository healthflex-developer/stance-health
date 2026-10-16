import BookingCta from "@/components/BookingCta";

const STEPS = [
  {
    step: "01",
    title: "Book Your Slot",
    description: "Pick a time at your nearest Stance clinic — HSR, Whitefield, or Indiranagar.",
  },
  {
    step: "02",
    title: "Get Assessed",
    description: "A physiotherapist runs VALD diagnostics to pinpoint the real cause of your pain.",
  },
  {
    step: "03",
    title: "Walk Out With a Plan",
    description: "Leave with a clear, personalised recovery roadmap — no guesswork, no generic advice.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 sm:py-20 bg-[#132644]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-center mb-12">
          Three Steps to <span>Answers</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
          {STEPS.map((s) => (
            <div key={s.step} className="relative">
              <span className="text-[#cdfe71]/30 text-6xl font-extrabold leading-none">{s.step}</span>
              <h3 className="text-white font-semibold text-xl mt-2 mb-2">{s.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <BookingCta className="btn-primary text-base px-8 py-4">
            Book My Assessment
          </BookingCta>
        </div>
      </div>
    </section>
  );
}
