import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { api } from "../services/api";
import useApi from "../hooks/useApi";
import { Words, Reveal, Loading } from "../components/ui";

export default function Experience() {
  const ex = useApi(() => api.experience.list(), []); const ed = useApi(() => api.education.list(), []);
  const ref = useRef(null); const rm = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] }); const h = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });
  const items = [...(ex.data || []).map((e) => ({ id: e._id, t: e.role, o: e.org, d: [e.start, e.end].filter(Boolean).join(" – "), s: e.summary, h: e.highlights })),
    ...(ed.data || []).map((e) => ({ id: e._id, t: e.degree, o: e.institution, d: [e.start, e.end].filter(Boolean).join(" – "), s: e.grade }))];
  return <div className="wrap pb-20 pt-40">
    <Helmet><title>Experience</title><meta name="description" content="Coaching experience and education." /></Helmet>
    <Words text="Experience and education." className="h-hero mb-12" />
    {ex.loading || ed.loading ? <Loading /> : !items.length ? <span className="note">Nothing added yet.</span> :
      <div ref={ref} className="relative pl-8">
        <div className="absolute bottom-0 left-[7px] top-0 w-px" style={{ background: "var(--line)" }} />
        <motion.div className="absolute left-[6px] top-0 w-[3px] origin-top" style={{ background: "var(--acc)", height: "100%", scaleY: rm ? 1 : h }} />
        {items.map((x, i) => <Reveal key={x.id} d={i * 0.04}><div className="relative pb-10">
          <span className="absolute -left-8 top-2 h-3.5 w-3.5 rounded-full border-2" style={{ background: "var(--bg)", borderColor: "var(--acc)" }} />
          <h3 className="text-2xl font-bold">{x.t}</h3><p style={{ color: "var(--mut)" }}>{x.o}{x.d && ` · ${x.d}`}</p>{x.s && <p className="mt-2 max-w-[60ch]">{x.s}</p>}
          {x.h?.length > 0 && <ul className="mt-2 list-disc pl-5">{x.h.map((l) => <li key={l}>{l}</li>)}</ul>}</div></Reveal>)}
      </div>}
  </div>;
}
