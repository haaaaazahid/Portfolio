import { useState } from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { Words, ease } from "../../components/ui";
export default function Login() {
  const { authed, login } = useAuth(); const [f, setF] = useState({ email: "", password: "" }); const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  if (authed) return <Navigate to="/admin" replace />;
  const go = async (e) => { e.preventDefault(); setBusy(true); setErr(""); try { await login(f); } catch (x) { setErr(x.message); setBusy(false); } };
  return <div className="grid min-h-[100svh] place-items-center px-5"><div className="w-full max-w-[420px]">
    <Words text="Admin." className="h-hero mb-8 !text-[clamp(56px,16vw,120px)]" />
    <motion.form onSubmit={go} className="grid gap-3" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.4 }}>
      <label className="sr-only" htmlFor="em">Email</label><input id="em" className="field" type="email" autoComplete="username" placeholder="Email" required value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
      <label className="sr-only" htmlFor="pw">Password</label><input id="pw" className="field" type="password" autoComplete="current-password" placeholder="Password" required value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} />
      <button className="btn justify-center disabled:opacity-60" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
      <p role="alert" className="min-h-6 text-sm font-bold text-red-600">{err}</p>
    </motion.form></div></div>;
}
