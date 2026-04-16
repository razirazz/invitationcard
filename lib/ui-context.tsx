"use client";

import { createContext, useContext, useEffect, useState } from "react";

const UIContext = createContext<any>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);
  const [lang, setLang] = useState("en");

  // Load from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedLang = localStorage.getItem("lang");

    if (savedTheme === "dark") setDark(true);
    if (savedLang) setLang(savedLang);
  }, []);

  // Apply theme
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  // Save language
  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  return (
    <UIContext.Provider value={{ dark, setDark, lang, setLang }}>
      {children}
    </UIContext.Provider>
  );
}

export const useUI = () => useContext(UIContext);