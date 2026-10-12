"use client";

import { createContext, useContext, useSyncExternalStore } from "react";
import {
  getPreviewBlocks,
  getServerPreviewBlocks,
  subscribePreviewDraft,
  type PreviewBlock,
} from "@/lib/preview-draft";

export const PreviewBlocksContext = createContext<PreviewBlock[] | null>(null);

export function usePreviewBlocks(): PreviewBlock[] {
  return useSyncExternalStore(subscribePreviewDraft, getPreviewBlocks, getServerPreviewBlocks);
}

export function usePreviewProps(type: string): Record<string, unknown> | null {
  const scoped = useContext(PreviewBlocksContext);
  const live = usePreviewBlocks();
  const blocks = scoped ?? live;
  return blocks.find((block) => block.type === type)?.props ?? null;
}
