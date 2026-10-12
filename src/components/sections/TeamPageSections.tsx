"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePreviewProps } from "@/components/preview/usePreviewDraft";
import { TEAM, ASSETS } from "@/lib/constants";
import { previewAsset, previewList, previewString } from "@/lib/preview-draft";

export function TeamHeroSection({ sourceType = "TeamHero" }: { sourceType?: string }) {
  const hero = usePreviewProps(sourceType);
  const directory = usePreviewProps("TeamDirectory");
  const members = previewList(directory?.members, TEAM);

  return (
    <section className="relative min-h-[280px] flex items-end pb-14 pt-32 bg-[#132644]" data-preview-block={sourceType}>
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={previewAsset(hero?.backgroundImage, `${ASSETS}/team.jpg`)}
          alt="Stance Health Team"
          fill
          className="object-cover object-center opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#132644]/60 to-[#132644]" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <motion.p
          className="text-[#cdfe71] text-sm font-semibold uppercase tracking-widest mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {previewString(hero?.eyebrow, "Our People")}
        </motion.p>
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {previewString(hero?.headingPrefix, "The")} <span className="text-[#cdfe71]">{previewString(hero?.headingHighlight, "Team")}</span>
        </motion.h1>
        <motion.p
          className="text-white/60 text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {previewString(hero?.description, `${members.length}+ professionals dedicated to your recovery and performance.`)}
        </motion.p>
      </div>
    </section>
  );
}

export function TeamDirectorySection({ sourceType = "TeamDirectory" }: { sourceType?: string }) {
  const directory = usePreviewProps(sourceType);
  const members = previewList(directory?.members, TEAM);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleBio = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-20 bg-[#0c1b30]" data-preview-block={sourceType}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 sm:gap-x-8 gap-y-10 sm:gap-y-12">
          {members.map((member, index) => (
            <motion.div
              key={member.name || index}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.4, delay: (index % 12) * 0.05 }}
              onClick={() => toggleBio(index)}
            >
              <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-[#3a5070] mb-4 group-hover:shadow-[0_8px_30px_rgba(205,254,113,0.08)] transition-all duration-400">
                <Image
                  src={previewAsset(member.image, TEAM[0].image)}
                  alt={member.name}
                  fill
                  className="object-cover object-top brightness-100 group-hover:brightness-90 group-hover:scale-105 transition-all duration-500 ease-out"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, (max-width: 1280px) 30vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-black/35 transition-all duration-400" />
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
                      <p className="text-white/70 text-sm sm:text-base leading-relaxed">{member.bio}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <h3 className="text-white font-bold text-sm sm:text-base group-hover:text-[#cdfe71] transition-colors duration-300">
                {member.name}
              </h3>
              <p className="text-white/50 text-xs mt-0.5">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
