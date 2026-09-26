"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import AdminPreviewSection from "@/components/AdminPreviewSection";
import { previewList, previewText, useAdminPreviewBlock } from "@/components/PreviewDraft";
import { usePublishedBlock } from "@/components/PublishedContent";
import { assetAlt } from "@/lib/asset-label";
import { FOOTER_DEFAULTS } from "@/lib/site-chrome";

type FooterLink = { label?: string; href?: string };
type FooterColumn = { title?: string; links?: FooterLink[] };
type SocialLink = { platform?: string; label?: string; href?: string };

const SOCIAL_ICONS: Record<string, string> = {
  instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  facebook: "M22.675 0h-21.35C.593 0 0 .592 0 1.326v21.348C0 23.408.593 24 1.771 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.505 0-1.796.716-1.796 1.764v2.313h3.587l-.467 3.622H16.56V24h6.115C23.408 24 24 23.408 24 22.674V1.326C24 .592 23.408 0 22.675 0z",
};

export default function Footer() {
  const pathname = usePathname();
  const draft = useAdminPreviewBlock("footer-content", "FooterContent");
  const published = usePublishedBlock("footer-content");
  const logo = previewText(draft, "logo", FOOTER_DEFAULTS.logo) || FOOTER_DEFAULTS.logo;
  const logoAlt = previewText(draft, "logoAlt", assetAlt(published?.props, "logo", FOOTER_DEFAULTS.logoAlt)) || FOOTER_DEFAULTS.logoAlt;
  const description = previewText(draft, "description", FOOTER_DEFAULTS.description) || FOOTER_DEFAULTS.description;
  const copyright = previewText(draft, "copyright", FOOTER_DEFAULTS.copyright) || FOOTER_DEFAULTS.copyright;
  const socials = previewList<SocialLink>(draft, "socials", FOOTER_DEFAULTS.socials);
  const columns = previewList<FooterColumn>(draft, "columns", FOOTER_DEFAULTS.columns);

  const footer = (
    <footer className="bg-[#0c1b30] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-1">
            <Link href="/" data-admin-field="logoAlt">
              <Image
                src={logo}
                alt={logoAlt}
                width={140}
                height={42}
                className="h-22 w-auto mb-5"
              />
            </Link>
            <p data-admin-field="description" className="text-white/50 text-sm leading-relaxed mb-6 -mt-6">
              {description}
            </p>
            <div className="flex gap-3">
              {socials.map((social, index) => {
                const platform = (social.platform || "").toLowerCase();
                const icon = SOCIAL_ICONS[platform];
                return (
                  <a
                    key={`${platform}-${index}`}
                    href={social.href || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label || platform}
                    data-admin-list="socials"
                    data-admin-list-index={index}
                    data-admin-list-field="label"
                    className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:border-[#cdfe71] hover:text-[#cdfe71] transition-colors"
                  >
                    {icon ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d={icon} />
                      </svg>
                    ) : (
                      <span className="text-[10px] font-bold">{(social.label || "?").slice(0, 1)}</span>
                    )}
                  </a>
                );
              })}
            </div>
          </div>

          {columns.map((column, columnIndex) => (
            <div key={`${column.title}-${columnIndex}`} data-admin-list="columns" data-admin-list-index={columnIndex}>
              <h4 data-admin-list-field="title" className="text-[#cdfe71]/70 font-semibold mb-4">{column.title}</h4>
              <ul className="space-y-2.5" data-admin-list-child="links">
                {(column.links ?? []).map((link, linkIndex) => (
                  <li key={`${link.href}-${linkIndex}`} data-admin-list-child-index={linkIndex}>
                    <Link
                      href={link.href || "/"}
                      data-admin-list-child-field="label"
                      className="text-white/50 hover:text-[#cdfe71] text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div data-admin-field="copyright" className="border-t border-white/10 pt-6 text-center text-white/30 text-xs">
          &copy; {new Date().getFullYear()} {copyright}
        </div>
      </div>
    </footer>
  );

  if (pathname !== "/footer") return footer;
  return (
    <AdminPreviewSection blockId="footer-content" blockType="FooterContent">
      {footer}
    </AdminPreviewSection>
  );
}
