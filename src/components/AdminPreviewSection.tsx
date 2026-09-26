"use client";

import { useEffect, type ReactNode } from "react";

const SELECT_BLOCK_MESSAGE = "stance-admin/select-block";
const SET_DRAFT_MESSAGE = "stance-admin/set-draft";
const PREVIEW_READY_MESSAGE = "stance-admin/preview-ready";
const REACT_DRAFT_BLOCK_TYPES = new Set([
  "Hero",
  "Framework",
  "Technology",
  "Testimonials",
  "Team",
  "Centers",
  "CareerTracks",
  "CareerOpenRoles",
  "CareerTeamStories",
  "CareersHero",
  "CareerStatistics",
  "CareerCenters",
  "CareerValues",
  "CareerFAQ",
  "CareersCTA",
  "FAQHero",
  "FAQList",
  "LocationsHero",
  "LocationCenters",
  "LocationNeighbourhoods",
  "LocationsCTA",
  "PartnersHero",
  "PartnerTypes",
  "PartnerContactForm",
  "PhilosophyHero",
  "PhilosophyHowWeDoIt",
  "PhilosophyDifferentiators",
  "PhilosophyCTA",
  "TeamHero",
  "TeamDirectory",
  "ServicesHero",
  "ServiceCards",
  "ServicesCTA",
  "ConditionsHero",
  "ConditionDirectory",
  "ConditionsCTA",
  "BlogHero",
  "BlogPosts",
  "ResourcesHero",
  "ResourceList",
  "AdHero",
  "PainPoints",
  "HowItWorks",
  "TechCredibility",
  "SocialProof",
  "FaqCta",
  "PrivacyHero",
  "PrivacySections",
  "TermsHero",
  "TermsSections",
  "PackagePolicyHero",
  "PackagePolicySections",
  "ConsentHero",
  "ConsentSections",
  "DisclaimerHero",
  "DisclaimerSections",
  "DeleteAccountHero",
  "DeleteAccountSections",
  "DownloadRedirect",
  "QrDownload",
  "NavbarContent",
  "FooterContent",
  "LocationHero",
  "LocationInfo",
  "LocationConditions",
  "LocationCta",
  "ServiceHero",
  "ServiceAudience",
  "ServiceApproach",
  "ServiceFeatures",
  "ServiceConditions",
  "ServiceCta",
  "ConditionHero",
  "ConditionLocations",
  "ConditionSymptoms",
  "ConditionCauses",
  "ConditionApproach",
  "ConditionServices",
  "ConditionFaqs",
  "ConditionCta",
  "BlogArticle",
  "BlogBody",
  "BlogCta",
  "ResourceArticle",
  "ResourceBody",
  "ResourceCta",
  "RoleHero",
  "RoleAbout",
  "RoleSections",
  "RoleGlance",
  "RoleApply",
]);

// AdminPreviewSection marks an existing, real Stance Health section. The
// marker has no visual impact until the admin iframe selects it.
export default function AdminPreviewSection({
  blockId,
  blockType,
  children,
}: {
  blockId: string;
  blockType: string;
  children: ReactNode;
}) {
  return (
    <div id={blockId} data-admin-block-id={blockId} data-admin-block-type={blockType}>
      {children}
    </div>
  );
}

