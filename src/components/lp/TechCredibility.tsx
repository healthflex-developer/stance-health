import Image from "next/image";
import { TECHNOLOGIES } from "@/lib/constants";

// Reuses the same VALD/RunScribe technology roster shown on the homepage,
// trimmed to the three most visually persuasive tools for a fast scroll.
const FEATURED = TECHNOLOGIES.filter((t) =>
  ["vald-dynamo", "vald-force-frame", "vald-force-decks"].includes(t.id)
);

export default function TechCredibility() {
  return (
    <section className="py-16 sm:py-20 bg-[#cdfe71]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-black text-center mb-2">
          We Don&apos;t Guess. We Measure.
        </h2>
        <p className="text-black/70 text-center mb-12">
          Clinical-grade diagnostics used by elite sports teams, now at your local Stance clinic
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {FEATURED.map((item) => (
            <div key={item.id} className="bg-black/5 rounded-2xl p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-4 relative">
                <Image src={item.icon} alt={item.name} fill className="object-contain" />
              </div>
              <h3 className="text-black font-bold mb-2">{item.name}</h3>
              <p className="text-black/60 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
