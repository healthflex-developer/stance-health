"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ASSETS } from "@/lib/constants";

const AUTOPLAY_MS = 3500;

const CENTERS = [
  {
    name: "HSR Layout",
    phone: "+91 6360014559",
    email: "hsr@stance.health",
    address: "2nd Floor, 1555, 19th Main Rd, Agara, 1st Sector, HSR Layout, Bengaluru, Karnataka 560102",
    image: `${ASSETS}/HSR.JPG`,
  },
  {
    name: "Whitefield",
    phone: "+91 6361056456",
    email: "wfld@stance.health",
    address: "4th Floor, Kailash Parbat, No. 149, Doddanakundi, 2nd Phase, Hoodi, Whitefield, Bengaluru, Karnataka 560048",
    image: `${ASSETS}/whitefield.webp`,
  },
  {
    name: "Indiranagar",
    phone: "+91 9008417804",
    email: "indiranagar@stance.health",
    address: "3rd Floor, Srinivasan Towers, ESI Hospital Road, Defence Colony, Indiranagar, Bengaluru, Karnataka 560038",
    image: `${ASSETS}/indra.webp`,
  },
];

export default function Centers() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = CENTERS.length;

  const goTo = (i: number) => setActive(((i % count) + count) % count);
  const prev = () => goTo(active - 1);
  const next = () => goTo(active + 1);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % count);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, count]);

  return (
    <section className="py-20 bg-[#0c1b30] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-center mb-12">Our Centers</h2>

        <div
          className="relative flex items-center justify-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Prev button */}
          <button
            onClick={prev}
            aria-label="Previous center"
            className="hidden sm:flex absolute left-0 z-20 w-11 h-11 rounded-full border border-[#cdfe71]/40 items-center justify-center text-[#cdfe71] hover:bg-[#cdfe71]/10 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Slides */}
          <div className="relative w-full max-w-3xl h-[420px] sm:h-[480px] flex items-center justify-center">
            {CENTERS.map((center, i) => {
              const offset = i - active;
              const isActive = offset === 0;
              const isVisible = Math.abs(offset) <= 1;

              return (
                <div
                  key={center.name}
                  onClick={() => !isActive && goTo(i)}
                  className={`absolute inset-0 rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 ease-out ${
                    isActive
                      ? "z-10 scale-100 opacity-100 cursor-default"
                      : isVisible
                      ? "z-0 opacity-60 cursor-pointer"
                      : "z-0 opacity-0 pointer-events-none"
                  }`}
                  style={{
                    transform: isActive
                      ? "translateX(0) scale(1)"
                      : `translateX(${offset * 55}%) scale(0.85)`,
                  }}
                >
                  <Image
                    src={center.image}
                    alt={center.name}
                    fill
                    className="object-cover"
                    priority={isActive}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1b30] via-[#0c1b30]/40 to-transparent" />

                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-center">
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#cdfe71] mb-3">
                        {center.name}
                      </h3>
                      <p className="text-white text-sm sm:text-base mb-1">{center.phone}</p>
                      <p className="text-white text-sm sm:text-base mb-3">{center.email}</p>
                      <p className="text-white/70 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
                        {center.address}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Next button */}
          <button
            onClick={next}
            aria-label="Next center"
            className="hidden sm:flex absolute right-0 z-20 w-11 h-11 rounded-full border border-[#cdfe71]/40 items-center justify-center text-[#cdfe71] hover:bg-[#cdfe71]/10 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {CENTERS.map((center, i) => (
            <button
              key={center.name}
              onClick={() => goTo(i)}
              aria-label={`Go to ${center.name}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-[#cdfe71]" : "w-2 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
