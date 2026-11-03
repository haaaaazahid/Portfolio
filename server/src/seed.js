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
    { title: "NCC B and C certificates", detail: "", order: 3 },
  ]);
  if (!(await M.Experience.countDocuments())) await M.Experience.insertMany([
    { role: "Coach", org: "Master Calisthenics India (MCI)", world: "coach", summary: "" },
    { role: "Coach", org: "Train With Zahid (TWZ)", world: "coach", summary: "" },
  ]);

  // ---- Expanded portfolio content (idempotent: safe to re-run; never overwrites what you edited in /admin) ----
  const { slugify } = require("./utils/slug");
  const add = (Model, filter, doc) => Model.updateOne(filter, { $setOnInsert: doc }, { upsert: true });
  await M.Experience.updateMany({ summary: "Roles and dates to be added." }, { $set: { summary: "" } });
  await M.Achievement.updateMany({ detail: "Names and dates to be added." }, { $set: { detail: "" } });
  await M.Project.updateMany({ status: "To be confirmed" }, { $set: { status: "" } }); // old placeholder label
  const projects = [
    { title: "Nagrik", category: "Full-stack", featured: true, order: 1, description: "A civic issue reporting platform: image and voice-note reports, location tagging, complaint tracking and an admin dashboard.", overview: "A civic issue reporting platform.",
      tags: ["React", "Node.js", "MySQL", "Firebase Auth", "Google OAuth", "JWT", "Socket.IO", "Cloudinary"], database: "MySQL", authentication: "Firebase Authentication, Google OAuth and JWT.", integrations: "Cloudinary, Socket.IO",
      features: ["Civic issue reporting", "Image reporting", "Voice-note support", "Location tagging", "Complaint tracking", "Admin dashboard", "Authentication"] },
    { title: "JCSAM", category: "Full-stack", featured: true, order: 2, description: "A sports administration platform for player registration and college management workflows.", overview: "A complete sports administration website and web application.",
      tags: ["React", "TypeScript", "Supabase", "Tailwind CSS", "Google OAuth", "Vite", "Framer Motion"], frontend: "React, TypeScript, Vite, Tailwind CSS and Framer Motion.", database: "Supabase", authentication: "Google OAuth.",
      features: ["Player registration", "College management workflows", "Sports administration"] },
    { title: "Beauty Box", category: "Websites", order: 3, description: "A beauty-business website with separate frontend and backend applications.",
      features: ["Home", "About", "Services", "Service details", "Gallery", "Offers", "Bridal", "Reviews", "Booking", "Contact", "Legal pages", "Mobile menu", "WhatsApp integration", "Theme toggle", "Animations and decorative components"] },
    { title: "Dravon", category: "E-commerce", status: "In development", order: 4, description: "An athletic apparel e-commerce project with a cinematic visual identity.",
      features: ["Product listing", "Product detail pages", "Product image galleries with front, back, left, right and close-up views"] },
    { title: "Zhub", slug: "zhub", category: "Founder venture", order: 5, description: "", contribution: "Founder of Zhub." },
    { title: "MCI Website", category: "Websites", order: 6, published: false, description: "The website for Master Calisthenics India. Separate from my MCI coaching experience." },
    { title: "Aavishkar Research Project", category: "Research", order: 7, published: false, description: "" },
  ];
  for (const p of projects) {
    const slug = p.slug || slugify(p.title);
    await add(M.Project, { title: p.title }, { ...p, slug });
    await M.Project.updateOne({ title: p.title, slug: { $in: [null, ""] } }, { $set: { slug } }); // older records created before slugs existed
  }
  await add(M.Page, { slug: "twz" }, { slug: "twz", title: "Train With Zahid", kicker: "Coaching initiative", published: true,
    intro: "Train With Zahid (TWZ) is my coaching initiative, covering calisthenics, kickboxing and flexibility.",
    facts: [{ label: "Past initiative", value: "Free seven-day camp" }, { label: "Where", value: "Joggers Park, Mira Road" }, { label: "When", value: "11–18 May, 7–8 AM" }, { label: "Covered", value: "Calisthenics, kickboxing and flexibility" }] });
  await add(M.Page, { slug: "mci" }, { slug: "mci", title: "Master Calisthenics India", kicker: "Coaching experience", published: false, intro: "My coaching association with Master Calisthenics India (MCI)." });
  const ms = [["10th standard", "Education", "2021", "82.60%"], ["12th standard", "Education", "2023", "53.83%"],
    ["BSc Computer Science", "Education", "2026", "Royal College of Arts, Science and Commerce (Autonomous), Mira Road. CGPI 6.95."],
    ["NCC Company Sergeant Major", "Leadership", "", ""], ["NCC B Certificate", "Certification", "", ""], ["NCC C Certificate", "Certification", "", ""],
    ["District-level kickboxing gold medal", "Athletics", "", ""], ["Aavishkar: podium-round participation", "Research", "", "Presented a research project at Aavishkar."],
    ["NSS involvement", "Volunteering", "", ""], ["Coaching with Master Calisthenics India (MCI)", "Coaching", "", ""],
    ["TWZ free seven-day camp", "Coaching", "11–18 May", "Joggers Park, Mira Road. Calisthenics, kickboxing and flexibility."],
    ["Software projects: Beauty Box, Nagrik, JCSAM, Dravon", "Project", "", ""], ["Founder of Zhub", "Founder venture", "", ""]];
  for (const [i, [title, category, date, summary]] of ms.entries()) await add(M.Milestone, { title }, { title, category, date, summary, order: (i + 1) * 10 });
  const MOVES = {
    "Calisthenics": ["Pull-ups", "Chin-ups", "Push-ups", "Dips", "Muscle-up progressions", "Handstands", "Front lever progressions", "Back lever progressions", "L-sit", "Planche progressions", "Static holds", "Dynamic calisthenics", "Weighted calisthenics", "Bodyweight strength", "Core strength", "Relative strength", "Muscular endurance", "Explosive movement"],
    "Upper-body strength": ["Horizontal pushing", "Vertical pushing", "Horizontal pulling", "Vertical pulling", "Chest strength", "Shoulder strength", "Back strength", "Arm strength", "Grip strength", "Scapular control"],
    "Lower-body strength": ["Squat variations", "Bulgarian split squats", "Hip thrusts", "Lunges", "Jump squats", "Calf raises", "Hamstring development", "Glute development", "Unilateral strength", "Explosive lower-body movements"],
    "Core and body control": ["L-sit", "Hanging leg raises", "Hollow body holds", "Planks", "Compression strength", "Anti-extension", "Anti-rotation", "Static core strength", "Dynamic core control"],
    "Kickboxing": ["Fighting stance", "Footwork", "Punching fundamentals", "Punch combinations", "Kicking techniques", "Defensive movements", "Pad work", "Coordination", "Speed", "Conditioning", "Combat-sport fitness"],
    "Strength and conditioning": ["Strength development", "Progressive overload", "Compound exercises", "Functional strength", "Muscular endurance", "Explosive strength", "Athletic conditioning", "Circuit training", "Bodyweight conditioning", "Physical preparation"],
    "Mobility and flexibility": ["Dynamic mobility", "Active flexibility", "Joint mobility", "Shoulder mobility", "Hip mobility", "Ankle mobility", "Flexibility training", "Movement control", "Skill-specific mobility"],
  };
  // status (demonstrate / developing / coach / programming) is deliberately left empty: you set it per item in /admin, nothing is claimed for you.
  for (const [category, names] of Object.entries(MOVES)) for (const [i, name] of names.entries()) await add(M.Movement, { name, category }, { name, category, order: i });
  const COACHING = ["Exercise selection", "Training session design", "Progressive skill development", "Strength programming", "Group coaching", "Beginner training", "Intermediate training", "Kids' strength and conditioning", "Movement instruction", "Exercise regressions and progressions"];
  for (const [i, name] of COACHING.entries()) await add(M.Skill, { name, category: "Coaching and programming", world: "coach" }, { name, category: "Coaching and programming", world: "coach", order: i });
  console.log("Seed complete. Admin:", email.toLowerCase());
  process.exit(0);
})().catch((e) => { console.error(e.message); process.exit(1); });
