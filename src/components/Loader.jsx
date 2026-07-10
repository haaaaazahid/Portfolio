import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const lines = [
  "booting portfolio.exe",
  "loading modules: react, node, mysql",
  "compiling experience...",
  "ready.",
];

function Loader({ onDone }) {
  const [visible, setVisible] = useState(true);
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (lineIndex < lines.length - 1) {
      const t = setTimeout(() => setLineIndex((i) => i + 1), 260);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setVisible(false);
      onDone?.();
    }, 420);
    return () => clearTimeout(t);
  }, [lineIndex, onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "var(--bg)" }}
        >
          <div className="mono text-sm w-[280px] sm:w-[340px]">
            {lines.slice(0, lineIndex + 1).map((l, i) => (
              <div key={i} className="flex items-center gap-2 mb-1.5" style={{ color: i === lineIndex ? "var(--accent)" : "var(--text-faint)" }}>
                <span>{i === lines.length - 1 && i === lineIndex ? "✓" : "$"}</span>
                <span>{l}</span>
                {i === lineIndex && <span className="blink-caret" style={{ color: "var(--accent)" }}>▌</span>}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Loader;
