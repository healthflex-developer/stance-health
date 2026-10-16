"use client";

import { createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import type { PublishedBlock } from "@/lib/published-seo";

const PublishedBlocksContext = createContext<Record<string, PublishedBlock>>({});

export function PublishedBlocksProvider({
  blocks,
  children,
}: {
  blocks: Record<string, PublishedBlock>;
  children: React.ReactNode;
}) {
  return <PublishedBlocksContext.Provider value={blocks}>{children}</PublishedBlocksContext.Provider>;
}

export function usePublishedBlock(id: string): PublishedBlock | null {
  return useContext(PublishedBlocksContext)[id] ?? null;
}

export function PublishedJsonLd({ documents }: { documents: Record<string, unknown> }) {
  const pathname = usePathname() || "/";
  const slug = pathname === "/" ? "home" : pathname.replace(/^\/+/, "").replace(/\/$/, "");
  const data = documents[slug];
  if (!data) return null;
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
