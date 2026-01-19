"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { featureInfo, WineFeatures } from "@/lib/wineModel";
import { Wine, Sparkles, TrendingUp, Award, Grape } from "lucide-react";

const featureLabels: Record<string, string> = {
  fixedAcidity: "Fixed Acidity",
  volatileAcidity: "Volatile Acidity",
  citricAcid: "Citric Acid",
  residualSugar: "Residual Sugar",
  chlorides: "Chlorides",
  freeSulfurDioxide: "Free SO₂",
  totalSulfurDioxide: "Total SO₂",
  density: "Density",
  pH: "pH Level",
  sulphates: "Sulphates",
  alcohol: "Alcohol",
};

interface PredictionResult {
  quality: number;
  confidence: number;
  category: "Poor" | "Average" | "Good" | "Excellent";
  insights: string[];
}

const inputVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

const resultVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: -30,
    transition: { duration: 0.3 },
  },
};

export function WinePredictor() {
  const [features, setFeatures] = useState<WineFeatures>({
    fixedAcidity: featureInfo.fixedAcidity.default,
    volatileAcidity: featureInfo.volatileAcidity.default,
    citricAcid: featureInfo.citricAcid.default,
    residualSugar: featureInfo.residualSugar.default,
    chlorides: featureInfo.chlorides.default,
    freeSulfurDioxide: featureInfo.freeSulfurDioxide.default,
    totalSulfurDioxide: featureInfo.totalSulfurDioxide.default,
    density: featureInfo.density.default,
    pH: featureInfo.pH.default,
    sulphates: featureInfo.sulphates.default,
    alcohol: featureInfo.alcohol.default,
  });

  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePredict = async () => {
    setIsLoading(true);
    setPrediction(null);

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(features),
      });

      const data = await response.json();

      if (data.success) {
        setPrediction(data.prediction);
      }
    } catch (error) {
      console.error("Prediction error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFeature = (key: keyof WineFeatures, value: string) => {
    const numValue = parseFloat(value) || 0;
    setFeatures((prev) => ({ ...prev, [key]: numValue }));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Poor":
        return "from-red-900/80 to-red-800/60";
      case "Average":
        return "from-amber-800/80 to-yellow-700/60";
      case "Good":
        return "from-emerald-800/80 to-green-700/60";
      case "Excellent":
        return "from-emerald-600/80 to-teal-500/60";
      default:
        return "from-[#8B2942]/80 to-[#722F37]/60";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Excellent":
        return Award;
      case "Good":
        return TrendingUp;
      default:
        return Sparkles;
    }
  };

  const featureKeys = Object.keys(featureInfo) as (keyof typeof featureInfo)[];
  const leftColumn = featureKeys.slice(0, 5);
  const rightColumn = featureKeys.slice(5, 10);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="rounded-2xl p-6 sm:p-8 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(114, 47, 55, 0.5) 0%, rgba(80, 30, 35, 0.6) 100%)",
          border: "1px solid rgba(196, 30, 58, 0.3)",
          boxShadow: "0 0 50px rgba(139, 0, 0, 0.2), inset 0 1px 0 rgba(255,255,255,0.05)"
        }}
      >
        <motion.div
          className="absolute top-4 right-4 opacity-10"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <Grape className="w-20 h-20 text-[#C41E3A]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl sm:text-2xl font-medium text-[#F5E6E0] text-center mb-6 flex items-center justify-center gap-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <Wine className="w-6 h-6 text-[#C41E3A]" />
          Enter Wine Properties
          <Wine className="w-6 h-6 text-[#C41E3A]" />
        </motion.h2>

        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
          <div className="space-y-4">
            {leftColumn.map((key, index) => (
              <motion.div 
                key={key}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={inputVariants}
              >
                <label className="block text-sm text-[#D4A090] mb-1.5">
                  {featureLabels[key]}
                </label>
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <Input
                    type="number"
                    step={key === "density" || key === "chlorides" ? "0.001" : "0.1"}
                    value={features[key]}
                    onChange={(e) => updateFeature(key, e.target.value)}
                    className="w-full bg-[#2a1012]/70 border-[#8B2942]/40 text-[#F5E6E0] placeholder:text-[#8B6070] focus:border-[#C41E3A]/60 focus:ring-[#C41E3A]/20 rounded-lg h-11 transition-all duration-200 hover:border-[#C41E3A]/50"
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
          
          <div className="space-y-4">
            {rightColumn.map((key, index) => (
              <motion.div 
                key={key}
                custom={index + 5}
                initial="hidden"
                animate="visible"
                variants={inputVariants}
              >
                <label className="block text-sm text-[#D4A090] mb-1.5">
                  {featureLabels[key]}
                </label>
                <Input
                  type="number"
                  step={key === "density" || key === "chlorides" ? "0.001" : "0.1"}
                  value={features[key]}
                  onChange={(e) => updateFeature(key, e.target.value)}
                  className="w-full bg-[#2a1012]/70 border-[#8B2942]/40 text-[#F5E6E0] placeholder:text-[#8B6070] focus:border-[#C41E3A]/60 focus:ring-[#C41E3A]/20 rounded-lg h-11 transition-all duration-200 hover:border-[#C41E3A]/50"
                />
              </motion.div>
            ))}
            
            <motion.div
              custom={10}
              initial="hidden"
              animate="visible"
              variants={inputVariants}
            >
              <label className="block text-sm text-[#D4A090] mb-1.5">
                {featureLabels.alcohol}
              </label>
              <Input
                type="number"
                step="0.1"
                value={features.alcohol}
                onChange={(e) => updateFeature("alcohol", e.target.value)}
                className="w-full bg-[#2a1012]/70 border-[#8B2942]/40 text-[#F5E6E0] placeholder:text-[#8B6070] focus:border-[#C41E3A]/60 focus:ring-[#C41E3A]/20 rounded-lg h-11 transition-all duration-200 hover:border-[#C41E3A]/50"
              />
            </motion.div>
          </div>
        </div>

        <motion.div 
          className="mt-8 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={handlePredict}
              disabled={isLoading}
              className="px-10 py-6 text-base font-medium rounded-lg transition-all duration-300 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(139, 41, 66, 0.9) 0%, rgba(114, 47, 55, 0.95) 100%)",
                border: "1px solid rgba(196, 30, 58, 0.5)",
                color: "#F5E6E0"
              }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              {isLoading ? (
                <span className="flex items-center gap-2 relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  >
                    <Wine className="w-5 h-5 text-[#C41E3A]" />
                  </motion.div>
                  Analyzing...
                </span>
              ) : (
                <span className="relative flex items-center gap-2">
                  <Grape className="w-5 h-5" />
                  Predict Quality
                </span>
              )}
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      <AnimatePresence mode="wait">
        {prediction && (
          <motion.div
            key="result"
            variants={resultVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="rounded-2xl p-6 overflow-hidden relative"
            style={{
              background: "linear-gradient(135deg, rgba(80, 25, 30, 0.7) 0%, rgba(60, 20, 25, 0.8) 100%)",
              border: "1px solid rgba(196, 30, 58, 0.3)",
            }}
          >
            <motion.div
              className="absolute inset-0 opacity-20"
              initial={{ backgroundPosition: "0% 0%" }}
              animate={{ backgroundPosition: "100% 100%" }}
              transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(196, 30, 58, 0.4), transparent 60%)",
              }}
            />

            <motion.div
              className="absolute top-2 right-2 opacity-10"
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Wine className="w-16 h-16 text-[#C41E3A]" />
            </motion.div>
            
            <div className="relative flex flex-col sm:flex-row items-center gap-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${getCategoryColor(prediction.category)} flex items-center justify-center`}
              >
                <motion.div
                  animate={{ 
                    rotate: prediction.category === "Excellent" ? [0, 10, -10, 0] : 0,
                    scale: prediction.category === "Excellent" ? [1, 1.1, 1] : 1 
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {(() => {
                    const Icon = getCategoryIcon(prediction.category);
                    return <Icon className="w-12 h-12 text-white" />;
                  })()}
                </motion.div>
              </motion.div>
              
              <div className="text-center sm:text-left flex-1">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#F5E6E0]" style={{ fontFamily: "var(--font-display)" }}>
                    Quality Score
                  </h3>
                  <motion.p 
                    className="text-5xl font-bold text-[#C41E3A] mt-2"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", delay: 0.4 }}
                  >
                    {prediction.quality.toFixed(1)}
                    <span className="text-2xl text-[#B09080]"> / 8</span>
                  </motion.p>
                </motion.div>
                
                <motion.div 
                  className="mt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span 
                    className={`inline-block px-6 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${getCategoryColor(prediction.category)}`}
                  >
                    {prediction.category} Wine
                  </span>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="hidden sm:flex flex-col items-center gap-2"
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Grape className="w-10 h-10 text-[#8B2942] opacity-60" />
                </motion.div>
                <Wine className="w-10 h-10 text-[#722F37] opacity-40" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
