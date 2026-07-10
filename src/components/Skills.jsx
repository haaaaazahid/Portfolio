import { motion } from "framer-motion";
import {
  Layout, Server, Database, Cloud, ShieldCheck, Wrench, Users,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import { skillCategories } from "../data/content";

const icons = {
  frontend: Layout,
  backend: Server,
  database: Database,
  cloud: Cloud,
  auth: ShieldCheck,
  tools: Wrench,
  soft: Users,
};

function Skills() {
  return (
    <section id="skills" className="px-6 py-24 sm:py-28" style={{ background: "var(--bg-soft)" }}>
      <div className="max-w-5xl mx-auto">
        <SectionHeading path="skills.json" title="Tech" accent="Skills" align="center" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {skillCategories.map((cat, i) => {
            const Icon = icons[cat.key];
            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
                className="rounded-xl border p-5 transition-transform hover:-translate-y-1"
                style={{ borderColor: "var(--border)", background: "var(--surface)" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
                  >
                    <Icon size={17} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{cat.label}</div>
                    <div className="mono text-[10.5px]" style={{ color: "var(--text-faint)" }}>{cat.path}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((s) => (
                    <span
                      key={s}
                      className="mono text-[11px] px-2.5 py-1 rounded-md border"
                      style={{ borderColor: "var(--border)", color: "var(--text-muted)", background: "var(--surface-2)" }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Skills;
