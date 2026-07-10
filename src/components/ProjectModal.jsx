import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "./icons";
import { useEffect } from "react";

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[90] flex items-start sm:items-center justify-center p-0 sm:p-6 overflow-y-auto"
          style={{ background: "rgba(5,6,10,0.72)" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-2xl sm:rounded-2xl border overflow-hidden my-0 sm:my-10"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
          >
            <div
              className="flex items-center justify-between px-5 py-3 border-b sticky top-0"
              style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}
            >
              <span className="mono text-xs" style={{ color: "var(--text-faint)" }}>
                case-study / {project.id}.jsx
              </span>
              <button onClick={onClose} aria-label="Close" style={{ color: "var(--text-muted)" }}>
                <X size={18} />
              </button>
            </div>

            <div className="p-6 sm:p-7">
              <div className="flex items-start justify-between gap-3 mb-1">
                <h3 className="text-2xl font-bold">{project.name}</h3>
                <span
                  className="mono text-[11px] px-2.5 py-1 rounded-full shrink-0"
                  style={{
                    background: project.status === "Live" ? "var(--accent-2-soft)" : "var(--accent-soft)",
                    color: project.status === "Live" ? "var(--accent-2)" : "var(--accent)",
                  }}
                >
                  {project.status === "Live" ? "● Live" : "● Research"}
                </span>
              </div>
              <p className="text-sm mb-5" style={{ color: "var(--text-muted)" }}>{project.tagline} · {project.year}</p>

              <p className="text-[15px] leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
                {project.summary}
              </p>

              <div className="grid sm:grid-cols-2 gap-5 mb-6">
                <div>
                  <div className="mono text-xs mb-1.5" style={{ color: "var(--accent)" }}># problem</div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{project.problem}</p>
                </div>
                <div>
                  <div className="mono text-xs mb-1.5" style={{ color: "var(--accent-2)" }}># solution</div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{project.solution}</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="mono text-xs mb-2" style={{ color: "var(--text-faint)" }}># key features</div>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                      <CheckCircle2 size={14} className="mt-0.5 shrink-0" style={{ color: "var(--accent-2)" }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <div className="mono text-xs mb-1.5" style={{ color: "var(--text-faint)" }}># challenges</div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{project.challenges}</p>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-7">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="mono text-[11px] px-2.5 py-1 rounded-md border"
                    style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold"
                    style={{ background: "var(--accent)", color: "#10121A" }}
                  >
                    <ExternalLink size={14} /> Live Demo
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border"
                    style={{ borderColor: "var(--border-strong)", color: "var(--text)" }}
                  >
                    <GithubIcon size={14} /> GitHub
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ProjectModal;
