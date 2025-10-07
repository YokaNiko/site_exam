// Thème clair/sombre avec préférence système + persistance
(() => {
  const STORAGE_KEY = "etw-theme";
  const btn = document.getElementById("btn-theme");
  const root = document.documentElement;

  const prefersDark = () =>
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  const getStored = () => localStorage.getItem(STORAGE_KEY);
  const apply = (mode) => {
    // mode: "dark" | "light"
    root.classList.toggle("theme-dark", mode === "dark");
    root.classList.toggle("theme-light", mode === "light");
    if (btn) btn.setAttribute("aria-pressed", mode === "dark" ? "true" : "false");
  };

  const init = () => {
    const stored = getStored();
    const mode = stored || (prefersDark() ? "dark" : "light");
    apply(mode);
  };

  const toggle = () => {
    const isDark = root.classList.contains("theme-dark");
    const next = isDark ? "light" : "dark";
    apply(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch (_) {}
  };

  // Sync si l’utilisateur change la préférence système
  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!getStored()) apply(e.matches ? "dark" : "light");
    });
  }

  document.addEventListener("DOMContentLoaded", init);
  if (btn) btn.addEventListener("click", toggle);
})();
