"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Centers from "@/components/sections/Centers";
import { ASSETS, VIDEO_ASSETS, TEAM_TESTIMONIALS, CAREER_VALUES, CAREER_FAQ, CENTERS } from "@/lib/constants";
import { previewList, previewText, useAdminPreviewBlock } from "@/components/PreviewDraft";

/* ─── DATA ─────────────────────────────────────────────────────────────── */

// Floating partner/impact icons (placeholder paths — replace with cloudinary)
const IMPACT_ICONS = [
  `${ASSETS}/careers/logos/Bangalore_City_FC.webp`,
  `${ASSETS}/careers/logos/BCCI.svg`,
  `${ASSETS}/careers/logos/Blue_tigers.png`,
  `${ASSETS}/careers/logos/Dream_United.png`,
  `${ASSETS}/careers/logos/FC_Real.png`,
  `${ASSETS}/careers/logos/images.jpg`,
  `${ASSETS}/careers/logos/Kodagu.png`,
  `${ASSETS}/careers/logos/Level_Pro.jpg`,
  `${ASSETS}/careers/logos/Machaxi.webp`,
  `${ASSETS}/careers/logos/Punjab_Kings.png`,
  `${ASSETS}/careers/logos/RDS.png`,
  `${ASSETS}/careers/logos/Rosh_Badminton_Academy.png`,
  `${ASSETS}/careers/logos/RX_Cricket_Academy.png`,
  `${ASSETS}/careers/logos/Six_Cricket.png`,
  `${ASSETS}/careers/logos/True_Cricket.png`,
];

const STATS = [
  { icon: "users", value: "2000+", label: "Total Users", sub: "Patients treated across all centres" },
  { icon: "athlete", value: "500+", label: "Total Athletes", sub: "Professional & amateur athletes trained" },
  { icon: "center", value: "5", label: "Active Centres", sub: "Across Bengaluru" },
  { icon: "data", value: "6", label: "Data Systems", sub: "VALD, Output Sports, ForceDecks & more" },
];

const CAREER_TRACKS = [
  {
    id: "snc",
    badge: "PERFORMANCE TRACK",
    title: "STRENGTH & CONDITIONING",
    tagline: "Become the coach athletes ask for by name.",
    description:
      "Instead of counting sessions, you'll learn how elite performance systems are designed, challenged and continuously refined.",
    levels: [
      { title: "SENIOR", sub: "3+ yrs · lead coach", level: "L3" },
      { title: "JUNIOR", sub: "1-3 yrs · staff & combined", level: "L2" },
      { title: "INTERN", sub: "structured 3-month pathway", level: "L1" },
    ],
    videos: [
      { src: `${VIDEO_ASSETS}/careers/SandCVideos/video1.mov`, title: "Coach, don't supervise", body: "Run the entire athlete lifecycle — from assessment to programming to in-session coaching." },
      { src: `${VIDEO_ASSETS}/careers/SandCVideos/Evidence_meets_experience2.mov`, title: "Evidence meets experience", body: "Debate research with practitioners who publish, teach and still coach every week." },
      { src: `${VIDEO_ASSETS}/careers/SandCVideos/Accelerated_responsibility.mov`, title: "Accelerated responsibility", body: "You'll own athlete profiles, present data and contribute sooner than you'd expect." },
      { src: `${VIDEO_ASSETS}/careers/SandCVideos/Build.mov`, title: "Build a reputation", body: "Not just experience — a name athletes and coaches recognize." },
      { src: `${VIDEO_ASSETS}/careers/SandCVideos/video3.mov`, title: "Learn from India's leading S&C minds", body: "Work under coaches who've built performance systems from scratch." },
    ],
  },
  {
    id: "physio",
    badge: "CLINICAL TRACK",
    title: "SPORTS PHYSIOTHERAPY",
    tagline: "Treat the athlete, not just the injury.",
    description:
      "Work with cutting-edge diagnostic tools, evidence-based protocols, and a multi-disciplinary team that elevates your clinical reasoning every day.",
    levels: [
      { title: "SENIOR", sub: "5+ yrs · lead clinician", level: "L3" },
      { title: "JUNIOR", sub: "2-5 yrs · MSK & sports", level: "L2" },
      { title: "INTERN", sub: "structured clinical rotation", level: "L1" },
    ],
    videos: [
      { src: `${VIDEO_ASSETS}/careers/PhysioVideos/Think_like_a_movement_specialist.mov`, title: "Think like a movement specialist", body: "Go beyond protocols — understand why bodies move the way they do." },
      { src: `${VIDEO_ASSETS}/careers/PhysioVideos/Bridge_rehab_and performance.mov`, title: "Bridge rehab and performance", body: "Work at the intersection of clinical care and athletic output." },
      { src: `${VIDEO_ASSETS}/careers/PhysioVideos/Receive_real_mentorship.mov`, title: "Receive real mentorship", body: "Case discussions, clinical reasoning labs, and 1:1 growth every week." },
      { src: `${VIDEO_ASSETS}/careers/PhysioVideos/Master_Return_to_Performance_2.mov`, title: "Master return-to-performance", body: "Use data to guide every decision from day 1 post-op to full clearance." },
      { src: `${VIDEO_ASSETS}/careers/PhysioVideos/Become the clinician every clinician_calls.mov`, title: "Become the clinician others call", body: "Build a reputation for clinical reasoning that sets you apart." },
    ],
  },
];

