import Image from "next/image";
import { TESTIMONIALS } from "@/lib/constants";

// Static 3-up grid instead of the homepage's swiper — lighter weight and
// faster first paint for paid traffic landing directly on this page.
const FEATURED = TESTIMONIALS.slice(0, 3);

export default function SocialProof() {
  return (
    <section className="py-16 sm:py-20 bg-[#0c1b30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-center mb-12">
          What Our <span>Patients Say</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {FEATURED.map((t) => (
            <div key={t.name} className="card-navy">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full overflow-hidden relative shrink-0">
                  <Image src={t.image} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-white/50 text-xs">{t.condition}</p>
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
