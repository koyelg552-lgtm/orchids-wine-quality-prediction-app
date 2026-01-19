export interface WineFeatures {
  fixedAcidity: number;
  volatileAcidity: number;
  citricAcid: number;
  residualSugar: number;
  chlorides: number;
  freeSulfurDioxide: number;
  totalSulfurDioxide: number;
  density: number;
  pH: number;
  sulphates: number;
  alcohol: number;
}

const wineData = [
  { features: [7.4, 0.7, 0.0, 1.9, 0.076, 11.0, 34.0, 0.9978, 3.51, 0.56, 9.4], quality: 5 },
  { features: [7.8, 0.88, 0.0, 2.6, 0.098, 25.0, 67.0, 0.9968, 3.2, 0.68, 9.8], quality: 5 },
  { features: [11.2, 0.28, 0.56, 1.9, 0.075, 17.0, 60.0, 0.998, 3.16, 0.58, 9.8], quality: 6 },
  { features: [7.3, 0.65, 0.0, 1.2, 0.065, 15.0, 21.0, 0.9946, 3.39, 0.47, 10.0], quality: 7 },
  { features: [7.8, 0.58, 0.02, 2.0, 0.073, 9.0, 18.0, 0.9968, 3.36, 0.57, 9.5], quality: 7 },
  { features: [8.5, 0.28, 0.56, 1.8, 0.092, 35.0, 103.0, 0.9969, 3.3, 0.75, 10.5], quality: 7 },
  { features: [8.1, 0.38, 0.28, 2.1, 0.066, 13.0, 30.0, 0.9968, 3.23, 0.73, 9.7], quality: 7 },
  { features: [7.5, 0.52, 0.16, 1.9, 0.085, 12.0, 35.0, 0.9968, 3.38, 0.62, 9.5], quality: 7 },
  { features: [4.7, 0.6, 0.17, 2.3, 0.058, 17.0, 106.0, 0.9932, 3.85, 0.6, 12.9], quality: 6 },
  { features: [6.3, 0.3, 0.48, 1.8, 0.069, 18.0, 61.0, 0.9959, 3.44, 0.78, 10.3], quality: 6 },
  { features: [8.9, 0.22, 0.48, 1.8, 0.077, 29.0, 60.0, 0.9968, 3.39, 0.53, 9.4], quality: 6 },
  { features: [7.9, 0.32, 0.51, 1.8, 0.341, 17.0, 56.0, 0.9969, 3.04, 1.08, 9.2], quality: 6 },
  { features: [5.7, 1.13, 0.09, 1.5, 0.172, 7.0, 19.0, 0.994, 3.5, 0.48, 9.8], quality: 4 },
  { features: [7.4, 0.59, 0.08, 4.4, 0.086, 6.0, 29.0, 0.9974, 3.38, 0.5, 9.0], quality: 4 },
  { features: [8.3, 0.675, 0.26, 2.1, 0.084, 11.0, 43.0, 0.9976, 3.31, 0.53, 9.2], quality: 4 },
  { features: [4.6, 0.52, 0.15, 2.1, 0.054, 8.0, 65.0, 0.9934, 3.9, 0.56, 13.1], quality: 4 },
  { features: [5.0, 1.02, 0.04, 1.4, 0.045, 41.0, 85.0, 0.9938, 3.75, 0.48, 10.5], quality: 4 },
  { features: [8.8, 0.61, 0.3, 2.8, 0.088, 17.0, 46.0, 0.9976, 3.26, 0.51, 9.3], quality: 4 },
];

const featureWeights = [
  0.08,  // fixed acidity
  -0.18, // volatile acidity (negative correlation)
  0.06,  // citric acid
  0.02,  // residual sugar
  -0.12, // chlorides (negative)
  0.04,  // free sulfur dioxide
  -0.08, // total sulfur dioxide (negative)
  -0.10, // density (negative)
  0.03,  // pH
  0.15,  // sulphates
  0.25,  // alcohol (highest positive correlation)
];

const featureMeans = [8.32, 0.53, 0.27, 2.54, 0.087, 15.87, 46.47, 0.9967, 3.31, 0.66, 10.42];
const featureStds = [1.74, 0.18, 0.19, 1.41, 0.047, 10.46, 32.89, 0.0019, 0.15, 0.17, 1.07];

function normalize(value: number, mean: number, std: number): number {
  return (value - mean) / std;
}

function findKNearest(input: number[], k: number = 5): number[] {
  const distances = wineData.map((sample, index) => {
    const dist = sample.features.reduce((sum, feat, i) => {
      const normalizedInput = normalize(input[i], featureMeans[i], featureStds[i]);
      const normalizedFeat = normalize(feat, featureMeans[i], featureStds[i]);
      return sum + Math.pow(normalizedInput - normalizedFeat, 2);
    }, 0);
    return { index, distance: Math.sqrt(dist), quality: sample.quality };
  });

  distances.sort((a, b) => a.distance - b.distance);
  return distances.slice(0, k).map(d => d.quality);
}

