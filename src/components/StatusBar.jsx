import { GitBranch, Wifi, CircleDot } from "lucide-react";
import { navLinks, profile } from "../data/content";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { useTheme } from "../context/ThemeContext";

const fileNames = {
  home: "home.jsx",
  about: "about.jsx",
  skills: "skills.json",
  projects: "projects.jsx",
  experience: "experience.jsx",
  contact: "contact.jsx",
};

function StatusBar() {
  const active = useScrollSpy(navLinks.map((l) => l.to));
  const { dark } = useTheme();

  return (
    <div
      className="hidden sm:flex fixed bottom-0 left-0 right-0 h-7 z-[55] items-center justify-between px-4 mono text-[11px] border-t select-none"
      style={{ background: "var(--accent)", borderColor: "var(--accent)", color: "#10121A" }}
    >
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1">
          <GitBranch size={12} /> main
        </span>
        <span className="flex items-center gap-1">
          <CircleDot size={12} className="animate-pulse" /> {profile.availability}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span>{fileNames[active]}</span>
        <span className="hidden md:inline">UTF-8</span>
        <span className="hidden md:inline">{profile.location.split(",")[0]}</span>
        <span className="flex items-center gap-1">
          <Wifi size={12} /> {dark ? "dark" : "light"}-theme
        </span>
      </div>
    </div>
  );
}

export default StatusBar;
