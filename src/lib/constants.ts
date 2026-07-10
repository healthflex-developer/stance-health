export const BASE_URL = "https://www.stance.health";
export const ASSETS = `/assets/images`;

// ── Marketing / Analytics IDs ─────────────────────────────────────────────
// Fill these in with your real IDs. An empty string disables that provider.
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";           // e.g. "GTM-XXXXXXX"
export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "";           // e.g. "G-XXXXXXXXXX"
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID ?? ""; // e.g. "123456789"

// Google Search Console site verification token (meta tag approach)
export const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "";

// ── Firebase config (used by analytics.ts for Firebase Analytics) ─────────
export const FIREBASE_CONFIG = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "",
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
  measurementId:     process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? "", // e.g. "G-XXXXXXXXXX"
} as const;

// ── CTA destinations ──────────────────────────────────────────────────────
const DASHBOARD_BASE = "https://book.stance.health";
const APP_STORE_BASE  = "https://apps.apple.com/us/app/stance-health/id6757695513";
const PLAY_STORE_BASE = "https://play.google.com/store/apps/details?id=com.stance.health";

/**
 * Static fallback used in Server Components and anchor hrefs.
 * The TrackingInit + buildTrackedUrl() flow will append live UTM / click-ID
 * params client-side via the useCta() hook (see src/hooks/useCta.ts).
 */
export const BOOKING_URL = DASHBOARD_BASE;
export const APP_STORE_URL  = `${APP_STORE_BASE}?utm_source=website&utm_medium=cta&utm_campaign=app_install`;
export const PLAY_STORE_URL = `${PLAY_STORE_BASE}&utm_source=website&utm_medium=cta&utm_campaign=app_install`;

export const NAV_LINKS = [
  { label: "We are Stance", href: "/about" },
  { label: "Philosophy", href: "/philosophy" },
  {
    label: "Programs",
    children: [
      { label: "In Your Stride", href: "/running" },
      { label: "Reclaim Your Game", href: "/back-to-sports" },
      { label: "Back on your feet", href: "/surgical-rehab" },
      { label: "Prevention & Recovery", href: "/injury-management" },
      { label: "Breaking Barriers", href: "/performance-training" },
    ],
  },
  { label: "Conditions", href: "/conditions" },
  { label: "Locations", href: "/locations" },
  { label: "Partners", href: "/partners" },
];

export const FRAMEWORK_STEPS = [
  {
    id: "assess",
    label: "Assess",
    icon: `${ASSETS}/assess.png`,
    description:
      "Evaluate your MSK health comprehensively with Stance's advanced diagnostic tools and expert tests, gaining insights into your body's needs while discovering root causes for conditions. Our experienced team supports your assessment and recommends personalised treatment plans tailored to your unique requirements.",
  },
  {
    id: "rehab",
    label: "Rehab",
    icon: `${ASSETS}/rehab.svg`,
    description:
      "Start your personalised recovery journey with expert support, integrating evidence-based practices and technology to address your MSK conditions, enhance physical performance, and achieve your health goals.",
  },
  {
    id: "engage",
    label: "Re-engage",
    icon: `${ASSETS}/engage.svg`,
    description:
      "Our team helps you apply rehabilitation insights to real life, using our platform to track your exercises, ensuring you stay on track and successfully re-engage with your daily activities and sporting pursuits.",
  },
  {
    id: "enhance",
    label: "Enhance",
    icon: `${ASSETS}/enhance.svg`,
    description:
      "Review your progress with regular check-ins and assessments. Stance helps you stay on track by refining your training programme to ensure your continued success.",
  },
];

export const TECHNOLOGIES = [
  {
    id: "run-scribe",
    name: "Run Scribe",
    icon: `${ASSETS}/run.svg`,
    description: "Portable Gait and running analysis tool built for Runners and Sports Enthusiasts",
  },
  {
    id: "vald-dynamo",
    name: "VALD | Dynamo",
    icon: `${ASSETS}/dynamo.svg`,
    description:
      "Portable Dynamometer and inclinometer for testing strength and range of motion",
  },
  {
    id: "vald-force-frame",
    name: "VALD | Force Frame",
    icon: `${ASSETS}/force.svg`,
    description: "Accurate testing of isometric strength across various muscle groups",
  },
  {
    id: "vald-force-decks",
    name: "VALD | Force Decks",
    icon: `${ASSETS}/deck.svg`,
    description:
      "Dual force plates for accurately testing explosive power, balance and neuromuscular control",
  },
  {
    id: "healthflex",
    name: "HealthFlex",
    icon: `${ASSETS}/tech1.jpg`,
    description: "AI-based motion sensors that guide you in your rehabilitation journey at home.",
  },
];

