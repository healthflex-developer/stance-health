"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { captureTrackingParams, getTrackingData } from "@/lib/tracking";

const TRACK_URL = process.env.NEXT_PUBLIC_TRACK_USER_URL ?? "";

/**
 * Runs on every page mount:
 * 1. Captures UTM / ad-click-ID params from the URL into localStorage.
 * 2. Fires POST /api/track-user to persist the full tracking payload in MongoDB.
 *
 * Fire-and-forget — never blocks navigation or throws to the user.
 * Wrapped in <Suspense> in the root layout because it uses useSearchParams().
 */
export default function TrackingInit() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // 1. Capture params from the current URL
    captureTrackingParams();

    // 2. Push to backend (fire-and-forget)
    if (!TRACK_URL) return;

    void (async () => {
      try {
        const data = getTrackingData();

        // Don't send empty pings — require at least anonymous_id
        if (!data.anonymous_id) return;

        // Include the raw _gl param if present in the URL
        const glParam = new URLSearchParams(window.location.search).get("_gl") ?? undefined;

        const payload = {
          ...data,
          page_path: window.location.pathname,
          ...(glParam ? { _gl: glParam } : {}),
        };

        await fetch(TRACK_URL, {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify(payload),
          // Use keepalive so the request survives page unloads
          keepalive: true,
        });
      } catch {
        // Silent — tracking must never break the user journey
      }
    })();
  // Re-run whenever the search params change (client-side navigation).
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return null;
}
