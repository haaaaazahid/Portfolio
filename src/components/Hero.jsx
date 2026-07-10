import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, FileDown, Mail } from "lucide-react";
import profileImg from "../assets/profile.jpg";
import { profile } from "../data/content";
import { useTypewriter } from "../hooks/useTypewriter";
import { useResumeModal } from "../App";

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function Hero() {
  const typed = useTypewriter(profile.roles);
  const openResume = useResumeModal();

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-14 overflow-hidden"
    >
      {/* ambient background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full blur-[110px] opacity-40 animate-float-slow"
          style={{ background: "var(--accent)" }}
        />
        <div
          className="absolute bottom-0 -right-24 w-[380px] h-[380px] rounded-full blur-[110px] opacity-30 animate-float-slower"
          style={{ background: "var(--accent-2)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mono text-xs px-3 py-1.5 rounded-full border mb-8 flex items-center gap-2"
        style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
      >
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent-2)" }} />
        {profile.availability}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative mb-8"
      >
        <div
          className="absolute inset-[-10px] rounded-full border border-dashed opacity-60"
          style={{ borderColor: "var(--accent)" }}
        />
        <img
          src={profileImg}
          alt={profile.name}
          className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-2"
          style={{ borderColor: "var(--accent)" }}
        />
        <span
          className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 rounded-full border-2"
          style={{ background: "var(--accent-2)", borderColor: "var(--bg)" }}
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-[13vw] leading-[0.95] sm:text-6xl md:text-7xl font-bold tracking-tight mb-5 text-balance"
      >
        {profile.name.split(" ")[0]}{" "}
        <span style={{ color: "var(--accent)" }}>{profile.name.split(" ").slice(1).join(" ")}</span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="mono text-sm sm:text-base mb-7 h-6 flex items-center gap-1"
        style={{ color: "var(--text-muted)" }}
      >
        <span style={{ color: "var(--accent-2)" }}>&gt;</span> {typed}
        <span className="blink-caret" style={{ color: "var(--accent)" }}>▌</span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="max-w-xl text-[15px] sm:text-base leading-relaxed mb-9 text-balance"
        style={{ color: "var(--text-muted)" }}
      >
        {profile.tagline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55 }}
        className="flex flex-wrap justify-center gap-3 mb-14"
      >
        <button
          onClick={() => scrollTo("contact")}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold transition-transform hover:-translate-y-0.5"
          style={{ background: "var(--accent)", color: "#10121A" }}
        >
          Hire Me <ArrowUpRight size={15} />
        </button>
        <button
          onClick={() => scrollTo("projects")}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold border transition-colors"
          style={{ borderColor: "var(--border-strong)", color: "var(--text)" }}
        >
          View Projects
        </button>
        <button
          onClick={openResume}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold border transition-colors"
          style={{ borderColor: "var(--border-strong)", color: "var(--text)" }}
        >
          <FileDown size={15} /> Resume
        </button>
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold border transition-colors"
          style={{ borderColor: "var(--border-strong)", color: "var(--text)" }}
        >
          <Mail size={15} /> Contact
        </a>
      </motion.div>

      <motion.button
        onClick={() => scrollTo("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{ opacity: { delay: 0.9, duration: 0.6 }, y: { repeat: Infinity, duration: 1.6 } }}
        aria-label="Scroll to About"
        className="mb-6"
        style={{ color: "var(--text-faint)" }}
      >
        <ArrowDown size={18} />
      </motion.button>
    </section>
  );
}

export default Hero;
