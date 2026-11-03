import { Reveal } from "./ui";
import { ZoomImg } from "./ZoomImg";
// Gallery of admin-uploaded media. Each tile shows the admin's crop; clicking opens the complete original.
export default function MediaGrid({ items = [], aspect = "4/3" }) {
  const list = items.filter((m) => m?.url);
  if (!list.length) return null;
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{list.map((m, i) => <Reveal key={i} d={(i % 3) * 0.06}>
    <figure className="m-0"><ZoomImg src={m.url} alt={m.alt || m.caption || ""} caption={m.caption} className="w-full border" style={{ aspectRatio: aspect }} />
      {(m.caption || m.kind) && <figcaption className="mt-2 text-sm" style={{ color: "var(--mut)" }}>{[m.kind && m.kind !== "gallery" ? m.kind[0].toUpperCase() + m.kind.slice(1) : "", m.caption].filter(Boolean).join(" · ")}</figcaption>}</figure></Reveal>)}</div>;
}
