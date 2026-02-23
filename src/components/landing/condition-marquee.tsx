"use client";

import { motion } from "framer-motion";

const conditions1 = [
  "Diabetes", "Anemia", "Hypothyroidism", "Insulin Resistance",
  "Heart Disease", "Lupus", "Gout", "Celiac Disease",
  "Fatty Liver", "Chronic Kidney Disease", "PCOS",
  "Rheumatoid Arthritis", "Vitamin Deficiency", "Thyroid Disorders",
  "High Cholesterol", "Metabolic Syndrome",
];

const conditions2 = [
  "Iron Deficiency", "Inflammation", "Hormonal Imbalance",
  "Prediabetes", "Hepatitis", "Hyperthyroidism", "Osteoporosis",
  "Blood Clotting Disorders", "Prostate Issues", "Adrenal Fatigue",
  "Autoimmune Disease", "Cardiovascular Risk", "Electrolyte Imbalance",
  "Pancreatic Dysfunction", "Hemochromatosis", "B12 Deficiency",
];

function MarqueeRow({
  items,
  direction,
}: {
  items: string[];
  direction: "left" | "right";
}) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden marquee-container relative">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

      <div
        className={`flex gap-3 w-max ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
      >
        {doubled.map((condition, i) => (
          <span
            key={`${condition}-${i}`}
            className="inline-flex items-center px-5 py-2.5 rounded-full border border-slate-200/80 bg-white/80 backdrop-blur-sm text-sm text-slate-600 whitespace-nowrap hover:border-teal/40 hover:text-teal hover:bg-teal/[0.03] hover:shadow-sm transition-all duration-300 cursor-default"
          >
            {condition}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ConditionMarquee() {
  return (
    <section className="py-28 lg:py-36 bg-slate-50 overflow-hidden relative noise-overlay">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <p className="text-sm font-medium text-teal uppercase tracking-[0.2em] mb-5">
            You Decide What to Test
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Screen for what <span className="text-gradient italic">you</span> want.
            <br />
            <span className="text-gradient italic">When you want.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {["No referral required", "Track changes over time", "Catch problems early"].map(
            (label, i) => (
              <motion.span
                key={label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-teal/15 text-teal text-sm font-medium px-5 py-2.5 rounded-full shadow-sm"
              >
                <span className="w-1.5 h-1.5 bg-teal rounded-full" />
                {label}
              </motion.span>
            )
          )}
        </motion.div>
      </div>

      <div className="space-y-4">
        <MarqueeRow items={conditions1} direction="left" />
        <MarqueeRow items={conditions2} direction="right" />
      </div>
    </section>
  );
}