type CareerLevelDraft = {
  title?: string;
  sub?: string;
  level?: string;
};

type CareerVideoDraft = {
  src?: string;
  title?: string;
  body?: string;
};

type CareerTrackDraft = {
  id?: string;
  badge?: string;
  title?: string;
  tagline?: string;
  description?: string;
  joinLabel?: string;
  levels?: CareerLevelDraft[];
  videos?: CareerVideoDraft[];
};

type CareerStoryDraft = {
  quote?: string;
  name?: string;
  role?: string;
  initials?: string;
};

type CareerStatDraft = {
  icon?: string;
  value?: string;
  label?: string;
  sub?: string;
};

type CareerRoleDraft = {
  title?: string;
  location?: string;
  category?: string;
  slug?: string;
};

type CareerCenterDraft = {
  image?: string;
  name?: string;
  phone?: string;
  address?: string;
  maps?: string;
};

type CareerValueDraft = {
  icon?: string;
  title?: string;
  body?: string;
};

type CareerFaqDraft = {
  question?: string;
  answer?: string;
};

const EMPTY_CAREER_STAT: CareerStatDraft = {
  icon: "users",
  value: "Value",
  label: "New statistic",
  sub: "Add supporting text",
};

const EMPTY_CAREER_ROLE: CareerRoleDraft = {
  title: "New role",
  location: "Add location",
  category: "Clinical & Performance",
  slug: "new-role",
};

const EMPTY_CAREER_CENTER: CareerCenterDraft = {
  image: "",
  name: "New centre",
  phone: "Add phone",
  address: "Add address",
  maps: "",
};

const EMPTY_CAREER_VALUE: CareerValueDraft = {
  icon: "wrench",
  title: "New value",
  body: "Add the value description",
};

const EMPTY_CAREER_FAQ: CareerFaqDraft = {
  question: "New question",
  answer: "Add the answer",
};

function displayValue(value: string | undefined, placeholder: string): string {
  return value?.trim() || placeholder;
}

function displayAsset(value: string | undefined, fallback: string): string {
  return value?.trim() || fallback;
}

function resolveCareerStories(items: CareerStoryDraft[]): CareerStoryDraft[] {
  return items.map((item, index) => ({
    quote: displayValue(item.quote, `Add testimonial ${index + 1}`),
    name: displayValue(item.name, "New team member"),
    role: displayValue(item.role, "Role"),
    initials: displayValue(item.initials, "?").slice(0, 2),
  }));
}

function resolveCareerStats(items: CareerStatDraft[]): CareerStatDraft[] {
  return items.map((item) => ({
    ...EMPTY_CAREER_STAT,
    ...item,
    icon: displayValue(item.icon, EMPTY_CAREER_STAT.icon!),
    value: displayValue(item.value, EMPTY_CAREER_STAT.value!),
    label: displayValue(item.label, EMPTY_CAREER_STAT.label!),
    sub: displayValue(item.sub, EMPTY_CAREER_STAT.sub!),
  }));
}

function resolveCareerRoles(items: CareerRoleDraft[]): CareerRoleDraft[] {
  return items.map((item) => ({
    ...EMPTY_CAREER_ROLE,
    ...item,
    title: displayValue(item.title, EMPTY_CAREER_ROLE.title!),
    location: displayValue(item.location, EMPTY_CAREER_ROLE.location!),
    category: displayValue(item.category, EMPTY_CAREER_ROLE.category!),
    slug: displayValue(item.slug, EMPTY_CAREER_ROLE.slug!),
  }));
}

function resolveCareerCenters(items: CareerCenterDraft[]): CareerCenterDraft[] {
  return items.map((item) => ({
    ...EMPTY_CAREER_CENTER,
    ...item,
    image: displayAsset(item.image, ""),
    name: displayValue(item.name, EMPTY_CAREER_CENTER.name!),
    phone: displayValue(item.phone, EMPTY_CAREER_CENTER.phone!),
    address: displayValue(item.address, EMPTY_CAREER_CENTER.address!),
    maps: item.maps ?? "",
  }));
}

