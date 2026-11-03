import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { api } from "../services/api";
import useApi from "../hooks/useApi";
import PageShell, { Section } from "../components/PageShell";
import Certificates from "../components/Certificates";
import { Reveal, Magnetic, Loading } from "../components/ui";
import { ZoomImg } from "../components/ZoomImg";

export default function Journey() {
  const pr = useApi(() => api.profile.get(), []); const ms = useApi(() => api.milestones.list(), []); const ed = useApi(() => api.education.list(), []);
  const ac = useApi(() => api.achievements.list(), []); const rs = useApi(() => api.projects.list(), []);
  const [cat, setCat] = useState("All"); const ref = useRef(null); const rm = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] }); const h = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });
  const cats = ["All", ...new Set((ms.data || []).map((m) => m.category).filter(Boolean))]; const items = (ms.data || []).filter((m) => cat === "All" || m.category === cat);
  const research = (rs.data || []).filter((p) => p.category === "Research");
  return <PageShell title="The journey." lead={pr.data?.bio} desc="Education, leadership, research, athletics and the milestones that connect both worlds.">
    {pr.data?.avatar && <div className="mb-10 max-w-[320px]"><ZoomImg src={pr.data.avatar} alt="Mohd Zahid Shaikh" className="aspect-square w-full border" /></div>}
    <Section title="Milestones">
      {ms.loading ? <Loading /> : !ms.data?.length ? <span className="note">Milestones will appear here once added.</span> : <>
        <div className="mb-8" role="group" aria-label="Filter milestones">{cats.map((c) => <button key={c} className="tag" aria-pressed={cat === c} onClick={() => setCat(c)} style={cat === c ? { background: "var(--acc)", color: "var(--on-acc)", borderColor: "var(--acc)" } : undefined}>{c}</button>)}</div>
        <div ref={ref} className="relative pl-8">
          <div className="absolute bottom-0 left-[7px] top-0 w-px" style={{ background: "var(--line)" }} />
          <motion.div className="absolute left-[6px] top-0 w-[3px] origin-top" style={{ background: "var(--acc)", height: "100%", scaleY: rm ? 1 : h }} />
          {items.map((m, i) => <Reveal key={m._id} d={Math.min(i, 5) * 0.04}><div className="relative pb-9">
            <span className="absolute -left-8 top-2 h-3.5 w-3.5 rounded-full border-2" style={{ background: "var(--bg)", borderColor: "var(--acc)" }} />
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--acc)" }}>{[m.category, m.date].filter(Boolean).join(" · ")}</p>
            <h3 className="text-xl font-bold sm:text-2xl">{m.title}</h3>{m.summary && <p className="mt-1 max-w-[60ch]" style={{ color: "var(--mut)" }}>{m.summary}</p>}
            {m.image && <ZoomImg src={m.image} alt={m.title} className="mt-3 aspect-[4/3] w-full max-w-[360px] border" />}</div></Reveal>)}
        </div></>}
    </Section>
    <Section title="Education">{ed.loading ? <Loading /> : (ed.data || []).map((e) => <Reveal key={e._id}><p className="mb-3"><b>{e.degree}</b><br />{e.institution}{e.end && ` · ${e.end}`}{e.grade && ` · ${e.grade}`}</p></Reveal>)}</Section>
    {research.length > 0 && <Section title="Research">{research.map((p) => <Reveal key={p._id}><p className="mb-3"><Link to={`/journey/research/${p.slug}`} className="text-xl font-bold underline">{p.title}</Link>{p.description && <><br /><span style={{ color: "var(--mut)" }}>{p.description}</span></>}</p></Reveal>)}</Section>}
    <Section title="Achievements">{ac.loading ? <Loading /> : (ac.data || []).map((a, i) => <Reveal key={a._id} d={i * 0.05}><p className="border-b py-3" style={{ borderColor: "var(--line)" }}><b>{a.title}</b>{a.detail && <> — <span style={{ color: "var(--mut)" }}>{a.detail}</span></>}</p></Reveal>)}</Section>
    <Section title="Certificates"><Certificates /></Section>
    <section className="sec"><Magnetic><Link to="/contact" className="btn">Get in touch</Link></Magnetic>{pr.data?.resumeUrl && <a className="ml-4 font-bold underline" href={pr.data.resumeUrl} target="_blank" rel="noopener noreferrer">View résumé</a>}</section>
  </PageShell>;
}
