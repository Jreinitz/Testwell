"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  TrendingDown,
  X,
  CreditCard,
  UserCheck,
  Receipt,
  Package,
  ShieldCheck,
  FlaskConical,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart/cart-context";
import { tests, getSavingsPercent, type LabTest } from "@/lib/data/tests";

const bundles = [
  {
    id: "essential",
    name: "Essential Wellness",
    description:
      "A complete baseline health snapshot — blood health, metabolic function, and heart risk.",
    tests: ["cbc", "cmp", "lipid"],
    originalPrice: 74.97,
    bundlePrice: 59.99,
  },
  {
    id: "heart",
    name: "Heart Health",
    description:
      "Comprehensive cardiovascular risk assessment with cholesterol, lipids, and inflammation markers.",
    tests: ["lipid", "cholesterol", "crp", "homocysteine"],
    originalPrice: 104.96,
    bundlePrice: 84.99,
  },
  {
    id: "metabolic",
    name: "Metabolic Check",
    description:
      "Full metabolic and diabetes screening including blood sugar, insulin, and organ function.",
    tests: ["cmp", "a1c", "insulin"],
    originalPrice: 74.97,
    bundlePrice: 59.99,
  },
];

function getTestById(id: string): LabTest | undefined {
  return tests.find((t) => t.id === id);
}

