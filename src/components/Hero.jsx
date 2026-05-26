import profile from "../assets/profile.jpg";

function Hero() {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center px-6">

      <div className="relative mb-8">
        <div className="absolute inset-[-8px] rounded-full border-[1.5px] border-dashed border-violet-400 animate-spin" style={{animationDuration:'12s'}} />
        <img src={profile} className="w-32 h-32 rounded-full object-cover border-2 border-violet-400" />
        <div className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white dark:border-slate-950" />
      </div>

      <div className="inline-flex items-center gap-2 bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-5 tracking-widest uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        Available for work
      </div>

      <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-none mb-4" style={{fontFamily:"'Space Grotesk',sans-serif"}}>
        Mohd <span className="text-violet-500">Zahid</span><br />Shaikh
      </h1>

      <div className="text-slate-500 dark:text-slate-400 flex items-center gap-3 text-sm mb-6">
        Full Stack Developer
        <span className="w-1 h-1 rounded-full bg-violet-400" />
        AI-Assisted Dev
        <span className="w-1 h-1 rounded-full bg-violet-400" />
        Mumbai, IN
      </div>

      <div className="bg-slate-900 dark:bg-slate-800 border border-slate-700 rounded-xl px-5 py-3 mb-8 text-left text-sm" style={{fontFamily:"'JetBrains Mono',monospace"}}>
        <span className="text-purple-400">const</span>
        <span className="text-white"> dev </span>
        <span className="text-slate-400">= </span>
        <span className="text-slate-300">{'{ role: '}</span>
        <span className="text-green-400">"Full Stack"</span>
        <span className="text-slate-300">{', status: '}</span>
        <span className="text-sky-400">open_to_work</span>
        <span className="text-slate-400">() {'}'}</span>
      </div>

      <div className="flex gap-3 mb-12">
        <a href="/projects" className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition flex items-center gap-2">
          ▶ View Projects
        </a>
        <a href="/contact" className="border border-violet-500 text-violet-500 hover:bg-violet-50 dark:hover:bg-violet-950 px-6 py-3 rounded-xl text-sm font-semibold transition">
          Contact Me
        </a>
      </div>

      <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
        {[["3+","Live Projects"],["12+","Technologies"],["2026","CS Graduate"]].map(([n,l])=>(
          <div key={l} className="bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-violet-500" style={{fontFamily:"'JetBrains Mono',monospace"}}>{n}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default Hero;