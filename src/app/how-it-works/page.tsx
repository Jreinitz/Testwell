"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  UserCheck,
  MapPin,
  FileCheck,
  ShieldCheck,
  Clock,
  Lock,
  FlaskConical,
  CheckCircle2,
  ArrowRight,
  Building2,
  Heart,
  Activity,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Browse and order your lab tests online",
    description:
      "Pick from our catalog of physician-approved tests. No doctor visit, no insurance, no referral needed. Just choose what you want and checkout in minutes.",
    highlights: ["100+ tests available", "No referral required", "HSA / FSA eligible"],
    visual: "Lab Tests · Available Online",
  },
  {
    number: "02",
    icon: UserCheck,
    title: "A licensed physician reviews your order",
    description:
      "A licensed physician reviews and approves your order — included free with every test. Most orders are approved within 2 hours.",
    highlights: [
      "Board-certified physicians",
      "Included free with every order",
      "Usually within 2 hours",
    ],
    visual: "Physician Review · Included Free",
  },
  {
    number: "03",
    icon: MapPin,
    title: "Walk into any Quest or Labcorp location",
    description:
      "You'll receive a lab requisition by email. Bring it to any Quest or Labcorp near you — no appointment needed. Most visits take under 15 minutes.",
    highlights: [
      "4,000+ lab locations",
      "No appointment needed",
      "Under 15 minutes",
    ],
    visual: "4,000+ Locations Nationwide",
  },
  {
    number: "04",
    icon: FileCheck,
    title: "Get physician-reviewed results in days",
    description:
      "Access your results through your secure patient portal in 1–3 business days. Every result is reviewed by a licensed physician and presented in a clear, easy-to-understand format.",
    highlights: [
      "1–3 business days",
      "Physician reviewed",
      "Secure online portal",
    ],
    visual: "Secure Results Portal",
  },
];

const protections = [
  {
    icon: Lock,
    title: "HIPAA Compliant",
    description:
      "Your health data is encrypted end-to-end. We never sell your data to third parties.",
  },
  {
    icon: UserCheck,
    title: "Physician Oversight",
    description:
      "Every test order is reviewed by a board-certified physician licensed in your state before a lab requisition is issued.",
  },
  {
    icon: FlaskConical,
    title: "CLIA-Certified Labs",
    description:
      "All tests are performed at CLIA-certified, CAP-accredited laboratories — the same labs used by hospitals and clinics.",
  },
];

const labs = [
  {
    name: "Quest Diagnostics",
    locations: "2,250+",
    description:
      "The world's leading provider of diagnostic testing, with patient service centers across all 50 states.",
  },
  {
    name: "Labcorp",
    locations: "2,000+",
    description:
      "A global life sciences company providing vital diagnostic information to patients and physicians worldwide.",
  },
];

const states = [
  {
    name: "Florida",
    cities: ["Miami", "Orlando", "Tampa", "Jacksonville", "Fort Lauderdale", "St. Petersburg"],
  },
  {
    name: "Texas",
    cities: ["Houston", "Dallas", "Austin", "San Antonio", "Fort Worth", "El Paso"],
  },
];

