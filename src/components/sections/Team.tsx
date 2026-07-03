"use client";

import { useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import type { SwiperRef } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import Image from "next/image";
import Link from "next/link";
import { TEAM } from "@/lib/constants";

export default function Team() {
  const sliderRef = useRef<SwiperRef>(null);

  const handlePrev = useCallback(() => {
    sliderRef.current?.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    sliderRef.current?.swiper.slideNext();
  }, []);

  return (
    <section className="sec test-sec">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h3 className="sec-head">Flawless Team</h3>
            <p className="para sub-txt">Experience That Matters</p>
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
                breakpoints={{
                  0: { slidesPerView: 1.3, spaceBetween: 20 },
                  640: { slidesPerView: 2, spaceBetween: 20 },
                  768: { slidesPerView: 3, spaceBetween: 30 },
                  1024: { slidesPerView: 4, spaceBetween: 40 },
                }}
              >
                {TEAM.map((member) => (
                  <SwiperSlide key={member.name}>
                    <div className="team-card">
                      <Image src={member.image} width={1500} height={1500} alt={member.name} />
                      <div className="con">
                        <div className="tp">
                          <h3>{member.name}</h3>
                          <h4>{member.role}</h4>
                        </div>
                        <p className="para">{member.bio}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="tech-nav">
                <button className="tech-prev" onClick={handlePrev} aria-label="Previous">
                  <Image src="/assets/images/prev.svg" width={50} height={50} alt="Previous" />
                </button>
                <button className="tech-next" onClick={handleNext} aria-label="Next">
                  <Image src="/assets/images/next.svg" width={50} height={50} alt="Next" />
                </button>
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
