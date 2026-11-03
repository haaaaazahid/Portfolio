import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { ArrowUpRight, Github, FileText } from "lucide-react";
import { api } from "../services/api";
import useApi from "../hooks/useApi";
import { Words, Reveal, Loading } from "../components/ui";
import { ZoomImg } from "../components/ZoomImg";
import MediaGrid from "../components/MediaGrid";
import Video from "../components/Video";
import { shownStatus } from "../lib/text";

const TEXT = [["overview", "Overview"], ["problem", "Problem"], ["solution", "Solution"], ["contribution", "My contribution"], ["architecture", "Architecture"], ["frontend", "Frontend"], ["backend", "Backend"], ["database", "Database"],
  ["authentication", "Authentication"], ["integrations", "APIs and integrations"], ["challenges", "Challenges"], ["decisions", "Technical decisions"], ["outcome", "Outcome"], ["future", "What comes next"]];
const Row = ({ label, children }) => <Reveal><div className="grid gap-3 border-t py-8 md:grid-cols-[220px_1fr] md:gap-10" style={{ borderColor: "var(--line)" }}><h2 className="font-cond text-xl font-extrabold uppercase tracking-wider" style={{ color: "var(--acc)" }}>{label}</h2><div className="max-w-[68ch]">{children}</div></div></Reveal>;

// Full case study. Every field is optional: anything left empty in the admin simply does not appear.
export default function ProjectCase({ slug: fixed }) {
  const { slug: param } = useParams(); const slug = fixed || param;
  const { data: p, loading, error } = useApi(() => api.projects.get(slug), [slug]);
  const prof = useApi(() => (slug === "zhub" ? api.profile.get() : Promise.resolve(null)), [slug]);
  const back = p?.category === "Research" ? ["/journey", "Journey"] : ["/developer/projects", "All projects"];
  if (loading) return <div className="wrap pt-40"><Loading /></div>;
  if (error || !p) return <div className="wrap pt-40"><span role="alert" className="note">{error || "Project not found."}</span> <Link to="/developer/projects" className="font-bold underline">All projects</Link></div>;
  const status = shownStatus(p.status); const z = prof.data?.zhub;
  const extra = slug === "zhub" && !p.overview ? [["Vision", z?.vision], ["Mission", z?.mission]].filter(([, t]) => t) : [];
  return <div className="wrap pb-20 pt-32 sm:pt-36">
    <Helmet><title>{p.title}</title>{p.description && <meta name="description" content={p.description.slice(0, 160)} />}</Helmet>
    <Link to={back[0]} className="text-sm font-bold underline">{back[1]}</Link>
    <p className="mb-3 mt-6 text-sm font-bold uppercase tracking-[.2em]" style={{ color: "var(--acc)" }}>{[p.category, status].filter(Boolean).join(" · ")}</p>
    <Words text={p.title} className="h-hero" />
    {p.description && <Reveal d={0.4}><p className="lead mt-6">{p.description}</p></Reveal>}
    <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 font-bold">
      {p.liveUrl && <a className="btn" href={p.liveUrl} target="_blank" rel="noopener noreferrer">Live demo <ArrowUpRight size={16} /></a>}
      {p.githubUrl && <a className="inline-flex items-center gap-1 self-center underline" href={p.githubUrl} target="_blank" rel="noopener noreferrer"><Github size={16} /> GitHub</a>}
      {p.docsUrl && <a className="inline-flex items-center gap-1 self-center underline" href={p.docsUrl} target="_blank" rel="noopener noreferrer"><FileText size={16} /> Documentation</a>}</div>
    {p.cover && <Reveal><ZoomImg src={p.cover} alt={`${p.title} cover`} className="mt-10 aspect-[16/9] w-full border" /><p className="mt-2 text-sm" style={{ color: "var(--mut)" }}>Click the image to see it in full.</p></Reveal>}
    <div className="mt-12">
      {p.tags?.length > 0 && <Row label="Technology stack">{p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</Row>}
      {TEXT.map(([k, l]) => p[k] ? <Row key={k} label={l}><p className="whitespace-pre-line">{p[k]}</p></Row> : null)}
      {extra.map(([l, t]) => <Row key={l} label={l}><p className="whitespace-pre-line">{t}</p></Row>)}
      {p.features?.length > 0 && <Row label="Main features"><ul className="m-0 grid list-disc gap-1 pl-5">{p.features.map((f) => <li key={f}>{f}</li>)}</ul></Row>}
      {p.media?.some((m) => m.url) && <Row label="Screenshots"><div className="max-w-none"><MediaGrid items={p.media} /></div></Row>}
      {p.videoUrl && <Row label="Video"><Video url={p.videoUrl} title={`${p.title} video`} /></Row>}
    </div>
  </div>;
}
