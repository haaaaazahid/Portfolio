import { useEffect, useRef } from "react";
import { useToast } from "./Toast";
import { profile } from "../data/content";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

function EasterEgg() {
  const push = useToast();
  const progress = useRef(0);

  useEffect(() => {
    console.log(
      "%c👋 Hey, curious developer.",
      "font-size:16px;font-weight:700;color:#7dd3fc;"
    );
    console.log(
      "%cLike what you see under the hood? Let's talk — " + profile.email,
      "font-size:12px;color:#94a3b8;"
    );
    console.log(
      "%cBuilt with React 19, Vite, Tailwind CSS & Framer Motion.",
      "font-size:11px;color:#64748b;"
    );
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      const expected = KONAMI[progress.current];
      if (e.key.toLowerCase() === expected?.toLowerCase()) {
        progress.current += 1;
        if (progress.current === KONAMI.length) {
          push?.("🎉 You found it. Let's build something great together.", "success");
          progress.current = 0;
        }
      } else {
        progress.current = e.key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [push]);

  return null;
}

export default EasterEgg;
