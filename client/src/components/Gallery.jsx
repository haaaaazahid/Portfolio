import { useState } from "react";
import { Camera } from "lucide-react";
import { api } from "../services/api";
import useApi from "../hooks/useApi";
import { Loading, Reveal } from "./ui";
import Lightbox from "./Lightbox";

// Shown until photos are uploaded from /admin/gallery
const Slots = () => <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">{[0, 1, 2, 3, 4, 5].map((i) => <Reveal key={i} d={i * 0.05}><div className="grid aspect-[4/5] place-items-center border border-dashed text-[13px]" style={{ borderColor: "var(--line)", color: "var(--mut)" }}><span className="grid justify-items-center gap-2"><Camera size={22} aria-hidden="true" />Photo slot</span></div></Reveal>)}</div>;

export default function Gallery() {
  const { data, loading, error } = useApi(() => api.gallery.list(), []); const [cat, setCat] = useState("All"); const [open, setOpen] = useState(null);
  if (loading) return <Loading />;
  if (error) return <span role="alert" className="note">{error}</span>;
  if (!data?.length) return <><Slots /><p className="note mt-4">Photos uploaded in the admin appear here.</p></>;
  const cats = ["All", ...new Set(data.map((g) => g.category).filter(Boolean))]; const list = data.filter((g) => cat === "All" || g.category === cat);
  return <>
    <div className="mb-5" role="group" aria-label="Filter photos">{cats.map((c) => <button key={c} className="tag" aria-pressed={cat === c} onClick={() => setCat(c)} style={cat === c ? { background: "var(--acc)", color: "#fff", borderColor: "var(--acc)" } : undefined}>{c}</button>)}</div>
    <div className="columns-2 gap-3 md:columns-3 xl:columns-4">{list.map((g, i) => <Reveal key={g._id} d={(i % 4) * 0.05}><button onClick={() => setOpen({ src: g.src, alt: g.alt || g.caption || g.category, caption: g.caption })} aria-label={`Open ${g.caption || g.category}`} className="group mb-3 block w-full break-inside-avoid overflow-hidden"><img loading="lazy" src={g.src} alt={g.alt || g.caption || g.category} className="w-full transition-transform duration-700 ease-out group-hover:scale-105" /></button></Reveal>)}</div>
    <Lightbox item={open} onClose={() => setOpen(null)} />
  </>;
}
