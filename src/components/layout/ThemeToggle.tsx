"use client";

import { THEME_KEY, type Theme } from "@/lib/theme";

function currentTheme(): Theme {
  const chosen = document.documentElement.dataset.theme;
  if (chosen === "light" || chosen === "dark") return chosen;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// The label is picked by CSS, so it is right on first paint before this hydrates.
export function ThemeToggle() {
  function toggle() {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex min-h-9 items-center rounded-full border border-line bg-card px-3.5 text-sm text-ink transition-colors duration-300 hover:border-plate-line"
    >
      <span className="dark:hidden">
        <span className="sr-only">Switch to </span>Dark<span className="sr-only"> theme</span>
      </span>
      <span className="hidden dark:inline">
        <span className="sr-only">Switch to </span>Light<span className="sr-only"> theme</span>
      </span>
    </button>
  );
}
