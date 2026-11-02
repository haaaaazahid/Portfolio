import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Palette, Check } from "lucide-react";
import { PALETTES, useTheme } from "../context/ThemeContext";
const SW = { original: ["#E8452C", "#2B59FF"], slate: ["#F5A524", "#38BDF8"], forest: ["#D9A441", "#5FCBA4"], lime: ["#C8F031", "#7CF0C9"] };

export default function PaletteMenu() {
  const { palette, choose } = useTheme(); const [open, setOpen] = useState(false); const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const k = (e) => e.key === "Escape" && setOpen(false), c = (e) => !ref.current?.contains(e.target) && setOpen(false);
    addEventListener("keydown", k); addEventListener("pointerdown", c);
    return () => { removeEventListener("keydown", k); removeEventListener("pointerdown", c); };
  }, [open]);
  return <div ref={ref} className="relative">
    <button onClick={() => setOpen((o) => !o)} aria-haspopup="true" aria-expanded={open} aria-label="Colour palette" className="grid h-10 w-10 place-items-center rounded-full border" style={{ borderColor: "var(--line)" }}><Palette size={18} /></button>
    <AnimatePresence>{open && <motion.ul role="menu" aria-label="Colour palettes" className="absolute right-0 top-12 z-50 m-0 grid w-56 list-none gap-1 border p-2" style={{ background: "var(--bg)", borderColor: "var(--line)" }}
      initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
      {PALETTES.map(([k, l]) => <li key={k} role="none"><button role="menuitemradio" aria-checked={palette === k} onClick={() => { choose(k); setOpen(false); }} className="flex w-full items-center gap-3 px-2 py-2.5 text-left text-sm hover:bg-[var(--card)]">
        <span className="flex"><i className="h-5 w-5 rounded-full" style={{ background: SW[k][0] }} /><i className="-ml-2 h-5 w-5 rounded-full border" style={{ background: SW[k][1], borderColor: "var(--bg)" }} /></span>
        <span className="flex-1 font-medium">{l}</span>{palette === k && <Check size={16} aria-hidden="true" />}</button></li>)}
    </motion.ul>}</AnimatePresence></div>;
}
