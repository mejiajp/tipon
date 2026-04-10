import { Theme } from "@/types/theme";
import { create } from "zustand";

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  const resolved = theme === "system" ? getSystemTheme() : theme;

  root.classList.toggle("dark", resolved === "dark");
}

export const useThemeStore = create<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
  initTheme: () => void;
}>((set, get) => ({
  theme: "system",

  setTheme: (theme) => {
    localStorage.setItem("theme", theme);
    applyTheme(theme);
    set({ theme });
  },

  initTheme: () => {
    const saved = (localStorage.getItem("theme") as Theme) || "system";

    set({ theme: saved });
    applyTheme(saved);

    // system change listener
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handler = () => {
      if (get().theme === "system") {
        applyTheme("system");
      }
    };

    media.addEventListener("change", handler);
  },
}));
