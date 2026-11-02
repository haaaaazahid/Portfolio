const { z } = require("zod");
const L = require("./limits").project;
// `label` is optional; when given, the message names the field ("Status must be 80 characters or fewer.")
const text = (n, label) => z.string().trim().max(n, `${label || "This field"} must be ${n} characters or fewer.`).default("");
const isHttpUrl = (v) => { if (!v) return true; try { const u = new URL(v); return u.protocol === "http:" || u.protocol === "https:"; } catch { return false; } };
const linkOf = (n, label) => z.string().trim().max(n, `${label || "Link"} must be ${n} characters or fewer.`).refine(isHttpUrl, `${label || "Link"} must be a full address starting with http:// or https://`).default("");
const link = linkOf(2048);
const num = z.coerce.number().int().default(0);
const worldEnum = z.enum(["coach", "developer"]);
const list = z.array(z.string().trim().min(1, "Items cannot be empty.").max(60, "Each item must be 60 characters or fewer.")).max(30, "Add at most 30 items.").default([]);

module.exports = {
  login: z.object({ email: z.string().trim().toLowerCase().email(), password: z.string().min(1).max(200) }),
  contact: z.object({
    name: z.string().trim().min(1, "Name is required.").max(100), email: z.string().trim().email("Enter a valid email.").max(150),
    category: text(40), subject: z.string().trim().min(1, "Subject is required.").max(150), message: z.string().trim().min(10, "Message is too short.").max(3000),
    website: z.string().optional(), // honeypot
  }),
  project: z.object({
    title: z.string().trim().min(1, "Title is required.").max(L.title, `Title must be ${L.title} characters or fewer.`),
    status: text(L.status, "Status"), category: text(L.category, "Category"),
    description: text(L.description, "Short description"), details: text(L.details, "Full details"),
    tags: z.array(z.string().trim().min(1, "Tech stack cannot contain empty items.").max(L.tag, `Each technology must be ${L.tag} characters or fewer.`)).max(L.tags, `Add at most ${L.tags} technologies.`).default([]),
    cover: text(L.image, "Cover image link"),
    images: z.array(z.string().trim().max(L.image, `Screenshot link must be ${L.image} characters or fewer.`)).max(L.images, `Add at most ${L.images} screenshots.`).default([]),
    liveUrl: linkOf(L.url, "Live site URL"), githubUrl: linkOf(L.url, "GitHub URL"),
    featured: z.boolean().default(false), published: z.boolean().default(true), order: num,
  }),
  skill: z.object({ name: z.string().trim().min(1).max(60), category: z.string().trim().min(1).max(40), world: worldEnum.default("developer"), level: z.coerce.number().min(0).max(100).optional(), order: num }),
  experience: z.object({ role: z.string().trim().min(1).max(100), org: z.string().trim().min(1).max(100), world: worldEnum.default("developer"), start: text(20), end: text(20), summary: text(1000), highlights: z.array(z.string().max(300)).max(15).default([]), order: num }),
  education: z.object({ degree: z.string().trim().min(1).max(120), institution: z.string().trim().min(1).max(150), start: text(20), end: text(20), grade: text(40), notes: text(500), order: num }),
  achievement: z.object({ title: z.string().trim().min(1).max(120), detail: text(300), world: worldEnum.default("coach"), order: num }),
  certificate: z.object({ title: z.string().trim().min(1).max(150), issuer: text(150), date: text(40), image: text(300), credentialUrl: link, world: worldEnum.default("coach"), order: num }),
  gallery: z.object({ src: z.string().min(1, "Upload an image first.").max(300), category: text(40), caption: text(200), alt: text(200) }),
  profile: z.object({ name: text(100), tagline: text(120), coachIntro: text(600), devIntro: text(600), bio: text(3000), email: text(150), location: text(100), avatar: text(300), resumeUrl: link, socials: z.array(z.object({ label: z.string().max(40), url: link })).max(12).default([]), zhub: z.object({ vision: text(1000), mission: text(1000) }).default({}) }),
};
