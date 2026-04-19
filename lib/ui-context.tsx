"use client";

import { createContext, useContext, useEffect, useState } from "react";

type LangType = "en" | "ml";

type UIContextType = {
  dark: boolean;
  setDark: (v: boolean) => void;
  lang: LangType;
  setLang: (v: LangType) => void;
};

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(true);
  const [lang, setLang] = useState<LangType>("en");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedLang = localStorage.getItem("lang") as LangType | null;

    if (savedTheme === "dark") setDark(true);
    if (savedLang) setLang(savedLang);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  return (
    <UIContext.Provider value={{ dark, setDark, lang, setLang }}>
      {children}
    </UIContext.Provider>
  );
}

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within UIProvider");
  }
  return context;
};