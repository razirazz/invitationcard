"use client";

import { useMusic } from "@/lib/music-context";

export default function MusicToggle() {
  const { isPlaying, toggle } = useMusic();

  return (
    <button
      onClick={toggle}
      className="
        px-3 py-1.5
        rounded-full
        bg-[rgba(255,255,255,0.1)]
        border border-[rgba(255,255,255,0.2)]
        backdrop-blur-md
        text-xs
        hover:scale-105
        transition
      "
    >
      {isPlaying ? "🔊" : "🔇"}
    </button>
  );
}