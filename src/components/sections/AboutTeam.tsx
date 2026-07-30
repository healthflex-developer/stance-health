"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { TEAM, ASSETS } from "@/lib/constants";

// Show 9 on desktop (3x3), 8 on tablets/mobile (2x4)
// We render 9 and hide the last one on smaller screens via CSS
const DISPLAYED_TEAM = TEAM.slice(0, 9);

export default function AboutTeam() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleBio = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-[#0c1b30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title mb-4">
            Meet Our <span className="text-[#cdfe71]">Team</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Our clinical team brings decades of combined experience in sports physiotherapy,
            rehabilitation, and performance.
          </p>
        </motion.div>

        {/* Large Team Photo */}
        {/* <motion.div
          className="relative w-full rounded-2xl overflow-hidden mb-16 aspect-[21/9]"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Image
            src={`${ASSETS}/team.jpg`}
            alt="The Stance Health Team"
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1b30] via-transparent to-transparent opacity-60" />
        </motion.div> */}

        {/* Team Cards Grid — 2 per row on mobile, 3 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 sm:gap-x-8 gap-y-10 sm:gap-y-12">
          {DISPLAYED_TEAM.map((member, index) => (
            <motion.div
              key={member.name}
              className={`group cursor-pointer ${index === 8 ? "hidden lg:block" : ""}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onClick={() => toggleBio(index)}
            >
              {/* Portrait Image */}
              <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-[#3a5070] mb-4 group-hover:shadow-[0_8px_30px_rgba(205,254,113,0.08)] transition-all duration-400">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top brightness-100 group-hover:brightness-90 group-hover:scale-105 transition-all duration-500 ease-out"
                  sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 280px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-black/35 transition-all duration-400" />

                {/* Info icon — bottom right of image */}
                <div className={`absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 z-10 ${
                  expandedIndex === index
                    ? "bg-[#cdfe71] scale-110"
                    : "bg-white/20 group-hover:bg-white/30 group-hover:scale-110"
                }`}>
                  <svg
                    className={`w-4 h-4 transition-all duration-300 ${
                      expandedIndex === index ? "text-[#132644] rotate-45" : "text-white"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </div>

                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0 bg-[#132644]/92 backdrop-blur-sm flex flex-col justify-start p-5 z-[5] overflow-y-auto team-overlay-scroll"
                    >
                      <h4 className="text-[#cdfe71] font-bold text-lg sm:text-xl mb-2">{member.name}</h4>
                      <p className="text-white text-sm sm:text-base font-medium">{member.role}</p>
                      {member.experience && (
                        <p className="text-white/50 text-xs sm:text-sm mt-1 mb-3 pb-3 border-b border-white/10">{member.experience}</p>
                      )}
                      <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                        {member.bio}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Name & Role — left aligned */}
              <h3 className="text-white font-bold text-base group-hover:text-[#cdfe71] transition-colors duration-300">
                {member.name}
              </h3>
              <p className="text-white/50 text-xs mt-0.5">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>

        {/* View Full Team Link */}
        {TEAM.length > 9 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/team"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-[#cdfe71]/40 text-[#cdfe71] font-semibold text-sm hover:bg-[#cdfe71]/10 hover:border-[#cdfe71]/70 transition-all duration-300 group"
            >
              View Full Team
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
