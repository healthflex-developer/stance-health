"use client";

import { useCta } from "@/hooks/useCta";

interface Props {
  className?: string;
  label?: string;
  children?: React.ReactNode;
}

/**
 * CTA anchor that appends stored UTM / click-ID params to the booking URL.
 * Use this anywhere a "Book an Appointment" link appears.
 */
export default function BookingCta({ className, label, children }: Props) {
  const { bookingUrl } = useCta();
  return (
    <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className={className}>
      {children ?? label ?? "Book an Appointment"}
    </a>
  );
}
