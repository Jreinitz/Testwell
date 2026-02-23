"use client";

import { motion } from "framer-motion";
import { tests } from "@/lib/data/tests";

const comparisonTests = tests.slice(0, 4);

export function Comparison() {
  return (
    <section className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-teal uppercase tracking-wider mb-3">
            Compare & Save
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why TestWell?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Same tests. Same labs. A fraction of the price.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {comparisonTests.map((test, i) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white rounded-xl border border-border/30 p-6"
            >
              <h3 className="text-base font-semibold text-foreground mb-5">
                {test.name}
              </h3>

              <div className="space-y-3">
                {/* Hospital */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-24 shrink-0">
                    Hospital
                  </span>
                  <div className="flex-1 bg-slate-100 rounded-full h-6 relative overflow-hidden">
                    <div
                      className="bg-slate-300 h-full rounded-full"
                      style={{ width: "100%" }}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-600">
                      ${test.hospitalPrice}+
                    </span>
                  </div>
                </div>

                {/* Quest Direct */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-24 shrink-0">
                    {test.provider} Direct
                  </span>
                  <div className="flex-1 bg-slate-100 rounded-full h-6 relative overflow-hidden">
                    <div
                      className="bg-amber-200 h-full rounded-full"
                      style={{
                        width: `${(test.questDirectPrice / test.hospitalPrice) * 100}%`,
                      }}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-600">
                      ${test.questDirectPrice}
                    </span>
                  </div>
                </div>

                {/* TestWell */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-teal w-24 shrink-0">
                    TestWell
                  </span>
                  <div className="flex-1 bg-teal/10 rounded-full h-6 relative overflow-hidden">
                    <div
                      className="bg-teal h-full rounded-full"
                      style={{
                        width: `${(test.price / test.hospitalPrice) * 100}%`,
                      }}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-teal">
                      ${test.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xs text-muted-foreground text-center mt-8 max-w-2xl mx-auto"
        >
          Comparison prices based on publicly listed self-pay rates from
          QuestHealth.com, LabCorp OnDemand, and average hospital pricing
          reported by Healthcare Bluebook as of February 2026. Actual prices may
          vary by location.
        </motion.p>
      </div>
    </section>
  );
}
