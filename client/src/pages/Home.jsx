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
  const pr = useApi(() => api.projects.list(), []); const feat = (pr.data || []).filter((x) => x.featured).slice(0, 2);
  const rm = useReducedMotion(); const wide = useMedia("(min-width: 768px)");
  const grow = (i) => (rm || !wide || !hover ? 1 : hover === i ? 1.5 : 0.7);
  const doors = [
    { i: 1, to: "/coach", cls: "bg-coal text-chalk", h: "The Coach", d: p?.coachIntro, go: "Enter the coach world", bd: "border-ember", hc: "font-cond font-black uppercase" },
    { i: 2, to: "/developer", cls: "bg-paper text-ink", h: "The Developer", d: p?.devIntro, go: "Enter the developer world", bd: "border-signal", hc: "font-serif italic" },
  ];
  return (
    <div>
      <Helmet><meta name="description" content="Coach and full-stack developer. Two worlds, one identity." /></Helmet>
      <div className="flex min-h-[100svh] flex-col">
        <div className="bg-coal px-[22px] pb-6 pt-[92px] text-chalk md:px-8 md:pb-8 md:pt-[104px]">
          <h1 className="font-cond text-[clamp(34px,7vw,96px)] font-black uppercase leading-[.92]">MOHD ZAHID SHAIKH</h1>
          <p className="mt-2 text-[15px] opacity-80">{p?.tagline || "Two worlds. One identity."} · Mumbai, India</p></div>
        <div className="flex flex-1 flex-col md:flex-row">
        {doors.map((x) => (
          <motion.div key={x.i} animate={{ flexGrow: grow(x.i) }} transition={{ duration: 0.7, ease }} style={{ flexBasis: 0 }} className={`${x.cls} min-w-0 flex-none md:flex-auto`}
            onMouseEnter={() => setHover(x.i)} onMouseLeave={() => setHover(0)} onFocus={() => setHover(x.i)} onBlur={() => setHover(0)}>
            <Link to={x.to} className="flex min-h-[50svh] h-full flex-col justify-end px-5 pb-9 pt-10 sm:px-8 md:pb-12 2xl:px-14 2xl:pb-16">
              <h2 className={`${x.hc} text-[clamp(48px,8vw,170px)] leading-[.85]`}>{x.h.split(" ")[0]}<br />{x.h.split(" ")[1]}</h2>
              <p className="mt-4 max-w-[30ch]">{x.d}</p>
              <span className={`mt-5 self-start border-b-2 pb-[3px] font-bold ${x.bd}`}>{x.go}</span>
            </Link>
          </motion.div>
        ))}
        </div>
      </div>
      <div className="wrap sec">
        <Reveal><p className="max-w-[24ch] font-serif text-[clamp(28px,4vw,48px)] leading-[1.15]">{p?.bio}</p></Reveal>
        <div className="mt-6"><Magnetic><Link to="/contact" className="btn">Get in touch</Link></Magnetic></div>
      </div>
      {feat.length > 0 && <div className="wrap sec"><h2 className="h-sec">Featured work</h2><div className="grid gap-6 md:grid-cols-2 2xl:gap-10">{feat.map((x, i) => <ProjectCard key={x._id} p={x} i={i} />)}</div>
        <Link to="/projects" className="mt-6 inline-block font-bold underline">All projects</Link></div>}
    </div>
  );
}
