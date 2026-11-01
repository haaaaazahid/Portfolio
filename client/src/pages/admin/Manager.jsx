import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { api } from "../../services/api";
import useApi from "../../hooks/useApi";
import Form from "./Form";
import { ease } from "../../components/ui";

export default function Manager({ cfg }) {
  const { data, loading, error, reload } = useApi(() => api[cfg.api].list(true), [cfg.api]);
  const [edit, setEdit] = useState(null); // null = closed, {} = new, item = editing
  const [msg, setMsg] = useState("");
  useEffect(() => { setEdit(null); setMsg(""); }, [cfg.api]);
  useEffect(() => { if (!edit) return; const k = (e) => e.key === "Escape" && setEdit(null); addEventListener("keydown", k); return () => removeEventListener("keydown", k); }, [edit]);
  const save = async (v) => { edit._id ? await api[cfg.api].update(edit._id, v) : await api[cfg.api].create(v); setEdit(null); setMsg("Saved."); reload(); };
  const del = async (i) => { if (!confirm(`Delete “${cfg.label(i)}”? This cannot be undone.`)) return; try { await api[cfg.api].remove(i._id); setMsg("Deleted."); reload(); } catch (e) { setMsg(e.message); } };
  return <div>
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3"><h1 className="font-serif text-4xl sm:text-5xl">{cfg.title}</h1>
      <button className="btn" onClick={() => setEdit({ ...cfg.blank })}><Plus size={18} />Add new</button></div>
    <p role="status" className="mb-3 min-h-6 text-sm font-bold" style={{ color: "var(--acc)" }}>{msg}</p>
    {loading ? <p role="status" className="note">Loading…</p> : error ? <p role="alert" className="note">{error}</p> : !data.length
      ? <div className="grid place-items-center gap-3 border border-dashed p-12 text-center" style={{ borderColor: "var(--line)", color: "var(--mut)" }}>Nothing here yet.<button className="btn" onClick={() => setEdit({ ...cfg.blank })}>Add the first one</button></div>
      : <ul className="grid gap-3"><AnimatePresence initial={false}>{data.map((i, n) => <motion.li layout key={i._id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4, ease, delay: Math.min(n, 8) * 0.03 }}
        className="flex items-center gap-4 border p-3" style={{ borderColor: "var(--line)", background: "var(--card)" }}>
        {cfg.thumb && <div className="h-14 w-20 shrink-0 overflow-hidden border border-dashed" style={{ borderColor: "var(--line)" }}>{cfg.thumb(i) && <img src={cfg.thumb(i)} alt="" loading="lazy" className="h-full w-full object-cover" />}</div>}
        <div className="min-w-0 flex-1"><b className="block truncate">{cfg.label(i)}</b><span className="block truncate text-sm" style={{ color: "var(--mut)" }}>{cfg.sub(i)}</span></div>
        <button aria-label={`Edit ${cfg.label(i)}`} onClick={() => setEdit(i)} className="grid h-11 w-11 place-items-center rounded-full border" style={{ borderColor: "var(--line)" }}><Pencil size={17} /></button>
        <button aria-label={`Delete ${cfg.label(i)}`} onClick={() => del(i)} className="grid h-11 w-11 place-items-center rounded-full border text-red-600" style={{ borderColor: "var(--line)" }}><Trash2 size={17} /></button>
      </motion.li>)}</AnimatePresence></ul>}
    <AnimatePresence>{edit && <motion.div className="fixed inset-0 z-[80] flex justify-end bg-black/60" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => e.target === e.currentTarget && setEdit(null)}>
      <motion.aside role="dialog" aria-modal="true" aria-label={edit._id ? `Edit ${cfg.title}` : `New ${cfg.title}`} className="h-full w-full overflow-y-auto p-5 sm:w-[560px] sm:p-8" style={{ background: "var(--bg)" }} initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.5, ease }}>
        <div className="mb-6 flex items-center justify-between"><h2 className="font-serif text-3xl">{edit._id ? "Edit" : "New"}</h2><button aria-label="Close" onClick={() => setEdit(null)} className="grid h-11 w-11 place-items-center rounded-full border" style={{ borderColor: "var(--line)" }}><X size={18} /></button></div>
        <Form key={edit._id || "new"} fields={cfg.fields} initial={edit} onSubmit={save} onCancel={() => setEdit(null)} />
      </motion.aside></motion.div>}</AnimatePresence>
  </div>;
}
