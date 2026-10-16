"use client";

import { useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperRef } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { TESTIMONIALS, ASSETS } from "@/lib/constants";
import { previewList, previewText, useAdminPreviewBlock, type AdminPreviewBlock } from "@/components/PreviewDraft";
import { usePublishedBlock } from "@/components/PublishedContent";
import { applyAssetMeta, assetAlt } from "@/lib/asset-label";

export default function Testimonials({ previewBlock }: { previewBlock?: AdminPreviewBlock | null } = {}) {
  const listened = useAdminPreviewBlock("testimonials", "Testimonials");
  const draft = previewBlock !== undefined ? previewBlock : listened;
  const published = usePublishedBlock("testimonials");
  const testimonials = applyAssetMeta(previewList(draft, "items", TESTIMONIALS), published?.props?.items, ["image"]).map((testimonial, index) => ({
    ...testimonial,
    name: testimonial.name || `Patient ${index + 1}`,
    role: testimonial.role || "Add role",
    condition: testimonial.condition || "Add condition",
    image: testimonial.image || "",
    quote: testimonial.quote || "Add testimonial quote",
  }));
  const heading = previewText(draft, "heading", "Testimonial") || "Testimonial";
  const slideKey = testimonials.map((item) => `${item.name}|${item.role}|${item.quote}|${item.image}`).join(";");
  const sliderRef = useRef<SwiperRef>(null);

  const handlePrev = useCallback(() => sliderRef.current?.swiper.slidePrev(), []);
  const handleNext = useCallback(() => sliderRef.current?.swiper.slideNext(), []);

  return (
    <section className="sec test-sec">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h3 className="sec-head" data-admin-field="heading">{heading}</h3>
          </div>
          <div className="col-12">
            <Swiper
              key={slideKey}
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
              {testimonials.map((testimonial, index) => (
                <SwiperSlide
                key={`${testimonial.name}-${index}`}
                data-admin-list="items"
                data-admin-list-index={index}
              >
                  <div className="test-card">
                    <div className="test-pf">
                      <Image src={`${ASSETS}/quote.svg`} className="quote" alt="" width={100} height={100} />
                      {testimonial.image ? (
                        <Image src={testimonial.image} className="prof" data-admin-list-field="image" alt={assetAlt(testimonial, "image", testimonial.name)} width={100} height={100} />
                      ) : (
                        <div data-admin-list-field="image" className="prof w-[100px] h-[100px] bg-[#3a5070] rounded-full" aria-label="Testimonial photo placeholder" />
                      )}
                    </div>
                    <div className="test-det">
                      <p className="para" data-admin-list-field="quote">&ldquo;{testimonial.quote}&rdquo;</p>
                      <div className="test-bt">
                        <h3 data-admin-list-field="name">{testimonial.name}</h3>
                        <span>
                          <span data-admin-list-field="role">{testimonial.role}</span>
                          <br />
                          <span data-admin-list-field="condition">{testimonial.condition}</span>
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
