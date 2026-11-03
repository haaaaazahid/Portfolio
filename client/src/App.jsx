import { lazy, Suspense, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Cursor, ScrollProgress, Curtain, Loading } from "./components/ui";
import Intro from "./components/Intro";
const page = (f) => lazy(f);
const Home = page(() => import("./pages/Home")), Journey = page(() => import("./pages/Journey")), Projects = page(() => import("./pages/Projects")), ProjectCase = page(() => import("./pages/ProjectCase")),
  Experience = page(() => import("./pages/Experience")), Gallery = page(() => import("./pages/Gallery")), Coach = page(() => import("./pages/Coach")), CoachAchievements = page(() => import("./pages/CoachAchievements")),
  Disciplines = page(() => import("./pages/Disciplines")), MovementLibrary = page(() => import("./pages/MovementLibrary")), Programmes = page(() => import("./pages/Programmes")), Athletes = page(() => import("./pages/Athletes")),
  PageView = page(() => import("./pages/PageView")), Developer = page(() => import("./pages/Developer")), DevSkills = page(() => import("./pages/DevSkills")), Contact = page(() => import("./pages/Contact")),
  Admin = page(() => import("./pages/Admin")), NotFound = page(() => import("./pages/NotFound"));

// Developer-side pages use the signal-blue accent, coach-side pages the ember accent
const worldFor = (p) => (/^\/(developer|contact|journey|admin)/.test(p) ? "developer" : "coach");

export default function App() {
  const location = useLocation(); const admin = location.pathname.startsWith("/admin"); const [needIntro] = useState(() => { try { return !admin && sessionStorage.getItem("intro") !== "1"; } catch { return !admin; } });
  const [go, setGo] = useState(!needIntro); const [introDone, setIntroDone] = useState(!needIntro);
  const k = admin ? "admin" : location.pathname; // admin tabs animate themselves; don't replay the site transition
  return (
    <ThemeProvider world={worldFor(location.pathname)}>
      <Helmet titleTemplate="%s — MOHD ZAHID SHAIKH" defaultTitle="MOHD ZAHID SHAIKH — Two worlds. One identity." />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[95] focus:bg-white focus:p-2 focus:text-black">Skip to content</a>
      {needIntro && !introDone && <Intro onReveal={() => setGo(true)} onDone={() => setIntroDone(true)} />}
      {go && !admin && <><ScrollProgress /><Cursor /><Navbar /></>}
      <main id="main" className="min-vh">
        {go && <>
        {/* Same as the original: fade out, reset scroll, fade in — with the accent curtain retracting over it */}
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0, behavior: "instant" })}>
          <motion.div key={k} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <Suspense fallback={<div className="wrap pt-40"><Loading /></div>}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/coach" element={<Coach />} /><Route path="/coach/experience" element={<Experience />} /><Route path="/coach/mci" element={<PageView slug="mci" />} /><Route path="/coach/twz" element={<PageView slug="twz" />} />
                <Route path="/coach/disciplines" element={<Disciplines />} /><Route path="/coach/movement-library" element={<MovementLibrary />} /><Route path="/coach/programmes" element={<Programmes />} />
                <Route path="/coach/athletes" element={<Athletes />} /><Route path="/coach/athletes/:slug" element={<PageView />} /><Route path="/coach/achievements" element={<CoachAchievements />} /><Route path="/gallery" element={<Gallery />} />
                <Route path="/developer" element={<Developer />} /><Route path="/developer/projects" element={<Projects />} /><Route path="/developer/projects/:slug" element={<ProjectCase />} />
                <Route path="/developer/skills" element={<DevSkills />} /><Route path="/developer/zhub" element={<ProjectCase slug="zhub" />} />
                <Route path="/journey" element={<Journey />} /><Route path="/journey/research/:slug" element={<ProjectCase />} />
                <Route path="/contact" element={<Contact />} /><Route path="/admin/*" element={<Admin />} />
                {/* old addresses from earlier versions keep working */}
                <Route path="/about" element={<Navigate to="/journey" replace />} /><Route path="/projects" element={<Navigate to="/developer/projects" replace />} /><Route path="/zhub" element={<Navigate to="/developer/zhub" replace />} /><Route path="/experience" element={<Navigate to="/coach/experience" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </motion.div>
        </AnimatePresence>
        </>}
      </main>
      {go && !admin && <Curtain k={location.pathname} skipFirst={needIntro} />}
      {go && !admin && <Footer />}
    </ThemeProvider>
  );
}
