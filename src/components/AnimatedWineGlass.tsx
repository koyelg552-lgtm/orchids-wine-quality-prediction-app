"use client";

import { motion } from "framer-motion";

export default function AnimatedWineGlass(): JSX.Element {
  return (
    <div className="relative w-28 h-36 sm:w-36 sm:h-44">
      <svg
        viewBox="0 0 100 130"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="wineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B0000" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#722F37" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#4A0E0E" stopOpacity="1" />
          </linearGradient>
          
          <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.2)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
          </linearGradient>
          
          <clipPath id="glassClip">
            <path d="M25 10 Q20 10 20 20 Q15 55 35 70 L35 100 L30 105 Q28 108 30 110 L70 110 Q72 108 70 105 L65 100 L65 70 Q85 55 80 20 Q80 10 75 10 Z" />
          </clipPath>

          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <g clipPath="url(#glassClip)">
          <motion.rect
            x="15"
            y="20"
            width="70"
            height="60"
            fill="url(#wineGradient)"
            initial={{ y: 80 }}
            animate={{ y: 25 }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
          />
          
          <motion.ellipse
            cx="50"
            cy="25"
            rx="28"
            ry="5"
            fill="#8B0000"
            opacity="0.6"
            initial={{ cy: 80 }}
            animate={{ cy: 28 }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
          />

          <motion.g
            animate={{ 
              x: [-2, 2, -2],
              rotate: [-1, 1, -1]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <motion.ellipse
              cx="35"
              cy="35"
              rx="3"
              ry="1.5"
              fill="rgba(255,255,255,0.15)"
              animate={{ 
                cy: [35, 32, 35],
                opacity: [0.15, 0.25, 0.15]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.ellipse
              cx="55"
              cy="40"
              rx="4"
              ry="2"
              fill="rgba(255,255,255,0.1)"
              animate={{ 
                cy: [40, 37, 40],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
            />
            <motion.ellipse
              cx="45"
              cy="45"
              rx="2"
              ry="1"
              fill="rgba(255,255,255,0.12)"
              animate={{ 
                cy: [45, 42, 45],
                opacity: [0.12, 0.22, 0.12]
              }}
              transition={{ duration: 1.8, repeat: Infinity, delay: 0.6 }}
            />
          </motion.g>
        </g>

        <path
          d="M25 10 Q20 10 20 20 Q15 55 35 70 L35 100 L30 105 Q28 108 30 110 L70 110 Q72 108 70 105 L65 100 L65 70 Q85 55 80 20 Q80 10 75 10 Z"
          fill="none"
          stroke="url(#glassGradient)"
          strokeWidth="2"
          filter="url(#glow)"
        />

        <motion.path
          d="M28 15 Q26 25 30 50"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
        />
      </svg>

      <motion.div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-4 rounded-full bg-[#8B0000]/20 blur-md"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#C41E3A]"
          style={{
            left: `${40 + i * 10}%`,
            top: "30%",
          }}
          animate={{
            y: [-5, -15, -5],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
