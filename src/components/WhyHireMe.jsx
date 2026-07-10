import { motion } from "framer-motion";
import { Check } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { whyHireMe } from "../data/content";

function WhyHireMe() {
  return (
    <section className="px-6 py-24 sm:py-28" style={{ background: "var(--bg-soft)" }}>
      <div className="max-w-5xl mx-auto">
        <SectionHeading path="why-hire-me" title="Why Work" accent="With Me" align="center" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {whyHireMe.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              className="flex gap-3 rounded-xl border p-5"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: "var(--accent-2-soft)", color: "var(--accent-2)" }}
              >
                <Check size={14} />
              </div>
              <div>
                <h3 className="text-[15px] font-bold mb-1">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyHireMe;
