import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllBlogs, getBlogBySlug } from "@/lib/blogs";
import type { BlogSection } from "@/lib/blogs";
import type { Metadata } from "next";
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
  return {
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
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function Section({ section }: { section: BlogSection }) {
  switch (section.type) {
    case "heading":
      return (
        <h2 className="text-xl font-bold text-white mt-10 mb-3">{section.content}</h2>
      );
    case "paragraph":
      return (
        <p className="text-white/70 leading-relaxed text-base">{section.content}</p>
      );
    case "tip":
      return (
        <div className="my-6 flex gap-3 bg-[#cdfe71]/5 border border-[#cdfe71]/20 rounded-xl p-4">
          <span className="text-[#cdfe71] text-lg mt-0.5 flex-shrink-0">💡</span>
          <p className="text-white/80 text-sm leading-relaxed">{section.content}</p>
        </div>
      );
    case "list":
      return (
        <ul className="space-y-2 my-4">
          {section.items.map((item, i) => (
            <li key={i} className="flex gap-2 text-white/70 text-base">
              <span className="text-[#cdfe71] mt-1 flex-shrink-0">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
  }
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
      <Navbar />
      <main className="pt-24 pb-20 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-[#cdfe71] transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All articles
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#cdfe71]/10 text-[#cdfe71]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
            {post.title}
          </h1>

          {/* Summary */}
          <p className="text-white/60 text-lg leading-relaxed mb-6">{post.summary}</p>

          {/* Author + meta */}
          <div className="flex items-center gap-3 mb-8 pb-8 border-b border-white/10">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={44}
              height={44}
              className="rounded-full bg-[#132644]"
            />
            <div>
              <p className="text-sm font-semibold text-white">{post.author.name}</p>
              <p className="text-xs text-white/40">{post.author.role}</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-xs text-white/40">{formatDate(post.publishedAt)}</p>
              <p className="text-xs text-white/40">{post.readMinutes} min read</p>
            </div>
          </div>

          {/* Cover image */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>

          {/* Content */}
          <div className="space-y-4">
            {post.sections.map((section, i) => (
              <Section key={i} section={section} />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 bg-[#1a3358] rounded-2xl p-8 border border-white/5 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Ready to take the next step?</h3>
            <p className="text-white/60 text-sm mb-6">
              Our clinical team is ready to build a personalised plan around your goals.
            </p>
            <a
              href="https://book.stance.health/stance-health?utm_source=blog&utm_medium=cta&utm_campaign=blog_article"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Book an Assessment
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
