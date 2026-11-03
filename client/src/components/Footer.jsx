import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import { api } from "../services/api";
import useApi from "../hooks/useApi";
import { FOOTER_LINKS } from "./links";
export default function Footer() {
  const { data: p } = useApi(() => api.profile.get(), []);
  const socials = (p?.socials || []).filter((x) => x.url);
  return <footer className="border-t" style={{ borderColor: "var(--line)" }}>
    <div className="wrap grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
      <div><b className="font-cond text-3xl font-black uppercase leading-none">MOHD ZAHID SHAIKH</b><p className="mt-2 max-w-[28ch] text-sm" style={{ color: "var(--mut)" }}>{p?.tagline || "Two worlds. One identity."}</p></div>
      <nav aria-label="Footer"><ul className="m-0 grid list-none gap-1.5 p-0 text-sm sm:grid-cols-2">{FOOTER_LINKS.map(([to, l]) => <li key={to}><Link className="hover:underline" to={to}>{l}</Link></li>)}</ul></nav>
      <div className="text-sm">{p?.email && <p><a className="font-bold underline" href={`mailto:${p.email}`}>{p.email}</a></p>}{p?.location && <p style={{ color: "var(--mut)" }}>{p.location}</p>}
        <div className="mt-3">{socials.map((x) => <a key={x.label} className="tag" href={x.url} target="_blank" rel="noopener noreferrer">{x.label}</a>)}</div></div>
    </div>
    <div className="wrap flex flex-wrap items-center justify-between gap-3 border-t py-5 text-xs" style={{ borderColor: "var(--line)", color: "var(--mut)" }}>
      <span>© {new Date().getFullYear()} MOHD ZAHID SHAIKH</span><Link to="/admin" className="inline-flex items-center gap-1 hover:underline"><Lock size={12} aria-hidden="true" />Admin</Link></div>
  </footer>;
}
