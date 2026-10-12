"use client";

import type { ReactNode } from "react";
import BookingCta from "@/components/BookingCta";
import { usePreviewProps } from "@/components/preview/usePreviewDraft";
import { buttonDestination } from "@/lib/button-destination";
import { previewString } from "@/lib/preview-draft";

export function PreviewCta({
  className,
  label,
  href,
  children,
}: {
  className?: string;
  label: string;
  href?: string | null;
  children?: ReactNode;
}) {
  const destination = buttonDestination(href);
  if (destination) {
    const external = /^(https?:|mailto:|tel:)/i.test(destination);
    return (
      <a
        className={className}
        href={destination}
        data-preview-field="ctaLabel"
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children ?? label}
      </a>
    );
  }
  return (
    <BookingCta className={className} label={label}>
      {children}
    </BookingCta>
  );
}

export function DraftCta({
  sourceType,
  className,
  label,
}: {
  sourceType: string;
  className?: string;
  label: string;
}) {
  const draft = usePreviewProps(sourceType);
  const text = previewString(draft?.ctaLabel, label);
  return <PreviewCta className={className} label={text} href={buttonDestination(draft?.ctaHref)} />;
}
