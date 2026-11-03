import { Link } from "react-router-dom";
import { api } from "../services/api";
import useApi from "../hooks/useApi";
import ProjectCard from "../components/ProjectCard";
import PageShell, { Section } from "../components/PageShell";
import { Reveal, Magnetic, Marquee, Loading } from "../components/ui";

export default function Developer() {
  const pr = useApi(() => api.projects.list(), []); const ed = useApi(() => api.education.list(), []); const p = useApi(() => api.profile.get(), []);
  const shown = (pr.data || []).filter((x) => x.category !== "Research").slice(0, 4);
  return <PageShell world="dev" title="I build digital experiences and products." lead={p.data?.devIntro || "Software development, creative problem-solving and the process of turning ideas into functional digital products."} desc="Full-stack developer building web products with React and Node.js.">
    <div className="-mx-5 sm:-mx-8 lg:-mx-10"><Marquee items={["React", "Node.js", "JavaScript", "TypeScript", "Supabase", "MySQL", "Framer Motion"]} /></div>
    <Section title="Background">{ed.loading ? <Loading /> : (ed.data || []).map((e) => <Reveal key={e._id}><p className="max-w-[60ch]">{e.degree}, {e.institution}.{e.end && ` Graduating ${e.end}.`}{e.grade && ` ${e.grade}.`} Interests: full-stack, frontend and backend development, databases, product development and AI-assisted development.</p></Reveal>)}
      <Link to="/developer/skills" className="mt-4 inline-block font-bold underline">Technical skills and the projects behind them</Link></Section>
    <Section title="Selected projects">
      {pr.loading ? <Loading /> : pr.error ? <span role="alert" className="note">{pr.error}</span> : !shown.length ? <span className="note">No published projects yet.</span> : <div className="grid gap-6 md:grid-cols-2 2xl:gap-10">{shown.map((x, i) => <ProjectCard key={x._id} p={x} i={i} />)}</div>}
      <div className="mt-8"><Magnetic><Link to="/developer/projects" className="btn">Open the full project archive</Link></Magnetic></div></Section>
    <Section title="Beyond code. Building ideas."><p className="mb-6">I am the founder of Zhub, part of my developer work.</p><Magnetic><Link to="/developer/zhub" className="btn">Read about Zhub</Link></Magnetic></Section>
  </PageShell>;
}
