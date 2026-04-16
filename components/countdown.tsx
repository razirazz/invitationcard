"use client";

import { useUI } from "@/lib/ui-context";
import { useEffect, useState } from "react";

export default function Countdown() {
  const { lang } = useUI();

  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState<any>(null);

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
    setMounted(true); // 👈 important

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
    <div className="glass p-6 flex gap-4 text-center">
      {values.map((d, i) => (
        <div key={i}>
          <p className="text-2xl font-bold">{d}</p>
          <p className="text-xs uppercase opacity-70">
            {labels[i]}
          </p>
        </div>
      ))}
    </div>
  );
}