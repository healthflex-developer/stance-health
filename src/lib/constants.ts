export const BASE_URL = "https://www.stance.health";

// ── Cloudinary asset base URLs ────────────────────────────────────────────
// After running `bun scripts/upload-to-cloudinary.ts`, all assets are served
// from Cloudinary with automatic format/quality optimization.
//
// Cache-busting: We use Cloudinary's `_a` (analytics) query param with a
// build-time timestamp. This forces CDN to serve fresh content after every
// deployment without needing manual version bumping per image.
// Update ASSET_VERSION when you replace images and need instant cache bust.
const CLOUDINARY_CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "fxhi8rmk";
const CLOUDINARY_BASE = `https://res.cloudinary.com/${CLOUDINARY_CLOUD}`;
const ASSET_VERSION = process.env.NEXT_PUBLIC_ASSET_VERSION || "1";

// Images: auto format (webp/avif) + auto quality + cache bust
export const ASSETS = `${CLOUDINARY_BASE}/image/upload/f_auto,q_auto/stance-health/images`;

// Append cache-bust query param to any asset URL
export const cb = (url: string) => `${url}?_v=${ASSET_VERSION}`;

// Videos: served without transformations (Cloudinary streams them efficiently)
export const VIDEO_ASSETS = `${CLOUDINARY_BASE}/video/upload/stance-health/images`;

// OG images: full absolute URL for social sharing metadata
export const OG_ASSETS = `${CLOUDINARY_BASE}/image/upload/f_auto,q_auto/stance-health/images`;

// ── Marketing / Analytics IDs ─────────────────────────────────────────────
// Fill these in with your real IDs. An empty string disables that provider.
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";           // e.g. "GTM-XXXXXXX"
export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "";           // e.g. "G-XXXXXXXXXX"
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID ?? ""; // e.g. "123456789"

// Google Search Console site verification token (meta tag approach)
export const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "";

// ── Firebase config (used by analytics.ts for Firebase Analytics) ─────────
export const FIREBASE_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? "", // e.g. "G-XXXXXXXXXX"
} as const;

// ── CTA destinations ──────────────────────────────────────────────────────
const DASHBOARD_BASE = "https://book.stance.health/stance-health";
const APP_STORE_BASE = "https://apps.apple.com/us/app/stance-health/id6757695513";
const PLAY_STORE_BASE = "https://play.google.com/store/apps/details?id=com.stance.health";

/**
 * Static fallback used in Server Components and anchor hrefs.
 * The TrackingInit + buildTrackedUrl() flow will append live UTM / click-ID
 * params client-side via the useCta() hook (see src/hooks/useCta.ts).
 */
export const BOOKING_URL = DASHBOARD_BASE;
export const APP_STORE_URL = `${APP_STORE_BASE}?utm_source=website&utm_medium=cta&utm_campaign=app_install`;
export const PLAY_STORE_URL = `${PLAY_STORE_BASE}&utm_source=website&utm_medium=cta&utm_campaign=app_install`;

