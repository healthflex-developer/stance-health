"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePreviewProps } from "@/components/preview/usePreviewDraft";
import { ASSETS, CAREER_FAQ, CAREER_VALUES, TEAM_TESTIMONIALS, VIDEO_ASSETS } from "@/lib/constants";
import { buttonDestination } from "@/lib/button-destination";
import { previewJoinedPrefix, previewList, previewString } from "@/lib/preview-draft";

const IMPACT_LOGOS = [
  "Bangalore_City_FC.webp",
  "BCCI.svg",
  "Blue_tigers.png",
  "Dream_United.png",
  "FC_Real.png",
  "images.jpg",
  "Kodagu.png",
  "Level_Pro.jpg",
  "Machaxi.webp",
  "Punjab_Kings.png",
  "RDS.png",
  "Rosh_Badminton_Academy.png",
  "RX_Cricket_Academy.png",
  "Six_Cricket.png",
  "True_Cricket.png",
].map((file) => ({ image: `${ASSETS}/careers/logos/${file}`, alt: "partner" }));

const DEFAULT_STATS = [
  { icon: "users", value: "2000+", label: "Total Users", sub: "Patients treated across all centres" },
  { icon: "athlete", value: "500+", label: "Total Athletes", sub: "Professional & amateur athletes trained" },
  { icon: "center", value: "5", label: "Active Centres", sub: "Across Bengaluru" },
  { icon: "data", value: "6", label: "Data Systems", sub: "VALD, Output Sports, ForceDecks & more" },
];

