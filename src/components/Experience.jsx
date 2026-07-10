import { motion } from "framer-motion";
import { Award, GraduationCap, Briefcase } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { experience, education, certifications } from "../data/content";

function Timeline({ items }) {
  return (
    <div className="relative pl-8">
      <div className="absolute left-[7px] top-2 bottom-2 w-px" style={{ background: "var(--border)" }} />
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -14 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="relative mb-7 last:mb-0"
        >
          <div
            className="absolute -left-8 top-1 w-3.5 h-3.5 rounded-full border-2"
            style={{ background: "var(--bg)", borderColor: "var(--accent)" }}
          />
          <div className="mono text-[11px] mb-1" style={{ color: "var(--text-faint)" }}>{item.period}</div>
          <h4 className="text-[15px] font-bold mb-0.5">{item.role || item.degree}</h4>
          <div className="text-xs mb-1.5" style={{ color: "var(--accent-2)" }}>{item.org || item.school}</div>
          {item.desc && <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.desc}</p>}
          {item.detail && <p className="text-sm" style={{ color: "var(--text-muted)" }}>{item.detail}</p>}
        </motion.div>
      ))}
    </div>
  );
}

function Experience() {
  return (
    <section id="experience" className="px-6 py-24 sm:py-28" style={{ background: "var(--bg-soft)" }}>
      <div className="max-w-5xl mx-auto">
        <SectionHeading path="experience.jsx" title="Experience &" accent="Education" align="center" />

        <div className="grid md:grid-cols-2 gap-14 mt-14">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Briefcase size={16} style={{ color: "var(--accent)" }} />
              <h3 className="text-sm font-bold uppercase tracking-wide">Leadership & Roles</h3>
            </div>
            <Timeline items={experience} />

            <div className="flex items-center gap-2 mt-10 mb-4">
              <Award size={16} style={{ color: "var(--accent)" }} />
              <h3 className="text-sm font-bold uppercase tracking-wide">Certifications</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {certifications.map((c) => (
                <span
                  key={c.title}
                  className="mono text-[11px] px-3 py-1.5 rounded-full border"
                  style={{ borderColor: "var(--border)", color: "var(--text-muted)", background: "var(--surface)" }}
                >
                  {c.title}{c.note ? ` ${c.note}` : ""}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap size={16} style={{ color: "var(--accent)" }} />
              <h3 className="text-sm font-bold uppercase tracking-wide">Education</h3>
            </div>
            <Timeline items={education} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