// AdminPreviewBridge lives in this existing tracked module so it remains
// available to the root layout even during recovery from an interrupted build.
export function AdminPreviewBridge({ children }: { children: ReactNode }) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("adminPreview") !== "1" && window.parent === window) return;

    let selected: HTMLElement | null = null;
    let explicitSelectionLock: string | null = null;
    const parentOrigin = (() => {
      try {
        return document.referrer ? new URL(document.referrer).origin : "*";
      } catch {
        return "*";
      }
    })();
    const notifyParent = (payload: Record<string, unknown>) => {
      window.parent.postMessage(payload, parentOrigin);
    };
    const findMarker = (blockId?: string | null, blockType?: string | null) => {
      const markers = Array.from(document.querySelectorAll<HTMLElement>("[data-admin-block-id]"));
      return (
        markers.find((element) => Boolean(blockId) && element.dataset.adminBlockId === blockId) ??
        markers.find((element) => Boolean(blockType) && element.dataset.adminBlockType === blockType)
      );
    };
    const focus = (blockId?: string | null, blockType?: string | null, shouldScroll = true) => {
      if (!blockId && !blockType) {
        selected?.classList.remove("admin-preview-selected");
        selected = null;
        return;
      }

      const selectMarker = () => {
        const next = findMarker(blockId, blockType);
        if (!next) return;
        selected?.classList.remove("admin-preview-selected");
        selected = next;
        selected.classList.add("admin-preview-selected");
        return next;
      };
      const scrollToMarker = () => {
        const next = selectMarker();
        if (!next) return;
        next.scrollIntoView({ block: "start", behavior: "auto" });
        const top = Math.max(0, next.getBoundingClientRect().top + window.scrollY - 48);
        window.scrollTo({ top, behavior: "auto" });
        document.scrollingElement?.scrollTo({ top, behavior: "auto" });
        document.documentElement.scrollTop = top;
        document.body.scrollTop = top;
      };

      if (!shouldScroll) {
        selectMarker();
        return;
      }

      explicitSelectionLock = blockId ?? blockType ?? null;
      // Focus only in response to an explicit selection. Draft updates can
      // arrive for every keystroke while editing and must never pull the
      // user's scroll position back to the selected section.
      requestAnimationFrame(() => {
        requestAnimationFrame(scrollToMarker);
      });
      window.setTimeout(scrollToMarker, 350);
    };

    const onPreviewClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      if (!target) return;

      const link = target.closest<HTMLAnchorElement>("a[href]");
      let pageSlug: string | undefined;
      let opensExternally = false;
      if (link) {
        try {
          const url = new URL(link.href, window.location.href);
          if (url.origin === window.location.origin) {
            pageSlug = url.pathname.replace(/^\/+|\/+$/g, "") || "home";
          }
          // Booking buttons point at the appointment site and are meant to
          // open. Other preview clicks only select the section being edited.
          opensExternally = url.hostname === "book.stance.health" || link.classList.contains("booking-cta");
        } catch {
          // Ignore malformed links; the click can still select its section.
        }
        if (!opensExternally) event.preventDefault();
      }

      const marker = target.closest<HTMLElement>("[data-admin-block-id]");
      if (marker?.dataset.adminBlockType === "NavbarContent" || marker?.dataset.adminBlockType === "FooterContent") {
        pageSlug = undefined;
      }
      if (!marker) {
        if (pageSlug) {
          notifyParent({
            type: SELECT_BLOCK_MESSAGE,
            blockId: null,
            blockType: null,
            fieldPath: null,
            pageSlug,
          });
        }
        return;
      }

      const childField = target.closest<HTMLElement>("[data-admin-list-child-field]");
      const childItem = childField?.closest<HTMLElement>("[data-admin-list-child-index]");
      const childList = childItem?.closest<HTMLElement>("[data-admin-list-child]");
      const childParent = childList?.closest<HTMLElement>("[data-admin-list][data-admin-list-index]");
      const listField = target.closest<HTMLElement>("[data-admin-list-field]");
      const listItem = listField?.closest<HTMLElement>("[data-admin-list][data-admin-list-index]");
      const directField = target.closest<HTMLElement>("[data-admin-field]");
      let fieldPath = directField?.dataset.adminField;

      if (childField && childItem && childList && childParent) {
        const parentName = childParent.dataset.adminList;
        const parentIndex = childParent.dataset.adminListIndex;
        const childName = childList.dataset.adminListChild;
        const childIndex = childItem.dataset.adminListChildIndex;
        const fieldName = childField.dataset.adminListChildField;
        if (parentName && parentIndex && childName && childIndex && fieldName) {
          fieldPath = `${parentName}[${parentIndex}].${childName}[${childIndex}].${fieldName}`;
        }
      } else if (listField && listItem) {
        const listName = listItem.dataset.adminList;
        const index = listItem.dataset.adminListIndex;
        const fieldName = listField.dataset.adminListField;
        if (listName && index && fieldName) {
          fieldPath = `${listName}[${index}].${fieldName}`;
        }
      }

      notifyParent({
        type: SELECT_BLOCK_MESSAGE,
        blockId: marker.dataset.adminBlockId ?? null,
        blockType: marker.dataset.adminBlockType ?? null,
        fieldPath: fieldPath ?? null,
        pageSlug: pageSlug ?? null,
      });
    };

    let lastReportedScrollBlockId: string | null = null;
    let scrollFrame: number | null = null;
    const reportVisibleSection = () => {
      scrollFrame = null;
      // An explicit selector click owns the preview until its scroll finishes.
      // During that jump, intermediate visibility reports can still see the
      // Framework marker and would otherwise overwrite the requested section
      // in the admin selector before the target reaches the viewport.
      if (explicitSelectionLock !== null) return;

      const markers = Array.from(document.querySelectorAll<HTMLElement>("[data-admin-block-id]"))
        .filter((marker) => !marker.querySelector("[data-admin-block-id]") && marker.style.display !== "none");
      const visible = markers
        .map((marker) => ({ marker, rect: marker.getBoundingClientRect() }))
        .filter(({ rect }) => rect.bottom > 0 && rect.top < window.innerHeight)
        .sort((left, right) => left.rect.top - right.rect.top);
      // If multiple sections are visible, the one highest in the preview wins.
      // The next section becomes active only after the current section's bottom
      // has left the viewport.
      const current = visible[0]?.marker;
      const blockId = current?.dataset.adminBlockId;
      if (!current || !blockId || blockId === lastReportedScrollBlockId) return;

      lastReportedScrollBlockId = blockId;
      focus(blockId, current.dataset.adminBlockType ?? null, false);
      const pageSlug = window.location.pathname.replace(/^\/+|\/+$/g, "") || "home";
      notifyParent({
        type: SELECT_BLOCK_MESSAGE,
        blockId,
        blockType: current.dataset.adminBlockType ?? null,
        fieldPath: null,
        pageSlug,
        reason: "scroll",
      });
    };
    const scheduleVisibleSectionReport = () => {
      if (scrollFrame !== null) return;
      scrollFrame = window.requestAnimationFrame(reportVisibleSection);
    };

    const releaseExplicitSelectionLock = () => {
      if (explicitSelectionLock === null) return;
      explicitSelectionLock = null;
      scheduleVisibleSectionReport();
    };
    const onWheel = () => releaseExplicitSelectionLock();
    const onTouchStart = () => releaseExplicitSelectionLock();
    const onKeyDown = (event: KeyboardEvent) => {
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) {
        releaseExplicitSelectionLock();
      }
    };

    const onMessage = (event: MessageEvent<unknown>) => {
      if (event.source !== window.parent || (parentOrigin !== "*" && event.origin !== parentOrigin)) return;
      const message = event.data as {
        type?: unknown;
        blockId?: string | null;
        blockType?: string | null;
        focus?: boolean;
        draft?: {
          selectedBlockId?: string | null;
          selectedBlockType?: string | null;
          blocks?: Array<{ id: string; type: string; props: Record<string, unknown> }>;
        };
      };
      if (message.type === SELECT_BLOCK_MESSAGE && message.focus !== false) {
        focus(message.blockId, message.blockType, true);
      }
      if (message.type === SET_DRAFT_MESSAGE) {
        requestAnimationFrame(() => {
          syncPreviewOrder(message.draft?.blocks);
          const selectedType = message.draft?.blocks?.find(
            (block) => block.id === message.draft?.selectedBlockId,
          )?.type ?? message.draft?.selectedBlockType;
          if (!selectedType || !REACT_DRAFT_BLOCK_TYPES.has(selectedType)) {
            applySelectedDraft(message.draft);
          }
        });
      }
    };

    const main = document.querySelector<HTMLElement>("main");
    markGenericPreviewSections(main);

    const initialSection = new URLSearchParams(window.location.search).get("adminSection");
    const initialSectionType = new URLSearchParams(window.location.search).get("adminSectionType");
    if (initialSection || initialSectionType) {
      window.setTimeout(() => focus(initialSection, initialSectionType), 0);
    }

    const onApply = (event: Event) => {
      const detail = (event as CustomEvent).detail;
      onMessage({ data: detail, source: window.parent, origin: parentOrigin } as MessageEvent<unknown>);
    };

    window.addEventListener("message", onMessage);
    window.addEventListener("stance-admin/apply", onApply);
    window.addEventListener("click", onPreviewClick, true);
    window.addEventListener("scroll", scheduleVisibleSectionReport, { passive: true });
    window.addEventListener("resize", scheduleVisibleSectionReport);
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    const initialVisibilityTimer = window.setTimeout(reportVisibleSection, 250);
    const announceReady = () => notifyParent({ type: PREVIEW_READY_MESSAGE });
    const readyTimer = window.setTimeout(announceReady, 150);
    const secondReadyTimer = window.setTimeout(announceReady, 600);
    announceReady();
    return () => {
      window.clearTimeout(readyTimer);
      window.clearTimeout(secondReadyTimer);
      window.clearTimeout(initialVisibilityTimer);
      if (scrollFrame !== null) window.cancelAnimationFrame(scrollFrame);
      window.removeEventListener("message", onMessage);
      window.removeEventListener("stance-admin/apply", onApply);
      window.removeEventListener("click", onPreviewClick, true);
      window.removeEventListener("scroll", scheduleVisibleSectionReport);
      window.removeEventListener("resize", scheduleVisibleSectionReport);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("keydown", onKeyDown);
      selected?.classList.remove("admin-preview-selected");
      document.querySelectorAll<HTMLElement>("[data-admin-preview-original-display]").forEach((marker) => {
        marker.style.display = marker.dataset.adminPreviewOriginalDisplay ?? "";
        marker.style.order = marker.dataset.adminPreviewOriginalOrder ?? "";
        delete marker.dataset.adminPreviewOriginalDisplay;
        delete marker.dataset.adminPreviewOriginalOrder;
      });
      document.querySelectorAll<HTMLElement>("[data-admin-preview-original-parent-display]").forEach((parent) => {
        parent.style.display = parent.dataset.adminPreviewOriginalParentDisplay ?? "";
        parent.style.flexDirection = parent.dataset.adminPreviewOriginalFlexDirection ?? "";
        delete parent.dataset.adminPreviewOriginalParentDisplay;
        delete parent.dataset.adminPreviewOriginalFlexDirection;
      });
    };
  }, []);

  return <>{children}</>;
}

