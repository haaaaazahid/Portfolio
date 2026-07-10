import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, FileDown } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { navLinks, profile } from "../data/content";
import { useScrollSpy } from "../hooks/useScrollSpy";

const fileNames = {
  home: "home.jsx",
  about: "about.jsx",
  skills: "skills.json",
  projects: "projects.jsx",
  experience: "experience.jsx",
  contact: "contact.jsx",
};

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function Navbar() {
  const { dark, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(navLinks.map((l) => l.to));

  return (
    <>
      <nav
        className="fixed top-0 w-full z-[60] backdrop-blur-md border-b"
        style={{ background: "color-mix(in srgb, var(--bg) 82%, transparent)", borderColor: "var(--border)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <button
            onClick={() => scrollTo("home")}
            className="mono text-sm font-semibold flex items-center gap-2 shrink-0"
            style={{ color: "var(--text)" }}
            aria-label="Go to top"
          >
            <span
              className="w-6 h-6 rounded flex items-center justify-center text-[11px] font-bold"
              style={{ background: "var(--accent)", color: "#10121A" }}
            >
              MZ
            </span>
            <span className="hidden sm:inline" style={{ color: "var(--text-faint)" }}>~/</span>
            <span>zahid</span>
          </button>

          {/* Desktop tab bar */}
          <div
            className="hidden md:flex items-stretch h-14 overflow-x-auto ml-6 flex-1"
            role="tablist"
          >
            {navLinks.map((l) => {
              const isActive = active === l.to;
              return (
                <button
                  key={l.to}
                  onClick={() => scrollTo(l.to)}
                  role="tab"
                  aria-selected={isActive}
                  className="mono text-[13px] px-4 h-full flex items-center gap-2 border-r border-t-2 shrink-0 transition-colors"
                  style={{
                    borderColor: "var(--border)",
                    borderTopColor: isActive ? "var(--accent)" : "transparent",
                    background: isActive ? "var(--surface)" : "transparent",
                    color: isActive ? "var(--text)" : "var(--text-faint)",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: isActive ? "var(--accent-2)" : "var(--border-strong)" }}
                  />
                  {fileNames[l.to]}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={profile.resumeUrl}
              download
              className="hidden sm:inline-flex items-center gap-1.5 mono text-xs font-medium px-3 py-1.5 rounded-md border transition-colors"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
            >
              <FileDown size={13} /> resume
            </a>
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="w-8 h-8 rounded-md flex items-center justify-center border transition-colors"
              style={{ borderColor: "var(--border)", color: "var(--text)" }}
            >
              {dark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button
              onClick={() => setOpen(true)}
              className="md:hidden w-8 h-8 rounded-md flex items-center justify-center border"
              style={{ borderColor: "var(--border)", color: "var(--text)" }}
              aria-label="Open menu"
            >
              <Menu size={16} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] md:hidden"
            style={{ background: "var(--bg)" }}
          >
            <div className="flex items-center justify-between h-14 px-4 border-b" style={{ borderColor: "var(--border)" }}>
              <span className="mono text-sm" style={{ color: "var(--text-faint)" }}>menu.jsx</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" style={{ color: "var(--text)" }}>
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-col p-4 gap-1">
              {navLinks.map((l, i) => (
                <motion.button
                  key={l.to}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => {
                    setOpen(false);
                    setTimeout(() => scrollTo(l.to), 120);
                  }}
                  className="mono text-lg text-left py-3 px-2 border-b"
                  style={{ borderColor: "var(--border)", color: "var(--text)" }}
                >
                  <span style={{ color: "var(--accent)" }}>{fileNames[l.to].split(".")[0]}</span>
                  <span style={{ color: "var(--text-faint)" }}>.{fileNames[l.to].split(".")[1]}</span>
                </motion.button>
              ))}
              <a
                href={profile.resumeUrl}
                download
                className="mono text-sm mt-4 px-2 py-3 rounded-md border flex items-center gap-2 justify-center"
                style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
              >
                <FileDown size={15} /> Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
