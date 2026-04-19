"use client";

import { motion } from "framer-motion";

export default function TopAnimation() {
  return (
    <div className="absolute top-0 left-0 w-full flex justify-center pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="h-[2px] w-32 bg-gradient-to-r from-transparent via-[#c9a646] to-transparent"
      />
    </div>
  );
}