import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { dark, setDark } = useTheme();

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b
                    bg-white/80 border-slate-200
                    dark:bg-slate-950/80 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center py-4">

        <span className="font-bold text-lg text-slate-800 dark:text-white tracking-tight">
          MZS <span className="text-violet-500">.</span>
        </span>

        <ul className="flex gap-6 font-medium text-sm
                       text-slate-600 dark:text-slate-300 list-none m-0 p-0">
          {[
            { label: "Home",         to: "/" },
            { label: "About",        to: "/about" },
            { label: "Skills",       to: "/skills" },
            { label: "Projects",     to: "/projects" },
            { label: "Achievements", to: "/achievements" },
            { label: "Contact",      to: "/contact" },
          ].map(({ label, to }) => (
            <li key={label}>
              <Link
                to={to}
                className="hover:text-violet-500 transition-colors duration-200"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setDark(!dark)}
          aria-label="Toggle theme"
          className="w-9 h-9 rounded-full flex items-center justify-center
                     border text-base
                     border-slate-300 dark:border-slate-700
                     hover:border-violet-500 transition-all
                     text-slate-700 dark:text-slate-200"
        >
          {dark ? "☀️" : "🌙"}
        </button>

      </div>
    </nav>
  );
}

export default Navbar;