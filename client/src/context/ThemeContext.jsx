import { createContext, useContext, useEffect, useState } from "react";
const Ctx = createContext(null);
export const useTheme = () => useContext(Ctx);
const read = () => { try { return localStorage.getItem("theme"); } catch { return null; } };
// With no saved choice, coach pages default dark and developer pages light (your original look).
export function ThemeProvider({ world, children }) {
  const [pref, setPref] = useState(read);
  const theme = pref || (world === "developer" ? "light" : "dark");
  useEffect(() => { document.body.dataset.theme = theme; document.body.dataset.world = world; }, [theme, world]);
  const toggle = () => { const n = theme === "dark" ? "light" : "dark"; setPref(n); try { localStorage.setItem("theme", n); } catch { /* storage blocked */ } };
  return <Ctx.Provider value={{ theme, toggle }}>{children}</Ctx.Provider>;
}
