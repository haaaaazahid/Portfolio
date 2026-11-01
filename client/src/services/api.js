// Single place that talks to the backend. Unwraps { success, data } and throws readable errors.
const BASE = import.meta.env.VITE_API_URL || "/api";
export const getToken = () => sessionStorage.getItem("token") || "";
export const setToken = (t) => (t ? sessionStorage.setItem("token", t) : sessionStorage.removeItem("token"));

async function request(path, { method = "GET", body, form } = {}) {
  const headers = {};
  const t = getToken();
  if (t) headers.Authorization = `Bearer ${t}`;
  if (body) headers["Content-Type"] = "application/json";
  const res = await fetch(BASE + path, { method, headers, body: form || (body && JSON.stringify(body)) });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status === 401 && t) { setToken(""); window.dispatchEvent(new Event("auth:expired")); }
    throw new Error(json.error || "Request failed.");
  }
  return json.data;
}
const crud = (p) => ({
  list: (all) => request(`${p}${all ? "?all=1" : ""}`), get: (id) => request(`${p}/${id}`),
  create: (b) => request(p, { method: "POST", body: b }), update: (id, b) => request(`${p}/${id}`, { method: "PUT", body: b }), remove: (id) => request(`${p}/${id}`, { method: "DELETE" }),
});
export const api = {
  login: (b) => request("/auth/login", { method: "POST", body: b }),
  contact: (b) => request("/contact", { method: "POST", body: b }),
  profile: { get: () => request("/profile"), update: (b) => request("/profile", { method: "PUT", body: b }) },
  upload: (file) => { const f = new FormData(); f.set("image", file); return request("/uploads", { method: "POST", form: f }); },
  stats: () => request("/admin/stats"),
  messages: { list: () => request("/admin/messages"), read: (id) => request(`/admin/messages/${id}/read`, { method: "PATCH" }), remove: (id) => request(`/admin/messages/${id}`, { method: "DELETE" }) },
  projects: crud("/projects"), skills: crud("/skills"), experience: crud("/experience"), education: crud("/education"), achievements: crud("/achievements"), certificates: crud("/certificates"), gallery: crud("/gallery"),
};
