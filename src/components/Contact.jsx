const contacts = [
  {icon:"✉",label:"// email",val:"shaikhmohdzahid992@gmail.com",href:"mailto:shaikhmohdzahid992@gmail.com"},
  {icon:"💼",label:"// linkedin",val:"Mohd Zahid Shaikh",href:"https://www.linkedin.com/in/mohd-zahid-shaikh-378829317"},
  {icon:"📍",label:"// location",val:"Mumbai, Maharashtra",href:null},
  {icon:"🐙",label:"// github",val:"haaaaazahid",href:"https://github.com/haaaaazahid"},
];

function Contact() {
  return (
    <section id="contact" className="min-h-screen flex items-center px-6 pt-32 pb-20">
      <div className="max-w-2xl mx-auto w-full">
        <div className="inline-flex items-center gap-2 bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-5 tracking-widest uppercase">Get in Touch</div>
        <h2 className="text-4xl font-bold mb-2" style={{fontFamily:"'Space Grotesk',sans-serif"}}>
          Let's <span className="text-violet-500">Connect</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">Open to projects, collaborations, and opportunities.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contacts.map(({icon,label,val,href})=>{
            const inner=(
              <>
                <div className="w-11 h-11 rounded-xl bg-violet-100 dark:bg-violet-950 flex items-center justify-center text-lg flex-shrink-0">{icon}</div>
                <div>
                  <div className="text-xs text-slate-400 mb-1" style={{fontFamily:"'JetBrains Mono',monospace"}}>{label}</div>
                  <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">{val}</div>
                </div>
              </>
            );
            return href?(
              <a key={label} href={href} target="_blank" rel="noreferrer" className="flex items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-violet-500 rounded-2xl px-5 py-4 transition-all">
                {inner}
              </a>
            ):(
              <div key={label} className="flex items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4">
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default Contact;