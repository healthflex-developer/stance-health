export type DisclaimerContact = { label: string; value: string; href?: string };
export type DisclaimerSection = {
  id: string;
  number: string;
  title: string;
  tocTitle?: string;
  callout?: string;
  intro?: string;
  lead?: string;
  contacts?: DisclaimerContact[];
};

export const DISCLAIMER_HERO = {
  "eyebrow": "Legal",
  "headingPrefix": "Doctor ",
  "headingHighlight": "Disclaimer",
  "description": "Important information regarding orthopaedic consultations at Stance Health."
};
export const DISCLAIMER_CONTENTS_LABEL = "Contents";
export const DISCLAIMER_INTRO = "Stance Health provides physiotherapy and rehabilitation services. In some cases, patients may have the opportunity to consult with an orthopaedic doctor at our centre. Please read the following carefully.";
export const DISCLAIMER_SECTIONS: DisclaimerSection[] = [
  {
    "id": "independent",
    "number": "01",
    "title": "Independent Medical Opinion",
    "callout": "Any diagnosis, prescription, medical opinion, or certificate provided during an orthopaedic consultation is issued independently by the consulting doctor.",
    "intro": "I agree and understand that any diagnosis, prescription, medical opinion, or certificate provided during an orthopaedic consultation at Stance is issued independently by the consulting doctor.",
    "lead": "Visiting and partner doctors who consult at Stance Health centres operate in their independent professional capacity. They are not employees of Stance Health or Deftronin Technologies Pvt Ltd."
  },
  {
    "id": "scope",
    "number": "02",
    "title": "Scope of Stance Health's Services",
    "tocTitle": "Scope of Services",
    "intro": "Stance Health's core services are physiotherapy, exercise rehabilitation, and strength & conditioning. Medical diagnoses, prescriptions, and clinical certificates are outside the scope of Stance Health's direct services.",
    "lead": "Stance Health is not liable for any acts, omissions, or advice of such visiting doctors, who act independently and are responsible for their own professional services."
  },
  {
    "id": "questions",
    "number": "03",
    "title": "Questions",
    "intro": "For any queries about this disclaimer or our services, contact us below.",
    "contacts": [
      {
        "label": "Email",
        "value": "hello@stance.health",
        "href": "mailto:hello@stance.health"
      },
      {
        "label": "Grievance",
        "value": "grievance.officer@healthflex.in",
        "href": "mailto:grievance.officer@healthflex.in"
      }
    ]
  }
];
