import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useMotionValue, useTransform } from "framer-motion";
export const ease = [0.76, 0, 0.24, 1];

// Word-by-word masked reveal. aria-label keeps the heading readable to screen readers.
export function Words({ text, as = "h1", className, delay = 0 }) {
  const rm = useReducedMotion(); const T = motion[as];
  return <T className={className} aria-label={text}>{text.split(" ").map((w, i) => (
    <span className="mask" aria-hidden="true" key={i}><motion.span className="inline-block" initial={rm ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, ease, delay: delay + i * 0.07 }}>{w}&nbsp;</motion.span></span>))}</T>;
}
export function Reveal({ children, d = 0, className }) {
  const rm = useReducedMotion();
  return <motion.div className={className} initial={rm ? false : { opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8, ease, delay: d }}>{children}</motion.div>;
}
export function Magnetic({ children }) {
  const rm = useReducedMotion(); const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 }), sy = useSpring(y, { stiffness: 200, damping: 15 });
  return <motion.div className="inline-block" style={{ x: sx, y: sy }}
    onMouseMove={(e) => { if (rm) return; const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * 0.3); y.set((e.clientY - r.top - r.height / 2) * 0.3); }}
    onMouseLeave={() => { x.set(0); y.set(0); }}>{children}</motion.div>;
}
export function Marquee({ items }) {
  const s = items.join("  ✦  ") + "  ✦  ";
  return <div className="mq" aria-hidden="true"><div>{s}{s}</div></div>;
}
export function ScrollProgress() {
  const { scrollYProgress } = useScroll(); const sx = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  return <motion.div className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left" style={{ scaleX: sx, background: "var(--acc)" }} />;
}
export function Cursor() {
  const x = useMotionValue(-50), y = useMotionValue(-50); const sx = useSpring(x, { stiffness: 500, damping: 30 }), sy = useSpring(y, { stiffness: 500, damping: 30 });
  const [on, setOn] = useState(false), [big, setBig] = useState(false);
  useEffect(() => {
    if (!matchMedia("(pointer:fine)").matches) return;
    setOn(true); document.body.classList.add("has-cursor");
    const m = (e) => { x.set(e.clientX - 7); y.set(e.clientY - 7); setBig(!!e.target.closest?.("a,button,input,textarea,select")); };
    addEventListener("mousemove", m);
    return () => { removeEventListener("mousemove", m); document.body.classList.remove("has-cursor"); };
  }, [x, y]);
  return on ? <motion.div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[60] h-3.5 w-3.5 rounded-full bg-white mix-blend-difference" style={{ x: sx, y: sy }} animate={{ scale: big ? 3 : 1 }} /> : null;
}
// Parallax image slot: shows `src` when given, else a dashed placeholder labelled `label` (editable later, never fake content)
export function Para({ src, alt = "", label, className = "" }) {
  const ref = useRef(null); const rm = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], rm ? [0, 0] : [-60, 60]);
  return <div ref={ref} className={`mt-9 grid aspect-[16/7] place-items-center overflow-hidden border border-dashed text-[13px] ${className}`} style={{ borderColor: "var(--line)", color: "var(--mut)" }}>
    {src ? <motion.img src={src} alt={alt} loading="lazy" className="h-[130%] w-full object-cover" style={{ y }} /> : <motion.div style={{ y }}>{label}</motion.div>}</div>;
}
// Counter preloader that slides up when done (same timing as the original: +4 every 30ms)
export function Preloader({ onDone }) {
  const rm = useReducedMotion(); const [n, setN] = useState(0); const [show, setShow] = useState(true);
  useEffect(() => {
    let i = 0, to; const t = setInterval(() => { i += rm ? 100 : 4; setN(Math.min(i, 100)); if (i >= 100) { clearInterval(t); to = setTimeout(() => setShow(false), 250); } }, 30);
    return () => { clearInterval(t); clearTimeout(to); };
  }, [rm]);
  return <AnimatePresence onExitComplete={onDone}>{show && <motion.div role="status" aria-label="Loading" className="fixed inset-0 z-[90] flex items-end justify-between p-7" style={{ background: "var(--da-bg)", color: "var(--da-fg)" }} exit={{ y: "-100%" }} transition={{ duration: 0.9, ease }}>
    <span className="max-w-[18ch] text-sm">MOHD ZAHID SHAIKH</span><b className="font-cond text-[clamp(80px,22vw,300px)] font-black leading-[.8]">{n}</b></motion.div>}</AnimatePresence>;
}
// Accent-coloured wipe that retracts on every route change
export function Curtain({ k, delay = 0 }) {
  const rm = useReducedMotion(); if (rm) return null;
  return <motion.div key={k} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[45] origin-bottom" style={{ background: "var(--acc)" }} initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} transition={{ duration: 0.8, ease, delay }} />;
}
export const Loading = () => <p role="status" className="note">Loading…</p>;