type DraftMessage = {
  selectedBlockId?: string | null;
  selectedBlockType?: string | null;
  blocks?: Array<{ id: string; type: string; props: Record<string, unknown> }>;
};

// Applies the selected editor block to the already-rendered real component.
// It runs only inside ?adminPreview=1 and never changes the public site.
function applySelectedDraft(draft?: DraftMessage) {
  if (!draft?.blocks) return;
  const block = draft.blocks.find((item) => item.id === draft.selectedBlockId) ??
    draft.blocks.find((item) => item.type === draft.selectedBlockType);
  if (!block) return;

  const marker = findPreviewMarker(block.id, block.type);
  if (!marker) return;

  const text = (key: string) => typeof block.props[key] === "string" ? block.props[key] as string : undefined;
  const items = Array.isArray(block.props.items) ? block.props.items :
    Array.isArray(block.props.steps) ? block.props.steps :
    Array.isArray(block.props.members) ? block.props.members :
    [];

  // About (and future mapped sections) expose explicit data attributes. This
  // keeps the exact public component markup while allowing a draft from Mongo
  // to update every editable field in the admin-only iframe.
  applyMarkedFields(marker, block.props);
  applyMarkedLists(marker, block.props);

  if (applyCareersDraft(block.type, marker, block.props)) return;

  if (block.type === "PageHero") {
    const heading = marker.querySelector("h1");
    const paragraph = marker.querySelector("p");
    if (heading && text("headline")) heading.textContent = text("headline")!;
    if (paragraph && text("description")) paragraph.textContent = text("description")!;
    return;
  }

  if (block.type === "PageSection") {
    const heading = marker.querySelector("h2, h3");
    const paragraph = marker.querySelector("p");
    if (heading && text("heading")) heading.textContent = text("heading")!;
    if (paragraph && text("body")) paragraph.textContent = text("body")!;
    return;
  }

  if (block.type === "Hero") {
    const heading = marker.querySelector("h1");
    const paragraph = marker.querySelector(".para");
    const button = marker.querySelector(".main-btn span");
    if (heading && text("headline")) heading.textContent = text("headline")!;
    if (paragraph && text("paragraph")) paragraph.textContent = text("paragraph")!;
    if (button && text("ctaLabel")) button.textContent = text("ctaLabel")!;
    return;
  }

  const heading = marker.querySelector("h2, h3.sec-head");
  if (heading && text("heading")) heading.textContent = text("heading")!;

  if (block.type === "Technology") {
    const cards = marker.querySelectorAll<HTMLElement>(".tech-card");
    items.forEach((item, index) => {
      if (!isRecord(item) || !cards[index]) return;
      const name = typeof item.name === "string" ? item.name : undefined;
      const description = typeof item.description === "string" ? item.description : undefined;
      const cardHeading = cards[index].querySelector("h3");
      const cardDescription = cards[index].querySelector("p");
      if (cardHeading && name) cardHeading.textContent = name;
      if (cardDescription && description) cardDescription.textContent = description;
    });
  }

  if (block.type === "Framework") {
    const cards = marker.querySelectorAll<HTMLElement>(".btm-sec, .framework-card");
    items.forEach((item, index) => {
      if (!isRecord(item) || !cards[index]) return;
      const label = typeof item.label === "string" ? item.label : undefined;
      const description = typeof item.description === "string" ? item.description : undefined;
      const cardHeading = cards[index].querySelector("h3");
      const cardDescription = cards[index].querySelector("p");
      if (cardHeading && label) cardHeading.textContent = label;
      if (cardDescription && description) cardDescription.textContent = description;
    });
  }
}

