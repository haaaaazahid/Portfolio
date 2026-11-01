import { useState } from "react";
import { ImagePlus, X, Loader2 } from "lucide-react";
import { api } from "../../services/api";

const get = (o, p) => p.split(".").reduce((a, k) => a?.[k], o);
const set = (o, p, v) => { const ks = p.split("."); const r = { ...o }; let c = r; ks.forEach((k, i) => { if (i === ks.length - 1) c[k] = v; else { c[k] = { ...c[k] }; c = c[k]; } }); return r; };
const clean = (a) => a.split("\n").map((x) => x.trim()).filter(Boolean);
// API shape <-> editable text
const toDraft = (fields, item) => fields.reduce((d, f) => { let v = get(item, f.name);
  if (f.type === "tags") v = (v || []).join(", "); else if (f.type === "lines") v = (v || []).join("\n"); else if (f.type === "pairs") v = (v || []).map((x) => `${x.label} | ${x.url}`).join("\n");
  else if (f.type === "images") v = v || []; else if (f.type === "checkbox") v = !!v; else v = v ?? "";
  return set(d, f.name, v); }, {});
const fromDraft = (fields, d) => fields.reduce((o, f) => { let v = get(d, f.name);
  if (f.type === "tags") v = v.split(",").map((x) => x.trim()).filter(Boolean); else if (f.type === "lines") v = clean(v);
  else if (f.type === "pairs") v = clean(v).map((l) => { const [label, ...u] = l.split("|"); return { label: label.trim(), url: u.join("|").trim() }; });
  else if (f.type === "number") v = v === "" ? undefined : Number(v);
  return v === undefined ? o : set(o, f.name, v); }, {});

export function ImageField({ value, onChange, label }) {
  const [busy, setBusy] = useState(false); const [err, setErr] = useState("");
  const pick = async (e) => { const f = e.target.files?.[0]; e.target.value = ""; if (!f) return; setBusy(true); setErr("");
    try { onChange((await api.upload(f)).url); } catch (x) { setErr(x.message); } finally { setBusy(false); } };
  return <div>
    <div className="flex items-start gap-3">
      <div className="grid h-24 w-32 shrink-0 place-items-center overflow-hidden border border-dashed text-xs" style={{ borderColor: "var(--line)", color: "var(--mut)" }}>{value ? <img src={value} alt="" className="h-full w-full object-cover" /> : "No image"}</div>
      <div className="grid gap-2">
        <label className="btn !px-4 !py-2 cursor-pointer text-sm">{busy ? <Loader2 size={16} className="animate-spin" /> : <ImagePlus size={16} />}{busy ? "Uploading…" : value ? "Replace" : "Upload"}<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="sr-only" onChange={pick} disabled={busy} aria-label={`Upload ${label}`} /></label>
        {value && <button type="button" onClick={() => onChange("")} className="inline-flex items-center gap-1 text-sm underline"><X size={14} />Remove</button>}
      </div></div>
    {err && <p role="alert" className="mt-2 text-sm text-red-600">{err}</p>}
  </div>;
}

function Images({ value, onChange }) {
  return <div className="grid gap-3">{value.map((u, i) => <div key={i} className="flex items-center gap-3"><ImageField value={u} onChange={(v) => onChange(v ? value.map((x, j) => (j === i ? v : x)) : value.filter((_, j) => j !== i))} label={`image ${i + 1}`} /></div>)}
    <ImageField value="" onChange={(v) => v && onChange([...value, v])} label="another image" /></div>;
}

export default function Form({ fields, initial, onSubmit, onCancel, submitLabel = "Save" }) {
  const [d, setD] = useState(() => toDraft(fields, initial || {})); const [busy, setBusy] = useState(false); const [err, setErr] = useState("");
  const up = (n, v) => setD((x) => set(x, n, v));
  const submit = async (e) => { e.preventDefault(); setBusy(true); setErr(""); try { await onSubmit(fromDraft(fields, d)); } catch (x) { setErr(x.message); } finally { setBusy(false); } };
  return <form onSubmit={submit} className="grid gap-5">
    {fields.map((f) => { const id = "f-" + f.name; const v = get(d, f.name);
      return <div key={f.name}>
        {f.type === "checkbox" ? <label className="flex items-center gap-2 font-medium"><input type="checkbox" className="h-5 w-5" style={{ accentColor: "var(--acc)" }} checked={v} onChange={(e) => up(f.name, e.target.checked)} />{f.label}</label> : <>
          <label htmlFor={id} className="mb-1 block text-sm font-bold">{f.label}{f.required && " *"}</label>
          {f.type === "image" ? <ImageField value={v} onChange={(x) => up(f.name, x)} label={f.label} />
            : f.type === "images" ? <Images value={v} onChange={(x) => up(f.name, x)} />
            : f.type === "select" ? <select id={id} className="field" value={v} onChange={(e) => up(f.name, e.target.value)}>{f.options.map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select>
            : ["textarea", "lines", "pairs"].includes(f.type) ? <textarea id={id} className="field" rows={f.rows || (f.type === "textarea" ? 3 : 4)} value={v} onChange={(e) => up(f.name, e.target.value)} />
            : <input id={id} className="field" type={f.type === "number" ? "number" : f.type === "url" ? "url" : "text"} required={f.required && f.type !== "image"} value={v} onChange={(e) => up(f.name, e.target.value)} placeholder={f.type === "url" ? "https://" : ""} />}
        </>}
        {f.help && <p className="mt-1 text-xs" style={{ color: "var(--mut)" }}>{f.help}</p>}
      </div>; })}
    {err && <p role="alert" className="text-sm font-bold text-red-600">{err}</p>}
    <div className="flex gap-3"><button className="btn disabled:opacity-60" disabled={busy}>{busy ? "Saving…" : submitLabel}</button>{onCancel && <button type="button" onClick={onCancel} className="px-4 font-bold underline">Cancel</button>}</div>
  </form>;
}
