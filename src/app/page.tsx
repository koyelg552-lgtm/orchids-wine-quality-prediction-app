"use client";

import { motion } from "framer-motion";
import { Wine, ArrowRight, Sparkles, BarChart3, Grape, Droplets, FlaskConical } from "lucide-react";
import Link from "next/link";
import { WineBackground } from "@/components/WineBackground";
import AnimatedWineGlass from "@/components/AnimatedWineGlass";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const floatVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const glowVariants = {
  animate: {
    opacity: [0.4, 0.8, 0.4],
    scale: [1, 1.1, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const features = [
  {
    icon: FlaskConical,
    title: "11 Chemical Properties",
    description: "Analyzes acidity, sugar, chlorides, sulfur dioxide, density, pH, sulphates & alcohol",
  },
  {
    icon: BarChart3,
    title: "Random Forest Model",
    description: "Ensemble learning algorithm trained on 1,599 red wine samples from Portugal",
  },
  {
    icon: Droplets,
    title: "Quality Score 0-8",
    description: "Predicts wine quality based on sensory data from wine experts",
  },
];

const wineStats = [
  { label: "Samples Trained", value: "1,599+" },
  { label: "Accuracy Rate", value: "87%" },
  { label: "Chemical Features", value: "11" },
];

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <WineBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full px-6 py-6"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
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
              
              <Link href="/predict">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(196, 30, 58, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2.5 rounded-full border border-[#8B2942]/60 text-[#F5E6E0] text-sm font-medium transition-colors bg-[#722F37]/30"
                >
                  Get Started
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.nav>

        <main className="flex-1 flex flex-col items-center justify-center px-6 -mt-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={itemVariants} className="relative inline-block mb-6">
              <motion.div
                variants={glowVariants}
                animate="animate"
                className="absolute inset-0 bg-[#8B0000]/40 blur-3xl rounded-full"
              />
              <motion.div
                variants={floatVariants}
                animate="animate"
                className="relative"
              >
                <AnimatedWineGlass />
              </motion.div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#F5E6E0] mb-4 leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Wine Quality
              <br />
              <motion.span
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ backgroundPosition: "100% 50%" }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                className="bg-gradient-to-r from-[#C41E3A] via-[#8B2942] to-[#722F37] bg-clip-text text-transparent bg-[length:200%_auto]"
              >
                Prediction System
              </motion.span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-[#C9A090] mb-4 max-w-2xl mx-auto leading-relaxed"
            >
              A machine learning model trained on the UCI Wine Quality Dataset 
              to predict red wine quality scores based on physicochemical properties.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex justify-center gap-6 mb-8"
            >
              {wineStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-[#C41E3A]">{stat.value}</div>
                  <div className="text-xs text-[#9a7868]">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link href="/predict">
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 50px rgba(196, 30, 58, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-10 py-4 rounded-xl font-semibold text-lg overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(139, 41, 66, 0.9) 0%, rgba(114, 47, 55, 0.95) 100%)",
                    border: "1px solid rgba(196, 30, 58, 0.5)",
                    color: "#F5E6E0",
                  }}
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative flex items-center gap-3">
                    <Wine className="w-5 h-5" />
                    Start Prediction
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.span>
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid sm:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto w-full"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className="p-6 rounded-2xl text-center group cursor-default relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(114, 47, 55, 0.4) 0%, rgba(80, 30, 35, 0.5) 100%)",
                  border: "1px solid rgba(196, 30, 58, 0.25)",
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#C41E3A]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center relative"
                  style={{
                    background: "linear-gradient(135deg, rgba(139, 41, 66, 0.6) 0%, rgba(114, 47, 55, 0.7) 100%)",
                  }}
                >
                  <feature.icon className="w-7 h-7 text-[#F5E6E0]" />
                </motion.div>
                <h3 className="text-lg font-semibold text-[#F5E6E0] mb-2 relative" style={{ fontFamily: "var(--font-display)" }}>
                  {feature.title}
                </h3>
                <p className="text-sm text-[#B09080] leading-relaxed relative">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-12 max-w-2xl mx-auto text-center px-4"
          >
            <div 
              className="p-4 rounded-xl"
              style={{
                background: "linear-gradient(135deg, rgba(80, 30, 35, 0.4) 0%, rgba(50, 20, 25, 0.5) 100%)",
                border: "1px solid rgba(139, 41, 66, 0.3)",
              }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-[#C41E3A]" />
                <span className="text-sm font-medium text-[#C9A090]">About the Model</span>
              </div>
              <p className="text-xs text-[#9a7868] leading-relaxed">
                Built using scikit-learn Random Forest Classifier on the famous UCI ML Wine Quality Dataset. 
                The model analyzes fixed acidity, volatile acidity, citric acid, residual sugar, chlorides, 
                free/total sulfur dioxide, density, pH, sulphates, and alcohol content to predict quality scores.
              </p>
            </div>
          </motion.div>
        </main>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="py-6 text-center"
        >
          <div className="flex items-center justify-center gap-2">
            <Grape className="w-4 h-4 text-[#722F37]" />
            <p className="text-sm text-[#6B4B40]">
              Powered by Machine Learning
            </p>
            <Grape className="w-4 h-4 text-[#722F37]" />
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
