const jwt = require("jsonwebtoken"), nodemailer = require("nodemailer");
const cfg = require("../config/env");
const { User, Message, Profile } = require("../models");
const { wrap } = require("../middleware");
const { store } = require("../utils/upload");

const login = wrap(async (req, res) => {
  const u = await User.findOne({ email: req.body.email }).select("+password");
  // Same error for unknown email / wrong password
  if (!u || !(await u.verify(req.body.password))) return res.status(401).json({ success: false, error: "Invalid email or password." });
  res.json({ success: true, data: { token: jwt.sign({ id: u.id }, cfg.jwtSecret, { expiresIn: cfg.jwtExpires }), email: u.email } });
});

const mailer = cfg.smtp ? nodemailer.createTransport(cfg.smtp) : null;
const sendContact = wrap(async (req, res) => {
  if (req.body.website) return res.json({ success: true, data: { ok: true } }); // bot trap
  const { website, ...m } = req.body;
  const doc = await Message.create(m);
  if (mailer && cfg.notifyTo) {
    // Never fail the visitor's submission because email is down
    mailer.sendMail({ from: cfg.smtp.auth.user, to: cfg.notifyTo, replyTo: m.email, subject: `[Portfolio] ${m.subject}`, text: `${m.name} <${m.email}> (${m.category})\n\n${m.message}` })
      .catch((e) => console.error("Mail failed:", e.message));
  }
  res.status(201).json({ success: true, data: { id: doc.id } });
});
const messages = {
  list: wrap(async (q, r) => r.json({ success: true, data: await Message.find().sort({ createdAt: -1 }).lean() })),
  read: wrap(async (q, r) => { const d = await Message.findByIdAndUpdate(q.params.id, { read: true }, { new: true }); d ? r.json({ success: true, data: d }) : r.status(404).json({ success: false, error: "Not found." }); }),
  remove: wrap(async (q, r) => { const d = await Message.findByIdAndDelete(q.params.id); d ? r.json({ success: true, data: { id: d.id } }) : r.status(404).json({ success: false, error: "Not found." }); }),
};
const profile = {
  get: wrap(async (q, r) => r.json({ success: true, data: await Profile.findOneAndUpdate({ key: "main" }, {}, { upsert: true, new: true, setDefaultsOnInsert: true }).lean() })),
  update: wrap(async (q, r) => r.json({ success: true, data: await Profile.findOneAndUpdate({ key: "main" }, q.body, { upsert: true, new: true, setDefaultsOnInsert: true }) })),
};
const uploadImage = wrap(async (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, error: "Choose an image." });
  res.status(201).json({ success: true, data: { url: await store(req.file) } });
});
const stats = wrap(async (q, r) => {
  const { Project, Skill, Gallery } = require("../models");
  const [projects, skills, gallery, unread] = await Promise.all([Project.countDocuments(), Skill.countDocuments(), Gallery.countDocuments(), Message.countDocuments({ read: false })]);
  r.json({ success: true, data: { projects, skills, gallery, unread } });
});
module.exports = { login, sendContact, messages, profile, uploadImage, stats };
