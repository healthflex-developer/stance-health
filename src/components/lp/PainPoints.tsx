const POINTS = [
  {
    title: "Pain that keeps coming back",
    description: "Rest helps for a while, then the same ache returns the moment you're active again.",
  },
  {
    title: "Told to 'just rest it'",
    description: "Generic advice without knowing what's actually causing the problem beneath the surface.",
  },
  {
    title: "Not moving like you used to",
    description: "Stiffness, weakness, or hesitation that's quietly holding back your performance.",
  },
];

export default function PainPoints() {
  return (
    <section className="py-16 sm:py-20 bg-[#0c1b30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-center mb-4">Sound Familiar?</h2>
        <p className="text-white/60 text-center max-w-xl mx-auto mb-12">
          Most pain isn&apos;t random — it has a root cause. We find it before we treat it.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {POINTS.map((p) => (
            <div key={p.title} className="card-navy">
              <h3 className="text-white font-semibold mb-2 text-lg">{p.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
