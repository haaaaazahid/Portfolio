const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const opts = { timestamps: true };
const str = { type: String, trim: true, default: "" };
const world = { type: String, enum: ["coach", "developer"], default: "developer" };

const User = new Schema({ email: { type: String, unique: true, lowercase: true, required: true }, password: { type: String, required: true, select: false } }, opts);
User.methods.verify = function (p) { return bcrypt.compare(p, this.password); };
User.statics.hash = (p) => bcrypt.hash(p, 12);

const Media = new Schema({ url: str, kind: str, caption: str, alt: str }, { _id: false });
const slug = { type: String, unique: true, sparse: true, index: true };
// Full case-study record. Empty fields are simply hidden on the public site.
const Project = new Schema({
  title: { type: String, required: true, trim: true }, slug, category: { type: String, default: "Full-stack" }, status: str,
  description: str, details: str, overview: str, problem: str, solution: str, contribution: str, architecture: str, frontend: str, backend: str, database: str,
  authentication: str, integrations: str, features: [String], challenges: str, decisions: str, outcome: str, future: str,
  tags: [String], cover: str, images: [String], media: [Media], liveUrl: str, githubUrl: str, docsUrl: str, videoUrl: str,
  featured: { type: Boolean, default: false }, published: { type: Boolean, default: true }, archived: { type: Boolean, default: false }, order: { type: Number, default: 0 },
}, opts);
const Skill = new Schema({ name: { type: String, required: true }, category: { type: String, required: true }, status: str, world, level: { type: Number, min: 0, max: 100 }, order: { type: Number, default: 0 } }, opts);
const Experience = new Schema({ role: { type: String, required: true }, org: { type: String, required: true }, world, start: str, end: str, summary: str, highlights: [String], order: { type: Number, default: 0 } }, opts);
const Education = new Schema({ degree: { type: String, required: true }, institution: { type: String, required: true }, start: str, end: str, grade: str, notes: str, order: { type: Number, default: 0 } }, opts);
const Achievement = new Schema({ title: { type: String, required: true }, detail: str, world: { ...world, default: "coach" }, order: { type: Number, default: 0 } }, opts);
const Certificate = new Schema({ title: { type: String, required: true }, issuer: str, date: str, image: str, credentialUrl: str, world: { ...world, default: "coach" }, order: { type: Number, default: 0 } }, opts);
// Generic CMS page: MCI, TWZ, athlete case studies. group = page | athlete
const Page = new Schema({ slug: { ...slug, required: true }, group: { type: String, default: "page" }, title: { type: String, required: true }, kicker: str, intro: str,
  facts: [{ _id: false, label: String, value: String }], sections: [{ _id: false, heading: String, body: String }], media: [Media], videos: [String], published: { type: Boolean, default: false }, order: { type: Number, default: 0 } }, opts);
const Movement = new Schema({ name: { type: String, required: true }, category: { type: String, required: true }, difficulty: str, pattern: str, status: str, instructions: str,
  progressions: [String], regressions: [String], mistakes: [String], related: [String], image: str, videoUrl: str, published: { type: Boolean, default: true }, order: { type: Number, default: 0 } }, opts);
const Programme = new Schema({ title: { type: String, required: true }, level: str, summary: str, description: str, audience: str, duration: str, schedule: str, price: str, image: str,
  status: { type: String, default: "Draft" }, order: { type: Number, default: 0 } }, opts);
const Milestone = new Schema({ title: { type: String, required: true }, category: { type: String, default: "Personal" }, date: str, summary: str, image: str, order: { type: Number, default: 0 } }, opts);
const Gallery = new Schema({ src: { type: String, required: true }, category: { type: String, default: "Training" }, caption: str, alt: str }, opts);
const Message = new Schema({ name: String, email: String, category: str, subject: String, message: String, read: { type: Boolean, default: false } }, opts);
// Singleton: editable site copy, socials and contact details
const Profile = new Schema({
  key: { type: String, default: "main", unique: true }, name: { type: String, default: "MOHD ZAHID SHAIKH" }, tagline: { type: String, default: "Two worlds. One identity." },
  coachIntro: str, devIntro: str, bio: str, email: str, location: str, avatar: str, resumeUrl: str,
  socials: [{ label: String, url: String }], zhub: { vision: str, mission: str },
}, opts);

module.exports = {
  User: model("User", User), Project: model("Project", Project), Skill: model("Skill", Skill), Experience: model("Experience", Experience),
  Education: model("Education", Education), Achievement: model("Achievement", Achievement), Gallery: model("Gallery", Gallery), Certificate: model("Certificate", Certificate),
  Message: model("Message", Message), Page: model("Page", Page), Movement: model("Movement", Movement), Programme: model("Programme", Programme), Milestone: model("Milestone", Milestone), Profile: model("Profile", Profile),
};
