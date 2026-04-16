"use client";

import Countdown from "@/components/countdown";
import LangToggle from "@/components/lang-toggle";
import ThemeToggle from "@/components/theme-toggle";
import { content } from "@/lib/content";
import { useUI } from "@/lib/ui-context";
import Link from "next/link";

// import ThemeToggle from "./components/theme-toggle";
// import LangToggle from "./components/lang-toggle";
// import { useUI } from "./lib/ui-context";
// import { content } from "./lib/content";

export default function Home() {
  const { lang } = useUI();
  const t = content[lang];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">

      {/* Toggles */}
      <div className="flex gap-4">
        <LangToggle />
        <ThemeToggle />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-center">
        {t.title}
      </h1>

      {/* Event */}
      <p className="gold text-lg">{t.event}</p>

      {/* Details */}
      <div className="glass p-6 text-center max-w-md">
        <p>{t.date}</p>
        <p>{t.time}</p>
        <p>{t.venue}</p>
      </div>

      <div className="flex flex-col items-center gap-3 mt-6">
        <p className="text-lg">
          {lang === "en" ? "Countdown to Nikkah" : "നിക്കാഹിലേക്ക് സമയം"}
        </p>
        <Countdown />
      </div>

      <Link href="/rsvp">
        <button className="mt-6 px-6 py-3 glass rounded-xl">
          {lang === "en" ? "RSVP Now" : "ഇപ്പോൾ പ്രതികരിക്കുക"}
        </button>
      </Link>
    </main>
  );
}