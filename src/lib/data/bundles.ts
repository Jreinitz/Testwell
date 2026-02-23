export interface Bundle {
  id: string;
  name: string;
  description: string;
  testIds: string[];
  testNames: string[];
  individualTotal: number;
  bundlePrice: number;
  savingsPercent: number;
}

export const bundles: Bundle[] = [
  {
    id: "essential-wellness",
    name: "Essential Wellness",
    description:
      "The foundation of preventive health — covers blood cell counts, organ function, and cardiovascular risk.",
    testIds: ["cbc", "cmp", "lipid"],
    testNames: [
      "CBC with Differential",
      "Comprehensive Metabolic Panel",
      "Lipid Panel",
    ],
    individualTotal: 74.97,
    bundlePrice: 59.99,
    savingsPercent: 20,
  },
  {
    id: "heart-health",
    name: "Heart Health",
    description:
      "A comprehensive cardiovascular screening covering cholesterol, inflammation markers, and heart disease risk factors.",
    testIds: ["lipid", "crp", "homocysteine", "cholesterol"],
    testNames: [
      "Lipid Panel",
      "C-Reactive Protein",
      "Homocysteine",
      "Total Cholesterol",
    ],
    individualTotal: 104.96,
    bundlePrice: 79.99,
    savingsPercent: 24,
  },
  {
    id: "metabolic-check",
    name: "Metabolic Check",
    description:
      "Screen for diabetes, insulin resistance, and metabolic syndrome — catch problems years before symptoms appear.",
    testIds: ["cmp", "a1c", "insulin"],
    testNames: [
      "Comprehensive Metabolic Panel",
      "Hemoglobin A1c",
      "Fasting Insulin",
    ],
    individualTotal: 74.97,
    bundlePrice: 59.99,
    savingsPercent: 20,
  },
];
