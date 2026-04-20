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

  const mapUrl =
    "https://www.google.com/maps?q=Kottalath+Gardenia+Chettippadi";

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center px-4 md:px-6 py-10 gap-10">

      {/* ✨ Background Gradient */}
      <div className="absolute inset-0 " />

      {/* 🌙 Opening Text */}
      <div className="text-center space-y-2 max-w-xl">
        <p className="text-sm md:text-base italic opacity-80 tracking-wide">
          السلام عليكم ورحمة الله وبركاته
        </p>

        <p className="text-sm md:text-base italic opacity-70">
          {lang === "en"
            ? "In the name of Allah, the Most Gracious, the Most Merciful"
            : "അല്ലാഹുവിന്റെ നാമത്തിൽ, ഏറ്റവും കരുണാനിധിയും അത്യന്തം ദയാവാനുമായ"}
        </p>
      </div>

      {/* 🧩 MAIN GRID */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

        {/* 🟡 BOX 1 — NAMES */}
        <div className="relative glass p-6 md:p-10 flex flex-col justify-between gap-6 overflow-hidden">

          <BackgroundAnimation />

          <h1
            className={`font-bold gold leading-tight ${
              lang === "ml"
                ? "text-3xl md:text-4xl leading-relaxed"
                : "text-3xl md:text-5xl"
            }`}
          >
            {t.title}
          </h1>

          <div className="flex flex-col gap-4 text-sm md:text-base">

            <div>
              <p className="opacity-70">
                {lang === "en"
                  ? "Bride's Parents"
                  : "വധുവിന്റെ മാതാപിതാക്കള്‍"}
              </p>
              <p className="font-semibold">{t.brideP}</p>
            </div>

            <div>
              <p className="opacity-70">
                {lang === "en"
                  ? "Groom's Parents"
                  : "വരന്റെ മാതാപിതാക്കള്‍"}
              </p>
              <p className="font-semibold">{t.groomP}</p>
            </div>

          </div>
        </div>

        {/* 🔵 BOX 2 — DETAILS */}
        <div className="glass p-6 md:p-10 flex flex-col gap-6">

          {/* Event */}
          <p className="gold text-lg md:text-xl tracking-wide">
            {t.event}
          </p>

          {/* Details */}
          <div className="space-y-1 text-sm md:text-base font-semibold">
            <p>{t.date}</p>
            <p>{t.time}</p>
            <p className="opacity-80">{t.venue}</p>
          </div>

          {/* 📍 Map Button */}
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              w-full
              px-5 py-3
              rounded-xl
              bg-gradient-to-r from-[#c9a646] to-[#f1d77a]
              text-black font-semibold
              text-center
              shadow-md
              hover:scale-[1.03]
              transition
            "
          >
            📍 {lang === "en" ? "Get Directions" : "വഴി കാണുക"}
          </a>

          {/* Countdown */}
          <div className="space-y-2">
            <p className="text-sm md:text-base opacity-80">
              {lang === "en"
                ? "Countdown to Marriage"
                : "വിവാഹത്തിലെക്കുള്ള സമയം"}
            </p>

            <Countdown />
          </div>

          {/* Closing */}
          <p className="text-center text-sm md:text-base opacity-80">
            ♡ &nbsp;
            {lang === "en" ? "In shā’ Allāh" : "ഇൻഷാ അല്ലാഹ്"}
            &nbsp; ♡
          </p>

          {/* RSVP */}
          <Link href="/rsvp">
            <button className="text-sm md:text-base text-center underline underline-offset-4 hover:opacity-80 transition">
              {lang === "en"
                ? "Get Your Personalized Invitation. Click Here"
                : "നിങ്ങളുടെ ക്ഷണക്കത്ത് ലഭിക്കാൻ ഇവിടെ ക്ലിക്ക് ചെയ്യുക"}
            </button>
          </Link>

        </div>

      </div>

      {/* Footer */}
      <div className="text-xs md:text-sm opacity-60 text-center">
        Coded with ❤️{" "}
        <Link
          href="https://www.instagram.com/ra_zi_ra_zz/"
          className="underline underline-offset-4"
        >
          Razeena CP
        </Link>
      </div>

    </main>
  );
}