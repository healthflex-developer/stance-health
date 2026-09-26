"use client";

import BookingCta from "@/components/BookingCta";
import { previewText, useAdminPreviewBlock } from "@/components/PreviewDraft";

export default function StickyMobileCta() {
  const draft = useAdminPreviewBlock("lp-ad-hero", "AdHero");

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0c1b30]/95 backdrop-blur-sm border-t border-white/10 px-4 py-3">
      <BookingCta className="btn-primary w-full text-center block">
        {previewText(draft, "ctaLabel", "Book My Assessment")}
      </BookingCta>
    </div>
  );
}
