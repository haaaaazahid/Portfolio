import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { profile } from "../data/content";

const terminalLines = [
  ["~$", "whoami", "Mohd Zahid Shaikh — Full Stack Developer, Mumbai"],
  ["~$", "cat education.txt", "B.Sc. Computer Science — Royal College (CGPI 6.95)"],
  ["~$", "git log --oneline -4", "4 production apps shipped · React + Node + MySQL"],
  ["~$", "echo $STATUS", "Open to full-time, freelance & internship roles"],
];

function About() {
  return (
    <section id="about" className="px-6 py-24 sm:py-28">
      <div className="max-w-5xl mx-auto grid md:grid-cols-[0.85fr_1.15fr] gap-14 items-start">
        <SectionHeading path="about-me" title="About" accent="Me" />

        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[15px] sm:text-base leading-relaxed mb-4"
            style={{ color: "var(--text-muted)" }}
          >
            I'm a full-stack developer based in Mumbai, building products where the frontend
            feels effortless and the backend actually holds up under real usage. My recent
            work spans civic-tech, sports management, and fitness platforms — each shipped
            end-to-end, from database schema to deployed UI.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-[15px] sm:text-base leading-relaxed mb-6"
            style={{ color: "var(--text-muted)" }}
          >
            I bring a Computer Science background together with leadership experience from the
            NCC and NSS — discipline and coordination skills that carry directly into how I run
            a project: clear scope, steady communication, and code I'm willing to put my name on.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="flex items-center gap-2 mb-6 flex-wrap"
          >
            <span className="mono text-[11px]" style={{ color: "var(--text-faint)" }}>languages:</span>
            {profile.languages.map((l) => (
              <span
                key={l}
                className="mono text-[11px] px-2.5 py-1 rounded-md border"
                style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
              >
                {l}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="rounded-xl border overflow-hidden"
            style={{ borderColor: "var(--border)", background: "var(--surface)" }}
          >
            <div
              className="flex items-center gap-1.5 px-4 py-2.5 border-b"
              style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--danger)" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--accent)" }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--accent-2)" }} />
              <span className="mono text-[11px] ml-2" style={{ color: "var(--text-faint)" }}>
                zahid@portfolio: ~
              </span>
            </div>
            <div className="p-4">
              {terminalLines.map(([p, c, o], i) => (
                <div key={i} className="mb-2.5 mono text-[12.5px] leading-relaxed">
                  <span style={{ color: "var(--accent-2)" }}>{p} </span>
                  <span style={{ color: "var(--text)" }}>{c}</span>
                  <div style={{ color: "var(--text-faint)" }}>{o}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
