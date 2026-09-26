export type PrivacyBullet = { text: string };
export type PrivacyCard = { title: string; body: string; purpose: string };
export type PrivacyTag = { text: string };
export type PrivacyContact = { label: string; value: string; href?: string };
export type PrivacySection = {
  id: string;
  number: string;
  title: string;
  intro?: string;
  lead?: string;
  callout?: string;
  closing?: string;
  bullets?: PrivacyBullet[];
  cards?: PrivacyCard[];
  tags?: PrivacyTag[];
  contacts?: PrivacyContact[];
};

export const PRIVACY_HERO = {
  "eyebrow": "Legal",
  "headingPrefix": "Privacy ",
  "headingHighlight": "Policy",
  "description": "Your privacy is important to us. Learn how we collect, use, and protect your information."
};

export const PRIVACY_CONTENTS_LABEL = "Contents";

export const PRIVACY_INTRO = "Stance Health (“Company”, “we”, “our”) is committed to protecting the privacy and security of your personal and health-related information. This Privacy Policy outlines how we collect, use, process, and safeguard your data when you access our services, website, or platform.";

export const PRIVACY_SECTIONS: PrivacySection[] = [
  {
    "id": "commitments",
    "number": "01",
    "title": "Our Privacy Commitments",
    "lead": "We are committed to ensuring that:",
    "bullets": [
      {
        "text": "Personal information is collected for specific, clear, and legitimate purposes."
      },
      {
        "text": "Data is used only for purposes relevant to the services we provide, including clinical care, performance improvement, and related operations."
      },
      {
        "text": "We maintain appropriate safeguards to protect personal and health data from unauthorized access, disclosure, or misuse."
      },
      {
        "text": "Data is retained only for as long as necessary for service delivery, legal compliance, and operational requirements."
      },
      {
        "text": "We maintain transparency regarding how data is collected, used, and shared."
      }
    ]
  },
  {
    "id": "categories",
    "number": "02",
    "title": "Categories of Information Collected",
    "lead": "We may collect the following categories of information:",
    "cards": [
      {
        "title": "Personal Information",
        "body": "Name, age, gender, phone number, email address, and basic identification details.",
        "purpose": "For communication, and data attribution."
      },
      {
        "title": "Health & Clinical Information",
        "body": "Information relating to injuries, symptoms, movement patterns, strength levels, assessments, treatment notes, and progress tracking.",
        "purpose": "In order to improve clinical diagnosis, tracking and improvement of protocols."
      },
      {
        "title": "Usage & Device Information",
        "body": "Device type, IP address, app or website usage patterns, and interaction data.",
        "purpose": "To understand usage patterns, and improve program adherence."
      },
      {
        "title": "Communication & Engagement Data",
        "body": "Interactions through calls, WhatsApp, forms, or other communication channels, including responses to campaigns or outreach.",
        "purpose": "To understand usage patterns, and improve program adherence."
      }
    ]
  },
  {
    "id": "purpose",
    "number": "03",
    "title": "Purpose of Collection and Use",
    "lead": "The information collected is used for the following purposes:",
    "bullets": [
      {
        "text": "To assess, plan, and deliver physiotherapy and performance-related services."
      },
      {
        "text": "To monitor progress and improve outcomes across sessions."
      },
      {
        "text": "To communicate with users regarding appointments, services, and relevant updates."
      },
      {
        "text": "To improve our services, systems, and user experience."
      },
      {
        "text": "To conduct internal analysis and generate insights, including through aggregated or de-identified data."
      }
    ]
  },
  {
    "id": "deidentification",
    "number": "04",
    "title": "De-identification and Research Use",
    "bullets": [
      {
        "text": "Certain data may be processed in a de-identified or anonymized form for the purpose of improving clinical outcomes, service quality, and internal research."
      },
      {
        "text": "Such data does not identify individual users and is used only in aggregated formats."
      }
    ]
  },
  {
    "id": "technology",
    "number": "05",
    "title": "Use of Technology Platforms and Data Processing",
    "bullets": [
      {
        "text": "We may use third-party tools, software platforms, and technology solutions to support assessment, measurement, data processing, and service delivery."
      },
      {
        "text": "Information may be processed, stored, or transmitted through such systems as part of normal operations."
      },
      {
        "text": "These tools function solely as infrastructure or support systems, and all clinical interpretation, decision-making, and medical responsibility remain exclusively with Stance Health."
      },
      {
        "text": "No independent diagnosis or treatment decisions are made by any third-party systems."
      }
    ]
  },
  {
    "id": "consent",
    "number": "06",
    "title": "Consent and Acceptance",
    "bullets": [
      {
        "text": "By accessing our services, booking an appointment, or engaging with our platform, you acknowledge and agree to the collection and use of information as described in this Privacy Policy."
      },
      {
        "text": "Where required, additional consent may be obtained for specific use cases."
      },
      {
        "text": "Continued use of our services shall be deemed as acceptance of this Privacy Policy and its terms."
      }
    ]
  },
  {
    "id": "rights",
    "number": "07",
    "title": "User Rights and Data Requests",
    "bullets": [
      {
        "text": "Users may request access to their personal data."
      },
      {
        "text": "Users may request correction of inaccurate or incomplete data."
      },
      {
        "text": "Users may request deletion or anonymization of their data, subject to applicable legal and operational requirements."
      },
      {
        "text": "Requests may be submitted through the contact details provided below and will be addressed within a reasonable timeframe."
      }
    ]
  },
  {
    "id": "retention",
    "number": "08",
    "title": "Data Retention",
    "intro": "Unless a longer retention period is required by applicable law or is necessary for ongoing clinical care or legal obligations, personal and clinical information will generally be retained for a period of up to seven (7) years from the date of the user's last interaction with the Company.",
    "lead": "Personal and clinical data is retained only for as long as necessary for:",
    "tags": [
      {
        "text": "Service delivery"
      },
      {
        "text": "Clinical continuity"
      },
      {
        "text": "Legal & regulatory compliance"
      }
    ],
    "closing": "Data that is no longer required may be anonymized or securely deleted."
  },
  {
    "id": "sharing",
    "number": "09",
    "title": "Data Sharing and Disclosure",
    "callout": "We do not sell personal data to third parties.",
    "lead": "Data may be shared with:",
    "bullets": [
      {
        "text": "Internal clinical and operational teams"
      },
      {
        "text": "Technology service providers supporting our systems"
      },
      {
        "text": "Regulatory authorities, if required by law"
      },
      {
        "text": "These third parties will also be required to comply with applicable laws and contractual obligations relating to data privacy."
      }
    ],
    "closing": "Any such sharing is limited to what is necessary for the intended purpose."
  },
  {
    "id": "advertising",
    "number": "10",
    "title": "Advertising and Communication",
    "bullets": [
      {
        "text": "We may use platforms such as Meta (Facebook/Instagram) and Google for communication, outreach, and service awareness."
      },
      {
        "text": "Limited, non-sensitive data may be used to understand engagement and improve communication effectiveness."
      },
      {
        "text": "We do not share identifiable health or clinical information with advertising platforms."
      },
      {
        "text": "Users may opt out of promotional communication at any time."
      }
    ]
  },
  {
    "id": "security",
    "number": "11",
    "title": "Data Security",
    "bullets": [
      {
        "text": "We implement reasonable administrative, technical, and physical safeguards to protect data."
      },
      {
        "text": "Access to data is restricted to authorized personnel based on role and necessity."
      }
    ]
  },
  {
    "id": "children",
    "number": "12",
    "title": "Children's Privacy",
    "intro": "Our services are not intended for individuals under the age of 18 without appropriate supervision or consent from a parent or guardian."
  },
  {
    "id": "grievance",
    "number": "13",
    "title": "Grievance Officer",
    "intro": "If you have any complaints, concerns, or requests regarding this Privacy Policy or your data, you may contact:",
    "contacts": [
      {
        "label": "Name",
        "value": "Rohit Arora"
      },
      {
        "label": "Email",
        "value": "grievance.officer@healthflex.in",
        "href": "mailto:grievance.officer@healthflex.in"
      },
      {
        "label": "Designation",
        "value": "Grievance Officer"
      }
    ]
  },
  {
    "id": "updates",
    "number": "14",
    "title": "Updates to this Policy",
    "bullets": [
      {
        "text": "This Privacy Policy may be updated from time to time to reflect changes in our practices, services, or legal requirements."
      },
      {
        "text": "Continued use of our services after such updates constitutes acceptance of the revised policy."
      }
    ]
  }
];