function resolveCareerValues(items: CareerValueDraft[]): CareerValueDraft[] {
  return items.map((item) => ({
    ...EMPTY_CAREER_VALUE,
    ...item,
    icon: displayValue(item.icon, EMPTY_CAREER_VALUE.icon!),
    title: displayValue(item.title, EMPTY_CAREER_VALUE.title!),
    body: displayValue(item.body, EMPTY_CAREER_VALUE.body!),
  }));
}

function resolveCareerFaqs(items: CareerFaqDraft[]): CareerFaqDraft[] {
  return items.map((item) => ({
    ...EMPTY_CAREER_FAQ,
    ...item,
    question: displayValue(item.question, EMPTY_CAREER_FAQ.question!),
    answer: displayValue(item.answer, EMPTY_CAREER_FAQ.answer!),
  }));
}

const EMPTY_CAREER_TRACK: CareerTrackDraft = {
  id: "",
  badge: "CAREER TRACK",
  title: "New Career Track",
  tagline: "",
  description: "",
  joinLabel: "Join the Track",
  levels: [],
  videos: [{ src: "", title: "", body: "" }],
};

function resolveCareerTracks(items: CareerTrackDraft[]): CareerTrackDraft[] {
  return items.map((item, index) => {
    const fallback = CAREER_TRACKS.find((track) => track.id === item.id) ?? CAREER_TRACKS[index];
    const levels = (item.levels ?? fallback?.levels ?? EMPTY_CAREER_TRACK.levels ?? []).map((level, levelIndex) => ({
      ...fallback?.levels?.[levelIndex],
      ...level,
      title: displayValue(level.title, "Level title"),
      sub: displayValue(level.sub, "Add level details"),
      level: displayValue(level.level, `L${levelIndex + 1}`),
    }));
    const videos = (item.videos ?? fallback?.videos ?? EMPTY_CAREER_TRACK.videos ?? []).map((video) => ({
      ...video,
      src: video.src ?? "",
      title: displayValue(video.title, "New video"),
      body: displayValue(video.body, "Add video description"),
    }));
    return {
      ...fallback,
      ...item,
      id: displayValue(item.id, fallback?.id ?? `track-${index + 1}`),
      badge: displayValue(item.badge, fallback?.badge ?? EMPTY_CAREER_TRACK.badge!),
      title: displayValue(item.title, fallback?.title ?? EMPTY_CAREER_TRACK.title!),
      tagline: displayValue(item.tagline, fallback?.tagline ?? "Add a track tagline"),
      description: displayValue(item.description, fallback?.description ?? "Add a track description"),
      joinLabel: displayValue(item.joinLabel, EMPTY_CAREER_TRACK.joinLabel!),
      levels,
      videos,
    };
  });
}

function trackTabLabel(track: CareerTrackDraft, index: number): string {
  if (track.id === "snc") return "Strength & Conditioning";
  if (track.id === "physio") return "Sports Physiotherapy";
  return track.title || `Career Track ${index + 1}`;
}

const ROLE_CATEGORIES = ["All Roles", "Clinical & Performance", "Patient Care & Operations", "Corporate & Leadership"];
const LOCATIONS = ["All locations", "HSR", "Whitefield", "Indiranagar", "JP Nagar"];

const OPEN_ROLES = [
  { title: "Senior Strength & Conditioning Coach", location: "Bengaluru (HSR · Whitefield · Indiranagar)", category: "Clinical & Performance", slug: "senior-sc" },
  { title: "Junior Strength & Conditioning Coach", location: "Bengaluru (HSR · Whitefield · Indiranagar)", category: "Clinical & Performance", slug: "junior-sc" },
  { title: "Strength & Conditioning Intern", location: "Bengaluru (HSR · Whitefield · Indiranagar)", category: "Clinical & Performance", slug: "sc-intern" },
  { title: "Senior / In-charge Physiotherapist — MSK & Sports", location: "Bengaluru", category: "Clinical & Performance", slug: "senior-physio" },
  { title: "Junior Sports Physiotherapist", location: "Bengaluru (HSR · Whitefield)", category: "Clinical & Performance", slug: "junior-physio" },
  { title: "Physiotherapy Intern", location: "Bengaluru (All centres)", category: "Clinical & Performance", slug: "physio-intern" },
  { title: "Patient Care Coordinator", location: "Bengaluru (Indiranagar)", category: "Patient Care & Operations", slug: "patient-care" },
  { title: "Operations Associate", location: "Bengaluru", category: "Corporate & Leadership", slug: "operations" },
];

/* ─── PAGE ──────────────────────────────────────────────────────────────── */

