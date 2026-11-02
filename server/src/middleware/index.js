const jwt = require("jsonwebtoken");
const { ZodError } = require("zod");
const cfg = require("../config/env");

const protect = (req, res, next) => {
  const t = (req.headers.authorization || "").replace(/^Bearer /, "");
  try { req.admin = jwt.verify(t, cfg.jwtSecret); next(); }
  catch { res.status(401).json({ success: false, error: "Sign in required." }); }
};
const optionalAuth = (req, res, next) => {
  const t = (req.headers.authorization || "").replace(/^Bearer /, "");
  try { req.admin = jwt.verify(t, cfg.jwtSecret); } catch { /* public visitor */ }
  next();
};
const validate = (schema) => (req, res, next) => { req.body = schema.parse(req.body); next(); };
// Turns Zod issues into { fieldName: [messages] } so the admin form can show each message beside the right input.
// Array items (tags.3) and nested list rows (socials.0.url) are reported on the field that owns them (tags, socials);
// nested objects keep their dotted name (zhub.vision) to match the form's field names.
const fieldKey = (path) => { const i = path.findIndex((p) => typeof p === "number"); return (i < 0 ? path : path.slice(0, i)).join(".") || "_form"; };
const friendly = (i) => {
  if (i.code === "invalid_type" && (i.received === "undefined" || i.received === "null")) return "This field is required.";
  if (i.code === "too_small" && i.type === "string" && i.minimum === 1 && /^String must contain/.test(i.message)) return "This field is required.";
  if (i.code === "too_big" && i.type === "string" && /^String must contain/.test(i.message)) return `Must be ${i.maximum} characters or fewer.`;
  return i.message;
};
const zodFields = (err) => err.issues.reduce((f, i) => { (f[fieldKey(i.path)] ||= []).push(friendly(i)); return f; }, {});
const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
const notFound = (req, res) => res.status(404).json({ success: false, error: "Route not found." });
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err instanceof ZodError) { const fields = zodFields(err); return res.status(400).json({ success: false, error: friendly(err.issues[0]), fields }); }
  if (err.name === "ValidationError" && err.errors) { // Mongoose validators (safety net behind Zod)
    const fields = Object.fromEntries(Object.entries(err.errors).map(([k, e]) => [k, [e.message]]));
    return res.status(400).json({ success: false, error: Object.values(fields)[0][0], fields });
  }
  if (err.name === "CastError") return res.status(400).json({ success: false, error: "Invalid id." });
  if (err.code === 11000) return res.status(409).json({ success: false, error: "Already exists." });
  const status = err.status || (err.name === "MulterError" ? 400 : 500);
  if (status === 500) console.error(err);
  res.status(status).json({ success: false, error: status === 500 && cfg.isProd ? "Server error." : err.message });
};
module.exports = { protect, optionalAuth, validate, wrap, notFound, errorHandler };
