import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { api } from "../../services/api";
import useApi from "../../hooks/useApi";
import { ease } from "../../components/ui";
export default function Dashboard() {
  const { data, loading, error } = useApi(() => api.stats(), []);
  const cards = [["Projects", data?.projects, "/admin/projects"], ["Published", data?.published, "/admin/projects"], ["Drafts", data?.drafts, "/admin/projects"], ["Research projects", data?.research, "/admin/projects"], ["Coaching experiences", data?.coaching, "/admin/experience"], ["Achievements", data?.achievements, "/admin/achievements"], ["Media (gallery)", data?.media, "/admin/gallery"], ["Enquiries", data?.enquiries, "/admin/messages"], ["Unread", data?.unread, "/admin/messages"]];
  return <div><h1 className="mb-6 font-serif text-4xl sm:text-5xl">Dashboard</h1>
    {error && <p role="alert" className="note mb-4">{error}</p>}
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">{cards.map(([l, n, to], i) => <motion.div key={l} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: i * 0.07 }}>
      <Link to={to} className="block border p-5 transition-transform duration-300 hover:-translate-y-1" style={{ borderColor: "var(--line)", background: "var(--card)" }}><b className="block font-cond text-6xl font-black leading-none" style={{ color: "var(--acc)" }}>{loading ? "–" : n ?? 0}</b><span className="text-sm">{l}</span></Link></motion.div>)}</div>
    <p className="mt-8 max-w-[56ch]" style={{ color: "var(--mut)" }}>Everything you change here appears on the public site straight away. Start with <b>Site content</b> (bio, email, social links), then add <b>Certificates</b> and <b>Coaching gallery</b> photos.</p></div>;
}
