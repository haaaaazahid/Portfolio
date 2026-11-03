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
const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
const notFound = (req, res) => res.status(404).json({ success: false, error: "Route not found." });
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err instanceof ZodError) return res.status(400).json({ success: false, error: err.issues[0].message, fields: err.flatten().fieldErrors });
  if (err.name === "CastError") return res.status(400).json({ success: false, error: "Invalid id." });
  if (err.code === 11000) return res.status(409).json({ success: false, error: "Already exists." });
  const status = err.status || (err.name === "MulterError" ? 400 : 500);
  if (status === 500) console.error(err);
  res.status(status).json({ success: false, error: status === 500 && cfg.isProd ? "Server error." : err.message });
};
module.exports = { protect, optionalAuth, validate, wrap, notFound, errorHandler };
