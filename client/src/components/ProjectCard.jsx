import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "./ui";
import { CropImg } from "./ZoomImg";
import { shownStatus } from "../lib/text";

export default function ProjectCard({ p, i = 0 }) {
  const rm = useReducedMotion(); const to = `/developer/projects/${p.slug || p._id}`; const status = shownStatus(p.status);
  return (
    <Reveal d={(i % 2) * 0.08}>
      <motion.article whileHover={rm ? undefined : { y: -6 }} transition={{ duration: 0.3 }} className="group flex h-full flex-col border" style={{ borderColor: "var(--line)", background: "var(--card)" }}>
        <Link to={to} aria-label={`${p.title} case study`} className="block aspect-[4/3] overflow-hidden" style={{ borderBottom: "1px solid var(--line)" }}>
          {p.cover ? <CropImg src={p.cover} alt={`${p.title} cover`} />
            : <div className="grid h-full place-items-center font-serif text-7xl italic transition-transform duration-700 group-hover:scale-110" style={{ color: "var(--acc)" }} aria-hidden="true">{p.title[0]}</div>}
        </Link>
        <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
          <div className="flex items-baseline justify-between gap-3"><h3 className="font-serif text-3xl leading-none sm:text-4xl"><Link to={to} className="hover:underline">{p.title}</Link></h3>{status && <span className="shrink-0 text-xs font-bold" style={{ color: "var(--acc)" }}>{status}</span>}</div>
          <p className="text-[13px] font-bold uppercase tracking-widest" style={{ color: "var(--mut)" }}>{p.category}</p>
          {p.description && <p style={{ color: "var(--mut)" }}>{p.description}</p>}
          <div>{(p.tags || []).map((t) => <span className="tag" key={t}>{t}</span>)}</div>
          <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-sm font-bold">
            <Link to={to} className="inline-flex items-center gap-1 underline">View case study <ArrowUpRight size={16} /></Link>
            {p.liveUrl && <a className="inline-flex items-center gap-1 hover:underline" href={p.liveUrl} target="_blank" rel="noopener noreferrer">Live <ArrowUpRight size={16} /></a>}
            {p.githubUrl && <a className="inline-flex items-center gap-1 hover:underline" href={p.githubUrl} target="_blank" rel="noopener noreferrer"><Github size={16} /> GitHub</a>}
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}
