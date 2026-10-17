"use client";

import { createContext, useContext } from "react";
import { usePreviewBlocks } from "@/components/preview/usePreviewDraft";

type ChromeProps = {
  navbar: Record<string, unknown> | null;
  footer: Record<string, unknown> | null;
};

const PublishedChromeContext = createContext<ChromeProps>({ navbar: null, footer: null });

export function PublishedChromeProvider({
  navbar,
  footer,
  children,
}: ChromeProps & { children: React.ReactNode }) {
  return <PublishedChromeContext.Provider value={{ navbar, footer }}>{children}</PublishedChromeContext.Provider>;
}

export function useChromeBlock(type: "NavbarContent" | "FooterContent"): {
  props: Record<string, unknown> | null;
  draft: boolean;
} {
  const draftProps = usePreviewBlocks().find((block) => block.type === type)?.props;
  if (draftProps) return { props: draftProps, draft: true };
  const chrome = useContext(PublishedChromeContext);
  return {
    props: type === "NavbarContent" ? chrome.navbar : chrome.footer,
    draft: false,
  };
}
