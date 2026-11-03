import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { api } from "../services/api";
import { ease } from "./ui";

const NAME = ["MOHD", "ZAHID", "SHAIKH"];
// Coach mark: a ring clears a bar and returns (one rep). Purely geometric - no human figure, so nothing can deform.
const rep = { duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.25 };
function Athlete() {
  return <svg viewBox="0 0 200 260" className="h-auto max-h-[42svh] w-[62%] max-w-[240px]" fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <g stroke="var(--da-fg)">
      <line x1="100" y1="30" x2="100" y2="236" strokeWidth="2" strokeDasharray="2 9" opacity=".35" />
      <line x1="30" y1="76" x2="170" y2="76" strokeWidth="7" />
      <line x1="30" y1="76" x2="30" y2="236" strokeWidth="3" opacity=".3" /><line x1="170" y1="76" x2="170" y2="236" strokeWidth="3" opacity=".3" />
      <g strokeWidth="3" opacity=".35"><line x1="88" y1="236" x2="112" y2="236" /><line x1="92" y1="156" x2="108" y2="156" /></g>
    </g>
    <motion.g animate={{ y: [0, -148, 0] }} transition={rep}>
      <motion.circle cx="100" cy="200" r="17" stroke="var(--da-acc)" style={{ transformBox: "fill-box", transformOrigin: "center" }} animate={{ scale: [1, 1, 1.18, 1, 1] }} transition={{ ...rep, times: [0, 0.42, 0.5, 0.58, 1] }} />
      <circle cx="100" cy="200" r="4" fill="var(--da-acc)" stroke="none" />
    </motion.g>
  </svg>;
}
const LINES = [[50, 40, 120], [64, 58, 150], [64, 76, 112], [50, 94, 138]];
function Dev() {
  return <svg viewBox="0 0 220 180" className="h-auto max-h-[42svh] w-[68%] max-w-[280px]" fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <g stroke="var(--da-fg)"><rect x="34" y="14" width="152" height="104" rx="8" /><path d="M12 134 H208 L198 152 H22 Z" /></g>
    <g fill="var(--da-fg)" opacity=".5"><circle cx="46" cy="26" r="2.5" /><circle cx="56" cy="26" r="2.5" /><circle cx="66" cy="26" r="2.5" /></g>
    <g stroke="var(--dev-dark)">
      {LINES.map(([x1, y, x2], i) => <motion.line key={i} x1={x1} y1={y} x2={x2} y2={y} initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 1, 0] }} transition={{ duration: 3.4, times: [0, 0.35, 0.85, 1], repeat: Infinity, delay: 0.5 + i * 0.35 }} />)}
    </g>
    <motion.rect x="146" y="88" width="7" height="12" fill="var(--dev-dark)" stroke="none" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.9, repeat: Infinity }} />
  </svg>;
}
const Scene = ({ children, label, color, delay }) => <motion.div className="flex flex-col items-center justify-center gap-4" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay }}>
  {children}<span className="font-cond text-[clamp(14px,2.4vw,22px)] font-extrabold uppercase tracking-[.22em]" style={{ color }}>{label}</span></motion.div>;

