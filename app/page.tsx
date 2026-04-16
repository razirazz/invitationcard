"use client";

import BackgroundAnimation from "@/components/bg/bg2";
import Countdown from "@/components/countdown";
import LangToggle from "@/components/lang-toggle";
import ThemeToggle from "@/components/theme-toggle";
import { content } from "@/lib/content";
import { useUI } from "@/lib/ui-context";
import Link from "next/link";

export default function Home() {
  const { lang } = useUI();
  const t = content[lang];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 p-6">

      {/* Toggles (UNCHANGED) */}
      <div className="flex gap-4">
        <LangToggle />
        <ThemeToggle />
      </div>


      {/* TWO COLUMN LAYOUT */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">

        <BackgroundAnimation />
        {/* BOX 1 — Names */}
        <div className="bg-amber-700 p-10 flex-col items-end justify-between text-end">
          <h1 className={`font-bold bg-red-500 ${lang === "ml"
              ? "text-3xl leading-relaxed tracking-wide"
              : "text-4xl"
            }`}>
            {t.title}
          </h1>
          <div className="flex-col justify-end items-end">
            <div className="flex justify-end">
              <p>{
                lang === 'en' ? "Bride's Parents" : "വധുവിന്റെ മാതാപിതാക്കള്‍"
              }:&nbsp;</p>
              <p>{t.brideP}</p>
            </div>
            <div className="flex justify-end">
              <p>{
                lang === 'en' ? "Groom's Parents" : "വരന്റെ മാതാപിതാക്കള്‍"
              }:&nbsp;</p>
              <p>{t.groomP}</p>
            </div>
          </div>
        </div>

        {/* BOX 2 — Other Data */}
        <div className="glass p-8 flex flex-col gap-4">

          {/* Event */}
          <p className="gold text-lg">
            {t.event}
          </p>

          {/* Details */}
          <div className="space-y-1">
            <p>{t.date}</p>
            <p>{t.time}</p>
            <p>{t.venue}</p>
          </div>

          {/* Countdown */}
          <div className="mt-2">
            <p className="text-lg mb-2">
              {lang === "en"
                ? "Countdown to Nikkah"
                : "നിക്കാഹിലേക്ക് സമയം"}
            </p>

            <Countdown />
          </div>

          {/* RSVP Button */}
          <Link href="/rsvp">
            <button className="mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-[#c9a646] to-[#e5c76b] text-black font-semibold shadow-md hover:scale-105 transition">
              {lang === "en"
                ? "RSVP Now"
                : "ഇപ്പോൾ പ്രതികരിക്കുക"}
            </button>
          </Link>

        </div>

      </div>

    </main>
  );
}