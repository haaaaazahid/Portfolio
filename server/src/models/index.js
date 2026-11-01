const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const opts = { timestamps: true };
const str = { type: String, trim: true, default: "" };
const world = { type: String, enum: ["coach", "developer"], default: "developer" };

const User = new Schema({ email: { type: String, unique: true, lowercase: true, required: true }, password: { type: String, required: true, select: false } }, opts);
User.methods.verify = function (p) { return bcrypt.compare(p, this.password); };
User.statics.hash = (p) => bcrypt.hash(p, 12);

const Project = new Schema({
  title: { type: String, required: true, trim: true }, status: str, category: { type: String, default: "Web" },
  description: str, details: str, tags: [String], cover: str, images: [String], liveUrl: str, githubUrl: str,
  featured: { type: Boolean, default: false }, published: { type: Boolean, default: true }, order: { type: Number, default: 0 },
}, opts);
const Skill = new Schema({ name: { type: String, required: true }, category: { type: String, required: true }, world, level: { type: Number, min: 0, max: 100 }, order: { type: Number, default: 0 } }, opts);
const Experience = new Schema({ role: { type: String, required: true }, org: { type: String, required: true }, world, start: str, end: str, summary: str, highlights: [String], order: { type: Number, default: 0 } }, opts);
const Education = new Schema({ degree: { type: String, required: true }, institution: { type: String, required: true }, start: str, end: str, grade: str, notes: str, order: { type: Number, default: 0 } }, opts);
const Achievement = new Schema({ title: { type: String, required: true }, detail: str, world: { ...world, default: "coach" }, order: { type: Number, default: 0 } }, opts);
const Certificate = new Schema({ title: { type: String, required: true }, issuer: str, date: str, image: str, credentialUrl: str, world: { ...world, default: "coach" }, order: { type: Number, default: 0 } }, opts);
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
  Message: model("Message", Message), Profile: model("Profile", Profile),
};
