import { useState } from "react";
import { Camera } from "lucide-react";
import { api } from "../services/api";
import useApi from "../hooks/useApi";
import { Loading, Reveal } from "./ui";
import { ZoomImg } from "./ZoomImg";

// Shown until photos are uploaded from /admin/gallery
const Slots = () => <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">{[0, 1, 2, 3, 4, 5].map((i) => <Reveal key={i} d={i * 0.05}><div className="grid aspect-[4/5] place-items-center border border-dashed text-[13px]" style={{ borderColor: "var(--line)", color: "var(--mut)" }}><span className="grid justify-items-center gap-2"><Camera size={22} aria-hidden="true" />Photo slot</span></div></Reveal>)}</div>;

export default function Gallery() {
  const { data, loading, error } = useApi(() => api.gallery.list(), []); const [cat, setCat] = useState("All");
  if (loading) return <Loading />;
  if (error) return <span role="alert" className="note">{error}</span>;
  if (!data?.length) return <Slots />;
  const cats = ["All", ...new Set(data.map((g) => g.category).filter(Boolean))]; const list = data.filter((g) => cat === "All" || g.category === cat);
  return <>
    <div className="mb-5" role="group" aria-label="Filter photos">{cats.map((c) => <button key={c} className="tag" aria-pressed={cat === c} onClick={() => setCat(c)} style={cat === c ? { background: "var(--acc)", color: "var(--on-acc)", borderColor: "var(--acc)" } : undefined}>{c}</button>)}</div>
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">{list.map((g, i) => <Reveal key={g._id} d={(i % 4) * 0.05}><ZoomImg src={g.src} alt={g.alt || g.caption || g.category} caption={g.caption} className="aspect-[4/5] w-full" /></Reveal>)}</div>
    <p className="mt-4 text-sm" style={{ color: "var(--mut)" }}>Click any photo to see it in full.</p>
  </>;
}
