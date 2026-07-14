export const profile = {
  name: "Ahmed Aziz Mehrez",
  shortName: "Aziz Mehrez",
  title: "Full-Stack, Mobile & DevOps Engineer",
  subtitle: "AI & Computer Vision Enthusiast",
  roles: [
    "Full-Stack Engineer",
    "Mobile Developer",
    "DevOps & CI/CD",
    "AI & Computer Vision Enthusiast",
  ],
  image: "/api/profile-image",
  location: "Tunis, Tunisia",
  phone: "+216 21 838 333",
  email: "azizmehrez12@gmail.com",
  linkedin: "https://linkedin.com/in/aziz-mehrez-204294232",
  github: "https://github.com/MehrezAziz",
  bio: "Graduating Software Engineering student (ISSAT Sousse) with hands-on full-stack, mobile, and DevOps development experience gained across three internships, and a genuine enthusiasm for AI and computer vision. I've built a React Native on-demand delivery platform integrating an AI assistant (Groq LLM) and an ML microservice for driver verification, with automated CI/CD pipelines, a NestJS/Next.js ERP and e-commerce system, and a MERN-based bidding platform.",
  bioShort:
    "Comfortable working across the stack — mobile, backend, frontend, DevOps, and infrastructure — and looking for a role where I can keep building and learning.",
  available: true,
  // Edit this one line to change the hero status pill.
  availabilityText: "Available for full-time roles · Remote or relocation",
};

// CV / résumé files (in /public). Used by the language download button.
export const cvFiles = [
  { lang: "English", short: "EN", flag: "🇬🇧", file: "/api/cv?lang=en" },
  { lang: "Français", short: "FR", flag: "🇫🇷", file: "/api/cv?lang=fr" },
];

export const stats = [
  { value: 3, suffix: "+", label: "Professional Internships" },
  { value: 4, suffix: "+", label: "Live Products Shipped" },
  { value: 300, prefix: "Top ", label: "Worldwide Hackathon Rank" },
  { value: 6, suffix: "", label: "Certifications Earned" },
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  type: string;
  location?: string;
  highlights: string[];
  tech: string[];
  links?: { label: string; url: string }[];
};

export const experiences: Experience[] = [
  {
    role: "Software Engineering Intern (PFE)",
    company: "A.Solutions — Local Smart Delivery",
    period: "Feb 2026 – Jun 2026",
    type: "End-of-Studies Internship",
    highlights: [
      "Designed and built \"Local Smart Delivery\", an on-demand peer-to-peer delivery platform (React Native) featuring driver verification, a coin-based in-app economy, and an AI-powered support assistant.",
      "Implemented an in-app digital wallet enabling users to top up, manage, and spend their coin balance.",
      "Integrated a conversational AI assistant powered by the Groq LLM (Llama-3.3-70B) for in-app user support.",
      "Designed a dedicated Machine Learning microservice for automated driver verification.",
      "Set up and visualized CI/CD pipelines (GitHub Actions, Bitrise) to automate build, test, and deploy to Google Play.",
      "Evaluated payment gateways (Konnect & Flouci for local, Stripe for international), researching Estonian e-Residency vs. UK Ltd structures to work around regional restrictions.",
      "Produced UML diagrams and architecture visuals used in technical documentation and jury presentations.",
    ],
    tech: ["React Native", "Groq LLM", "Machine Learning", "GitHub Actions", "Bitrise", "Stripe", "Konnect", "Flouci"],
    links: [
      { label: "Web Console", url: "https://admin.localsmartdelivery.com/" },
      { label: "Google Play (Closed Testing)", url: "https://play.google.com/store" },
    ],
  },
  {
    role: "Full-Stack Development Intern (PFA)",
    company: "Amirez — ERP & E-commerce Platform",
    period: "2 months, 2025",
    type: "Internship",
    highlights: [
      "Built a full-stack ERP and e-commerce web platform: backend with NestJS and Prisma ORM, frontend with Next.js (TypeScript) and shadcn/ui.",
      "Implemented automated testing with Vitest to ensure reliability across core modules.",
    ],
    tech: ["NestJS", "Prisma", "Next.js", "TypeScript", "shadcn/ui", "Vitest"],
  },
  {
    role: "Full-Stack Development Intern (PFA)",
    company: "SAFI Industriel — Bidding Platform",
    period: "1 month, 2024",
    type: "Internship",
    highlights: [
      "Developed a full-stack bidding/auction platform (MERN: MongoDB, Express, React, Node.js) split into a dedicated client and API, and deployed it to production.",
    ],
    tech: ["MongoDB", "Express", "React", "Node.js"],
  },
  {
    role: "Freelance Full-Stack Developer — ERP Systems",
    company: "Self-Employed",
    period: "Aug 2024 – Aug 2025",
    type: "Freelance",
    highlights: [
      "Specialized in building ERP systems for clients using Next.js, NestJS, and PostgreSQL.",
    ],
    tech: ["Next.js", "NestJS", "PostgreSQL"],
  },
];