// Reorders top-level preview sections without moving React-owned DOM nodes.
// The real site keeps its production components mounted so animations and
// assets remain identical; CSS order mirrors the Mongo block list safely.
function syncPreviewOrder(blocks?: DraftMessage["blocks"]) {
  if (!blocks) return;

  const blockIndex = new Map(blocks.map((block, index) => [block.id, index]));
  const groups = new Map<HTMLElement, HTMLElement[]>();
  const markers = Array.from(document.querySelectorAll<HTMLElement>("[data-admin-block-id]"));
  const leafMarkers = markers.filter((marker) => !marker.querySelector("[data-admin-block-id]"));

  leafMarkers.forEach((marker) => {
    const blockId = marker.dataset.adminBlockId;
    if (!blockId) return;
    if (marker.dataset.adminPreviewOriginalDisplay === undefined) {
      marker.dataset.adminPreviewOriginalDisplay = marker.style.display;
    }
    if (marker.dataset.adminPreviewOriginalOrder === undefined) {
      marker.dataset.adminPreviewOriginalOrder = marker.style.order;
    }

    const index = blockIndex.get(blockId);
    const isActive = index !== undefined || marker.hasAttribute("data-admin-draft-root") || marker.hasAttribute("data-admin-library-preview");
    marker.style.display = isActive
      ? marker.dataset.adminPreviewOriginalDisplay
      : "none";

    const parent = marker.parentElement;
    if (!parent || !isActive || parent.tagName !== "MAIN") return;
    const siblings = groups.get(parent) ?? [];
    siblings.push(marker);
    groups.set(parent, siblings);
  });

  groups.forEach((siblings, parent) => {
    if (parent.dataset.adminPreviewOriginalParentDisplay === undefined) {
      parent.dataset.adminPreviewOriginalParentDisplay = parent.style.display;
    }
    if (parent.dataset.adminPreviewOriginalFlexDirection === undefined) {
      parent.dataset.adminPreviewOriginalFlexDirection = parent.style.flexDirection;
    }
    // The production main sections are block-level children, so a column flex
    // layout preserves their visual width while allowing CSS order to mirror
    // Mongo without appendChild/React reconciliation conflicts.
    parent.style.display = "flex";
    parent.style.flexDirection = "column";

    siblings.forEach((marker) => {
      marker.style.order = String(blockIndex.get(marker.dataset.adminBlockId!)!);
    });
  });
}

