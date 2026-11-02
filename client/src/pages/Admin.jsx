import { NavLink, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutDashboard, Inbox, User, FolderKanban, Wrench, Briefcase, GraduationCap, Trophy, Award, Images, LogOut, Sun, Moon, ExternalLink } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { ease } from "../components/ui";
import PaletteMenu from "../components/PaletteMenu";
import { SECTIONS } from "./admin/config";
import Login from "./admin/Login";
import Dashboard from "./admin/Dashboard";
import Messages from "./admin/Messages";
import Profile from "./admin/Profile";
import Manager from "./admin/Manager";
const ICONS = { FolderKanban, Wrench, Briefcase, GraduationCap, Trophy, Award, Images };
const NAV = [["/admin", "Dashboard", LayoutDashboard, true], ["/admin/messages", "Messages", Inbox], ["/admin/profile", "Site content", User], ...Object.entries(SECTIONS).map(([k, s]) => [`/admin/${k}`, s.title, ICONS[s.icon]])];

function Shell() {
  const { logout } = useAuth(); const { theme, toggle } = useTheme(); const location = useLocation(); const { pathname } = location;
  const link = ({ isActive }) => `flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-bold transition-colors lg:rounded-none lg:px-5 ${isActive ? "" : "opacity-75 hover:opacity-100"}`;
  return <div className="min-vh lg:grid lg:grid-cols-[250px_1fr]">
    <Helmet><title>Admin</title><meta name="robots" content="noindex,nofollow" /></Helmet>
    <aside className="sticky top-0 z-20 border-b lg:h-[100svh] lg:border-b-0 lg:border-r" style={{ borderColor: "var(--line)", background: "var(--bg)" }}>
      <div className="flex items-center justify-between px-5 pb-2 pt-[calc(12px+env(safe-area-inset-top,0px))] lg:pb-4 lg:pt-6"><b>Admin</b>
        <div className="flex gap-2"><PaletteMenu /><a href="/" target="_blank" rel="noopener noreferrer" aria-label="View site" className="grid h-10 w-10 place-items-center rounded-full border" style={{ borderColor: "var(--line)" }}><ExternalLink size={16} /></a>
          <button onClick={toggle} aria-label="Toggle theme" className="grid h-10 w-10 place-items-center rounded-full border" style={{ borderColor: "var(--line)" }}>{theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}</button>
          <button onClick={logout} aria-label="Sign out" className="grid h-10 w-10 place-items-center rounded-full border" style={{ borderColor: "var(--line)" }}><LogOut size={16} /></button></div></div>
      <nav aria-label="Admin" className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:overflow-visible lg:px-0">
        {NAV.map(([to, l, Icon, end]) => <NavLink key={to} to={to} end={end} className={link} style={({ isActive }) => (isActive ? { background: "var(--acc)", color: "var(--on-acc)" } : undefined)}><Icon size={17} aria-hidden="true" />{l}</NavLink>)}</nav>
    </aside>
    <div className="min-w-0 px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
      <AnimatePresence mode="wait"><motion.div key={pathname} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease }}>
        <Routes location={location}>
          <Route index element={<Dashboard />} /><Route path="messages" element={<Messages />} /><Route path="profile" element={<Profile />} />
          {Object.entries(SECTIONS).map(([k, cfg]) => <Route key={k} path={k} element={<Manager cfg={cfg} />} />)}
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes></motion.div></AnimatePresence>
    </div></div>;
}
export default function Admin() {
  const { authed } = useAuth(); const { pathname } = useLocation();
  if (pathname === "/admin/login") return <Login />;
  return authed ? <Shell /> : <Navigate to="/admin/login" replace />;
}
