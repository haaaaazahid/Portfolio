import { useEffect, useRef, useState } from "react";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { parse, build, imgStyle } from "../../lib/img";

// WYSIWYG: the preview frame uses the exact same rendering as the public site, so what you see here is what visitors see.
export default function ImageCropper({ url, aspect = "4/3", onSave, onClose }) {
  const start = parse(url); const [c, setC] = useState({ x: start.x, y: start.y, z: start.z === 0 ? 1 : start.z }); const [fit, setFit] = useState(start.z === 0);
  const frame = useRef(null); const drag = useRef(null);
  const cur = fit ? { ...c, z: 0 } : c; const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
  const zoom = (d) => setC((v) => ({ ...v, z: clamp(+(v.z + d).toFixed(2), 1, 4) }));
  useEffect(() => { // wheel zoom needs a non-passive listener to stop the page scrolling
    const el = frame.current; if (!el) return;
    const w = (e) => { e.preventDefault(); zoom(e.deltaY < 0 ? 0.1 : -0.1); setFit(false); };
    el.addEventListener("wheel", w, { passive: false }); return () => el.removeEventListener("wheel", w);
  }, []);
  useEffect(() => { const k = (e) => e.key === "Escape" && onClose(); addEventListener("keydown", k); return () => removeEventListener("keydown", k); }, [onClose]);
  const down = (e) => { if (fit) return; e.currentTarget.setPointerCapture(e.pointerId); drag.current = { px: e.clientX, py: e.clientY, ...c }; };
  const move = (e) => { const d = drag.current; if (!d) return; const r = frame.current.getBoundingClientRect();
    setC((v) => ({ ...v, x: clamp(d.x - ((e.clientX - d.px) / r.width) * 100 / Math.max(1, d.z), 0, 100), y: clamp(d.y - ((e.clientY - d.py) / r.height) * 100 / Math.max(1, d.z), 0, 100) })); };
  const key = (e) => { const s = 3; const m = { ArrowLeft: [-s, 0], ArrowRight: [s, 0], ArrowUp: [0, -s], ArrowDown: [0, s] }[e.key];
    if (m) { e.preventDefault(); setC((v) => ({ ...v, x: clamp(v.x + m[0], 0, 100), y: clamp(v.y + m[1], 0, 100) })); } else if (e.key === "+" || e.key === "=") zoom(0.1); else if (e.key === "-") zoom(-0.1); };
  const src = parse(url).src;
  return <div role="dialog" aria-modal="true" aria-label="Adjust image" className="fixed inset-0 z-[95] grid place-items-center bg-black/80 p-3" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
    <div className="max-h-[94svh] w-full max-w-[680px] overflow-y-auto p-5 sm:p-6" style={{ background: "var(--bg)", color: "var(--fg)" }}>
      <h2 className="font-serif text-3xl">Adjust image</h2>
      <p className="mb-4 mt-1 text-sm" style={{ color: "var(--mut)" }}>Drag the image to choose which part shows, and use zoom to crop in. Visitors who click the image always see the complete original.</p>
      <div ref={frame} tabIndex={0} role="group" aria-label="Crop preview. Arrow keys move the image, plus and minus zoom." onKeyDown={key} onPointerDown={down} onPointerMove={move} onPointerUp={() => (drag.current = null)} onPointerCancel={() => (drag.current = null)}
        className="relative mx-auto w-full touch-none select-none overflow-hidden border" style={{ aspectRatio: aspect, borderColor: "var(--line)", cursor: fit ? "default" : "grab", background: "var(--card)" }}>
        <img src={src} alt="" draggable={false} className="pointer-events-none h-full w-full" style={imgStyle(build(src, cur))} />
      </div>
      <div className="mt-4 flex items-center gap-3">
        <button type="button" onClick={() => { zoom(-0.25); setFit(false); }} aria-label="Zoom out" className="grid h-11 w-11 shrink-0 place-items-center rounded-full border" style={{ borderColor: "var(--line)" }}><ZoomOut size={18} /></button>
        <input type="range" min="1" max="4" step="0.05" value={c.z} disabled={fit} onChange={(e) => setC({ ...c, z: +e.target.value })} aria-label="Zoom" className="w-full" style={{ accentColor: "var(--acc)" }} />
        <button type="button" onClick={() => { zoom(0.25); setFit(false); }} aria-label="Zoom in" className="grid h-11 w-11 shrink-0 place-items-center rounded-full border" style={{ borderColor: "var(--line)" }}><ZoomIn size={18} /></button>
      </div>
      <label className="mt-3 flex items-center gap-2 text-sm font-medium"><input type="checkbox" className="h-5 w-5" style={{ accentColor: "var(--acc)" }} checked={fit} onChange={(e) => setFit(e.target.checked)} />Show the whole image (no cropping, may leave empty space)</label>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button type="button" className="btn" onClick={() => onSave(build(src, cur))}>Apply</button>
        <button type="button" onClick={() => { setC({ x: 50, y: 50, z: 1 }); setFit(false); }} className="inline-flex items-center gap-1 text-sm font-bold underline"><RotateCcw size={14} />Reset</button>
        <button type="button" onClick={onClose} className="ml-auto px-3 font-bold underline">Cancel</button>
      </div>
    </div></div>;
}
