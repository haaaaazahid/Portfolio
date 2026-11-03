import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { api } from "../services/api";
import { Words, Magnetic, Reveal } from "../components/ui";
import useApi from "../hooks/useApi";

const CATS = ["Software development employment", "Freelance and technical collaboration", "Coaching", "Business and product collaboration", "Other"];
const match = (t) => CATS.find((c) => c.toLowerCase().startsWith((t || "").toLowerCase())) || CATS[0];
const input = "field";
export default function Contact() {
  const [sp] = useSearchParams();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ defaultValues: { category: match(sp.get("topic")) } });
  const { data: prof } = useApi(() => api.profile.get(), []);
  const [status, setStatus] = useState({ ok: false, msg: "" });
  const onSubmit = async (v) => {
    setStatus({ ok: false, msg: "" });
    try { await api.contact(v); reset(); setStatus({ ok: true, msg: "Message sent. I’ll reply by email." }); }
    catch (e) { setStatus({ ok: false, msg: e.message }); }
  };
  const err = (k) => errors[k] && <span role="alert" className="text-sm text-red-600">{errors[k].message}</span>;
  return (
    <div className="wrap pb-16 pt-40">
      <Helmet><title>Contact</title></Helmet>
      <Words text="Let’s talk." className="h-hero" />
      <Reveal d={0.4}><p className="lead mb-8 mt-6">Choose the kind of enquiry below so it reaches the right conversation: employment, freelance work, coaching or business collaboration.</p>
        <div className="mb-10">{prof?.email && <p><a className="font-bold underline" href={`mailto:${prof.email}`}>{prof.email}</a></p>}
          {(prof?.socials || []).filter((x) => x.url).map((x) => <a key={x.label} className="tag" href={x.url} target="_blank" rel="noopener noreferrer">{x.label}</a>)}
          {prof && !prof.email && !prof.socials?.length && <span className="note">Email and social links to be added in the admin.</span>}</div></Reveal>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid max-w-[560px] gap-3">
        <input className={input} placeholder="Name" aria-label="Name" {...register("name", { required: "Name is required." })} />{err("name")}
        <input className={input} type="email" placeholder="Email" aria-label="Email" {...register("email", { required: "Email is required.", pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email." } })} />{err("email")}
        <select className={input} aria-label="Enquiry category" {...register("category")}>{CATS.map((c) => <option key={c}>{c}</option>)}</select>
        <input className={input} placeholder="Subject" aria-label="Subject" {...register("subject", { required: "Subject is required." })} />{err("subject")}
        <textarea className={input} rows="6" placeholder="Message" aria-label="Message" {...register("message", { required: "Message is required.", minLength: { value: 10, message: "Message is too short." } })} />{err("message")}
        <input tabIndex="-1" autoComplete="off" aria-hidden="true" className="hidden" {...register("website")} />
        <div><Magnetic><button className="btn disabled:opacity-60" disabled={isSubmitting}>{isSubmitting ? "Sending…" : "Send message"}</button></Magnetic></div>
        <p role="status" className={status.ok ? "" : "text-red-600"}>{status.msg}</p>
      </form>
    </div>
  );
}
