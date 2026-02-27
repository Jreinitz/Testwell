"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const features = [
  "No insurance required",
  "Physician-reviewed results",
  "4,000+ lab locations",
  "Results in 1–3 days",
  "HIPAA-compliant portal",
  "HSA / FSA eligible",
  "Transparent pricing",
  "No surprise bills",
  "No appointment needed",
];

const competitors = [
  {
    name: "TestWell",
    highlight: true,
    features: [true, true, true, true, true, true, true, true, true],
  },
  {
    name: "Hospital Labs",
    highlight: false,
    features: [false, true, false, true, false, false, false, false, false],
  },
  {
    name: "Other DTC",
    highlight: false,
    features: [true, true, true, true, true, false, false, true, true],
  },
];

export function ValueProps() {
  return (
    <section className="py-28 lg:py-40 bg-navy overflow-hidden relative noise-overlay">
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0d948815_0%,transparent_50%)]" />
      {/* Dot pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff06_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-teal uppercase tracking-[0.2em] mb-5">
            Why TestWell
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            How we{" "}
            <span className="text-gradient italic">compare</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Everything you&apos;d get from a hospital or another testing service — without the markup or the hassle.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/[0.04] backdrop-blur-xl rounded-2xl border border-white/[0.08] overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="grid grid-cols-[1fr_70px_70px_70px] sm:grid-cols-[1fr_130px_130px_130px] border-b border-white/[0.06]">
            <div className="p-5 sm:p-6">
              <span className="text-xs text-slate-500 uppercase tracking-widest font-medium">
                Feature
              </span>
            </div>
            {competitors.map((c) => (
              <div
                key={c.name}
                className={`p-3 sm:p-6 text-center text-xs sm:text-sm font-bold ${
                  c.highlight
                    ? "text-teal bg-teal/[0.08]"
                    : "text-slate-400"
                }`}
              >
                {c.name}
              </div>
            ))}
          </div>

          {/* Rows */}
          {features.map((feature, fi) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + fi * 0.04, duration: 0.4 }}
              className={`grid grid-cols-[1fr_70px_70px_70px] sm:grid-cols-[1fr_130px_130px_130px] ${
                fi < features.length - 1
                  ? "border-b border-white/[0.04]"
                  : ""
              } hover:bg-white/[0.02] transition-colors`}
            >
              <div className="p-4 sm:p-5 text-sm text-slate-300 font-medium">
                {feature}
              </div>
              {competitors.map((c) => (
                <div
                  key={`${c.name}-${feature}`}
                  className={`p-4 sm:p-5 flex items-center justify-center ${
                    c.highlight ? "bg-teal/[0.04]" : ""
                  }`}
                >
                  {c.features[fi] ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.4 + fi * 0.04,
                        duration: 0.3,
                        type: "spring",
                        stiffness: 300,
                      }}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          c.highlight
                            ? "bg-teal/20"
                            : "bg-slate-700/50"
                        }`}
                      >
                        <Check
                          className={`h-3.5 w-3.5 ${
                            c.highlight ? "text-teal" : "text-slate-500"
                          }`}
                          strokeWidth={3}
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-slate-800/50 flex items-center justify-center">
                      <X className="h-3.5 w-3.5 text-slate-600" strokeWidth={3} />
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
