export const profile = {
  name: "Mohd Zahid Shaikh",
  firstName: "Zahid",
  roles: [
    "Full Stack Developer",
    "Frontend Developer",
    "React Developer",
    "JavaScript Developer",
    "AI-Powered Web Developer",
    "Problem Solver",
  ],
  location: "Mumbai, Maharashtra, India",
  email: "shaikhmohdzahid992@gmail.com",
  phone: "+91 98697 19265",
  phoneHref: "+919869719265",
  phoneAlt: "+91 81081 70565",
  languages: ["English", "Hindi", "Marathi"],
  linkedin: "https://www.linkedin.com/in/mohd-zahid-shaikh-378829317/",
  github: "https://github.com/haaaaazahid",
  whatsapp: "https://wa.me/919869719265",
  resumeUrl: "/resume.pdf",
  tagline:
    "I build fast, scalable full-stack products — from civic-tech platforms to sports management systems — with clean architecture and an eye for interface craft.",
  availability: "Available for full-time, freelance & internship roles",
};

export const stats = [
  { value: 4, suffix: "+", label: "Projects Shipped" },
  { value: 15, suffix: "+", label: "Technologies" },
  { value: 3, suffix: "", label: "Leadership Roles" },
  { value: 5, suffix: "+", label: "Certificates" },
  { value: 6, suffix: "+", label: "Achievements" },
  { value: 3, suffix: "+", label: "Years Learning" },
];

export const skillCategories = [
  {
    key: "frontend",
    label: "Frontend",
    path: "~/skills/frontend",
    skills: ["React", "JavaScript (ES6+)", "TypeScript", "Tailwind CSS", "HTML5 & CSS3", "Framer Motion", "Responsive Design"],
  },
  {
    key: "backend",
    label: "Backend",
    path: "~/skills/backend",
    skills: ["Node.js", "Express.js", "REST APIs", "Socket.IO", "PHP"],
  },
  {
    key: "database",
    label: "Database",
    path: "~/skills/database",
    skills: ["MySQL", "Firebase Firestore", "Supabase"],
  },
  {
    key: "cloud",
    label: "Cloud & Deployment",
    path: "~/skills/cloud",
    skills: ["Vercel", "Railway", "Cloudinary", "Firebase Hosting"],
  },
  {
    key: "auth",
    label: "Authentication",
    path: "~/skills/auth",
    skills: ["JWT", "Google OAuth", "Phone OTP", "Email OTP", "Firebase Auth"],
  },
  {
    key: "tools",
    label: "Developer Tools",
    path: "~/skills/tools",
    skills: ["Git & GitHub", "VS Code", "Vite", "Postman", "npm"],
  },
  {
    key: "soft",
    label: "Soft Skills",
    path: "~/skills/soft",
    skills: ["Leadership", "Team Coordination", "Communication", "Problem Solving", "Adaptability"],
  },
];

export const techMarquee = [
  "React", "JavaScript", "TypeScript", "Node.js", "Express", "MySQL",
  "Firebase", "Tailwind CSS", "Framer Motion", "Socket.IO", "JWT", "REST API",
  "Cloudinary", "Vite", "Git",
];

