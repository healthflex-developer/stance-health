import BlogContent from "./BlogContent";
import { getAllBlogs } from "@/lib/blogs";
import { OG_ASSETS } from "@/lib/constants";
import type { Metadata } from "next";
import { withPublishedSeo } from "@/lib/published-seo";

export const metadata: Metadata = withPublishedSeo("blog", {
  title: "Blog",
  description:
    "Insights on orthopaedic rehab, sports performance, and recovery from the Stance Health clinical team.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog – Stance Health",
    description:
      "Insights on orthopaedic rehab, sports performance, and recovery.",
    url: "/blog",
    images: [{ url: `${OG_ASSETS}/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog – Stance Health",
    description: "Insights on orthopaedic rehab, sports performance, and recovery.",
    images: [`${OG_ASSETS}/og-default.png`],
  },
});

export default async function BlogPage() {
  const blogs = await getAllBlogs();
  const posts = blogs.map((post) => ({
    slug: post.slug,
    title: post.title,
    summary: post.summary,
    coverImage: post.coverImage,
    tags: post.tags.join(", "),
    authorName: post.author.name,
    authorAvatar: post.author.avatar,
    publishedAt: post.publishedAt,
    readMinutes: String(post.readMinutes),
  }));

  return <BlogContent posts={posts} />;
}
