const { z } = require("zod");
const text = (n) => z.string().trim().max(n).default("");
const link = z.string().trim().max(300).refine((v) => !v || /^https?:\/\//.test(v), "Links must start with http:// or https://").default("");
const num = z.coerce.number().int().default(0);
const worldEnum = z.enum(["coach", "developer"]);
const long = (n = 6000) => z.string().trim().max(n).default("");
const lines = z.array(z.string().trim().min(1).max(300)).max(60).default([]);
const loc = z.string().trim().max(400).refine((v) => !v || /^(https?:\/\/|\/)/.test(v), "Use an uploaded image or an http(s) link.").default("");
const media = z.array(z.object({ url: loc, kind: text(30), caption: text(300), alt: text(300) })).max(60).default([]);
const list = z.array(z.string().trim().min(1).max(60)).max(30).default([]);

module.exports = {
  login: z.object({ email: z.string().trim().toLowerCase().email(), password: z.string().min(1).max(200) }),
  contact: z.object({
    name: z.string().trim().min(1, "Name is required.").max(100), email: z.string().trim().email("Enter a valid email.").max(150),
    category: text(40), subject: z.string().trim().min(1, "Subject is required.").max(150), message: z.string().trim().min(10, "Message is too short.").max(3000),
    website: z.string().optional(), // honeypot
  }),
  project: z.object({ title: z.string().trim().min(1).max(120), slug: z.string().trim().max(80).default(""), category: text(40), status: text(40), description: long(600), details: long(), overview: long(), problem: long(), solution: long(),
    contribution: long(), architecture: long(), frontend: long(), backend: long(), database: long(), authentication: long(), integrations: long(), features: lines, challenges: long(), decisions: long(), outcome: long(), future: long(),
    tags: list, cover: loc, images: z.array(loc).max(12).default([]), media, liveUrl: link, githubUrl: link, docsUrl: link, videoUrl: link, featured: z.boolean().default(false), published: z.boolean().default(true), archived: z.boolean().default(false), order: num }),
  page: z.object({ slug: z.string().trim().max(80).default(""), group: text(20), title: z.string().trim().min(1).max(150), kicker: text(100), intro: long(3000), facts: z.array(z.object({ label: text(60), value: text(300) })).max(30).default([]),
    sections: z.array(z.object({ heading: text(150), body: long(5000) })).max(40).default([]), media, videos: z.array(link).max(20).default([]), published: z.boolean().default(false), order: num }),
  movement: z.object({ name: z.string().trim().min(1).max(120), category: z.string().trim().min(1).max(60), difficulty: text(30), pattern: text(200), status: text(30), instructions: long(), progressions: lines, regressions: lines, mistakes: lines, related: lines, image: loc, videoUrl: link, published: z.boolean().default(true), order: num }),
  programme: z.object({ title: z.string().trim().min(1).max(120), level: text(40), summary: text(400), description: long(), audience: text(200), duration: text(100), schedule: text(200), price: text(100), image: loc, status: z.enum(["Draft", "Active", "Past"]).default("Draft"), order: num }),
  milestone: z.object({ title: z.string().trim().min(1).max(200), category: text(40), date: text(40), summary: text(600), image: loc, order: num }),
  skill: z.object({ name: z.string().trim().min(1).max(60), category: z.string().trim().min(1).max(60), status: text(30), world: worldEnum.default("developer"), level: z.coerce.number().min(0).max(100).optional(), order: num }),
  experience: z.object({ role: z.string().trim().min(1).max(100), org: z.string().trim().min(1).max(100), world: worldEnum.default("developer"), start: text(20), end: text(20), summary: text(1000), highlights: z.array(z.string().max(300)).max(15).default([]), order: num }),
  education: z.object({ degree: z.string().trim().min(1).max(120), institution: z.string().trim().min(1).max(150), start: text(20), end: text(20), grade: text(40), notes: text(500), order: num }),
  achievement: z.object({ title: z.string().trim().min(1).max(120), detail: text(300), world: worldEnum.default("coach"), order: num }),
  certificate: z.object({ title: z.string().trim().min(1).max(150), issuer: text(150), date: text(40), image: loc, credentialUrl: link, world: worldEnum.default("coach"), order: num }),
  gallery: z.object({ src: z.string().min(1, "Upload an image first.").max(500), category: text(40), caption: text(200), alt: text(200) }),
  profile: z.object({ name: text(100), tagline: text(120), coachIntro: text(600), devIntro: text(600), bio: text(3000), email: text(150), location: text(100), avatar: text(300), resumeUrl: link, socials: z.array(z.object({ label: z.string().max(40), url: link })).max(12).default([]), zhub: z.object({ vision: text(1000), mission: text(1000) }).default({}) }),
};
