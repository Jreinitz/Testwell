"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Clock,
  FlaskConical,
  Droplets,
  MapPin,
  CheckCircle2,
  AlertCircle,
  TrendingDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  getTestBySlug,
  getRelatedTests,
  getSavingsPercent,
  tests,
} from "@/lib/data/tests";

export default function TestDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const test = getTestBySlug(slug);

  if (!test) {
    notFound();
  }

  const related = getRelatedTests(test, 3);
  const savings = getSavingsPercent(test);

  return (
    <>
      {/* Breadcrumbs */}
      <div className="pt-28 lg:pt-32 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
          >
            <Link
              href="/"
              className="hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              href="/tests"
              className="hover:text-foreground transition-colors"
            >
              Tests
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{test.name}</span>
          </motion.div>

          <Button
            variant="ghost"
            size="sm"
            className="mb-6 -ml-2 text-muted-foreground hover:text-foreground"
            asChild
          >
            <Link href="/tests">
              <ArrowLeft className="mr-1.5 h-4 w-4" />
              Back to all tests
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <section className="pb-20 lg:pb-28 bg-gradient-to-b from-white to-slate-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-14">
            {/* Left Column */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Badges */}
                <div className="flex items-center gap-2 mb-5">
                  <Badge
                    variant="secondary"
                    className="rounded-full bg-teal/10 text-teal font-medium"
                  >
                    {test.category}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="rounded-full text-muted-foreground"
                  >
                    {test.provider}
                  </Badge>
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
                  {test.name}
                </h1>

                {/* Price Comparison Bar */}
                <div className="flex flex-wrap items-center gap-4 p-5 bg-white rounded-2xl border border-border/30 mb-10">
                  <div className="flex items-center gap-6 flex-wrap">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        Hospital
                      </p>
                      <p className="text-lg font-semibold text-muted-foreground line-through">
                        ${test.hospitalPrice}+
                      </p>
                    </div>
                    <div className="w-px h-10 bg-border/40" />
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        {test.provider} Direct
                      </p>
                      <p className="text-lg font-semibold text-muted-foreground line-through">
                        ${test.questDirectPrice}
                      </p>
                    </div>
                    <div className="w-px h-10 bg-border/40" />
                    <div>
                      <p className="text-xs text-teal uppercase tracking-wider font-medium mb-1">
                        TestWell
                      </p>
                      <p className="text-2xl font-bold text-teal">
                        ${test.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-sm font-bold px-4 py-2 rounded-full border border-emerald-100 ml-auto">
                    <TrendingDown className="h-4 w-4" />
                    Save {savings}%
                  </div>
                </div>

                {/* About This Test */}
                <div className="mb-10">
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    About This Test
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-[15px]">
                    {test.longDescription}
                  </p>
                </div>

                {/* Test Specs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                  {[
                    {
                      icon: Droplets,
                      label: "Sample Type",
                      value: test.sampleType,
                    },
                    {
                      icon: AlertCircle,
                      label: "Fasting",
                      value: test.fastingRequired ? "Required" : "Not required",
                    },
                    {
                      icon: Clock,
                      label: "Results In",
                      value: test.resultsIn,
                    },
                    {
                      icon: MapPin,
                      label: "Lab Provider",
                      value: test.provider,
                    },
                  ].map((spec) => (
                    <div
                      key={spec.label}
                      className="bg-white rounded-xl border border-border/30 p-4"
                    >
                      <spec.icon className="h-5 w-5 text-teal mb-2" />
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        {spec.label}
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        {spec.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Biomarkers */}
                <div className="mb-10">
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    What&apos;s Included
                  </h2>
                  <p className="text-sm text-muted-foreground mb-5">
                    {test.biomarkers.length} biomarker
                    {test.biomarkers.length > 1 ? "s" : ""} tested
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {test.biomarkers.map((biomarker, i) => (
                      <motion.div
                        key={biomarker}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
                        className="flex items-center gap-3 bg-white rounded-xl border border-border/30 px-4 py-3"
                      >
                        <CheckCircle2 className="h-4 w-4 text-teal shrink-0" />
                        <span className="text-sm text-foreground">
                          {biomarker}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Preparation */}
                <div className="mb-10">
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    Preparation Instructions
                  </h2>
                  <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-5">
                    <div className="flex gap-3">
                      <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-sm text-amber-900 leading-relaxed">
                        {test.prepInstructions}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column — Sticky Pricing Card */}
            <div className="lg:order-last">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:sticky lg:top-28"
              >
                <div className="bg-white rounded-2xl border border-border/30 p-7 shadow-lg shadow-black/[0.03]">
                  {/* Competitor prices */}
                  <div className="space-y-2.5 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Hospital</span>
                      <span className="text-sm text-muted-foreground line-through">${test.hospitalPrice}+</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{test.provider} Direct</span>
                      <span className="text-sm text-muted-foreground line-through">${test.questDirectPrice}</span>
                    </div>
                  </div>

                  <div className="border-t border-border/20 pt-5 mb-6">
                    <p className="text-sm font-semibold text-teal italic mb-2">
                      TestWell Price
                    </p>
                    <div className="flex items-baseline gap-3">
                      <p className="text-4xl font-bold text-foreground">
                        ${test.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-100">
                        <TrendingDown className="h-3 w-3" />
                        Save {savings}%
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-7">
                    {[
                      "Physician reviewed",
                      `${test.provider} locations`,
                      `Results in ${test.resultsIn}`,
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2.5 text-sm text-foreground"
                      >
                        <CheckCircle2 className="h-4 w-4 text-teal" />
                        {item}
                      </div>
                    ))}
                  </div>

                  <Button className="w-full bg-[#e84c3d] text-white hover:bg-[#d4443a] rounded-xl h-12 font-semibold text-base shadow-md shadow-red-500/15 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300">
                    Add to Cart — ${test.price.toFixed(2)}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    No insurance needed · HIPAA compliant
                  </p>

                  <div className="border-t border-border/20 mt-6 pt-5 space-y-2.5">
                    {[
                      {
                        icon: ShieldCheck,
                        text: "Physician-reviewed results",
                      },
                      { icon: FlaskConical, text: "CLIA-certified lab" },
                      { icon: MapPin, text: "4,000+ lab locations" },
                    ].map((item) => (
                      <div
                        key={item.text}
                        className="flex items-center gap-2.5 text-xs text-muted-foreground"
                      >
                        <item.icon className="h-3.5 w-3.5" />
                        {item.text}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Tests */}
      {related.length > 0 && (
        <section className="py-20 bg-slate-50 border-t border-border/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-8">
                Related Tests
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((rt, i) => (
                  <motion.div
                    key={rt.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                  >
                    <Link
                      href={`/tests/${rt.slug}`}
                      className="block group h-full"
                    >
                      <div className="bg-white rounded-2xl border border-border/30 p-6 h-full hover:shadow-xl hover:border-teal/25 transition-all duration-500 flex flex-col glow-card">
                        <div className="flex items-center gap-2 mb-4">
                          <Badge
                            variant="secondary"
                            className="text-xs rounded-full bg-slate-100"
                          >
                            {rt.category}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="text-xs text-muted-foreground rounded-full"
                          >
                            {rt.provider}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-bold text-foreground group-hover:text-teal transition-colors mb-2">
                          {rt.name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 flex-grow mb-4">
                          {rt.description}
                        </p>
                        <div className="border-t border-border/30 pt-4 mt-auto flex items-center justify-between">
                          <p className="text-2xl font-bold text-teal">
                            ${rt.price.toFixed(2)}
                          </p>
                          <span className="text-sm text-teal font-medium group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                            Details{" "}
                            <ArrowRight className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* If few related tests in same category, show browse all */}
              <div className="text-center mt-10">
                <Button
                  variant="outline"
                  className="rounded-xl h-11 px-6"
                  asChild
                >
                  <Link href="/tests">
                    Browse all tests{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
}
