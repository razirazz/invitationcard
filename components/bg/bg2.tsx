"use client";

import Lottie from "lottie-react";
import animationData from "@/components/bg/bg2.json";

export default function BackgroundAnimation() {
  return (
    <div
      className="
        absolute 
        bottom-0 
        right-0 
        md:left-0 md:right-auto
        pointer-events-none
        opacity-80
      "
    >
      <div className="w-40 md:w-56 lg:w-72">
        <Lottie animationData={animationData} loop />
      </div>
    </div>
  );
}