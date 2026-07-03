"use client";

import { useState, useRef, useLayoutEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { SwiperRef } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { TECHNOLOGIES } from "@/lib/constants";
import gsap from "gsap";

export default function Technology() {
  const [tab, setTab] = useState<number | null>(null);
  const container = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<SwiperRef>(null);

  const handlePrev = useCallback(() => {
    sliderRef.current?.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    sliderRef.current?.swiper.slideNext();
  }, []);

  useLayoutEffect(() => {
    if (container.current) {
      let ctx = gsap.context(() => {
        const img = container.current!.querySelector<HTMLElement>(".s-img");
        const text = container.current!.querySelector<HTMLElement>(".con");
        const tl = gsap.timeline({});
        if (img) tl.from(img, { duration: 1, yPercent: 20, opacity: 0 });
        if (text) tl.from(text, { duration: 1, yPercent: 20, opacity: 0 }, "-=0.5");
      }, container);
      return () => ctx.revert();
    }
  }, [tab]);

  return (
    <>
      <section className="sec tech-sec">
        <div className="card-container">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                <h3 className="sec-head dark">Technology Blended with Science</h3>
                <p className="dark para sub-txt">Data That Helps Us, Helps You</p>
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
                  slidesPerView={4}
                  spaceBetween={0}
                  breakpoints={{
                    0: { slidesPerView: 1.5, spaceBetween: 20 },
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    768: { slidesPerView: 3, spaceBetween: 30 },
                    1024: { slidesPerView: 3, spaceBetween: 40 },
                  }}
                >
                  {TECHNOLOGIES.map((item, index) => (
                    <SwiperSlide key={item.id}>
                      <div className="tech-card" onClick={() => setTab(index + 1)}>
                        <div className="tech-img">
                          <Image src={item.icon} width={500} height={500} alt={item.name} />
                        </div>
                        <div className="det">
                          <h3>{item.name}</h3>
                          <p className="para">{item.description}</p>
                        </div>
                      </div>
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
                  <button className="tech-prev" onClick={handlePrev} aria-label="Previous">
                    <Image src="/assets/images/prev.svg" width={50} height={50} alt="Previous" />
                  </button>
                  <button className="tech-next" onClick={handleNext} aria-label="Next">
                    <Image src="/assets/images/next.svg" width={50} height={50} alt="Next" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {TECHNOLOGIES.map((item, index) =>
          tab === index + 1 ? (
            <div className="tech-popup" key={item.id} ref={container}>
              <div className="popup-overlay" onClick={() => setTab(null)} />
              <div className="popup-content">
                <div className="container">
                  <div className="row flex-lg-row-reverse align-items-center">
                    <div className="col-lg-6 col-12">
                      <div className="s-img">
                        <button onClick={() => setTab(null)} aria-label="Close">
                          <Image src="/assets/images/close.svg" alt="Close" width={50} height={50} />
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
              </div>
            </div>
          ) : null
        )}
      </section>
    </>
  );
}
