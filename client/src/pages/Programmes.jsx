import { Link } from "react-router-dom";
import { api } from "../services/api";
import useApi from "../hooks/useApi";
import PageShell, { Section } from "../components/PageShell";
import { Reveal, Loading } from "../components/ui";
import { CropImg } from "../components/ZoomImg";

const Card = ({ p, i }) => <Reveal d={i * 0.06}><article className="group grid h-full border md:grid-cols-[1fr_1.4fr]" style={{ borderColor: "var(--line)", background: "var(--card)" }}>
  {p.image && <div className="aspect-[4/3] md:aspect-auto"><CropImg src={p.image} alt="" /></div>}
  <div className={`p-6 ${p.image ? "" : "md:col-span-2"}`}><p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--acc)" }}>{[p.level, p.status === "Past" ? "Past programme" : ""].filter(Boolean).join(" · ")}</p>
    <h3 className="font-cond text-3xl font-black uppercase">{p.title}</h3>{p.summary && <p className="mt-1">{p.summary}</p>}{p.description && <p className="mt-2 whitespace-pre-line" style={{ color: "var(--mut)" }}>{p.description}</p>}
    <dl className="mt-3 grid gap-1 text-sm">{[["For", p.audience], ["Duration", p.duration], ["Schedule", p.schedule], ["Price", p.price]].filter(([, v]) => v).map(([k, v]) => <div key={k}><dt className="inline font-bold">{k}: </dt><dd className="inline">{v}</dd></div>)}</dl>
    {p.status === "Active" && <Link to={`/contact?topic=Coaching`} className="btn mt-4">Enquire</Link>}</div></article></Reveal>;

export default function Programmes() {
  const { data, loading, error } = useApi(() => api.programmes.list(), []); const act = (data || []).filter((p) => p.status === "Active"); const past = (data || []).filter((p) => p.status === "Past");
  return <PageShell world="coach" title="Programmes." lead="Coaching programmes I offer or have run.">
    {loading ? <Loading /> : error ? <span role="alert" className="note">{error}</span> : !data.length ? <><p className="max-w-[56ch]">No programmes are listed right now. For current coaching availability, send an enquiry.</p><Link to="/contact?topic=Coaching" className="btn mt-4">Enquire about coaching</Link></> : <>
      {act.length > 0 && <div className="grid gap-5">{act.map((p, i) => <Card key={p._id} p={p} i={i} />)}</div>}
      {past.length > 0 && <Section title="Past programmes"><div className="grid gap-5">{past.map((p, i) => <Card key={p._id} p={p} i={i} />)}</div></Section>}</>}
  </PageShell>;
}
