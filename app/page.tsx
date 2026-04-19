"use client";

import BackgroundAnimation from "@/components/bg/bg2";
import Countdown from "@/components/countdown";
import LangToggle from "@/components/lang-toggle";
import Loader from "@/components/loader";
import ThemeToggle from "@/components/theme-toggle";
import { content } from "@/lib/content";
import { useUI } from "@/lib/ui-context";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const { lang } = useUI();
  const t = content[lang];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // adjust timing

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 p-6">

      {/* Toggles (UNCHANGED) */}
      <div className="flex gap-4">
        <LangToggle />
        <ThemeToggle />
      </div>

      <div className="flex-col">
        <p className="text-sm md:text-base 
          tracking-wide 
          italic  
          text-center">السلام  عليكم  ورحمت الله وبركاته</p>
        <p
          className="text-sm md:text-base 
          tracking-wide 
          italic  
          text-center"
        >
          {lang === "en"
            ? "In the name of Allah, the Most Gracious, the Most Merciful"
            : "അല്ലാഹുവിന്റെ നാമത്തിൽ, ഏറ്റവും കരുണാനിധിയും അത്യന്തം ദയാവാനുമായ"}
        </p>
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
            <b><p>{t.date}</p>
              <p>{t.time}</p>
              <p>{t.venue}</p></b>
          </div>

          {/* Countdown */}
          <div className="mt-1 ">
            <p className=" mb-2">
              {lang === "en"
                ? "Countdown to Marriage"
                : "വിവാഹത്തിലെക്കുള്ള സമയം"}
            </p>

            <Countdown />
          </div>

          <p
            className="text-center mt-1 px-6 py-3 rounded-xl font-semibold shadow-md" >
            &#9825;&nbsp;&nbsp;&nbsp;&nbsp;
            {lang === "en"
              ? "In-sha-Allah"
              : "ഇൻഷാ അല്ലാഹ്"}
            &nbsp;&nbsp;&nbsp;&#9825;
          </p>

          {/* RSVP Button */}
          <Link href="/rsvp">
            <button className="text-sm md:text-base text-center mt-1 underline underline-offset-4">
              {lang === "en"
                ? "For Customized Invitation Card, Click Here"
                : "കസ്ടമൈസ്ട് ക്ഷണകത്തിനായി, ഇവിടെ ക്ലിക്ക് ചെയ്യുക"}
            </button>
          </Link>

        </div>

      </div>



      <div>
        Coded with ❤️ <Link href="https://www.instagram.com/ra_zi_ra_zz/" className="underline underline-offset-4">Razeena CP</Link>
      </div>

    </main>
  );
}