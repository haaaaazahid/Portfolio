import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Sun, Moon, Lock } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { ease } from "./ui";
import PaletteMenu from "./PaletteMenu";
import { LINKS } from "./links";

export default function Navbar() {
  const [open, setOpen] = useState(false); const { pathname } = useLocation(); const { theme, toggle } = useTheme();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => { // lock scroll and close on Escape while the menu is open
    if (!open) return;
    document.body.style.overflow = "hidden";
    const k = (e) => e.key === "Escape" && setOpen(false); addEventListener("keydown", k);
    return () => { document.body.style.overflow = ""; removeEventListener("keydown", k); };
  }, [open]);
  const cls = ({ isActive }) => `relative px-0.5 py-2 font-medium ${isActive ? "" : "opacity-70 hover:opacity-100"} transition-opacity`;
  return (
    <>
      <motion.header initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease, delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-40 flex items-center justify-between gap-3 px-[22px] pb-3 pt-[calc(14px+env(safe-area-inset-top,0px))] text-sm lg:px-8"
        style={{ background: "linear-gradient(var(--bg),transparent)" }}>
        <Link to="/" className="min-w-0 truncate text-[13px] font-bold sm:text-sm">MOHD ZAHID SHAIKH</Link>
        <nav aria-label="Main" className="hidden items-center gap-5 lg:flex">
          {LINKS.map(([to, l]) => <NavLink key={to} to={to} className={cls}>{({ isActive }) => <>{l}{isActive && <motion.span layoutId="nav-underline" className="absolute inset-x-0 -bottom-0.5 h-0.5" style={{ background: "var(--acc)" }} />}</>}</NavLink>)}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/admin" aria-label="Admin" title="Admin" className="hidden h-10 w-10 place-items-center rounded-full border lg:grid" style={{ borderColor: "var(--line)" }}><Lock size={16} /></Link>
          <PaletteMenu />
          <button onClick={toggle} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} className="grid h-10 w-10 place-items-center rounded-full border" style={{ borderColor: "var(--line)" }}>
            <AnimatePresence mode="wait" initial={false}><motion.span key={theme} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>{theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}</motion.span></AnimatePresence>
          </button>
          <button className="grid h-10 w-10 place-items-center lg:hidden" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>{open ? <X /> : <Menu />}</button>
        </div>
      </motion.header>
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" role="dialog" aria-label="Menu" className="fixed inset-0 z-30 flex flex-col justify-center gap-2 px-[22px]" style={{ background: "var(--bg)" }}
            initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.6, ease }}>
            {LINKS.map(([to, l], i) => (
              <motion.div key={to} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease, delay: 0.2 + i * 0.07 }}>
                <Link to={to} className="font-cond text-[clamp(40px,11vw,64px)] font-black uppercase leading-[1.05]">{l}</Link>
              </motion.div>))}
            <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease, delay: 0.2 + LINKS.length * 0.07 }}><Link to="/admin" className="mt-4 inline-flex items-center gap-2 text-sm font-bold underline"><Lock size={14} />Admin</Link></motion.div>
          </motion.div>)}
      </AnimatePresence>
    </>
  );
}
