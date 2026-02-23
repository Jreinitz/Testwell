export type LabProvider = "Quest" | "Labcorp";

export type TestCategory =
  | "Blood Health"
  | "Heart Health"
  | "Metabolic Health"
  | "Hormones"
  | "Inflammation"
  | "Diabetes"
  | "Vitamins"
  | "Autoimmune"
  | "Kidney & Urinary"
  | "Genetics"
  | "Gut Health"
  | "Comprehensive Panels";

export interface LabTest {
  id: string;
  slug: string;
  name: string;
  category: TestCategory;
  provider: LabProvider;
  price: number;
  hospitalPrice: number;
  questDirectPrice: number;
  fullscriptCost: number;
  description: string;
  longDescription: string;
  biomarkers: string[];
  sampleType: string;
  fastingRequired: boolean;
  resultsIn: string;
  prepInstructions: string;
}

export const tests: LabTest[] = [
  // ───────────────────────────────────────────
  // METABOLIC PANELS
  // ───────────────────────────────────────────
  {
    id: "bmp",
    slug: "basic-metabolic-panel",
    name: "Basic Metabolic Panel",
    category: "Metabolic Health",
    provider: "Quest",
    price: 14.99,
    hospitalPrice: 150,
    questDirectPrice: 30,
    fullscriptCost: 6.10,
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
    id: "cmp",
    slug: "comprehensive-metabolic-panel",
    name: "Comprehensive Metabolic Panel",
    category: "Metabolic Health",
    provider: "Quest",
    price: 19.99,
    hospitalPrice: 200,
    questDirectPrice: 49,
    fullscriptCost: 7.90,
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
    id: "cmp-no-alt",
    slug: "comprehensive-metabolic-panel-without-alt",
    name: "Comprehensive Metabolic Panel without ALT",
    category: "Metabolic Health",
    provider: "Quest",
    price: 19.99,
    hospitalPrice: 190,
    questDirectPrice: 45,
    fullscriptCost: 7.90,
    description:
      "A comprehensive metabolic panel that includes 13 tests evaluating kidney, liver, and metabolic function — excluding ALT.",
    longDescription:
      "This variation of the Comprehensive Metabolic Panel includes all the standard markers except ALT (Alanine Aminotransferase). It still evaluates kidney function, liver function (via AST, ALP, bilirubin), blood sugar, electrolytes, and protein levels. Some practitioners prefer this panel when ALT monitoring is not clinically indicated or when ordering it separately.",
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
    ],
    sampleType: "Blood draw",
    fastingRequired: true,
    resultsIn: "1–2 business days",
    prepInstructions:
      "Fasting for 10–12 hours before the test is required. Water is permitted.",
  },

  // ───────────────────────────────────────────
  // BLOOD HEALTH (CBC)
  // ───────────────────────────────────────────
  {
    id: "cbc-basic",
    slug: "cbc",
    name: "CBC",
    category: "Blood Health",
    provider: "Quest",
    price: 9.99,
    hospitalPrice: 100,
    questDirectPrice: 25,
    fullscriptCost: 4.00,
    description:
      "A basic complete blood count measuring red blood cells, white blood cells, hemoglobin, hematocrit, and platelets.",
    longDescription:
      "The Complete Blood Count (CBC) is one of the most commonly ordered blood tests. It measures the cells in your blood including red blood cells that carry oxygen, white blood cells that fight infection, hemoglobin, hematocrit, and platelets. It's a quick screening tool for anemia, infection, and other blood disorders.",
    biomarkers: [
      "White Blood Cell Count (WBC)",
      "Red Blood Cell Count (RBC)",
      "Hemoglobin",
      "Hematocrit",
      "Platelet Count",
      "Mean Corpuscular Volume (MCV)",
      "Mean Corpuscular Hemoglobin (MCH)",
    ],
    sampleType: "Blood draw",
    fastingRequired: false,
    resultsIn: "1–2 business days",
    prepInstructions: "No fasting required. Stay hydrated before your blood draw.",
  },
  {
    id: "cbc",
    slug: "cbc-with-differential",
    name: "CBC with Differential",
    category: "Blood Health",
    provider: "Quest",
    price: 12.99,
    hospitalPrice: 150,
    questDirectPrice: 32,
    fullscriptCost: 3.49,
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

  // ───────────────────────────────────────────
  // HEART HEALTH / LIPIDS
  // ───────────────────────────────────────────
  {
    id: "lipid",
    slug: "lipid-panel",
    name: "Lipid Panel",
    category: "Heart Health",
    provider: "Quest",
    price: 14.99,
    hospitalPrice: 250,
    questDirectPrice: 59,
    fullscriptCost: 5.00,
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
    id: "lipid-ldl-hdl-ratio",
    slug: "lipid-panel-with-ldl-hdl-ratio",
    name: "Lipid Panel with LDL/HDL Ratio",
    category: "Heart Health",
    provider: "Labcorp",
    price: 17.99,
    hospitalPrice: 260,
    questDirectPrice: 62,
    fullscriptCost: 7.35,
    description:
      "A standard lipid panel plus the calculated LDL/HDL ratio, providing additional insight into cardiovascular risk.",
    longDescription:
      "This enhanced lipid panel includes all standard cholesterol and triglyceride measurements plus the LDL/HDL ratio. The LDL-to-HDL ratio is considered a strong predictor of cardiovascular risk — a lower ratio indicates better heart health. An optimal LDL/HDL ratio is below 2.0 for women and below 2.5 for men.",
    biomarkers: [
      "Total Cholesterol",
      "LDL Cholesterol",
      "HDL Cholesterol",
      "Triglycerides",
      "LDL/HDL Ratio",
    ],
    sampleType: "Blood draw",
    fastingRequired: true,
    resultsIn: "1–2 business days",
    prepInstructions:
      "Fasting for 9–12 hours is required. Water is permitted.",
  },
  {
    id: "lipid-tc-hdl-ratio",
    slug: "lipid-panel-with-total-cholesterol-hdl-ratio",
    name: "Lipid Panel with Total Cholesterol/HDL Ratio",
    category: "Heart Health",
    provider: "Labcorp",
    price: 17.99,
    hospitalPrice: 260,
    questDirectPrice: 62,
    fullscriptCost: 7.35,
    description:
      "A standard lipid panel plus the Total Cholesterol/HDL ratio for a broader cardiovascular risk assessment.",
    longDescription:
      "This lipid panel adds the Total Cholesterol to HDL ratio to the standard lipid measurements. This ratio is widely used by physicians as a quick cardiovascular risk indicator. An optimal TC/HDL ratio is below 3.5. A ratio above 5 indicates higher cardiovascular risk.",
    biomarkers: [
      "Total Cholesterol",
      "LDL Cholesterol",
      "HDL Cholesterol",
      "Triglycerides",
      "Total Cholesterol/HDL Ratio",
    ],
    sampleType: "Blood draw",
    fastingRequired: true,
    resultsIn: "1–2 business days",
    prepInstructions:
      "Fasting for 9–12 hours is required. Water is permitted.",
  },
  {
    id: "ldl-direct",
    slug: "ldl-cholesterol-direct",
    name: "LDL Cholesterol, Direct",
    category: "Heart Health",
    provider: "Quest",
    price: 24.99,
    hospitalPrice: 180,
    questDirectPrice: 55,
    fullscriptCost: 10.54,
    description:
      "A direct measurement of LDL cholesterol — more accurate than calculated LDL, especially when triglycerides are high.",
    longDescription:
      "Unlike standard lipid panels that calculate LDL using a formula, the Direct LDL test measures LDL cholesterol directly in the blood. This provides more accurate results, particularly for patients with high triglycerides (above 400 mg/dL), where the calculated method becomes unreliable. It's also preferred for monitoring patients on lipid-lowering therapies.",
    biomarkers: ["LDL Cholesterol (direct measurement)"],
    sampleType: "Blood draw",
    fastingRequired: false,
    resultsIn: "1–2 business days",
    prepInstructions: "Fasting is not required for direct LDL measurement.",
  },
  {
    id: "cholesterol-total",
    slug: "total-cholesterol",
    name: "Total Cholesterol",
    category: "Heart Health",
    provider: "Quest",
    price: 9.99,
    hospitalPrice: 100,
    questDirectPrice: 30,
    fullscriptCost: 2.78,
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
    provider: "Quest",
    price: 9.99,
    hospitalPrice: 100,
    questDirectPrice: 30,
    fullscriptCost: 2.78,
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
    id: "apob",
    slug: "apolipoprotein-b",
    name: "Apolipoprotein B",
    category: "Heart Health",
    provider: "Quest",
    price: 39.99,
    hospitalPrice: 280,
    questDirectPrice: 89,
    fullscriptCost: 18.00,
    description:
      "Measures ApoB, the primary protein on LDL particles. Considered by many cardiologists to be the best single marker for cardiovascular risk.",
    longDescription:
      "Apolipoprotein B (ApoB) is the main structural protein on atherogenic lipoproteins, including LDL, VLDL, and Lp(a). Each LDL particle contains exactly one ApoB molecule, so measuring ApoB directly tells you how many LDL particles are in your blood — a better predictor of cardiovascular risk than LDL cholesterol alone. Many leading cardiologists now consider ApoB the single best lipid marker for assessing heart disease risk.",
    biomarkers: ["Apolipoprotein B"],
    sampleType: "Blood draw",
    fastingRequired: false,
    resultsIn: "2–4 business days",
    prepInstructions: "Fasting is preferred but not required.",
  },
  {
    id: "lpa",
    slug: "lipoprotein-a",
    name: "Lipoprotein(a)",
    category: "Heart Health",
    provider: "Quest",
    price: 34.99,
    hospitalPrice: 250,
    questDirectPrice: 75,
    fullscriptCost: 16.00,
    description:
      "Measures Lp(a), a genetically determined cardiovascular risk factor. Elevated levels significantly increase heart attack and stroke risk.",
    longDescription:
      "Lipoprotein(a) — or Lp(a) — is a type of LDL particle that is largely determined by your genetics. Elevated Lp(a) is an independent risk factor for heart disease, heart attack, stroke, and aortic valve disease. Unlike other cholesterol markers, Lp(a) levels are 80–90% genetically determined and don't change much with diet or exercise. The European Atherosclerosis Society recommends everyone have their Lp(a) measured at least once in their lifetime.",
    biomarkers: ["Lipoprotein(a)"],
    sampleType: "Blood draw",
    fastingRequired: false,
    resultsIn: "2–4 business days",
    prepInstructions: "No fasting required. No special preparation needed.",
  },
  {
    id: "advanced-lipid",
    slug: "advanced-lipid-panel-with-inflammation",
    name: "Advanced Lipid Panel with Inflammation",
    category: "Heart Health",
    provider: "Quest",
    price: 199.99,
    hospitalPrice: 800,
    questDirectPrice: 350,
    fullscriptCost: 138.69,
    description:
      "Cardio IQ advanced panel combining comprehensive lipid analysis with inflammation markers for a thorough cardiovascular risk assessment.",
    longDescription:
      "The Cardio IQ Advanced Lipid Panel with Inflammation is the most comprehensive cardiovascular screening available. It goes beyond standard lipid panels to include particle size and number analysis, inflammatory markers, and advanced risk indicators. This panel helps identify patients who may have normal cholesterol but elevated cardiovascular risk due to small dense LDL particles or chronic inflammation.",
    biomarkers: [
      "Total Cholesterol",
      "LDL Cholesterol",
      "HDL Cholesterol",
      "Triglycerides",
      "LDL Particle Number",
      "LDL Particle Size",
      "Small Dense LDL",
      "Lipoprotein(a)",
      "Apolipoprotein B",
      "hs-CRP",
      "Lp-PLA2",
    ],
    sampleType: "Blood draw",
    fastingRequired: true,
    resultsIn: "3–5 business days",
    prepInstructions:
      "Fasting for 12 hours is required. Water is permitted. Avoid alcohol for 48 hours prior.",
  },

  // ───────────────────────────────────────────
  // DIABETES & BLOOD SUGAR
  // ───────────────────────────────────────────
  {
    id: "a1c",
    slug: "hemoglobin-a1c",
    name: "Hemoglobin A1c",
    category: "Diabetes",
    provider: "Quest",
    price: 14.99,
    hospitalPrice: 180,
    questDirectPrice: 45,
    fullscriptCost: 5.00,
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
    id: "insulin",
    slug: "fasting-insulin",
    name: "Fasting Insulin",
    category: "Diabetes",
    provider: "Quest",
    price: 24.99,
    hospitalPrice: 210,
    questDirectPrice: 105,
    fullscriptCost: 8.00,
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

  // ───────────────────────────────────────────
  // INFLAMMATION
  // ───────────────────────────────────────────
  {
    id: "crp",
    slug: "c-reactive-protein",
    name: "C-Reactive Protein (CRP)",
    category: "Inflammation",
    provider: "Quest",
    price: 19.99,
    hospitalPrice: 160,
    questDirectPrice: 41,
    fullscriptCost: 8.00,
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
    id: "crp-inflammation",
    slug: "crp-inflammation",
    name: "C-Reactive Protein, Inflammation (CRP)",
    category: "Inflammation",
    provider: "Labcorp",
    price: 24.99,
    hospitalPrice: 175,
    questDirectPrice: 50,
    fullscriptCost: 10.32,
    description:
      "A quantitative CRP test designed specifically to measure inflammatory response, useful for monitoring autoimmune and inflammatory conditions.",
    longDescription:
      "This CRP Inflammation test provides a quantitative measurement of C-Reactive Protein levels to assess and monitor inflammatory conditions. It is particularly useful for tracking the progression of autoimmune diseases, monitoring post-surgical recovery, and evaluating the effectiveness of anti-inflammatory treatments. Unlike the high-sensitivity CRP test used for cardiac risk, this version measures a broader range of CRP levels.",
    biomarkers: ["C-Reactive Protein (quantitative)"],
    sampleType: "Blood draw",
    fastingRequired: false,
    resultsIn: "1–3 business days",
    prepInstructions:
      "No fasting required. Avoid strenuous exercise 24 hours before the test.",
  },

  // ───────────────────────────────────────────
  // HORMONES
  // ───────────────────────────────────────────
  {
    id: "fsh",
    slug: "fsh",
    name: "FSH (Follicle Stimulating Hormone)",
    category: "Hormones",
    provider: "Quest",
    price: 19.99,
    hospitalPrice: 150,
    questDirectPrice: 49,
    fullscriptCost: 8.00,
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
    id: "fsh-lh",
    slug: "fsh-and-lh",
    name: "FSH and LH",
    category: "Hormones",
    provider: "Quest",
    price: 29.99,
    hospitalPrice: 250,
    questDirectPrice: 69,
    fullscriptCost: 12.50,
    description:
      "Measures both FSH and LH together to evaluate reproductive hormone balance, fertility, and menopause status.",
    longDescription:
      "This combined test measures both Follicle-Stimulating Hormone (FSH) and Luteinizing Hormone (LH). Together, these hormones regulate the reproductive system. The FSH/LH ratio is particularly useful for diagnosing polycystic ovary syndrome (PCOS), evaluating fertility in both men and women, confirming menopause, and assessing pituitary function. In PCOS, the LH/FSH ratio is often elevated above 2:1.",
    biomarkers: [
      "Follicle-Stimulating Hormone (FSH)",
      "Luteinizing Hormone (LH)",
    ],
    sampleType: "Blood draw",
    fastingRequired: false,
    resultsIn: "1–3 business days",
    prepInstructions:
      "No fasting required. Women: testing on day 3 of the menstrual cycle may be recommended.",
  },

  // ───────────────────────────────────────────
  // AUTOIMMUNE
  // ───────────────────────────────────────────
  {
    id: "ana",
    slug: "ana-screen",
    name: "ANA Screen",
    category: "Autoimmune",
    provider: "Labcorp",
    price: 29.99,
    hospitalPrice: 200,
    questDirectPrice: 65,
    fullscriptCost: 12.31,
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
    id: "ana-reflex-titer",
    slug: "ana-screen-with-reflex-to-titer-and-pattern",
    name: "ANA Screen, IFA, with Reflex to Titer and Pattern",
    category: "Autoimmune",
    provider: "Quest",
    price: 24.99,
    hospitalPrice: 220,
    questDirectPrice: 70,
    fullscriptCost: 6.94,
    description:
      "An ANA screen using immunofluorescence that automatically reflexes to titer and pattern determination if positive.",
    longDescription:
      "This ANA test uses the Indirect Fluorescent Antibody (IFA) method, considered the gold standard for ANA testing. If the initial screen is positive, the test automatically reflexes to determine the titer (concentration) and pattern of the antibodies. Different ANA patterns (homogeneous, speckled, nucleolar, centromere) are associated with different autoimmune conditions, providing valuable diagnostic information.",
    biomarkers: [
      "ANA Screen (IFA)",
      "ANA Titer (if positive)",
      "ANA Pattern (if positive)",
    ],
    sampleType: "Blood draw",
    fastingRequired: false,
    resultsIn: "3–5 business days",
    prepInstructions: "No fasting required. No special preparation needed.",
  },
  {
    id: "ana-multiplex",
    slug: "ana-multiplex-with-reflex-to-dsdna",
    name: "ANA Multiplex, with Reflex to dsDNA",
    category: "Autoimmune",
    provider: "Quest",
    price: 179.99,
    hospitalPrice: 650,
    questDirectPrice: 280,
    fullscriptCost: 118.54,
    description:
      "A comprehensive ANA panel that tests for multiple specific autoantibodies and reflexes to anti-dsDNA if positive — a key lupus marker.",
    longDescription:
      "The ANA Multiplex with Reflex to dsDNA is an advanced autoimmune screening panel. It tests for multiple specific autoantibodies simultaneously, including anti-dsDNA (a hallmark of systemic lupus erythematosus), anti-Smith, anti-RNP, anti-SSA/Ro, anti-SSB/La, anti-Scl-70, and anti-Jo-1. This comprehensive approach helps clinicians narrow down which autoimmune condition may be present, reducing the need for sequential individual tests.",
    biomarkers: [
      "ANA Screen",
      "Anti-dsDNA (reflex)",
      "Anti-Smith",
      "Anti-RNP",
      "Anti-SSA/Ro",
      "Anti-SSB/La",
      "Anti-Scl-70",
      "Anti-Jo-1",
    ],
    sampleType: "Blood draw",
    fastingRequired: false,
    resultsIn: "4–7 business days",
    prepInstructions: "No fasting required. No special preparation needed.",
  },

  // ───────────────────────────────────────────
  // HEART HEALTH (HOMOCYSTEINE)
  // ───────────────────────────────────────────
  {
    id: "homocysteine",
    slug: "homocysteine",
    name: "Homocysteine",
    category: "Heart Health",
    provider: "Quest",
    price: 39.99,
    hospitalPrice: 200,
    questDirectPrice: 65,
    fullscriptCost: 19.44,
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

  // ───────────────────────────────────────────
  // GENETICS
  // ───────────────────────────────────────────
  {
    id: "mthfr",
    slug: "mthfr",
    name: "MTHFR Gene Mutation",
    category: "Genetics",
    provider: "Labcorp",
    price: 249.99,
    hospitalPrice: 800,
    questDirectPrice: 400,
    fullscriptCost: 180.21,
    description:
      "Tests for MTHFR gene mutations (C677T and A1298C) that affect folate metabolism, homocysteine levels, and methylation.",
    longDescription:
      "The MTHFR (Methylenetetrahydrofolate Reductase) gene test identifies mutations that can impair your body's ability to convert folate into its active form (methylfolate). MTHFR mutations are associated with elevated homocysteine levels, which increase cardiovascular risk. They can also affect neurotransmitter production, detoxification pathways, and pregnancy health. The two most common variants tested are C677T and A1298C. Knowing your MTHFR status can guide supplementation decisions — particularly whether you need methylfolate instead of standard folic acid.",
    biomarkers: ["MTHFR C677T Mutation", "MTHFR A1298C Mutation"],
    sampleType: "Blood draw",
    fastingRequired: false,
    resultsIn: "5–7 business days",
    prepInstructions: "No fasting required. No special preparation needed.",
  },

  // ───────────────────────────────────────────
  // KIDNEY & URINARY
  // ───────────────────────────────────────────
  {
    id: "albumin-creatinine",
    slug: "albumin-random-urine-with-creatinine",
    name: "Albumin, Random Urine with Creatinine",
    category: "Kidney & Urinary",
    provider: "Quest",
    price: 34.99,
    hospitalPrice: 180,
    questDirectPrice: 65,
    fullscriptCost: 15.50,
    description:
      "Measures albumin and creatinine in a random urine sample to detect early kidney damage, especially in diabetic patients.",
    longDescription:
      "This test measures the albumin-to-creatinine ratio (ACR) in a random urine sample. Albumin is a protein that should not normally appear in urine in significant amounts. Its presence (microalbuminuria) is one of the earliest signs of kidney damage. This test is especially important for patients with diabetes or hypertension, where kidney disease is a common complication. The random urine collection makes it much more convenient than a 24-hour urine collection.",
    biomarkers: [
      "Urine Albumin",
      "Urine Creatinine",
      "Albumin/Creatinine Ratio (ACR)",
    ],
    sampleType: "Urine sample",
    fastingRequired: false,
    resultsIn: "1–3 business days",
    prepInstructions: "No fasting required. Collect a random urine sample at the lab.",
  },
  {
    id: "microalbumin-24hr",
    slug: "microalbumin-24-hour-urine",
    name: "Microalbumin, 24 Hour Urine",
    category: "Kidney & Urinary",
    provider: "Labcorp",
    price: 24.99,
    hospitalPrice: 200,
    questDirectPrice: 55,
    fullscriptCost: 8.99,
    description:
      "A 24-hour urine collection to quantify microalbumin levels for precise kidney function assessment.",
    longDescription:
      "The 24-hour Microalbumin urine test measures the total amount of albumin excreted over a full day, providing a more precise measurement of kidney function than a random urine sample. This test is the gold standard for detecting and monitoring diabetic nephropathy and other forms of kidney disease. It requires collecting all urine for a 24-hour period.",
    biomarkers: ["Microalbumin (24-hour)"],
    sampleType: "24-hour urine collection",
    fastingRequired: false,
    resultsIn: "2–4 business days",
    prepInstructions:
      "Requires 24-hour urine collection. You will be provided a container. Collect all urine for a full 24-hour period.",
  },

  // ───────────────────────────────────────────
  // GUT HEALTH
  // ───────────────────────────────────────────
  {
    id: "gi-map",
    slug: "gi-map",
    name: "GI-MAP (GI Microbial Assay Plus)",
    category: "Gut Health",
    provider: "Quest",
    price: 449.99,
    hospitalPrice: 1200,
    questDirectPrice: 600,
    fullscriptCost: 327.18,
    description:
      "The most comprehensive stool test available — analyzes gut bacteria, parasites, fungi, viruses, and digestive markers using advanced DNA technology.",
    longDescription:
      "The GI-MAP (Gastrointestinal Microbial Assay Plus) is a comprehensive stool analysis that uses quantitative PCR (qPCR) technology to detect and quantify microorganisms in your gut. It screens for pathogenic bacteria (H. pylori, C. difficile, E. coli), parasites, fungi/yeast (Candida), and viruses. It also measures markers of digestion, absorption, inflammation (calprotectin), and immune function (secretory IgA). This test is invaluable for patients with IBS, IBD, SIBO, chronic diarrhea, constipation, bloating, or unexplained digestive symptoms.",
    biomarkers: [
      "H. pylori",
      "Pathogenic bacteria",
      "Parasites",
      "Candida/Yeast",
      "Viral markers",
      "Calprotectin",
      "Secretory IgA",
      "Elastase",
      "Steatocrit",
      "Beta-glucuronidase",
    ],
    sampleType: "Stool sample (at-home kit)",
    fastingRequired: false,
    resultsIn: "10–14 business days",
    prepInstructions:
      "Collect stool sample at home using the provided kit. Follow kit instructions carefully. Ship the sample the same day of collection.",
  },
  {
    id: "gi-map-stoolmx",
    slug: "gi-map-plus-stoolmx",
    name: "GI-MAP + StoolOMX",
    category: "Gut Health",
    provider: "Quest",
    price: 549.99,
    hospitalPrice: 1500,
    questDirectPrice: 750,
    fullscriptCost: 416.56,
    description:
      "The GI-MAP comprehensive stool test enhanced with StoolOMX metabolomics for an even deeper analysis of gut health and function.",
    longDescription:
      "This premium gut health panel combines the comprehensive GI-MAP stool analysis with StoolOMX metabolomics testing. In addition to all the microbial, pathogen, and digestive markers in the standard GI-MAP, the StoolOMX add-on provides metabolomic data — measuring the metabolic byproducts of gut microbes to better understand how your microbiome is functioning. This is the most thorough gut health assessment available.",
    biomarkers: [
      "All GI-MAP markers",
      "Short-chain fatty acids",
      "Metabolomic markers",
      "Microbiome metabolic function",
    ],
    sampleType: "Stool sample (at-home kit)",
    fastingRequired: false,
    resultsIn: "14–21 business days",
    prepInstructions:
      "Collect stool sample at home using the provided kit. Follow kit instructions carefully.",
  },

  // ───────────────────────────────────────────
  // COMPREHENSIVE HORMONE PANELS (DUTCH)
  // ───────────────────────────────────────────
  {
    id: "dutch-complete",
    slug: "dutch-complete",
    name: "DUTCH Complete",
    category: "Hormones",
    provider: "Quest",
    price: 399.99,
    hospitalPrice: 1000,
    questDirectPrice: 550,
    fullscriptCost: 300.00,
    description:
      "The most comprehensive hormone test available — dried urine analysis measuring sex hormones, adrenal hormones, melatonin, and their metabolites.",
    longDescription:
      "The DUTCH Complete (Dried Urine Test for Comprehensive Hormones) is the most advanced hormone panel available. Unlike blood tests that measure hormones at a single point in time, DUTCH uses dried urine samples collected over a 24-hour period to measure hormone levels and — critically — their metabolites. This reveals how your body processes hormones, providing insight that blood tests cannot. It covers estrogen, progesterone, testosterone, DHEA-S, cortisol (with a full diurnal pattern), melatonin, and key metabolites that indicate cancer risk, methylation status, and adrenal function.",
    biomarkers: [
      "Estradiol & metabolites",
      "Progesterone metabolites",
      "Testosterone & metabolites",
      "DHEA-S",
      "Cortisol (diurnal pattern)",
      "Cortisone",
      "Melatonin",
      "8-OHdG (oxidative stress)",
    ],
    sampleType: "Dried urine (at-home kit)",
    fastingRequired: false,
    resultsIn: "10–14 business days",
    prepInstructions:
      "Collect 4–5 dried urine samples over a 24-hour period at home using the provided kit.",
  },
  {
    id: "dutch-plus",
    slug: "dutch-plus",
    name: "DUTCH Plus",
    category: "Hormones",
    provider: "Quest",
    price: 499.99,
    hospitalPrice: 1200,
    questDirectPrice: 700,
    fullscriptCost: 400.00,
    description:
      "The DUTCH Complete test enhanced with the Cortisol Awakening Response (CAR) for deeper adrenal and stress assessment.",
    longDescription:
      "DUTCH Plus includes everything in the DUTCH Complete test, plus the Cortisol Awakening Response (CAR) — a critical marker for evaluating HPA axis (hypothalamic-pituitary-adrenal) function. The CAR measures how cortisol rises in the first 30–45 minutes after waking and is associated with chronic stress, depression, PTSD, burnout, and chronic fatigue. This is the ultimate hormone panel for patients with stress-related symptoms, fatigue, mood disorders, or complex hormonal issues.",
    biomarkers: [
      "All DUTCH Complete markers",
      "Cortisol Awakening Response (CAR)",
      "Free cortisol pattern",
      "Cortisol metabolites",
    ],
    sampleType: "Dried urine + saliva (at-home kit)",
    fastingRequired: false,
    resultsIn: "10–14 business days",
    prepInstructions:
      "Collect dried urine and saliva samples using the provided kit. Follow specific timing instructions included in the kit.",
  },

  // ───────────────────────────────────────────
  // ANA COMPONENTS (High-end)
  // ───────────────────────────────────────────
  {
    id: "ana-11-components",
    slug: "ana-plus-11-components",
    name: "ANA + 11 Components",
    category: "Autoimmune",
    provider: "Labcorp",
    price: 1999.99,
    hospitalPrice: 4500,
    questDirectPrice: 3000,
    fullscriptCost: 1787.44,
    description:
      "The most comprehensive autoimmune antibody panel — ANA screen plus 11 specific autoantibodies for definitive autoimmune diagnosis.",
    longDescription:
      "This is the most extensive autoimmune panel available, combining an ANA screen with 11 specific autoantibody tests. It is designed for patients with complex or overlapping autoimmune symptoms where a precise diagnosis is needed. The panel includes antibodies specific to lupus, Sjögren's, scleroderma, dermatomyositis, mixed connective tissue disease, and other conditions. While expensive, it can replace the need for ordering multiple individual antibody tests sequentially.",
    biomarkers: [
      "ANA Screen",
      "Anti-dsDNA",
      "Anti-Smith",
      "Anti-RNP",
      "Anti-SSA/Ro",
      "Anti-SSB/La",
      "Anti-Scl-70",
      "Anti-Jo-1",
      "Anti-centromere",
      "Anti-histone",
      "Anti-chromatin",
      "Anti-ribosomal P",
    ],
    sampleType: "Blood draw",
    fastingRequired: false,
    resultsIn: "5–10 business days",
    prepInstructions: "No fasting required. No special preparation needed.",
  },
];

export const categories: TestCategory[] = [
  "Blood Health",
  "Heart Health",
  "Metabolic Health",
  "Hormones",
  "Inflammation",
  "Diabetes",
  "Autoimmune",
  "Kidney & Urinary",
  "Genetics",
  "Gut Health",
  "Vitamins",
  "Comprehensive Panels",
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
