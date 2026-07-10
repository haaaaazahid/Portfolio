import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { stats } from "../data/content";
import { useCountUp } from "../hooks/useCountUp";

function StatItem({ value, suffix, label, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const count = useCountUp(value, { start: inView, duration: 1200 + index * 100 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="rounded-xl border px-4 py-6 text-center"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      <div className="mono text-3xl sm:text-4xl font-bold" style={{ color: "var(--accent)" }}>
        {count}
        {suffix}
      </div>
      <div className="text-xs sm:text-[13px] mt-2" style={{ color: "var(--text-muted)" }}>
        {label}
      </div>
    </motion.div>
  );
}

function Stats() {
  return (
    <section className="px-6 py-4">
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
        {stats.map((s, i) => (
          <StatItem key={s.label} {...s} index={i} />
        ))}
      </div>
    </section>
  );
}

export default Stats;
