import { Link, useParams } from "react-router-dom";
import { api } from "../services/api";
import useApi from "../hooks/useApi";
import PageShell, { Section } from "../components/PageShell";
import MediaGrid from "../components/MediaGrid";
import Video from "../components/Video";
import { Reveal, Loading } from "../components/ui";

// CMS-driven page: MCI, TWZ and athlete case studies. Unpublished or missing pages show a calm "being prepared" state.
export default function PageView({ slug: fixed }) {
  const { slug: param } = useParams(); const slug = fixed || param;
  const { data: p, loading, error } = useApi(() => api.pages.get(slug), [slug]);
  if (loading) return <div className="wrap pt-40"><Loading /></div>;
  if (error || !p) return <PageShell world="coach" title="Coming soon." lead="This page is being prepared."><Link to="/coach" className="font-bold underline">Back to Coach</Link></PageShell>;
  return <PageShell world="coach" title={p.title} kicker={p.kicker} lead={p.intro}>
    {p.facts?.length > 0 && <dl className="mb-6 grid gap-x-10 gap-y-4 sm:grid-cols-2">{p.facts.map((f, i) => <Reveal key={i} d={i * 0.04}><div className="border-t pt-3" style={{ borderColor: "var(--line)" }}><dt className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--acc)" }}>{f.label}</dt><dd className="m-0 text-lg">{f.value}</dd></div></Reveal>)}</dl>}
    {p.sections?.map((s, i) => <Section key={i} title={s.heading}><Reveal><p className="max-w-[68ch] whitespace-pre-line">{s.body}</p></Reveal></Section>)}
    {p.media?.some((m) => m.url) && <Section title="Photos"><MediaGrid items={p.media} /></Section>}
    {p.videos?.length > 0 && <Section title="Videos"><div className="grid gap-6 md:grid-cols-2">{p.videos.map((v) => <Video key={v} url={v} title={`${p.title} video`} />)}</div></Section>}
    <section className="sec"><Link to="/contact?topic=Coaching" className="btn">Enquire about coaching</Link></section>
  </PageShell>;
}
