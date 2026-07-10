"use client";

import { useState, useEffect } from "react";
import { buildTrackedUrl } from "@/lib/tracking";
import { BOOKING_URL, APP_STORE_URL, PLAY_STORE_URL } from "@/lib/constants";

/**
 * Returns tracked versions of the main CTA URLs.
 *
 * The initial render (both SSR and the first client paint) returns the static
 * base URLs so the SSR-rendered HTML and the first client render are identical
 * — no hydration mismatch. After mount, the URLs are upgraded with any stored
 * UTM / click-ID params from localStorage.
 */
export function useCta() {
  const [bookingUrl,   setBookingUrl]   = useState(BOOKING_URL);
  const [appStoreUrl,  setAppStoreUrl]  = useState(APP_STORE_URL);
  const [playStoreUrl, setPlayStoreUrl] = useState(PLAY_STORE_URL);

  useEffect(() => {
    // Runs only after hydration — localStorage is safe to read here.
    setBookingUrl(buildTrackedUrl(BOOKING_URL));
    setAppStoreUrl(buildTrackedUrl(APP_STORE_URL));
    setPlayStoreUrl(buildTrackedUrl(PLAY_STORE_URL));
  }, []);

  return { bookingUrl, appStoreUrl, playStoreUrl };
}
