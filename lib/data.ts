export const profile = {
  name: "Ahmed Aziz Mehrez",
  shortName: "Aziz Mehrez",
  title: "Software Engineer — Full-Stack, DevOps & AI",
  subtitle: "Node.js · React / React Native · Docker, Kubernetes & Cloud",
  roles: [
    "Full-Stack Engineer",
    "DevOps Engineer",
    "AI & LLM Engineer",
    "Tech Lead",
  ],
  image: "/api/profile-image",
  location: "Tunis, Tunisia",
  phone: "+216 21 838 333",
  email: "azizmehrez12@gmail.com",
  linkedin: "https://linkedin.com/in/aziz-mehrez-204294232",
  github: "https://github.com/MehrezAziz",
  bio: "Software engineer (5-year engineering degree, Master's level, ISSAT Sousse) with 3 years of experience shipping products end to end: Node.js/NestJS/Express back ends, React/Next.js and React Native front ends, PostgreSQL/MySQL/MongoDB, and the CI/CD and cloud infrastructure behind them (Docker, Kubernetes, AWS, Azure, GitHub Actions). Tech Lead & Managing Director of Amirez since April 2025, leading a Scrum development team. I enjoy turning an MVP into a stable, production-ready product.",
  bioShort:
    "I build and run production apps end to end: APIs, mobile and web front ends, CI/CD and AI features.",
  available: true,
  // Edit this one line to change the hero status pill.
  availabilityText: "Open to remote roles · Relocation in Europe",
};

// CV / résumé files (in /public). Used by the language download button.
export const cvFiles = [
  { lang: "English", short: "EN", flag: "🇬🇧", file: "/api/cv?lang=en" },
  { lang: "Français", short: "FR", flag: "🇫🇷", file: "/api/cv?lang=fr" },
];

