import { api } from "../services/api";
import useApi from "../hooks/useApi";
import PageShell, { Section } from "../components/PageShell";
import { Reveal, Loading } from "../components/ui";
import { STATUS_LABEL } from "../lib/text";
import { Link } from "react-router-dom";

const PRINCIPLES = ["Progressive overload", "Consistency", "Movement quality", "Strength development", "Skill acquisition", "Mobility", "Flexibility", "Physical conditioning", "Individual progression", "Discipline"];
export default function Disciplines() {
  const mv = useApi(() => api.movements.list(), []); const sk = useApi(() => api.skills.list(), []);
  const groups = (mv.data || []).reduce((a, m) => ((a[m.category] ||= []).push(m), a), {}); const prog = (sk.data || []).filter((s) => s.world === "coach" && s.category === "Coaching and programming");
  const anyStatus = (mv.data || []).some((m) => m.status);
  return <PageShell world="coach" title="Disciplines." lead="The complete range of what I train and coach, organised by discipline.">
    {mv.loading ? <Loading /> : Object.entries(groups).map(([cat, items]) => <Section key={cat} title={cat}><Reveal><p className="mb-3 text-sm" style={{ color: "var(--mut)" }}>{items.length} items</p>
      <div>{items.map((m) => <span className="tag" key={m._id} title={STATUS_LABEL[m.status] || ""} style={m.status ? { borderColor: "var(--acc)" } : undefined}>{m.name}</span>)}</div></Reveal></Section>)}
    {anyStatus && <p className="mt-2 text-sm" style={{ color: "var(--mut)" }}>Outlined items have a note on how they relate to my practice. Hover or open the <Link to="/coach/movement-library" className="underline">movement library</Link> for details.</p>}
    {prog.length > 0 && <Section title="Coaching and programming"><Reveal><div>{prog.map((s) => <span className="tag" key={s._id}>{s.name}</span>)}</div></Reveal></Section>}
    <Section title="Coaching philosophy"><Reveal><p className="mb-4 max-w-[60ch]">The principles my coaching is built on.</p><div className="grid gap-0 border-t sm:grid-cols-2 lg:grid-cols-3" style={{ borderColor: "var(--line)" }}>
      {PRINCIPLES.map((p, i) => <div key={p} className="flex items-baseline gap-3 border-b py-4 pr-4 transition-[padding] duration-300 hover:pl-3" style={{ borderColor: "var(--line)" }}><span className="font-cond text-sm font-bold" style={{ color: "var(--acc)" }}>{String(i + 1).padStart(2, "0")}</span><span className="text-lg font-bold">{p}</span></div>)}</div></Reveal></Section>
  </PageShell>;
}
