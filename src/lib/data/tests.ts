export type LabProvider = "Quest" | "Labcorp";

export type TestCategory =
  | "Blood Health"
  | "Heart Health"
  | "Metabolic Health"
  | "Hormones"
  | "Inflammation"
  | "Diabetes"
  | "Vitamins";

export interface LabTest {
  id: string;
  slug: string;
  name: string;
  category: TestCategory;
  provider: LabProvider;
  price: number;
  hospitalPrice: number;
  questDirectPrice: number;
  description: string;
  longDescription: string;
  biomarkers: string[];
  sampleType: string;
  fastingRequired: boolean;
  resultsIn: string;
  prepInstructions: string;
}

export const tests: LabTest[] = [
  {
    id: "cbc",
    slug: "cbc-with-differential",
    name: "CBC with Differential",
    category: "Blood Health",
    provider: "Quest",
    price: 19.99,
    hospitalPrice: 150,
    questDirectPrice: 32,
    description:
      "A complete blood count with differential measures red blood cells, white blood cells, hemoglobin, hematocrit, and platelets to screen for anemia, infections, and blood disorders.",
    longDescription:
      "The Complete Blood Count (CBC) with Differential is one of the most commonly ordered blood tests. It provides a comprehensive look at the cells in your blood, including red blood cells that carry oxygen, white blood cells that fight infection, and platelets that help with clotting. The differential breaks down white blood cells into five subtypes, giving your physician a detailed picture of your immune system health. This test is essential for screening conditions like anemia, infection, inflammation, and blood cancers.",
    biomarkers: [
      "White Blood Cell Count (WBC)",
      "Red Blood Cell Count (RBC)",
      "Hemoglobin",
      "Hematocrit",
      "Platelet Count",
      "Mean Corpuscular Volume (MCV)",
      "Mean Corpuscular Hemoglobin (MCH)",
      "Red Cell Distribution Width (RDW)",
      "Neutrophils",
      "Lymphocytes",
      "Monocytes",
      "Eosinophils",
      "Basophils",
    ],
    sampleType: "Blood draw",
    fastingRequired: false,
    resultsIn: "1–2 business days",
    prepInstructions: "No fasting required. Stay hydrated before your blood draw.",
  },
  {
    id: "cmp",
    slug: "comprehensive-metabolic-panel",
    name: "Comprehensive Metabolic Panel",
    category: "Metabolic Health",
    provider: "Quest",
    price: 24.99,
    hospitalPrice: 200,
    questDirectPrice: 49,
    description:
      "A group of 14 blood tests that evaluate kidney function, liver function, blood sugar, electrolytes, and your body's chemical balance.",
    longDescription:
      "The Comprehensive Metabolic Panel (CMP) is a group of 14 blood tests that provide critical information about your body's chemical balance and metabolism. It evaluates how well your kidneys and liver are functioning, your blood sugar and calcium levels, and the balance of electrolytes and fluids in your body. This panel is one of the most commonly ordered tests for routine health screening and is essential for monitoring chronic conditions like diabetes, kidney disease, and liver disease.",
    biomarkers: [
      "Glucose",
      "BUN (Blood Urea Nitrogen)",
      "Creatinine",
      "Sodium",
      "Potassium",
      "Chloride",
      "CO2 (Carbon Dioxide)",
      "Calcium",
      "Total Protein",
      "Albumin",
      "Bilirubin",
      "Alkaline Phosphatase (ALP)",
      "AST (Aspartate Aminotransferase)",
      "ALT (Alanine Aminotransferase)",
    ],
    sampleType: "Blood draw",
    fastingRequired: true,
    resultsIn: "1–2 business days",
    prepInstructions:
      "Fasting for 10–12 hours before the test is required. Water is permitted.",
  },
  {
    id: "bmp",
    slug: "basic-metabolic-panel",
    name: "Basic Metabolic Panel",
    category: "Metabolic Health",
    provider: "Quest",
    price: 14.99,
    hospitalPrice: 150,
    questDirectPrice: 30,
    description:
      "Measures blood sugar, calcium, electrolytes, and kidney function markers to evaluate your body's metabolic status.",
    longDescription:
      "The Basic Metabolic Panel (BMP) is a group of 8 tests that measure glucose, calcium, and electrolytes, along with kidney function markers. It provides a snapshot of your body's metabolic status and is commonly used for routine health screening, monitoring medication effects, and evaluating conditions like diabetes and kidney disease.",
    biomarkers: [
      "Glucose",
      "BUN (Blood Urea Nitrogen)",
      "Creatinine",
      "Sodium",
      "Potassium",
      "Chloride",
      "CO2 (Carbon Dioxide)",
      "Calcium",
    ],
    sampleType: "Blood draw",
    fastingRequired: true,
    resultsIn: "1–2 business days",
    prepInstructions:
      "Fasting for 10–12 hours before the test is required. Water is permitted.",
  },
  {
    id: "lipid",
    slug: "lipid-panel",
    name: "Lipid Panel",
    category: "Heart Health",
    provider: "Quest",
    price: 29.99,
    hospitalPrice: 250,
    questDirectPrice: 59,
    description:
      "Measures cholesterol and triglyceride levels to assess cardiovascular disease risk. One of the most commonly ordered heart health screenings.",
    longDescription:
      "The Lipid Panel is a critical cardiovascular screening tool that measures the fats (lipids) in your blood. It includes total cholesterol, LDL (bad) cholesterol, HDL (good) cholesterol, and triglycerides. These values help your physician assess your risk for heart disease, stroke, and other cardiovascular conditions. The American Heart Association recommends adults have their cholesterol checked every 4–6 years, or more frequently if you have risk factors.",
    biomarkers: [
      "Total Cholesterol",
      "LDL Cholesterol (calculated)",
      "HDL Cholesterol",
      "Triglycerides",
      "VLDL Cholesterol (calculated)",
      "Total Cholesterol/HDL Ratio",
    ],
    sampleType: "Blood draw",
    fastingRequired: true,
    resultsIn: "1–2 business days",
    prepInstructions:
      "Fasting for 9–12 hours is required for accurate triglyceride and LDL results. Water is permitted.",
  },
  {
    id: "a1c",
    slug: "hemoglobin-a1c",
    name: "Hemoglobin A1c",
    category: "Diabetes",
    provider: "Quest",
    price: 19.99,
    hospitalPrice: 180,
    questDirectPrice: 45,
    description:
      "Measures your average blood sugar over the past 2–3 months. Used to screen for prediabetes and diabetes and monitor blood sugar control.",
    longDescription:
      "The Hemoglobin A1c (HbA1c) test measures the percentage of hemoglobin in your blood that has glucose attached to it. Since red blood cells live about 3 months, this test reflects your average blood sugar levels over that period. It's the gold standard for diagnosing prediabetes and type 2 diabetes, and for monitoring how well diabetes is being managed. An A1c below 5.7% is normal, 5.7–6.4% indicates prediabetes, and 6.5% or higher suggests diabetes.",
    biomarkers: ["Hemoglobin A1c (%)", "Estimated Average Glucose (eAG)"],
    sampleType: "Blood draw",
    fastingRequired: false,
    resultsIn: "1–2 business days",
    prepInstructions: "No fasting required. No special preparation needed.",
  },
  {
    id: "crp",
    slug: "c-reactive-protein",
    name: "C-Reactive Protein",
    category: "Inflammation",
    provider: "Quest",
    price: 24.99,
    hospitalPrice: 160,
    questDirectPrice: 41,
    description:
      "Measures CRP, a protein produced in response to inflammation. Elevated levels can indicate infection, chronic conditions, or cardiovascular risk.",
    longDescription:
      "C-Reactive Protein (CRP) is produced by the liver in response to inflammation anywhere in the body. The high-sensitivity CRP (hs-CRP) test can detect even small elevations, making it valuable for assessing cardiovascular risk in addition to identifying acute inflammation from infection or chronic conditions like autoimmune diseases. Studies have shown that elevated hs-CRP is independently associated with increased risk of heart attack and stroke.",
    biomarkers: ["C-Reactive Protein (hs-CRP)"],
    sampleType: "Blood draw",
    fastingRequired: false,
    resultsIn: "1–3 business days",
    prepInstructions:
      "No fasting required. Avoid strenuous exercise 24 hours before the test.",
  },
  {
    id: "insulin",
    slug: "fasting-insulin",
    name: "Fasting Insulin",
    category: "Diabetes",
    provider: "Quest",
    price: 29.99,
    hospitalPrice: 210,
    questDirectPrice: 105,
    description:
      "Measures fasting insulin levels to detect early insulin resistance — a precursor to type 2 diabetes — before blood sugar becomes abnormal.",
    longDescription:
      "The Fasting Insulin test measures the level of insulin in your blood after an overnight fast. Insulin is the hormone that regulates blood sugar, and elevated fasting levels can indicate insulin resistance — a condition where your cells don't respond normally to insulin. Insulin resistance is a precursor to type 2 diabetes and metabolic syndrome, often developing years before blood sugar levels become abnormally high. Catching it early allows for lifestyle interventions that can prevent or delay diabetes.",
    biomarkers: ["Insulin (fasting)"],
    sampleType: "Blood draw",
    fastingRequired: true,
    resultsIn: "1–3 business days",
    prepInstructions:
      "Fasting for 10–12 hours is required. Water is permitted. Test in the morning for best results.",
  },
  {
    id: "cholesterol",
    slug: "total-cholesterol",
    name: "Total Cholesterol",
    category: "Heart Health",
    provider: "Labcorp",
    price: 14.99,
    hospitalPrice: 100,
    questDirectPrice: 30,
    description:
      "Measures your total blood cholesterol level to help assess heart disease risk.",
    longDescription:
      "Total Cholesterol is a measure of all the cholesterol in your blood, including LDL, HDL, and VLDL. While a full lipid panel provides more detail, a total cholesterol test offers a quick screening for heart disease risk. Desirable total cholesterol is below 200 mg/dL. Levels between 200–239 mg/dL are borderline high, and 240 mg/dL or above is considered high.",
    biomarkers: ["Total Cholesterol"],
    sampleType: "Blood draw",
    fastingRequired: false,
    resultsIn: "1–2 business days",
    prepInstructions:
      "Fasting is not required for total cholesterol alone, but may be recommended.",
  },
  {
    id: "triglycerides",
    slug: "triglycerides",
    name: "Triglycerides",
    category: "Heart Health",
    provider: "Labcorp",
    price: 14.99,
    hospitalPrice: 100,
    questDirectPrice: 30,
    description:
      "Measures triglyceride levels in your blood. High levels increase your risk for heart disease and pancreatitis.",
    longDescription:
      "Triglycerides are the most common type of fat in your body. Your body converts excess calories, sugar, and alcohol into triglycerides, which are stored in fat cells. High triglyceride levels combined with high LDL cholesterol or low HDL cholesterol can accelerate atherosclerosis (hardening of the arteries), increasing your risk for heart attack, stroke, and pancreatitis.",
    biomarkers: ["Triglycerides"],
    sampleType: "Blood draw",
    fastingRequired: true,
    resultsIn: "1–2 business days",
    prepInstructions:
      "Fasting for 9–12 hours is required. Avoid alcohol for 24 hours before the test.",
  },
  {
    id: "fsh",
    slug: "fsh",
    name: "FSH",
    category: "Hormones",
    provider: "Quest",
    price: 24.99,
    hospitalPrice: 150,
    questDirectPrice: 49,
    description:
      "Measures follicle-stimulating hormone levels. Used to evaluate fertility, menstrual irregularities, and pituitary function.",
    longDescription:
      "Follicle-Stimulating Hormone (FSH) is produced by the pituitary gland and plays a key role in reproductive health. In women, FSH helps regulate the menstrual cycle and stimulates egg production. In men, FSH is essential for sperm production. Abnormal FSH levels can indicate fertility issues, menopause, polycystic ovary syndrome (PCOS), or pituitary disorders. This test is commonly ordered for women experiencing irregular periods or difficulty conceiving.",
    biomarkers: ["Follicle-Stimulating Hormone (FSH)"],
    sampleType: "Blood draw",
    fastingRequired: false,
    resultsIn: "1–3 business days",
    prepInstructions:
      "No fasting required. Women: your physician may recommend testing on a specific day of your menstrual cycle.",
  },
  {
    id: "ana",
    slug: "ana-screen",
    name: "ANA Screen",
    category: "Inflammation",
    provider: "Labcorp",
    price: 34.99,
    hospitalPrice: 200,
    questDirectPrice: 65,
    description:
      "Screens for antinuclear antibodies, which can indicate autoimmune conditions like lupus, rheumatoid arthritis, and Sjögren's syndrome.",
    longDescription:
      "The ANA (Antinuclear Antibody) Screen detects antibodies that target the nucleus of your own cells. A positive ANA result can indicate an autoimmune condition where your immune system mistakenly attacks healthy tissue. Common conditions associated with positive ANA include systemic lupus erythematosus (SLE), rheumatoid arthritis, Sjögren's syndrome, and scleroderma. However, a positive ANA alone does not diagnose any specific disease — it's used as a screening tool alongside symptoms and other tests.",
    biomarkers: ["Antinuclear Antibodies (ANA)", "ANA Pattern", "ANA Titer"],
    sampleType: "Blood draw",
    fastingRequired: false,
    resultsIn: "2–4 business days",
    prepInstructions: "No fasting required. No special preparation needed.",
  },
  {
    id: "homocysteine",
    slug: "homocysteine",
    name: "Homocysteine",
    category: "Heart Health",
    provider: "Quest",
    price: 34.99,
    hospitalPrice: 200,
    questDirectPrice: 65,
    description:
      "Measures homocysteine, an amino acid linked to heart disease and stroke risk when elevated. Also indicates B12 and folate status.",
    longDescription:
      "Homocysteine is an amino acid produced when proteins are broken down in the body. Normally, vitamins B6, B12, and folate convert homocysteine into other substances your body needs. When these vitamins are deficient, homocysteine levels rise, which is associated with increased risk of cardiovascular disease, blood clots, and stroke. Elevated homocysteine is also linked to cognitive decline and osteoporosis. This test is especially important for people with a family history of heart disease.",
    biomarkers: ["Homocysteine"],
    sampleType: "Blood draw",
    fastingRequired: true,
    resultsIn: "2–4 business days",
    prepInstructions:
      "Fasting for 10–12 hours is recommended for the most accurate results.",
  },
];

export const categories: TestCategory[] = [
  "Blood Health",
  "Heart Health",
  "Metabolic Health",
  "Hormones",
  "Inflammation",
  "Diabetes",
  "Vitamins",
];

export function getTestBySlug(slug: string): LabTest | undefined {
  return tests.find((t) => t.slug === slug);
}

export function getTestsByCategory(category: TestCategory): LabTest[] {
  return tests.filter((t) => t.category === category);
}

export function getRelatedTests(test: LabTest, limit = 3): LabTest[] {
  return tests
    .filter((t) => t.id !== test.id && t.category === test.category)
    .slice(0, limit);
}

export function getSavingsPercent(test: LabTest): number {
  return Math.round(((test.hospitalPrice - test.price) / test.hospitalPrice) * 100);
}
