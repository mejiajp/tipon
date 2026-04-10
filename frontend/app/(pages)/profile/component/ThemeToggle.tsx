"use client";

import { useThemeStore } from "@/stores/useThemeStore";

export default function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme);
  const mode = useThemeStore((s) => s.mode);
  const setTheme = useThemeStore((s) => s.setTheme);
  const setMode = useThemeStore((s) => s.setMode);

  const toggleMode = () => {
    setMode(mode === "system" ? "manual" : "system");
  };

  return (
    <div>
      <h3>Appearance</h3>

      <div className="bg-bg p-base rounded-base ">
        <div className="flex justify-between items-center gap-3 mb-base">
          <p>Use device setings</p>
          {/* Toggle */}
          <button
            onClick={toggleMode}
            className={`relative w-16 h-8 p-1 flex items-center rounded-full transition-colors duration-300 ease-in-out ${
              mode === "system" ? "bg-primary" : "bg-gray"
            }`}
          >
            <span
              className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out ${
                mode === "system" ? "translate-x-8" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        <div
          className={`flex flex-col gap-2  ${
            mode === "system" ? "pointer-events-none opacity-50 " : ""
          }`}
        >
          <div className="flex justify-between items-center">
            <p>Light</p>
            <button
              onClick={() => setTheme("light")}
              className={`relative w-8 h-8 p-1 flex items-center ring-1 ring-inset rounded-full transition-colors duration-300 ease-in-out ${
                theme === "light"
                  ? "bg-white ring-5 ring-primary "
                  : " ring-gray"
              }`}
            />
          </div>
          <div className="flex justify-between items-center">
            <p>Dark</p>

            <button
              onClick={() => setTheme("dark")}
              className={`relative w-8 h-8 p-1 flex items-center ring-1 ring-inset rounded-full transition-colors duration-300 ease-in-out ${
                theme === "dark"
                  ? "bg-white ring-5 ring-primary "
                  : " ring-gray "
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
