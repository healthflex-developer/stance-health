"use client";

import { useRef, useCallback, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import type { SwiperRef } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/scrollbar";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { TEAM } from "@/lib/constants";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: [0, 0, 0.58, 1] as const,
    },
  }),
};

export default function Team() {
  const sliderRef = useRef<SwiperRef>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handlePrev = useCallback(() => {
    sliderRef.current?.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    sliderRef.current?.swiper.slideNext();
  }, []);

  const onSlideChange = useCallback((swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }, []);

  const onSwiperInit = useCallback((swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }, []);

  return (
    <section className="sec test-sec">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <motion.h3
              className="sec-head"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              Flawless Team
            </motion.h3>
            <motion.p
              className="para sub-txt"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Experience That Matters
            </motion.p>
          </div>
          <div className="col-12">
            <div className="team-slider">
              <Swiper
                ref={sliderRef}
                scrollbar={{ hide: false, draggable: true }}
                className="team-swiper"
                modules={[Scrollbar]}
                slidesPerView={4}
                spaceBetween={0}
                grabCursor={true}
                touchEventsTarget="container"
                threshold={5}
                onSlideChange={onSlideChange}
                onSwiper={onSwiperInit}
                breakpoints={{
                  0: { slidesPerView: 1.15, spaceBetween: 12 },
                  400: { slidesPerView: 1.3, spaceBetween: 16 },
                  540: { slidesPerView: 1.8, spaceBetween: 18 },
                  640: { slidesPerView: 2, spaceBetween: 20 },
                  768: { slidesPerView: 2.5, spaceBetween: 24 },
                  900: { slidesPerView: 3, spaceBetween: 28 },
                  1024: { slidesPerView: 3.5, spaceBetween: 32 },
                  1200: { slidesPerView: 4, spaceBetween: 40 },
                }}
              >
                {TEAM.map((member, index) => (
                  <SwiperSlide key={member.name}>
                    <motion.div
                      className="team-card"
                      custom={index}
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-30px" }}
                      whileHover={{
                        scale: 1.03,
                        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <motion.div
                        className="team-card-img"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <Image
                          src={member.image}
                          width={1500}
                          height={1500}
                          alt={member.name}
                        />
                      </motion.div>
                      <div className="con">
                        <div className="tp">
                          <h3>{member.name}</h3>
                          <h4>{member.role}</h4>
                        </div>
                        <p className="para">{member.bio}</p>
                      </div>
                      <motion.div
                        className="team-card-overlay"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="tech-nav">
                <motion.button
                  className={`tech-prev ${isBeginning ? "nav-disabled" : ""}`}
                  onClick={handlePrev}
                  aria-label="Previous"
                  disabled={isBeginning}
                  whileHover={!isBeginning ? { scale: 1.15 } : {}}
                  whileTap={!isBeginning ? { scale: 0.9 } : {}}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Image
                    src="/assets/images/prev.svg"
                    width={50}
                    height={50}
                    alt="Previous"
                  />
                </motion.button>
                <motion.button
                  className={`tech-next ${isEnd ? "nav-disabled" : ""}`}
                  onClick={handleNext}
                  aria-label="Next"
                  disabled={isEnd}
                  whileHover={!isEnd ? { scale: 1.15 } : {}}
                  whileTap={!isEnd ? { scale: 0.9 } : {}}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Image
                    src="/assets/images/next.svg"
                    width={50}
                    height={50}
                    alt="Next"
                  />
                </motion.button>
              </div>
            </div>
            <Link href="/about" className="main-btn center">
              <span>Explore Now</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