function applyCareersDraft(type: string, marker: HTMLElement, props: Record<string, unknown>): boolean {
  const text = (key: string) => typeof props[key] === "string" ? props[key] : undefined;
  const items = (key: string) => Array.isArray(props[key]) ? props[key].filter(isRecord) : [];

  if (type === "CareersHero") {
    setCareerSplitHeading(marker.querySelector("h1"), text("headlinePrefix"), [text("highlightOne"), text("highlightTwo")]);
    const paragraphs = marker.querySelectorAll("p");
    setElementText(paragraphs[0], text("paragraphOne"));
    setElementText(paragraphs[1], text("paragraphTwo"));
    setElementText(marker.querySelector("a[href='#open-roles']"), text("ctaLabel"));
    setElementText(paragraphs[2], text("impactHeading"));
    return true;
  }

  if (type === "CareerStatistics") {
    setCareerSplitHeading(marker.querySelector("h2"), text("headingPrefix"), [text("headingHighlight")]);
    setElementText(marker.querySelector("h2")?.nextElementSibling, text("description"));
    const cards = marker.querySelectorAll<HTMLElement>(".grid > div");
    items("stats").forEach((stat, index) => {
      const values = cards[index]?.querySelectorAll("p");
      setElementText(values?.[0], stringValue(stat.value));
      setElementText(values?.[1], stringValue(stat.label));
      setElementText(values?.[2], stringValue(stat.sub));
    });
    return true;
  }

  if (type === "CareerTracks") {
    const track = items("tracks")[0];
    if (!track) return true;
    setElementText(marker.querySelector("h3"), stringValue(track.title));
    const paragraphs = marker.querySelectorAll("p");
    setElementText(paragraphs[0], stringValue(track.tagline));
    setElementText(paragraphs[1], stringValue(track.description));
    setElementText(marker.querySelector("a[href='#open-roles']"), stringValue(track.joinLabel));
    return true;
  }

  if (type === "CareerOpenRoles") {
    setCareerSplitHeading(marker.querySelector("h2"), text("headingPrefix"), [text("headingHighlight")]);
    setElementText(marker.querySelector("h2")?.nextElementSibling, text("description"));
    const roles = marker.querySelectorAll<HTMLAnchorElement>("a[href^='/careers/']");
    items("roles").forEach((role, index) => {
      const labels = roles[index]?.querySelectorAll("p");
      setElementText(labels?.[0], stringValue(role.title));
      setElementText(labels?.[1], stringValue(role.location));
    });
    return true;
  }

  if (type === "CareerCenters") {
    setElementText(marker.querySelector("h2"), text("heading"));
    return true;
  }

  if (type === "CareerTeamStories") {
    setCareerSplitHeading(marker.querySelector("h2"), text("headingPrefix"), [text("headingHighlight")]);
    setElementText(marker.querySelector("h2")?.nextElementSibling, text("description"));
    const stories = items("stories");
    const cards = marker.querySelectorAll<HTMLElement>(".animate-marquee > div");
    cards.forEach((card, index) => {
      const story = stories[index % stories.length];
      if (!story) return;
      const labels = card.querySelectorAll("p");
      setElementText(labels[0], stringValue(story.quote));
      setElementText(labels[1], stringValue(story.name));
      setElementText(labels[2], stringValue(story.role));
    });
    return true;
  }

  if (type === "CareerValues") {
    setCareerSplitHeading(marker.querySelector("h2"), text("headingPrefix"), [text("headingHighlight")]);
    setElementText(marker.querySelector("h2")?.nextElementSibling, text("description"));
    const value = items("values")[0];
    if (value) {
      setElementText(marker.querySelector("h3"), stringValue(value.title));
      setElementText(marker.querySelector("h3")?.nextElementSibling, stringValue(value.body));
    }
    return true;
  }

  if (type === "CareerFAQ") {
    setCareerSplitHeading(marker.querySelector("h2"), text("headingPrefix"), [text("headingHighlight")]);
    setElementText(marker.querySelector("h2")?.nextElementSibling, text("description"));
    const faqs = items("faqs");
    const cards = marker.querySelectorAll<HTMLElement>(".space-y-3 > div");
    faqs.forEach((faq, index) => {
      const question = cards[index]?.querySelector("button span");
      setElementText(question, stringValue(faq.question));
      setElementText(cards[index]?.querySelector("p"), stringValue(faq.answer));
    });
    return true;
  }

  if (type === "CareersCTA") {
    setCareerSplitHeading(marker.querySelector("h2"), text("headingPrefix"), [text("headingHighlight")]);
    setElementText(marker.querySelector("h2")?.nextElementSibling, text("description"));
    const cta = marker.querySelector<HTMLAnchorElement>("a[href^='mailto:']");
    setElementText(cta, text("ctaLabel"));
    if (cta && text("email")) cta.href = `mailto:${text("email")}`;
    return true;
  }

  return false;
}

