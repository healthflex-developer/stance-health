export type DeleteAccountItem = { text: string };
export type DeleteAccountSection = {
  id: string;
  number: string;
  title: string;
  tocTitle?: string;
  intro?: string;
  steps?: DeleteAccountItem[];
  bullets?: DeleteAccountItem[];
};

export const DELETE_ACCOUNT_HERO = {
  "eyebrow": "Account",
  "headingPrefix": "Delete Your ",
  "headingHighlight": "Account",
  "description": "You can request deletion of your Stance Health account and all associated data by contacting us. We will process your request within 30 days."
};
export const DELETE_ACCOUNT_CONTENTS_LABEL = "Contents";
export const DELETE_ACCOUNT_INTRO = "You may request deletion of your Stance Health account at any time. Once processed, all personal data will be permanently removed from our systems.";
export const DELETE_ACCOUNT_CTA = {
  label: "Email Us to Delete Account",
  href: "mailto:support@stance.health?subject=Account%20Deletion%20Request",
};
export const DELETE_ACCOUNT_SECTIONS: DeleteAccountSection[] = [
  {
    "id": "how-to",
    "number": "01",
    "title": "How to Request Deletion",
    "steps": [
      {
        "text": "Send an email to [support@stance.health](mailto:support@stance.health)"
      },
      {
        "text": "Use subject line: **Account Deletion Request**"
      },
      {
        "text": "Include your registered phone number or email address"
      },
      {
        "text": "We will confirm deletion within 30 days"
      }
    ]
  },
  {
    "id": "what-deleted",
    "number": "02",
    "title": "What Gets Deleted",
    "bullets": [
      {
        "text": "Your profile (name, phone number, email, date of birth)"
      },
      {
        "text": "Appointment history and session records"
      },
      {
        "text": "Payment and billing information"
      },
      {
        "text": "Device tokens and notification preferences"
      }
    ]
  },
  {
    "id": "retained",
    "number": "03",
    "title": "Data Retained After Deletion",
    "tocTitle": "Data Retained",
    "intro": "We may retain certain data for up to **90 days** for legal and compliance purposes (e.g. billing records, tax documents). After this period, all data is permanently deleted."
  }
];