export const stats = [
  { value: 3, suffix: "+", label: "Years of Experience" },
  { value: 4, suffix: "+", label: "Live Products Shipped" },
  { value: 300, prefix: "Top ", label: "Worldwide Hackathon Rank" },
  { value: 4, suffix: "", label: "Certifications Earned" },
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
    role: "Tech Lead & Managing Director",
    company: "Amirez — E-commerce Company, North Africa",
    period: "Apr 2025 – Present",
    type: "Full-Time",
    highlights: [
      "Lead a development team in 2-week Scrum sprints; own architecture, code reviews and CI/CD.",
      "Own technical decisions, code quality standards and the pipelines that deliver regular client releases.",
      "Translate client requirements into technical specifications, user stories with acceptance criteria and data models.",
      "Mentor developers and allocate tasks according to each profile; track progress in Jira and Trello.",
      "Run the company's Meta Ads campaigns and track KPIs (CTR, CPC, CPA, ROAS) with regular performance reports.",
    ],
    tech: ["Scrum", "Architecture", "Code Review", "CI/CD", "Jira", "Trello", "Meta Ads"],
  },
  {
    role: "Freelance Full-Stack Developer & Digital Marketing Specialist",
    company: "Self-Employed",
    period: "Feb 2024 – Apr 2025",
    type: "Freelance",
    highlights: [
      "Built and deployed an ERP and complete e-commerce stores for business clients, from requirements analysis to production.",
      "Ran conversion-focused Facebook Ads campaigns with A/B testing and CPA optimisation.",
      "Integrated Meta Pixel tracking to measure conversions for clients.",
    ],
    tech: ["ERP", "E-commerce", "Meta Pixel", "Facebook Ads", "Digital Marketing"],
  },
  {
    role: "Software Engineering Intern",
    company: "A.Solutions — Local Smart Delivery",
    period: "5 months",
    type: "Internship",
    highlights: [
      "Designed and shipped Local Smart Delivery, a live peer-to-peer delivery platform as a React Native mobile app, covering users, delivery requests, courier verification and an internal coin economy.",
      "Implemented the digital wallet logic: coin top-ups, balance management and spending.",
      "Integrated an LLM-powered support assistant (Groq API, Llama-3.3-70B) and designed a Python machine-learning microservice for automatic courier verification.",
      "Built CI/CD pipelines (GitHub Actions, Bitrise) automating build, tests and deployment of the mobile app to Google Play.",
      "Evaluated local and international payment gateways (Konnect and Flouci locally, Stripe internationally) for the coin economy.",
      "Produced UML diagrams and technical documentation for the platform; still managing the platform today.",
    ],
    tech: ["React Native", "Node.js", "Groq LLM", "Python ML", "GitHub Actions", "Bitrise", "Stripe"],
    links: [
      { label: "Web Console", url: "https://admin.localsmartdelivery.com/" },
      { label: "Google Play (Closed Testing)", url: "https://play.google.com/store" },
    ],
  },
  {
    role: "Full-Stack Developer Intern",
    company: "SAFI Industriel — ERP & E-commerce Platform",
    period: "2 months",
    type: "Internship",
    highlights: [
      "Designed the relational data model with Prisma ORM (schemas and relations) covering both the ERP and the e-commerce domains.",
      "Built a modular NestJS back end (modules, controllers, services) exposing the REST APIs consumed by the web application.",
      "Developed the Next.js (TypeScript) front end with reusable shadcn/ui components for the back office and the online store.",
      "Wrote automated tests with Vitest on the core modules to secure the business logic and prevent regressions.",
    ],
    tech: ["NestJS", "Prisma", "Next.js", "TypeScript", "shadcn/ui", "Vitest"],
  },
  {
    role: "Full-Stack Developer Intern",
    company: "SAFI Industriel — Online Auction Platform",
    period: "1 month",
    type: "Internship",
    highlights: [
      "Designed and built a full-stack auction platform on the MERN stack, structured as two separate applications: a React client and a Node.js/Express REST API.",
      "Modelled users, auctions and bids in MongoDB and implemented the API endpoints to publish items, browse auctions and place bids.",
      "Implemented the core bidding rules on the server side, such as validating that each new bid is higher than the current highest bid.",
      "Built the React interface for browsing auctions and bidding, then deployed the client and the API to production.",
    ],
    tech: ["MongoDB", "Express", "React", "Node.js"],
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
      "A live on-demand P2P delivery app built in React Native with courier verification, an internal coin economy, a digital wallet, and a Groq LLM (Llama-3.3-70B) support assistant. Includes a Python ML microservice for automated courier verification and full CI/CD to Google Play.",
    tech: ["React Native", "Node.js", "Groq LLM", "Python ML", "GitHub Actions", "Bitrise"],
    featured: true,
    category: "Mobile / AI",
    accent: "from-cyan-400 via-sky-500 to-blue-600",
    monogram: "LS",
    links: [
      { label: "Admin Console", url: "https://admin.localsmartdelivery.com/" },
      { label: "Google Play (Closed Testing)", url: "https://play.google.com/store" },
    ],
  },
  {
    title: "ERP & E-commerce Platform",
    tagline: "Full-stack ERP + storefront",
    description:
      "A complete ERP and e-commerce web platform with a modular NestJS + Prisma backend exposing REST APIs, and a Next.js (TypeScript) + shadcn/ui frontend serving both the back office and the online store, backed by automated Vitest test suites.",
    tech: ["NestJS", "Prisma", "Next.js", "TypeScript", "shadcn/ui", "Vitest"],
    featured: true,
    category: "Full-Stack",
    accent: "from-purple-500 via-fuchsia-500 to-pink-500",
    monogram: "EP",
  },
  {
    title: "Online Auction Platform",
    tagline: "Real-time bidding system",
    description:
      "A full-stack auction platform on the MERN stack, structured as a separate React client and Node.js/Express REST API, with server-side bidding rules validating each new bid against the current highest, deployed to production.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    featured: true,
    category: "Full-Stack",
    accent: "from-emerald-400 via-teal-500 to-cyan-600",
    monogram: "AU",
  },
  {
    title: "Charity Organisation Website",
    tagline: "Volunteer developer project",
    description:
      "Built and shipped a live website with a management dashboard for a charity organisation as a volunteer developer.",
    tech: ["Next.js", "React", "Dashboard"],
    featured: false,
    category: "Web",
    accent: "from-rose-400 via-pink-500 to-purple-600",
    monogram: "JM",
    links: [{ label: "Live Site", url: "https://jam3iya.org" }],
  },
];

