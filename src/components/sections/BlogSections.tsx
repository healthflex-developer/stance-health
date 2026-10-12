"use client";

import Image from "next/image";
import Link from "next/link";
import { usePreviewProps } from "@/components/preview/usePreviewDraft";
import { blogCardHref, blogDate, blogTags } from "@/lib/blog-links";
import { previewAsset, previewList, previewString } from "@/lib/preview-draft";

export type BlogCard = {
  slug: string;
  title: string;
  summary: string;
  coverImage: string;
  tags: string;
  authorName: string;
  authorAvatar: string;
  publishedAt: string;
  readMinutes: string;
};

export function BlogHeroSection({ sourceType = "BlogHero" }: { sourceType?: string }) {
  const hero = usePreviewProps(sourceType);
  return (
    <section className="pt-24" data-preview-block={sourceType}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="section-title mb-3">
            {previewString(hero?.headingPrefix, "Stance ")}
            <span>{previewString(hero?.headingHighlight, "Blog")}</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl">
            {previewString(hero?.description, "Evidence-based insights on orthopaedic rehab, sports performance, and recovery — from our clinical team.")}
          </p>
        </div>
      </div>
    </section>
  );
}

export function BlogPostsSection({
  posts,
  sourceType = "BlogPosts",
}: {
  posts: BlogCard[];
  sourceType?: string;
}) {
  const draft = usePreviewProps(sourceType);
  const items = previewList(draft?.posts, posts);

  return (
    <section className="pb-20" data-preview-block={sourceType}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((post, index) => {
            const title = previewString(post.title, "Enter heading");
            const cover = previewAsset(post.coverImage, "/placeholders/image.svg");
            const avatar = previewAsset(post.authorAvatar, "/placeholders/image.svg");
            const tags = blogTags(post.tags).slice(0, 2);
            const minutes = previewString(post.readMinutes, "");
            return (
              <Link
                key={`${post.slug || "post"}-${index}`}
                href={blogCardHref(post)}
                data-preview-field={`posts[${index}].title`}
                className="group flex flex-col bg-[#1a3358] rounded-2xl overflow-hidden border border-white/5 hover:border-[#cdfe71]/40 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(205,254,113,0.08)] transition-all duration-300"
              >
                <div className="relative aspect-[16/9]">
                  <Image src={cover} alt={title} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                </div>
                <div className="flex flex-col flex-1 p-5 gap-3">
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {tags.map((tag) => (
                        <span key={tag} className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#cdfe71]/10 text-[#cdfe71]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <h3 className="text-base font-semibold text-white group-hover:text-[#cdfe71] transition-colors leading-snug">
                    {title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed line-clamp-3 flex-1">
                    {previewString(post.summary, "Enter description")}
                  </p>
                  <div className="flex items-center gap-2 pt-3 border-t border-white/5 mt-auto">
                    <Image src={avatar} alt={previewString(post.authorName, "Author")} width={28} height={28} className="rounded-full bg-[#132644]" />
                    <div>
                      <p className="text-xs font-medium text-white/80">{previewString(post.authorName, "Enter name")}</p>
                      <p className="text-xs text-white/40">
                        {blogDate(post.publishedAt)}{minutes ? ` · ${minutes} min` : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function BlogSections({ posts }: { posts: BlogCard[] }) {
  return (
    <main className="min-h-screen">
      <BlogHeroSection />
      <BlogPostsSection posts={posts} />
    </main>
  );
}