export function predictWineQuality(features: WineFeatures): { 
  quality: number; 
  confidence: number;
  category: 'Poor' | 'Average' | 'Good' | 'Excellent';
  insights: string[];
} {
  const inputArray = [
    features.fixedAcidity,
    features.volatileAcidity,
    features.citricAcid,
    features.residualSugar,
    features.chlorides,
    features.freeSulfurDioxide,
    features.totalSulfurDioxide,
    features.density,
    features.pH,
    features.sulphates,
    features.alcohol,
  ];

  let weightedScore = 5.5;
  inputArray.forEach((value, i) => {
    const normalizedValue = normalize(value, featureMeans[i], featureStds[i]);
    weightedScore += normalizedValue * featureWeights[i] * 0.8;
  });

  const knnQualities = findKNearest(inputArray, 5);
  const knnAverage = knnQualities.reduce((a, b) => a + b, 0) / knnQualities.length;

  let finalQuality = weightedScore * 0.6 + knnAverage * 0.4;
  finalQuality = Math.max(3, Math.min(8, finalQuality));
  finalQuality = Math.round(finalQuality * 10) / 10;

  const qualityVariance = knnQualities.reduce((sum, q) => sum + Math.pow(q - knnAverage, 2), 0) / knnQualities.length;
  const confidence = Math.max(0.5, Math.min(0.95, 0.85 - qualityVariance * 0.1));

  let category: 'Poor' | 'Average' | 'Good' | 'Excellent';
  if (finalQuality < 4.5) category = 'Poor';
  else if (finalQuality < 5.5) category = 'Average';
  else if (finalQuality < 6.5) category = 'Good';
  else category = 'Excellent';

  const insights: string[] = [];
  
  if (features.alcohol > 11.5) {
    insights.push('High alcohol content contributes positively to quality');
  } else if (features.alcohol < 9.5) {
    insights.push('Lower alcohol may reduce overall quality perception');
  }

  if (features.volatileAcidity > 0.6) {
    insights.push('High volatile acidity may cause vinegar-like taste');
  } else if (features.volatileAcidity < 0.3) {
    insights.push('Low volatile acidity indicates good fermentation control');
  }

  if (features.sulphates > 0.8) {
    insights.push('Good sulphate levels enhance wine preservation');
  }

  if (features.citricAcid > 0.4) {
    insights.push('Citric acid adds freshness and flavor complexity');
  }

  if (features.pH < 3.2) {
    insights.push('Low pH provides good acidity balance');
  } else if (features.pH > 3.5) {
    insights.push('Higher pH may indicate less crisp taste');
  }

  if (insights.length === 0) {
    insights.push('Wine characteristics are within typical ranges');
  }

  return {
    quality: finalQuality,
    confidence: Math.round(confidence * 100) / 100,
    category,
    insights,
  };
}

export const featureInfo = {
  fixedAcidity: { min: 4.0, max: 16.0, default: 8.0, unit: 'g/dm³', description: 'Non-volatile acids in wine' },
  volatileAcidity: { min: 0.1, max: 1.6, default: 0.5, unit: 'g/dm³', description: 'Acetic acid level (vinegar taste)' },
  citricAcid: { min: 0.0, max: 1.0, default: 0.25, unit: 'g/dm³', description: 'Adds freshness and flavor' },
  residualSugar: { min: 0.5, max: 16.0, default: 2.5, unit: 'g/dm³', description: 'Remaining sugar after fermentation' },
  chlorides: { min: 0.01, max: 0.6, default: 0.08, unit: 'g/dm³', description: 'Salt content' },
  freeSulfurDioxide: { min: 1.0, max: 72.0, default: 15.0, unit: 'mg/dm³', description: 'Prevents oxidation' },
  totalSulfurDioxide: { min: 6.0, max: 290.0, default: 45.0, unit: 'mg/dm³', description: 'Total SO2 content' },
  density: { min: 0.99, max: 1.01, default: 0.997, unit: 'g/cm³', description: 'Wine density' },
  pH: { min: 2.7, max: 4.1, default: 3.3, unit: '', description: 'Acidity level (lower = more acidic)' },
  sulphates: { min: 0.3, max: 2.0, default: 0.65, unit: 'g/dm³', description: 'Antimicrobial agent' },
  alcohol: { min: 8.0, max: 15.0, default: 10.5, unit: '%', description: 'Alcohol by volume' },
};
