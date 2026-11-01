require("dotenv").config();
const e = process.env;
const cfg = {
  isProd: e.NODE_ENV === "production",
  port: +e.PORT || 5000,
  clientUrl: e.CLIENT_URL || "http://localhost:5173",
  mongo: e.MONGODB_URI,
  jwtSecret: e.JWT_SECRET,
  jwtExpires: e.JWT_EXPIRES_IN || "12h",
  cloudinary: !!(e.CLOUDINARY_CLOUD_NAME && e.CLOUDINARY_API_KEY && e.CLOUDINARY_API_SECRET),
  smtp: e.SMTP_HOST ? { host: e.SMTP_HOST, port: +e.SMTP_PORT || 587, auth: { user: e.SMTP_USER, pass: e.SMTP_PASS } } : null,
  notifyTo: e.NOTIFY_TO,
};
for (const k of ["mongo", "jwtSecret"]) if (!cfg[k]) throw new Error(`Missing env var for "${k}" (see .env.example)`);
if (cfg.jwtSecret.length < 32) throw new Error("JWT_SECRET must be at least 32 characters.");
module.exports = cfg;
