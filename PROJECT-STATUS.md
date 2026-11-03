# Project status

**Verification level:** the build sandbox had no network, so nothing has been run end to end (no `npm install`, no MongoDB, no browser).
What was checked: JS/JSX syntax, undefined names, import resolution, helper-function unit tests (image crop math, admin form data conversion), admin-form-vs-server-schema consistency, and rendered test frames for the loader and the crop/zoom framing (viewed as images).

## Done (code complete, untested in a browser)
- **Two worlds.** Home door choice, journey preview, four enquiry pathways (contact form preselects the topic).
- **Coach:** /coach, /coach/experience, /coach/mci, /coach/twz, /coach/disciplines, /coach/movement-library (search, filters, expandable entries), /coach/programmes, /coach/athletes, /coach/achievements, /gallery.
- **Developer:** /developer, /developer/projects (archive + category filter), /developer/projects/:slug (full case study, empty fields hidden), /developer/skills (evidence: which projects use each skill), /developer/zhub (a project record, slug `zhub`).
- **Journey:** /journey (milestone timeline, education, research, achievements, certificates), /journey/research/:slug.
- **Admin:** every section above is editable. Projects have all case-study fields; draft/publish/archive/feature/duplicate; multi-image galleries with drag-and-drop, reorder arrows, captions and alt text; pages (MCI, TWZ, athletes); movements; programmes (Draft is never shown); milestones; dashboard counters.
- **Images:** crop, zoom and focus point per image (non-destructive: original kept, framing stored in the URL as `#c=x,y,zoom`). Cards and grids show the framing; clicking any image opens the complete original.
- **Loader:** the stick figure was removed (rendered frames showed deformed limbs). It is now a geometric mark (verified frames) + code typing + name reveal. Skippable, reduced-motion safe, timer-driven.

## Needs information or access from you
- **MCI website, Beauty Box, JCSAM, Nagrik, Dravon:** I cannot see these repositories. Contribution, architecture, screenshots, status and links are empty fields (hidden publicly). MCI Website and the Aavishkar research project are seeded as unpublished drafts until verified.
- **Aavishkar research:** topic, methodology, findings, documents.
- **NSS, NCC, kickboxing:** details and dates (none are shown unless you add them).
- **MCI current information:** historical prices, batches and location are deliberately NOT published. Add them in /admin (Programmes or MCI page) only once confirmed current.
- **Athlete case studies:** only with the athlete's permission.
- **Movement library:** the seed holds names and categories only. Set per-item "how it relates to me", difficulty, instructions, images and videos in /admin.
- **Photos and videos** for every section.

## Not done / differences from the master prompt
- **Backend stays MongoDB + Express + JWT** (the existing, deployed stack). Supabase / Row Level Security were not introduced; authorization is enforced server-side in the API.
- No GitHub repository discovery (no network).
- Video is by YouTube/Vimeo link only (no video file upload).
- Upload progress shows "n of N", not a percentage bar. Reordering uses arrow buttons, not drag handles.
- No automated test suite.
