"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { TEAM } from "@/lib/constants";
import { previewList, previewText, useAdminPreviewBlock } from "@/components/PreviewDraft";
import { usePublishedBlock } from "@/components/PublishedContent";
import { applyAssetMeta, assetAlt } from "@/lib/asset-label";

// Show 9 on desktop (3x3), 8 on tablets/mobile (2x4) on the public page.
// The admin preview renders every draft member so newly added cards are visible.
const DISPLAYED_TEAM = TEAM.slice(0, 9);

export default function AboutTeam() {
  const draft = useAdminPreviewBlock("about-team", "AboutTeam");
  const published = usePublishedBlock("about-team");
  const rawMembers = applyAssetMeta(draft ? previewList(draft, "members", TEAM) : DISPLAYED_TEAM, published?.props?.members, ["image"]);
  const members = rawMembers.map((member, index) => ({
    ...member,
    image: member.image || "",
    name: member.name || `Team member ${index + 1}`,
    role: member.role || "Add role",
    experience: member.experience || "Add experience",
    bio: member.bio || "Add team member bio",
  }));
  const headingPrefix = previewText(draft, "headingPrefix", "Meet Our ");
  const headingHighlight = previewText(draft, "headingHighlight", "Team");
  const intro = previewText(
    draft,
    "intro",
    "Our clinical team brings decades of combined experience in sports physiotherapy, rehabilitation, and performance.",
  );
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleBio = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-[#0c1b30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title mb-4">
            <span data-admin-field="headingPrefix">{headingPrefix}</span>
            <span data-admin-field="headingHighlight" className="text-[#cdfe71]">{headingHighlight}</span>
          </h2>
          <p data-admin-field="intro" className="text-white/50 text-lg max-w-2xl mx-auto">
            {intro}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 sm:gap-x-8 gap-y-10 sm:gap-y-12">
          {members.map((member, index) => (
            <motion.div
              key={`${member.name}-${index}`}
              className={`group cursor-pointer ${!draft && index === 8 ? "hidden lg:block" : ""}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onClick={() => toggleBio(index)}
              data-admin-list="members"
              data-admin-list-index={index}
            >
              <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-[#3a5070] mb-4 group-hover:shadow-[0_8px_30px_rgba(205,254,113,0.08)] transition-all duration-400">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={assetAlt(member, "image", member.name)}
                    fill
                    className="object-cover object-top brightness-100 group-hover:brightness-90 group-hover:scale-105 transition-all duration-500 ease-out"
                    sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 280px"
                    data-admin-list-field="image"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs font-semibold uppercase tracking-widest text-white/50">
                    Photo placeholder
                  </div>
                )}
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
                      <h4 data-admin-list-field="name" className="text-[#cdfe71] font-bold text-lg sm:text-xl mb-2">{member.name}</h4>
                      <p data-admin-list-field="role" className="text-white text-sm sm:text-base font-medium">{member.role}</p>
                      {member.experience && (
                        <p data-admin-list-field="experience" className="text-white/50 text-xs sm:text-sm mt-1 mb-3 pb-3 border-b border-white/10">{member.experience}</p>
                      )}
                      <p data-admin-list-field="bio" className="text-white/70 text-sm sm:text-base leading-relaxed">
                        {member.bio}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <h3 data-admin-list-field="name" className="text-white font-bold text-base group-hover:text-[#cdfe71] transition-colors duration-300">
                {member.name}
              </h3>
              <p data-admin-list-field="role" className="text-white/50 text-xs mt-0.5">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>

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