function markCareersPreviewSections(main: HTMLElement) {
  const blocks = [
    ["careers-hero", "CareersHero"],
    ["careers-statistics", "CareerStatistics"],
    ["careers-tracks", "CareerTracks"],
    ["careers-open-roles", "CareerOpenRoles"],
    ["careers-centers", "CareerCenters"],
    ["careers-team-stories", "CareerTeamStories"],
    ["careers-values", "CareerValues"],
    ["careers-faq", "CareerFAQ"],
    ["careers-cta", "CareersCTA"],
  ] as const;
  const sections = Array.from(main.querySelectorAll<HTMLElement>(":scope > section"));
  blocks.forEach(([id, type], index) => {
    const section = sections[index];
    if (!section) return;
    section.dataset.adminBlockId = id;
    section.dataset.adminBlockType = type;
  });
}

function setCareerSplitHeading(heading: Element | null, prefix?: string, highlights: Array<string | undefined> = []) {
  if (!heading) return;
  const textNode = Array.from(heading.childNodes).find((node) => node.nodeType === Node.TEXT_NODE);
  if (textNode && prefix) textNode.textContent = prefix;
  const spans = heading.querySelectorAll("span");
  highlights.forEach((value, index) => setElementText(spans[index], value));
}

function setElementText(element: Element | null | undefined, value?: string) {
  if (element && value) element.textContent = value;
}

