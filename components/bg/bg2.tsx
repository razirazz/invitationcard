"use client";

import Lottie from "lottie-react";
import animationData from "@/components/bg/bg2.json";

export default function BackgroundAnimation() {
  return (
    <div className="absolute inset-0 z-1 flex items-end justify-end w-96">
      <Lottie
        animationData={animationData}
        loop={true}
      />
    </div>
  );
}