export type Project = {
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  featured: boolean;
  category: string;
  /** Tailwind gradient classes used for the card banner. */
  accent: string;
  /** Two-letter monogram shown on the banner. */
  monogram: string;
  /** Optional real screenshot placed in /public/projects/. Overrides the gradient banner. */
  image?: string;
  links?: { label: string; url: string }[];
};

export const projects: Project[] = [
  {
    title: "Local Smart Delivery",
    tagline: "AI-powered peer-to-peer delivery platform",
    description:
      "An on-demand P2P delivery app built in React Native with driver verification, a coin-based in-app economy, a digital wallet, and a Groq LLM (Llama-3.3-70B) support assistant. Includes an ML microservice for automated driver verification and full CI/CD to Google Play.",
    tech: ["React Native", "Groq LLM", "ML Microservice", "GitHub Actions", "Bitrise", "Stripe"],
    featured: true,
    category: "Mobile / AI",
    accent: "from-cyan-400 via-sky-500 to-blue-600",
    monogram: "LS",
    links: [{ label: "Admin Console", url: "https://admin.localsmartdelivery.com/" }],
  },
  {
    title: "Amirez ERP & E-commerce",
    tagline: "Full-stack ERP + storefront",
    description:
      "A complete ERP and e-commerce web platform with a NestJS + Prisma backend and a Next.js (TypeScript) + shadcn/ui frontend, backed by automated Vitest test suites for reliability across core modules.",
    tech: ["NestJS", "Prisma", "Next.js", "TypeScript", "shadcn/ui", "Vitest"],
    featured: true,
    category: "Full-Stack",
    accent: "from-purple-500 via-fuchsia-500 to-pink-500",
    monogram: "AZ",
  },
  {
    title: "SAFI Bidding Platform",
    tagline: "Real-time auction system",
    description:
      "A full-stack bidding/auction platform built on the MERN stack, split into a dedicated client and API service, and deployed to production.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    featured: true,
    category: "Full-Stack",
    accent: "from-emerald-400 via-teal-500 to-cyan-600",
    monogram: "SF",
  },
  {
    title: "Charity Organization Website",
    tagline: "Volunteer developer project",
    description:
      "Built and shipped a live website with a management dashboard for a charity organization as a volunteer developer.",
    tech: ["Next.js", "React", "Dashboard"],
    featured: false,
    category: "Web",
    accent: "from-rose-400 via-pink-500 to-purple-600",
    monogram: "JM",
    links: [{ label: "Live Site", url: "https://jam3iya.org/en/dashboard" }],
  },
  {
    title: "Student Management System",
    tagline: "Academic full-stack project",
    description:
      "A full-stack web application for managing student records, built with a Spring Boot backend and a React frontend.",
    tech: ["Spring Boot", "React", "MySQL"],
    featured: false,
    category: "Academic",
    accent: "from-amber-400 via-orange-500 to-rose-500",
    monogram: "SM",
  },
  {
    title: "Ship Cabin Management System",
    tagline: "Desktop booking app",
    description:
      "A JavaFX desktop application for managing ship cabin bookings, backed by MySQL and including report-printing capabilities.",
    tech: ["JavaFX", "MySQL", "Java"],
    featured: false,
    category: "Desktop",
    accent: "from-indigo-400 via-blue-500 to-cyan-500",
    monogram: "SC",
  },
];

