"use client";

import { motion } from "framer-motion";
import { useCta } from "@/hooks/useCta";

interface Props {
  className?: string;
  label?: string;
  href?: string;
  children?: React.ReactNode;
  dataAdminField?: string;
}

/**
 * CTA anchor that appends stored UTM / click-ID params to the booking URL.
 * Use this anywhere a "Book an Appointment" link appears.
 * Includes Framer Motion hover/tap effects for a polished interaction.
 */
export default function BookingCta({ className, label, href, children, dataAdminField }: Props) {
  const { bookingUrl } = useCta();
  const destination = href || bookingUrl;
  return (
    <motion.a
      data-admin-field={dataAdminField}
      href={destination}
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
