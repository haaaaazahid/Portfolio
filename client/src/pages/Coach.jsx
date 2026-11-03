import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { api } from "../services/api";
import useApi from "../hooks/useApi";
import PageShell, { Section } from "../components/PageShell";
import { Reveal, Magnetic, Marquee, Para, Loading } from "../components/ui";
import Certificates from "../components/Certificates";
import Gallery from "../components/Gallery";

const CARDS = [["/coach/disciplines", "Disciplines", "Everything I train and coach, organised by discipline."], ["/coach/movement-library", "Movement library", "Searchable movements with progressions and common mistakes."], ["/coach/mci", "MCI", "My coaching experience with Master Calisthenics India."],
  ["/coach/twz", "TWZ", "Train With Zahid: my coaching initiative."], ["/coach/programmes", "Programmes", "Coaching programmes offered and run."], ["/coach/athletes", "Athlete progress", "Progress stories, published with permission."]];
export default function Coach() {
  const ach = useApi(() => api.achievements.list(), []); const pr = useApi(() => api.profile.get(), []);
  return <PageShell world="coach" title="Built through discipline." lead={pr.data?.coachIntro || "Movement, strength and discipline, developed through practice and shared through coaching."} desc="Calisthenics and kickboxing coaching: strength, movement and discipline.">
    <Para label="Photo slot: coach hero image" />
    <div className="mt-12 grid gap-0 border-t sm:grid-cols-2 lg:grid-cols-3" style={{ borderColor: "var(--line)" }}>
      {CARDS.map(([to, t, d], i) => <Reveal key={to} d={i * 0.05}><Link to={to} className="block h-full border-b py-6 pr-6 transition-[padding] duration-300 hover:pl-3" style={{ borderColor: "var(--line)" }}><h3 className="font-cond text-3xl font-black uppercase">{t}</h3><p style={{ color: "var(--mut)" }}>{d}</p></Link></Reveal>)}</div>
    <div className="-mx-5 mt-12 sm:-mx-8 lg:-mx-10"><Marquee items={["Calisthenics", "Kickboxing", "Strength", "Mobility", "Skill"]} /></div>
    <Section title="Achievements">{ach.loading ? <Loading /> : (ach.data || []).filter((a) => a.world === "coach").map((a, i) => <Reveal key={a._id} d={i * 0.05}><p className="border-b py-3" style={{ borderColor: "var(--line)" }}><b>{a.title}</b>{a.detail && <> — <span style={{ color: "var(--mut)" }}>{a.detail}</span></>}</p></Reveal>)}</Section>
    <Section title="Certificates"><Certificates world="coach" /></Section>
    <Section title="Training gallery"><Gallery /></Section>
    <section className="sec"><Magnetic><Link to="/contact?topic=Coaching" className="btn">Enquire about coaching</Link></Magnetic></section>
  </PageShell>;
}
