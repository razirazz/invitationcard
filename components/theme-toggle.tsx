"use client";

import { useUI } from "../lib/ui-context";

export default function ThemeToggle() {
  const { dark, setDark } = useUI();

  return (
    <button
      onClick={() => setDark(!dark)}
      className="glass px-4 py-2 rounded-xl"
    >
      {dark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}