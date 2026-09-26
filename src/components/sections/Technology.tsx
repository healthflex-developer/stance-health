"use client";

import { useState, useRef, useLayoutEffect, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { SwiperRef } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { TECHNOLOGIES, ASSETS } from "@/lib/constants";
import gsap from "gsap";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

export default function Technology() {
  const [tab, setTab] = useState<number | null>(null);
  const container = useRef<HTMLDivElement>(null);
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

  useLayoutEffect(() => {
    if (container.current) {
      const ctx = gsap.context(() => {
        const img = container.current!.querySelector<HTMLElement>(".s-img");
        const text = container.current!.querySelector<HTMLElement>(".con");
        const tl = gsap.timeline({});
        if (img) tl.from(img, { duration: 1, yPercent: 20, opacity: 0 });
        if (text) tl.from(text, { duration: 1, yPercent: 20, opacity: 0 }, "-=0.5");
      }, container);
      return () => ctx.revert();
    }
  }, [tab]);

  // Lock background scroll when popup is open
  useEffect(() => {
    if (tab !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [tab]);

  return (
    <>
      <section className="sec tech-sec">
        <div className="card-container">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                <motion.h3
                  className="sec-head dark"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                >
                  Technology Blended with Science
                </motion.h3>
                <motion.p
                  className="dark para sub-txt"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Data That Helps Us, Helps You
                </motion.p>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <Swiper
                  ref={sliderRef}
                  className="tech-swiper"
                  modules={[Autoplay]}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  slidesPerView={3}
                  spaceBetween={30}
                  grabCursor={true}
                  onSlideChange={onSlideChange}
                  onSwiper={onSwiperInit}
                  breakpoints={{
                    0: { slidesPerView: 1.2, spaceBetween: 14 },
                    400: { slidesPerView: 1.4, spaceBetween: 16 },
                    540: { slidesPerView: 1.8, spaceBetween: 18 },
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    768: { slidesPerView: 2.5, spaceBetween: 24 },
                    900: { slidesPerView: 3, spaceBetween: 28 },
                    1200: { slidesPerView: 3, spaceBetween: 40 },
                  }}
                >
                  {TECHNOLOGIES.map((item, index) => (
                    <SwiperSlide key={item.id} className="tech-slide">
                      <motion.div
                        className="tech-card"
                        custom={index}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-30px" }}
                        whileHover={{
                          y: -8,
                          boxShadow: "0 16px 40px rgba(0, 0, 0, 0.25)",
                        }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        onClick={() => setTab(index + 1)}
                      >
                        <div className="tech-img">
                          <Image src={item.icon} width={500} height={500} alt={item.name} />
                        </div>
                        <div className="det">
                          <h3>{item.name}</h3>
                          <p className="para">{item.description}</p>
                        </div>
                      </motion.div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-12">
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
                    <Image src={`${ASSETS}/prev.svg`} width={50} height={50} alt="Previous" />
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
                    <Image src={`${ASSETS}/next.svg`} width={50} height={50} alt="Next" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {TECHNOLOGIES.map((item, index) =>
            tab === index + 1 ? (
              <motion.div
                className="tech-popup"
                key={item.id}
                ref={container}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div className="popup-overlay" onClick={() => setTab(null)} />
                <motion.div
                  className="popup-content"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <div className="container">
                    <div className="row flex-lg-row-reverse align-items-center">
                      <div className="col-lg-6 col-12">
                        <div className="s-img">
                          <button onClick={() => setTab(null)} aria-label="Close">
                            <Image src={`${ASSETS}/close.svg`} alt="Close" width={50} height={50} />
                          </button>
                          <Image src={item.icon} alt={item.name} width={1920} height={1920} />
                        </div>
                      </div>
                      <div className="col-lg-6 col-12">
                        <div className="con">
                          <div className="con-inner">
                            <h3 className="sm-head dark">{item.name}</h3>
                            <p className="para dark">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
