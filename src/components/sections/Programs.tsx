"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PROGRAMS } from "@/lib/constants";

export default function Programs() {
  const [active, setActive] = useState(0);
  const program = PROGRAMS[active];

  return (
    <section className="py-20 bg-[#132644]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="section-title">
            Programs Built <span>For You</span>
          </h2>
          <p className="text-white/50 mt-2 text-sm">Tailored to fit your journey</p>
        </div>

        {/* Tab buttons */}
        <div className="flex gap-2 flex-wrap justify-center mb-10">
          {PROGRAMS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActive(i)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                i === active
                  ? "bg-[#cdfe71] text-black"
                  : "border border-white/20 text-white/60 hover:border-white/40 hover:text-white"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Program detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-[#1a3358]">
            <Image
              src={program.image}
              alt={program.label}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">{program.label}</h3>
            <p className="text-white/70 leading-relaxed mb-8">{program.description}</p>
            <Link href={program.href} className="btn-primary text-sm">
              View Program
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
