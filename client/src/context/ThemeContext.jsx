import { createContext, useContext, useEffect, useState } from "react";
const Ctx = createContext(null);
export const useTheme = () => useContext(Ctx);
export const PALETTES = [["original", "Ember & Signal"], ["slate", "Slate & Amber"], ["forest", "Forest & Brass"], ["lime", "Mono & Lime"]];
const read = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
const write = (k, v) => { try { localStorage.setItem(k, v); } catch { /* storage blocked */ } };
// With no saved choice, coach pages default dark and developer pages light (your original look).
export function ThemeProvider({ world, children }) {
  const [pref, setPref] = useState(() => read("theme")); const [palette, setPalette] = useState(() => (PALETTES.some(([k]) => k === read("palette")) ? read("palette") : "original"));
  const theme = pref || (world === "developer" ? "light" : "dark");
  useEffect(() => { const b = document.body.dataset; b.theme = theme; b.world = world; b.palette = palette; }, [theme, world, palette]);
  const toggle = () => { const n = theme === "dark" ? "light" : "dark"; setPref(n); write("theme", n); };
  const choose = (k) => { setPalette(k); write("palette", k); };
  return <Ctx.Provider value={{ theme, toggle, palette, choose }}>{children}</Ctx.Provider>;
}
