import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import useApi from "../hooks/useApi";
import ProjectCard from "../components/ProjectCard";
import { Words, Reveal, Magnetic, Marquee, Loading } from "../components/ui";

export default function Developer() {
  const pr = useApi(() => api.projects.list(), []); const sk = useApi(() => api.skills.list(), []); const ed = useApi(() => api.education.list(), []);
  const groups = (sk.data || []).filter((s) => s.world === "developer").reduce((a, s) => ((a[s.category] ||= []).push(s), a), {});
  return <div>
    <Helmet><title>Developer</title><meta name="description" content="Full-stack developer building digital products with React and Node.js." /></Helmet>
    <div className="wrap pb-20 pt-40"><Words text="I build digital experiences and products." className="h-hero max-w-[14ch]" /><Reveal d={0.5}><p className="lead mt-6">Mumbai-based full-stack developer building React, Node.js and MySQL applications: civic-tech platforms, sports management systems and fitness websites.</p></Reveal></div>
    <Marquee items={["React", "Node.js", "JavaScript", "TypeScript", "Supabase", "MySQL", "Framer Motion"]} />
    <div className="wrap">
      <section className="sec"><h2 className="h-sec">Background</h2>{ed.loading ? <Loading /> : (ed.data || []).map((e) => <Reveal key={e._id}><p className="max-w-[60ch]">{e.degree}, {e.institution}.{e.end && ` Graduating ${e.end}.`}{e.grade && ` ${e.grade}.`} Interests: full-stack, frontend and backend development, databases and AI-assisted development.</p></Reveal>)}</section>
      <section className="sec"><h2 className="h-sec">Skills</h2>{sk.loading ? <Loading /> : Object.entries(groups).map(([k, v]) => <Reveal key={k}><p><b>{k}</b><br />{v.map((s) => <span className="tag" key={s._id}>{s.name}</span>)}</p></Reveal>)}</section>
      <section className="sec"><h2 className="h-sec">Selected projects</h2>
        {pr.loading ? <Loading /> : pr.error ? <span role="alert" className="note">{pr.error}</span> : !pr.data.length ? <span className="note">No published projects yet.</span>
          : <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">{pr.data.map((p, i) => <ProjectCard key={p._id} p={p} i={i} />)}</div>}</section>
      <section className="sec"><h2 className="h-sec">Beyond code. Building ideas.</h2><p className="mb-6">I’m the founder of Zhub, part of my developer work.</p><Magnetic><Link to="/zhub" className="btn">Read about Zhub</Link></Magnetic></section>
    </div>
  </div>;
}