export type SkillGroup = {
  category: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Back-end & APIs",
    skills: ["Node.js", "Express", "NestJS", "REST APIs", "GraphQL", "Prisma", "Spring Boot", ".NET"],
  },
  {
    category: "Front-end & Mobile",
    skills: ["React", "Next.js", "React Native", "TypeScript", "JavaScript", "Bootstrap", "EJS", "HTML/CSS", "shadcn/ui"],
  },
  {
    category: "Databases & Search",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Elasticsearch", "Neo4j"],
  },
  {
    category: "DevOps & Cloud",
    skills: ["Docker", "Kubernetes", "AWS", "Microsoft Azure", "Linux", "Bash", "GitHub Actions", "Bitrise", "CI/CD"],
  },
  {
    category: "Languages",
    skills: ["Python", "Java", "C", "C++", "C#", "SQL"],
  },
  {
    category: "AI",
    skills: ["LLM Integration", "LangChain", "Agentic AI Workflows", "ML Microservices", "Cursor", "Claude Code", "Codex"],
  },
  {
    category: "Design",
    skills: ["Figma", "Photoshop", "Illustrator", "Canva"],
  },
  {
    category: "Methods",
    skills: ["Scrum", "Code Reviews", "Mentoring", "UML", "Technical Documentation"],
  },
];

export const marqueeSkills = [
  "Node.js", "NestJS", "Express", "React", "Next.js", "React Native",
  "TypeScript", "Docker", "Kubernetes", "AWS", "Azure", "GitHub Actions",
  "PostgreSQL", "MongoDB", "Elasticsearch", "Prisma", "LangChain", "Python",
];

export type Achievement = {
  title: string;
  detail: string;
  year: string;
};

export const achievements: Achievement[] = [
  { title: "Problem-Solving Hackathon", detail: "Ranked in the global Top 300.", year: "2023" },
  { title: "Service Virtualisation & Cloud Computing", detail: "ISSAT Sousse", year: "" },
  { title: "Big Data Certification", detail: "ISSAT Sousse", year: "" },
  { title: "Next-Generation Networks Certification", detail: "ISSAT Sousse", year: "" },
  { title: "Network Security Certification", detail: "ISSAT Sousse", year: "" },
];

export const leadership = [
  {
    role: "Founder & Team Leader — Online Sales & Trading Freelance Team",
    period: "Sep 2022 – Dec 2025",
    detail: "Founded and led a freelance team specialising in dropshipping, digital marketing and content creation, growing it from 2 to 5 members.",
  },
  {
    role: "Gold Member — IEEE ISSATso Student Branch",
    period: "Sep 2021 – Aug 2022",
    detail: "Executed a campus outreach plan that grew the branch's membership by more than 200%.",
  },
  {
    role: "Volunteer Developer — Charity Organisation",
    period: "Mar 2026",
    detail: "Built the organisation's website (live: jam3iya.org).",
  },
];

export const education = {
  degree: "National Engineering Diploma in Computer Science — Software Engineering",
  school: "ISSAT Sousse (Higher Institute of Applied Sciences and Technology of Sousse), Tunisia",
  period: "5 years",
  detail: "Master's level",
};

export const languages = [
  { name: "French", level: "Bilingual (second native language)", value: 100 },
  { name: "English", level: "Full professional proficiency", value: 90 },
];
