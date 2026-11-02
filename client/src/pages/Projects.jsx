import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { api } from "../services/api";
import useApi from "../hooks/useApi";
import ProjectCard from "../components/ProjectCard";
import { Words, Loading } from "../components/ui";

export default function Projects() {
  const { data, loading, error } = useApi(() => api.projects.list(), []); const [cat, setCat] = useState("All");
  const cats = ["All", ...new Set((data || []).map((p) => p.category).filter(Boolean))]; const list = (data || []).filter((p) => cat === "All" || p.category === cat);
  return <div className="wrap pb-20 pt-40">
    <Helmet><title>Projects</title><meta name="description" content="Selected software projects." /></Helmet>
    <Words text="Selected projects." className="h-hero mb-10" />
    <div className="mb-6" role="group" aria-label="Filter by category">{cats.map((c) => <button key={c} className="tag" aria-pressed={cat === c} onClick={() => setCat(c)} style={cat === c ? { background: "var(--acc)", color: "var(--on-acc)", borderColor: "var(--acc)" } : undefined}>{c}</button>)}</div>
    {loading ? <Loading /> : error ? <span role="alert" className="note">{error}</span> : !list.length ? <span className="note">No projects in this category yet.</span>
      : <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">{list.map((p, i) => <ProjectCard key={p._id} p={p} i={i} />)}</div>}
  </div>;
}
