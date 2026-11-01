import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import useApi from "../hooks/useApi";
import { Words, Reveal, Magnetic, Para, Loading } from "../components/ui";
import Certificates from "../components/Certificates";

export default function About() {
  const pr = useApi(() => api.profile.get(), []); const ed = useApi(() => api.education.list(), []); const ac = useApi(() => api.achievements.list(), []);
  return <div className="wrap pb-20 pt-40">
    <Helmet><title>About</title><meta name="description" content="Coach and full-stack developer — two worlds, one identity." /></Helmet>
    <Words text="Two worlds. One identity." className="h-hero" />
    <Reveal d={0.5}><p className="lead mt-6">{pr.data?.bio}</p></Reveal>
    <Para src={pr.data?.avatar} alt="Mohd Zahid Shaikh" label="Photo slot: portrait (upload in admin)" />
    <section className="sec mt-16"><h2 className="h-sec">The two worlds</h2>
      <div className="grid gap-8 md:grid-cols-2">
        <Reveal><h3 className="mb-2 text-xl font-bold">The Coach</h3><p style={{ color: "var(--mut)" }}>{pr.data?.coachIntro}</p><Link className="mt-3 inline-block font-bold underline" to="/coach">Enter the coach world</Link></Reveal>
        <Reveal d={0.1}><h3 className="mb-2 text-xl font-bold">The Developer</h3><p style={{ color: "var(--mut)" }}>{pr.data?.devIntro}</p><Link className="mt-3 inline-block font-bold underline" to="/developer">Enter the developer world</Link></Reveal>
      </div></section>
    <section className="sec"><h2 className="h-sec">Education</h2>{ed.loading ? <Loading /> : (ed.data || []).map((e) => <Reveal key={e._id}><p><b>{e.degree}</b><br />{e.institution}{e.end && ` · ${e.end}`}{e.grade && ` · ${e.grade}`}</p></Reveal>)}</section>
    <section className="sec"><h2 className="h-sec">Highlights</h2>{ac.loading ? <Loading /> : (ac.data || []).map((a, i) => <Reveal key={a._id} d={i * 0.05}><p className="border-b py-3" style={{ borderColor: "var(--line)" }}><b>{a.title}</b> — <span style={{ color: "var(--mut)" }}>{a.detail}</span></p></Reveal>)}</section>
    <section className="sec"><h2 className="h-sec">Certificates</h2><Certificates /></section>
    <section className="sec"><Magnetic><Link to="/contact" className="btn">Get in touch</Link></Magnetic></section>
  </div>;
}
