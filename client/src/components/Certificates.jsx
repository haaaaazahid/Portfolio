import { useState } from "react";
import { Award, ArrowUpRight } from "lucide-react";
import { api } from "../services/api";
import useApi from "../hooks/useApi";
import { Loading, Reveal } from "./ui";
import Lightbox from "./Lightbox";

export default function Certificates({ world }) {
  const { data, loading, error } = useApi(() => api.certificates.list(), []); const [open, setOpen] = useState(null);
  if (loading) return <Loading />;
  if (error) return <span role="alert" className="note">{error}</span>;
  const list = (data || []).filter((c) => !world || c.world === world);
  if (!list.length) return <><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[0, 1, 2].map((i) => <Reveal key={i} d={i * 0.06}><div className="grid aspect-[4/3] place-items-center border border-dashed text-[13px]" style={{ borderColor: "var(--line)", color: "var(--mut)" }}><span className="grid justify-items-center gap-2"><Award size={22} aria-hidden="true" />Certificate slot</span></div></Reveal>)}</div><p className="note mt-4">Certificates added in the admin appear here.</p></>;
  return <><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{list.map((c, i) => <Reveal key={c._id} d={(i % 3) * 0.06}>
    <figure className="group h-full border" style={{ borderColor: "var(--line)", background: "var(--card)" }}>
      {c.image ? <button className="block aspect-[4/3] w-full overflow-hidden" aria-label={`View ${c.title}`} onClick={() => setOpen({ src: c.image, alt: c.title, caption: [c.title, c.issuer].filter(Boolean).join(" — ") })}><img src={c.image} alt={c.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /></button>
        : <div className="grid aspect-[4/3] place-items-center" style={{ color: "var(--acc)" }}><Award size={36} aria-hidden="true" /></div>}
      <figcaption className="p-4"><b className="block">{c.title}</b><span className="text-sm" style={{ color: "var(--mut)" }}>{[c.issuer, c.date].filter(Boolean).join(" · ")}</span>
        {c.credentialUrl && <a href={c.credentialUrl} target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center gap-1 text-sm font-bold underline">Verify <ArrowUpRight size={14} /></a>}</figcaption>
    </figure></Reveal>)}</div><Lightbox item={open} onClose={() => setOpen(null)} /></>;
}
