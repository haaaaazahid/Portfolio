import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Mail, Plus, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { profile } from "../data/content";

const links = [
  { icon: MessageCircle, href: profile.whatsapp, label: "WhatsApp", color: "#25D366" },
  { icon: Mail, href: `mailto:${profile.email}`, label: "Email", color: "var(--accent)" },
  { icon: GithubIcon, href: profile.github, label: "GitHub", color: "var(--text)" },
  { icon: LinkedinIcon, href: profile.linkedin, label: "LinkedIn", color: "#0A66C2" },
];

function FloatingButtons() {
  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handler = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="fixed right-4 sm:right-6 bottom-16 sm:bottom-14 z-[65] flex flex-col items-end gap-3">
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="w-10 h-10 rounded-full border flex items-center justify-center shadow-lg"
            style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open &&
          links.map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              aria-label={l.label}
              initial={{ opacity: 0, y: 10, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ delay: i * 0.04 }}
              className="w-11 h-11 rounded-full border flex items-center justify-center shadow-lg"
              style={{ background: "var(--surface)", borderColor: "var(--border)", color: l.color }}
            >
              <l.icon size={18} />
            </motion.a>
          ))}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close quick contact menu" : "Open quick contact menu"}
        animate={{ rotate: open ? 45 : 0 }}
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-xl"
        style={{ background: "var(--accent)", color: "#10121A", width: 52, height: 52 }}
      >
        <Plus size={22} />
      </motion.button>
    </div>
  );
}

export default FloatingButtons;
