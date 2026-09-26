export type ConsentContact = { label: string; value: string; href?: string };
export type ConsentSection = {
  id: string;
  number: string;
  title: string;
  intro: string;
  contacts?: ConsentContact[];
};

export const CONSENT_HERO = {
  "eyebrow": "Legal",
  "headingPrefix": "Patient Consent & ",
  "headingHighlight": "Waiver",
  "description": "Please read this carefully before beginning your care at Stance Health."
};
export const CONSENT_CONTENTS_LABEL = "Contents";
export const CONSENT_INTRO = "By registering and receiving services at Stance Health (Deftronin Technologies Pvt Ltd), you acknowledge and agree to the following.";
export const CONSENT_SECTIONS: ConsentSection[] = [
  {
    "id": "consent",
    "number": "01",
    "title": "Consent to Receive Services",
    "intro": "I agree to receive physiotherapy, assessments, exercise, strength & conditioning, and related services from Stance Health, and understand that outcomes may vary and temporary soreness, discomfort, or symptom flare-ups may occur."
  },
  {
    "id": "accuracy",
    "number": "02",
    "title": "Accuracy of Medical Information",
    "intro": "I agree that the medical information provided by me is accurate and complete, and I will inform Stance of any relevant health conditions, medications, surgeries, allergies, pregnancy, or restrictions."
  },
  {
    "id": "questions",
    "number": "03",
    "title": "Questions",
    "intro": "For any queries about your care or this consent, please contact us.",
    "contacts": [
      {
        "label": "Email",
        "value": "hello@stance.health",
        "href": "mailto:hello@stance.health"
      }
    ]
  }
];