function StepVisualBrowse() {
  return (
    <div className="bg-slate-50 rounded-2xl border border-border/30 p-8 min-h-[320px] flex flex-col items-center justify-center relative overflow-hidden">
      <div className="bg-white rounded-xl border border-border/30 shadow-lg p-6 w-full max-w-[260px]">
        <p className="text-4xl font-bold text-teal text-center mb-1">100+</p>
        <p className="text-sm font-semibold text-foreground text-center mb-1">Lab Tests</p>
        <p className="text-xs text-muted-foreground text-center mb-5">Available online</p>
        <div className="space-y-2.5">
          {[
            { icon: Heart, label: "Heart Health" },
            { icon: Activity, label: "Hormones" },
            { icon: Sparkles, label: "Metabolic" },
          ].map((cat) => (
            <div key={cat.label} className="flex items-center gap-3 bg-slate-50 rounded-lg px-3.5 py-2.5 border border-border/20">
              <cat.icon className="h-4 w-4 text-teal" />
              <span className="text-sm font-medium text-foreground">{cat.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-6 right-6 w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center">
        <FlaskConical className="h-6 w-6 text-teal/60" />
      </div>
    </div>
  );
}

function StepVisualReview() {
  const biomarkers = [
    { name: "Lipid Panel", pct: 85 },
    { name: "CBC", pct: 72 },
    { name: "Metabolic", pct: 90 },
    { name: "Thyroid", pct: 65 },
  ];
  return (
    <div className="bg-slate-50 rounded-2xl border border-border/30 p-8 min-h-[320px] flex flex-col items-center justify-center">
      <div className="w-full max-w-[300px]">
        {/* Circular counter */}
        <div className="flex justify-center mb-6">
          <div className="relative w-24 h-24">
            <svg viewBox="0 0 96 96" className="w-full h-full -rotate-90">
              <circle cx="48" cy="48" r="40" fill="none" stroke="#e2e8f0" strokeWidth="6" />
              <circle cx="48" cy="48" r="40" fill="none" stroke="#0d9488" strokeWidth="6" strokeDasharray="251" strokeDashoffset="38" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-teal">104</span>
              <span className="text-[10px] text-muted-foreground">Biomarkers</span>
            </div>
          </div>
        </div>
        {/* Progress bars */}
        <div className="space-y-3">
          {biomarkers.map((b) => (
            <div key={b.name}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-foreground">{b.name}</span>
                <span className="text-xs text-muted-foreground">{b.pct}%</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-teal rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${b.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepVisualLab() {
  return (
    <div className="bg-slate-50 rounded-2xl border border-border/30 p-8 min-h-[320px] flex flex-col items-center justify-center">
      <div className="w-full max-w-[260px]">
        {/* Pin grid */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                i < 10 ? "bg-teal/10" : "bg-slate-200/60"
              }`}
            >
              <MapPin className={`h-4 w-4 ${i < 10 ? "text-teal" : "text-slate-400"}`} />
            </div>
          ))}
        </div>
        {/* Stat card */}
        <div className="bg-white rounded-xl border border-border/30 shadow-sm p-5 text-center">
          <p className="text-3xl font-bold text-teal mb-1">4,000+</p>
          <p className="text-sm text-muted-foreground">Locations nationwide</p>
        </div>
      </div>
    </div>
  );
}

function StepVisualResults() {
  const results = [
    { name: "Cholesterol", value: "185", unit: "mg/dL", status: "IN RANGE", color: "teal" },
    { name: "Glucose", value: "105", unit: "mg/dL", status: "ABOVE", color: "amber" },
    { name: "TSH", value: "2.1", unit: "mIU/L", status: "IN RANGE", color: "teal" },
    { name: "Vitamin D", value: "28", unit: "ng/mL", status: "BELOW", color: "red" },
  ];
  return (
    <div className="bg-slate-50 rounded-2xl border border-border/30 p-6 min-h-[320px] flex flex-col justify-center">
      <div className="space-y-3 w-full max-w-[320px] mx-auto">
        {results.map((r, i) => {
          const bgMap: Record<string, string> = { teal: "bg-teal/10 text-teal", amber: "bg-amber-100 text-amber-700", red: "bg-red-100 text-red-600" };
          const barMap: Record<string, string> = { teal: "bg-teal", amber: "bg-amber-500", red: "bg-red-500" };
          const dotPos: Record<string, string> = { teal: "left-[60%]", amber: "left-[75%]", red: "left-[15%]" };
          return (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white rounded-xl border border-border/30 shadow-sm p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">{r.name}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${bgMap[r.color]}`}>
                  {r.status}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground mb-0.5">
                {r.value} <span className="text-sm font-normal text-muted-foreground">{r.unit}</span>
              </p>
              {/* Range bar */}
              <div className="relative h-1.5 bg-slate-100 rounded-full mt-2">
                <div className={`absolute h-full rounded-full ${barMap[r.color]}`} style={{ width: r.color === "teal" ? "60%" : r.color === "amber" ? "75%" : "15%", left: 0 }} />
                <div className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white shadow-sm ${barMap[r.color]} ${dotPos[r.color]}`} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#0d948810_0%,transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/[0.03] rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <p className="text-sm font-medium text-teal uppercase tracking-[0.2em] mb-4">
              How It Works
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-5">
              How it{" "}
              <span className="text-gradient italic">works</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Order online. Walk into a lab. Get results in days.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  i % 2 === 1 ? "lg:direction-rtl" : ""
                }`}
              >
                {/* Text Side */}
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-4 mb-5">
                    <span className="text-5xl lg:text-6xl font-bold text-teal/15 font-mono">
                      {step.number}
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-teal/20 to-transparent" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-4">
                    {step.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6 text-[15px]">
                    {step.description}
                  </p>
                  <ul className="space-y-3">
                    {step.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-center gap-3 text-sm text-foreground"
                      >
                        <CheckCircle2 className="h-4 w-4 text-teal shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual Side */}
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  {i === 0 && <StepVisualBrowse />}
                  {i === 1 && <StepVisualReview />}
                  {i === 2 && <StepVisualLab />}
                  {i === 3 && <StepVisualResults />}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA after steps */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mt-16 lg:mt-20"
          >
            <Button
              className="bg-teal text-white hover:bg-teal/90 rounded-xl h-13 px-10 text-base font-semibold shadow-md shadow-teal/15"
              asChild
            >
              <Link href="/tests">
                Browse Tests <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Your Health Data */}
      <section className="py-20 lg:py-28 bg-slate-50 border-y border-border/20 relative overflow-hidden noise-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#0d948808_0%,transparent_70%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <p className="text-sm font-medium text-teal uppercase tracking-[0.2em] mb-4">
              Trust & Security
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-4">
              Your health data,{" "}
              <span className="text-gradient italic">fully protected</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We partner with board-certified physicians and CLIA-certified labs
              to ensure every test meets the highest standards of care.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {protections.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl border border-border/30 p-7 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center mb-5">
                  <item.icon className="h-6 w-6 text-teal" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lab Access */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <p className="text-sm font-medium text-teal uppercase tracking-[0.2em] mb-4">
              Lab Network
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-4">
              Nationwide{" "}
              <span className="text-gradient italic">lab access</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Walk into any Quest Diagnostics or Labcorp patient service center.
              No appointment needed.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {labs.map((lab, i) => (
              <motion.div
                key={lab.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-border/30 p-8 hover:shadow-lg hover:border-teal/20 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      {lab.name}
                    </h3>
                    <p className="text-sm text-teal font-medium">
                      {lab.locations} locations
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {lab.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* States Served */}
      <section className="py-20 lg:py-28 bg-slate-50 border-y border-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <p className="text-sm font-medium text-teal uppercase tracking-[0.2em] mb-4">
              Availability
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-4">
              Currently serving{" "}
              <span className="text-gradient italic">two great states</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              TestWell is available to residents of Florida and Texas with
              licensed physicians in both states.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto mb-12">
            {states.map((state, i) => (
              <motion.div
                key={state.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-border/30 p-7"
              >
                <div className="flex items-center gap-3 mb-5">
                  <MapPin className="h-5 w-5 text-teal" />
                  <h3 className="text-xl font-bold text-foreground">
                    {state.name}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {state.cities.map((city) => (
                    <span
                      key={city}
                      className="bg-slate-50 text-sm text-muted-foreground px-3 py-1.5 rounded-full border border-border/30"
                    >
                      {city}
                    </span>
                  ))}
                  <span className="text-sm text-teal font-medium px-3 py-1.5">
                    & more
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Not in Florida or Texas? We&apos;re expanding soon.
            </p>
            <Button variant="outline" className="rounded-xl h-11 px-6">
              Join the Waitlist
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 lg:py-28 bg-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#0d948815_0%,transparent_60%)]" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5">
              Ready to take control of your health?
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto">
              Browse affordable, physician-reviewed lab tests and get results in
              days — not weeks.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                className="bg-teal text-white hover:bg-teal/90 rounded-xl h-13 px-10 text-base font-semibold shadow-lg shadow-teal/20"
                asChild
              >
                <Link href="/tests">
                  Browse Tests <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="rounded-xl h-13 px-8 text-base border-white/20 text-white hover:bg-white/10"
                asChild
              >
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
