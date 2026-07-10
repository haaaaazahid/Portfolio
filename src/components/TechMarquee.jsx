import { techMarquee } from "../data/content";

function TechMarquee() {
  const items = [...techMarquee, ...techMarquee];
  return (
    <div
      className="py-6 border-y overflow-hidden"
      style={{ borderColor: "var(--border)", background: "var(--surface)" }}
    >
      <div className="flex w-max animate-marquee">
        {items.map((t, i) => (
          <span
            key={i}
            className="mono text-sm px-6 whitespace-nowrap flex items-center gap-6"
            style={{ color: "var(--text-faint)" }}
          >
            {t}
            <span style={{ color: "var(--accent)" }}>/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default TechMarquee;
