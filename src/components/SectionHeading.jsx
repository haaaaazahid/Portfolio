import { motion } from "framer-motion";

function SectionHeading({ path, title, accent, subtitle, align = "left" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={align === "center" ? "text-center flex flex-col items-center" : ""}
    >
      <div
        className="mono text-xs px-2.5 py-1 rounded border inline-flex items-center gap-1.5 mb-4"
        style={{ borderColor: "var(--border)", color: "var(--text-faint)" }}
      >
        <span style={{ color: "var(--accent-2)" }}>#</span> {path}
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2 text-balance">
        {title} <span style={{ color: "var(--accent)" }}>{accent}</span>
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-[15px] max-w-lg" style={{ color: "var(--text-muted)" }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

export default SectionHeading;
