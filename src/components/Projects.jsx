const projects = [
  {title:"NAGRIK – Citizens Improving the City",desc:"AI-powered civic issue reporting platform where citizens report potholes, garbage, streetlight failures and track resolutions in real time.",tech:["React","Firebase","MySQL","Geolocation","Tailwind"],live:"https://nagrik-six.vercel.app/",status:"Live"},
  {title:"JCSAM Hub",desc:"AI-enhanced sports management for Mumbai junior colleges — digital registrations, event management, results tracking, and real-time admin dashboard.",tech:["React","TypeScript","Supabase","Framer Motion"],live:"https://jcsam-hub.vercel.app/",status:"Live"},
  {title:"Smart Rainwater Harvesting",desc:"Sensor-based automated rainwater harvesting system to reduce flooding, purify rainwater, and generate renewable electricity via micro-turbines across road and rail infrastructure.",tech:["IoT","Embedded C","Sensors","Microcontrollers","Renewable Energy"],live:null,status:"Research"},
];

function Projects() {
  return (
    <section id="projects" className="min-h-screen px-6 pt-32 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-5 tracking-widest uppercase">Work</div>
        <h2 className="text-4xl font-bold mb-12" style={{fontFamily:"'Space Grotesk',sans-serif"}}>
          Featured <span className="text-violet-500">Projects</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((p,i)=>(
            <div key={i} className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 hover:border-violet-500 hover:-translate-y-1 transition-all duration-200 flex flex-col ${i===2?'md:col-span-2':''}`}>
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-tight pr-3" style={{fontFamily:"'Space Grotesk',sans-serif"}}>{p.title}</h3>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${p.status==='Live'?'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400':'bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400'}`}>
                  {p.status==='Live'?'✓ Live':'Research'}
                </span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4 flex-1">{p.desc}</p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {p.tech.map(t=>(
                  <span key={t} className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-violet-600 dark:text-violet-400 text-xs px-2 py-0.5 rounded-md" style={{fontFamily:"'JetBrains Mono',monospace"}}>{t}</span>
                ))}
              </div>
              {p.live&&(
                <a href={p.live} target="_blank" rel="noreferrer" className="self-start inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition">
                  ↗ Live Demo
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Projects;