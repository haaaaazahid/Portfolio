import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import useApi from "../hooks/useApi";
import PageShell from "../components/PageShell";
import { Reveal, Loading } from "../components/ui";

export default function Experience() {
  const ex = useApi(() => api.experience.list(), []); const ref = useRef(null); const rm = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] }); const h = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });
  const items = (ex.data || []).filter((e) => e.world === "coach");
  return <PageShell world="coach" title="Coaching experience." lead="Where I have coached and what I have taught.">
    {ex.loading ? <Loading /> : !items.length ? <span className="note">Coaching experience will appear here once added.</span> :
      <div ref={ref} className="relative pl-8">
        <div className="absolute bottom-0 left-[7px] top-0 w-px" style={{ background: "var(--line)" }} />
        <motion.div className="absolute left-[6px] top-0 w-[3px] origin-top" style={{ background: "var(--acc)", height: "100%", scaleY: rm ? 1 : h }} />
        {items.map((x, i) => <Reveal key={x._id} d={i * 0.04}><div className="relative pb-10">
          <span className="absolute -left-8 top-2 h-3.5 w-3.5 rounded-full border-2" style={{ background: "var(--bg)", borderColor: "var(--acc)" }} />
          <h3 className="text-2xl font-bold">{x.role}</h3><p style={{ color: "var(--mut)" }}>{x.org}{[x.start, x.end].filter(Boolean).length > 0 && ` · ${[x.start, x.end].filter(Boolean).join(" – ")}`}</p>
          {x.summary && <p className="mt-2 max-w-[60ch]">{x.summary}</p>}{x.highlights?.length > 0 && <ul className="mt-2 list-disc pl-5">{x.highlights.map((l) => <li key={l}>{l}</li>)}</ul>}
          {/master calisthenics|mci/i.test(x.org) && <Link to="/coach/mci" className="mt-2 inline-block font-bold underline">MCI page</Link>}{/train with zahid|twz/i.test(x.org) && <Link to="/coach/twz" className="mt-2 inline-block font-bold underline">TWZ page</Link>}</div></Reveal>)}
      </div>}
  </PageShell>;
}