const DEFAULT_TRACKS = [
  {
    id: "snc",
    tabLabel: "Strength & Conditioning",
    badge: "PERFORMANCE TRACK",
    title: "STRENGTH & CONDITIONING",
    tagline: "Become the coach athletes ask for by name.",
    description: "Instead of counting sessions, you'll learn how elite performance systems are designed, challenged and continuously refined.",
    joinLabel: "Join the Track",
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
    tabLabel: "Sports Physiotherapy",
    badge: "CLINICAL TRACK",
    title: "SPORTS PHYSIOTHERAPY",
    tagline: "Treat the athlete, not just the injury.",
    description: "Work with cutting-edge diagnostic tools, evidence-based protocols, and a multi-disciplinary team that elevates your clinical reasoning every day.",
    joinLabel: "Join the Track",
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

const DEFAULT_ROLES = [
  { title: "Senior Strength & Conditioning Coach", location: "Bengaluru (HSR · Whitefield · Indiranagar)", category: "Clinical & Performance", slug: "senior-sc" },
  { title: "Junior Strength & Conditioning Coach", location: "Bengaluru (HSR · Whitefield · Indiranagar)", category: "Clinical & Performance", slug: "junior-sc" },
  { title: "Strength & Conditioning Intern", location: "Bengaluru (HSR · Whitefield · Indiranagar)", category: "Clinical & Performance", slug: "sc-intern" },
  { title: "Senior / In-charge Physiotherapist — MSK & Sports", location: "Bengaluru", category: "Clinical & Performance", slug: "senior-physio" },
  { title: "Junior Sports Physiotherapist", location: "Bengaluru (HSR · Whitefield)", category: "Clinical & Performance", slug: "junior-physio" },
  { title: "Physiotherapy Intern", location: "Bengaluru (All centres)", category: "Clinical & Performance", slug: "physio-intern" },
  { title: "Patient Care Coordinator", location: "Bengaluru (Indiranagar)", category: "Patient Care & Operations", slug: "patient-care" },
  { title: "Operations Associate", location: "Bengaluru", category: "Corporate & Leadership", slug: "operations" },
];

const ROLE_CATEGORIES = ["All Roles", "Clinical & Performance", "Patient Care & Operations", "Corporate & Leadership"];
const LOCATIONS = ["All locations", "HSR", "Whitefield", "Indiranagar", "JP Nagar"];

function isStill(src: string) {
  if (/\.(mp4|webm|mov|m4v)(\?|$)/i.test(src)) return false;
  return src.startsWith("/placeholders/") || /\.(svg|png|jpe?g|webp|gif|avif)(\?|$)/i.test(src);
}

function chosenMedia(value: unknown, fallback: string) {
  const explicit = textOf(value);
  if (!explicit) return fallback;
  if (/^https?:\/\//.test(explicit) || explicit.startsWith("/")) return explicit;
  return "/placeholders/image.svg";
}

function textOf(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function rowsOf(value: unknown): Record<string, unknown>[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object" && !Array.isArray(item));
}

function StatIcon({ name }: { name: string }) {
  const common = "w-5 h-5 text-[#cdfe71]";
  if (name === "users") {
    return <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-1.997m0 0A8.96 8.96 0 0112 15a8.966 8.966 0 00-5.982 2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
  }
  if (name === "athlete") {
    return <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.016 6.016 0 01-4.27 1.772 6.016 6.016 0 01-4.27-1.772" /></svg>;
  }
  if (name === "center") {
    return <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>;
  }
  return <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>;
}

function ValueIcon({ name }: { name: string }) {
  const common = "w-5 h-5 text-[#cdfe71]";
  if (name === "wrench") return <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" /></svg>;
  if (name === "brain") return <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>;
  if (name === "chat") return <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" /></svg>;
  if (name === "chart") return <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>;
  if (name === "bolt") return <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>;
  if (name === "gamepad") return <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" /></svg>;
  return <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>;
}

export function CareersHero({ blockId }: { blockId?: string }) {
  const hero = usePreviewProps("CareersHero");
  const prefix = previewJoinedPrefix(hero?.headlinePrefix, "Where your career");
  const highlightOne = previewString(hero?.highlightOne, "actually");
  const highlightTwo = previewString(hero?.highlightTwo, "accelerates.");
  const paragraphOne = previewString(hero?.paragraphOne, "Most S&C coaches and physios in India spend years waiting for elite exposure — a national athlete on their table, real data instead of guesswork, a mentor worth learning from.");
  const paragraphTwo = previewString(hero?.paragraphTwo, "At Stance, that's the job from day one.");
  const ctaLabel = previewString(hero?.ctaLabel, "See Open Roles");
  const ctaHref = previewString(hero?.ctaHref, "#open-roles");
  const chosen = chosenMedia(hero?.videoUrl, `${VIDEO_ASSETS}/careers/hero.mp4`);
  const videoUrl = chosen === "/placeholders/image.svg" ? "/placeholders/video.mp4" : chosen;

  return (
    <section className="relative min-h-[calc(100vh-12rem)] flex flex-col bg-[#0d1f3c] overflow-hidden" data-preview-block="CareersHero" {...(blockId ? { "data-admin-block-id": blockId } : {})}>
      <div className="absolute inset-0">
        {isStill(videoUrl) ? (
          <img src={videoUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source src={videoUrl} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1f3c]/30 via-[#0d1f3c]/60 to-[#0d1f3c]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1f3c]/70 via-[#0d1f3c]/40 to-transparent" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pt-40 w-full flex-1 flex items-center">
        <div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-2xl font-[family-name:var(--font-unbounded)]">
            {prefix} <span className="text-[#cdfe71]">{highlightOne}</span> <span className="text-[#cdfe71]">{highlightTwo}</span>
          </h1>
          <p className="text-white/60 text-base sm:text-lg max-w-lg mt-6 leading-relaxed">{paragraphOne}</p>
          <p className="text-white/50 text-sm sm:text-base max-w-lg mt-3">{paragraphTwo}</p>
          <div className="mt-8">
            <a href={ctaHref} data-preview-field="ctaLabel" className="inline-block px-6 py-3 rounded-full border border-white text-white font-semibold text-sm hover:bg-white hover:text-[#132644] transition-all duration-300">
              {ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CareersImpact({ blockId }: { blockId?: string }) {
  const impact = usePreviewProps("CareersImpact");
  const impactHeading = previewString(impact?.impactHeading, "Where our team has made an impact");
  const seconds = previewString(impact?.marqueeSeconds, "30");
  const gap = textOf(impact?.logoGap);
  const logos = previewList(impact?.logos, IMPACT_LOGOS);
  const ribbon = [...logos, ...logos];

  return (
    <section className="relative w-full bg-[#0d1f3c] overflow-hidden pb-8 pt-4" data-preview-block="CareersImpact" {...(blockId ? { "data-admin-block-id": blockId } : {})}>
      <hr className="border-0 border-t border-white/[0.04] mb-5" />
      <p className="text-center text-white/30 text-xs uppercase tracking-[3px] mb-6">{impactHeading}</p>
      <div className="overflow-hidden">
        <div
          className={`flex animate-marquee ${gap ? "" : "gap-20"}`}
          style={{ animationDuration: `${Number(seconds) > 0 ? seconds : 30}s`, gap: gap ? `${gap}px` : undefined }}
        >
          {ribbon.map((logo, index) => {
            const sourceIndex = index % logos.length;
            const src = chosenMedia(logo.image, IMPACT_LOGOS[sourceIndex]?.image ?? "/placeholders/image.svg");
            return (
              <div key={`${src}-${index}`} data-preview-field={`logos[${index % logos.length}].alt`} className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 relative opacity-70 hover:opacity-100 transition-opacity duration-300">
                <Image src={src} alt={previewString(logo.alt, "partner")} fill className="object-contain" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function CareerStatistics() {
  const draft = usePreviewProps("CareerStatistics");
  const prefix = previewJoinedPrefix(draft?.headingPrefix, "Your Next");
  const highlight = previewString(draft?.headingHighlight, "Chapter");
  const description = previewString(draft?.description, "At Stance, you won't just gain experience. You'll develop under people who've built systems, coached elite athletes and continue raising the standard of sports science every single day.");
  const stats = previewList(draft?.stats, DEFAULT_STATS);
  return (
    <section className="py-20 bg-[#0d1f3c]" data-preview-block="CareerStatistics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title mb-4">{prefix} <span className="text-[#cdfe71]">{highlight}</span></h2>
        <p className="text-white/50 text-base sm:text-lg max-w-xl mb-12">{description}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={`${previewString(stat.label, "stat")}-${index}`} data-preview-field={`stats[${index}].value`} className="bg-[#132644] border border-white/8 rounded-2xl p-6 hover:border-[#cdfe71]/20 transition-colors duration-300">
              <div className="w-10 h-10 rounded-full bg-[#cdfe71]/10 border border-[#cdfe71]/20 flex items-center justify-center mb-3">
                <StatIcon name={previewString(stat.icon, "data")} />
              </div>
              <p className="text-white font-extrabold text-3xl sm:text-4xl font-[family-name:var(--font-unbounded)]">{previewString(stat.value, "")}</p>
              <p className="text-white font-semibold text-sm mt-1">{previewString(stat.label, "")}</p>
              <p className="text-white/40 text-xs mt-0.5">{previewString(stat.sub, "")}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CareerTracks() {
  const draft = usePreviewProps("CareerTracks");
  const tracks = previewList(draft?.tracks, DEFAULT_TRACKS);
  const [activeTrack, setActiveTrack] = useState(0);
  const [activeVideo, setActiveVideo] = useState(0);
  const safeTrack = Math.min(activeTrack, Math.max(tracks.length - 1, 0));
  const track = tracks[safeTrack];
  const videos = rowsOf(track?.videos);
  const levels = rowsOf(track?.levels);
  const videoIndex = videos.length ? activeVideo % videos.length : 0;
  const current = videos[videoIndex];

  useEffect(() => { setActiveVideo(0); }, [safeTrack]);
  useEffect(() => {
    const onTrack = (event: Event) => {
      const index = (event as CustomEvent<number>).detail;
      if (typeof index === "number") setActiveTrack(index);
    };
    window.addEventListener("stance-career-track", onTrack);
    return () => window.removeEventListener("stance-career-track", onTrack);
  }, []);

  if (!track) return null;
  const tabLabel = (item: Record<string, unknown>, index: number) => {
    const id = textOf(item.id);
    return previewString(item.tabLabel, id === "snc" ? "Strength & Conditioning" : id === "physio" ? "Sports Physiotherapy" : previewString(item.title, `Track ${index + 1}`));
  };
  const videoSrc = chosenMedia(current?.src, "");

  return (
    <section className="py-20 bg-[#0d1f3c]" data-preview-block="CareerTracks">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2 mb-12">
          {tracks.map((item, index) => (
            <button key={`${textOf(item.id)}-${index}`} type="button" data-preview-field={`tracks[${index}].title`} onClick={() => setActiveTrack(index)} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${safeTrack === index ? "bg-[#cdfe71] text-black" : "border border-white/20 text-white/60 hover:border-white/40 hover:text-white"}`}>
              {tabLabel(item, index)}
            </button>
          ))}
          <a href="#open-roles" className="px-4 py-2 rounded-full text-sm font-medium border border-white/20 text-white/50 hover:border-white/40 hover:text-white transition-all duration-200 inline-flex items-center gap-1">
            Others
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </a>
        </div>
        <div className="bg-[#132644] border border-white/10 rounded-3xl p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 items-start">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-[#cdfe71]/15 text-[#cdfe71] text-xs font-bold uppercase tracking-wider mb-4">{previewString(track.badge, "")}</span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 font-[family-name:var(--font-unbounded)]">{previewString(track.title, "")}</h3>
              <p className="text-[#cdfe71] font-semibold text-sm mb-3">{previewString(track.tagline, "")}</p>
              <p className="text-white/60 text-sm leading-relaxed mb-8">{previewString(track.description, "")}</p>
              <div className="space-y-3 mb-8">
                {levels.map((level, index) => (
                  <div key={`${textOf(level.title)}-${index}`} className="flex items-center justify-between border-l-2 border-[#cdfe71]/40 pl-4 py-2">
                    <div>
                      <p className="text-white font-bold text-sm">{previewString(level.title, "")}</p>
                      <p className="text-white/40 text-xs">{previewString(level.sub, "")}</p>
                    </div>
                    <span className="text-[#cdfe71] text-xs font-bold">{previewString(level.level, "")}</span>
                  </div>
                ))}
              </div>
              <a href="#open-roles" className="inline-block px-6 py-3 rounded-full border border-white text-white font-semibold text-sm hover:bg-white hover:text-[#132644] transition-all duration-300">
                {previewString(track.joinLabel, "Join the Track")}
              </a>
            </div>
            <div>
              <p className="text-white text-sm uppercase tracking-[2px] font-semibold mb-4">Here&apos;s what you&apos;ll gain</p>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-black">
                {videoSrc && !isStill(videoSrc) ? (
                  <video key={`${safeTrack}-${videoIndex}`} autoPlay muted playsInline onEnded={() => setActiveVideo((prev) => (prev + 1) % videos.length)} className="w-full h-full object-cover">
                    <source src={videoSrc} type="video/mp4" />
                  </video>
                ) : videoSrc ? (
                  <img src={videoSrc} alt="" className="w-full h-full object-cover" />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1b30] via-[#0c1b30]/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="w-8 h-8 rounded-full bg-[#cdfe71]/15 border border-[#cdfe71]/30 flex items-center justify-center mb-3">
                    <StatIcon name="data" />
                  </div>
                  <h4 className="text-white font-bold text-base sm:text-lg">{previewString(current?.title, "")}</h4>
                  <p className="text-white/60 text-xs sm:text-sm leading-relaxed mt-1">{previewString(current?.body, "")}</p>
                </div>
                <div className="absolute top-3 left-3 right-3 flex gap-1">
                  {videos.map((_, index) => (
                    <div key={index} className={`h-1 flex-1 rounded-full transition-all duration-300 ${index === videoIndex ? "bg-[#cdfe71]" : index < videoIndex ? "bg-white/40" : "bg-white/15"}`} />
                  ))}
                </div>
              </div>
              <div className="flex justify-center gap-2 mt-4">
                {videos.map((_, index) => (
                  <button key={index} type="button" onClick={() => setActiveVideo(index)} aria-label={`Video ${index + 1}`} className={`h-2.5 rounded-full transition-all duration-300 ${index === videoIndex ? "w-6 bg-[#cdfe71]" : "w-2.5 bg-white/20 hover:bg-white/40"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CareerOpenRoles() {
  const draft = usePreviewProps("CareerOpenRoles");
  const prefix = previewJoinedPrefix(draft?.headingPrefix, "Open");
  const highlight = previewString(draft?.headingHighlight, "Roles");
  const description = previewString(draft?.description, "Filter by domain and location. Every role links to the full brief and an inline application.");
  const roles = previewList(draft?.roles, DEFAULT_ROLES);
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [locationFilter, setLocationFilter] = useState("All locations");
  const categories = ROLE_CATEGORIES.concat(roles.map((role) => textOf(role.category)).filter((category) => category && !ROLE_CATEGORIES.includes(category)));
  const filtered = roles.filter((role) => {
    const category = textOf(role.category);
    const location = textOf(role.location);
    return (roleFilter === "All Roles" || category === roleFilter) && (locationFilter === "All locations" || location.includes(locationFilter));
  });
  return (
    <section id="open-roles" className="py-20 bg-[#0d1f3c]" data-preview-block="CareerOpenRoles">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-center mb-3">{prefix} <span className="text-[#cdfe71]">{highlight}</span></h2>
        <p className="text-white/50 text-center text-sm mb-10">{description}</p>
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((category) => (
            <button key={category} type="button" onClick={() => setRoleFilter(category)} className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${roleFilter === category ? "bg-[#cdfe71] text-black" : "border border-white/20 text-white/60 hover:text-white"}`}>{category}</button>
          ))}
          <span className="w-px h-6 bg-white/10 self-center mx-2" />
          {LOCATIONS.map((location) => (
            <button key={location} type="button" onClick={() => setLocationFilter(location)} className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${locationFilter === location ? "bg-[#cdfe71] text-black" : "border border-white/20 text-white/60 hover:text-white"}`}>{location}</button>
          ))}
          <span className="text-white/30 text-xs self-center ml-2">{filtered.length} roles</span>
        </div>
        <div className="space-y-0 border-t border-white/10">
          {filtered.map((role, index) => (
            <Link key={`${textOf(role.slug)}-${index}`} href={textOf(role.slug) ? `/careers/${textOf(role.slug)}` : "#"} data-preview-field={`roles[${index}].title`} className="flex items-center justify-between py-4 border-b border-white/5 group cursor-pointer hover:bg-white/[0.02] px-4 -mx-4 transition-colors duration-200">
              <div>
                <p className="text-white font-semibold text-sm group-hover:text-[#cdfe71] transition-colors duration-200">{previewString(role.title, "")}</p>
                <p className="text-white/40 text-xs mt-0.5">{previewString(role.location, "")}</p>
              </div>
              <svg className="w-5 h-5 text-white/20 group-hover:text-[#cdfe71] group-hover:translate-x-1 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          ))}
          {filtered.length === 0 && <p className="text-white/30 text-center py-12 text-sm">No roles match your filters.</p>}
        </div>
      </div>
    </section>
  );
}

export function CareerTeamStories() {
  const draft = usePreviewProps("CareerTeamStories");
  const prefix = previewJoinedPrefix(draft?.headingPrefix, "From the");
  const highlight = previewString(draft?.headingHighlight, "Team");
  const description = previewString(draft?.description, "What it's like to build a career at Stance.");
  const stories = previewList(draft?.stories, TEAM_TESTIMONIALS);
  const ribbon = [...stories, ...stories, ...stories];
  return (
    <section className="py-20 bg-[#0d1f3c] overflow-hidden" data-preview-block="CareerTeamStories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="section-title text-center mb-3">{prefix} <span className="text-[#cdfe71]">{highlight}</span></h2>
        <p className="text-white/50 text-center text-sm">{description}</p>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#0d1f3c] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#0d1f3c] to-transparent z-10 pointer-events-none" />
        <div className="flex gap-5 animate-marquee hover:[animation-play-state:paused]">
          {ribbon.map((story, index) => (
            <div key={`${previewString(story.name, "story")}-${index}`} data-preview-field={`stories[${index % stories.length}].name`} className="flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[360px] bg-[#132644]/60 border border-white/[0.06] rounded-2xl p-5 sm:p-6 flex flex-col justify-between min-h-[200px]">
              <p className="text-white/75 text-sm leading-relaxed">&ldquo;{previewString(story.quote, "")}&rdquo;</p>
              <div className="flex items-center gap-3 mt-5">
                <div className="w-9 h-9 rounded-full bg-[#cdfe71] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#132644] text-[10px] font-extrabold">{previewString(story.initials, "")}</span>
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{previewString(story.name, "")}</p>
                  <p className="text-white/40 text-xs">{previewString(story.role, "")}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CareerValues() {
  const draft = usePreviewProps("CareerValues");
  const prefix = previewJoinedPrefix(draft?.headingPrefix, "What you're actually");
  const highlight = previewString(draft?.headingHighlight, "signing up for");
  const description = previewString(draft?.description, "We don't run on hierarchy. We run on reasoning, speed, and people who'd rather fix something than flag it.");
  const values = previewList(draft?.values, CAREER_VALUES.map((value) => ({ icon: value.icon, title: value.title, body: value.body })));
  const [active, setActive] = useState(0);
  useEffect(() => {
    const onValue = (event: Event) => {
      const index = (event as CustomEvent<number>).detail;
      if (typeof index === "number") setActive(index);
    };
    window.addEventListener("stance-career-value", onValue);
    return () => window.removeEventListener("stance-career-value", onValue);
  }, []);
  const item = values[Math.min(active, Math.max(values.length - 1, 0))];
  if (!item) return null;
  return (
    <section className="py-20 bg-[#0a1628]" data-preview-block="CareerValues">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-center mb-3 font-[family-name:var(--font-unbounded)]">{prefix} <span className="text-[#cdfe71] italic">{highlight}</span></h2>
        <p className="text-white/50 text-center text-sm mb-12">{description}</p>
        <div className="bg-[#132644] border border-white/[0.08] rounded-2xl p-8 sm:p-10 min-h-[220px] flex flex-col justify-center" data-preview-field={`values[${Math.min(active, Math.max(values.length - 1, 0))}].title`}>
          <div className="w-12 h-12 rounded-full bg-[#cdfe71]/10 border border-[#cdfe71]/25 flex items-center justify-center mb-5">
            <ValueIcon name={previewString(item.icon, "bolt")} />
          </div>
          <h3 className="text-white font-extrabold text-xl sm:text-2xl mb-3 font-[family-name:var(--font-unbounded)]">{previewString(item.title, "")}</h3>
          <p className="text-white/50 text-sm sm:text-base leading-relaxed">{previewString(item.body, "")}</p>
        </div>
        <div className="flex justify-center gap-2 mt-8">
          {values.map((_, index) => (
            <button key={index} type="button" onClick={() => setActive(index)} aria-label={`Slide ${index + 1}`} className={`h-2.5 rounded-full transition-all duration-300 ${index === active ? "w-6 bg-[#cdfe71]" : "w-2.5 bg-white/20 hover:bg-white/40"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function CareerFAQ() {
  const draft = usePreviewProps("CareerFAQ");
  const prefix = previewJoinedPrefix(draft?.headingPrefix, "Careers");
  const highlight = previewString(draft?.headingHighlight, "FAQ");
  const description = previewString(draft?.description, "Common questions about applying, interviews and internships at Stance.");
  const faqs = previewList(draft?.faqs, CAREER_FAQ.map((faq) => ({ question: faq.question, answer: faq.answer })));
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    const onFaq = (event: Event) => {
      const index = (event as CustomEvent<number>).detail;
      if (typeof index === "number") setOpen(index);
    };
    window.addEventListener("stance-career-faq", onFaq);
    return () => window.removeEventListener("stance-career-faq", onFaq);
  }, []);
  return (
    <section className="py-20 bg-[#0a1628]" data-preview-block="CareerFAQ">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"><div className="border-t border-white/10" /></div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-center mb-3 font-[family-name:var(--font-unbounded)]">{prefix} <span className="text-[#cdfe71]">{highlight}</span></h2>
        <p className="text-white/50 text-center text-sm mb-12">{description}</p>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={`${previewString(faq.question, "faq")}-${index}`} className="border-l-2 border-[#cdfe71]/40 bg-[#132644]/50 rounded-r-xl overflow-hidden">
              <button type="button" data-preview-field={`faqs[${index}].question`} onClick={() => setOpen(open === index ? null : index)} className="w-full flex items-center justify-between px-6 py-5 text-left">
                <span className="text-white font-semibold text-sm">{previewString(faq.question, "")}</span>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${open === index ? "bg-[#cdfe71] rotate-45" : "bg-[#cdfe71]/20"}`}>
                  <svg className={`w-3.5 h-3.5 ${open === index ? "text-black" : "text-white/60"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                </div>
              </button>
              {open === index && <p className="px-6 pb-5 text-white/60 text-sm leading-relaxed">{previewString(faq.answer, "")}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CareersCTA() {
  const draft = usePreviewProps("CareersCTA");
  const prefix = previewJoinedPrefix(draft?.headingPrefix, "Don't see your role?");
  const highlight = previewString(draft?.headingHighlight, "Say hello anyway.");
  const description = previewString(draft?.description, "We're always looking for people who care about the craft. Send us a note and we'll route it to the right team.");
  const email = previewString(draft?.email, "careers@stance.health");
  const ctaLabel = previewString(draft?.ctaLabel, `Email ${email}`);
  const ctaHref = buttonDestination(draft?.ctaHref) ?? `mailto:${email}`;
  return (
    <section className="py-20 bg-[#0d1f3c]" data-preview-block="CareersCTA">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="section-title mb-4 font-[family-name:var(--font-unbounded)]">{prefix} <span className="text-[#cdfe71]">{highlight}</span></h2>
        <p className="text-white/50 text-sm mb-8 max-w-md mx-auto">{description}</p>
        <a href={ctaHref} data-preview-field="ctaLabel" target={ctaHref.startsWith("http") ? "_blank" : undefined} rel={ctaHref.startsWith("http") ? "noopener noreferrer" : undefined} className="inline-block px-8 py-3.5 rounded-full bg-white text-[#132644] font-semibold text-sm hover:bg-[#cdfe71] hover:shadow-[0_8px_25px_rgba(205,254,113,0.3)] transition-all duration-300">
          {ctaLabel}
        </a>
      </div>
    </section>
  );
}
