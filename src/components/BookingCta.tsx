"use client";

import { motion } from "framer-motion";
import { useCta } from "@/hooks/useCta";
import { ensureWebsiteBookingSource } from "@/lib/tracking";

interface Props {
  className?: string;
  label?: string;
  children?: React.ReactNode;
}

/**
 * CTA anchor that appends stored UTM / click-ID params to the booking URL.
 * Use this anywhere a "Book an Appointment" link appears.
 * utm_source stays the first place the visitor came from. Direct visits
 * use "website". The click also adds utm_referer for this page.
 * Includes Framer Motion hover/tap effects for a polished interaction.
 */
export default function BookingCta({ className, label, children }: Props) {
  const { bookingUrl } = useCta();
  return (
    <motion.a
      href={ensureWebsiteBookingSource(bookingUrl)}
      target="_blank"
      rel="noopener noreferrer"
      className={`booking-cta ${className ?? ""}`}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 8px 30px rgba(221, 254, 113, 0.4)",
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      {children ?? label ?? "Book an Appointment"}
    </motion.a>
  );
}
