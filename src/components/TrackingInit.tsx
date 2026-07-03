"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { captureTrackingParams } from "@/lib/tracking";

/**
 * Runs on every page mount and captures any UTM / ad-click-ID params
 * from the URL into sessionStorage so they survive soft navigations.
 *
 * Must be a Client Component (uses hooks + browser APIs).
 * Wrap in <Suspense> in the parent to avoid blocking the page render.
 */
export default function TrackingInit() {
  const searchParams = useSearchParams();

  useEffect(() => {
    captureTrackingParams();
  // Re-run whenever the search params change (client-side navigation).
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return null;
}
