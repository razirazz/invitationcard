"use client";

import { useEffect, useState } from "react";
import { useUI } from "../lib/ui-context";

export default function Countdown() {
  const { lang } = useUI();

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

  const [time, setTime] = useState<any>(calculate());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculate());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!time) {
    return (
      <p className="text-xl font-semibold">
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
    <div className="glass p-6 flex gap-6 text-center">
      {values.map((val, i) => (
        <div key={i}>
          <p className="text-2xl font-bold">{val}</p>
          <p className="text-xs uppercase opacity-70">{labels[i]}</p>
        </div>
      ))}
    </div>
  );
}