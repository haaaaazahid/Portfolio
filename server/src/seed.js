// Seeds ONLY content that exists in your original project. Missing info is left blank for you to fill in via /admin.
const cfg = require("./config/env"), connect = require("./config/db"), M = require("./models");
(async () => {
  await connect();
  const { ADMIN_EMAIL: email, ADMIN_PASSWORD: pw } = process.env;
  if (!email || !pw || pw.length < 12) throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD (12+ chars) in .env first.");
  await M.User.findOneAndUpdate({ email: email.toLowerCase() }, { password: await M.User.hash(pw) }, { upsert: true });
  await M.Profile.findOneAndUpdate({ key: "main" }, { $setOnInsert: {
    coachIntro: "Calisthenics and kickboxing. Strength, movement and discipline, taught.", devIntro: "Full-stack web development, and the founder of Zhub.",
    bio: "I coach the body and build software. Both start the same way: show up, repeat it, get better.",
  } }, { upsert: true });
  if (!(await M.Project.countDocuments())) await M.Project.insertMany([
    { title: "Nagrik", status: "To be confirmed", featured: true, order: 1, category: "Full-stack", description: "A civic issue reporting platform: image and voice-note reports, location tagging, complaint tracking and an admin dashboard.", tags: ["React", "Node.js", "MySQL", "Firebase Auth", "Google OAuth", "JWT", "Socket.IO", "Cloudinary"] },
    { title: "JCSAM", status: "To be confirmed", featured: true, order: 2, category: "Full-stack", description: "A sports administration platform for player registration and college management workflows.", tags: ["React", "TypeScript", "Supabase", "Tailwind CSS", "Google OAuth", "Vite", "Framer Motion"] },
    { title: "Dravon", status: "In progress", featured: false, order: 3, category: "E-commerce", description: "An e-commerce project. Features to be listed after the repository is reviewed.", tags: [] },
  ]);
  if (!(await M.Skill.countDocuments())) {
    const S = { Frontend: ["HTML", "CSS", "JavaScript", "React", "Next.js", "TypeScript"], Backend: ["Node.js", "Express", "REST APIs"], Databases: ["MySQL", "Supabase", "Firebase"], Tools: ["Git", "GitHub", "VS Code", "Vercel"], Other: ["AI-assisted development", "Responsive design", "UI/UX implementation", "Product prototyping"] };
    await M.Skill.insertMany(Object.entries(S).flatMap(([category, names]) => names.map((name, i) => ({ name, category, order: i }))));
    await M.Skill.insertMany(["Calisthenics", "Kickboxing", "Strength and conditioning", "Mobility and flexibility", "Bodyweight strength", "Skill development"].map((name, order) => ({ name, category: "Specialities", world: "coach", order })));
  }
  if (!(await M.Education.countDocuments())) await M.Education.create({ degree: "BSc Computer Science", institution: "Royal College of Arts, Science and Commerce (Autonomous)", end: "2026", grade: "CGPI 6.95" });
  if (!(await M.Achievement.countDocuments())) await M.Achievement.insertMany([
    { title: "Kickboxing gold medal", detail: "District level.", order: 1 }, { title: "NCC Company Sergeant Major", detail: "Leadership role.", order: 2 },
    { title: "NCC B and C certificates", detail: "Names and dates to be added.", order: 3 },
  ]);
  if (!(await M.Experience.countDocuments())) await M.Experience.insertMany([
    { role: "Coach", org: "Master Calisthenics India (MCI)", world: "coach", summary: "Roles and dates to be added." },
    { role: "Coach", org: "Train With Zahid (TWZ)", world: "coach", summary: "Roles and dates to be added." },
  ]);
  console.log("Seed complete. Admin:", email.toLowerCase());
  process.exit(0);
})().catch((e) => { console.error(e.message); process.exit(1); });
