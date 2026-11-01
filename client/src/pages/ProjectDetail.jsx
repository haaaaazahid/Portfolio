import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { ArrowUpRight, Github } from "lucide-react";
import { api } from "../services/api";
import useApi from "../hooks/useApi";
import { Words, Reveal, Para, Loading } from "../components/ui";

export default function ProjectDetail() {
  const { id } = useParams(); const { data: p, loading, error } = useApi(() => api.projects.get(id), [id]);
  if (loading) return <div className="wrap pt-40"><Loading /></div>;
  if (error || !p) return <div className="wrap pt-40"><span role="alert" className="note">{error || "Project not found."}</span> <Link to="/projects" className="font-bold underline">All projects</Link></div>;
  return <div className="wrap pb-20 pt-40">
    <Helmet><title>{p.title}</title><meta name="description" content={p.description} /></Helmet>
    <Link to="/projects" className="text-sm font-bold underline">All projects</Link>
    <Words text={p.title} className="h-hero mt-4" />
    <Reveal d={0.4}><p className="lead mt-6">{p.description}</p>{p.status && <p className="mt-3 text-sm font-bold" style={{ color: "var(--acc)" }}>Status: {p.status}</p>}</Reveal>
    <Para src={p.cover} alt={`${p.title} cover`} label={`Cover image slot: ${p.title}`} />
    <section className="sec mt-16"><h2 className="h-sec">Stack</h2>{p.tags?.length ? p.tags.map((t) => <span className="tag" key={t}>{t}</span>) : <span className="note">Stack to be listed.</span>}
      {p.details && <p className="mt-8 max-w-[60ch] whitespace-pre-line">{p.details}</p>}
      <div className="mt-8 flex gap-6 font-bold">
        {p.liveUrl && <a className="inline-flex items-center gap-1 underline" href={p.liveUrl} target="_blank" rel="noopener noreferrer">Live site <ArrowUpRight size={16} /></a>}
        {p.githubUrl && <a className="inline-flex items-center gap-1 underline" href={p.githubUrl} target="_blank" rel="noopener noreferrer"><Github size={16} /> GitHub</a>}
        {!p.liveUrl && !p.githubUrl && <span className="note">Links to be added.</span>}</div></section>
  </div>;
}
