import { Link } from "react-router-dom";
import { api } from "../services/api";
import useApi from "../hooks/useApi";
import PageShell, { Section } from "../components/PageShell";
import { Reveal, Loading } from "../components/ui";

// Skills are evidence-based: each one lists the projects whose stack includes it. No percentages, no invented years.
export default function DevSkills() {
  const sk = useApi(() => api.skills.list(), []); const pr = useApi(() => api.projects.list(), []);
  const groups = (sk.data || []).filter((s) => s.world === "developer").reduce((a, s) => ((a[s.category] ||= []).push(s), a), {});
  const used = (name) => (pr.data || []).filter((p) => (p.tags || []).some((t) => t.toLowerCase() === name.toLowerCase()));
  return <PageShell world="dev" title="Technical skills." lead="What I work with, grouped by area, with the projects that use each technology.">
    {sk.loading ? <Loading /> : Object.entries(groups).map(([cat, list]) => <Section key={cat} title={cat}><div className="grid gap-x-10 gap-y-1 md:grid-cols-2">
      {list.map((s, i) => { const u = used(s.name); return <Reveal key={s._id} d={Math.min(i, 6) * 0.04}><div className="flex flex-wrap items-baseline justify-between gap-x-4 border-b py-3" style={{ borderColor: "var(--line)" }}>
        <b>{s.name}</b><span className="text-sm" style={{ color: "var(--mut)" }}>{s.status}</span>
        {u.length > 0 && <p className="w-full text-sm" style={{ color: "var(--mut)" }}>Used in {u.map((p, j) => <span key={p._id}>{j > 0 && ", "}<Link className="underline" to={`/developer/projects/${p.slug}`}>{p.title}</Link></span>)}</p>}</div></Reveal>; })}</div></Section>)}
  </PageShell>;
}
