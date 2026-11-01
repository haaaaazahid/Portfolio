const router = require("express").Router();
const rateLimit = require("express-rate-limit");
const M = require("../models"), S = require("../utils/schemas"), crud = require("../controllers/crud"), c = require("../controllers/misc");
const { protect, optionalAuth, validate } = require("../middleware");
const { upload } = require("../utils/upload");

const limiter = (windowMin, max, error) => rateLimit({ windowMs: windowMin * 60e3, max, standardHeaders: true, legacyHeaders: false, message: { success: false, error } });

router.get("/health", (q, r) => r.json({ success: true, data: { status: "ok" } }));
router.post("/auth/login", limiter(15, 8, "Too many login attempts. Try again later."), validate(S.login), c.login);
router.post("/contact", limiter(10, 5, "Too many messages. Try again later."), validate(S.contact), c.sendContact);

// Public read, admin write. `?all=1` with a valid token includes drafts.
const resource = (path, Model, schema, opts) => {
  const h = crud(Model, opts);
  router.get(path, optionalAuth, h.list);
  router.get(path + "/:id", optionalAuth, h.get);
  router.post(path, protect, validate(schema), h.create);
  router.put(path + "/:id", protect, validate(schema), h.update);
  router.delete(path + "/:id", protect, h.remove);
};
resource("/projects", M.Project, S.project, { publicFilter: { published: true }, sort: { order: 1, createdAt: -1 } });
resource("/skills", M.Skill, S.skill);
resource("/experience", M.Experience, S.experience);
resource("/education", M.Education, S.education);
resource("/achievements", M.Achievement, S.achievement);
resource("/certificates", M.Certificate, S.certificate);
resource("/gallery", M.Gallery, S.gallery, { sort: { createdAt: -1 } });

router.get("/profile", c.profile.get);
router.put("/profile", protect, validate(S.profile), c.profile.update);
router.post("/uploads", protect, limiter(1, 20, "Too many uploads."), upload.single("image"), c.uploadImage);
router.get("/admin/stats", protect, c.stats);
router.get("/admin/messages", protect, c.messages.list);
router.patch("/admin/messages/:id/read", protect, c.messages.read);
router.delete("/admin/messages/:id", protect, c.messages.remove);
module.exports = router;
