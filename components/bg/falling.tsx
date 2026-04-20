"use client";

import { useEffect, useState } from "react";

type Particle = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
};

type Petal = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  rotate: number;
};

export default function LuxuryBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // ✨ GOLD PARTICLES (many, subtle)
    const p = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 5 + Math.random() * 4,
      duration: 10 + Math.random() * 10,
      delay: Math.random() * 10,
    }));

    // 🌸 PETALS (few, rare)
    const petalsData = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 16 + Math.random() * 14,
      duration: 12 + Math.random() * 10,
      delay: Math.random() * 15,
      rotate: Math.random() * 360,
    }));

    setParticles(p);
    setPetals(petalsData);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

      {/* ✨ GOLD PARTICLES */}
      {particles.map((p) => (
        <span
          key={`p-${p.id}`}
          className="absolute top-[-10%] rounded-full bg-[#e6c26f]/40 blur-[1px]"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `floatDown ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* 🌸 PETALS */}
      {petals.map((p) => (
        <span
          key={`petal-${p.id}`}
          className="absolute top-[-10%] text-[#e6c26f]/30"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            transform: `rotate(${p.rotate}deg)`,
            animation: `petalFall ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        >
          ❀
        </span>
      ))}

    </div>
  );
}