import { Mail, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { profile, navLinks } from "../data/content";

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function Footer() {
  return (
    <footer className="px-6 pt-14 pb-20 sm:pb-14 border-t" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="mono text-sm font-semibold mb-3">{profile.name}</div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Full-stack developer in Mumbai, building fast and reliable web products.
            </p>
          </div>
          <div>
            <div className="mono text-xs mb-3" style={{ color: "var(--text-faint)" }}># quick-links</div>
            <ul className="flex flex-col gap-2">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <button
                    onClick={() => scrollTo(l.to)}
                    className="text-sm"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mono text-xs mb-3" style={{ color: "var(--text-faint)" }}># connect</div>
            <div className="flex gap-3">
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="w-9 h-9 rounded-lg border flex items-center justify-center" style={{ borderColor: "var(--border)", color: "var(--text)" }}>
                <GithubIcon size={15} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-lg border flex items-center justify-center" style={{ borderColor: "var(--border)", color: "var(--text)" }}>
                <LinkedinIcon size={15} />
              </a>
              <a href={`mailto:${profile.email}`} aria-label="Email" className="w-9 h-9 rounded-lg border flex items-center justify-center" style={{ borderColor: "var(--border)", color: "var(--text)" }}>
                <Mail size={15} />
              </a>
            </div>
            <a
              href={profile.resumeUrl}
              download
              className="mono text-xs inline-block mt-4"
              style={{ color: "var(--accent)" }}
            >
              download-resume.pdf →
            </a>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t mono text-xs"
          style={{ borderColor: "var(--border)", color: "var(--text-faint)" }}
        >
          <span>© {new Date().getFullYear()} {profile.name}. Built with React + Tailwind + Framer Motion.</span>
          <button onClick={() => scrollTo("home")} className="flex items-center gap-1.5">
            Back to top <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
