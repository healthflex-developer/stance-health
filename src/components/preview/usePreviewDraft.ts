"use client";

import { createContext, useContext, useSyncExternalStore } from "react";
import { PublishedBlocksContext } from "@/components/PublishedContent";
import {
  getPreviewBlocks,
  getServerPreviewBlocks,
  subscribePreviewDraft,
  type PreviewBlock,
} from "@/lib/preview-draft";
import { publishedViewProps, trailingSectionCopy, withHeroAliases } from "@/lib/published-fields";

export const PreviewBlocksContext = createContext<PreviewBlock[] | null>(null);

export function usePreviewBlocks(): PreviewBlock[] {
  return useSyncExternalStore(subscribePreviewDraft, getPreviewBlocks, getServerPreviewBlocks);
}

function publishedBlocks() {
  return Object.values(useContext(PublishedBlocksContext));
}

export function usePreviewProps(type: string): Record<string, unknown> | null {
  const scoped = useContext(PreviewBlocksContext);
  const live = usePreviewBlocks();
  const blocks = scoped ?? live;
  const draft = blocks.find((block) => block.type === type)?.props;
  if (draft) return withHeroAliases(type, draft);
  const match = publishedBlocks().find((block) => block.type === type);
  const view = publishedViewProps(match?.props);
  return view ? withHeroAliases(type, view) : null;
}

export function useHeroProps(sourceType: string): { props: Record<string, unknown> | null; marker: string } {
  const named = usePreviewProps(sourceType);
  if (named) return { props: named, marker: sourceType };
  if (sourceType !== "PageHero") {
    const pageHero = usePreviewProps("PageHero");
    if (pageHero) return { props: pageHero, marker: "PageHero" };
  }
  return { props: null, marker: sourceType };
}

export function useSectionCta(type: string): { props: Record<string, unknown> | null; marker: string } {
  const named = usePreviewProps(type);
  if (named) return { props: named, marker: type };
  const scoped = useContext(PreviewBlocksContext);
  const live = usePreviewBlocks();
  const draftBlocks = scoped ?? live;
  if (draftBlocks.length > 0) {
    const sections = draftBlocks.filter((block) => block.type === "PageSection").map((block) => block.props);
    if (sections.length < 2) return { props: null, marker: type };
    const last = sections[sections.length - 1] ?? {};
    const body = typeof last.body === "string" ? last.body : "";
    const description = typeof last.description === "string" && last.description.trim() ? last.description : body;
    return { props: { ...last, description }, marker: "PageSection" };
  }
  const sections = publishedBlocks()
    .filter((block) => block.type === "PageSection")
    .map((block) => block.props);
  const copy = trailingSectionCopy(sections);
  return { props: copy, marker: copy ? "PageSection" : type };
}
