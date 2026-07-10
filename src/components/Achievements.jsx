import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, X, ZoomIn } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { achievements } from "../data/content";
import nccFlag from "../assets/nccflag.jpg";
import nccGroup from "../assets/nccgroup.jpg";
import cert from "../assets/aavishkarcert.jpg";

const images = { nccFlag, nccGroup, cert };

const tagColors = {
  Leadership: { bg: "var(--accent-2-soft)", fg: "var(--accent-2)" },
  Award: { bg: "var(--accent-soft)", fg: "var(--accent)" },
  Research: { bg: "var(--accent-2-soft)", fg: "var(--accent-2)" },
  Sports: { bg: "var(--accent-soft)", fg: "var(--accent)" },
};

function Achievements() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="achievements" className="px-6 py-24 sm:py-28">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          path="achievements"
          title="My"
          accent="Achievements"
          subtitle="Leadership, research, and recognition beyond the code."
        />

        <div className="grid sm:grid-cols-2 gap-5 mt-12">
          {achievements.map((item, i) => {
            const colors = tagColors[item.tag] ?? tagColors.Award;
            const img = item.imgKey ? images[item.imgKey] : null;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: (i % 2) * 0.1 }}
                className="rounded-xl border overflow-hidden flex flex-col transition-transform hover:-translate-y-1"
                style={{ borderColor: "var(--border)", background: "var(--surface)" }}
              >
                {img ? (
                  <div className="relative overflow-hidden group">
                    <img
                      src={img}
                      alt={item.title}
                      onClick={() => setSelected(img)}
                      className="cursor-zoom-in w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      style={{ background: "rgba(5,6,10,0.35)" }}
                    >
                      <ZoomIn className="text-white" size={22} />
                    </div>
                    <span
                      className="absolute top-3 right-3 mono text-[10.5px] px-2.5 py-1 rounded-full"
                      style={{ background: colors.bg, color: colors.fg }}
                    >
                      {item.tag}
                    </span>
                  </div>
                ) : (
                  <div
                    className="h-52 flex items-center justify-center"
                    style={{ background: "var(--surface-2)" }}
                  >
                    <Trophy size={34} style={{ color: "var(--accent)" }} />
                    <span
                      className="absolute mt-[-70px] ml-[110px] mono text-[10.5px] px-2.5 py-1 rounded-full"
                      style={{ background: colors.bg, color: colors.fg }}
                    >
                      {item.tag}
                    </span>
                  </div>
                )}

                <div className="p-6 flex flex-col flex-1">
                  <div className="mono text-[11px] mb-1" style={{ color: "var(--text-faint)" }}>{item.subtitle}</div>
                  <h3 className="text-base font-bold mb-2 flex items-center gap-2">
                    <Trophy size={15} style={{ color: "var(--accent)" }} /> {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--text-muted)" }}>{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[95] flex justify-center items-center p-6 cursor-zoom-out backdrop-blur-sm"
            style={{ background: "rgba(5,6,10,0.85)" }}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 text-white"
              aria-label="Close image"
            >
              <X size={24} />
            </button>
            <img src={selected} className="max-h-[85vh] max-w-[90vw] rounded-xl shadow-2xl" alt="" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Achievements;
