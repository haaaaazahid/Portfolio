// One entry per content section. The generic Manager renders list + form from this.
const world = { name: "world", label: "Belongs to", type: "select", options: [["coach", "Coach"], ["developer", "Developer"]] };
const order = { name: "order", label: "Order (lowest first)", type: "number" };
export const SECTIONS = {
  projects: { title: "Projects", api: "projects", icon: "FolderKanban", blank: { published: true, category: "Full-stack" }, label: (i) => i.title, sub: (i) => [i.category, i.status, i.published ? "" : "Draft"].filter(Boolean).join(" · "), thumb: (i) => i.cover,
    fields: [{ name: "title", label: "Title", required: true }, { name: "status", label: "Status", help: "e.g. Live, In progress" }, { name: "category", label: "Category", help: "Used for the filter on /projects" },
      { name: "description", label: "Short description", type: "textarea" }, { name: "details", label: "Full details (project page)", type: "textarea", rows: 6 }, { name: "tags", label: "Tech stack", type: "tags", help: "Comma separated" },
      { name: "cover", label: "Cover image", type: "image" }, { name: "images", label: "More screenshots", type: "images" }, { name: "liveUrl", label: "Live site URL", type: "url" }, { name: "githubUrl", label: "GitHub URL", type: "url" },
      { name: "featured", label: "Show on the home page", type: "checkbox" }, { name: "published", label: "Published (visible to visitors)", type: "checkbox" }, order] },
  skills: { title: "Skills", api: "skills", icon: "Wrench", blank: { world: "developer" }, label: (i) => i.name, sub: (i) => `${i.category} · ${i.world}`,
    fields: [{ name: "name", label: "Skill", required: true }, { name: "category", label: "Group", required: true, help: "e.g. Frontend, Backend, Specialities" }, world, { name: "level", label: "Level 0–100 (optional)", type: "number" }, order] },
  experience: { title: "Experience", api: "experience", icon: "Briefcase", blank: { world: "coach" }, label: (i) => i.role, sub: (i) => [i.org, [i.start, i.end].filter(Boolean).join(" – ")].filter(Boolean).join(" · "),
    fields: [{ name: "role", label: "Role", required: true }, { name: "org", label: "Organisation", required: true }, world, { name: "start", label: "Start", help: "e.g. 2022" }, { name: "end", label: "End", help: "Leave empty if current" },
      { name: "summary", label: "Summary", type: "textarea" }, { name: "highlights", label: "Highlights", type: "lines", help: "One per line" }, order] },
  education: { title: "Education", api: "education", icon: "GraduationCap", blank: {}, label: (i) => i.degree, sub: (i) => [i.institution, i.end].filter(Boolean).join(" · "),
    fields: [{ name: "degree", label: "Degree / course", required: true }, { name: "institution", label: "Institution", required: true }, { name: "start", label: "Start" }, { name: "end", label: "End / graduation" }, { name: "grade", label: "Grade" }, { name: "notes", label: "Notes", type: "textarea" }, order] },
  achievements: { title: "Achievements", api: "achievements", icon: "Trophy", blank: { world: "coach" }, label: (i) => i.title, sub: (i) => i.detail,
    fields: [{ name: "title", label: "Title", required: true }, { name: "detail", label: "Detail" }, world, order] },
  certificates: { title: "Certificates", api: "certificates", icon: "Award", blank: { world: "coach" }, label: (i) => i.title, sub: (i) => [i.issuer, i.date].filter(Boolean).join(" · "), thumb: (i) => i.image,
    fields: [{ name: "title", label: "Certificate name", required: true }, { name: "issuer", label: "Issued by" }, { name: "date", label: "Date" }, { name: "image", label: "Certificate image", type: "image", help: "Photo or scan (JPG, PNG or WebP, up to 5 MB)" },
      { name: "credentialUrl", label: "Verification link", type: "url" }, world, order] },
  gallery: { title: "Coaching gallery", api: "gallery", icon: "Images", blank: { category: "Training" }, label: (i) => i.caption || i.category || "Photo", sub: (i) => i.category, thumb: (i) => i.src,
    fields: [{ name: "src", label: "Photo", type: "image", required: true }, { name: "category", label: "Category", help: "e.g. Training, Kickboxing, Events — becomes a filter on the public gallery" }, { name: "caption", label: "Caption" }, { name: "alt", label: "Alt text (for screen readers)" }] },
};
export const PROFILE_FIELDS = [
  { name: "name", label: "Name" }, { name: "tagline", label: "Tagline" }, { name: "coachIntro", label: "Coach door text", type: "textarea" }, { name: "devIntro", label: "Developer door text", type: "textarea" },
  { name: "bio", label: "Bio (home and about)", type: "textarea", rows: 5 }, { name: "email", label: "Public email" }, { name: "location", label: "Location" }, { name: "avatar", label: "Portrait photo", type: "image" },
  { name: "resumeUrl", label: "Résumé link", type: "url" }, { name: "socials", label: "Social links", type: "pairs", help: "One per line: Label | https://link" },
  { name: "zhub.vision", label: "Zhub vision", type: "textarea" }, { name: "zhub.mission", label: "Zhub mission", type: "textarea" },
];
