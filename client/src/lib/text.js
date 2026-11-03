const HIDE = ["", "awaiting information", "to be confirmed"];
export const shownStatus = (s) => (s && !HIDE.includes(String(s).toLowerCase()) ? s : "");
// YouTube / Vimeo link -> safe embed URL (anything else returns null and is shown as a plain link)
export const embedUrl = (u) => {
  try { const x = new URL(u); const h = x.hostname.replace(/^www\./, "");
    if (h === "youtu.be") return `https://www.youtube.com/embed/${x.pathname.slice(1)}`;
    if (h.endsWith("youtube.com")) { const id = x.searchParams.get("v") || x.pathname.split("/").pop(); return id ? `https://www.youtube.com/embed/${id}` : null; }
    if (h === "vimeo.com") { const id = x.pathname.split("/").filter(Boolean)[0]; return id ? `https://player.vimeo.com/video/${id}` : null; }
  } catch { /* not a URL */ }
  return null;
};
export const STATUS_LABEL = { demonstrate: "I can demonstrate it", developing: "I am developing it", coach: "I coach it", programming: "I use it in programming" };
