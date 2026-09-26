"use client";

import { useRef, useCallback, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Autoplay, FreeMode } from "swiper/modules";
import type { SwiperRef } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/scrollbar";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { TEAM, ASSETS } from "@/lib/constants";
import { previewList, previewText, useAdminPreviewBlock, type AdminPreviewBlock } from "@/components/PreviewDraft";
import { usePublishedBlock } from "@/components/PublishedContent";
import { applyAssetMeta, assetAlt } from "@/lib/asset-label";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: [0, 0, 0.58, 1] as const },
  }),
};

export default function Team({ previewBlock }: { previewBlock?: AdminPreviewBlock | null } = {}) {
  const listened = useAdminPreviewBlock("team", "Team");
  const draft = previewBlock !== undefined ? previewBlock : listened;
  const published = usePublishedBlock("team");
  const members = applyAssetMeta(previewList(draft, "members", TEAM), published?.props?.members, ["image"]).map((member, index) => ({
    ...member,
    image: member.image || "",
    name: member.name || `Team member ${index + 1}`,
    role: member.role || "Add role",
    experience: member.experience || "Add experience",
    bio: member.bio || "Add team member bio",
  }));
  const heading = previewText(draft, "heading", "Flawless Team") || "Flawless Team";
  const subtext = previewText(draft, "subtext", "Experience That Matters") || "Experience That Matters";
  const slideKey = members.map((member) => `${member.name}|${member.role}|${member.bio}|${member.image}`).join(";");
  const sliderRef = useRef<SwiperRef>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handlePrev = useCallback(() => sliderRef.current?.swiper.slidePrev(), []);
  const handleNext = useCallback(() => sliderRef.current?.swiper.slideNext(), []);
  const onSlideChange = useCallback((swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }, []);
  const onSwiperInit = useCallback((swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }, []);

  return (
    <section className="sec test-sec team-sec-wrap">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <motion.h3
              className="sec-head"
              data-admin-field="heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              {heading}
            </motion.h3>
            <motion.p
              data-admin-field="subtext"
              className="para sub-txt"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {subtext}
            </motion.p>
          </div>
          <div className="col-12">
            <div
              className="team-slider"
              onMouseEnter={() => sliderRef.current?.swiper.autoplay.stop()}
              onMouseLeave={() => sliderRef.current?.swiper.autoplay.start()}
            >
              <Swiper
                key={slideKey}
                ref={sliderRef}
                scrollbar={{ hide: false, draggable: true }}
                className="team-swiper"
                modules={[Scrollbar, Autoplay, FreeMode]}
                slidesPerView={4}
                spaceBetween={0}
                grabCursor
                loop
                speed={4000}
                autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
                freeMode
                touchEventsTarget="container"
                threshold={5}
                onSlideChange={onSlideChange}
                onSwiper={onSwiperInit}
                breakpoints={{
                  0: { slidesPerView: 1.15, spaceBetween: 8 },
                  400: { slidesPerView: 1.3, spaceBetween: 10 },
                  540: { slidesPerView: 1.8, spaceBetween: 12 },
                  640: { slidesPerView: 2, spaceBetween: 14 },
                  768: { slidesPerView: 2.5, spaceBetween: 16 },
                  900: { slidesPerView: 3, spaceBetween: 18 },
                  1024: { slidesPerView: 3.5, spaceBetween: 20 },
                  1200: { slidesPerView: 4, spaceBetween: 24 },
                }}
              >
                {members.map((member, index) => (
                  <SwiperSlide
                    key={`${member.name}-${index}`}
                    data-admin-list="members"
                    data-admin-list-index={index}
                  >
                    <motion.div
                      className="team-card"
                      custom={index}
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-30px" }}
                      whileHover={{ scale: 1.03, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)" }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <motion.div className="team-card-img" whileHover={{ scale: 1.08 }} transition={{ duration: 0.4, ease: "easeOut" }}>
                      {member.image ? (
                        <Image src={member.image} width={1500} height={1500} alt={assetAlt(member, "image", member.name)} data-admin-list-field="image" />
                      ) : (
                        <div data-admin-list-field="image" className="w-full h-full bg-[#3a5070]" aria-label="Team photo placeholder" />
                      )}
                      </motion.div>
                      <div className="con">
                        <div className="tp">
                          <h3 className="pb-4" data-admin-list-field="name">{member.name}</h3>
                          <h4 data-admin-list-field="role">{member.role}</h4>
                          {member.experience && <p className="text-xs text-white/60" data-admin-list-field="experience">{member.experience}</p>}
                        </div>
                        <p className="para" data-admin-list-field="bio">{member.bio}</p>
                      </div>
                      <motion.div className="team-card-overlay" initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.3 }} />
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="tech-nav">
                <motion.button
                  className={`tech-prev ${isBeginning ? "nav-disabled" : ""}`}
                  onClick={handlePrev}
                  aria-label="Previous"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Image src={`${ASSETS}/prev.svg`} width={50} height={50} alt="Previous" />
                </motion.button>
                <motion.button
                  className={`tech-next ${isEnd ? "nav-disabled" : ""}`}
                  onClick={handleNext}
                  aria-label="Next"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Image src={`${ASSETS}/next.svg`} width={50} height={50} alt="Next" />
                </motion.button>
              </div>
            </div>
            <Link href="/about" className="main-btn center hover-glow">
              <span>Explore Now</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
