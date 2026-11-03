import { useRef, useState } from "react";
import { ImagePlus, X, Loader2, Crop, ArrowUp, ArrowDown, Plus, UploadCloud } from "lucide-react";
import { api } from "../../services/api";
import { CropImg } from "../../components/ZoomImg";
import ImageCropper from "./ImageCropper";

const get = (o, p) => p.split(".").reduce((a, k) => a?.[k], o);
const set = (o, p, v) => { const ks = p.split("."); const r = { ...o }; let c = r; ks.forEach((k, i) => { if (i === ks.length - 1) c[k] = v; else { c[k] = { ...c[k] }; c = c[k]; } }); return r; };
const clean = (a) => a.split("\n").map((x) => x.trim()).filter(Boolean);
const strip = (o) => { const { _id, ...r } = o || {}; return r; };
// API shape <-> editable text
const toDraft = (fields, item) => fields.reduce((d, f) => { let v = get(item, f.name);
  if (f.type === "tags") v = (v || []).join(", "); else if (f.type === "lines") v = (v || []).join("\n"); else if (f.type === "pairs") v = (v || []).map((x) => `${x.label} | ${x.url}`).join("\n");
  else if (f.type === "rows") v = (v || []).map(strip); else if (f.type === "checkbox") v = !!v; else v = v ?? "";
  return set(d, f.name, v); }, {});
const fromDraft = (fields, d) => fields.reduce((o, f) => { let v = get(d, f.name);
  if (f.type === "tags") v = v.split(",").map((x) => x.trim()).filter(Boolean); else if (f.type === "lines") v = clean(v);
  else if (f.type === "pairs") v = clean(v).map((l) => { const [label, ...u] = l.split("|"); return { label: label.trim(), url: u.join("|").trim() }; });
  else if (f.type === "rows") v = v.filter((it) => (f.multi ? it[f.multi] : Object.values(it).some(Boolean)));
  else if (f.type === "number") v = v === "" ? undefined : Number(v);
  return v === undefined ? o : set(o, f.name, v); }, {});

// Single image: upload, then Adjust (crop / zoom / focus). The original is kept; only the framing is saved.
export function ImageField({ value, onChange, label, aspect = "4/3" }) {
  const [busy, setBusy] = useState(false); const [err, setErr] = useState(""); const [crop, setCrop] = useState(false);
  const pick = async (e) => { const f = e.target.files?.[0]; e.target.value = ""; if (!f) return; setBusy(true); setErr("");
    try { onChange((await api.upload(f)).url); } catch (x) { setErr(x.message); } finally { setBusy(false); } };
  const btn = "inline-flex items-center gap-1.5 border px-3 py-2 text-sm font-bold";
  return <div>
    <div className="flex flex-wrap items-start gap-4">
      <div className="w-36 shrink-0 border border-dashed" style={{ aspectRatio: aspect, borderColor: "var(--line)", color: "var(--mut)" }}>
        {value ? <CropImg src={value} hover={false} /> : <div className="grid h-full place-items-center text-xs">No image</div>}</div>
      <div className="grid gap-2">
        <label className="btn !px-4 !py-2 cursor-pointer text-sm">{busy ? <Loader2 size={16} className="animate-spin" /> : <ImagePlus size={16} />}{busy ? "Uploading…" : value ? "Replace" : "Upload"}
          <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="sr-only" onChange={pick} disabled={busy} aria-label={`Upload ${label}`} /></label>
        {value && <button type="button" onClick={() => setCrop(true)} className={btn} style={{ borderColor: "var(--line)" }}><Crop size={15} />Adjust crop and zoom</button>}
        {value && <button type="button" onClick={() => onChange("")} className="inline-flex items-center gap-1 text-sm underline"><X size={14} />Remove</button>}
      </div></div>
    {err && <p role="alert" className="mt-2 text-sm text-red-600">{err}</p>}
    {crop && <ImageCropper url={value} aspect={aspect} onClose={() => setCrop(false)} onSave={(u) => { onChange(u); setCrop(false); }} />}
  </div>;
}

function Control({ f, v, onChange, id }) {
  if (f.type === "image") return <ImageField value={v} onChange={onChange} label={f.label} aspect={f.aspect} />;
  if (f.type === "rows") return <Rows f={f} v={v} onChange={onChange} id={id} />;
  if (f.type === "select") return <select id={id} className="field" value={v} onChange={(e) => onChange(e.target.value)}>{f.options.map((o) => { const [k, l] = Array.isArray(o) ? o : [o, o || "—"]; return <option key={k} value={k}>{l}</option>; })}</select>;
  if (["textarea", "lines", "pairs"].includes(f.type)) return <textarea id={id} className="field" rows={f.rows || (f.type === "textarea" ? 3 : 4)} value={v} onChange={(e) => onChange(e.target.value)} />;
  return <input id={id} className="field" type={f.type === "number" ? "number" : f.type === "url" ? "url" : "text"} required={f.required} value={v} onChange={(e) => onChange(e.target.value)} placeholder={f.type === "url" ? "https://" : ""} />;
}

