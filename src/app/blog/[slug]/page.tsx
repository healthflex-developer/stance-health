import { notFound } from "next/navigation";
import { getAllBlogs, getBlogBySlug } from "@/lib/blogs";
import BlogArticleView from "@/components/detail/BlogArticleView";
import type { Metadata } from "next";
import { withPublishedSeo } from "@/lib/published-seo";
import { BASE_URL } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) return {};
  return withPublishedSeo(`blog/${slug}`, {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: `${post.title} – Stance Health`,
      description: post.summary,
      url: `/blog/${slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [{ url: post.coverImage, width: 800, height: 450 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [post.coverImage],
    },
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary,
    image: post.coverImage,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@id": `${BASE_URL}/#organization`,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/blog/${slug}` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BlogArticleView
        data={{
          backLabel: "All articles",
          tags: post.tags.map((text) => ({ text })),
          title: post.title,
          summary: post.summary,
          authorName: post.author.name,
          authorRole: post.author.role,
          authorAvatar: post.author.avatar,
          publishedAt: post.publishedAt,
          readMinutes: String(post.readMinutes),
          coverImage: post.coverImage,
          sections: post.sections.map((section) => ({
            type: section.type,
            content: "content" in section ? section.content : "",
            items: "items" in section ? section.items.map((text) => ({ text })) : [],
          })),
          ctaHeadingPrefix: "Ready to take the ",
          ctaHeadingHighlight: "next step",
          ctaDescription: "Our clinical team is ready to build a personalised plan around your goals.",
          ctaLabel: "Book an Assessment",
          ctaHref: "https://book.stance.health/stance-health?utm_source=blog&utm_medium=cta&utm_campaign=blog_article",
        }}
      />
    </>
  );
}
