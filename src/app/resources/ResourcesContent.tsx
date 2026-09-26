"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminPreviewSection from "@/components/AdminPreviewSection";
import { previewList, previewText, useAdminPreviewBlock } from "@/components/PreviewDraft";

type ResourceDraft = {
  slug?: string;
  title?: string;
  summary?: string;
  contentFormat?: string;
  publishedAt?: string;
};

const FORMAT_LABELS: Record<string, string> = {
  explainer: "Explainer",
  guide: "Guide",
  "reel article": "Article",
  myth: "Myth Buster",
  case: "Case Study",
  FAQ: "FAQ",
  "performance article": "Performance",
};

const EMPTY_RESOURCE: ResourceDraft = {
  slug: "new-resource",
  title: "New resource",
  summary: "Add a short summary",
  contentFormat: "explainer",
  publishedAt: "",
};

function displayValue(value: string | undefined, placeholder: string): string {
  return value?.trim() || placeholder;
}

function resolveResources(items: ResourceDraft[]): ResourceDraft[] {
  return items.map((item, index) => ({
    slug: displayValue(item.slug, `${EMPTY_RESOURCE.slug}-${index + 1}`),
    title: displayValue(item.title, EMPTY_RESOURCE.title!),
    summary: displayValue(item.summary, EMPTY_RESOURCE.summary!),
    contentFormat: displayValue(item.contentFormat, EMPTY_RESOURCE.contentFormat!),
    publishedAt: item.publishedAt?.trim() || "",
  }));
}

function formatDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ResourcesContent({ resources }: { resources: ResourceDraft[] }) {
  const heroDraft = useAdminPreviewBlock("resources-hero", "ResourcesHero");
  const listDraft = useAdminPreviewBlock("resources-list", "ResourceList");

  const visibleResources = resolveResources(previewList<ResourceDraft>(listDraft, "resources", resources)).sort(
    (a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime(),
  );
  const eyebrow = previewText(heroDraft, "eyebrow", "Resources");
  const heading = previewText(heroDraft, "heading", "Evidence-based education");
  const description = previewText(
    heroDraft,
    "description",
    "Clinical guides, explainers, and performance articles from the Stance Health team. Built to help you understand your body and make better decisions.",
  );

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdminPreviewSection blockId="resources-hero" blockType="ResourcesHero">
            <div className="mb-12">
              <p data-admin-field="eyebrow" className="text-[#cdfe71] text-sm font-semibold uppercase tracking-widest mb-3">
                {eyebrow}
              </p>
              <h1 data-admin-field="heading" className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
                {heading}
              </h1>
              <p data-admin-field="description" className="text-white/60 text-lg max-w-2xl">
                {description}
              </p>
            </div>
          </AdminPreviewSection>

          <AdminPreviewSection blockId="resources-list" blockType="ResourceList">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {visibleResources.map((resource, index) => (
                <Link
                  key={`${resource.slug}-${index}`}
                  href={`/resources/${resource.slug}`}
                  className="group flex flex-col p-5 rounded-2xl bg-[#1a3358] border border-white/5 hover:border-[#cdfe71]/40 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(205,254,113,0.08)] transition-all duration-300"
                  data-admin-list="resources"
                  data-admin-list-index={index}
                >
                  <div className="mb-3">
                    <span data-admin-list-field="contentFormat" className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#cdfe71]/10 text-[#cdfe71]">
                      {FORMAT_LABELS[resource.contentFormat ?? ""] ?? resource.contentFormat}
                    </span>
                  </div>
                  <h2 data-admin-list-field="title" className="text-base font-semibold text-white group-hover:text-[#cdfe71] transition-colors mb-2 flex-1">
                    {resource.title}
                  </h2>
                  <p data-admin-list-field="summary" className="text-sm text-white/50 leading-relaxed line-clamp-2 mb-4">
                    {resource.summary}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
                    <span data-admin-list-field="publishedAt" className="text-xs text-white/40">
                      {resource.publishedAt ? formatDate(resource.publishedAt) : "Add a date"}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-[#cdfe71]/70 group-hover:text-[#cdfe71] transition-colors">
                      <span>Read</span>
                      <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </AdminPreviewSection>
        </div>
      </main>
      <Footer />
    </>
  );
}