export type SkillGroup = {
  category: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  { category: "Languages", skills: ["JavaScript", "TypeScript", "Java", "C", "C++", "Python", "MATLAB", "SQL"] },
  { category: "Mobile", skills: ["React Native", "Java", "Kotlin", "Google Play Deployment"] },
  { category: "Frontend", skills: ["React", "Next.js", "shadcn/ui", "HTML/CSS"] },
  { category: "Backend", skills: ["Node.js", "Express", "NestJS", "Spring Boot", ".NET", "Prisma ORM"] },
  { category: "Databases", skills: ["MongoDB", "MySQL", "PostgreSQL"] },
  { category: "DevOps & Tools", skills: ["Git / GitHub", "GitHub Actions", "Bitrise", "Docker", "Vitest"] },
  { category: "AI & Machine Learning", skills: ["Groq LLM (Llama-3.3-70B)", "ML Microservices", "Computer Vision"] },
  { category: "Payments", skills: ["Stripe", "Konnect", "Flouci"] },
];

export const marqueeSkills = [
  "JavaScript", "TypeScript", "React", "Next.js", "React Native", "Node.js",
  "NestJS", "Spring Boot", "Python", "Docker", "PostgreSQL", "MongoDB",
  "Groq LLM", "GitHub Actions", "Prisma", "Kotlin", "Java", "C++",
];

export type Achievement = {
  title: string;
  detail: string;
  year: string;
};

export const achievements: Achievement[] = [
  { title: "Hackathon Problem-Solving", detail: "Ranked in the Top 300 worldwide.", year: "2023" },
  { title: "MATLAB Skills", detail: "1st Prize Winner, High School Projects, Sousse.", year: "2023" },
  { title: "Next-Generation Networks Certification", detail: "ISSAT Sousse", year: "2024" },
  { title: "Network Security Certification", detail: "ISSAT Sousse", year: "2024" },
  { title: "Service Virtualization & Cloud Computing", detail: "ISSAT Sousse", year: "2025" },
  { title: "Big Data Certification", detail: "ISSAT Sousse", year: "2026" },
];

export const leadership = [
  {
    role: "Gold Member — IEEE ISSATso Student Branch",
    period: "Sep 2021 – Aug 2022",
    detail: "Executed a strategic plan to expand branch reach across campus, driving 200%+ membership growth while managing administrative tasks, records, and meetings.",
  },
  {
    role: "Leader & Manager — Freelance Team",
    period: "Sep 2022 – Dec 2025",
    detail: "Founded and led a freelance team specializing in dropshipping, digital marketing, and content creation, growing it from 2 to 5 members.",
  },
  {
    role: "Volunteer Developer — Charity Organization",
    period: "Mar 2026",
    detail: "Built a live website for a charity organization (jam3iya.org).",
  },
];

export const education = {
  degree: "National Diploma in Computer Engineering — Software Engineering",
  school: "ISSAT Sousse (Institut Supérieur des Sciences Appliquées et de Technologie de Sousse), Tunisia",
  period: "2021 – 2026",
  detail: "2021–2022: Preparatory Cycle  |  2022–2026: Engineering Cycle, Software Engineering",
};

export const languages = [
  { name: "Arabic", level: "Native", value: 100 },
  { name: "French", level: "Professional Working Proficiency", value: 85 },
  { name: "English", level: "Professional Working Proficiency", value: 85 },
];
