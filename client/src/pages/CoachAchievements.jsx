import { api } from "../services/api";
import useApi from "../hooks/useApi";
import PageShell, { Section } from "../components/PageShell";
import Certificates from "../components/Certificates";
import { Reveal, Loading } from "../components/ui";
export default function CoachAchievements() {
  const ach = useApi(() => api.achievements.list(), []); const list = (ach.data || []).filter((a) => a.world === "coach");
  return <PageShell world="coach" title="Achievements." lead="Verified achievements and qualifications from my athletic and coaching journey.">
    {ach.loading ? <Loading /> : !list.length ? <span className="note">Achievements will appear here once added.</span> : list.map((a, i) => <Reveal key={a._id} d={i * 0.05}><p className="border-b py-4 text-lg" style={{ borderColor: "var(--line)" }}><b>{a.title}</b>{a.detail && <> — <span style={{ color: "var(--mut)" }}>{a.detail}</span></>}</p></Reveal>)}
    <Section title="Certificates"><Certificates world="coach" /></Section>
  </PageShell>;
}
