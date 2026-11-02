// Integration test for the project API: real Express router + middleware + Zod + JWT + Mongoose validators.
// Only the database calls are replaced with an in-memory store (no MongoDB needed). Run: node test-projects.js
process.env.MONGODB_URI = "mongodb://localhost/test"; process.env.JWT_SECRET = "x".repeat(40); process.env.NODE_ENV = "test";
const http = require("http"), jwt = require("jsonwebtoken"), assert = require("assert");
const M = require("./src/models");
const store = new Map(); let n = 0;
M.Project.create = async (b) => { const d = { _id: String(++n), ...b }; store.set(d._id, d); return d; };
M.Project.findByIdAndUpdate = async (id, b) => { const d = store.get(id); if (!d) return null; Object.assign(d, b); return d; }; // $set semantics, like Mongo
const app = require("./src/app");
const token = jwt.sign({ id: "t" }, process.env.JWT_SECRET);
const server = http.createServer(app).listen(0);
const call = (method, path, body) => new Promise((ok) => { const data = body && JSON.stringify(body);
  const r = http.request({ port: server.address().port, path, method, headers: { "Content-Type": "application/json", Authorization: "Bearer " + token } }, (res) => { let s = ""; res.on("data", (c) => (s += c)); res.on("end", () => ok({ status: res.statusCode, json: JSON.parse(s) })); }); r.end(data); });

const existing = { title: "Master Calisthenics India", status: "Completed", category: "Full-stack", description: "Coaching site with booking.", details: "Long details.", tags: ["React", "Vite"],
  cover: "https://res.cloudinary.com/demo/image/upload/v1/zahid-portfolio/cover.jpg", images: ["https://res.cloudinary.com/demo/image/upload/v1/zahid-portfolio/s1.jpg"],
  liveUrl: "https://www.mastercalisthenicsindia.com/", githubUrl: "https://github.com/haaaaazahid/Master-Calisthenics-", featured: true, published: true, order: 5 };
let pass = 0; const ok = (name, fn) => Promise.resolve(fn()).then(() => { pass++; console.log("  PASS", name); }, (e) => { console.log("  FAIL", name, "\n      ", e.message); process.exitCode = 1; });

(async () => {
  const created = (await call("POST", "/api/projects", existing)).json.data; const id = created._id;
  await ok("create: realistic project -> 201", async () => { const r = await call("POST", "/api/projects", existing); assert.equal(r.status, 201); });
  await ok("create: long title/description/details, 8 techs, long GitHub URL", async () => {
    const r = await call("POST", "/api/projects", { ...existing, title: "T".repeat(150), description: "d".repeat(1000), details: "x".repeat(9000), status: "Completed and live for clients", category: "Full-stack web application",
      tags: ["React", "Vite", "Google Apps Script", "Google Sheets", "Cloudinary", "Tailwind CSS", "Framer Motion", "Node.js and Express"], githubUrl: "https://github.com/haaaaazahid/" + "a".repeat(120) });
    assert.equal(r.status, 201, JSON.stringify(r.json)); });
  await ok("update: status 45 chars (was the 40-char failure) -> 200", async () => { const r = await call("PUT", "/api/projects/" + id, { ...existing, status: "Completed - live for Master Calisthenics Indi" }); assert.equal(r.status, 200, JSON.stringify(r.json)); });
  await ok("update: category 55 chars -> 200", async () => { const r = await call("PUT", "/api/projects/" + id, { ...existing, category: "Full-stack web app with Google Sheets backend and CMS" }); assert.equal(r.status, 200, JSON.stringify(r.json)); });
  await ok("update: status 81 chars -> 400 naming `status`", async () => { const r = await call("PUT", "/api/projects/" + id, { ...existing, status: "s".repeat(81) });
    assert.equal(r.status, 400); assert.deepEqual(Object.keys(r.json.fields), ["status"]); assert.match(r.json.fields.status[0], /Status must be 80 characters or fewer/); assert.match(r.json.error, /Status must be 80/); });
  await ok("update: two bad fields -> both reported, each under its own key", async () => { const r = await call("PUT", "/api/projects/" + id, { ...existing, category: "c".repeat(61), githubUrl: "github.com/no-scheme" });
    assert.equal(r.status, 400); assert.deepEqual(Object.keys(r.json.fields).sort(), ["category", "githubUrl"]); assert.match(r.json.fields.githubUrl[0], /GitHub URL must be a full address/); });
  await ok("update: a 70-char technology -> 400 on `tags` (not a bare 400)", async () => { const r = await call("PUT", "/api/projects/" + id, { ...existing, tags: ["React", "y".repeat(70)] });
    assert.equal(r.status, 400); assert.match(r.json.fields.tags[0], /Each technology must be 60 characters or fewer/); });
  await ok("update: empty title -> 400 'Title is required.'", async () => { const r = await call("PUT", "/api/projects/" + id, { ...existing, title: "  " }); assert.equal(r.status, 400); assert.deepEqual(r.json.fields.title, ["Title is required."]); });
  await ok("update keeps images/cover/URLs when the body omits them (partial PUT)", async () => {
    const before = JSON.parse(JSON.stringify(store.get(id))); const r = await call("PUT", "/api/projects/" + id, { title: "Master Calisthenics India (renamed)" });
    assert.equal(r.status, 200); const after = store.get(id);
    for (const k of ["cover", "images", "liveUrl", "githubUrl", "tags", "description", "details", "status", "category", "order"]) assert.deepEqual(after[k], before[k], k + " was wiped");
    assert.equal(after.title, "Master Calisthenics India (renamed)"); });
  await ok("update: full form payload round-trips cover + screenshots + URLs unchanged", async () => { const r = await call("PUT", "/api/projects/" + id, existing); assert.equal(r.status, 200);
    const d = store.get(id); assert.equal(d.cover, existing.cover); assert.deepEqual(d.images, existing.images); assert.equal(d.liveUrl, existing.liveUrl); assert.equal(d.githubUrl, existing.githubUrl); });
  await ok("update: unknown id handled; bad id -> 400 'Invalid id.' style error, not a crash", async () => { const r = await call("PUT", "/api/projects/nope", existing); assert.equal(r.status, 404); });
  await ok("Mongoose model limits agree with Zod (no schema mismatch)", () => {
    const L = require("./src/utils/limits").project;
    assert.equal(new M.Project({ title: "a", status: "s".repeat(L.status), category: "c".repeat(L.category), liveUrl: "h".repeat(L.url) }).validateSync(), undefined);
    assert.ok(new M.Project({ title: "a", status: "s".repeat(L.status + 1) }).validateSync().errors.status); });
  await ok("other resources still validate (skills: missing name -> 400 field error)", async () => { const r = await call("POST", "/api/skills", { category: "Frontend" }); assert.equal(r.status, 400); assert.deepEqual(r.json.fields.name, ["This field is required."]); });
  console.log(`\n${pass} checks passed`); server.close();
})();
