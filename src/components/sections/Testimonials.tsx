"use client";

import { useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperRef } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { TESTIMONIALS, ASSETS } from "@/lib/constants";

export default function Testimonials() {
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
            <h3 className="sec-head">Testimonial</h3>
          </div>
          <div className="col-12">
            <Swiper
              ref={sliderRef}
              className="test-swiper"
              slidesPerView={4}
              spaceBetween={0}
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 20 },
                640: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 30 },
                1024: { slidesPerView: 3, spaceBetween: 40 },
              }}
            >
              {TESTIMONIALS.map((t) => (
                <SwiperSlide key={t.name}>
                  <div className="test-card">
                    <div className="test-pf">
                      <Image src={`${ASSETS}/quote.svg`} className="quote" alt="" width={100} height={100} />
                      <Image src={t.image} className="prof" alt={t.name} width={100} height={100} />
                    </div>
                    <div className="test-det">
                      <p className="para">&ldquo;{t.quote}&rdquo;</p>
                      <div className="test-bt">
                        <h3>{t.name}</h3>
                        <span>
                          {t.role}
                          <br />
                          {t.condition}
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="tech-nav">
              <button className="tech-prev" onClick={handlePrev} aria-label="Previous">
                <Image src={`${ASSETS}/prev.svg`} width={50} height={50} alt="Previous" />
              </button>
              <button className="tech-next" onClick={handleNext} aria-label="Next">
                <Image src={`${ASSETS}/next.svg`} width={50} height={50} alt="Next" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