export const TESTIMONIALS = [
  {
    name: "Ritura Biswas",
    role: "Fintech Growth Lead",
    condition: "ACL & Meniscus Surgery",
    image: `${ASSETS}/ritura.png`,
    quote:
      "I tore through an ACL, surgery 6 months ago and have worked with multiple people to get back to action. The thoroughness of assessment and knowledgeable consultation with the Physio at Stance helped me to understand the underlying issues which helped me to plan my recovery better.",
  },
  {
    name: "Anuj Jindal",
    role: "SVP MediAssist",
    condition: "Chronic Back Pain",
    image: `${ASSETS}/anuj.png`,
    quote:
      "After dealing with prolonged back pain for years, I had the opportunity of visiting Stance where I received a comprehensive assessment of my spinal condition. The transparent diagnosis and data-based assessments provided a series of relief to upkeep my rehab goals.",
  },
  {
    name: "Nikhil Thard",
    role: "Chairman Edifice Labs",
    condition: "Low Back Pain",
    image: `${ASSETS}/nikhil.png`,
    quote:
      "After consulting with the physios at Stance, they reassured me that I was undergoing progress and worked all my problems out. They explained the process of treatment and care enabled me to gain immense confidence in my abilities.",
  },
  {
    name: "Divyanshu",
    role: "Founder Glam+",
    condition: "Health Enthusiast",
    image: `${ASSETS}/divyanshu.png`,
    quote:
      "The team at Stance helped with a thorough assessment of my body to understand the right exercise programme for me, creating personalised plans that have significantly improved my athletic performance.",
  },
  {
    name: "Ashish Lingamneni",
    role: "Marketing Leader",
    condition: "Basketball Enthusiast",
    image: `${ASSETS}/linganmeni.png`,
    quote:
      "Stance's approach to sports rehabilitation is exceptional. Their expertise in biomechanics and movement analysis has helped me return to peak performance and prevent future injuries.",
  },
  {
    name: "Aastha Gupta",
    role: "Adobe Digital Experience Architect",
    condition: "Anterior Knee Pain",
    image: `${ASSETS}/aastha.png`,
    quote:
      "The detailed assessment at Stance gave me a clear understanding of my knee condition. The personalised rehab programme has dramatically reduced my pain and improved my quality of life.",
  },
  {
    name: "Saumya Dubey",
    role: "Product Leader",
    condition: "Recurrent Ankle Pain",
    image: `${ASSETS}/saumya.png`,
    quote:
      "After struggling with recurring ankle pain that kept me off the field, Stance's comprehensive approach and technology-driven assessment identified the root cause and got me back stronger than before.",
  },
  {
    name: "Pranav Iyer",
    role: "Founding Team Stable Money",
    condition: "ACL Surgery",
    image: `${ASSETS}/pranav.png`,
    quote:
      "My ACL recovery at Stance was exceptional. The data-driven approach, regular assessments, and personalised programme gave me confidence throughout rehabilitation and helped me return to sport ahead of schedule.",
  },
];

