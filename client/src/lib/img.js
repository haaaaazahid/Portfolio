// Non-destructive crop. The original file is never altered; the admin's framing is stored as a suffix on the same URL:
//   https://.../photo.jpg#c=<x>,<y>,<zoom>     x,y = focus point in % (50,50 = centre), zoom 1-4, zoom 0 = show whole image
// Servers ignore the #fragment, so old records without it keep working and `full()` always returns the complete original.
export const parse = (url = "") => {
  const [src, h] = String(url || "").split("#c=");
  if (!h) return { src, x: 50, y: 50, z: 1 };
  const [x, y, z] = h.split(",").map(Number); const ok = (n, d) => (Number.isFinite(n) ? n : d);
  return { src, x: Math.min(100, Math.max(0, ok(x, 50))), y: Math.min(100, Math.max(0, ok(y, 50))), z: ok(z, 1) === 0 ? 0 : Math.min(4, Math.max(1, ok(z, 1))) };
};
export const build = (src, { x, y, z }) => (!src ? "" : x === 50 && y === 50 && z === 1 ? src : `${src}#c=${+x.toFixed(1)},${+y.toFixed(1)},${+z.toFixed(2)}`);
export const full = (url) => parse(url).src;
export const imgStyle = (url) => {
  const { x, y, z } = parse(url);
  if (z === 0) return { objectFit: "contain" };
  return { objectFit: "cover", objectPosition: `${x}% ${y}%`, transform: z !== 1 ? `scale(${z})` : undefined, transformOrigin: `${x}% ${y}%` };
};