export const projects = [
  {
    id: "nagrik",
    code: "01",
    name: "NAGRIK",
    tagline: "Neighborhood Problem Reporting Platform",
    year: "2025",
    status: "Live",
    summary:
      "A civic-tech platform where citizens report potholes, garbage, and streetlight failures, and track resolutions with real-time community verification.",
    problem:
      "Local civic issues go unreported or unresolved because there's no structured, trustworthy channel between citizens and municipal follow-up — complaints get lost in phone calls and paperwork.",
    solution:
      "NAGRIK gives residents a map-based reporting flow with photo evidence, geolocation, and community upvote verification, backed by an admin dashboard that classifies and routes issues for resolution.",
    features: [
      "Google Login, Phone OTP & Email OTP authentication",
      "Map-based complaint reporting with geolocation",
      "Cloudinary-powered photo evidence uploads",
      "Community verification & upvoting",
      "AI-assisted issue classification",
      "Real-time updates via Socket.IO",
      "Admin dashboard for issue routing & resolution tracking",
    ],
    challenges:
      "Coordinating real-time status updates across Socket.IO channels while keeping the MySQL + Firebase data model consistent was the core engineering challenge, alongside building an OTP flow that felt fast on flaky mobile networks.",
    tech: ["React", "Firebase", "MySQL", "Socket.IO", "Cloudinary", "Tailwind CSS", "Geolocation API"],
    live: "https://nagrik-six.vercel.app/",
    github: "https://github.com/haaaaazahid",
  },
  {
    id: "jcsam",
    code: "02",
    name: "JCSAM Hub",
    tagline: "Junior College Sports Association of Mumbai",
    year: "2025",
    status: "Live",
    summary:
      "A sports management platform for Mumbai's junior colleges handling player registration, event management, results, and administration.",
    problem:
      "Inter-college sports registration and results tracking across Mumbai were handled manually through spreadsheets and paperwork, slowing down organizers and creating errors in eligibility and scoring.",
    solution:
      "JCSAM Hub digitizes the entire pipeline — from player registration through live results — with a role-based admin dashboard and a public gallery to showcase events.",
    features: [
      "Player & team registration workflows",
      "Sports event & fixture management",
      "Live results tracking",
      "Google Login authentication",
      "Admin dashboard for organizers",
      "Event photo gallery",
      "Fully responsive across devices",
    ],
    challenges:
      "Designing a data model flexible enough to support many sports formats (knockout, league, points-table) without over-engineering the admin UI was the main balancing act.",
    tech: ["React", "TypeScript", "Supabase", "Framer Motion", "Tailwind CSS"],
    live: "https://jcsam-hub.vercel.app/",
    github: "https://github.com/haaaaazahid",
  },
  {
    id: "mci",
    code: "03",
    name: "Master Calisthenics India",
    tagline: "Full-Stack Fitness & Coaching Platform",
    year: "2026",
    status: "Live",
    summary:
      "A production fitness website with JWT-based auth, an admin panel for bookings and community moderation, and a Cloudinary-backed gallery.",
    problem:
      "A growing calisthenics coaching brand needed a professional web presence that could handle bookings, showcase transformations, and let admins moderate community content without touching code.",
    solution:
      "A full React + Node/Express + MySQL stack with a dedicated admin panel covering bookings, review moderation, community posts, and contact management, deployed on Vercel + Railway.",
    features: [
      "JWT-based authentication with 7-day sessions",
      "Admin panel — dashboard, bookings, reviews, community posts",
      "Cloudinary-powered image storage & gallery with lightbox",
      "Contact & booking management",
      "Fully responsive, performance-optimized UI",
    ],
    challenges:
      "Railway's ephemeral filesystem meant uploaded images vanished on redeploy — solved by migrating all media handling to Cloudinary — plus resolving React Router 404-on-refresh via Vercel rewrites.",
    tech: ["React", "Vite", "Tailwind CSS", "Node.js", "Express", "MySQL", "Cloudinary", "JWT"],
    live: "https://master-calisthenics-india.vercel.app/",
    github: "https://github.com/haaaaazahid/Master-Calisthenics-",
  },
  {
    id: "rainwater",
    code: "04",
    name: "Smart Rainwater Harvesting",
    tagline: "Sensor-Automated Urban Water & Energy System",
    year: "2024",
    status: "Research",
    summary:
      "A research project proposing sensor-based automated rainwater collection, purification, and micro-turbine power generation across metro bridge infrastructure.",
    problem:
      "Urban flooding and wasted rainwater runoff are persistent problems in Mumbai, especially around elevated infrastructure like metro bridges, while the same runoff has untapped energy potential.",
    solution:
      "An automated system design using sensors to trigger collection and purification, routing overflow through micro-turbines for renewable power generation — presented at the Aavishkar research competition.",
    features: [
      "Automated sensor-triggered rainwater collection",
      "In-line water purification stage",
      "Micro-turbine power generation from runoff",
      "Designed for metro bridge implementation",
      "Focus on environmental sustainability",
    ],
    challenges:
      "Modeling realistic water flow and turbine output at small scale, and designing the system to be viable for real infrastructure retrofits rather than a lab-only concept.",
    tech: ["IoT", "Embedded C", "Sensors", "Microcontrollers", "Renewable Energy"],
    live: null,
    github: null,
  },
];

