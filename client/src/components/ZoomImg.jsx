import { useState } from "react";
import { Maximize2 } from "lucide-react";
import { full, imgStyle } from "../lib/img";
import Lightbox from "./Lightbox";

// Shows the admin-chosen framing. The parent supplies the size/aspect; hover zoom lives on a wrapper so it never fights the crop transform.
export function CropImg({ src, alt = "", hover = true, className = "" }) {
  return <div className={`h-full w-full overflow-hidden ${className}`}><div className={`h-full w-full ${hover ? "transition-transform duration-700 ease-out group-hover:scale-105" : ""}`}>
    <img src={full(src)} alt={alt} loading="lazy" decoding="async" style={imgStyle(src)} className="h-full w-full" /></div></div>;
}
// Same, but clicking opens the complete, uncropped original in the viewer.
export function ZoomImg({ src, alt = "", caption, className = "", style }) {
  const [open, setOpen] = useState(false);
  return <>
    <button type="button" onClick={() => setOpen(true)} aria-label={`View full image: ${alt || caption || "image"}`} className={`group relative block overflow-hidden ${className}`} style={{ cursor: "zoom-in", ...style }}>
      <CropImg src={src} alt={alt} />
      <span aria-hidden="true" className="pointer-events-none absolute bottom-2 right-2 grid h-8 w-8 place-items-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"><Maximize2 size={14} /></span>
    </button>
    <Lightbox item={open ? { src: full(src), alt, caption } : null} onClose={() => setOpen(false)} />
  </>;
}
