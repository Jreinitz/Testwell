"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

export function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={sectionRef}
      className="relative py-36 lg:py-48 bg-navy overflow-hidden noise-overlay"
    >
      {/* Animated gradient mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,#0d948818_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,#06b6d412_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#0d948810_0%,transparent_40%)]" />

      {/* Dot pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Glow lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal/30 to-transparent" />

      {/* Floating orbs */}
      <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-teal/[0.06] rounded-full blur-[80px] animate-float-slow" />
      <div className="absolute bottom-[20%] right-[10%] w-64 h-64 bg-cyan-400/[0.05] rounded-full blur-[80px] animate-float-medium" />

      <motion.div
        style={{ y }}
        className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-8 tracking-tight">
            Your health data.
            <br />
            <span className="text-gradient-hero italic">Your terms.</span>
          </h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Pick the tests you need, walk into Quest or Labcorp, and get
            physician-reviewed results in days. No doctor visit. No insurance.
            No surprise bills.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              className="bg-teal hover:bg-teal/90 text-white text-base sm:text-lg px-8 sm:px-12 h-14 sm:h-16 rounded-xl shadow-xl shadow-teal/25 hover:shadow-2xl hover:shadow-teal/30 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
              asChild
            >
              <Link href="/tests">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base sm:text-lg h-14 sm:h-16 px-8 sm:px-12 rounded-xl border-slate-600 text-slate-300 hover:bg-white/5 hover:text-white hover:border-slate-500 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
              asChild
            >
              <Link href="/pricing">See Pricing</Link>
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 text-sm text-slate-500"
          >
            {["Florida & Texas", "HSA / FSA eligible", "HIPAA compliant"].map(
              (item, i) => (
                <span key={item} className="flex items-center gap-2">
                  {i > 0 && <span className="text-slate-700">·</span>}
                  {item}
                </span>
              )
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
