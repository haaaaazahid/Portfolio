import { useState } from "react";
import { api } from "../../services/api";
import useApi from "../../hooks/useApi";
import Form from "./Form";
import { PROFILE_FIELDS } from "./config";
export default function Profile() {
  const { data, loading, error, reload } = useApi(() => api.profile.get(), []); const [ok, setOk] = useState("");
  return <div><h1 className="mb-6 font-serif text-4xl sm:text-5xl">Site content</h1>
    {loading ? <p role="status" className="note">Loading…</p> : error ? <p role="alert" className="note">{error}</p> : <div className="max-w-[640px]">
      <Form fields={PROFILE_FIELDS} initial={data} submitLabel="Save changes" onSubmit={async (v) => { await api.profile.update(v); setOk("Saved. Changes are live on the public site."); reload(); }} />
      <p role="status" className="mt-4 font-bold" style={{ color: "var(--acc)" }}>{ok}</p></div>}</div>;
}
