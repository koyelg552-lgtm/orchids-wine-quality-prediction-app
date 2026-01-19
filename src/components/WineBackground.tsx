"use client";

import { motion } from "framer-motion";

export function WineBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-left bg-no-repeat"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=2070&auto=format&fit=crop')`,
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-r from-[#2a0a0a]/60 via-[#3a1515]/70 to-[#1a0505]/95 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0202]/90 via-transparent to-[#2a0808]/60 z-[2]" />
      
      <div 
        className="absolute inset-0 z-[3] opacity-40"
        style={{
          backgroundImage: `radial-gradient(ellipse at 30% 50%, rgba(180, 30, 30, 0.4) 0%, transparent 60%),
                           radial-gradient(ellipse at 70% 30%, rgba(150, 20, 40, 0.3) 0%, transparent 50%),
                           radial-gradient(ellipse at 50% 80%, rgba(120, 20, 30, 0.3) 0%, transparent 40%)`
        }}
      />

      <motion.div
        className="absolute bottom-10 right-10 w-64 h-64 opacity-10 z-[4]"
        animate={{ 
          rotate: [0, 360],
        }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#8B0000]">
          <circle cx="50" cy="30" r="25" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="35" cy="45" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="65" cy="45" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <path d="M50 55 L50 90" stroke="currentColor" strokeWidth="1" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-20 left-10 w-32 h-32 opacity-10 z-[4]"
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#722F37]">
          <ellipse cx="50" cy="25" rx="20" ry="25" fill="currentColor" opacity="0.5" />
          <rect x="47" y="50" width="6" height="30" fill="currentColor" opacity="0.5" />
          <ellipse cx="50" cy="85" rx="15" ry="5" fill="currentColor" opacity="0.5" />
        </svg>
      </motion.div>
    </div>
  );
}
