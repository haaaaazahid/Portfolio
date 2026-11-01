import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
export default function Lightbox({ item, onClose }) {
  useEffect(() => { if (!item) return; const k = (e) => e.key === "Escape" && onClose(); addEventListener("keydown", k); document.body.style.overflow = "hidden"; return () => { removeEventListener("keydown", k); document.body.style.overflow = ""; }; }, [item, onClose]);
  return <AnimatePresence>{item && <motion.div role="dialog" aria-modal="true" aria-label="Image viewer" className="fixed inset-0 z-[70] flex flex-col items-center justify-center gap-4 bg-black/90 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
    <motion.img initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.94, opacity: 0 }} transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }} src={item.src} alt={item.alt || ""} className="max-h-[78svh] max-w-full object-contain" onClick={(e) => e.stopPropagation()} />
    {item.caption && <p className="text-center text-sm text-white/80">{item.caption}</p>}
    <button autoFocus aria-label="Close" onClick={onClose} className="absolute right-4 top-[calc(16px+env(safe-area-inset-top,0px))] grid h-11 w-11 place-items-center rounded-full bg-white text-black"><X size={20} /></button>
  </motion.div>}</AnimatePresence>;
}
