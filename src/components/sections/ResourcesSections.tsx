"use client";

import Link from "next/link";
import { usePreviewProps } from "@/components/preview/usePreviewDraft";
import { previewList, previewString } from "@/lib/preview-draft";
import { resourceCardHref, resourceDate, resourceFormatLabel } from "@/lib/resource-links";

export type ResourceCard = {
  slug: string;
  title: string;
  summary: string;
  contentFormat: string;
  publishedAt: string;
  href?: string;
};

export function ResourcesHeroSection() {
  const props = usePreviewProps("ResourcesHero");
  return (
    <div className="mb-12" data-preview-block="ResourcesHero">
      <p className="text-[#cdfe71] text-sm font-semibold uppercase tracking-widest mb-3" data-preview-field="eyebrow">
        {previewString(props?.eyebrow, "Resources")}
      </p>
      <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4" data-preview-field="heading">
        {previewString(props?.heading, "Evidence-based education")}
      </h1>
      <p className="text-white/60 text-lg max-w-2xl" data-preview-field="description">
        {previewString(props?.description, "Clinical guides, explainers, and performance articles from the Stance Health team. Built to help you understand your body and make better decisions.")}
      </p>
    </div>
  );
}

export function ResourceListSection({ resources }: { resources: ResourceCard[] }) {
  const props = usePreviewProps("ResourceList");
  const cards = previewList<ResourceCard>(props?.resources, resources);
  return (
    <div data-preview-block="ResourceList">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {cards.map((resource, index) => (
          <Link
            key={`${resource.slug}-${index}`}
            href={resourceCardHref(resource)}
            className="group flex flex-col p-5 rounded-2xl bg-[#1a3358] border border-white/5 hover:border-[#cdfe71]/40 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(205,254,113,0.08)] transition-all duration-300"
          >
            <div className="mb-3">
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#cdfe71]/10 text-[#cdfe71]">
                {resourceFormatLabel(resource.contentFormat)}
              </span>
            </div>
            <h2 className="text-base font-semibold text-white group-hover:text-[#cdfe71] transition-colors mb-2 flex-1" data-preview-field={`resources[${index}].title`}>
              {resource.title}
            </h2>
            <p className="text-sm text-white/50 leading-relaxed line-clamp-2 mb-4">{resource.summary}</p>
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
              <span className="text-xs text-white/40">{resourceDate(resource.publishedAt)}</span>
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
    </div>
  );
}

export function ResourcesSections({ resources }: { resources: ResourceCard[] }) {
  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ResourcesHeroSection />
        <ResourceListSection resources={resources} />
      </div>
    </main>
  );
}
