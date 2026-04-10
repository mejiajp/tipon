"use client";

import { useThemeStore } from "@/stores/useThemeStore";

export default function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);

  return (
    <div className="flex gap-2">
      <button onClick={() => setTheme("light")}>☀️</button>
      <button onClick={() => setTheme("dark")}>🌙</button>
      <button onClick={() => setTheme("system")}>💻</button>

      <span className="ml-2 text-xs opacity-60">{theme}</span>
    </div>
  );
}