function stringValue(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function markGenericPreviewSections(main: HTMLElement | null) {
  if (!main || main.querySelector("[data-admin-block-id]") || main.hasAttribute("data-admin-draft-root")) return;

  const slug = window.location.pathname.replace(/^\/+|\/+$/g, "") || "home";
  if (slug === "home" || slug === "about") return;
  if (slug === "careers") {
    markCareersPreviewSections(main);
    return;
  }
  const prefix = slug.replace(/\//g, "-");
  main.dataset.adminBlockId = `${prefix}-hero`;
  main.dataset.adminBlockType = "PageHero";

  main.querySelectorAll<HTMLElement>("section").forEach((section, index) => {
    if (section.dataset.adminBlockId) return;
    section.dataset.adminBlockId = `${prefix}-section-${index + 1}`;
    section.dataset.adminBlockType = "PageSection";
  });
}

function findPreviewMarker(blockId?: string | null, blockType?: string | null): HTMLElement | undefined {
  const markers = Array.from(document.querySelectorAll<HTMLElement>("[data-admin-block-id]"));
  return (
    markers.find((element) => Boolean(blockId) && element.dataset.adminBlockId === blockId) ??
    markers.find((element) => Boolean(blockType) && element.dataset.adminBlockType === blockType)
  );
}

function applyMarkedFields(marker: HTMLElement, props: Record<string, unknown>) {
  marker.querySelectorAll<HTMLElement>("[data-admin-field]").forEach((element) => {
    const field = element.dataset.adminField;
    const value = field ? props[field] : undefined;
    if (typeof value !== "string") return;
    if (element instanceof HTMLAnchorElement && field === "ctaHref") {
      element.href = value;
      return;
    }
    setMarkedValue(element, field, value);
  });
}

const previewListTemplates = new WeakMap<HTMLElement, HTMLElement>();
const previewListContainers = new WeakMap<HTMLElement, HTMLElement>();

function preparePreviewListItem(listName: string, item: HTMLElement) {
  if (listName !== "members") return;

  const image = item.querySelector<HTMLImageElement>('[data-admin-list-field="image"]');
  if (image) {
    image.removeAttribute("src");
    image.style.visibility = "hidden";
    image.parentElement?.style.setProperty("background-color", "#3a5070");
  }

  const role = item.querySelector<HTMLElement>('[data-admin-list-field="role"]');
  if (role && !item.querySelector('[data-admin-list-field="experience"]')) {
    const experience = document.createElement("p");
    experience.className = "text-xs text-white/60";
    experience.dataset.adminListField = "experience";
    role.insertAdjacentElement("afterend", experience);
  }
}

function syncPreviewList(marker: HTMLElement, props: Record<string, unknown>, listName: string) {
  const list = props[listName];
  if (!Array.isArray(list)) return;

  const items = Array.from(
    marker.querySelectorAll<HTMLElement>(`[data-admin-list="${listName}"]`),
  );
  const container = previewListContainers.get(marker) ?? items[0]?.parentElement ?? null;
  if (!container) return;
  previewListContainers.set(marker, container);

  let template = previewListTemplates.get(marker);
  if (!template && items[0]) {
    template = items[0].cloneNode(true) as HTMLElement;
    previewListTemplates.set(marker, template);
  }
  if (!template) return;

  while (items.length > list.length) {
    items.pop()?.remove();
  }

  while (items.length < list.length) {
    const item = template.cloneNode(true) as HTMLElement;
    item.dataset.adminList = listName;
    item.dataset.adminListIndex = String(items.length);
    preparePreviewListItem(listName, item);
    container.appendChild(item);
    items.push(item);
  }

  items.forEach((item, index) => {
    item.dataset.adminListIndex = String(index);
  });
}

function applyMarkedLists(marker: HTMLElement, props: Record<string, unknown>) {
  if (marker.dataset.adminBlockType === "AboutValues") {
    syncPreviewList(marker, props, "values");
  }
  if (marker.dataset.adminBlockType === "AboutTeam") {
    syncPreviewList(marker, props, "members");
  }

  marker.querySelectorAll<HTMLElement>("[data-admin-list]").forEach((itemElement) => {
    const listName = itemElement.dataset.adminList;
    const index = Number(itemElement.dataset.adminListIndex);
    const list = listName ? props[listName] : undefined;
    const item = Array.isArray(list) && Number.isInteger(index) ? list[index] : undefined;
    if (!isRecord(item)) return;

    itemElement.querySelectorAll<HTMLElement>("[data-admin-list-field]").forEach((element) => {
      const field = element.dataset.adminListField;
      const value = field ? item[field] : undefined;
      if (typeof value === "string") {
        setMarkedValue(element, field, value || markedListPlaceholder(listName, field, index));
      }
    });
    applyNestedMarkedLists(itemElement, item);
  });
}

function markedListPlaceholder(listName: string | undefined, field: string | undefined, index: number): string {
  if (listName === "values") {
    return field === "title" ? `New value ${index + 1}` : "Add value description";
  }
  if (listName === "members") {
    if (field === "name") return `Team member ${index + 1}`;
    if (field === "role") return "Add role";
    if (field === "experience") return "Add experience";
    if (field === "bio") return "Add team member bio";
  }
  return "Add content";
}

function applyNestedMarkedLists(itemElement: HTMLElement, item: Record<string, unknown>) {
  itemElement.querySelectorAll<HTMLElement>("[data-admin-list-child]").forEach((listElement) => {
    const listName = listElement.dataset.adminListChild;
    const list = listName ? item[listName] : undefined;
    if (!Array.isArray(list)) return;

    listElement.querySelectorAll<HTMLElement>("[data-admin-list-child-index]").forEach((childElement) => {
      const index = Number(childElement.dataset.adminListChildIndex);
      const child = Number.isInteger(index) ? list[index] : undefined;
      if (!isRecord(child)) return;

      childElement.querySelectorAll<HTMLElement>("[data-admin-list-child-field]").forEach((element) => {
        const field = element.dataset.adminListChildField;
        const value = field ? child[field] : undefined;
        if (typeof value === "string") setMarkedValue(element, field, value);
      });
    });
  });
}

// Asset SEO fields describe a file. They must not replace the production
// element, or the admin preview stops matching the deployed site.
function isAssetDescriptionField(field: string | undefined): boolean {
  if (!field) return false;
  return field === "alt" || field.endsWith("Alt") || field.endsWith("Decorative") || field.endsWith("Thumbnail") || field.endsWith("Transcript");
}

function setMarkedValue(element: HTMLElement, field: string | undefined, value: string) {
  if (isAssetDescriptionField(field)) {
    const image = element instanceof HTMLImageElement ? element : element.querySelector("img");
    if (image instanceof HTMLImageElement && field && (field === "alt" || field.endsWith("Alt"))) {
      image.alt = value;
    }
    return;
  }
  if (element instanceof HTMLImageElement) {
    if (value.trim()) {
      element.src = value;
      element.style.visibility = "visible";
      element.parentElement?.style.removeProperty("background-color");
    } else {
      element.removeAttribute("src");
      element.style.visibility = "hidden";
      element.parentElement?.style.setProperty("background-color", "#3a5070");
    }
    return;
  }
  // A heading that wraps a highlighted span must keep that structure.
  // Replacing the whole element with text flattens the deployed layout.
  if (element.children.length > 0) return;
  element.textContent = value;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
