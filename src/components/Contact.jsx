import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Copy, Send, MessageCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import SectionHeading from "./SectionHeading";
import { profile } from "../data/content";
import { useToast } from "./Toast";

const initialForm = { name: "", email: "", phone: "", subject: "", message: "" };

function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const toast = useToast();

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Message can't be empty";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) {
      toast?.("Please fix the highlighted fields", "error");
      return;
    }
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name} (${form.email}${form.phone ? `, ${form.phone}` : ""})`
    );
    const subject = encodeURIComponent(form.subject || `Portfolio inquiry from ${form.name}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    toast?.("Opening your email client...");
    setForm(initialForm);
  };

  const copy = (value, label) => {
    navigator.clipboard?.writeText(value);
    toast?.(`${label} copied to clipboard`);
  };

  const field = (name, label, type = "text", area = false) => (
    <div>
      <label className="mono text-[11px] block mb-1.5" style={{ color: "var(--text-faint)" }}>
        {label}
      </label>
      {area ? (
        <textarea
          rows={4}
          value={form[name]}
          onChange={(e) => setForm((f) => ({ ...f, [name]: e.target.value }))}
          className="w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none resize-none"
          style={{
            borderColor: errors[name] ? "var(--danger)" : "var(--border)",
            background: "var(--surface)",
            color: "var(--text)",
          }}
        />
      ) : (
        <input
          type={type}
          value={form[name]}
          onChange={(e) => setForm((f) => ({ ...f, [name]: e.target.value }))}
          className="w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none"
          style={{
            borderColor: errors[name] ? "var(--danger)" : "var(--border)",
            background: "var(--surface)",
            color: "var(--text)",
          }}
        />
      )}
      {errors[name] && <p className="text-xs mt-1" style={{ color: "var(--danger)" }}>{errors[name]}</p>}
    </div>
  );

  const contacts = [
    { icon: Mail, label: "Email", value: profile.email, action: () => copy(profile.email, "Email"), href: `mailto:${profile.email}` },
    { icon: Phone, label: "Phone", value: `${profile.phone} / ${profile.phoneAlt}`, action: () => copy(profile.phone, "Phone"), href: `tel:${profile.phoneHref}` },
    { icon: MapPin, label: "Location", value: profile.location, href: null },
    { icon: LinkedinIcon, label: "LinkedIn", value: "Mohd Zahid Shaikh", href: profile.linkedin },
    { icon: GithubIcon, label: "GitHub", value: "haaaaazahid", href: profile.github },
  ];

  return (
    <section id="contact" className="px-6 py-24 sm:py-28">
      <div className="max-w-4xl mx-auto">
        <SectionHeading path="contact.jsx" title="Let's" accent="Connect" align="center" subtitle="Open to full-time roles, freelance projects, and internships." />

        <div className="grid md:grid-cols-[1fr_1.1fr] gap-8 mt-12">
          <div className="flex flex-col gap-3">
            {contacts.map(({ icon: Icon, label, value, action, href }) => {
              const content = (
                <>
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
                  >
                    <Icon size={16} />
                  </div>
                  <div className="min-w-0">
                    <div className="mono text-[10.5px]" style={{ color: "var(--text-faint)" }}>{label}</div>
                    <div className="text-sm font-medium truncate">{value}</div>
                  </div>
                </>
              );
              return (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-xl border px-4 py-3"
                  style={{ borderColor: "var(--border)", background: "var(--surface)" }}
                >
                  {href ? (
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="flex items-center gap-3 flex-1 min-w-0">
                      {content}
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 flex-1 min-w-0">{content}</div>
                  )}
                  {action && (
                    <button onClick={action} aria-label={`Copy ${label}`} style={{ color: "var(--text-faint)" }}>
                      <Copy size={14} />
                    </button>
                  )}
                </div>
              );
            })}

            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 mt-2 text-sm font-semibold"
              style={{ background: "var(--accent-2)", color: "#08150F" }}
            >
              <MessageCircle size={16} /> Message on WhatsApp
            </a>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            noValidate
            className="rounded-xl border p-6 flex flex-col gap-4"
            style={{ borderColor: "var(--border)", background: "var(--surface)" }}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              {field("name", "Name")}
              {field("email", "Email", "email")}
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {field("phone", "Phone (optional)", "tel")}
              {field("subject", "Subject (optional)")}
            </div>
            {field("message", "Message", "text", true)}
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold mt-1"
              style={{ background: "var(--accent)", color: "#10121A" }}
            >
              <Send size={15} /> Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
