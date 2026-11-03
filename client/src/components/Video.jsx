import { embedUrl } from "../lib/text";
export default function Video({ url, title = "Video" }) {
  const e = embedUrl(url);
  return e ? <div className="aspect-video w-full overflow-hidden border" style={{ borderColor: "var(--line)" }}><iframe src={e} title={title} loading="lazy" allow="accelerometer; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" className="h-full w-full" /></div>
    : <a href={url} target="_blank" rel="noopener noreferrer" className="font-bold underline">Watch video</a>;
}
