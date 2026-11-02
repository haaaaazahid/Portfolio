import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import useApi from "../hooks/useApi";
import { Words, Reveal, Magnetic, Marquee, Para, Loading } from "../components/ui";
import Gallery from "../components/Gallery";
import Certificates from "../components/Certificates";

const Cells = ({ items }) => <div className="grid border-t sm:grid-cols-2 lg:grid-cols-3" style={{ borderColor: "var(--line)" }}>
  {items.map((x, i) => <Reveal key={x._id || x.name || x.title} d={i * 0.05}><div className="border-b py-6 pr-6 transition-[padding] duration-300 hover:pl-3" style={{ borderColor: "var(--line)" }}><h3 className="text-xl font-bold">{x.name || x.title}</h3>{x.detail && <p style={{ color: "var(--mut)" }}>{x.detail}</p>}</div></Reveal>)}</div>;

const MOVES = ["Pull-ups", "Muscle-up progressions", "Front lever progressions", "Back lever", "Handstand", "L-sit", "Dips", "Push-ups", "Kickboxing combinations"];

export default function Coach() {
  const sk = useApi(() => api.skills.list(), []); const ach = useApi(() => api.achievements.list(), []); const ex = useApi(() => api.experience.list(), []);
  const specs = (sk.data || []).filter((s) => s.world === "coach");
  return <div>
    <Helmet><title>Coach</title><meta name="description" content="Calisthenics and kickboxing coaching — strength, movement and discipline." /></Helmet>
    <div className="wrap pb-20 pt-40"><Words text="Built through discipline." className="h-hero" /><Reveal d={0.5}><p className="lead mt-6">Movement, strength and discipline — developed through practice and shared through coaching.</p></Reveal><Para label="Photo slot: coach hero image" /></div>
    <Marquee items={["Calisthenics", "Kickboxing", "Strength", "Mobility", "Skill"]} />
    <div className="wrap">
      <section className="sec"><h2 className="h-sec">The journey</h2><Reveal><p className="max-w-[60ch]">I coach calisthenics and kickboxing, with Master Calisthenics India (MCI) and Train With Zahid (TWZ) as part of that journey.</p></Reveal>
        {ex.data?.filter((e) => e.world === "coach").map((e) => <p key={e._id} className="mt-2" style={{ color: "var(--mut)" }}>{e.role} · {e.org}</p>)}</section>
      <section className="sec"><h2 className="h-sec">Specialities</h2>{sk.loading ? <Loading /> : <Cells items={specs} />}</section>
      <section className="sec"><h2 className="h-sec">Movement library</h2><Reveal><ul className="m-0 list-none columns-1 p-0 font-cond text-[clamp(24px,3.4vw,40px)] font-extrabold uppercase leading-tight sm:columns-2">{MOVES.map((m) => <li key={m}>{m}</li>)}</ul></Reveal></section>
      <section className="sec"><h2 className="h-sec">Achievements</h2>{ach.loading ? <Loading /> : <Cells items={ach.data || []} />}</section>
      <section className="sec"><h2 className="h-sec">Certificates</h2><Certificates world="coach" /></section>
      <section className="sec"><h2 className="h-sec">Programmes</h2><p>Personal coaching · Group sessions · Calisthenics · Kickboxing · Strength and conditioning</p><span className="note mt-3">Details and pricing to be added.</span></section>
      <section className="sec"><h2 className="h-sec">Training gallery</h2><Gallery /></section>
      <section className="sec"><Magnetic><Link to="/contact" className="btn">Enquire about coaching</Link></Magnetic></section>
    </div>
  </div>;
}
