"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

type MusicContextType = {
  isPlaying: boolean;
  toggle: () => void;
  play: () => void;
  stop: () => void;
};

const MusicContext = createContext<MusicContextType | null>(null);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio("/music.mp3");
    audio.loop = true;
    audio.volume = 0.3; // soft
    audioRef.current = audio;
  }, []);

  const play = () => {
    audioRef.current?.play().catch(() => {});
    setIsPlaying(true);
  };

  const stop = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const toggle = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) play();
    else stop();
  };

  return (
    <MusicContext.Provider value={{ isPlaying, toggle, play, stop }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used inside MusicProvider");
  return ctx;
}