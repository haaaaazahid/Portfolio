import { useEffect, useState } from "react";
// const isDesktop = useMedia("(min-width: 768px)")
export default function useMedia(q) {
  const [m, set] = useState(() => matchMedia(q).matches);
  useEffect(() => { const l = matchMedia(q); const f = () => set(l.matches); f(); l.addEventListener("change", f); return () => l.removeEventListener("change", f); }, [q]);
  return m;
}
