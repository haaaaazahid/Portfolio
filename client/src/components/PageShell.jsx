import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import { Words, Reveal } from "./ui";
import { COACH_LINKS, DEV_LINKS } from "./links";

// Shared frame for inner pages: section sub-navigation, animated title, lead text.
export default function PageShell({ world, title, kicker, lead, desc, children }) {
  const links = world === "coach" ? COACH_LINKS : world === "dev" ? DEV_LINKS : null;
  return <div className="wrap pb-20 pt-32 sm:pt-36">
    <Helmet><title>{title}</title>{(desc || lead) && <meta name="description" content={(desc || lead).slice(0, 160)} />}</Helmet>
    {links && <nav aria-label={world === "coach" ? "Coach sections" : "Developer sections"} className="-mx-1 mb-8 flex gap-1 overflow-x-auto pb-2">
      {links.map(([to, l, end]) => <NavLink key={to} to={to} end={end} className={({ isActive }) => `shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-bold transition-colors ${isActive ? "" : "opacity-70 hover:opacity-100"}`}
        style={({ isActive }) => ({ borderColor: isActive ? "var(--acc)" : "var(--line)", background: isActive ? "var(--acc)" : "transparent", color: isActive ? "var(--on-acc)" : "inherit" })}>{l}</NavLink>)}</nav>}
    {kicker && <p className="mb-3 text-sm font-bold uppercase tracking-[.2em]" style={{ color: "var(--acc)" }}>{kicker}</p>}
    <Words text={title} className="h-hero" />
    {lead && <Reveal d={0.4}><p className="lead mt-6">{lead}</p></Reveal>}
    <div className="mt-10">{children}</div>
  </div>;
}
export const Section = ({ title, children }) => <section className="sec"><h2 className="h-sec">{title}</h2>{children}</section>;
