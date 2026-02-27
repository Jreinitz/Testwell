"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  ArrowRight,
  FlaskConical,
  ShieldCheck,
  Clock,
  Droplets,
  ShoppingCart,
  Check,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart/cart-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  tests,
  categories,
  getSavingsPercent,
  type TestCategory,
} from "@/lib/data/tests";

type SortOption = "popular" | "price-low" | "price-high" | "savings" | "alpha";

const sortLabels: Record<SortOption, string> = {
  popular: "Most Popular",
  "price-low": "Price: Low → High",
  "price-high": "Price: High → Low",
  savings: "Biggest Savings",
  alpha: "A – Z",
};

function TestsPageContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const initialCategory: TestCategory | "All" =
    categoryParam && categories.includes(categoryParam as TestCategory)
      ? (categoryParam as TestCategory)
      : "All";

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<TestCategory | "All">(
    initialCategory
  );
  const [sort, setSort] = useState<SortOption>("popular");
  const [showSort, setShowSort] = useState(false);

  const { addItem, isInCart } = useCart();

  useEffect(() => {
    if (categoryParam && categories.includes(categoryParam as TestCategory)) {
      setActiveCategory(categoryParam as TestCategory);
    }
  }, [categoryParam]);

  const filtered = useMemo(() => {
    let list = [...tests];

    if (activeCategory !== "All") {
      list = list.filter((t) => t.category === activeCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.biomarkers.some((b) => b.toLowerCase().includes(q))
      );
    }

    switch (sort) {
      case "price-low":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        list.sort((a, b) => b.price - a.price);
        break;
      case "savings":
        list.sort((a, b) => getSavingsPercent(b) - getSavingsPercent(a));
        break;
      case "alpha":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return list;
  }, [search, activeCategory, sort]);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#0d948810_0%,transparent_50%)]" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-cyan-500/[0.04] rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <p className="text-sm font-medium text-teal uppercase tracking-[0.2em] mb-4">
              Lab Tests
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-5">
              Browse{" "}
              <span className="text-gradient italic">affordable</span> lab
              tests
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Physician-reviewed lab tests at Quest and Labcorp locations near
              you. No doctor visit, no insurance, no referral.
            </p>
          </motion.div>

          {/* Trust chips */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-3 mt-8"
          >
            {[
              { icon: ShieldCheck, label: "Physician Reviewed" },
              { icon: Clock, label: "Results in 1–3 Days" },
              { icon: FlaskConical, label: "CLIA-Certified Labs" },
            ].map((chip) => (
              <div
                key={chip.label}
                className="flex items-center gap-2 text-sm text-muted-foreground bg-white/80 backdrop-blur-sm border border-border/40 rounded-full px-4 py-2"
              >
                <chip.icon className="h-4 w-4 text-teal" />
                {chip.label}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="pb-28 lg:pb-36 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search + Sort Bar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-8 sticky top-[73px] z-30 bg-white/90 backdrop-blur-xl py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 border-b border-border/20"
          >
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tests, biomarkers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-11 rounded-xl border-border/40 bg-slate-50/60 focus:bg-white transition-colors"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setShowSort(!showSort)}
                className="h-11 rounded-xl gap-2 text-sm"
              >
                <SlidersHorizontal className="h-4 w-4" />
                {sortLabels[sort]}
              </Button>
              <AnimatePresence>
                {showSort && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-52 bg-white border border-border/30 rounded-xl shadow-lg overflow-hidden z-40"
                  >
                    {(Object.keys(sortLabels) as SortOption[]).map((key) => (
                      <button
                        key={key}
                        onClick={() => {
                          setSort(key);
                          setShowSort(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          sort === key
                            ? "bg-teal/5 text-teal font-medium"
                            : "text-foreground hover:bg-slate-50"
                        }`}
                      >
                        {sortLabels[key]}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            <button
              onClick={() => setActiveCategory("All")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === "All"
                  ? "bg-teal text-white shadow-md shadow-teal/20"
                  : "bg-slate-100 text-muted-foreground hover:bg-slate-200 hover:text-foreground"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-teal text-white shadow-md shadow-teal/20"
                    : "bg-slate-100 text-muted-foreground hover:bg-slate-200 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Results count */}
          <p className="text-sm text-muted-foreground mb-6">
            {filtered.length} {filtered.length === 1 ? "test" : "tests"}{" "}
            {activeCategory !== "All" && `in ${activeCategory}`}
            {search && ` matching "${search}"`}
          </p>

          {/* Test Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((test, i) => (
                <motion.div
                  key={test.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="bg-white rounded-2xl border border-border/30 p-6 lg:p-7 h-full hover:shadow-xl hover:border-teal/25 transition-all duration-500 flex flex-col glow-card group">
                    {/* Header: badges */}
                    <div className="flex items-center justify-between mb-4">
                      <Badge
                        variant="secondary"
                        className="text-xs font-medium rounded-full bg-teal/10 text-teal border-0"
                      >
                        {test.category}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-xs text-muted-foreground rounded-full"
                      >
                        {test.provider}
                      </Badge>
                    </div>

                    {/* Test name */}
                    <h3 className="text-lg font-bold text-foreground mb-1.5">
                      {test.name}
                    </h3>

                    {/* Sample type */}
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-5">
                      <Droplets className="h-3.5 w-3.5" />
                      {test.sampleType}
                    </div>

                    {/* Pricing table */}
                    <div className="bg-slate-50/80 rounded-xl p-4 mb-5 flex-grow flex flex-col justify-end">
                      <div className="flex items-center justify-between py-2 border-b border-border/20">
                        <span className="text-sm text-muted-foreground">Hospital</span>
                        <span className="text-sm text-muted-foreground line-through">${test.hospitalPrice}+</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-border/20">
                        <span className="text-sm text-muted-foreground">{test.provider} Direct</span>
                        <span className="text-sm text-muted-foreground line-through">${test.questDirectPrice}</span>
                      </div>
                      <div className="flex items-center justify-between pt-2.5">
                        <span className="text-sm font-semibold text-teal">TestWell</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-foreground">${test.price.toFixed(2)}</span>
                          <span className="text-xs font-bold text-emerald-600">-{getSavingsPercent(test)}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2.5 mt-auto relative z-10">
                      <Button
                        variant="outline"
                        className="flex-1 rounded-xl h-11 font-medium hover:border-teal/30"
                        asChild
                      >
                        <Link href={`/tests/${test.slug}`}>
                          Details
                          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                        </Link>
                      </Button>
                      <Button
                        className={`flex-1 rounded-xl h-11 font-medium shadow-sm ${
                          isInCart(test.id)
                            ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-500/15"
                            : "bg-teal text-white hover:bg-teal/90 shadow-teal/15"
                        }`}
                        onClick={() => {
                          if (!isInCart(test.id)) {
                            addItem({ testId: test.id, name: test.name, price: test.price, slug: test.slug });
                            toast.success(`${test.name} added to cart`, {
                              description: `$${test.price.toFixed(2)}`,
                              action: { label: "View Cart", onClick: () => window.location.href = "/checkout" },
                            });
                          }
                        }}
                        disabled={isInCart(test.id)}
                      >
                        {isInCart(test.id) ? (
                          <>
                            <Check className="mr-1.5 h-3.5 w-3.5" />
                            In Cart
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
                            Add to Cart
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <FlaskConical className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-lg font-medium text-foreground mb-2">
                No tests found
              </p>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filters.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                }}
                className="rounded-xl"
              >
                Clear filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-slate-50 border-t border-border/20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Don&apos;t see what you need?
            </h2>
            <p className="text-muted-foreground mb-8">
              We&apos;re adding new tests regularly. Contact us and we&apos;ll
              help you find the right test.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                className="bg-teal text-white hover:bg-teal/90 rounded-xl h-12 px-8"
                asChild
              >
                <Link href="/how-it-works">Learn How It Works</Link>
              </Button>
              <Button
                variant="outline"
                className="rounded-xl h-12 px-8"
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

export default function TestsPage() {
  return (
    <Suspense>
      <TestsPageContent />
    </Suspense>
  );
}
