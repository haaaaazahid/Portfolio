import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import useApi from "../hooks/useApi";
import { Magnetic, Reveal } from "../components/ui";
import ProjectCard from "../components/ProjectCard";
import useMedia from "../hooks/useMedia";

const ease = [0.76, 0, 0.24, 1];
export default function Home() {
  const { data: p } = useApi(() => api.profile.get(), []);
  const [hover, setHover] = useState(0);
  const pr = useApi(() => api.projects.list(), []); const jm = useApi(() => api.milestones.list(), []); const feat = (pr.data || []).filter((x) => x.featured).slice(0, 2);
  const rm = useReducedMotion(); const wide = useMedia("(min-width: 768px)");
  const grow = (i) => (rm || !wide || !hover ? 1 : hover === i ? 1.5 : 0.7);
  const doors = [
    { i: 1, to: "/coach", st: { background: "var(--da-bg)", color: "var(--da-fg)" }, ac: "var(--da-acc)", h: "The Coach", d: p?.coachIntro, go: "Enter the coach world", hc: "font-cond font-black uppercase" },
    { i: 2, to: "/developer", st: { background: "var(--db-bg)", color: "var(--db-fg)" }, ac: "var(--db-acc)", h: "The Developer", d: p?.devIntro, go: "Enter the developer world", hc: "font-serif italic" },
  ];
  return (
    <div>
      <Helmet><meta name="description" content="Coach and full-stack developer. Two worlds, one identity." /></Helmet>
      <div className="relative flex min-vh flex-col md:flex-row">
        <div style={{ background: "var(--da-bg)", color: "var(--da-fg)" }} className="pointer-events-none z-[5] w-full px-[22px] pt-[90px] md:absolute md:left-1/2 md:top-[104px] md:w-[90%] md:-translate-x-1/2 md:!bg-transparent md:p-0 md:text-center md:!text-white md:mix-blend-difference">
          <b className="block font-cond text-[clamp(28px,5vw,64px)] font-black leading-[.95]">MOHD ZAHID SHAIKH</b>{p?.tagline || "Two worlds. One identity."}</div>
        {doors.map((x) => (
          <motion.div key={x.i} animate={{ flexGrow: grow(x.i) }} transition={{ duration: 0.7, ease }} style={{ flexBasis: 0, ...x.st }} className="min-w-0 flex-none md:flex-auto"
            onMouseEnter={() => setHover(x.i)} onMouseLeave={() => setHover(0)} onFocus={() => setHover(x.i)} onBlur={() => setHover(0)}>
            <Link to={x.to} className="flex min-vh-half h-full flex-col justify-end px-5 pb-9 pt-24 sm:px-8 md:pb-12 2xl:px-14 2xl:pb-16">
              <h2 className={`${x.hc} text-[clamp(54px,9vw,190px)] leading-[.85]`}>{x.h.split(" ")[0]}<br />{x.h.split(" ")[1]}</h2>
              <p className="mt-4 max-w-[30ch]">{x.d}</p>
              <span className="mt-5 self-start border-b-2 pb-[3px] font-bold" style={{ borderColor: x.ac }}>{x.go}</span>
            </Link>
          </motion.div>
        ))}
      </div>
      <div className="wrap sec">
        <Reveal><p className="max-w-[24ch] font-serif text-[clamp(28px,4vw,48px)] leading-[1.15]">{p?.bio}</p></Reveal>
        <div className="mt-6"><Magnetic><Link to="/contact" className="btn">Get in touch</Link></Magnetic></div>
      </div>
      {jm.data?.length > 0 && <div className="wrap sec"><h2 className="h-sec">The journey so far</h2>
        <ol className="m-0 grid list-none gap-0 border-t p-0 sm:grid-cols-2" style={{ borderColor: "var(--line)" }}>{jm.data.slice(0, 6).map((m, i) => <Reveal key={m._id} d={i * 0.05}><li className="border-b py-4 pr-4" style={{ borderColor: "var(--line)" }}>
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--acc)" }}>{[m.category, m.date].filter(Boolean).join(" · ")}</span><p className="text-lg font-bold">{m.title}</p></li></Reveal>)}</ol>
        <Link to="/journey" className="mt-6 inline-block font-bold underline">See the full journey</Link></div>}
      {feat.length > 0 && <div className="wrap sec"><h2 className="h-sec">Featured work</h2><div className="grid gap-6 md:grid-cols-2 2xl:gap-10">{feat.map((x, i) => <ProjectCard key={x._id} p={x} i={i} />)}</div>
        <Link to="/developer/projects" className="mt-6 inline-block font-bold underline">All projects</Link></div>}
      <div className="wrap sec"><h2 className="h-sec">Work with me</h2>
        <div className="grid gap-0 border-t sm:grid-cols-2 lg:grid-cols-4" style={{ borderColor: "var(--line)" }}>{[["Software development employment", "Software roles"], ["Freelance and technical collaboration", "Freelance and technical work"], ["Coaching", "Coaching"], ["Business and product collaboration", "Business and products"]].map(([t, l], i) => <Reveal key={t} d={i * 0.05}>
          <Link to={`/contact?topic=${encodeURIComponent(t)}`} className="block h-full border-b py-6 pr-5 transition-[padding] duration-300 hover:pl-3" style={{ borderColor: "var(--line)" }}><b className="text-lg">{l}</b><span className="mt-1 block text-sm underline">Start an enquiry</span></Link></Reveal>)}</div></div>
    </div>
  );
}
