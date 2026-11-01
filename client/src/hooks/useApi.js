import { useEffect, useState, useCallback } from "react";
// const { data, loading, error, reload } = useApi(() => api.projects.list(), [])
export default function useApi(fn, deps = []) {
  const [s, set] = useState({ data: null, loading: true, error: "" });
  const run = useCallback(() => { set((p) => ({ ...p, loading: true, error: "" })); return fn().then((data) => set({ data, loading: false, error: "" })).catch((e) => set({ data: null, loading: false, error: e.message })); }, deps); // eslint-disable-line
  useEffect(() => { run(); }, [run]);
  return { ...s, reload: run };
}
