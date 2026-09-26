"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminPreviewSection from "@/components/AdminPreviewSection";
import { previewList, previewText, useAdminPreviewBlock } from "@/components/PreviewDraft";
import { usePublishedBlock } from "@/components/PublishedContent";
import { applyAssetMeta, assetAlt } from "@/lib/asset-label";

type PostDraft = {
  slug?: string;
  title?: string;
  summary?: string;
  coverImage?: string;
  tags?: string;
  authorName?: string;
  authorAvatar?: string;
  publishedAt?: string;
  readMinutes?: string;
};

const EMPTY_POST: PostDraft = {
  slug: "new-post",
  title: "New post",
  summary: "Add a short summary",
  coverImage: "",
  tags: "",
  authorName: "Author name",
  authorAvatar: "",
  publishedAt: "",
  readMinutes: "5",
};

function displayValue(value: string | undefined, placeholder: string): string {
  return value?.trim() || placeholder;
}

function resolvePosts(items: PostDraft[]): PostDraft[] {
  return items.map((item, index) => ({
    slug: displayValue(item.slug, `${EMPTY_POST.slug}-${index + 1}`),
    title: displayValue(item.title, EMPTY_POST.title!),
    summary: displayValue(item.summary, EMPTY_POST.summary!),
    coverImage: item.coverImage?.trim() || "",
    tags: item.tags?.trim() || "",
    authorName: displayValue(item.authorName, EMPTY_POST.authorName!),
    authorAvatar: item.authorAvatar?.trim() || "",
    publishedAt: item.publishedAt?.trim() || "",
    readMinutes: displayValue(item.readMinutes, EMPTY_POST.readMinutes!),
  }));
}

function formatDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function visibleTags(tags: string | undefined): string[] {
  return (tags ?? "").split(",").map((tag) => tag.trim()).filter(Boolean).slice(0, 2);
}

export default function BlogContent({ posts }: { posts: PostDraft[] }) {
  const heroDraft = useAdminPreviewBlock("blog-hero", "BlogHero");
  const postsDraft = useAdminPreviewBlock("blog-posts", "BlogPosts");
  const publishedPosts = usePublishedBlock("blog-posts");

  const visiblePosts = resolvePosts(applyAssetMeta(previewList<PostDraft>(postsDraft, "posts", posts), publishedPosts?.props?.posts, ["coverImage", "authorAvatar"]));
  const headingPrefix = previewText(heroDraft, "headingPrefix", "Stance ");
  const headingHighlight = previewText(heroDraft, "headingHighlight", "Blog");
  const description = previewText(
    heroDraft,
    "description",
    "Evidence-based insights on orthopaedic rehab, sports performance, and recovery — from our clinical team.",
  );

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdminPreviewSection blockId="blog-hero" blockType="BlogHero">
            <div className="mb-12">
              <h1 className="section-title mb-3">
                <span data-admin-field="headingPrefix">{headingPrefix}</span>
                <span data-admin-field="headingHighlight">{headingHighlight}</span>
              </h1>
              <p data-admin-field="description" className="text-white/60 text-lg max-w-2xl">
                {description}
              </p>
            </div>
          </AdminPreviewSection>

          <AdminPreviewSection blockId="blog-posts" blockType="BlogPosts">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visiblePosts.map((post, index) => (
                <Link
                  key={`${post.slug}-${index}`}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col bg-[#1a3358] rounded-2xl overflow-hidden border border-white/5 hover:border-[#cdfe71]/40 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(205,254,113,0.08)] transition-all duration-300"
                  data-admin-list="posts"
                  data-admin-list-index={index}
                >
                  {post.coverImage ? (
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={post.coverImage}
                        alt={assetAlt(post, "coverImage", post.title ?? "")}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        data-admin-list-field="coverImage"
                      />
                    </div>
                  ) : (
                    <div data-admin-list-field="coverImage" className="aspect-[16/9] bg-[#132644]" aria-label="Cover image placeholder" />
                  )}
                  <div className="flex flex-col flex-1 p-5 gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {visibleTags(post.tags).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#cdfe71]/10 text-[#cdfe71]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 data-admin-list-field="title" className="text-base font-semibold text-white group-hover:text-[#cdfe71] transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p data-admin-list-field="summary" className="text-white/50 text-sm leading-relaxed line-clamp-3 flex-1">
                      {post.summary}
                    </p>
                    <div className="flex items-center gap-2 pt-3 border-t border-white/5 mt-auto">
                      {post.authorAvatar ? (
                        <Image
                          src={post.authorAvatar}
                          alt={assetAlt(post, "authorAvatar", post.authorName ?? "")}
                          width={28}
                          height={28}
                          className="rounded-full bg-[#132644]"
                          data-admin-list-field="authorAvatar"
                        />
                      ) : (
                        <div data-admin-list-field="authorAvatar" className="h-7 w-7 rounded-full bg-[#132644]" aria-label="Author photo placeholder" />
                      )}
                      <div>
                        <p data-admin-list-field="authorName" className="text-xs font-medium text-white/80">{post.authorName}</p>
                        <p className="text-xs text-white/40">
                          <span data-admin-list-field="publishedAt">{post.publishedAt ? formatDate(post.publishedAt) : "Add a date"}</span>
                          {" · "}
                          <span data-admin-list-field="readMinutes">{post.readMinutes}</span>
                          {" min"}
                        </p>
                      </div>
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
