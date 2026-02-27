"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";

function AnimatedPercent({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2200;
    const steps = 80;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayed(value);
        clearInterval(timer);
      } else {
        setDisplayed(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayed}%
    </span>
  );
}

const comparisons = [
  { test: "Comprehensive Metabolic Panel", hospital: 200, quest: 59, tw: 24.99, savings: 87 },
  { test: "Lipid Panel", hospital: 150, quest: 45, tw: 14.99, savings: 90 },
  { test: "Complete Blood Count (CBC)", hospital: 130, quest: 39, tw: 9.99, savings: 92 },
  { test: "Thyroid Panel (TSH)", hospital: 180, quest: 55, tw: 19.99, savings: 89 },
];

export function SavingsStat() {
  return (
    <section className="py-28 lg:py-40 bg-white overflow-hidden relative noise-overlay">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal/[0.02] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Giant stat */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[5rem] sm:text-[10rem] lg:text-[12rem] font-bold text-gradient-hero leading-none mb-4"
            >
              <AnimatedPercent value={80} />
            </motion.p>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 tracking-tight">
              average savings per test
            </p>
            <p className="text-lg text-muted-foreground max-w-md leading-relaxed mb-8">
              Same labs your doctor uses. Same certified analysis.
              Just without the markup.
            </p>

            <div className="flex items-center gap-5 flex-wrap">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-3 h-1.5 bg-slate-200 rounded-full" />
                <span>Hospital</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-3 h-1.5 bg-slate-400/60 rounded-full" />
                <span>Quest / Labcorp</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-teal">
                <div className="w-3 h-2 bg-teal rounded-full" />
                <span>TestWell</span>
              </div>
            </div>
          </motion.div>

          {/* Comparison cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            {comparisons.map((item, i) => (
              <motion.div
                key={item.test}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="bg-slate-50/80 backdrop-blur-sm rounded-xl p-5 border border-border/20 hover:border-teal/20 hover:shadow-lg transition-all duration-300 glow-card"
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-bold text-foreground">
                    {item.test}
                  </p>
                  <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    <TrendingDown className="h-3 w-3" />
                    -{item.savings}%
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-muted-foreground w-20 shrink-0 text-right">Hospital</span>
                    <div className="flex-1 bg-slate-200/80 rounded-full h-2.5" />
                    <span className="text-xs text-muted-foreground line-through w-14 text-right font-medium shrink-0">
                      ${item.hospital}+
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-muted-foreground w-20 shrink-0 text-right">Quest Direct</span>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(item.quest / item.hospital) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                      className="bg-slate-400/60 rounded-full h-2.5"
                    />
                    <span className="text-xs text-muted-foreground line-through w-14 text-right font-medium shrink-0">
                      ${item.quest}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-semibold text-teal w-20 shrink-0 text-right">TestWell</span>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(item.tw / item.hospital) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                      className="bg-gradient-to-r from-teal to-teal/80 rounded-full h-3 shadow-sm shadow-teal/20"
                    />
                    <span className="text-sm font-bold text-teal w-14 text-right shrink-0">
                      ${item.tw}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="pt-2"
            >
              <Button
                size="lg"
                className="bg-teal hover:bg-teal/90 text-white text-base px-10 h-14 rounded-xl shadow-lg shadow-teal/20 hover:shadow-xl hover:shadow-teal/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 w-full sm:w-auto"
                asChild
              >
                <Link href="/tests">
                  See All Prices <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
