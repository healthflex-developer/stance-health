"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminPreviewSection from "@/components/AdminPreviewSection";
import ArticleSections from "@/components/detail/ArticleSections";
import { previewList, previewText, useAdminPreviewBlock } from "@/components/PreviewDraft";

type Section = { type?: string; content?: string; items?: { text?: string }[] };

export type ResourceArticleData = {
  backLabel: string;
  format: string;
  conditionLabel: string;
  conditionHref: string;
  title: string;
  summary: string;
  publishedAt: string;
  reviewStatus: string;
  sections: Section[];
  relatedLabel: string;
  relatedTitle: string;
  relatedHref: string;
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

export default function ResourceArticleView({ data }: { data: ResourceArticleData }) {
  const article = useAdminPreviewBlock("resource-article", "ResourceArticle");
  const body = useAdminPreviewBlock("resource-body", "ResourceBody");
  const cta = useAdminPreviewBlock("resource-cta", "ResourceCta");
  const sections = previewList<Section>(body, "sections", data.sections);
  const conditionHref = previewText(article, "conditionHref", data.conditionHref);
  const relatedHref = previewText(cta, "relatedHref", data.relatedHref);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdminPreviewSection blockId="resource-article" blockType="ResourceArticle">
            <Link href="/resources" data-admin-field="backLabel" className="inline-flex text-sm text-white/40 hover:text-[#cdfe71] mb-8">{previewText(article, "backLabel", data.backLabel)}</Link>
            <div className="flex flex-wrap gap-2 mb-4">
              <span data-admin-field="format" className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#cdfe71]/10 text-[#cdfe71]">{previewText(article, "format", data.format)}</span>
              {conditionHref && (
                <Link href={conditionHref} data-admin-field="conditionLabel" className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/5 text-white/60 hover:text-[#cdfe71]">{previewText(article, "conditionLabel", data.conditionLabel)}</Link>
              )}
            </div>
            <h1 data-admin-field="title" className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">{previewText(article, "title", data.title)}</h1>
            <p data-admin-field="summary" className="text-white/60 text-lg leading-relaxed mb-6">{previewText(article, "summary", data.summary)}</p>
            <div className="mb-10 pb-8 border-b border-white/10 text-right">
              <p data-admin-field="publishedAt" className="text-xs text-white/40">{formatDate(previewText(article, "publishedAt", data.publishedAt))}</p>
              <p data-admin-field="reviewStatus" className="text-xs text-white/30 capitalize">{previewText(article, "reviewStatus", data.reviewStatus)}</p>
            </div>
          </AdminPreviewSection>
          <AdminPreviewSection blockId="resource-body" blockType="ResourceBody">
            <ArticleSections sections={sections} />
          </AdminPreviewSection>
          <AdminPreviewSection blockId="resource-cta" blockType="ResourceCta">
            {relatedHref && (
              <div className="mt-10 p-5 rounded-xl bg-[#1a3358] border border-white/5">
                <p data-admin-field="relatedLabel" className="text-xs text-white/40 uppercase tracking-wider mb-2">{previewText(cta, "relatedLabel", data.relatedLabel)}</p>
                <Link href={relatedHref} data-admin-field="relatedTitle" className="text-sm font-semibold text-white hover:text-[#cdfe71]">{previewText(cta, "relatedTitle", data.relatedTitle)}</Link>
              </div>
            )}
            <div className="mt-10 bg-[#1a3358] rounded-2xl p-8 border border-white/5 text-center">
              <h3 className="text-xl font-bold text-white mb-2">
                <span data-admin-field="headingPrefix">{previewText(cta, "headingPrefix", data.ctaHeadingPrefix)}</span>
                <span data-admin-field="headingHighlight" className="text-[#cdfe71]">{previewText(cta, "headingHighlight", data.ctaHeadingHighlight)}</span>?
              </h3>
              <p data-admin-field="description" className="text-white/60 text-sm mb-6">{previewText(cta, "description", data.ctaDescription)}</p>
              <a data-admin-field="ctaLabel" href={previewText(cta, "ctaHref", data.ctaHref)} target="_blank" rel="noopener noreferrer" className="booking-cta inline-block bg-white text-[#132644] font-bold px-8 py-3 rounded-full">{previewText(cta, "ctaLabel", data.ctaLabel)}</a>
            </div>
          </AdminPreviewSection>
        </div>
      </main>
      <Footer />
    </>
  );
}
