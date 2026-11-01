import { createContext, useContext, useEffect, useState } from "react";
import { api, getToken, setToken } from "../services/api";
const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);
export function AuthProvider({ children }) {
  const [authed, setAuthed] = useState(!!getToken());
  useEffect(() => { const f = () => setAuthed(false); window.addEventListener("auth:expired", f); return () => window.removeEventListener("auth:expired", f); }, []);
  const login = async (creds) => { const { token } = await api.login(creds); setToken(token); setAuthed(true); };
  const logout = () => { setToken(""); setAuthed(false); };
  return <Ctx.Provider value={{ authed, login, logout }}>{children}</Ctx.Provider>;
}
