"use client";

import { motion } from "framer-motion";
import { Wine, ArrowLeft, Grape } from "lucide-react";
import Link from "next/link";

export function WineHeader() {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative z-10 w-full"
    >
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <motion.div 
                className="flex items-center gap-3"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Wine className="w-8 h-8 text-[#C41E3A]" />
                </motion.div>
                <span className="text-xl font-semibold text-[#F5E6E0]" style={{ fontFamily: "var(--font-display)" }}>
                  Wine
                </span>
              </motion.div>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <motion.div
              className="hidden sm:flex items-center gap-2 text-sm text-[#C9A090]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Grape className="w-4 h-4 text-[#8B2942]" />
              <span>Red Wine Prediction</span>
            </motion.div>
            
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(196, 30, 58, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#8B2942]/60 text-[#F5E6E0] text-sm font-medium transition-colors bg-[#722F37]/20"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </motion.button>
            </Link>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <h1
            className="text-2xl sm:text-3xl font-semibold text-[#C41E3A]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Wine Quality Prediction
          </h1>
          <p className="text-sm text-[#B09080] mt-1">
            Enter your wine&apos;s chemical properties below
          </p>
        </motion.div>
      </div>
    </motion.header>
  );
}
