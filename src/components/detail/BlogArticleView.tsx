"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminPreviewSection from "@/components/AdminPreviewSection";
import ArticleSections from "@/components/detail/ArticleSections";
import { previewList, previewText, useAdminPreviewBlock } from "@/components/PreviewDraft";
import { ensureWebsiteBookingSource } from "@/lib/tracking";

type Tag = { text?: string };
type Section = { type?: string; content?: string; items?: { text?: string }[] };

export type BlogArticleData = {
  backLabel: string;
  tags: { text: string }[];
  title: string;
  summary: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  publishedAt: string;
  readMinutes: string;
  coverImage: string;
  sections: Section[];
  ctaHeadingPrefix: string;
  ctaHeadingHighlight: string;
  ctaDescription: string;
  ctaLabel: string;
  ctaHref: string;
};

function formatDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogArticleView({ data }: { data: BlogArticleData }) {
  const article = useAdminPreviewBlock("blog-article", "BlogArticle");
  const body = useAdminPreviewBlock("blog-body", "BlogBody");
  const cta = useAdminPreviewBlock("blog-cta", "BlogCta");
  const tags = previewList<Tag>(article, "tags", data.tags);
  const sections = previewList<Section>(body, "sections", data.sections);
  const publishedAt = previewText(article, "publishedAt", data.publishedAt);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdminPreviewSection blockId="blog-article" blockType="BlogArticle">
            <Link href="/blog" data-admin-field="backLabel" className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-[#cdfe71] mb-8">{previewText(article, "backLabel", data.backLabel)}</Link>
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, index) => (
                <span key={index} data-admin-list="tags" data-admin-list-index={index} data-admin-list-field="text" className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#cdfe71]/10 text-[#cdfe71]">{tag.text}</span>
              ))}
            </div>
            <h1 data-admin-field="title" className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">{previewText(article, "title", data.title)}</h1>
            <p data-admin-field="summary" className="text-white/60 text-lg leading-relaxed mb-6">{previewText(article, "summary", data.summary)}</p>
            <div className="flex items-center gap-3 mb-8 pb-8 border-b border-white/10">
              <Image src={previewText(article, "authorAvatar", data.authorAvatar) || data.authorAvatar} alt={previewText(article, "authorName", data.authorName)} width={44} height={44} className="rounded-full bg-[#132644]" />
              <div>
                <p data-admin-field="authorName" className="text-sm font-semibold text-white">{previewText(article, "authorName", data.authorName)}</p>
                <p data-admin-field="authorRole" className="text-xs text-white/40">{previewText(article, "authorRole", data.authorRole)}</p>
              </div>
              <div className="ml-auto text-right">
                <p data-admin-field="publishedAt" className="text-xs text-white/40">{formatDate(publishedAt)}</p>
                <p className="text-xs text-white/40"><span data-admin-field="readMinutes">{previewText(article, "readMinutes", data.readMinutes)}</span> min read</p>
              </div>
            </div>
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10">
              <Image src={previewText(article, "coverImage", data.coverImage) || data.coverImage} alt={previewText(article, "title", data.title)} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" priority />
            </div>
          </AdminPreviewSection>
          <AdminPreviewSection blockId="blog-body" blockType="BlogBody">
            <ArticleSections sections={sections} />
          </AdminPreviewSection>
          <AdminPreviewSection blockId="blog-cta" blockType="BlogCta">
            <div className="mt-16 bg-[#1a3358] rounded-2xl p-8 border border-white/5 text-center">
              <h3 className="text-xl font-bold text-white mb-2">
                <span data-admin-field="headingPrefix">{previewText(cta, "headingPrefix", data.ctaHeadingPrefix)}</span>
                <span data-admin-field="headingHighlight" className="text-[#cdfe71]">{previewText(cta, "headingHighlight", data.ctaHeadingHighlight)}</span>?
              </h3>
              <p data-admin-field="description" className="text-white/60 text-sm mb-6">{previewText(cta, "description", data.ctaDescription)}</p>
              <a data-admin-field="ctaLabel" href={ensureWebsiteBookingSource(previewText(cta, "ctaHref", data.ctaHref))} target="_blank" rel="noopener noreferrer" className="booking-cta inline-block bg-white text-[#132644] font-bold px-8 py-3 rounded-full">{previewText(cta, "ctaLabel", data.ctaLabel)}</a>
            </div>
          </AdminPreviewSection>
        </div>
      </main>
      <Footer />
    </>
  );
}
