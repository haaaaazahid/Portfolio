import { AnimatePresence, motion } from "framer-motion";
import { Mail, Check, Trash2 } from "lucide-react";
import { api } from "../../services/api";
import useApi from "../../hooks/useApi";
import { ease } from "../../components/ui";
export default function Messages() {
  const { data, loading, error, reload } = useApi(() => api.messages.list(), []);
  const act = (fn) => async () => { try { await fn(); reload(); } catch (e) { alert(e.message); } };
  return <div><h1 className="mb-6 font-serif text-4xl sm:text-5xl">Messages</h1>
    {loading ? <p role="status" className="note">Loading…</p> : error ? <p role="alert" className="note">{error}</p> : !data.length ? <div className="border border-dashed p-12 text-center" style={{ borderColor: "var(--line)", color: "var(--mut)" }}>No messages yet. Contact-form submissions appear here.</div>
      : <ul className="grid gap-3"><AnimatePresence initial={false}>{data.map((m) => <motion.li layout key={m._id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4, ease }} className="border p-4" style={{ borderColor: m.read ? "var(--line)" : "var(--acc)", background: "var(--card)" }}>
        <div className="flex flex-wrap items-start justify-between gap-2"><div><b>{m.subject}</b>{!m.read && <span className="ml-2 text-xs font-bold" style={{ color: "var(--acc)" }}>NEW</span>}<p className="text-sm" style={{ color: "var(--mut)" }}>{m.name} · {m.email}{m.category && ` · ${m.category}`} · {new Date(m.createdAt).toLocaleString()}</p></div>
          <div className="flex gap-2">
            <a aria-label={`Reply to ${m.name}`} href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject)}`} className="grid h-11 w-11 place-items-center rounded-full border" style={{ borderColor: "var(--line)" }}><Mail size={17} /></a>
            {!m.read && <button aria-label="Mark as read" onClick={act(() => api.messages.read(m._id))} className="grid h-11 w-11 place-items-center rounded-full border" style={{ borderColor: "var(--line)" }}><Check size={17} /></button>}
            <button aria-label="Delete message" onClick={() => confirm("Delete this message?") && act(() => api.messages.remove(m._id))()} className="grid h-11 w-11 place-items-center rounded-full border text-red-600" style={{ borderColor: "var(--line)" }}><Trash2 size={17} /></button></div></div>
        <p className="mt-3 whitespace-pre-line">{m.message}</p></motion.li>)}</AnimatePresence></ul>}</div>;
}
