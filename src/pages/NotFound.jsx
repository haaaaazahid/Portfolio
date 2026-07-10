import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mono text-sm mb-3" style={{ color: "var(--accent)" }}>
          Error 404
        </div>
        <h1 className="text-6xl sm:text-7xl font-bold mb-4">
          route<span style={{ color: "var(--accent)" }}>.not.found</span>
        </h1>
        <p className="mono text-sm mb-8" style={{ color: "var(--text-muted)" }}>
          {"// this page doesn't exist in the build. redirecting you home is safer than a 500."}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold"
          style={{ background: "var(--accent)", color: "#10121A" }}
        >
          <Home size={15} /> Back to Home
        </Link>
      </motion.div>
    </div>
  );
}

export default NotFound;
