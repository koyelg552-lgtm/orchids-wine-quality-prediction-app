"use client";

import { motion } from "framer-motion";
import { WinePredictor } from "@/components/WinePredictor";
import { WineBackground } from "@/components/WineBackground";
import { WineHeader } from "@/components/WineHeader";

export default function PredictPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <WineBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        <WineHeader />

        <main className="flex-1 px-4 sm:px-6 pb-12 flex items-start justify-center pt-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full"
          >
            <WinePredictor />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
