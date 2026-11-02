import { lazy, Suspense, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Cursor, ScrollProgress, Curtain, Loading } from "./components/ui";
import Intro from "./components/Intro";
const page = (f) => lazy(f);
const Home = page(() => import("./pages/Home")), About = page(() => import("./pages/About")), Projects = page(() => import("./pages/Projects")),
  ProjectDetail = page(() => import("./pages/ProjectDetail")), Experience = page(() => import("./pages/Experience")), Gallery = page(() => import("./pages/Gallery")),
  Coach = page(() => import("./pages/Coach")), Developer = page(() => import("./pages/Developer")), Zhub = page(() => import("./pages/Zhub")), Admin = page(() => import("./pages/Admin")), NotFound = page(() => import("./pages/NotFound")), Contact = page(() => import("./pages/Contact"));

// Developer-side pages use the signal-blue accent, coach-side pages the ember accent
const worldFor = (p) => (/^\/(developer|zhub|contact|projects|experience|admin)/.test(p) ? "developer" : "coach");

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
                <Route path="/" element={<Home />} /><Route path="/about" element={<About />} /><Route path="/projects" element={<Projects />} /><Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/experience" element={<Experience />} /><Route path="/gallery" element={<Gallery />} /><Route path="/coach" element={<Coach />} />
                <Route path="/developer" element={<Developer />} /><Route path="/zhub" element={<Zhub />} /><Route path="/contact" element={<Contact />} /><Route path="/admin/*" element={<Admin />} /><Route path="*" element={<NotFound />} />
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
