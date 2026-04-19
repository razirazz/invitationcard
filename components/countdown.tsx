"use client";

import { useUI } from "@/lib/ui-context";
import { useEffect, useState } from "react";

type TimeType = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export default function Countdown({ onReady }: { onReady?: () => void }) {
  const { lang } = useUI();

  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState<TimeType | null>(null);

  const target = new Date("2026-06-13T11:00:00").getTime();

  const calculate = () => {
    const now = new Date().getTime();
    const diff = target - now;

    if (diff <= 0) return null;

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  useEffect(() => {
    setMounted(true);

    const initial = calculate();
    setTime(initial);

    if (onReady) onReady(); // 👈 IMPORTANT

    const interval = setInterval(() => {
      setTime(calculate());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 👇 Prevent SSR mismatch
  if (!mounted) return null;

  if (!time) {
    return (
      <p>
        {lang === "en" ? "Event Started 🎉" : "പരിപാടി ആരംഭിച്ചു 🎉"}
      </p>
    );
  }

  const labels =
    lang === "en"
      ? ["Days", "Hours", "Minutes", "Seconds"]
      : ["ദിവസം", "മണിക്കൂർ", "മിനിറ്റ്", "സെക്കന്റ്"];

  const values = Object.values(time);

  return (
    <div className="glass p-2 md:p-3 flex gap-1 md:gap-4 justify-center items-center w-[100vh]]">

      {values.map((d, i) => (
        <div
          key={i}
          className="
          flex flex-col items-center justify-center
          px-4 py-3 rounded-xl
          bg-white/40 dark:bg-white/5
          backdrop-blur-md
          shadow-md
          min-w-17.5
        "
        >
          {/* Number */}
          <p className="text-2xl md:text-3xl font-bold gold">
            {d}
          </p>

          {/* Label */}
          <p className="text-xs uppercase opacity-70 tracking-wide mt-1">
            {labels[i]}
          </p>
        </div>
      ))}

    </div>
  );
}