import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, ExternalLink, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./icons";
import SectionHeading from "./SectionHeading";
import ProjectModal from "./ProjectModal";
import { projects } from "../data/content";

const filters = ["All", "Live", "Research"];

function Projects() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState(null);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesFilter = filter === "All" || p.status === filter;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q));
      return matchesFilter && matchesQuery;
    });
  }, [query, filter]);

  return (
    <section id="projects" className="px-6 py-24 sm:py-28">
      <div className="max-w-5xl mx-auto">
        <SectionHeading path="projects" title="Featured" accent="Projects" align="center" />

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-10 mb-10">
          <div
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg border w-full sm:w-64"
            style={{ borderColor: "var(--border)", background: "var(--surface)" }}
          >
            <Search size={15} style={{ color: "var(--text-faint)" }} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects or tech..."
              className="mono text-[13px] bg-transparent outline-none w-full"
              style={{ color: "var(--text)" }}
              aria-label="Search projects"
            />
          </div>
          <div className="flex gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="mono text-xs px-3.5 py-2 rounded-lg border transition-colors"
                style={{
                  borderColor: filter === f ? "var(--accent)" : "var(--border)",
                  color: filter === f ? "var(--accent)" : "var(--text-muted)",
                  background: filter === f ? "var(--accent-soft)" : "transparent",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-sm mono" style={{ color: "var(--text-faint)" }}>
            no results — try a different search term.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-5">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: (i % 2) * 0.1 }}
                className="rounded-xl border overflow-hidden flex flex-col transition-transform hover:-translate-y-1 group"
                style={{ borderColor: "var(--border)", background: "var(--surface)" }}
              >
                <div
                  className="px-5 py-4 border-b flex items-start justify-between"
                  style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}
                >
                  <div>
                    <div className="mono text-[11px] mb-1" style={{ color: "var(--accent)" }}>{p.code}</div>
                    <h3 className="text-base font-bold leading-tight">{p.name}</h3>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>{p.tagline}</p>
                  </div>
                  <span
                    className="mono text-[10.5px] px-2 py-1 rounded-full shrink-0"
                    style={{
                      background: p.status === "Live" ? "var(--accent-2-soft)" : "var(--accent-soft)",
                      color: p.status === "Live" ? "var(--accent-2)" : "var(--accent)",
                    }}
                  >
                    {p.status === "Live" ? "● Live" : "● Research"}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "var(--text-muted)" }}>
                    {p.summary}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="mono text-[10.5px] px-2 py-0.5 rounded-md border"
                        style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
                      >
                        {t}
                      </span>
                    ))}
                    {p.tech.length > 4 && (
                      <span className="mono text-[10.5px] px-2 py-0.5" style={{ color: "var(--text-faint)" }}>
                        +{p.tech.length - 4}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setActive(p)}
                      className="mono text-xs font-semibold flex items-center gap-1"
                      style={{ color: "var(--accent)" }}
                    >
                      Case Study <ArrowUpRight size={13} />
                    </button>
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noreferrer" aria-label={`${p.name} live demo`} style={{ color: "var(--text-faint)" }}>
                        <ExternalLink size={15} />
                      </a>
                    )}
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noreferrer" aria-label={`${p.name} GitHub`} style={{ color: "var(--text-faint)" }}>
                        <GithubIcon size={15} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}

export default Projects;
