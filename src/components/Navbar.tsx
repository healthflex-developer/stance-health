"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ASSETS, NAV_LINKS } from "@/lib/constants";
import BookingCta from "@/components/BookingCta";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const programs = NAV_LINKS.find((l) => l.label === "Programs");

  /** Check if a nav link is active based on current path */
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  /** Check if any child of Programs is active */
  const isProgramsActive = () => {
    const programsLink = NAV_LINKS.find((l) => l.children);
    return programsLink?.children?.some((child) => pathname.startsWith(child.href)) ?? false;
  };

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
    setProgramsOpen(false);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu when user scrolls
  useEffect(() => {
    if (!mobileOpen) return;
    const onScroll = () => closeMobileMenu();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileOpen, closeMobileMenu]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* Header bar — always visible */}
      <header
        className={`fixed top-0 left-0 right-0 z-[60] transition-colors duration-300 ${
          scrolled || mobileOpen
            ? "bg-[#132644] border-b border-white/5"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src={`${ASSETS}/logo.png`}
                alt="Stance Health"
                width={170}
                height={51}
                className="h-14 w-auto"
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
              {NAV_LINKS.map((link) =>
                link.children ? (
                  <div key={link.label} className="relative group">
                    <button
                      className={`relative py-1 flex items-center gap-1 transition-colors duration-200 ${
                        isProgramsActive()
                          ? "text-[#cdfe71]"
                          : "text-white/80 hover:text-white"
                      }`}
                      onMouseEnter={() => setProgramsOpen(true)}
                      onMouseLeave={() => setProgramsOpen(false)}
                    >
                      {link.label}
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      {/* Active indicator */}
                      {isProgramsActive() && (
                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#cdfe71] rounded-full" />
                      )}
                      {/* Hover underline */}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/60 rounded-full group-hover:w-full transition-all duration-300" />
                    </button>
                    {programsOpen && (
                      <div
                        className="absolute top-full left-0 pt-2 w-52"
                        onMouseEnter={() => setProgramsOpen(true)}
                        onMouseLeave={() => setProgramsOpen(false)}
                      >
                        <div className="bg-[#1a3358] border border-white/10 rounded-xl shadow-xl overflow-hidden">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`block px-4 py-2.5 text-sm transition-colors ${
                                isActive(child.href)
                                  ? "text-[#cdfe71] bg-[#cdfe71]/5"
                                  : "text-white/70 hover:text-white hover:bg-white/5"
                              }`}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`relative py-1 transition-colors duration-200 group/link ${
                      isActive(link.href)
                        ? "text-[#cdfe71]"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {link.label}
                    {/* Active indicator */}
                    {isActive(link.href) && (
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#cdfe71] rounded-full" />
                    )}
                    {/* Hover underline (only when not active) */}
                    {!isActive(link.href) && (
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/60 rounded-full group-hover/link:w-full transition-all duration-300" />
                    )}
                  </Link>
                )
              )}
            </nav>

            {/* CTA */}
            <div className="hidden lg:block">
              <BookingCta className="btn-primary text-sm" label="Book an Appointment" />
            </div>

            {/* Mobile/Tablet menu button */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile/Tablet Menu — from top, content height only */}
      {mobileOpen && (
        <>
          {/* Backdrop — click to close */}
          <div
            className="fixed inset-0 z-[51] bg-black/50 lg:hidden"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
          {/* Menu panel — starts from top (behind header), only as tall as content */}
          <div className="fixed top-0 left-0 right-0 z-[55] bg-[#132644] lg:hidden pt-16">
            <div className="px-5 py-6 space-y-1">
              {NAV_LINKS.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <button
                      className={`w-full text-left py-3 font-medium flex items-center justify-between transition-colors ${
                        isProgramsActive() ? "text-[#cdfe71]" : "text-white/80"
                      }`}
                      onClick={() => setProgramsOpen(!programsOpen)}
                    >
                      {link.label}
                      <svg className={`w-4 h-4 transition-transform ${programsOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {programsOpen && (
                      <div className="pl-4 space-y-1 pb-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block py-2 text-sm transition-colors ${
                              isActive(child.href)
                                ? "text-[#cdfe71] font-medium"
                                : "text-white/60 hover:text-white"
                            }`}
                            onClick={closeMobileMenu}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`block py-3 transition-colors ${
                      isActive(link.href)
                        ? "text-[#cdfe71] font-medium"
                        : "text-white/80 hover:text-white"
                    }`}
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
