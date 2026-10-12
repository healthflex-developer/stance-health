"use client";

import { useLayoutEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SectionForType } from "@/components/composed/SectionRegistry";
import { getPreviewBlocks, setPreviewDraft, type PreviewBlock } from "@/lib/preview-draft";
import { contentBlocks } from "@/lib/preview-sync";
import { PreviewBlocksContext, usePreviewBlocks } from "@/components/preview/usePreviewDraft";

export default function ComposedSitePage({
  slug,
  initialBlocks,
}: {
  slug: string;
  title?: string;
  initialBlocks: PreviewBlock[];
}) {
  const live = usePreviewBlocks();

  useLayoutEffect(() => {
    if (getPreviewBlocks().length > 0 || initialBlocks.length === 0) return;
    setPreviewDraft(initialBlocks);
  }, [initialBlocks]);

  const blocks = contentBlocks(live.length > 0 ? live : initialBlocks);

  return (
    <PreviewBlocksContext.Provider value={blocks}>
      <Navbar />
      <main data-composed-page={slug}>
        {blocks.map((block, index) => (
          <div key={block.id || `${block.type}-${index}`} data-preview-block={block.type} data-preview-id={block.id}>
            <SectionForType type={block.type} />
          </div>
        ))}
      </main>
      <Footer />
    </PreviewBlocksContext.Provider>
  );
}
