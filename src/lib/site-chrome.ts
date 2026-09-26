import { ASSETS } from "@/lib/constants";

export const NAVBAR_DEFAULTS = {
  logo: `${ASSETS}/logo.png`,
  logoAlt: "Stance Health",
  ctaLabel: "Book an Appointment",
  moreLabel: "More",
  primaryLinks: [
    { label: "About", href: "/about" },
    { label: "Conditions", href: "/conditions" },
    { label: "Services", href: "/services" },
    { label: "Assessment", href: "/assessment" },
  ],
  moreLinks: [
    { label: "Philosophy", href: "/philosophy" },
    { label: "Locations", href: "/locations" },
    { label: "Partners", href: "/partners" },
    { label: "Careers", href: "/careers" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
};

export const FOOTER_DEFAULTS = {
  logo: `${ASSETS}/logo.png`,
  logoAlt: "Stance Health",
  description: "Evidence-backed Orthopaedic Rehab, where Medical Science & Technology are tailored for your performance and recovery.",
  socials: [
    { platform: "instagram", label: "Instagram", href: "https://www.instagram.com/stance.health?stkn=MWQ5eWpucDN1dTdhMQ==" },
    { platform: "linkedin", label: "LinkedIn", href: "https://linkedin.com/company/stancehealth" },
    { platform: "facebook", label: "Facebook", href: "https://www.facebook.com/p/Stance-Health-61560825009195/" },
  ],
  columns: [
    {
      title: "About Us",
      links: [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Philosophy", href: "/philosophy" },
        { label: "Partner With Us", href: "/partners" },
      ],
    },
    {
      title: "Other Links",
      links: [
        { label: "Locations", href: "/locations" },
        { label: "Conditions We Treat", href: "/conditions" },
        { label: "Services", href: "/services" },
        { label: "Blog", href: "/blog" },
        { label: "Resources", href: "/resources" },
      ],
    },
    {
      title: "Policies",
      links: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms & Conditions", href: "/terms-and-conditions" },
        { label: "Package Validity Policy", href: "/package-validity-policy" },
        { label: "Patient Consent & Waiver", href: "/patient-consent-waiver" },
        { label: "Doctor Disclaimer", href: "/doctor-disclaimer" },
        { label: "Delete Account", href: "/delete-account" },
      ],
    },
  ],
  copyright: "Stance – All rights reserved.",
};
