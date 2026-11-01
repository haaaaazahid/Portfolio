const multer = require("multer"), path = require("path"), fs = require("fs"), crypto = require("crypto");
const cloudinary = require("cloudinary").v2;
const cfg = require("../config/env");
const EXT = { "image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp", "image/gif": ".gif" };
const DIR = path.join(__dirname, "../../uploads");
fs.mkdirSync(DIR, { recursive: true });
if (cfg.cloudinary) cloudinary.config({ secure: true }); // reads CLOUDINARY_* env vars

const upload = multer({
  storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (q, f, cb) => (EXT[f.mimetype] ? cb(null, true) : cb(Object.assign(new Error("Only JPG, PNG, WebP or GIF up to 5 MB."), { status: 400 }))),
});
// Returns a public URL: Cloudinary when configured, otherwise local /uploads
async function store(file) {
  if (cfg.cloudinary) {
    return new Promise((ok, no) => cloudinary.uploader.upload_stream({ folder: "zahid-portfolio", resource_type: "image" }, (e, r) => (e ? no(e) : ok(r.secure_url))).end(file.buffer));
  }
  const name = crypto.randomUUID() + EXT[file.mimetype];
  await fs.promises.writeFile(path.join(DIR, name), file.buffer);
  return "/uploads/" + name;
}
module.exports = { upload, store, DIR };
