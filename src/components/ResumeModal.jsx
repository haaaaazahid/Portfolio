import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink } from "lucide-react";
import { useEffect } from "react";
import { profile } from "../data/content";

function ResumeModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[95] flex items-start sm:items-center justify-center p-0 sm:p-6 overflow-y-auto"
          style={{ background: "rgba(5,6,10,0.72)" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-3xl sm:rounded-2xl border overflow-hidden my-0 sm:my-10 flex flex-col"
            style={{ background: "var(--surface)", borderColor: "var(--border)", maxHeight: "92vh" }}
          >
            <div
              className="flex items-center justify-between px-5 py-3 border-b sticky top-0 shrink-0"
              style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}
            >
              <span className="mono text-xs" style={{ color: "var(--text-faint)" }}>
                ~/resume.pdf
              </span>
              <div className="flex items-center gap-4">
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 mono text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  <ExternalLink size={13} /> Open in new tab
                </a>
                <a
                  href={profile.resumeUrl}
                  download
                  className="inline-flex items-center gap-1.5 mono text-xs px-2.5 py-1.5 rounded-md"
                  style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
                >
                  <Download size={13} /> Download
                </a>
                <button onClick={onClose} aria-label="Close resume preview" style={{ color: "var(--text-muted)" }}>
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 min-h-[60vh] sm:min-h-[70vh]" style={{ background: "var(--bg-2)" }}>
              <object
                data={profile.resumeUrl}
                type="application/pdf"
                className="w-full h-full"
                style={{ minHeight: "60vh" }}
                aria-label="Resume PDF preview"
              >
                <div className="flex flex-col items-center justify-center h-full py-16 px-6 text-center gap-4">
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    Inline preview isn't supported in this browser.
                  </p>
                  <a
                    href={profile.resumeUrl}
                    download
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold"
                    style={{ background: "var(--accent)", color: "#10121A" }}
                  >
                    <Download size={14} /> Download Resume
                  </a>
                </div>
              </object>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ResumeModal;
