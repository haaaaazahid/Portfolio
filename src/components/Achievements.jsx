import { useState } from "react";
import nccFlag from "../assets/nccflag.jpg";
import nccGroup from "../assets/nccgroup.jpg";
import cert from "../assets/aavishkarcert.jpg";

const achievements = [
  {
    title: "Company Sergeant Major (CSM)",
    subtitle: "NCC — Senior Division",
    tag: "Leadership",
    tagColor: "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400",
    desc: "Highest student rank in the NCC unit. Led cadets in drills, camps, and national-level events.",
    img: nccFlag,
  },
  {
    title: "NCC Leadership & Medals",
    subtitle: "National Cadet Corps",
    tag: "Award",
    tagColor: "bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400",
    desc: "Recognised for outstanding discipline, teamwork, and performance across multiple NCC activities.",
    img: nccGroup,
  },
  {
    title: "Aavishkar Research Competition",
    subtitle: "University-Level Research Fest",
    tag: "Research",
    tagColor: "bg-violet-100 dark:bg-violet-950/50 text-violet-700 dark:text-violet-400",
    desc: "Presented Smart Rainwater Harvesting research at Aavishkar, competing against top university projects.",
    img: cert,
  },
];

function Achievements() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <section id="achievements" className="min-h-screen px-6 pt-32 py-20">
        <div className="max-w-5xl mx-auto">

          <div className="inline-flex items-center gap-2 bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-5 tracking-widest uppercase">
            Milestones
          </div>

          <h2 className="text-4xl font-bold mb-2" style={{fontFamily:"'Space Grotesk',sans-serif"}}>
            My <span className="text-violet-500">Achievements</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-12">
            Leadership, research, and recognition beyond the code.
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            {achievements.map((item, i) => (
              <div
                key={i}
                className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden hover:border-violet-500 hover:-translate-y-1 transition-all duration-200 flex flex-col ${i === 2 ? 'md:col-span-2' : ''}`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    onClick={() => setSelected(item.img)}
                    className="cursor-zoom-in w-full h-56 object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${item.tagColor}`}>
                      {item.tag}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="text-xs text-slate-400 mb-1" style={{fontFamily:"'JetBrains Mono',monospace"}}>
                    {item.subtitle}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2" style={{fontFamily:"'Space Grotesk',sans-serif"}}>
                    🏆 {item.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed flex-1">
                    {item.desc}
                  </p>
                  <button
                    onClick={() => setSelected(item.img)}
                    className="mt-4 self-start text-xs text-violet-500 hover:text-violet-400 font-semibold transition"
                    style={{fontFamily:"'JetBrains Mono',monospace"}}
                  >
                    view_certificate() →
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 bg-black/90 flex justify-center items-center z-50 cursor-zoom-out backdrop-blur-sm"
        >
          <img
            src={selected}
            className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </>
  );
}

export default Achievements;