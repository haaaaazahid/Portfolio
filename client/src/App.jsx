import { lazy, Suspense, useState } from "react";
import { Routes, Route, useLocation, Navigate, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import { Cursor, ScrollProgress, Preloader, Curtain, Loading } from "./components/ui";
const page = (f) => lazy(f);
const Home = page(() => import("./pages/Home")), About = page(() => import("./pages/About")), Projects = page(() => import("./pages/Projects")),
  ProjectDetail = page(() => import("./pages/ProjectDetail")), Experience = page(() => import("./pages/Experience")), Gallery = page(() => import("./pages/Gallery")),
  Coach = page(() => import("./pages/Coach")), Developer = page(() => import("./pages/Developer")), Zhub = page(() => import("./pages/Zhub")), Admin = page(() => import("./pages/Admin")), Contact = page(() => import("./pages/Contact"));

// Developer-side pages use the signal-blue accent, coach-side pages the ember accent
const worldFor = (p) => (/^\/(developer|zhub|contact|projects|admin)/.test(p) ? "developer" : "coach");

export default function App() {
  const location = useLocation(); const admin = location.pathname.startsWith("/admin"); const [ready, setReady] = useState(admin);
  const k = admin ? "admin" : location.pathname; // admin tabs animate themselves; don't replay the site transition
  return (
    <ThemeProvider world={worldFor(location.pathname)}>
      <Helmet titleTemplate="%s — MOHD ZAHID SHAIKH" defaultTitle="MOHD ZAHID SHAIKH — Two worlds. One identity." />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[95] focus:bg-white focus:p-2 focus:text-black">Skip to content</a>
      {!admin && <><ScrollProgress /><Cursor /><Navbar /></>}{!ready && <Preloader onDone={() => setReady(true)} />}
      <main id="main" className="min-h-[100svh]">
        {/* Same as the original: fade out, reset scroll, fade in — with the accent curtain retracting over it */}
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
          <motion.div key={k} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}>
            <Suspense fallback={<div className="wrap pt-40"><Loading /></div>}>
              <Routes location={location}>
                <Route path="/" element={<Home />} /><Route path="/about" element={<About />} /><Route path="/projects" element={<Projects />} /><Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/coach/experience" element={<Experience world="coach" />} /><Route path="/developer/experience" element={<Experience world="developer" />} /><Route path="/experience" element={<Navigate to="/developer/experience" replace />} /><Route path="/gallery" element={<Gallery />} /><Route path="/coach" element={<Coach />} />
                <Route path="/developer" element={<Developer />} /><Route path="/zhub" element={<Zhub />} /><Route path="/contact" element={<Contact />} /><Route path="/admin/*" element={<Admin />} /><Route path="*" element={<Home />} />
              </Routes>
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      {!admin && <Curtain k={location.pathname} delay={ready ? 0 : 1.4} />}
      {!admin && <footer className="border-t px-[22px] py-12 text-center text-sm" style={{ borderColor: "var(--line)", color: "var(--mut)" }}>© {new Date().getFullYear()} MOHD ZAHID SHAIKH<span aria-hidden="true"> · </span><Link to="/admin" className="underline underline-offset-4 hover:opacity-100">Admin login</Link></footer>}
    </ThemeProvider>
  );
}
