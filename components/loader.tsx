"use client";

import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">

      <motion.div
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9 }}
        className="flex flex-col items-center gap-4"
      >
        

        <p
          className="text-lg md:text-2xl tracking-widest italic"
        >
        بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ 
        </p>

        {/* Logo Initials */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
          className="text-4xl md:text-5xl font-bold gold"
        >
          Razeena &hearts; Yousuf 
        </motion.div>

        {/* Subtitle */}
        <p className="text-sm md:text-base 
          tracking-widest 
          italic  
          text-center">
            Marriage Invitation
        </p>
      </motion.div>

    </div>
  );
}