// Cinematic intro: athlete (left) + developer (right) -> name reveal -> screen splits open onto the site.
// Driven by plain timers (not exit animations) so it can never get stuck; Skip / Escape always work.
export default function Intro({ onReveal, onDone }) {
  const rm = useReducedMotion(); const [phase, setPhase] = useState(0); const fired = useRef({ r: false, d: false });
  const reveal = () => { if (!fired.current.r) { fired.current.r = true; onReveal(); } };
  const finish = () => { if (!fired.current.d) { fired.current.d = true; reveal(); onDone(); } };
  const skip = () => { setPhase(2); reveal(); setTimeout(finish, 900); };
  useEffect(() => {
    try { sessionStorage.setItem("intro", "1"); } catch { /* storage blocked */ }
    api.profile.get().catch(() => {}); // wakes a sleeping free-tier API while the intro plays
    if (rm) { finish(); return undefined; }
    document.body.style.overflow = "hidden";
    const ts = [setTimeout(() => setPhase(1), 3200), setTimeout(() => { setPhase(2); reveal(); }, 5600), setTimeout(finish, 6900)];
    const k = (e) => e.key === "Escape" && skip(); addEventListener("keydown", k);
    return () => { ts.forEach(clearTimeout); document.body.style.overflow = ""; removeEventListener("keydown", k); };
  }, []); // eslint-disable-line
  if (rm) return null;
  let n = 0;
  return <div role="status" aria-label="Loading intro" className="fixed inset-0 z-[90] overflow-hidden" style={{ color: "var(--da-fg)" }}>
    <motion.div className="absolute inset-y-0 left-0 w-1/2" style={{ background: "var(--da-bg)" }} animate={{ x: phase === 2 ? "-101%" : 0 }} transition={{ duration: 1.1, ease }} />
    <motion.div className="absolute inset-y-0 right-0 w-1/2" style={{ background: "var(--da-bg)" }} animate={{ x: phase === 2 ? "101%" : 0 }} transition={{ duration: 1.1, ease }} />
    <motion.div className="absolute inset-0 grid grid-cols-2" animate={{ opacity: phase === 0 ? 1 : 0, scale: phase === 0 ? 1 : 1.08, filter: phase === 0 ? "blur(0px)" : "blur(10px)" }} transition={{ duration: 0.9, ease }}>
      <Scene label="Coach" color="var(--da-acc)" delay={0.5}><Athlete /></Scene>
      <Scene label="Developer" color="var(--dev-dark)" delay={0.8}><Dev /></Scene>
    </motion.div>
    <motion.span className="absolute left-1/2 top-0 h-full w-px origin-top" style={{ background: "var(--da-fg)" }} initial={{ scaleY: 0, opacity: 0.3 }} animate={{ scaleY: 1, opacity: phase === 0 ? 0.3 : 0 }} transition={{ duration: 1.1, ease }} />
    <div className="absolute inset-0 grid place-items-center px-5 text-center">
      <motion.div animate={{ opacity: phase === 2 ? 0 : 1, y: phase === 2 ? -18 : 0 }} transition={{ duration: 0.6, ease }}>
        <h1 aria-label="Mohd Zahid Shaikh" className="flex flex-col items-center font-cond font-black uppercase leading-[.88] text-[clamp(52px,13vw,190px)] md:flex-row md:gap-x-[.28em]">
          {NAME.map((w) => <span key={w} className="mask" aria-hidden="true">{[...w].map((c) => { const i = n++; return <motion.span key={i} className="inline-block" initial={{ y: "110%", opacity: 0, filter: "blur(14px)" }} animate={phase >= 1 ? { y: 0, opacity: 1, filter: "blur(0px)" } : {}} transition={{ duration: 0.9, ease, delay: i * 0.05 }}>{c}</motion.span>; })}</span>)}
        </h1>
        <motion.span className="mx-auto mt-5 block h-0.5 w-24 origin-left" style={{ background: "var(--da-acc)" }} initial={{ scaleX: 0 }} animate={{ scaleX: phase >= 1 ? 1 : 0 }} transition={{ delay: 1, duration: 0.9, ease }} />
        <motion.p className="mt-4 text-xs uppercase tracking-[.32em] sm:text-sm" initial={{ opacity: 0 }} animate={{ opacity: phase >= 1 ? 1 : 0 }} transition={{ delay: 1.15, duration: 0.8 }}>Two worlds. One identity.</motion.p>
      </motion.div>
    </div>
    <button onClick={skip} className="absolute right-5 top-[calc(18px+env(safe-area-inset-top,0px))] z-10 min-h-11 px-2 text-xs font-bold uppercase tracking-widest underline">Skip</button>
  </div>;
}
