import BookingCta from "@/components/BookingCta";

const FAQS = [
  {
    q: "What happens in the first assessment?",
    a: "A physiotherapist reviews your history, runs VALD strength and movement diagnostics, and explains what's actually driving your pain — with a plan you can start the same day.",
  },
  {
    q: "Do I need a referral or diagnosis already?",
    a: "No. Most patients come to us without a clear diagnosis. Finding the root cause is exactly what the assessment is for.",
  },
  {
    q: "How much does it cost?",
    a: "Pricing is confirmed when you book, based on your clinic and assessment type — no hidden fees.",
  },
  {
    q: "Which clinics can I visit?",
    a: "HSR Layout, Whitefield, and Indiranagar in Bangalore. You'll pick your preferred location when booking.",
  },
];

export default function FaqCta() {
  return (
    <section className="py-16 sm:py-20 bg-[#132644]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-center mb-12">Common Questions</h2>
        <div className="space-y-4 mb-16">
          {FAQS.map((f) => (
            <details key={f.q} className="card-navy group">
              <summary className="text-white font-semibold cursor-pointer list-none flex justify-between items-center gap-4">
                {f.q}
                <span className="text-[#cdfe71] shrink-0 transition-transform group-open:rotate-45 text-xl leading-none">
                  +
                </span>
              </summary>
              <p className="text-white/60 text-sm leading-relaxed mt-3">{f.a}</p>
            </details>
          ))}
        </div>

        <div className="bg-[#cdfe71] rounded-3xl px-6 sm:px-12 py-12 text-center">
          <h3 className="text-3xl sm:text-4xl font-extrabold text-black mb-4">
            Ready to Find Out What&apos;s Really Going On?
          </h3>
          <p className="text-black/70 mb-8 max-w-lg mx-auto">
            Book your assessment today and get a clear, data-backed plan for your recovery.
          </p>
          <BookingCta className="btn-primary bg-black text-white hover:bg-black/80 text-base px-8 py-4">
            Book My Assessment
          </BookingCta>
        </div>
      </div>
    </section>
  );
}
