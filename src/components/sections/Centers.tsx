"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { CENTERS } from "@/lib/constants";
import { previewList, previewText, useAdminPreviewBlock, type AdminPreviewBlock } from "@/components/PreviewDraft";
import { usePublishedBlock } from "@/components/PublishedContent";
import { applyAssetMeta, assetAlt } from "@/lib/asset-label";

const AUTOPLAY_MS = 3500;

type CenterItem = {
  image?: string;
  name?: string;
  phone?: string;
  address?: string;
  maps?: string;
};

export default function Centers({
  previewBlockId = "centers",
  previewBlockType = "Centers",
  fallbackCenters = CENTERS,
  previewBlock,
}: {
  previewBlockId?: string;
  previewBlockType?: string;
  fallbackCenters?: readonly CenterItem[];
  previewBlock?: AdminPreviewBlock | null;
}) {
  const listened = useAdminPreviewBlock(previewBlockId, previewBlockType);
  const draft = previewBlock !== undefined ? previewBlock : listened;
  const published = usePublishedBlock(previewBlockId);
  const centers = applyAssetMeta(previewList<CenterItem>(draft, "items", fallbackCenters), published?.props?.items, ["image"]).map((center, index) => ({
    ...center,
    image: center.image || "",
    name: center.name || `Centre ${index + 1}`,
    phone: center.phone || "Add phone",
    address: center.address || "Add address",
    maps: center.maps || "",
  }));
  const heading = previewText(draft, "heading", "Our Centers") || "Our Centers";
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = centers.length;
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goTo = (i: number) => {
    if (!count) return;
    setActive(((i % count) + count) % count);
  };
  const prev = () => goTo(active - 1);
  const next = () => goTo(active + 1);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
    setPaused(false);
  };

  useEffect(() => {
    if (paused || count === 0) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % count);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, count]);

  return (
    <section className="py-20 bg-[#0c1b30] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-center mb-12" data-admin-field="heading">{heading}</h2>

        <div
          className="relative flex items-center justify-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Prev button */}
          <button
            onClick={prev}
            aria-label="Previous center"
            className="hidden sm:flex absolute left-0 z-20 w-11 h-11 rounded-full border border-[#cdfe71]/40 items-center justify-center text-[#cdfe71] hover:bg-[#cdfe71]/10 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Slides */}
          <div
            className="relative w-full max-w-3xl h-[420px] sm:h-[480px] flex items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {centers.map((center, i) => {
              const offset = i - active;
              const isActive = offset === 0;
              const isVisible = Math.abs(offset) <= 1;

              return (
                <div
                  key={`${center.name || "centre"}-${i}`}
                  data-admin-list="items"
                  data-admin-list-index={i}
                  onClick={() => {
                    if (isActive && center.maps) {
                      window.open(center.maps, "_blank", "noopener,noreferrer");
                    } else if (!isActive) {
                      goTo(i);
                    }
                  }}
                  className={`absolute inset-0 rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 ease-out ${isActive
                    ? "z-10 scale-100 opacity-100 cursor-pointer"
                    : isVisible
                      ? "z-0 opacity-60 cursor-pointer"
                      : "z-0 opacity-0 pointer-events-none"
                    }`}
                  style={{
                    transform: isActive
                      ? "translateX(0) scale(1)"
                      : `translateX(${offset * 55}%) scale(0.85)`,
                  }}
                >
                  {center.image ? (
                    <Image
                      src={center.image}
                      alt={assetAlt(center, "image", center.name || "centre")}
                      fill
                      data-admin-list-field="image"
                      className="object-cover"
                      priority={isActive}
                    />
                  ) : (
                    <div
                      data-admin-list-field="image"
                      className="absolute inset-0 bg-[#3a5070]"
                      aria-label="Centre image placeholder"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1b30] via-[#0c1b30]/40 to-transparent" />

                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-center">
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#cdfe71] mb-3" data-admin-list-field="name">
                        {center.name}
                      </h3>
                      <p className="text-white text-sm sm:text-base mb-1" data-admin-list-field="phone">{center.phone}</p>
                      <p className="text-white/70 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed" data-admin-list-field="address">
                        {center.address}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Next button */}
          <button
            onClick={next}
            aria-label="Next center"
            className="hidden sm:flex absolute right-0 z-20 w-11 h-11 rounded-full border border-[#cdfe71]/40 items-center justify-center text-[#cdfe71] hover:bg-[#cdfe71]/10 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {centers.map((center, i) => (
            <button
              key={center.name}
              onClick={() => goTo(i)}
              aria-label={`Go to ${center.name}`}
              className={`h-2 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-[#cdfe71]" : "w-2 bg-white/20"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