export const NAV_LINKS: Array<{ label: string; href: string; children?: { label: string; href: string }[] }> = [
  { label: "About", href: "/about" },
  { label: "Philosophy", href: "/philosophy" },
  // {
  //   label: "Programs",
  //   children: [
  //     { label: "In Your Stride", href: "/running" },
  //     { label: "Reclaim Your Game", href: "/back-to-sports" },
  //     { label: "Back on your feet", href: "/surgical-rehab" },
  //     { label: "Prevention & Recovery", href: "/injury-management" },
  //     { label: "Breaking Barriers", href: "/performance-training" },
  //   ],
  // },
  { label: "Assessment", href: "/assessment" },
  { label: "Services", href: "/services" },
  { label: "Conditions", href: "/conditions" },
  { label: "Locations", href: "/locations" },
  { label: "Partners", href: "/partners" },
  { label: "Careers", href: "/careers" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const FAQ_GENERAL = [
  {
    question: "Which locations do you operate in?",
    answer: "We currently have five centers across Bengaluru: HSR Layout, Whitefield, Indiranagar, JP Nagar, and Koramangala."
  },
  {
    question: "How do I book an appointment?",
    answer: "You can book directly through our website at book.stance.health, or call your nearest center to schedule an assessment."
  },
  {
    question: "What conditions does Stance Health treat?",
    answer: "We treat common musculoskeletal issues including knee pain, ACL injuries, back pain, sciatica, shoulder pain, frozen shoulder, neck pain, plantar fasciitis, ankle sprains, tennis elbow, and many other conditions. If you're not sure what's causing your pain, book an assessment and we'll help identify the cause."
  },
  {
    question: "What kind of plans does Stance Health offer?",
    answer: "We offer session-based treatment plans tailored to your condition, along with multi-session packages that provide better value for ongoing care. Your physiotherapist will recommend the most suitable plan based on your assessment."
  },
  {
    question: "Can Stance Health help me train for Hyrox?",
    answer: "Yes. Our sports performance team can support your Hyrox training using tools like VALD assessments to identify and improve weak points. We also incorporate injury prevention strategies if you have a history of injuries."
  },
  {
    question: "Do I need a doctor's referral to visit?",
    answer: "No. A doctor's referral is not required. You can book a consultation directly with one of our physiotherapists."
  },
  {
    question: "Do you combine Strength & Conditioning (S&C) with physiotherapy?",
    answer: "Yes, but only after your pain has been resolved. We first focus on physiotherapy to reduce pain and restore function. Once you're pain-free, we transition into Strength & Conditioning (S&C) to build strength, improve resilience, and reduce the likelihood of recurring injuries."
  },
  {
    question: "What happens during my first visit?",
    answer: "Your first visit includes a comprehensive assessment of your condition, a review of your medical history, movement and strength testing using VALD technology, and a detailed musculoskeletal screening by a physiotherapist. These assessments help identify persistent pain, movement asymmetries, force production deficits, and other irregularities before creating a personalized treatment plan."
  },
  {
    question: "Do you offer pre- and post-surgery rehabilitation programs?",
    answer: "Yes. We provide both prehabilitation programs to prepare you for surgery and structured post-surgical rehabilitation plans to support recovery. We also offer specialized care for prepartum and postpartum mothers, with treatment plans tailored to each individual's needs."
  },
  {
    question: "Does Stance Health offer services like IFT, cupping, or needling?",
    answer: "Our approach focuses on active, exercise-based rehabilitation rather than passive treatments such as cupping or needling. We use evidence-based physiotherapy, structured exercise programs, manual therapy where appropriate, and sports massage to relieve muscle tightness and address the root cause of your condition."
  },
  {
    question: "How do I give feedback about my experience at Stance Health?",
    answer: "You can share your feedback through our app, website contact form, or directly with our clinic staff. We value your feedback and use it to continuously improve our care."
  },
  {
    question: "What happens if I miss a scheduled session?",
    answer: "Missed sessions can usually be rescheduled. Please refer to our cancellation policy or contact your clinic for specific terms and assistance."
  },
  {
    question: "Can family members accompany me during my session?",
    answer: "Yes. In most cases, a family member or guardian is welcome to accompany you, especially for pediatric or elderly patients."
  },
  {
    question: "Can I switch clinic locations for my ongoing treatment?",
    answer: "Yes. You can continue your treatment plan at any Stance Health location that's more convenient for you."
  },
  {
    question: "How do I refer a friend or family member to Stance Health?",
    answer: "You can refer them through our app or website, or simply ask them to contact any of our clinics to book an assessment."
  }
];

export const ASSESSMENT_TOOLS = [
  { id: "forceframe", num: "01", label: "VALD ForceFrame" },
  { id: "forcedecks", num: "02", label: "VALD ForceDecks" },
  { id: "dynamo", num: "03", label: "VALD DynaMo" },
  { id: "output", num: "04", label: "Output Sports Sensors" },
  { id: "smartspeed", num: "05", label: "VALD SmartSpeed" },
];

export const ASSESSMENT_SECTIONS = [
  {
    id: "forceframe",
    num: "01",
    badge: "VALD FORCEFRAME",
    title: "Measure Strength and Identify Imbalances",
    description:
      "ForceFrame gives our team objective measurements of strength across major joints and muscle groups. This allows us to identify weaknesses and side-to-side imbalances, personalise your treatment and show you how your strength is improving over time.",
    points: [
      "Joint-specific strength measurement",
      "Immediate left-to-right comparison",
      "Repeatable positions for future reassessment",
    ],
    image: `${ASSETS}/forceframe.png`,
  },
  {
    id: "forcedecks",
    num: "02",
    badge: "VALD FORCEDECKS",
    title: "Understand Power, Balance and Movement",
    description:
      "By analysing how you jump, land, balance and absorb force, ForceDecks helps our team identify movement strategies that may limit your recovery or performance. You receive a clearer understanding of your capabilities and a progression plan based on measurable results.",
    points: [
      "Jump height, force and power",
      "Landing symmetry and balance",
      "Load absorption and weight distribution",
    ],
    image: `${ASSETS}/forcedeck.png`,
  },
  {
    id: "dynamo",
    num: "03",
    badge: "VALD DYNAMO",
    title: "Pinpoint Muscle Weaknesses",
    description:
      "Portable strength testing with Dynamo enables our team to assess specific muscles and joints wherever targeted testing is required. The results help us focus your treatment on the areas that need the most attention and demonstrate whether those areas are becoming stronger.",
    points: [
      "Push and pull strength tests",
      "Grip strength measurement",
      "Portable, targeted testing",
    ],
    image: `${ASSETS}/assessment/dynamo.png`,
  },
  {
    id: "output",
    num: "04",
    badge: "OUTPUT SPORTS SENSORS",
    title: "Personalise Training Intensity",
    description:
      "Output Sports sensors provide real-time information about movement velocity, power and exercise performance. This helps our team select appropriate loads, adjust your training intensity and progress exercises at the right time, giving you a programme that responds to your individual capabilities.",
    points: [
      "Movement and repetition velocity",
      "Power measurement",
      "Set-to-set and reassessment comparison",
    ],
    image: `${ASSETS}/forcedeck.png`,
  },
  {
    id: "smartspeed",
    num: "05",
    badge: "VALD SMARTSPEED",
    title: "Track Speed and Agility",
    description:
      "SmartSpeed timing gates accurately measure acceleration, sprint speed and change-of-direction performance. Our team uses this information to tailor speed and agility training, while helping you track progress and prepare for the real demands of your sport.",
    points: [
      "Sprint speed and total time",
      "Acceleration and split times",
      "Selected agility and reactivity tests",
    ],
    image: `${ASSETS}/forcedeck.png`,
  },
];

export const ASSESSMENT_PERFORMANCE_DATA = [
  { title: "Knee Flexion – Prone", left: "117.3 N", right: "117.8 N", asym: "0.4% Left" },
  { title: "Knee Extension", left: "325.1 N", right: "440.2 N", asym: "26.1% Left" },
  { title: "Ankle Plantarflexion", left: "607.3 N", right: "692.4 N", asym: "12.3% Left" },
  { title: "Hip AD/AB – 45", left: "234.5 N", right: "251.8 N", asym: "6.9% Right" },
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
    icon: `${ASSETS}/forceframe.png`,
    description: "Accurate testing of isometric strength across various muscle groups",
  },
  {
    id: "vald-force-decks",
    name: "VALD | Force Decks",
    icon: `${ASSETS}/forcedeck.png`,
    description:
      "Dual force plates for accurately testing explosive power, balance and neuromuscular control",
  },
  // {
  //   id: "healthflex",
  //   name: "HealthFlex",
  //   icon: `${ASSETS}/tech1.jpg`,
  //   description: "AI-based motion sensors that guide you in your rehabilitation journey at home.",
  // },
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
    image: `${ASSETS}/durga.jpg`,
    bio: "Durga brings over 12 years of experience in musculoskeletal and sports physiotherapy, specializing in manual therapy techniques such as Maitland, McKenzie, Clinical Pilates, and Butler's Neurodynamic treatments. Her professional journey includes collaborations with esteemed institutions like Sakra World Hospital and YOS Sports Health Specialists, as well as working closely with industry's best physiotherapists and sports medicine doctors.",
  },
  // {
  //   name: "Sumesh Ashokan",
  //   role: "Senior Musculoskeletal and Sports Physiotherapist",
  //   experience: "8+ years experience",
  //   image: `${ASSETS}/team-2.svg`,
  //   bio: "As an athlete turned physiotherapist, Sumesh's mission at Stance is to guide you from injury recovery to performance enhancement. With his experience in various sports and a deep understanding of human anatomy, he provides personalized care tailored to your needs. His holistic approach ensures accurate diagnosis and prevention of future injuries, helping you achieve a better tomorrow.",
  // },
  {
    name: "Anand Date",
    role: "S&C",
    experience: "15+ years experience",
    image: cb(`${ASSETS}/Anand.png`),
    bio: "Anand is a strength and conditioning coach and sports science professional with over 15 years of experience working with high-performance athletes. His work focuses on performance development, injury recovery, and return-to-sport preparation through structured strength and conditioning programs. He applies high-performance training and recovery strategies to help athletes and active individuals move and perform better.",
  },
  {
    name: "Arjun K Raj",
    role: "Senior Strength and Conditioning Coach",
    experience: "6+ years experience",
    image: `${ASSETS}/Arjun.jpg`,
    bio: "At Stance, Arjun's goal is to help you achieve your fitness aspirations through personalized, meticulously crafted training programs. By understanding your unique needs, he tailors each plan to guide you towards peak performance and a healthier lifestyle. Together, you will unlock your full potential and ensure every step is taken towards your success.",
  },
  {
    name: "Surbhi Paranjpe",
    role: "Senior Musculoskeletal and Sports Physiotherapist",
    experience: "5+ years experience",
    image: `${ASSETS}/Surbhi.jpg`,
    bio: "With a commitment to precise diagnosis and evidence-based treatment, Surbhi helps you manage and overcome musculoskeletal conditions. Her focus is on pain management and performance enhancement, ensuring you achieve your objectives while minimizing injury risks. Through tailored programs and education, she empowers you to reach your full athletic potential.",
  },
  //new members
  //   {
  //   name: "Maitri Gala",
  //   role: "Physiotherapist",
  //   experience: "5+ years experience",
  //   image: `${ASSETS}/team-5.svg`,
  //   bio: "Maitri is a physiotherapist with experience working with national-level athletes across sports such as hockey, volleyball, and football. Her work focuses on injury prevention, rehabilitation, and optimizing physical performance through individualized treatment strategies. She applies evidence-based physiotherapy to support recovery from musculoskeletal injuries and improve functional movement.",
  // },
  {
    name: "Vignesh Seetharaman",
    role: "Sports Physiotherapist",
    experience: "6+ years experience",
    image: `${ASSETS}/team-6.png`,
    bio: "Vignesh is a sports physiotherapist with a degree in physiotherapy and advanced training in sports physiotherapy, specializing in injury rehabilitation and return-to-play protocols. His work includes musculoskeletal assessments, manual therapy techniques, and sports-specific rehabilitation strategies. He has supported athletes across football, squash, hockey, kabaddi, volleyball, and weightlifting.",
  },
  {
    name: "Sneha Jain",
    role: "Sports Physiotherapist",
    experience: "4+ years experience",
    image: `${ASSETS}/team-7.png`,
    bio: "Sneha holds a degree in Physiotherapy and is pursuing specialization in Sports Physiotherapy. Her work focuses on post-operative sports injury rehabilitation, including ACL reconstruction and shoulder instability cases, alongside movement screening and performance recovery.",
  },
  // {
  //   name: "Vaishnavi Balani",
  //   role: "Musculoskeletal Physiotherapist",
  //   experience: "4+ years experience",
  //   image: `${ASSETS}/team-8.png`,
  //   bio: "Vaishnavi holds a degree in Physiotherapy and is pursuing a specialization in Musculoskeletal Physiotherapy. Her work focuses on orthopedic rehabilitation, post-operative recovery, and patient-specific exercise therapy.",
  // },
  {
    name: "Shreya Poojary",
    role: "Physiotherapist",
    experience: "4+ years experience",
    image: `${ASSETS}/team-9.png`,
    bio: "Shreya holds a degree in Physiotherapy with experience in musculoskeletal rehabilitation and sports physiotherapy. Her work includes treating orthopedic and spinal conditions, designing rehabilitation programs, and providing on-field physiotherapy support.",
  },
  {
    name: "Vanshika Tandon",
    role: "Musculoskeletal Physiotherapist",
    experience: "4+ years experience",
    image: `${ASSETS}/team-10.png`,
    bio: "Vanshika holds a degree in Physiotherapy and is pursuing specialization in Musculoskeletal and Manual Therapy. Her work focuses on rehabilitation planning, functional mobility restoration, and manual therapy techniques.",
  },
  {
    name: "Arun Raj",
    role: "Sports Physiotherapist",
    experience: "6+ years experience",
    image: `${ASSETS}/Arun.jpg`,
    bio: "Arun holds degrees in Physiotherapy and Musculoskeletal & Sports Physiotherapy and focuses on orthopedic and sports injury rehabilitation. His work emphasizes individualized rehabilitation protocols, injury prevention strategies, and functional recovery.",
  },
  {
    name: "Keerthana S",
    role: "Sports Physiotherapist",
    experience: "4+ years experience",
    image: `${ASSETS}/team-12.png`,
    bio: "Keerthana holds a degree in Physiotherapy and is pursuing specialization in Sports Physiotherapy. Her work focuses on athlete assessment, injury prevention, kinesiology taping, and return-to-sport rehabilitation.",
  },
  {
    name: "Erica D'Costa",
    role: "Musculoskeletal Physiotherapist",
    experience: "4+ years experience",
    image: `${ASSETS}/Erica.png`,
    bio: "Erica holds a degree in Physiotherapy and is pursuing specialization in Musculoskeletal Physiotherapy. Her work focuses on assessment and rehabilitation of musculoskeletal injuries through exercise therapy and manual therapy approaches.",
  },
  {
    name: "Pandieswari Pandian",
    role: "Sports Physiotherapist",
    experience: "5+ years experience",
    image: `${ASSETS}/Eswari.jpg`,
    bio: "Pandieswari holds a degree in Physiotherapy with experience in musculoskeletal and sports injury rehabilitation. She utilizes techniques such as dry needling, myofascial release, joint mobilization, and kinesiology taping to support patient recovery.",
  },
  {
    name: "Kiandra Fernandes",
    role: "Musculoskeletal Physiotherapist",
    experience: "5+ years experience",
    image: `${ASSETS}/Kiandra.png`,
    bio: "Kiandra is a musculoskeletal physiotherapist pursuing specialization in Musculoskeletal Sciences, with a background in exercise-based rehabilitation and manual therapy. She focuses on structured rehabilitation for musculoskeletal and sports-related injuries.",
  },
  {
    name: "Harini Bidari",
    role: "Musculoskeletal Physiotherapist",
    experience: "5+ years experience",
    image: `${ASSETS}/team-16.png`,
    bio: "Harini is a musculoskeletal physiotherapist specializing in post-operative rehabilitation, biomechanics, and exercise-based recovery. She integrates manual therapy, movement assessment, and strength-focused rehabilitation to support patient outcomes.",
  },
  {
    name: "Pradyumna Bopaiah",
    role: "Strength and Conditioning Coach",
    experience: "10+ years experience",
    image: `${ASSETS}/team-18.png`,
    bio: "Pradyumna is a high-performance strength and conditioning coach with a background in sprinting. He has worked with international cricketers, elite track and field athletes, and national-level football players.",
  },
  {
    name: "Srinivas M",
    role: "Strength and Conditioning Coach",
    experience: "8+ years experience",
    image: `${ASSETS}/team-19.png`,
    bio: "Srinivas is a physiotherapist and sports scientist working in strength and conditioning. He integrates clinical expertise with evidence-based training to build strength, resilience, and long-term athletic capacity.",
  },
  {
    name: "Sharvari Godase",
    role: "Strength and Conditioning Coach",
    experience: "5+ years experience",
    image: `${ASSETS}/team-20.png`,
    bio: "Sharvari holds a degree in Sports and Exercise Science and focuses on structured strength testing, sport-specific program design, and functional strength development. She brings competitive sporting experience into her coaching approach.",
  },
  {
    name: "Shubh Gupta",
    role: "Strength and Conditioning Coach",
    experience: "5+ years experience",
    image: `${ASSETS}/team-21.png`,
    bio: "Shubh holds a degree in Exercise and Sports Science with training in biomechanics, exercise physiology, and athlete performance testing. His work focuses on strength programming, biomechanical analysis, and return-to-play support.",
  },
  {
    name: "Kaushik Jadhav",
    role: "Strength and Conditioning Coach",
    experience: "6+ years experience",
    image: `${ASSETS}/team-22.png`,
    bio: "Kaushik holds a BPED qualification and ASCA Level 1 certification in Strength and Conditioning. His coaching focuses on structured performance testing, strength development, and safe return-to-sport progression.",
  },
  {
    name: "Sanket Sharma",
    role: "Strength and Conditioning Coach",
    experience: "8+ years experience",
    image: `${ASSETS}/team-23.png`,
    bio: "Sanket is a Certified Strength and Conditioning Specialist (CSCS) with additional training in sports nutrition and sports psychology. His work focuses on speed, power development, and sport-specific conditioning.",
  },
  {
    name: "Vamshi P",
    role: "Strength and Conditioning Coach",
    experience: "5+ years experience",
    image: `${ASSETS}/team-24.png`,
    bio: "Vamshi holds a degree in Sports and Exercise Science with training in biomechanics, exercise physiology, and athlete performance testing. His work involves strength and conditioning program design alongside physiological and biomechanical assessments.",
  },
  {
    name: "Rajath M",
    role: "Strength and Conditioning Coach",
    experience: "5+ years experience",
    image: `${ASSETS}/team-25.png`,
    bio: "Rajath holds a degree in Sports Science with training in biomechanics, exercise physiology, and sports nutrition. His work focuses on performance assessment, strength and conditioning program design, and recovery strategies.",
  },
  {
    name: "Soham Veer",
    role: "Strength and Conditioning Coach",
    experience: "5+ years experience",
    image: `${ASSETS}/soham.jpg`,
    bio: "Soham holds a degree in Sports and Exercise Science with specialization in sports biomechanics and strength and conditioning. He develops sport-specific strength and conditioning programs to improve movement efficiency and athletic performance.",
  },
  {
    name: "Pooja Khandelwal",
    role: "Strength and Conditioning Coach",
    experience: "7+ years experience",
    image: `${ASSETS}/pooja.png`,
    bio: "Pooja is a Certified Strength and Conditioning Specialist (CSCS) with additional certifications in personal training and fitness nutrition. She focuses on strength development, conditioning, and injury prevention through individualized training programs.",
  },
  {
    name: "Prajwal Acharya",
    role: "Strength and Conditioning Coach",
    experience: "6+ years experience",
    image: `${ASSETS}/team-28.png`,
    bio: "Prajwal holds degrees in Exercise and Sports Science with specialization in strength and conditioning, biomechanics, and exercise physiology. His work focuses on athlete performance testing and data-driven training program design.",
  },
  // {
  //   name: "Hemanth Das",
  //   role: "Strength and Conditioning Coach",
  //   experience: "6+ years experience",
  //   image: `${ASSETS}/team-29.png`,
  //   bio: "Hemanth is a Strength and Conditioning Coach with experience working with elite and team sport athletes. He designs individualized training programs and periodized plans to help athletes build strength, improve resilience, and return to sport safely.",
  // },
  {
    name: "Anmol Khanna",
    role: "Strength and Conditioning Coach",
    experience: "4+ years experience",
    image: cb(`${ASSETS}/Anmol.png`),
    bio: "Anmol is pursuing a degree in Strength and Conditioning and focuses on structured performance training and workload monitoring. His work includes strength development, rehabilitation support, and return-to-play programming.",
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
    image: `/assets/images/pt-2.svg`,
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

export const TEAM_TESTIMONIALS = [
  {
    quote: "I'm learning something new every day, which is helping me grow both personally and professionally. I believe this experience is helping me become a better physiotherapist and will contribute significantly to my development as a clinician in the future. The work environment is supportive, well-organized, and professionally managed, making it a great place to learn and grow.",
    name: "Anjali",
    role: "Physio Intern",
    initials: "A",
  },
  {
    quote: "It's been a great learning experience with a supportive team and a professional environment. It has improved my practical skills, confidence, and understanding of strength and conditioning in real-world settings. Stance offers a more structured approach, better mentorship, and greater exposure to athlete assessment and evidence-based training.",
    name: "Akshat",
    role: "S&C Intern",
    initials: "A",
  },
  {
    quote: "Working at Stance has been incredibly rewarding. As an early-career physiotherapist, mentorship from experienced clinicians and exposure to evidence-based practice have strengthened my clinical reasoning, confidence, and hands-on skills. What stands out most is Stance's collaborative culture and individualised approach to care, looking beyond symptoms to understand the root cause. Its focus on quality, teamwork, and continuous learning makes it a place where both patients and therapists can thrive.",
    name: "Richwin",
    role: "Physiotherapist",
    initials: "R",
  },
  {
    quote: "Working at Stance has been a great learning experience so far. As an intern, I've had the opportunity to enhance my clinical reasoning, assessment skills, and confidence through an evidence-based approach and excellent mentorship. What sets Stance apart is its focus on objective assessments, individualized rehabilitation, and continuous learning. The collaborative environment has made it a valuable place for both my professional and personal growth. I'm grateful to be part of the team.",
    name: "Muskan Agrawal",
    role: "Physiotherapy Intern",
    initials: "M",
  },
  {
    quote: "I joined Stance to build my expertise in return-to-sport, performance, and clinical care, and the exposure to a wide range of injuries and conditions has made the experience incredibly valuable.",
    name: "Paramjeet",
    role: "S&C Intern",
    initials: "P",
  },
  {
    quote: "Working at Stance has been a truly rewarding experience. The professional and supportive environment encourages continuous learning, and everyone on the team is approachable and always willing to help. Through exposure to evidence-based assessments, rehabilitation methods, and advanced technology, I have strengthened my clinical knowledge, practical skills, and clinical reasoning. This experience has played an important role in my professional growth.",
    name: "Bhuvanshree",
    role: "Physiotherapy Intern",
    initials: "B",
  },
];

export const CAREER_VALUES = [
  { icon: "wrench", title: "Bring a problem, leave with a fix", body: "That's less a value statement and more just how work happens here." },
  { icon: "brain", title: "Reasoning over résumé", body: "We hire for how you think, not how your CV reads. Nowhere to hide once they do." },
  { icon: "chat", title: "Ideas don't wait in line", body: "No ladder to climb before someone hears you out. Nowhere to hide once they do." },
  { icon: "chart", title: "We don't guess", body: "Every decision has a number attached. That's just how the place runs." },
  { icon: "bolt", title: "We move fast", body: "50,000+ sessions delivered, 4 centers live, a 5th on the way. You'll feel the pace in week one." },
  { icon: "gamepad", title: "Compete a little, unwind a lot", body: "Thursdays, we trade laptops for a ball. Football, cricket, pickleball — by vote." },
];

export const CAREER_FAQ = [
  { question: "Which locations do you operate in?", answer: "We currently have five centers across Bengaluru: HSR Layout, Whitefield, Indiranagar, JP Nagar and Koramangala." },

  {
    question: "How do I book an appointment?",
    answer: "You can book directly through our website at book.stance.health, or call your nearest center to schedule an assessment "
  }



];

export const OPEN_ROLES_DETAILED = [
  {
    slug: "senior-sc",
    title: "Senior Strength & Conditioning Coach",
    location: "Bengaluru (HSR · Whitefield · Indiranagar)",
    category: "Clinical & Performance",
    type: "Full-time",
    experience: "3+ years full-time (excluding internship)",
    qualification: "BSc Sports/Exercise Science with 3+ yrs, or MSc Sports Science / Exercise Physiology / S&C with 2+ yrs — in an academy, pro team, high-performance centre or elite facility.",
    description: "Lead performance training for athletes and active individuals. Beyond coaching, this role owns mentorship, project ownership, operational excellence and cross-team collaboration.",
    sections: [
      { title: "Strength & Conditioning delivery", points: ["Design and deliver evidence-based programmes.", "Run athlete assessments and performance profiling.", "Build sport-specific performance plans.", "Lead individual and small-group sessions.", "Maintain flawless documentation."] },
      { title: "Sports science & technology", points: ["Use VALD, RunScribe, Output, ForceDecks and other assessment tools.", "Contribute to testing protocols and performance standards."] },
      { title: "Return-to-performance", points: ["Bridge rehab and performance with physiotherapists.", "Own injury prevention and load management.", "Educate athletes on recovery and performance."] },
      { title: "Leadership & team development", points: ["Mentor junior coaches and interns.", "Support onboarding and skill development.", "Lead internal workshops and knowledge shares."] },
      { title: "Preferred certifications", points: ["ASCA Level 1/2, EXOS, NSCA-CSCS, FMS, UKSCA, ACSM Performance."] },
    ],
    whyJoin: ["India's first fully technology-integrated sports physio + rehab ecosystem.", "Work alongside experienced physios, sports scientists and coaches.", "Cutting-edge sports science and performance tech.", "High-growth environment with leadership pathways."],
  },
  {
    slug: "junior-sc",
    title: "Junior Strength & Conditioning Coach",
    location: "Bengaluru (HSR · Whitefield · Indiranagar)",
    category: "Clinical & Performance",
    type: "Full-time",
    experience: "1-3 years",
    qualification: "BSc Sports/Exercise Science or equivalent. Exposure to team or individual sport settings preferred.",
    description: "Support senior coaches in delivering performance programmes. Own a caseload, run assessments, and grow under structured mentorship.",
    sections: [
      { title: "Core responsibilities", points: ["Deliver S&C sessions under senior supervision.", "Run assessments using VALD and ForceDecks.", "Document athlete progress and session notes.", "Support programme design for assigned athletes."] },
      { title: "Growth & learning", points: ["Weekly case discussions with senior coaches.", "Attend internal workshops and CPD sessions.", "Shadow return-to-performance cases."] },
    ],
    whyJoin: ["Structured mentorship from day one.", "Real athlete caseload within the first month.", "Access to elite-level technology and data systems.", "Clear promotion pathway to Senior within 18-24 months."],
  },
  {
    slug: "sc-intern",
    title: "Strength & Conditioning Intern",
    location: "Bengaluru (HSR · Whitefield · Indiranagar)",
    category: "Clinical & Performance",
    type: "Internship (3 months)",
    experience: "Final year or recent graduate",
    qualification: "BSc Sports Science / Exercise Science (final year or completed).",
    description: "A structured 3-month internship with floor exposure, supervised coaching, and progressive responsibility.",
    sections: [
      { title: "What you'll do", points: ["Shadow and assist senior coaches on the floor.", "Learn assessment protocols and documentation.", "Gradually take on supervised sessions.", "Present a case study at the end of the programme."] },
    ],
    whyJoin: ["Stipend provided.", "Real coaching experience from week one.", "Potential conversion to full-time role.", "Mentorship from India's leading S&C professionals."],
  },
  {
    slug: "senior-physio",
    title: "Senior / In-charge Physiotherapist — MSK & Sports",
    location: "Bengaluru",
    category: "Clinical & Performance",
    type: "Full-time",
    experience: "5+ years",
    qualification: "MPT in Orthopaedics / Sports / Musculoskeletal. Additional certifications in manual therapy or sports rehab preferred.",
    description: "Lead clinical decision-making, manage complex cases, and mentor junior physiotherapists. This is a clinical leadership role.",
    sections: [
      { title: "Clinical delivery", points: ["Manage complex MSK and sports injury caseloads.", "Design and execute rehabilitation programmes.", "Use VALD, ForceDecks and motion analysis in clinical reasoning.", "Collaborate with S&C coaches on return-to-performance."] },
      { title: "Leadership", points: ["Mentor junior physios and interns.", "Lead clinical audits and case presentations.", "Contribute to SOPs and protocol development."] },
    ],
    whyJoin: ["India's first fully technology-integrated sports physio + rehab ecosystem.", "Multi-disciplinary team environment.", "Clinical leadership pathway.", "Work with elite and recreational athletes."],
  },
  {
    slug: "junior-physio",
    title: "Junior Sports Physiotherapist",
    location: "Bengaluru (HSR · Whitefield)",
    category: "Clinical & Performance",
    type: "Full-time",
    experience: "2-5 years",
    qualification: "BPT / MPT. Interest in sports and MSK physiotherapy.",
    description: "Deliver hands-on physiotherapy, manage a caseload, and grow your clinical reasoning under experienced clinicians.",
    sections: [
      { title: "Core responsibilities", points: ["Assess and treat MSK conditions.", "Use technology-assisted diagnostics.", "Document patient progress meticulously.", "Collaborate with S&C on rehab-to-performance transition."] },
    ],
    whyJoin: ["Structured mentorship and case discussions.", "Access to cutting-edge assessment technology.", "Diverse caseload — athletes to weekend warriors.", "Clear growth pathway to senior clinician."],
  },
  {
    slug: "physio-intern",
    title: "Physiotherapy Intern",
    location: "Bengaluru (All centres)",
    category: "Clinical & Performance",
    type: "Internship (2 months)",
    experience: "Final year BPT or recent graduate",
    qualification: "BPT (final year or completed).",
    description: "A structured clinical rotation with supervised caseload, case discussions, and hands-on learning.",
    sections: [
      { title: "What you'll do", points: ["Observe and assist senior physiotherapists.", "Learn assessment and documentation protocols.", "Take supervised patient sessions.", "Present a clinical case study."] },
    ],
    whyJoin: ["Stipend provided.", "Hands-on clinical exposure from day one.", "Potential conversion to full-time.", "Work in a multi-disciplinary sports health setting."],
  },
  {
    slug: "patient-care",
    title: "Patient Care Coordinator",
    location: "Bengaluru (Indiranagar)",
    category: "Patient Care & Operations",
    type: "Full-time",
    experience: "1+ years in healthcare/hospitality",
    qualification: "Graduate in any discipline. Strong communication skills.",
    description: "Own the patient experience from booking to discharge. Coordinate schedules, manage communications, and ensure seamless operations.",
    sections: [
      { title: "Core responsibilities", points: ["Manage patient bookings and schedules.", "Coordinate between clinicians and patients.", "Handle patient queries via phone and WhatsApp.", "Maintain documentation and billing support."] },
    ],
    whyJoin: ["Work in a fast-paced healthcare startup.", "Direct impact on patient experience.", "Growth into operations leadership.", "Collaborative and supportive team."],
  },
  {
    slug: "operations",
    title: "Operations Associate",
    location: "Bengaluru",
    category: "Corporate & Leadership",
    type: "Full-time",
    experience: "2+ years in operations/startups",
    qualification: "Graduate/MBA. Startup or healthcare operations experience preferred.",
    description: "Support centre operations, vendor management, and process optimization across multiple locations.",
    sections: [
      { title: "Core responsibilities", points: ["Manage day-to-day centre operations.", "Coordinate with vendors and suppliers.", "Track operational KPIs and reporting.", "Support new centre launches."] },
    ],
    whyJoin: ["Multi-location operations experience.", "High ownership from day one.", "Fast-growing healthcare company.", "Work directly with founding team."],
  },
];

export const CENTERS = [
  {
    name: "HSR Layout",
    phone: "+91 6360014559",
    address:
      "2nd Floor, 1555, 19th Main Rd, Agara, 1st Sector, HSR Layout, Bengaluru, Karnataka 560102",
    image: `${ASSETS}/HSR.JPG`,
    maps: "https://maps.app.goo.gl/TfixHcJfTjjPMyKq8",
  },
  {
    name: "Whitefield",
    phone: "+91 6361056456",
    address:
      "4th Floor, Kailash Parbat, No. 149, Doddanakundi, 2nd Phase, Hoodi, Whitefield, Bengaluru, Karnataka 560048",
    image: `${ASSETS}/whitefield.webp`,
    maps: "https://www.google.com/maps/place/Stance+Health/@12.9858932,77.7082149,17z/data=!3m2!4b1!5s0x3bae119ae2509811:0x8383d133539a7b!4m6!3m5!1s0x3bae11ed0a8b499b:0x5f1478679abe452a!8m2!3d12.9858932!4d77.7082149!16s%2Fg%2F11xdsrwj0m",
  },
  {
    name: "Indiranagar",
    phone: "+91 9008417804",
    address:
      "3rd Floor, Srinivasan Towers, ESI Hospital Road, Defence Colony, Indiranagar, Bengaluru, Karnataka 560038",
    image: `${ASSETS}/indra.webp`,
    maps: "https://maps.app.goo.gl/su4xnN965KRdK47s9",
  },
  {
    name: "JP NAGAR",
    phone: "+91 6366941095",
    address:
      "Ward No.57, 3rd Floor, V.B.R Ruddhi, 558, 9th Cross Rd, 3rd Phase, J. P. Nagar, Bengaluru, Karnataka 560078",
    image: `${ASSETS}/JP_Nagar.jpg`,
    maps: "https://maps.app.goo.gl/bAdshZ7kyvqnLNdq9",
  },
  {
    name: "KORAMANGALA",
    phone: "+91 6366940175",
    address:
      "Unit No. 22, Ground floor, 80 Feet Rd, S.T. Bed, 4th Block, Koramangala, Bengaluru, Karnataka 560034",
    image: `${ASSETS}/koramangala.jpeg`,
    maps: "https://maps.app.goo.gl/hTP95zAu7pv4c79Y6",
  },
];

export const FOOTER_LINKS = {
  about: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
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
