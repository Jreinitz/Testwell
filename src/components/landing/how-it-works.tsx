"use client";

import { motion } from "framer-motion";
import {
  Heart,
  Activity,
  Sparkles,
  MapPin,
  FlaskConical,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function VisualChooseTests() {
  return (
    <div className="bg-white rounded-xl border border-border/30 shadow-sm p-4 w-full max-w-[200px] mx-auto">
      <p className="text-2xl font-bold text-teal text-center mb-0.5">100+</p>
      <p className="text-[11px] font-semibold text-foreground text-center mb-0.5">
        Lab Tests
      </p>
      <p className="text-[10px] text-muted-foreground text-center mb-3">
        Available online
      </p>
      <div className="space-y-1.5">
        {[
          { icon: Heart, label: "Heart Health" },
          { icon: Activity, label: "Hormones" },
          { icon: Sparkles, label: "Metabolic" },
        ].map((cat) => (
          <div
            key={cat.label}
            className="flex items-center gap-2 bg-slate-50 rounded-md px-2.5 py-1.5 border border-border/20"
          >
            <cat.icon className="h-3 w-3 text-teal" />
            <span className="text-[11px] font-medium text-foreground">
              {cat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function VisualVisitLab() {
  return (
    <div className="w-full max-w-[200px] mx-auto">
      <div className="grid grid-cols-4 gap-1.5 mb-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              i < 10 ? "bg-teal/10" : "bg-slate-200/60"
            }`}
          >
            <MapPin
              className={`h-3 w-3 ${
                i < 10 ? "text-teal" : "text-slate-400"
              }`}
            />
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-border/30 shadow-sm p-3 text-center">
        <p className="text-xl font-bold text-teal mb-0.5">4,000+</p>
        <p className="text-[10px] text-muted-foreground">
          Locations nationwide
        </p>
      </div>
    </div>
  );
}

function VisualGetResults() {
  const results = [
    { name: "Cholesterol", value: "185", unit: "mg/dL", status: "IN RANGE", color: "teal" as const },
    { name: "Glucose", value: "105", unit: "mg/dL", status: "ABOVE", color: "amber" as const },
    { name: "TSH", value: "2.1", unit: "mIU/L", status: "IN RANGE", color: "teal" as const },
  ];
  const badgeStyle: Record<string, string> = {
    teal: "bg-teal/10 text-teal",
    amber: "bg-amber-100 text-amber-700",
  };
  const barColor: Record<string, string> = { teal: "bg-teal", amber: "bg-amber-500" };

  return (
    <div className="space-y-2 w-full max-w-[220px] mx-auto">
      {results.map((r) => (
        <div
          key={r.name}
          className="bg-white rounded-lg border border-border/30 shadow-sm px-3 py-2.5"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-medium text-foreground">
              {r.name}
            </span>
            <span
              className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${badgeStyle[r.color]}`}
            >
              {r.status}
            </span>
          </div>
          <p className="text-lg font-bold text-foreground leading-none mb-1">
            {r.value}{" "}
            <span className="text-[10px] font-normal text-muted-foreground">
              {r.unit}
            </span>
          </p>
          <div className="relative h-1 bg-slate-100 rounded-full">
            <div
              className={`absolute h-full rounded-full ${barColor[r.color]}`}
              style={{
                width: r.color === "teal" ? "60%" : "75%",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

const steps = [
  {
    step: "01",
    title: "Choose your tests",
    description:
      "Pick from 100+ physician-approved tests. No appointment, no referral, no insurance needed.",
    highlights: [
      "100+ tests available",
      "No referral needed",
      "HSA / FSA eligible",
    ],
    gradient: "from-teal/10 to-cyan-50/50",
    Visual: VisualChooseTests,
  },
  {
    step: "02",
    title: "Visit a lab near you",
    description:
      "Walk into any Quest or Labcorp. No appointment — most visits take under 15 minutes.",
    highlights: [
      "4,000+ locations",
      "No appointment needed",
      "Under 15 minutes",
    ],
    gradient: "from-cyan-50/50 to-teal/10",
    Visual: VisualVisitLab,
  },
  {
    step: "03",
    title: "Get your results",
    description:
      "Physician-reviewed results delivered to your secure portal in 1–3 business days.",
    highlights: ["1–3 business days", "Physician reviewed", "Secure portal"],
    gradient: "from-teal/10 to-emerald-50/50",
    Visual: VisualGetResults,
  },
];

export function HowItWorks() {
  return (
    <section className="py-28 lg:py-40 bg-white relative noise-overlay overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <p className="text-sm font-medium text-teal uppercase tracking-[0.2em] mb-5">
            You&apos;re in Control
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-5">
            Three steps.{" "}
            <span className="text-gradient italic">That&apos;s it.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            No doctor visit. No referral. No waiting room.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-[60px] left-[16%] right-[16%] h-px">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.2,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-full bg-gradient-to-r from-teal/30 via-teal/60 to-teal/30 origin-left"
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative group"
            >
              <div
                className={`bg-gradient-to-br ${step.gradient} rounded-2xl p-8 lg:p-10 h-full border border-border/20 hover:border-teal/25 hover:shadow-xl transition-all duration-500 glow-card flex flex-col`}
              >
                {/* Step badge */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-8 bg-teal text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
                    {step.step}
                  </span>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-teal transition-colors duration-300">
                    {step.title}
                  </h3>
                </div>

                {/* Visual mockup */}
                <div className="mb-6 py-4">
                  <step.Visual />
                </div>

                <p className="text-muted-foreground leading-relaxed mb-5 text-sm">
                  {step.description}
                </p>

                <ul className="space-y-2.5 mt-auto">
                  {step.highlights.map((h, hi) => (
                    <motion.li
                      key={h}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.2 + hi * 0.08 }}
                      className="flex items-center gap-2.5 text-sm text-muted-foreground"
                    >
                      <div className="w-5 h-5 bg-teal/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="w-1.5 h-1.5 bg-teal rounded-full" />
                      </div>
                      {h}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Button
            size="lg"
            className="bg-teal hover:bg-teal/90 text-white text-base px-10 h-14 rounded-xl shadow-lg shadow-teal/20 hover:shadow-xl hover:shadow-teal/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            asChild
          >
            <Link href="/tests">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