export default function CareersPage() {
  const careerHeroDraft = useAdminPreviewBlock("careers-hero", "CareersHero");
  const careerStatisticsDraft = useAdminPreviewBlock("careers-statistics", "CareerStatistics");
  const careerOpenRolesDraft = useAdminPreviewBlock("careers-open-roles", "CareerOpenRoles");
  const careerCentersDraft = useAdminPreviewBlock("careers-centers", "CareerCenters");
  const careerValuesDraft = useAdminPreviewBlock("careers-values", "CareerValues");
  const careerFaqDraft = useAdminPreviewBlock("careers-faq", "CareerFAQ");
  const careerCtaDraft = useAdminPreviewBlock("careers-cta", "CareersCTA");
  const careerStoriesDraft = useAdminPreviewBlock("careers-team-stories", "CareerTeamStories");
  const teamStories = resolveCareerStories(
    previewList<CareerStoryDraft>(careerStoriesDraft, "stories", TEAM_TESTIMONIALS),
  );
  const careerTracksDraft = useAdminPreviewBlock("careers-tracks", "CareerTracks");
  const tracks = resolveCareerTracks(
    previewList<CareerTrackDraft>(careerTracksDraft, "tracks", CAREER_TRACKS),
  );
  const stats = resolveCareerStats(
    previewList<CareerStatDraft>(careerStatisticsDraft, "stats", STATS),
  );
  const roles = resolveCareerRoles(
    previewList<CareerRoleDraft>(careerOpenRolesDraft, "roles", OPEN_ROLES),
  );
  const centers = resolveCareerCenters(
    previewList<CareerCenterDraft>(careerCentersDraft, "items", CENTERS),
  );
  const values = resolveCareerValues(
    previewList<CareerValueDraft>(careerValuesDraft, "values", CAREER_VALUES),
  );
  const faqs = resolveCareerFaqs(
    previewList<CareerFaqDraft>(careerFaqDraft, "faqs", CAREER_FAQ),
  );
  const visibleTracks = tracks.length > 0 ? tracks : [EMPTY_CAREER_TRACK];
  const visibleValues = values.length > 0 ? values : [EMPTY_CAREER_VALUE];
  const heroPrefix = previewText(careerHeroDraft, "headlinePrefix", "Where your career");
  const heroHighlightOne = previewText(careerHeroDraft, "highlightOne", "actually");
  const heroHighlightTwo = previewText(careerHeroDraft, "highlightTwo", "accelerates.");
  const heroParagraphOne = previewText(careerHeroDraft, "paragraphOne", "Most S&C coaches and physios in India spend years waiting for elite exposure — a national athlete on their table, real data instead of guesswork, a mentor worth learning from.");
  const heroParagraphTwo = previewText(careerHeroDraft, "paragraphTwo", "At Stance, that's the job from day one.");
  const heroCtaLabel = previewText(careerHeroDraft, "ctaLabel", "See Open Roles");
  const heroImpactHeading = previewText(careerHeroDraft, "impactHeading", "Where our team has made an impact");
  const statisticsHeadingPrefix = previewText(careerStatisticsDraft, "headingPrefix", "Your Next");
  const statisticsHeadingHighlight = previewText(careerStatisticsDraft, "headingHighlight", "Chapter");
  const statisticsDescription = previewText(careerStatisticsDraft, "description", "At Stance, you won't just gain experience. You'll develop under people who've built systems, coached elite athletes and continue raising the standard of sports science every single day.");
  const rolesHeadingPrefix = previewText(careerOpenRolesDraft, "headingPrefix", "Open");
  const rolesHeadingHighlight = previewText(careerOpenRolesDraft, "headingHighlight", "Roles");
  const rolesDescription = previewText(careerOpenRolesDraft, "description", "Filter by domain and location. Every role links to the full brief and an inline application.");
  const storiesHeadingPrefix = previewText(careerStoriesDraft, "headingPrefix", "From the");
  const storiesHeadingHighlight = previewText(careerStoriesDraft, "headingHighlight", "Team");
  const storiesDescription = previewText(careerStoriesDraft, "description", "What it's like to build a career at Stance.");
  const valuesHeadingPrefix = previewText(careerValuesDraft, "headingPrefix", "What you're actually");
  const valuesHeadingHighlight = previewText(careerValuesDraft, "headingHighlight", "signing up for");
  const valuesDescription = previewText(careerValuesDraft, "description", "We don't run on hierarchy. We run on reasoning, speed, and people who'd rather fix something than flag it.");
  const faqHeadingPrefix = previewText(careerFaqDraft, "headingPrefix", "Careers");
  const faqHeadingHighlight = previewText(careerFaqDraft, "headingHighlight", "FAQ");
  const faqDescription = previewText(careerFaqDraft, "description", "Common questions about applying, interviews and internships at Stance.");
  const ctaHeadingPrefix = previewText(careerCtaDraft, "headingPrefix", "Don't see your role?");
  const ctaHeadingHighlight = previewText(careerCtaDraft, "headingHighlight", "Say hello anyway.");
  const ctaDescription = previewText(careerCtaDraft, "description", "We're always looking for people who care about the craft. Send us a note and we'll route it to the right team.");
  const ctaLabel = previewText(careerCtaDraft, "ctaLabel", "Email careers@stance.health");
  const ctaEmail = previewText(careerCtaDraft, "email", "careers@stance.health");
  const [activeTrack, setActiveTrack] = useState(0);
  const [activeValue, setActiveValue] = useState(0);
  const [activeVideo, setActiveVideo] = useState(0);
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [locationFilter, setLocationFilter] = useState("All locations");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeTrackIndex = Math.min(activeTrack, Math.max(visibleTracks.length - 1, 0));
  const activeValueIndex = Math.min(activeValue, Math.max(visibleValues.length - 1, 0));
  const activeVideoIndex = Math.min(
    activeVideo,
    Math.max((visibleTracks[activeTrackIndex]?.videos?.length ?? 1) - 1, 0),
  );

  // Auto-advance video when it ends.
  const handleVideoEnded = () => {
    const videoCount = visibleTracks[activeTrackIndex]?.videos?.length ?? 0;
    if (videoCount > 0) setActiveVideo((prev) => (prev + 1) % videoCount);
  };

  const filteredRoles = roles.filter((role) => {
    const matchCategory = roleFilter === "All Roles" || role.category === roleFilter;
    const matchLocation = locationFilter === "All locations" || role.location?.includes(locationFilter);
    return matchCategory && matchLocation;
  });

  return (
    <>
      <Navbar />
      <main>

        {/* ─── HERO SECTION ─────────────────────────────────────────────── */}
        <section className="relative min-h-[100vh] flex flex-col justify-between bg-[#0d1f3c] overflow-hidden">
          {/* BG Video */}
          <div className="absolute inset-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={`${VIDEO_ASSETS}/careers/hero.mp4`} type="video/mp4" />
            </video>
            {/* Gradient overlay: clear at top, dark navy at bottom */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0d1f3c]/30 via-[#0d1f3c]/60 to-[#0d1f3c]" />
            {/* Left side overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d1f3c]/70 via-[#0d1f3c]/40 to-transparent" />
          </div>

          {/* Hero content */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pt-40 w-full flex-1 flex items-center">
            <div>
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-2xl font-[family-name:var(--font-unbounded)]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                {heroPrefix}{" "}
                <span className="text-[#cdfe71]">{heroHighlightOne}</span>{" "}
                <span className="text-[#cdfe71]">{heroHighlightTwo}</span>
              </motion.h1>

            <motion.p
              className="text-white/60 text-base sm:text-lg max-w-lg mt-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {heroParagraphOne}
            </motion.p>
            <motion.p
              className="text-white/50 text-sm sm:text-base max-w-lg mt-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {heroParagraphTwo}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8"
            >
              <a
                href="#open-roles"
                className="inline-block px-6 py-3 rounded-full border border-white text-white font-semibold text-sm hover:bg-white hover:text-[#132644] transition-all duration-300"
              >
                {heroCtaLabel}
              </a>
            </motion.div>
            </div>
          </div>

          {/* Icons at bottom of hero */}
          <div className="relative w-full pb-8 pt-4">
            <hr className="border-0 border-t border-white/[0.04] mb-5" />

            <p className="text-center text-white/30 text-xs uppercase tracking-[3px] mb-6">
            {heroImpactHeading}
            </p>
            <div className="flex gap-20 animate-marquee">
              {[...IMPACT_ICONS, ...IMPACT_ICONS].map((icon, i) => (
                <div key={i} className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 relative opacity-70 hover:opacity-100 transition-opacity duration-300">
                  <Image src={icon} alt="partner" fill className="object-contain" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── YOUR NEXT CHAPTER (STATS) ────────────────────────────────── */}
        <section className="py-20 bg-[#0d1f3c]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              className="section-title mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {statisticsHeadingPrefix} <span className="text-[#cdfe71]">{statisticsHeadingHighlight}</span>
            </motion.h2>
            <p className="text-white/50 text-base sm:text-lg max-w-xl mb-12">
              {statisticsDescription}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  className="bg-[#132644] border border-white/8 rounded-2xl p-6 hover:border-[#cdfe71]/20 transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#cdfe71]/10 border border-[#cdfe71]/20 flex items-center justify-center mb-3">
                    {stat.icon === "users" && (
                      <svg className="w-5 h-5 text-[#cdfe71]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-1.997m0 0A8.96 8.96 0 0112 15a8.966 8.966 0 00-5.982 2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                    {stat.icon === "athlete" && (
                      <svg className="w-5 h-5 text-[#cdfe71]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.016 6.016 0 01-4.27 1.772 6.016 6.016 0 01-4.27-1.772" />
                      </svg>
                    )}
                    {stat.icon === "center" && (
                      <svg className="w-5 h-5 text-[#cdfe71]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    )}
                    {stat.icon === "data" && (
                      <svg className="w-5 h-5 text-[#cdfe71]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                      </svg>
                    )}
                  </div>
                  <p className="text-white font-extrabold text-3xl sm:text-4xl font-[family-name:var(--font-unbounded)]">{stat.value}</p>
                  <p className="text-white font-semibold text-sm mt-1">{stat.label}</p>
                  <p className="text-white/40 text-xs mt-0.5">{stat.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CAREER TRACKS ────────────────────────────────────────────── */}
        <section className="py-20 bg-[#0d1f3c]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Track Tabs */}
            <div className="flex flex-wrap gap-2 mb-12">
              {visibleTracks.map((track, i) => (
                <button
                  key={`${track.id || "track"}-${i}`}
                  data-admin-list="tracks"
                  data-admin-list-index={i}
                  data-admin-list-field="title"
                  onClick={() => setActiveTrack(i)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    activeTrackIndex === i
                      ? "bg-[#cdfe71] text-black"
                      : "border border-white/20 text-white/60 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {trackTabLabel(track, i)}
                </button>
              ))}
              <a href="#open-roles" className="px-4 py-2 rounded-full text-sm font-medium border border-white/20 text-white/50 hover:border-white/40 hover:text-white transition-all duration-200 inline-flex items-center gap-1">
                Join the Track
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>

            {/* Active Track Content — wrapped in outer card */}
            {(() => {
              const track = visibleTracks[activeTrackIndex] ?? EMPTY_CAREER_TRACK;
              const videos = track.videos?.length ? track.videos : EMPTY_CAREER_TRACK.videos!;
              const currentVideo = videos[activeVideoIndex] ?? videos[0];
              return (
                <div className="bg-[#132644] border border-white/10 rounded-3xl p-6 sm:p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 items-start">
                    {/* Left: Info */}
                    <div>
                      <span data-admin-list-field="badge" className="inline-block px-3 py-1 rounded-full bg-[#cdfe71]/15 text-[#cdfe71] text-xs font-bold uppercase tracking-wider mb-4">
                        {track.badge}
                      </span>
                      <h3 data-admin-list-field="title" className="text-3xl sm:text-4xl font-extrabold text-white mb-3 font-[family-name:var(--font-unbounded)]">
                        {track.title}
                      </h3>
                      <p data-admin-list-field="tagline" className="text-[#cdfe71] font-semibold text-sm mb-3">{track.tagline}</p>
                      <p data-admin-list-field="description" className="text-white/60 text-sm leading-relaxed mb-8">{track.description}</p>

                      {/* Levels */}
                      <div className="space-y-3 mb-8">
                        {(track.levels ?? []).map((level, levelIndex) => (
                          <div
                            key={`${level.title || "level"}-${levelIndex}`}
                            data-admin-list-child="levels"
                            data-admin-list-child-index={levelIndex}
                            className="flex items-center justify-between border-l-2 border-[#cdfe71]/40 pl-4 py-2"
                          >
                            <div>
                              <p data-admin-list-child-field="title" className="text-white font-bold text-sm">{level.title}</p>
                              <p data-admin-list-child-field="sub" className="text-white/40 text-xs">{level.sub}</p>
                            </div>
                            <span data-admin-list-child-field="level" className="text-[#cdfe71] text-xs font-bold">{level.level}</span>
                          </div>
                        ))}
                      </div>

                      <a
                        href="#open-roles"
                        className="inline-block px-6 py-3 rounded-full border border-white text-white font-semibold text-sm hover:bg-white hover:text-[#132644] transition-all duration-300"
                      >
                        Join the Track
                      </a>
                    </div>

                    {/* Right: Video Carousel */}
                    <div>
                      <p className="text-white text-sm uppercase tracking-[2px] font-semibold mb-4">
                        Here&apos;s what you&apos;ll gain
                      </p>
                      {/* Video player */}
                      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-black">
                        <video
                          ref={videoRef}
                          key={`${activeTrackIndex}-${activeVideoIndex}`}
                          autoPlay
                          muted
                          playsInline
                          onEnded={handleVideoEnded}
                          className="w-full h-full object-cover"
                        >
                          <source src={currentVideo?.src} type="video/mp4" />
                        </video>
                        {/* Gradient overlay at bottom for text */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1b30] via-[#0c1b30]/30 to-transparent" />
                        {/* Overlay text */}
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <div className="w-8 h-8 rounded-full bg-[#cdfe71]/15 border border-[#cdfe71]/30 flex items-center justify-center mb-3">
                            <svg className="w-4 h-4 text-[#cdfe71]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                            </svg>
                          </div>
                          <h4 className="text-white font-bold text-base sm:text-lg">{currentVideo?.title}</h4>
                          <p className="text-white/60 text-xs sm:text-sm leading-relaxed mt-1">{currentVideo?.body}</p>
                        </div>
                        {/* Progress dots at top */}
                        <div className="absolute top-3 left-3 right-3 flex gap-1">
                          {videos.map((_, i) => (
                            <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i === activeVideoIndex ? "bg-[#cdfe71]" : i < activeVideoIndex ? "bg-white/40" : "bg-white/15"}`} />
                          ))}
                        </div>
                      </div>
                      {/* Dots navigation below */}
                      <div className="flex justify-center gap-2 mt-4">
                        {videos.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveVideo(i)}
                            aria-label={`Video ${i + 1}`}
                            className={`h-2.5 rounded-full transition-all duration-300 ${i === activeVideoIndex ? "w-6 bg-[#cdfe71]" : "w-2.5 bg-white/20 hover:bg-white/40"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </section>

        {/* ─── OPEN ROLES ───────────────────────────────────────────────── */}
        <section id="open-roles" className="py-20 bg-[#0d1f3c]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              className="section-title text-center mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {rolesHeadingPrefix} <span className="text-[#cdfe71]">{rolesHeadingHighlight}</span>
            </motion.h2>
            <p className="text-white/50 text-center text-sm mb-10">
              {rolesDescription}
            </p>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {ROLE_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setRoleFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    roleFilter === cat
                      ? "bg-[#cdfe71] text-black"
                      : "border border-white/20 text-white/60 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
              <span className="w-px h-6 bg-white/10 self-center mx-2" />
              {LOCATIONS.map((loc) => (
                <button
                  key={loc}
                  onClick={() => setLocationFilter(loc)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    locationFilter === loc
                      ? "bg-[#cdfe71] text-black"
                      : "border border-white/20 text-white/60 hover:text-white"
                  }`}
                >
                  {loc}
                </button>
              ))}
              <span className="text-white/30 text-xs self-center ml-2">{filteredRoles.length} roles</span>
            </div>

            {/* Role List */}
            <div className="space-y-0 border-t border-white/10">
              {filteredRoles.map((role, index) => (
                <Link
                  key={`${role.title}-${index}`}
                  data-admin-list="roles"
                  data-admin-list-index={index}
                  href={`/careers/${role.slug}`}
                  className="flex items-center justify-between py-4 border-b border-white/5 group cursor-pointer hover:bg-white/[0.02] px-4 -mx-4 transition-colors duration-200"
                >
                  <div>
                    <p data-admin-list-field="title" className="text-white font-semibold text-sm group-hover:text-[#cdfe71] transition-colors duration-200">
                      {role.title}
                    </p>
                    <p data-admin-list-field="location" className="text-white/40 text-xs mt-0.5">{role.location}</p>
                  </div>
                  <svg
                    className="w-5 h-5 text-white/20 group-hover:text-[#cdfe71] group-hover:translate-x-1 transition-all duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
              {filteredRoles.length === 0 && (
                <p className="text-white/30 text-center py-12 text-sm">No roles match your filters.</p>
              )}
            </div>
          </div>
        </section>

        {/* ─── CENTERS (reused from homepage) ───────────────────────────── */}
        <Centers previewBlockId="careers-centers" previewBlockType="CareerCenters" fallbackCenters={centers} />

        {/* ─── FROM THE TEAM (testimonials) ─────────────────────────────── */}
        <section className="py-20 bg-[#0d1f3c] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <motion.h2
              className="section-title text-center mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {storiesHeadingPrefix} <span className="text-[#cdfe71]">{storiesHeadingHighlight}</span>
            </motion.h2>
            <p className="text-white/50 text-center text-sm">
              {storiesDescription}
            </p>
          </div>

          {/* Tape-scroll marquee — constrained to max-w-7xl like Open Roles */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Left fade */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#0d1f3c] to-transparent z-10 pointer-events-none" />
            {/* Right fade */}
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#0d1f3c] to-transparent z-10 pointer-events-none" />

            <div className="flex gap-5 animate-marquee hover:[animation-play-state:paused]">
              {[...teamStories, ...teamStories, ...teamStories].map((t, i) => (
                <div
                  key={`${t.name || "story"}-${i}`}
                  data-admin-list="stories"
                  data-admin-list-index={teamStories.length ? i % teamStories.length : 0}
                  className="flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[360px] bg-[#132644]/60 border border-white/[0.06] rounded-2xl p-5 sm:p-6 flex flex-col justify-between min-h-[200px]"
                >
                  <p data-admin-list-field="quote" className="text-white/75 text-sm leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 mt-5">
                    <div className="w-9 h-9 rounded-full bg-[#cdfe71] flex items-center justify-center flex-shrink-0">
                      <span className="text-[#132644] text-[10px] font-extrabold">{t.initials}</span>
                    </div>
                    <div>
                      <p data-admin-list-field="name" className="text-white font-bold text-sm">{t.name}</p>
                      <p data-admin-list-field="role" className="text-white/40 text-xs">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WHAT YOU'RE ACTUALLY SIGNING UP FOR ──────────────────────── */}
        <section className="py-20 bg-[#0a1628]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              className="section-title text-center mb-3 font-[family-name:var(--font-unbounded)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {valuesHeadingPrefix} <span className="text-[#cdfe71] italic">{valuesHeadingHighlight}</span>
            </motion.h2>
            <p className="text-white/50 text-center text-sm mb-12">
              {valuesDescription}
            </p>

            {/* Single card slider */}
            <div className="relative">
              {/* Card */}
              <div className="bg-[#132644] border border-white/[0.08] rounded-2xl p-8 sm:p-10 min-h-[220px] flex flex-col justify-center transition-all duration-300">
                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-[#cdfe71]/10 border border-[#cdfe71]/25 flex items-center justify-center mb-5">
                  {visibleValues[activeValueIndex].icon === "wrench" && (
                    <svg className="w-5 h-5 text-[#cdfe71]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" /></svg>
                  )}
                  {visibleValues[activeValueIndex].icon === "brain" && (
                    <svg className="w-5 h-5 text-[#cdfe71]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>
                  )}
                  {visibleValues[activeValueIndex].icon === "chat" && (
                    <svg className="w-5 h-5 text-[#cdfe71]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" /></svg>
                  )}
                  {visibleValues[activeValueIndex].icon === "chart" && (
                    <svg className="w-5 h-5 text-[#cdfe71]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>
                  )}
                  {visibleValues[activeValueIndex].icon === "bolt" && (
                    <svg className="w-5 h-5 text-[#cdfe71]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
                  )}
                  {visibleValues[activeValueIndex].icon === "gamepad" && (
                    <svg className="w-5 h-5 text-[#cdfe71]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" /></svg>
                  )}
                </div>

                <h3 className="text-white font-extrabold text-xl sm:text-2xl mb-3 font-[family-name:var(--font-unbounded)]">
                  {visibleValues[activeValueIndex].title}
                </h3>
                <p className="text-white/50 text-sm sm:text-base leading-relaxed">
                  {visibleValues[activeValueIndex].body}
                </p>
              </div>

              {/* Dots navigation */}
              <div className="flex justify-center gap-2 mt-8">
                {visibleValues.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveValue(i)}
                    aria-label={`Slide ${i + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      i === activeValueIndex ? "w-6 bg-[#cdfe71]" : "w-2.5 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── CAREERS FAQ ──────────────────────────────────────────────── */}
        <section className="py-20 bg-[#0a1628]">
          {/* Horizontal divider line */}
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="border-t border-white/10" />
          </div>

          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              className="section-title text-center mb-3 font-[family-name:var(--font-unbounded)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {faqHeadingPrefix} <span className="text-[#cdfe71]">{faqHeadingHighlight}</span>
            </motion.h2>
            <p className="text-white/50 text-center text-sm mb-12">
              {faqDescription}
            </p>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={faq.question}
                  className="border-l-2 border-[#cdfe71]/40 bg-[#132644]/50 rounded-r-xl overflow-hidden transition-colors duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left"
                  >
                    <span className="text-white font-semibold text-sm">{faq.question}</span>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      openFaq === i ? "bg-[#cdfe71] rotate-45" : "bg-[#cdfe71]/20"
                    }`}>
                      <svg
                        className={`w-3.5 h-3.5 transition-colors duration-300 ${openFaq === i ? "text-black" : "text-white/60"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                  </button>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-white/60 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── DON'T SEE YOUR ROLE? SAY HELLO ANYWAY ────────────────────── */}
        <section className="py-20 bg-[#0d1f3c]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              className="section-title mb-4 font-[family-name:var(--font-unbounded)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {ctaHeadingPrefix}{" "}
              <span className="text-[#cdfe71]">{ctaHeadingHighlight}</span>
            </motion.h2>
            <p className="text-white/50 text-sm mb-8 max-w-md mx-auto">
              {ctaDescription}
            </p>
            <a
              href={`mailto:${ctaEmail}`}
              data-admin-field="email"
              className="inline-block px-8 py-3.5 rounded-full bg-white text-[#132644] font-semibold text-sm hover:bg-[#cdfe71] hover:shadow-[0_8px_25px_rgba(205,254,113,0.3)] transition-all duration-300"
            >
              {ctaLabel}
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
