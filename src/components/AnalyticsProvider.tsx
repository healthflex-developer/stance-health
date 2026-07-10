"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { initAnalytics, track, trackPageView } from "@/lib/analytics";
import { getTrackingData } from "@/lib/tracking";

const SCROLL_MILESTONES = [25, 50, 75, 100] as const;
// Marks the session_id we've already fired web_session_start for, so a session
// (30-min TTL, see tracking.ts) produces exactly one start event per tab.
const SESSION_START_KEY = "stance_session_started";

/**
 * Boots the analytics pipeline once and emits a `page_view` on every route
 * change (App Router soft navigations don't fire a native page load).
 *
 * Mounted once in the root layout, inside a <Suspense> boundary because it
 * reads useSearchParams(). Renders nothing.
 */
export default function AnalyticsProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const firstLoad = useRef(true);

  // Lazy-init Firebase after mount (never during SSR / critical path).
  useEffect(() => {
    void initAnalytics();
  }, []);

  // web_session_start — fire once per session_id. TrackingInit's
  // captureTrackingParams() has already run (both are mounted together), so the
  // session_id is populated by the time this effect executes.
  useEffect(() => {
    const { session_id } = getTrackingData();
    if (!session_id) return;
    try {
      if (window.sessionStorage.getItem(SESSION_START_KEY) === session_id) return;
      window.sessionStorage.setItem(SESSION_START_KEY, session_id);
    } catch {
      // sessionStorage unavailable — fall through and fire (at-least-once).
    }
    track("web_session_start", { landing_page: getTrackingData().landing_page });
  }, []);

  // Fire page_view on initial load and on each client navigation.
  useEffect(() => {
    // GA4's own config already sends the first page_view; avoid double-count.
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    const query = searchParams?.toString();
    const path = query ? `${pathname}?${query}` : pathname;
    trackPageView(path);
  }, [pathname, searchParams]);

  // Scroll-depth milestones — reset on each route change.
  useEffect(() => {
    const fired = new Set<number>();
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const pct = Math.min(100, Math.round((window.scrollY / scrollable) * 100));
      for (const m of SCROLL_MILESTONES) {
        if (pct >= m && !fired.has(m)) {
          fired.add(m);
          track("web_scroll_depth", { percent: m, page_path: pathname });
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // Section-view tracking — emit once when a [data-section] / <section id>
  // enters the viewport.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const seen = new Set<string>();
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[id], [data-section]")
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          const name = el.dataset.section || el.id;
          if (!name || seen.has(name)) continue;
          seen.add(name);
          track("web_section_view", { section: name, page_path: pathname });
          observer.unobserve(el);
        }
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