export const TEAM = [
  {
    name: "Durga Joshi",
    role: "Lead Musculoskeletal and Sports Physiotherapist",
    experience: "12+ years experience",
    image: `${ASSETS}/team-1.svg`,
    bio: "Durga brings over 12 years of experience in musculoskeletal and sports physiotherapy, specializing in manual therapy techniques such as Maitland, McKenzie, Clinical Pilates, and Butler's Neurodynamic treatments. Her professional journey includes collaborations with esteemed institutions like Sakra World Hospital and YOS Sports Health Specialists, as well as working closely with industry's best physiotherapists and sports medicine doctors.",
  },
  {
    name: "Sumesh Ashokan",
    role: "Senior Musculoskeletal and Sports Physiotherapist",
    experience: "",
    image: `${ASSETS}/team-2.svg`,
    bio: "As an athlete turned physiotherapist, Sumesh's mission at Stance is to guide you from injury recovery to performance enhancement. With his experience in various sports and a deep understanding of human anatomy, he provides personalized care tailored to your needs. His holistic approach ensures accurate diagnosis and prevention of future injuries, helping you achieve a better tomorrow.",
  },
  {
    name: "Arjun K Raj",
    role: "Senior Strength and Conditioning Coach",
    experience: "",
    image: `${ASSETS}/team-3.svg`,
    bio: "At Stance, Arjun's goal is to help you achieve your fitness aspirations through personalized, meticulously crafted training programs. By understanding your unique needs, he tailors each plan to guide you towards peak performance and a healthier lifestyle. Together, you will unlock your full potential and ensure every step is taken towards your success.",
  },
  {
    name: "Surbhi Paranjpe",
    role: "Senior Musculoskeletal and Sports Physiotherapist",
    experience: "",
    image: `${ASSETS}/team-4.svg`,
    bio: "With a commitment to precise diagnosis and evidence-based treatment, Surbhi helps you manage and overcome musculoskeletal conditions. Her focus is on pain management and performance enhancement, ensuring you achieve your objectives while minimizing injury risks. Through tailored programs and education, she empowers you to reach your full athletic potential.",
  },
];

export const PROGRAMS = [
  {
    id: "running",
    label: "In Your Stride",
    href: "/running",
    image: `${ASSETS}/pt-1.svg`,
    description:
      "Extensive running program designed for grassroots and elite runners. Backed by high-end technology-based analysis to improve your running efficiency. Our approach focuses on preventing injuries and maximising performance.",
  },
  {
    id: "back-to-sports",
    label: "Reclaim Your Game",
    href: "/back-to-sports",
    image: `${ASSETS}/pt-2.svg`,
    description:
      "Comprehensive return-to-sport rehabilitation programme designed to safely guide athletes back to their chosen sport after injury, using evidence-based protocols and performance testing.",
  },
  {
    id: "surgical-rehab",
    label: "Back on your feet",
    href: "/surgical-rehab",
    image: `${ASSETS}/pt-3.svg`,
    description:
      "Specialised pre and post-operative rehabilitation programme to optimise surgical outcomes, reduce recovery time, and restore full function and performance.",
  },
  {
    id: "injury-management",
    label: "Prevention & Recovery",
    href: "/injury-management",
    image: `${ASSETS}/pt-4.svg`,
    description:
      "Proactive injury prevention and management programme combining screening, education, and targeted interventions to keep you performing at your best.",
  },
  {
    id: "performance-training",
    label: "Breaking Barriers",
    href: "/performance-training",
    image: `${ASSETS}/pt-5.svg`,
    description:
      "High-performance training programme for individuals looking to elevate their athletic performance and overcome physical barriers through evidence-based strength and conditioning.",
  },
];

export const FOOTER_LINKS = {
  about: [
    { label: "Home", href: "/" },
    { label: "We are Stance", href: "/about" },
    { label: "Philosophy", href: "/philosophy" },
    { label: "Partner With Us", href: "/partners" },
  ],
  programs: [
    { label: "In Your Stride", href: "/running" },
    { label: "Reclaim Your Game", href: "/back-to-sports" },
    { label: "Back on your feet", href: "/surgical-rehab" },
    { label: "Prevention & Recovery", href: "/injury-management" },
    { label: "Breaking Barriers", href: "/performance-training" },
  ],
  other: [
    { label: "Locations", href: "/locations" },
    { label: "Conditions We Treat", href: "/conditions" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Resources", href: "/resources" },
  ],
  policies: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Package Validity Policy", href: "/package-validity-policy" },
    { label: "Patient Consent & Waiver", href: "/patient-consent-waiver" },
    { label: "Doctor Disclaimer", href: "/doctor-disclaimer" },
    { label: "Delete Account", href: "/delete-account" },
  ],
};
