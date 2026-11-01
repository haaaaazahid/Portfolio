# Zahid Portfolio v2 — status: Phase 1 (backend complete, frontend foundation)

**Nothing here has been run.** The build sandbox had no network, so dependencies were never installed, MongoDB never started, and Vite never compiled.
Only JavaScript/JSX *syntax* was checked. Treat everything as untested until you run the steps below.

## Run locally
Requires Node 18+ and MongoDB (local or Atlas).
```bash
cd server && cp .env.example .env   # fill MONGODB_URI, JWT_SECRET (32+ chars), ADMIN_EMAIL, ADMIN_PASSWORD (12+ chars)
npm install && npm run seed && npm run dev      # API on :5000
cd ../client && npm install && npm run dev       # site on :5173 (proxies /api to :5000)
```
Smoke test: `curl localhost:5000/api/health`, `curl localhost:5000/api/projects`, then submit /contact.

## API (all responses: `{ success, data | error }`)
Public GET / admin write: `/api/projects /skills /experience /education /achievements /gallery` (`?all=1` + token shows drafts).
`POST /api/auth/login` · `POST /api/contact` · `GET|PUT /api/profile` · `POST /api/uploads` (admin, field `image`)
`GET /api/admin/stats` · `GET /api/admin/messages` · `PATCH /api/admin/messages/:id/read` · `DELETE /api/admin/messages/:id`

## Credentials you need
MongoDB URI (required) · JWT secret (required) · Cloudinary keys (optional; local `/uploads` fallback) · SMTP (optional; contact emails).

## Frontend routes
`/` split-doors home · `/about` · `/projects` (+ `/projects/:id`) · `/experience` · `/gallery` · `/coach` · `/developer` · `/zhub` · `/contact`
Animations carried over from the original HTML: counter preloader, accent curtain wipe, masked word reveals, scroll reveals, magnetic buttons, cursor dot, marquee, parallax photo slots, scroll progress bar, expanding split doors.

## Not built yet
Admin dashboard UI (the API for it exists; until then add content with the API or directly in MongoDB), SEO sitemap, deployment guide. `gsap` is installed but no longer used; remove it with `npm uninstall gsap` if you like.
