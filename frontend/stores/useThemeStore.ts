import { Theme, ThemeMode } from "@/types/theme";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeStore = {
  mode: ThemeMode;
  theme: Theme | null;

  setMode: (mode: ThemeMode) => void;
  setTheme: (theme: Theme) => void;

  applyTheme: () => void;
  initTheme: () => void;
};

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyToDOM(theme: "light" | "dark") {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      mode: "system",
      theme: null,

      setMode: (mode) => {
        if (mode === "system") {
          set({ mode, theme: getSystemTheme() });
        } else {
          set({ mode });
        }
        get().applyTheme();
      },

      setTheme: (theme) => {
        set({ theme, mode: "manual" });
        get().applyTheme();
      },

      applyTheme: () => {
        const { mode, theme } = get();
        const resolved =
          mode === "system" ? getSystemTheme() : theme ?? getSystemTheme();
        applyToDOM(resolved);
      },

      initTheme: () => {
        const { applyTheme } = get();

        applyTheme();

        const media = window.matchMedia("(prefers-color-scheme: dark)");

        const handler = () => {
          const { mode } = get();
          if (mode === "system") {
            set({ theme: getSystemTheme() });
            get().applyTheme();
          }
        };
        media.addEventListener("change", handler);
      },
    }),
    {
      name: "theme-store",
      partialize: (state) => ({
        mode: state.mode,
        theme: state.theme,
      }),
    }
  )
);
