import { Link } from "react-router-dom";
import { api } from "../services/api";
import useApi from "../hooks/useApi";
import PageShell from "../components/PageShell";
import { Reveal, Loading } from "../components/ui";
export default function Athletes() {
  const { data, loading } = useApi(() => api.pages.list(), []); const list = (data || []).filter((p) => p.group === "athlete");
  return <PageShell world="coach" title="Athlete progress." lead="Starting points, goals, training approach and milestones. Published only with each athlete’s permission.">
    {loading ? <Loading /> : !list.length ? <span className="note">Athlete case studies will appear here as they are published.</span>
      : <div className="grid gap-5 md:grid-cols-2">{list.map((p, i) => <Reveal key={p._id} d={i * 0.06}><Link to={`/coach/athletes/${p.slug}`} className="block border p-6 transition-transform duration-300 hover:-translate-y-1" style={{ borderColor: "var(--line)", background: "var(--card)" }}>
        {p.kicker && <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--acc)" }}>{p.kicker}</p>}<h3 className="font-cond text-3xl font-black uppercase">{p.title}</h3>{p.intro && <p style={{ color: "var(--mut)" }}>{p.intro.slice(0, 160)}</p>}</Link></Reveal>)}</div>}
  </PageShell>;
}
