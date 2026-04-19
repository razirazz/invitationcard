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

        {/* BOX 1 — Names */}
        <div className="relative glass p-5 h-[50vh] md:h-auto md:p-10 flex flex-col md:items-end justify-start md:text-end gap-3 overflow-hidden">

          <BackgroundAnimation />

          <h1
            className={`font-bold text-wrap gold ${lang === "ml"
                ? "text-3xl leading-relaxed tracking-wide"
                : "text-4xl"
              }`}
          >
            {t.title}
          </h1>

          <div className="flex flex-col justify-end items-start sm:items-end gap-3 ">
            <div className="flex-col ">
              <p >
                {lang === "en"
                  ? "Bride's Parents"
                  : "വധുവിന്റെ മാതാപിതാക്കള്‍"}
                :
              </p>
              <p className="font-bold">{t.brideP}</p>
            </div>

            <div className="flex-col justify-start ">
              <p>
                {lang === "en"
                  ? "Groom's Parents"
                  : "വരന്റെ മാതാപിതാക്കള്‍"}
                :
              </p>
              <p className="font-bold">{t.groomP}</p>
            </div>
          </div>

        </div>

        {/* BOX 2 — Other Data */}
        <div className="glass p-4 md:p-8 flex flex-col gap-4">

          {/* Event */}
          <p className="gold text-lg">
            {t.event}
          </p>

          {/* Details */}
          <div className="space-y-1">
            <b><p className="text-[18px]">{t.date}</p>
            <p>{t.time}</p>
            <p>{t.venue}</p></b>
          </div>

          {/* Countdown */}
          <div className="mt-2">
            <p className="text-lg mb-2">
              {lang === "en"
                ? "Countdown to Marriage"
                : "വിവാഹതിലെക്കുള്ള സമയം"}
            </p>

            <Countdown />
          </div>

          {/* RSVP Button */}
          <Link href="/rsvp">
            <button className="mt-4 px-6 py-3 rounded-xl glass gold font-semibold shadow-md hover:scale-105 transition">
              {lang === "en"
                ? "For Customized Invitation Card, Click Here" 
                : "കസ്ടമൈസ്ട് ക്ഷണകത്തിനായി, ഇവിടെ ക്ലിക്ക് ചെയ്യുക"}
            </button>
          </Link>

        </div>

      </div>

      <div>
        Coded with ❤️ <Link href="https://www.instagram.com/ra_zi_ra_zz/">Razeena CP</Link>
      </div>

    </main>
  );
}