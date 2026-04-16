"use client";

import { useUI } from "../lib/ui-context";

export default function LangToggle() {
  const { lang, setLang } = useUI();

  return (
    <button
      onClick={() => setLang(lang === "en" ? "ml" : "en")}
      className="glass px-4 py-2 rounded-xl"
    >
      {lang === "en" ? "മലയാളം" : "English"}
    </button>
  );
}