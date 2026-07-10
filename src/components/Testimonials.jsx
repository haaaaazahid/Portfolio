import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { testimonials } from "../data/content";

function Testimonials() {
  return (
    <section className="px-6 py-24 sm:py-28">
      <div className="max-w-4xl mx-auto">
        <SectionHeading path="testimonials" title="What People" accent="Say" align="center" />

        <div className="grid sm:grid-cols-2 gap-5 mt-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="rounded-xl border p-6"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
            >
              <Quote size={20} style={{ color: "var(--accent)" }} className="mb-3" />
              <p className="text-sm leading-relaxed italic mb-5" style={{ color: "var(--text-muted)" }}>
                "{t.quote}"
              </p>
              <div className="text-sm font-semibold">{t.name}</div>
              <div className="mono text-[11px]" style={{ color: "var(--text-faint)" }}>{t.role}</div>
            </motion.div>
          ))}
        </div>
        <p className="mono text-xs text-center mt-6" style={{ color: "var(--text-faint)" }}>

        </p>
      </div>
    </section>
  );
}

export default Testimonials;
