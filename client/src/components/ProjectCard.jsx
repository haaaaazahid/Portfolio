import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "./ui";

export default function ProjectCard({ p, i = 0 }) {
  const rm = useReducedMotion();
  return (
    <Reveal d={(i % 2) * 0.08}>
      <motion.article whileHover={rm ? undefined : { y: -6 }} transition={{ duration: 0.3 }} className="group flex h-full flex-col border" style={{ borderColor: "var(--line)", background: "var(--card)" }}>
        <div className="aspect-[4/3] overflow-hidden" style={{ borderBottom: "1px solid var(--line)" }}>
          {p.cover
            ? <img src={p.cover} alt={`${p.title} cover`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
            : <div className="grid h-full place-items-center font-serif text-7xl italic transition-transform duration-700 group-hover:scale-110" style={{ color: "var(--acc)" }} aria-hidden="true">{p.title[0]}</div>}
        </div>
        <div className="flex flex-1 flex-col gap-3 p-6">
          <div className="flex items-baseline justify-between gap-3"><h3 className="font-serif text-4xl leading-none"><Link to={`/projects/${p._id}`} className="hover:underline">{p.title}</Link></h3><span className="text-xs font-bold" style={{ color: "var(--acc)" }}>{p.status}</span></div>
          <p style={{ color: "var(--mut)" }}>{p.description}</p>
          <div>{(p.tags || []).map((t) => <span className="tag" key={t}>{t}</span>)}</div>
          {(p.liveUrl || p.githubUrl) && <div className="mt-auto flex gap-5 pt-2 text-sm font-bold">
            {p.liveUrl && <a className="inline-flex items-center gap-1 hover:underline" href={p.liveUrl} target="_blank" rel="noopener noreferrer">Live site <ArrowUpRight size={16} /></a>}
            {p.githubUrl && <a className="inline-flex items-center gap-1 hover:underline" href={p.githubUrl} target="_blank" rel="noopener noreferrer"><Github size={16} /> GitHub</a>}
          </div>}
        </div>
      </motion.article>
    </Reveal>
  );
}
