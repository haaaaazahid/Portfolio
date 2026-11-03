import { useMemo, useState } from "react";
import { api } from "../services/api";
import useApi from "../hooks/useApi";
import PageShell from "../components/PageShell";
import Video from "../components/Video";
import { Loading } from "../components/ui";
import { ZoomImg } from "../components/ZoomImg";
import { STATUS_LABEL } from "../lib/text";

const List = ({ title, items }) => items?.length > 0 && <div><h4 className="mb-1 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--acc)" }}>{title}</h4><ul className="m-0 list-disc pl-5">{items.map((x) => <li key={x}>{x}</li>)}</ul></div>;

export default function MovementLibrary() {
  const { data, loading, error } = useApi(() => api.movements.list(), []); const [q, setQ] = useState(""); const [cat, setCat] = useState("All"); const [lvl, setLvl] = useState("");
  const cats = useMemo(() => ["All", ...new Set((data || []).map((m) => m.category))], [data]);
  const list = useMemo(() => (data || []).filter((m) => (cat === "All" || m.category === cat) && (!lvl || m.difficulty === lvl) && (!q || `${m.name} ${m.category} ${m.pattern}`.toLowerCase().includes(q.toLowerCase()))), [data, q, cat, lvl]);
  return <PageShell world="coach" title="Movement library." lead="Search the movements I teach and train. Open any entry for instructions, progressions, regressions and common mistakes where they have been added.">
    <div className="mb-5 grid gap-3 sm:grid-cols-[1fr_200px]">
      <div><label htmlFor="mq" className="sr-only">Search movements</label><input id="mq" type="search" className="field" placeholder="Search movements…" value={q} onChange={(e) => setQ(e.target.value)} /></div>
      <div><label htmlFor="ml" className="sr-only">Difficulty</label><select id="ml" className="field" value={lvl} onChange={(e) => setLvl(e.target.value)}><option value="">Any difficulty</option><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></div>
    </div>
    <div className="mb-6" role="group" aria-label="Filter by category">{cats.map((c) => <button key={c} className="tag" aria-pressed={cat === c} onClick={() => setCat(c)} style={cat === c ? { background: "var(--acc)", color: "var(--on-acc)", borderColor: "var(--acc)" } : undefined}>{c}</button>)}</div>
    {loading ? <Loading /> : error ? <span role="alert" className="note">{error}</span> : !list.length ? <span className="note">No movements match.</span> : <>
      <p role="status" className="mb-3 text-sm" style={{ color: "var(--mut)" }}>{list.length} {list.length === 1 ? "movement" : "movements"}</p>
      <ul className="m-0 grid list-none gap-2 p-0">{list.map((m) => { const rich = m.instructions || m.progressions?.length || m.regressions?.length || m.mistakes?.length || m.image || m.videoUrl || m.related?.length;
        return <li key={m._id} className="border" style={{ borderColor: "var(--line)", background: "var(--card)" }}>
          <details className="group"><summary className={`flex list-none flex-wrap items-baseline justify-between gap-x-4 gap-y-1 p-4 ${rich ? "cursor-pointer" : ""}`} onClick={(e) => !rich && e.preventDefault()}>
            <b className="text-lg">{m.name}</b><span className="text-sm" style={{ color: "var(--mut)" }}>{[m.category, m.difficulty, STATUS_LABEL[m.status]].filter(Boolean).join(" · ")}</span></summary>
            {rich && <div className="grid gap-5 border-t p-4 md:grid-cols-2" style={{ borderColor: "var(--line)" }}>
              <div className="grid gap-4">{m.pattern && <p><b>Targets:</b> {m.pattern}</p>}{m.instructions && <p className="whitespace-pre-line">{m.instructions}</p>}
                <List title="Progressions" items={m.progressions} /><List title="Regressions" items={m.regressions} /><List title="Common mistakes" items={m.mistakes} />
                {m.related?.length > 0 && <div>{m.related.map((r) => <span className="tag" key={r}>{r}</span>)}</div>}</div>
              <div className="grid content-start gap-4">{m.image && <ZoomImg src={m.image} alt={`${m.name} demonstration`} className="aspect-[4/3] w-full border" />}{m.videoUrl && <Video url={m.videoUrl} title={`${m.name} demonstration`} />}</div></div>}
          </details></li>; })}</ul></>}
  </PageShell>;
}