export const experience = [
  {
    role: "Company Sergeant Major (CSM)",
    org: "National Cadet Corps — Senior Division",
    period: "Leadership Rank",
    desc: "Led cadet units in drills, camps, and national-level events; responsible for coordination and discipline across the unit.",
  },
  {
    role: "NSS Leader",
    org: "National Service Scheme",
    period: "Community Leadership",
    desc: "Organized and led community service initiatives, coordinating volunteers for social outreach programs.",
  },
  {
    role: "Summer Camp Organizer",
    org: "College Activity Committee",
    period: "Event Leadership",
    desc: "Planned and ran a multi-day summer camp end-to-end, managing logistics, schedules, and participant coordination.",
  },
];

export const certifications = [
  { title: "NCC 'B' Certificate", issuer: "National Cadet Corps" },
  { title: "NCC 'C' Certificate", issuer: "National Cadet Corps" },
  { title: "NCC Camp Medal", issuer: "National Cadet Corps", note: "×2" },
];

export const education = [
  {
    degree: "B.Sc. Computer Science",
    school: "Royal College of Arts, Science and Commerce, Mira Road",
    period: "2023 — 2026",
    detail: "CGPI 6.95",
  },
  {
    degree: "12th — Higher Secondary",
    school: "Science Stream",
    period: "Senior Secondary",
    detail: "53.83%",
  },
  {
    degree: "10th — Secondary School",
    school: "Secondary Education",
    period: "Secondary",
    detail: "82.60%",
  },
];

export const achievements = [
  {
    title: "Company Sergeant Major (CSM)",
    subtitle: "NCC — Senior Division",
    tag: "Leadership",
    desc: "Officer rank in the NCC unit. Led cadets in drills, camps, and national-level events.",
    imgKey: "nccFlag",
  },
  {
    title: "NCC Leadership & Camp Medals",
    subtitle: "National Cadet Corps",
    tag: "Award",
    desc: "Recognised for outstanding discipline, teamwork, and performance across multiple NCC camps and activities — awarded two camp medals.",
    imgKey: "nccGroup",
  },
  {
    title: "Aavishkar Research Competition",
    subtitle: "University-Level Research Fest",
    tag: "Research",
    desc: "Presented the Smart Rainwater Harvesting research project at Aavishkar, competing against top university projects.",
    imgKey: "cert",
  },
  {
    title: "District-Level Kickboxing — Gold Medalist",
    subtitle: "District Sports Championship",
    tag: "Sports",
    desc: "Won gold at the district-level kickboxing championship, reflecting discipline and competitive focus outside the classroom.",
    imgKey: null,
  },
];

export const services = [
  { title: "Frontend Development", desc: "Pixel-accurate, accessible interfaces built with React and modern CSS." },
  { title: "Full Stack Development", desc: "End-to-end apps — React frontends wired to Node/Express + MySQL backends." },
  { title: "Business & Portfolio Websites", desc: "Fast, professional websites for brands, founders, and freelancers." },
  { title: "Admin Dashboards", desc: "Role-based panels for managing bookings, content, and users." },
  { title: "REST API Development", desc: "Clean, documented APIs with JWT auth and proper error handling." },
  { title: "Performance Optimization", desc: "Lighthouse-driven audits — faster loads, smaller bundles, better Core Web Vitals." },
];

export const whyHireMe = [
  { title: "Fast Learner", desc: "Picks up new stacks and tools quickly under real deadlines." },
  { title: "Problem Solver", desc: "Breaks down ambiguous requirements into shippable increments." },
  { title: "Leadership", desc: "NCC officer rank — comfortable coordinating teams under pressure." },
  { title: "Clean Code", desc: "Writes maintainable, well-structured code others can build on." },
  { title: "Reliable", desc: "Ships what's promised, communicates early when scope shifts." },
  { title: "Attention to Detail", desc: "Sweats the UI polish and the edge cases equally." },
];

export const testimonials = [
  {
    quote:
      "Placeholder — swap in a real quote from a client or collaborator once available. Keep it specific: what you built, and the outcome.",
    name: "Client Name",
    role: "Role, Company",
  },
  {
    quote:
      "Placeholder — a second testimonial focused on communication, reliability, or turnaround time works well here.",
    name: "Client Name",
    role: "Role, Company",
  },
];

export const navLinks = [
  { label: "Home", to: "home" },
  { label: "About", to: "about" },
  { label: "Skills", to: "skills" },
  { label: "Projects", to: "projects" },
  { label: "Experience", to: "experience" },
  { label: "Contact", to: "contact" },
];
