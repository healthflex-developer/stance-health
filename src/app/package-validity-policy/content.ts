export type PackageCard = { icon: string; title: string; body: string };
export type PackageBullet = { text: string };
export type PackageContact = { label: string; value: string; href?: string };
export type PackageSection = {
  id: string;
  number: string;
  title: string;
  intro?: string;
  lead?: string;
  callout?: string;
  closing?: string;
  cards?: PackageCard[];
  bullets?: PackageBullet[];
  contacts?: PackageContact[];
};

export const PACKAGE_POLICY_HERO = {
  "eyebrow": "Legal",
  "headingPrefix": "Package Validity ",
  "headingHighlight": "Policy",
  "description": "How treatment packages work, when they expire, and how to request an extension."
};

export const PACKAGE_POLICY_CONTENTS_LABEL = "Contents";

export const PACKAGE_POLICY_INTRO = "All treatment packages at Stance Health come with a predefined validity period that is communicated at the time of purchase. Please ensure sessions are utilised within this period.";

export const PACKAGE_POLICY_SECTIONS: PackageSection[] = [
  {
    "id": "validity",
    "number": "01",
    "title": "Validity Period",
    "intro": "Every package has a fixed validity duration which is clearly communicated to you at the time of purchase — either verbally, via WhatsApp, or on your invoice.",
    "lead": "Sessions must be utilised within this validity window. Unused sessions after the validity date will lapse automatically.",
    "cards": [
      {
        "icon": "📋",
        "title": "Communicated at purchase",
        "body": "Validity is confirmed at the time you buy the package — verbally or in writing."
      },
      {
        "icon": "📅",
        "title": "Use within the window",
        "body": "All sessions in the package must be scheduled and completed before the expiry date."
      }
    ]
  },
  {
    "id": "expiry",
    "number": "02",
    "title": "Automatic Expiry",
    "callout": "Packages expire automatically on the validity date. Unused sessions cannot be carried forward after expiry.",
    "closing": "Once a package expires, any remaining unused sessions are forfeited. We are unable to honour sessions from an expired package unless an extension has been formally approved in advance."
  },
  {
    "id": "extensions",
    "number": "03",
    "title": "Extension Requests",
    "intro": "In exceptional circumstances — such as medical emergencies, hospitalisation, or other valid reasons — you may request an extension of your package validity.",
    "bullets": [
      {
        "text": "Requests must be submitted **before** the package expiry date."
      },
      {
        "text": "A valid reason must be provided along with the request."
      },
      {
        "text": "Extension requests are reviewed on a case-by-case basis at the discretion of the team."
      },
      {
        "text": "Approval of an extension is not guaranteed and is subject to operational feasibility."
      }
    ],
    "contacts": [
      {
        "label": "Requests",
        "value": "hello@stance.health",
        "href": "mailto:hello@stance.health"
      },
      {
        "label": "WhatsApp",
        "value": "+91 90194 10049",
        "href": "https://wa.me/919019410049"
      }
    ]
  }
];
