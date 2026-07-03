"use client";

import { useCallback } from "react";
import { buildTrackedUrl } from "@/lib/tracking";
import { BOOKING_URL, APP_STORE_URL, PLAY_STORE_URL } from "@/lib/constants";

/**
 * Returns tracked versions of the main CTA URLs.
 * Call this in any Client Component that renders a CTA link.
 *
 * Falls back to the static constant URLs during SSR (no-op — sessionStorage
 * is unavailable server-side, so buildTrackedUrl returns the base URL).
 */
export function useCta() {
  const tracked = useCallback((base: string) => buildTrackedUrl(base), []);

  return {
    bookingUrl:  tracked(BOOKING_URL),
    appStoreUrl: tracked(APP_STORE_URL),
    playStoreUrl: tracked(PLAY_STORE_URL),
  };
}
