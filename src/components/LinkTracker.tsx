"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { buildTrackedUrl } from "@/lib/tracking";
import { track } from "@/lib/analytics";

const BOOKING_HOST = "book.stance.health";

/** Classify a clicked anchor into an analytics event name + params. */
function describeClick(anchor: HTMLAnchorElement, dest: URL, internal: boolean) {
  // Explicit opt-in labels win: data-analytics="event_name", data-cta="label".
  const explicitEvent = anchor.getAttribute("data-analytics") || undefined;
  const ctaLabel =
    anchor.getAttribute("data-cta") ||
    anchor.textContent?.trim().slice(0, 80) ||
    undefined;
  const section =
    anchor.closest("[data-section]")?.getAttribute("data-section") ||
    anchor.closest("section")?.getAttribute("id") ||
    (anchor.closest("header") ? "navbar" : undefined) ||
    (anchor.closest("footer") ? "footer" : undefined) ||
    undefined;

  const params = {
    link_text: ctaLabel,
    link_url: dest.href,
    link_domain: dest.hostname,
    section,
    outbound: !internal,
  };

  if (explicitEvent) return { event: explicitEvent, params };
  // The booking dashboard is the site's primary conversion CTA.
  if (dest.hostname === BOOKING_HOST) return { event: "web_cta_click", params: { ...params, cta: "book_appointment" } };
  // WhatsApp click-to-chat links (wa.me / whatsapp.com) — dedicated conversion.
  if (isWhatsApp(dest.href, dest.hostname)) return { event: "web_whatsapp_click", params };
  if (!internal) return { event: "web_outbound_click", params };
  return { event: "web_nav_click", params };
}

/** True for WhatsApp deep-links (wa.me, api/chat.whatsapp.com, whatsapp: scheme). */
function isWhatsApp(rawHref: string, hostname: string): boolean {
  if (/^whatsapp:/i.test(rawHref.trim())) return true;
  return /(^|\.)(wa\.me|whatsapp\.com)$/i.test(hostname);
}

/**
 * The single global handler that forwards captured tracking params onto every
 * link the user clicks — internal `<Link>` / `<a>` navigation AND external CTAs
 * (booking dashboard, app stores) — so attribution follows the whole journey
 * without editing any individual link call-site.
 *
 * It runs a capture-phase click listener on `document` so it fires before
 * Next's Link click handler (React delegates in the bubble phase):
 *
 *  • Internal same-origin navigation → preventDefault() so Next's Link bails
 *    (it returns early on `e.defaultPrevented`), then we perform the soft
 *    navigation ourselves via router.push() to the param-appended path.
 *    This is required because Next's Link navigates to the href captured at
 *    render time, NOT the live DOM href — so mutating `a.href` alone would not
 *    redirect a soft navigation.
 *
 *  • External CTAs, new-tab / modified clicks, and plain `<a>` full reloads →
 *    we rewrite `a.href` in place and let the browser's default proceed. Plain
 *    anchors read the live DOM href, so this transparently covers the
 *    hardcoded dashboard CTAs on server-rendered pages.
 */
export default function LinkTracker() {
  const router = useRouter();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // Let another handler that already cancelled the event win.
      if (e.defaultPrevented) return;

      const target = e.target as Element | null;
      const anchor = target?.closest?.("a");
      if (!anchor) return;

      const rawHref = anchor.getAttribute("href");
      if (!rawHref) return;
      const scheme = rawHref.trim().toLowerCase();

      // Contact links: emit a conversion event, but don't rewrite the href.
      // Spec splits these into dedicated web_* events per channel.
      if (scheme.startsWith("tel:") || scheme.startsWith("mailto:") || scheme.startsWith("sms:")) {
        const event = scheme.startsWith("tel:")
          ? "web_phone_click"
          : scheme.startsWith("mailto:")
            ? "web_email_click"
            : "web_sms_click";
        track(event, { link_url: rawHref });
        return;
      }
      // WhatsApp deep-link scheme (whatsapp://…) — track, don't rewrite.
      if (scheme.startsWith("whatsapp:")) {
        track("web_whatsapp_click", { link_url: rawHref });
        return;
      }
      // Skip pure in-page anchors / js hrefs.
      if (/^(javascript:|#)/i.test(scheme)) return;
      // Respect explicit downloads.
      if (anchor.hasAttribute("download")) return;

      const tracked = buildTrackedUrl(anchor.href);

      let destURL: URL;
      try {
        destURL = new URL(tracked, window.location.origin);
      } catch {
        return;
      }

      const sameOrigin = destURL.origin === window.location.origin;

      // Emit the classified click event (fires for both internal + external).
      try {
        const { event, params } = describeClick(anchor, destURL, sameOrigin);
        track(event, params);
      } catch {
        /* analytics must never break navigation */
      }

      const modified =
        e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;
      const newTab = anchor.target === "_blank";

      if (sameOrigin && !modified && !newTab) {
        // Internal soft navigation — take it over so Next routes to the
        // param-appended path (mutating a.href alone won't redirect Link).
        e.preventDefault();
        e.stopPropagation();
        router.push(`${destURL.pathname}${destURL.search}${destURL.hash}`);
        return;
      }

      // External CTA, new-tab, or modified click: rewrite the live DOM href so
      // the browser's default navigation carries the params.
      if (anchor.href !== tracked) {
        anchor.href = tracked;
      }
    };

    // Capture phase so we run before React's bubble-phase Link handler.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return null;
}
