import { motion } from "framer-motion";
import {
  Code2, Layers, Globe, LayoutGrid, Plug, Gauge,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import { services } from "../data/content";

const icons = [Code2, Layers, Globe, LayoutGrid, Plug, Gauge];

function Services() {
  return (
    <section className="px-6 py-24 sm:py-28">
      <div className="max-w-5xl mx-auto">
        <SectionHeading path="services" title="What I Can" accent="Build" align="center" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {services.map((s, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                className="rounded-xl border p-5 transition-colors hover:border-[var(--accent)]"
                style={{ borderColor: "var(--border)", background: "var(--surface)" }}
              >
                <Icon size={19} style={{ color: "var(--accent)" }} className="mb-3" />
                <h3 className="text-[15px] font-bold mb-1.5">{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Services;
