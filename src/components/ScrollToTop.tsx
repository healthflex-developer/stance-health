"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scrolls the window to the top on every route change.
 * Fixes the issue where navigating via footer links on mobile/tablet
 * keeps the scroll position at the bottom of the page.
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("adminPreview") === "1" || window.parent !== window) return;
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
