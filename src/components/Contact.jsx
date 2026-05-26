function Contact() {
  return (
    <section className="min-h-screen px-6 pt-32 pb-20">
      <div className="max-w-3xl mx-auto">

        <h2 className="text-5xl font-bold text-white mb-4">
          Let's <span className="text-violet-500">Connect</span>
        </h2>
        <p className="text-slate-400 mb-10 leading-relaxed">
          Have a project in mind, a question, or just want to say hi?
          Reach me directly through any of the options below.
        </p>

        <div className="flex flex-col gap-4">

          <a href="mailto:shaikhmohdzahid992@gmail.com"
            className="flex items-center gap-4 px-6 py-5 rounded-xl border border-slate-700 hover:border-violet-500 bg-slate-900 text-slate-300 hover:text-violet-400 transition-all duration-200">
            <span className="text-2xl">✉️</span>
            <div>
              <p className="text-xs text-slate-500 mb-0.5">Email</p>
              <p className="text-sm font-medium">shaikhmohdzahid992@gmail.com</p>
            </div>
          </a>

          <a href="https://www.linkedin.com/in/mohd-zahid-shaikh-378829317"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 px-6 py-5 rounded-xl border border-slate-700 hover:border-violet-500 bg-slate-900 text-slate-300 hover:text-violet-400 transition-all duration-200">
            <span className="text-2xl">💼</span>
            <div>
              <p className="text-xs text-slate-500 mb-0.5">LinkedIn</p>
              <p className="text-sm font-medium">Mohd Zahid Shaikh</p>
            </div>
          </a>

          <div className="flex items-center gap-4 px-6 py-5 rounded-xl border border-slate-800 bg-slate-900/50 text-slate-400">
            <span className="text-2xl">📍</span>
            <div>
              <p className="text-xs text-slate-500 mb-0.5">Location</p>
              <p className="text-sm font-medium">Mumbai, Maharashtra</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Contact;