function About() {
  return (
    <section id="about" className="min-h-screen flex justify-center items-center px-6 py-20">
      <div className="max-w-5xl w-full grid md:grid-cols-[1fr_1.6fr] gap-16 items-start">

        <div>
          <div className="inline-flex items-center gap-2 bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-5 tracking-widest uppercase">
            About
          </div>
          <h2 className="text-4xl font-bold leading-tight mb-4" style={{fontFamily:"'Space Grotesk',sans-serif"}}>
            About<br /><span className="text-violet-500">Me</span>
          </h2>
          <div className="w-9 h-0.5 bg-violet-500 rounded mb-5" />
          <div className="flex flex-wrap gap-2 mb-6">
            {["NCC CSM","NSS","Full Stack","AI Dev"].map(t=>(
              <span key={t} className="text-xs bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 px-3 py-1 rounded-full font-semibold">{t}</span>
            ))}
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
            <div className="text-xs mb-3" style={{fontFamily:"'JetBrains Mono',monospace",color:"#7c3aed"}}>{`// core stack`}</div>
            <div className="flex flex-wrap gap-2">
              {["React","Node.js","MySQL","Firebase","Tailwind","TypeScript"].map(t=>(
                <span key={t} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 text-xs px-2.5 py-1 rounded-md" style={{fontFamily:"'JetBrains Mono',monospace"}}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div>
          <p className="text-slate-600 dark:text-slate-300 text-[15px] leading-relaxed mb-4">
            I build software with a focus on innovation, scalability, and real-world impact. From full-stack web applications to smart automation and sustainability projects, I enjoy transforming ideas into practical solutions.
          </p>
          <p className="text-slate-600 dark:text-slate-300 text-[15px] leading-relaxed mb-6">
            With a background in Computer Science and leadership experience through NCC and NSS, I bring technical skills, discipline, and a problem-solving mindset to every project.
          </p>
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
            <div className="flex gap-1.5 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
            </div>
            {[
              ["~$","whoami","Mohd Zahid Shaikh — Full Stack Developer"],
              ["~$","cat skills.txt","React, Node.js, MySQL, Firebase, IoT..."],
              ["~$","git log --oneline","3 live projects deployed ✓"],
            ].map(([p,c,o])=>(
              <div key={c} className="mb-1" style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"12px"}}>
                <span style={{color:"#4ade80"}}>{p} </span>
                <span style={{color:"#e2e8f0"}}>{c}</span>
                <div style={{color:"#94a3b8"}}>{o}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default About;