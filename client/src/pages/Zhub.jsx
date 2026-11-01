import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import useApi from "../hooks/useApi";
import { Words, Reveal } from "../components/ui";

export default function Zhub() {
  const { data: p } = useApi(() => api.profile.get(), []);
  const z = p?.zhub || {};
  return <div className="wrap pb-20 pt-40">
    <Helmet><title>Zhub</title></Helmet>
    <Link to="/developer" className="text-sm font-bold underline">Back to Developer</Link>
    <Words text="Zhub. Building ideas." className="h-hero mt-4" /><Reveal d={0.4}><p className="lead mt-6">Founder: Mohd Zahid Shaikh.</p></Reveal>
    <div className="sec mt-16 grid gap-8 md:grid-cols-2">
      {[["Vision", z.vision], ["Mission", z.mission]].map(([h, t]) => <Reveal key={h}><h2 className="h-sec !text-[34px]">{h}</h2>{t ? <p>{t}</p> : <span className="note">Not added yet — set it in the admin. Nothing about users, revenue or funding is claimed.</span>}</Reveal>)}
    </div>
  </div>;
}
