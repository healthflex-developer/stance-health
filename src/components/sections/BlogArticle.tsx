"use client";

import Image from "next/image";
import Link from "next/link";
import { PreviewCta } from "@/components/preview/PreviewCta";
import { usePreviewProps } from "@/components/preview/usePreviewDraft";
import { blogDate, blogTags } from "@/lib/blog-links";
import { buttonDestination } from "@/lib/button-destination";
import { previewAsset, previewList, previewString } from "@/lib/preview-draft";

export type BlogArticleData = {
  title: string;
  summary: string;
  tags: string[];
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  publishedAt: string;
  readMinutes: string;
  coverImage: string;
  sections: Array<{ type: string; content?: string; items?: string[] }>;
  ctaHref: string;
};

const PLACEHOLDER: BlogArticleData = {
  title: "Enter heading",
  summary: "Enter description",
  tags: ["Enter heading"],
  authorName: "Enter name",
  authorRole: "Enter role",
  authorAvatar: "/placeholders/image.svg",
  publishedAt: "Enter date",
  readMinutes: "1",
  coverImage: "/placeholders/image.svg",
  sections: [{ type: "paragraph", content: "Enter description" }],
  ctaHref: "#",
};

function listItems(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (typeof item === "string" && item.trim()) return [item];
    if (item && typeof item === "object" && "text" in item && typeof item.text === "string") return [item.text];
    return [];
  });
}

export function BlogArticleHeader({ article }: { article: BlogArticleData | null }) {
  const draft = usePreviewProps("BlogArticle");
  const fallback = article ?? PLACEHOLDER;
  const title = previewString(draft?.title, fallback.title);
  const tags = blogTags(draft?.tags).length > 0 ? blogTags(draft?.tags) : fallback.tags;
  const avatar = previewAsset(draft?.authorAvatar, fallback.authorAvatar);
  const cover = previewAsset(draft?.coverImage, fallback.coverImage);
  const minutes = previewString(draft?.readMinutes, fallback.readMinutes);
  return (
    <section className="pt-24" data-preview-block="BlogArticle">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-[#cdfe71] transition-colors mb-8">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {previewString(draft?.backLabel, "All articles")}
        </Link>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#cdfe71]/10 text-[#cdfe71]">{tag}</span>
          ))}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4" data-preview-field="title">{title}</h1>
        <p className="text-white/60 text-lg leading-relaxed mb-6">{previewString(draft?.summary, fallback.summary)}</p>
        <div className="flex items-center gap-3 mb-8 pb-8 border-b border-white/10">
          <Image src={avatar} alt={previewString(draft?.authorName, fallback.authorName)} width={44} height={44} className="rounded-full bg-[#132644]" />
          <div>
            <p className="text-sm font-semibold text-white">{previewString(draft?.authorName, fallback.authorName)}</p>
            <p className="text-xs text-white/40">{previewString(draft?.authorRole, fallback.authorRole)}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xs text-white/40">{blogDate(previewString(draft?.publishedAt, fallback.publishedAt))}</p>
            <p className="text-xs text-white/40">{minutes} min read</p>
          </div>
        </div>
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10">
          <Image src={cover} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" priority />
        </div>
      </div>
    </section>
  );
}

export function BlogBodySection({ article }: { article: BlogArticleData | null }) {
  const draft = usePreviewProps("BlogBody");
  const fallback = article?.sections ?? PLACEHOLDER.sections;
  const sections = previewList(draft?.sections, fallback.map((section) => ({
    type: section.type,
    content: section.content ?? "",
    items: section.items ?? [],
  })));
  return (
    <section className="pb-4" data-preview-block="BlogBody">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {sections.map((section, index) => {
          const content = previewString(section.content, "");
          if (section.type === "heading") {
            return <h2 key={index} className="text-xl font-bold text-[#cdfe71] mt-10 mb-3">{content || "Enter heading"}</h2>;
          }
          if (section.type === "tip") {
            return (
              <div key={index} className="my-6 flex gap-3 bg-[#cdfe71]/5 border border-[#cdfe71]/20 rounded-xl p-4">
                <span className="text-[#cdfe71] text-lg mt-0.5 flex-shrink-0">💡</span>
                <p className="text-white/80 text-sm leading-relaxed">{content || "Enter description"}</p>
              </div>
            );
          }
          if (section.type === "list") {
            const items = listItems(section.items);
            return (
              <ul key={index} className="space-y-3 my-4">
                {items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex gap-3 items-start text-white/70 text-base">
                    <svg viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0 w-5 h-5 text-[#cdfe71]">
                      <circle cx="10" cy="10" r="10" fill="currentColor" fillOpacity="0.15" />
                      <path d="M6 10.5l2.5 2.5L14 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          }
          return <p key={index} className="text-white/70 leading-relaxed text-base">{content || "Enter description"}</p>;
        })}
      </div>
    </section>
  );
}

export function BlogCtaSection({ article }: { article: BlogArticleData | null }) {
  const draft = usePreviewProps("BlogCta");
  const fallbackHref = article?.ctaHref ?? PLACEHOLDER.ctaHref;
  const href = buttonDestination(draft?.ctaHref) ?? buttonDestination(fallbackHref);
  const prefix = previewString(draft?.headingPrefix, article ? "Ready to take the " : "Enter heading");
  const highlight = previewString(draft?.headingHighlight, article ? "next step" : "Enter heading");
  return (
    <section className="pb-20" data-preview-block="BlogCta">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-16 bg-[#1a3358] rounded-2xl p-8 border border-white/5 text-center">
          <h3 className="text-xl font-bold text-white mb-2">{prefix}{prefix.endsWith(" ") ? "" : " "}<span className="text-[#cdfe71]">{highlight}</span>{article ? "?" : ""}</h3>
          <p className="text-white/60 text-sm mb-6">{previewString(draft?.description, article ? "Our clinical team is ready to build a personalised plan around your goals." : "Enter description")}</p>
          <PreviewCta className="booking-cta inline-block bg-white text-[#132644] font-bold px-8 py-3 rounded-full hover:bg-[#cdfe71] transition-all duration-200" label={previewString(draft?.ctaLabel, article ? "Book an Assessment" : "Enter button label")} href={href} />
        </div>
      </div>
    </section>
  );
}

export function BlogArticle({ article }: { article: BlogArticleData | null }) {
  return (
    <main className="min-h-screen">
      <BlogArticleHeader article={article} />
      <BlogBodySection article={article} />
      <BlogCtaSection article={article} />
    </main>
  );
}