export default function PricingPage() {
  const router = useRouter();
  const [selectedTestIds, setSelectedTestIds] = useState<string[]>([tests[0].id]);

  const selectedTests = useMemo(
    () => tests.filter((t) => selectedTestIds.includes(t.id)),
    [selectedTestIds]
  );

  const totals = useMemo(() => {
    const hospital = selectedTests.reduce((s, t) => s + t.hospitalPrice, 0);
    const questDirect = selectedTests.reduce(
      (s, t) => s + t.questDirectPrice,
      0
    );
    const testwell = selectedTests.reduce((s, t) => s + t.price, 0);
    return { hospital, questDirect, testwell };
  }, [selectedTests]);

  const { addItem } = useCart();

  const toggleTest = (id: string) => {
    setSelectedTestIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#0d948810_0%,transparent_50%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <p className="text-sm font-medium text-teal uppercase tracking-[0.2em] mb-4">
              Pricing
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-5">
              Transparent pricing.{" "}
              <span className="text-gradient italic">No surprises.</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              See exactly what you&apos;ll pay — and how much you&apos;ll save
              compared to hospitals, Quest Direct, and other DTC lab services.
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xs text-muted-foreground/60 mt-6 max-w-2xl"
          >
            Hospital prices reflect average self-pay rates reported by
            Healthcare Bluebook and GoodRx. Quest/Labcorp Direct prices based on
            publicly listed rates at the time of publishing.
          </motion.p>
        </div>
      </section>

      {/* Interactive Calculator */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-4">
              See your{" "}
              <span className="text-gradient italic">savings</span>
            </h2>
            <p className="text-muted-foreground">
              Select the tests you need and compare totals instantly.
            </p>
          </motion.div>

          {/* Test Selector */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap gap-2 justify-center mb-12"
          >
            {tests.map((test) => {
              const isSelected = selectedTestIds.includes(test.id);
              return (
                <button
                  key={test.id}
                  onClick={() => toggleTest(test.id)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                    isSelected
                      ? "bg-teal text-white border-teal shadow-md shadow-teal/20"
                      : "bg-white text-foreground border-border/40 hover:border-teal/30 hover:bg-teal/5"
                  }`}
                >
                  {isSelected && (
                    <CheckCircle2 className="h-3.5 w-3.5 inline mr-1.5 -mt-0.5" />
                  )}
                  {test.name}
                </button>
              );
            })}
          </motion.div>

          {/* Comparison Display */}
          <AnimatePresence mode="wait">
            {selectedTests.length > 0 ? (
              <motion.div
                key="comparison"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="max-w-4xl mx-auto"
              >
                {/* Line items */}
                <div className="bg-white rounded-2xl border border-border/30 overflow-hidden mb-0">
                  <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto] gap-4 px-6 py-3 bg-slate-50 border-b border-border/20 text-xs text-muted-foreground uppercase tracking-wider">
                    <span>Test</span>
                    <span className="text-right w-20">Hospital</span>
                    <span className="text-right w-24">Quest Direct</span>
                    <span className="text-right w-20 text-teal font-medium">
                      TestWell
                    </span>
                  </div>
                  {selectedTests.map((test, i) => (
                    <motion.div
                      key={test.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                      className="border-b border-border/10"
                    >
                      {/* Desktop row */}
                      <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto] gap-4 px-6 py-4 items-center">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => toggleTest(test.id)}
                            className="text-muted-foreground hover:text-red-500 transition-colors"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                          <span className="text-sm font-medium text-foreground">
                            {test.name}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground line-through text-right w-20">
                          ${test.hospitalPrice}+
                        </span>
                        <span className="text-sm text-muted-foreground line-through text-right w-24">
                          ${test.questDirectPrice}
                        </span>
                        <span className="text-sm font-bold text-teal text-right w-20">
                          ${test.price.toFixed(2)}
                        </span>
                      </div>
                      {/* Mobile row */}
                      <div className="sm:hidden flex items-center justify-between px-4 py-3.5">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <button
                            onClick={() => toggleTest(test.id)}
                            className="text-muted-foreground hover:text-red-500 transition-colors shrink-0"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                          <span className="text-sm font-medium text-foreground truncate">
                            {test.name}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-teal shrink-0 ml-3">
                          ${test.price.toFixed(2)}
                        </span>
                      </div>
                    </motion.div>
                  ))}

                  {/* Totals row — desktop */}
                  <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto] gap-4 px-6 py-4 bg-slate-50/70 border-t border-border/30 items-center">
                    <span className="text-sm font-bold text-foreground pl-8">
                      Total ({selectedTests.length} test{selectedTests.length > 1 ? "s" : ""})
                    </span>
                    <span className="text-sm font-bold text-muted-foreground line-through text-right w-20">
                      ${totals.hospital}+
                    </span>
                    <span className="text-sm font-bold text-muted-foreground line-through text-right w-24">
                      ${totals.questDirect}
                    </span>
                    <span className="text-base font-bold text-teal text-right w-20">
                      ${totals.testwell.toFixed(2)}
                    </span>
                  </div>
                  {/* Totals row — mobile */}
                  <div className="sm:hidden flex items-center justify-between px-4 py-4 bg-slate-50/70 border-t border-border/30">
                    <span className="text-sm font-bold text-foreground">
                      Total ({selectedTests.length} test{selectedTests.length > 1 ? "s" : ""})
                    </span>
                    <span className="text-base font-bold text-teal">
                      ${totals.testwell.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Savings badges */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 my-8">
                  <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-sm font-bold px-5 py-2.5 rounded-full border border-emerald-100">
                    <TrendingDown className="h-4 w-4" />
                    Save ${(totals.hospital - totals.testwell).toFixed(2)} vs. hospital
                  </div>
                  <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-sm font-bold px-5 py-2.5 rounded-full border border-emerald-100">
                    <TrendingDown className="h-4 w-4" />
                    Save ${(totals.questDirect - totals.testwell).toFixed(2)} vs. Quest &amp; Labcorp
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    className="bg-teal text-white hover:bg-teal/90 rounded-xl h-12 px-8 font-semibold shadow-md shadow-teal/15"
                    onClick={() => {
                      selectedTests.forEach((test) => {
                        addItem({ testId: test.id, name: test.name, price: test.price, slug: test.slug });
                      });
                      toast.success(
                        `${selectedTests.length} test${selectedTests.length > 1 ? "s" : ""} added to cart`,
                        {
                          description: `$${totals.testwell.toFixed(2)} total`,
                        }
                      );
                      router.push("/checkout");
                    }}
                  >
                    Order These Tests{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <p className="text-muted-foreground">
                  Select tests above to compare pricing
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* What You Pay */}
      <section className="py-20 lg:py-28 bg-slate-50 border-y border-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-4">
              What you see is{" "}
              <span className="text-gradient italic">what you pay</span>
            </h2>
            <p className="text-muted-foreground">
              No hidden fees. No membership. No insurance claims.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: CreditCard,
                title: "No membership fees",
                description:
                  "Pay only when you test. No subscriptions, no monthly charges.",
              },
              {
                icon: UserCheck,
                title: "No physician fees",
                description:
                  "The physician review fee others charge separately? It's included free.",
              },
              {
                icon: Receipt,
                title: "No surprise bills",
                description:
                  "The price you see is the price you pay. Period.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-border/30 p-7 hover:shadow-lg transition-shadow duration-300"
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

      {/* Bundles */}
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
              Bundles
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-4">
              Save even more with{" "}
              <span className="text-gradient italic">bundles</span>
            </h2>
            <p className="text-muted-foreground">
              Pre-built test packages at a bundled discount — perfect for a
              complete health picture.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {bundles.map((bundle, i) => {
              const bundleTests = bundle.tests
                .map(getTestById)
                .filter(Boolean) as LabTest[];
              const hospitalTotal = bundleTests.reduce(
                (s, t) => s + t.hospitalPrice,
                0
              );
              const savingsVsHospital = Math.round(
                ((hospitalTotal - bundle.bundlePrice) / hospitalTotal) * 100
              );

              return (
                <motion.div
                  key={bundle.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-2xl border border-border/30 p-7 hover:shadow-xl hover:border-teal/20 transition-all duration-300 flex flex-col glow-card"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Package className="h-5 w-5 text-teal" />
                    <Badge
                      variant="secondary"
                      className="text-xs rounded-full bg-teal/10 text-teal"
                    >
                      Bundle
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {bundle.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-grow">
                    {bundle.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {bundleTests.map((t) => (
                      <div
                        key={t.id}
                        className="flex items-center gap-2 text-sm"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-teal shrink-0" />
                        <span className="text-foreground">{t.name}</span>
                        <span className="text-muted-foreground/50 ml-auto text-xs">
                          ${t.price.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border/20 pt-5 mt-auto">
                    <div className="flex items-center gap-3 mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground line-through">
                          ${bundle.originalPrice.toFixed(2)} if ordered
                          separately
                        </p>
                        <p className="text-2xl font-bold text-teal">
                          ${bundle.bundlePrice.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-100 ml-auto">
                        <TrendingDown className="h-3 w-3" />
                        {savingsVsHospital}% vs hospital
                      </div>
                    </div>
                    <Button
                      className="w-full bg-teal text-white hover:bg-teal/90 rounded-xl h-11 font-medium"
                      onClick={() => {
                        bundleTests.forEach((test) => {
                          addItem({ testId: test.id, name: test.name, price: test.price, slug: test.slug });
                        });
                        toast.success(`${bundle.name} bundle added to cart`, {
                          description: `$${bundle.bundlePrice.toFixed(2)} — ${bundleTests.length} tests`,
                          action: { label: "View Cart", onClick: () => window.location.href = "/checkout" },
                        });
                      }}
                    >
                      Add Bundle to Cart
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Tests Quick Reference */}
      <section className="py-20 lg:py-28 bg-slate-50 border-t border-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-4">
              Full price list
            </h2>
            <p className="text-muted-foreground">
              Every test, every price. No hidden fees.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-border/30 overflow-hidden">
            {/* Header — desktop */}
            <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-6 py-3 bg-slate-50 border-b border-border/20 text-xs text-muted-foreground uppercase tracking-wider">
              <span>Test</span>
              <span className="text-right w-20">Hospital</span>
              <span className="text-right w-20 hidden md:block">Direct</span>
              <span className="text-right w-20 text-teal font-medium">
                TestWell
              </span>
              <span className="text-right w-16">Savings</span>
            </div>

            {tests.map((test, i) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
              >
                {/* Desktop row */}
                <Link
                  href={`/tests/${test.slug}`}
                  className="hidden sm:grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-6 py-4 border-b border-border/10 last:border-0 items-center hover:bg-slate-50/50 transition-colors group"
                >
                  <div>
                    <span className="text-sm font-medium text-foreground group-hover:text-teal transition-colors">
                      {test.name}
                    </span>
                    <span className="text-xs text-muted-foreground ml-2 hidden md:inline">
                      {test.category}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground line-through text-right w-20">
                    ${test.hospitalPrice}+
                  </span>
                  <span className="text-sm text-muted-foreground line-through text-right w-20 hidden md:block">
                    ${test.questDirectPrice}
                  </span>
                  <span className="text-sm font-bold text-teal text-right w-20">
                    ${test.price.toFixed(2)}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 text-right w-16">
                    -{getSavingsPercent(test)}%
                  </span>
                </Link>
                {/* Mobile row */}
                <Link
                  href={`/tests/${test.slug}`}
                  className="sm:hidden flex items-center justify-between px-4 py-3.5 border-b border-border/10 last:border-0 active:bg-slate-50/50 transition-colors group"
                >
                  <div className="min-w-0">
                    <span className="text-sm font-medium text-foreground group-active:text-teal transition-colors block truncate">
                      {test.name}
                    </span>
                    <span className="text-xs text-muted-foreground">{test.category}</span>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <span className="text-sm font-bold text-teal block">
                      ${test.price.toFixed(2)}
                    </span>
                    <span className="text-xs font-bold text-emerald-600">
                      -{getSavingsPercent(test)}%
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              className="bg-teal text-white hover:bg-teal/90 rounded-xl h-12 px-8 font-semibold shadow-md shadow-teal/15"
              asChild
            >
              <Link href="/tests">
                Browse All Tests <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
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
              Ready to save on your lab work?
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto">
              Same tests. Same labs. A fraction of the price.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                className="bg-teal text-white hover:bg-teal/90 rounded-xl h-13 px-10 text-base font-semibold shadow-lg shadow-teal/20"
                asChild
              >
                <Link href="/tests">
                  Order Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="rounded-xl h-13 px-8 text-base border-white/20 text-white hover:bg-white/10"
                asChild
              >
                <Link href="/how-it-works">How It Works</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
