"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Droplets, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { tests, getSavingsPercent } from "@/lib/data/tests";

const popularTests = tests.slice(0, 6);

export function PopularTests() {
  return (
    <section className="py-28 lg:py-40 bg-slate-50 relative noise-overlay overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal/[0.03] rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-16"
        >
          <div>
            <p className="text-sm font-medium text-teal uppercase tracking-[0.2em] mb-5">
              Popular Tests
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
              Our most <span className="text-gradient italic">ordered</span> tests
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              Same CLIA-certified labs. Same analysis. Up to 80% less.
            </p>
          </div>
          <Button
            variant="outline"
            className="shrink-0 h-12 rounded-xl px-6 hover:border-teal/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            asChild
          >
            <Link href="/tests">
              View all tests <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularTests.map((test, i) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-border/30 p-6 lg:p-7 h-full hover:shadow-xl hover:border-teal/25 transition-all duration-500 flex flex-col glow-card group">
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
                    className="flex-1 rounded-xl h-11 font-medium bg-teal text-white hover:bg-teal/90 shadow-sm shadow-teal/15"
                    onClick={() =>
                      toast.success(`${test.name} added to cart`, {
                        description: `$${test.price.toFixed(2)}`,
                        action: { label: "View Cart", onClick: () => window.location.href = "/checkout" },
                      })
                    }
                  >
                    <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
