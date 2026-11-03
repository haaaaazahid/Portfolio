// One entry per content section. The generic Manager renders the list + form from this.
const T = (name, label, x = {}) => ({ name, label, ...x });
const TA = (name, label, x = {}) => ({ name, label, type: "textarea", ...x });
const sel = (name, label, options, x = {}) => ({ name, label, type: "select", options, ...x });
const world = sel("world", "Belongs to", [["coach", "Coach"], ["developer", "Developer"]]);
const order = T("order", "Order (lowest first)", { type: "number" });
const KINDS = ["screenshot", "desktop", "mobile", "front", "back", "left", "right", "detail", "gallery"];
const mediaRows = (label = "Images") => ({ name: "media", label, type: "rows", multi: "url", addLabel: "Add an image", help: "Drag several images in at once. Use the arrows to reorder. Click “Adjust crop and zoom” on any image.",
  itemFields: [T("url", "Image", { type: "image", aspect: "4/3" }), sel("kind", "Type", ["", ...KINDS]), T("caption", "Caption"), T("alt", "Alt text (for screen readers)")] });
const MOVE_CATS = ["Calisthenics", "Upper-body strength", "Lower-body strength", "Core and body control", "Kickboxing", "Strength and conditioning", "Mobility and flexibility"];

export const SECTIONS = {
  projects: { title: "Projects", api: "projects", icon: "FolderKanban", name: "title", duplicate: true, blank: { published: true, category: "Full-stack" }, label: (i) => i.title,
    sub: (i) => [i.category, i.status, i.archived ? "Archived" : i.published ? "" : "Draft"].filter(Boolean).join(" · "), thumb: (i) => i.cover, aspect: "4/3",
    fields: [T("title", "Title", { required: true }), T("slug", "URL name", { help: "Leave empty to generate from the title." }),
      sel("category", "Category", ["Full-stack", "Frontend", "Backend", "Websites", "E-commerce", "Business application", "Research", "Academic", "Personal", "Founder venture"]),
      sel("status", "Status", ["", "Completed", "In development", "Prototype", "Archived", "Experimental"], { help: "Leave empty if unsure. Nothing is shown rather than a guess." }),
      TA("description", "Short description (cards)"), TA("overview", "Overview", { rows: 4 }), TA("problem", "Problem statement", { rows: 4 }), TA("solution", "Solution", { rows: 4 }),
      TA("contribution", "My contribution", { rows: 4, help: "Only what you personally built or did." }), T("tags", "Technology stack", { type: "tags", help: "Comma separated" }),
      TA("architecture", "System architecture", { rows: 4 }), TA("frontend", "Frontend"), TA("backend", "Backend"), TA("database", "Database"), TA("authentication", "Authentication"), TA("integrations", "APIs and integrations"),
      T("features", "Main features", { type: "lines", help: "One per line" }), TA("challenges", "Challenges", { rows: 4 }), TA("decisions", "Technical decisions", { rows: 4 }), TA("outcome", "Outcome", { rows: 4 }), TA("future", "Future improvements"),
      T("cover", "Cover image", { type: "image", aspect: "4/3" }), mediaRows("Screenshots and gallery"),
      T("liveUrl", "Live demo URL", { type: "url" }), T("githubUrl", "GitHub URL", { type: "url" }), T("docsUrl", "Documentation URL", { type: "url" }), T("videoUrl", "Video URL (YouTube or Vimeo)", { type: "url" }),
      T("featured", "Show on the home page", { type: "checkbox" }), T("published", "Published (visible to visitors)", { type: "checkbox" }), T("archived", "Archived (hidden everywhere)", { type: "checkbox" }), order] },
  pages: { title: "Coach pages (MCI, TWZ, athletes)", api: "pages", icon: "FileText", name: "title", duplicate: true, blank: { group: "page" }, label: (i) => i.title, sub: (i) => [i.group === "athlete" ? "Athlete case study" : "Page", `/${i.slug}`, i.published ? "" : "Draft"].filter(Boolean).join(" · "),
    fields: [T("title", "Title", { required: true }), T("slug", "URL name", { help: "Use “mci” and “twz” for those pages. Athlete pages: any name." }), sel("group", "Type", [["page", "Page (MCI, TWZ…)"], ["athlete", "Athlete case study"]]),
      T("kicker", "Small heading above the title"), TA("intro", "Introduction", { rows: 4 }), { name: "facts", label: "Key facts", type: "rows", addLabel: "Add a fact", itemFields: [T("label", "Label"), T("value", "Value")] },
      { name: "sections", label: "Sections", type: "rows", addLabel: "Add a section", itemFields: [T("heading", "Heading"), TA("body", "Text", { rows: 5 })] }, mediaRows("Photos"),
      T("videos", "Videos", { type: "lines", help: "One YouTube or Vimeo link per line" }), T("published", "Published (athlete pages need the athlete’s permission)", { type: "checkbox" }), order] },
  movements: { title: "Movement library", api: "movements", icon: "Dumbbell", name: "name", duplicate: true, blank: { category: "Calisthenics", published: true }, label: (i) => i.name, sub: (i) => [i.category, i.difficulty, i.published ? "" : "Hidden"].filter(Boolean).join(" · "), thumb: (i) => i.image, aspect: "4/3",
    fields: [T("name", "Movement", { required: true }), sel("category", "Category", MOVE_CATS), sel("status", "How it relates to me", [["", "Not specified (not shown)"], ["demonstrate", "I can demonstrate it"], ["developing", "I am developing it"], ["coach", "I coach it"], ["programming", "I use it in programming"]]),
      sel("difficulty", "Difficulty", ["", "Beginner", "Intermediate", "Advanced"]), T("pattern", "Muscle groups / movement pattern"), TA("instructions", "Instructions", { rows: 5 }),
      T("progressions", "Progressions", { type: "lines", help: "One per line" }), T("regressions", "Regressions", { type: "lines", help: "One per line" }), T("mistakes", "Common mistakes", { type: "lines", help: "One per line" }),
      T("related", "Related skills", { type: "lines", help: "One per line" }), T("image", "Demonstration image", { type: "image", aspect: "4/3" }), T("videoUrl", "Video (YouTube or Vimeo)", { type: "url" }), T("published", "Visible to visitors", { type: "checkbox" }), order] },
  programmes: { title: "Programmes", api: "programmes", icon: "ClipboardList", name: "title", duplicate: true, blank: { status: "Draft" }, label: (i) => i.title, sub: (i) => [i.level, i.status].filter(Boolean).join(" · "), thumb: (i) => i.image, aspect: "4/3",
    fields: [T("title", "Programme name", { required: true }), sel("level", "Level", ["", "Beginner", "Intermediate", "Advanced", "All levels"]), TA("summary", "Summary"), TA("description", "Description", { rows: 5 }), T("audience", "Who it is for"), T("duration", "Duration"), T("schedule", "Schedule"),
      T("price", "Price", { help: "Only enter a price you have confirmed is current." }), T("image", "Image", { type: "image", aspect: "4/3" }), sel("status", "Status", [["Draft", "Draft (never shown)"], ["Active", "Active (currently offered)"], ["Past", "Past (shown as a past programme)"]]), order] },
  milestones: { title: "Journey milestones", api: "milestones", icon: "Route", name: "title", blank: { category: "Personal" }, label: (i) => i.title, sub: (i) => [i.category, i.date].filter(Boolean).join(" · "), thumb: (i) => i.image, aspect: "4/3",
    fields: [T("title", "Title", { required: true }), sel("category", "Category", ["Education", "Leadership", "Athletics", "Coaching", "Research", "Volunteering", "Certification", "Competition", "Project", "Founder venture", "Personal"]),
      T("date", "Date", { help: "Only if verified. Left empty, no date is shown." }), TA("summary", "Details"), T("image", "Image", { type: "image", aspect: "4/3" }), order] },
  skills: { title: "Skills", api: "skills", icon: "Wrench", name: "name", blank: { world: "developer" }, label: (i) => i.name, sub: (i) => `${i.category} · ${i.world}${i.status ? " · " + i.status : ""}`,
    fields: [T("name", "Skill", { required: true }), T("category", "Group", { required: true, help: "e.g. Frontend, Backend, Coaching and programming" }), world, sel("status", "Level label", ["", "Familiar", "Actively used", "Currently learning"], { help: "Honest labels only. No percentages." }), order] },
  experience: { title: "Experience", api: "experience", icon: "Briefcase", name: "role", blank: { world: "coach" }, label: (i) => i.role, sub: (i) => [i.org, [i.start, i.end].filter(Boolean).join(" – ")].filter(Boolean).join(" · "),
    fields: [T("role", "Role", { required: true }), T("org", "Organisation", { required: true }), world, T("start", "Start", { help: "e.g. 2022" }), T("end", "End", { help: "Leave empty if current" }), TA("summary", "Summary"), T("highlights", "Highlights", { type: "lines", help: "One per line" }), order] },
  education: { title: "Education", api: "education", icon: "GraduationCap", name: "degree", blank: {}, label: (i) => i.degree, sub: (i) => [i.institution, i.end].filter(Boolean).join(" · "),
    fields: [T("degree", "Degree / course", { required: true }), T("institution", "Institution", { required: true }), T("start", "Start"), T("end", "End / graduation"), T("grade", "Grade"), TA("notes", "Notes"), order] },
  achievements: { title: "Achievements", api: "achievements", icon: "Trophy", name: "title", blank: { world: "coach" }, label: (i) => i.title, sub: (i) => i.detail, fields: [T("title", "Title", { required: true }), T("detail", "Detail"), world, order] },
  certificates: { title: "Certificates", api: "certificates", icon: "Award", name: "title", blank: { world: "coach" }, label: (i) => i.title, sub: (i) => [i.issuer, i.date].filter(Boolean).join(" · "), thumb: (i) => i.image, aspect: "4/3",
    fields: [T("title", "Certificate name", { required: true }), T("issuer", "Issued by"), T("date", "Date"), T("image", "Certificate image", { type: "image", aspect: "4/3", help: "Photo or scan (JPG, PNG or WebP, up to 5 MB)" }), T("credentialUrl", "Verification link", { type: "url" }), world, order] },
  gallery: { title: "Coaching gallery", api: "gallery", icon: "Images", name: "caption", blank: { category: "Training" }, label: (i) => i.caption || i.category || "Photo", sub: (i) => i.category, thumb: (i) => i.src, aspect: "4/5",
    fields: [T("src", "Photo", { type: "image", aspect: "4/5", required: true }), T("category", "Category", { help: "e.g. Training, Kickboxing, Events. Becomes a filter on the public gallery." }), T("caption", "Caption"), T("alt", "Alt text (for screen readers)")] },
};
export const PROFILE_FIELDS = [
  T("name", "Name"), T("tagline", "Tagline"), TA("coachIntro", "Coach door text"), TA("devIntro", "Developer door text"), TA("bio", "Bio (home and journey)", { rows: 5 }), T("email", "Public email"), T("location", "Location"),
  T("avatar", "Portrait photo", { type: "image", aspect: "1/1" }), T("resumeUrl", "Résumé link", { type: "url" }), T("socials", "Social links", { type: "pairs", help: "One per line: Label | https://link" }),
  TA("zhub.vision", "Zhub vision (legacy)"), TA("zhub.mission", "Zhub mission (legacy)"),
];
