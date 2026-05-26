const skills = [
  {name:"HTML",icon:"🌐",level:95},{name:"CSS",icon:"🎨",level:90},
  {name:"JavaScript",icon:"⚡",level:88},{name:"React",icon:"⚛️",level:85},
  {name:"Node.js",icon:"🟢",level:80},{name:"Express",icon:"🚂",level:78},
  {name:"PHP",icon:"🐘",level:70},{name:"MySQL",icon:"🗄️",level:82},
  {name:"Git/GitHub",icon:"🐙",level:88},{name:"Tailwind",icon:"💨",level:90},
  {name:"REST API",icon:"🔌",level:83},{name:"AI/IoT",icon:"🤖",level:72},
];

function Skills() {
  return (
    <section id="skills" className="min-h-screen flex flex-col justify-center items-center px-6 py-20">
      <div className="inline-flex items-center gap-2 bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-5 tracking-widest uppercase">
        Expertise
      </div>
      <h2 className="text-4xl font-bold mb-12" style={{fontFamily:"'Space Grotesk',sans-serif"}}>
        Tech <span className="text-violet-500">Skills</span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl w-full">
        {skills.map(({name,icon,level})=>(
          <div key={name} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-center hover:border-violet-500 hover:-translate-y-1 transition-all duration-200 cursor-default group">
            <div className="text-2xl mb-2">{icon}</div>
            <div className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">{name}</div>
            <div className="h-1 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-violet-500 rounded-full transition-all duration-700 group-hover:bg-violet-400" style={{width:`${level}%`}} />
            </div>
            <div className="text-xs text-slate-400 mt-1.5" style={{fontFamily:"'JetBrains Mono',monospace"}}>{level}%</div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default Skills;