// List of sub-records (project screenshots, page sections, facts). Reorder with the arrows; `multi` adds drag-and-drop multi-upload.
function Rows({ f, v, onChange, id }) {
  const [up, setUp] = useState(""); const [err, setErr] = useState(""); const input = useRef(null);
  const upd = (i, k, val) => onChange(v.map((r, j) => (j === i ? { ...r, [k]: val } : r)));
  const move = (i, d) => { const a = [...v]; const j = i + d; if (j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; onChange(a); };
  const files = async (list) => { const fs = [...list].filter((x) => x.type.startsWith("image/")); if (!fs.length) return; setErr(""); const added = [];
    for (const [n, file] of fs.entries()) { setUp(`Uploading ${n + 1} of ${fs.length}…`); try { added.push({ [f.multi]: (await api.upload(file)).url }); } catch (x) { setErr(`${file.name}: ${x.message}`); } }
    setUp(""); if (added.length) onChange([...v, ...added]); };
  const iconBtn = "grid h-9 w-9 place-items-center rounded-full border";
  return <div className="grid gap-3">
    {f.multi && <div onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); files(e.dataTransfer.files); }} className="grid place-items-center gap-2 border border-dashed p-5 text-center text-sm" style={{ borderColor: "var(--line)", color: "var(--mut)" }}>
      <UploadCloud size={22} aria-hidden="true" />{up || "Drag images here, or"}
      <button type="button" className="btn !px-4 !py-2 text-sm" onClick={() => input.current.click()}><ImagePlus size={16} />Choose images</button>
      <input ref={input} type="file" multiple accept="image/jpeg,image/png,image/webp,image/gif" className="sr-only" aria-label={`Upload ${f.label}`} onChange={(e) => { files(e.target.files); e.target.value = ""; }} /></div>}
    {err && <p role="alert" className="text-sm text-red-600">{err}</p>}
    {v.map((row, i) => <div key={i} className="grid gap-3 border p-3" style={{ borderColor: "var(--line)", background: "var(--card)" }}>
      {f.itemFields.map((sf) => <div key={sf.name}><label className="mb-1 block text-xs font-bold" htmlFor={`${id}-${i}-${sf.name}`}>{sf.label}</label><Control f={sf} v={row[sf.name] ?? ""} onChange={(val) => upd(i, sf.name, val)} id={`${id}-${i}-${sf.name}`} /></div>)}
      <div className="flex gap-2"><button type="button" aria-label="Move up" disabled={i === 0} onClick={() => move(i, -1)} className={`${iconBtn} disabled:opacity-30`} style={{ borderColor: "var(--line)" }}><ArrowUp size={15} /></button>
        <button type="button" aria-label="Move down" disabled={i === v.length - 1} onClick={() => move(i, 1)} className={`${iconBtn} disabled:opacity-30`} style={{ borderColor: "var(--line)" }}><ArrowDown size={15} /></button>
        <button type="button" aria-label="Remove" onClick={() => onChange(v.filter((_, j) => j !== i))} className={`${iconBtn} ml-auto text-red-600`} style={{ borderColor: "var(--line)" }}><X size={15} /></button></div>
    </div>)}
    <button type="button" onClick={() => onChange([...v, {}])} className="inline-flex w-fit items-center gap-1 text-sm font-bold underline"><Plus size={15} />{f.addLabel || "Add"}</button>
  </div>;
}

export default function Form({ fields, initial, onSubmit, onCancel, submitLabel = "Save" }) {
  const [d, setD] = useState(() => toDraft(fields, initial || {})); const [busy, setBusy] = useState(false); const [err, setErr] = useState("");
  const submit = async (e) => { e.preventDefault(); setBusy(true); setErr(""); try { await onSubmit(fromDraft(fields, d)); } catch (x) { setErr(x.message); } finally { setBusy(false); } };
  return <form onSubmit={submit} className="grid gap-5">
    {fields.map((f) => { const id = "f-" + f.name; const v = get(d, f.name); const up = (val) => setD((x) => set(x, f.name, val));
      return <div key={f.name}>
        {f.type === "checkbox" ? <label className="flex items-center gap-2 font-medium"><input type="checkbox" className="h-5 w-5" style={{ accentColor: "var(--acc)" }} checked={v} onChange={(e) => up(e.target.checked)} />{f.label}</label> : <>
          <label htmlFor={id} className="mb-1 block text-sm font-bold">{f.label}{f.required && " *"}</label><Control f={f} v={v} onChange={up} id={id} /></>}
        {f.help && <p className="mt-1 text-xs" style={{ color: "var(--mut)" }}>{f.help}</p>}
      </div>; })}
    {err && <p role="alert" className="text-sm font-bold text-red-600">{err}</p>}
    <div className="flex gap-3"><button className="btn disabled:opacity-60" disabled={busy}>{busy ? "Saving…" : submitLabel}</button>{onCancel && <button type="button" onClick={onCancel} className="px-4 font-bold underline">Cancel</button>}</div>
  </form>;
}
