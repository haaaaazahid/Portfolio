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
`/` split-doors home · `/about` · `/projects` (+ `/projects/:id`) · `/experience` · `/gallery` · `/coach` · `/developer` · `/zhub` · `/contact` · `/admin` (login at `/admin/login`)
Animations carried over from the original HTML: counter preloader, accent curtain wipe, masked word reveals, scroll reveals, magnetic buttons, cursor dot, marquee, parallax photo slots, scroll progress bar, expanding split doors.

## Admin (`/admin`)
Sign in with the ADMIN_EMAIL / ADMIN_PASSWORD from `server/.env` (created by `npm run seed`).
Sections: Dashboard, Messages, Site content (bio, email, socials, portrait, Zhub text), Projects, Skills, Experience, Education, Achievements, **Certificates**, **Coaching gallery**.
Photos you upload there appear on /gallery, /coach, /about. Empty sections show labelled placeholder slots instead.

## Colour palettes
Palette button in the navbar and admin: Ember & Signal (original), Slate & Amber, Forest & Brass, Mono & Lime. Saved per browser. To change the default for everyone, edit the fallback `"original"` in `client/src/context/ThemeContext.jsx`.

## If /admin fails
1. `curl http://localhost:5000/api/health` must return ok (server running, MongoDB connected).
2. Run `npm run seed` in `server` once, after setting ADMIN_EMAIL and ADMIN_PASSWORD (12+ chars) in `server/.env`.
3. Login is limited to 8 tries per 15 minutes; restart the server to reset it.

## Folder hygiene
Keep only `server/` and `client/` (plus README). Delete `client/client/` (stale duplicate) and, once you no longer need it, `zs/` (the original single-file version).

## Not built yet
Nothing planned. 

## Deploying (frontend on Vercel, API elsewhere)
Vercel only hosts the React app. The Node API and database must be hosted separately, otherwise /admin cannot sign in and public pages stay empty.
1. **Database:** create a free MongoDB Atlas cluster; copy its connection string (allow access from anywhere, 0.0.0.0/0, for Render/Railway).
2. **API (Render or Railway):** root directory `server`, build `npm install`, start `npm start`. Environment variables: `NODE_ENV=production`, `MONGODB_URI`, `JWT_SECRET` (32+ chars), `ADMIN_EMAIL`, `ADMIN_PASSWORD` (12+ chars), `CLIENT_URL=https://<your-site>.vercel.app`, plus the three `CLOUDINARY_*` keys.
   Cloudinary is effectively required here: hosts like Render wipe local disk on every deploy, so local uploads would disappear.
3. Run `npm run seed` once against that database (Render shell, or locally with the Atlas URI in `server/.env`).
4. **Vercel:** project root `client`, add env var `VITE_API_URL=https://<your-api-host>/api`, then redeploy (Vite bakes it in at build time).
5. Check `https://<your-api-host>/api/health` returns `{"success":true,...}` before testing /admin/login.
