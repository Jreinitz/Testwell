"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, Check } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { LiveCounter } from "./live-counter";

const results = [
  { name: "Glucose", value: "92", unit: "mg/dL" },
  { name: "Cholesterol", value: "185", unit: "mg/dL" },
  { name: "TSH", value: "2.1", unit: "mIU/L" },
  { name: "Hemoglobin", value: "14.2", unit: "g/dL" },
];

function StatusBar() {
  return (
    <div className="relative flex items-center justify-between px-8 pt-[14px] pb-1 z-0">
      <span className="text-[12px] font-semibold text-[#1a1c1e] tracking-tight">
        9:41
      </span>
      <div className="flex items-center gap-[5px]">
        <svg width="13" height="10" viewBox="0 0 17 11" fill="none">
          <rect x="0" y="7" width="3" height="4" rx="0.7" fill="#1a1c1e" />
          <rect x="4.5" y="5" width="3" height="6" rx="0.7" fill="#1a1c1e" />
          <rect x="9" y="2.5" width="3" height="8.5" rx="0.7" fill="#1a1c1e" />
          <rect x="13.5" y="0" width="3" height="11" rx="0.7" fill="#1a1c1e" />
        </svg>
        <svg width="12" height="9" viewBox="0 0 16 12" fill="none">
          <path d="M8 10.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" fill="#1a1c1e" />
          <path d="M4.7 7.3a4.5 4.5 0 0 1 6.6 0" stroke="#1a1c1e" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M2 4.5a8 8 0 0 1 12 0" stroke="#1a1c1e" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <div className="flex items-center">
          <div className="w-[20px] h-[9px] rounded-[2.5px] border-[1.2px] border-[#1a1c1e] flex items-center" style={{ padding: "1.2px" }}>
            <div className="w-full h-full bg-[#34c759] rounded-[1px]" />
          </div>
          <div className="w-[1.5px] h-[4px] bg-[#1a1c1e] rounded-r-full ml-[1px]" />
        </div>
      </div>
    </div>
  );
}

function GreenDot({ delay }: { delay: number }) {
  return (
    <motion.div
      className="relative w-[9px] h-[9px]"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.3, type: "spring", stiffness: 400, damping: 12 }}
    >
      <div className="w-full h-full bg-emerald-500 rounded-full" />
      <motion.div
        className="absolute inset-0 bg-emerald-400 rounded-full"
        initial={{ scale: 1, opacity: 0.6 }}
        animate={{ scale: 2.5, opacity: 0 }}
        transition={{ delay: delay + 0.1, duration: 0.8, ease: "easeOut" }}
      />
    </motion.div>
  );
}

function PhoneMockup() {
  const [screenOn, setScreenOn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setScreenOn(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative mx-auto" style={{ width: 272 }}>
      <div
        className="relative rounded-[48px] bg-[#2a2d31] shadow-[0_25px_60px_-12px_rgba(0,0,0,0.35)]"
        style={{ padding: "6px" }}
      >
        <div className="absolute -right-[2px] top-[90px] w-[3px] h-[28px] bg-[#3a3d41] rounded-r-full" />
        <div className="absolute -left-[2px] top-[80px] w-[3px] h-[22px] bg-[#3a3d41] rounded-l-full" />
        <div className="absolute -left-[2px] top-[120px] w-[3px] h-[38px] bg-[#3a3d41] rounded-l-full" />
        <div className="absolute -left-[2px] top-[166px] w-[3px] h-[38px] bg-[#3a3d41] rounded-l-full" />

        {/* Screen with power-on effect */}
        <motion.div
          className="relative rounded-[42px] overflow-hidden"
          initial={{ backgroundColor: "#111113" }}
          animate={{ backgroundColor: screenOn ? "#faf8f5" : "#111113" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[76px] h-[22px] bg-[#1a1c1e] rounded-full z-10" />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: screenOn ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <StatusBar />
          </motion.div>

          <div className="px-5 pt-5 pb-4">
            {/* App header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: screenOn ? 1 : 0 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              className="flex items-center justify-between mb-5"
            >
              <span className="text-[15px] font-bold text-[#1a1c1e] tracking-tight">
                Test<span className="text-teal">Well</span>
              </span>
              <span className="text-[11px] text-[#9ca3af] font-medium">Feb 14, 2026</span>
            </motion.div>

            {/* Results header */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              animate={screenOn ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 1.0, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-[14px] p-4 mb-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-[#f0eeeb]"
            >
              <p className="text-[14px] font-bold text-[#1a1c1e]">Your Results</p>
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={screenOn ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.3, duration: 0.4 }}
                className="flex items-center gap-1 mt-1"
              >
                <Check className="h-3.5 w-3.5 text-teal" strokeWidth={2.5} />
                <p className="text-[12px] text-teal font-semibold">
                  All values in normal range
                </p>
              </motion.div>
            </motion.div>

            {/* Result rows — staggered cascade */}
            {results.map((r, i) => {
              const rowDelay = 1.2 + i * 0.15;
              const dotDelay = rowDelay + 0.3;
              return (
                <motion.div
                  key={r.name}
                  initial={{ opacity: 0, x: -16, scale: 0.95 }}
                  animate={screenOn ? { opacity: 1, x: 0, scale: 1 } : {}}
                  transition={{
                    delay: rowDelay,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="bg-white rounded-[14px] px-4 py-3.5 mb-2 shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-[#f0eeeb] flex items-center justify-between"
                >
                  <span className="text-[13px] font-semibold text-[#1a1c1e]">{r.name}</span>
                  <div className="flex items-center gap-2.5">
                    <motion.span
                      className="text-[13px] text-[#6b7280] tabular-nums font-medium"
                      initial={{ opacity: 0 }}
                      animate={screenOn ? { opacity: 1 } : {}}
                      transition={{ delay: rowDelay + 0.15, duration: 0.3 }}
                    >
                      {r.value}{" "}
                      <span className="text-[10px] text-[#9ca3af]">{r.unit}</span>
                    </motion.span>
                    <GreenDot delay={dotDelay} />
                  </div>
                </motion.div>
              );
            })}

            {/* Physician badge */}
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={screenOn ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 2.0, duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
              className="bg-teal/[0.06] rounded-[14px] p-4 mt-2.5 border border-teal/[0.12]"
            >
              <div className="flex items-center gap-1.5">
                <p className="text-[13px] font-bold text-teal">Physician Reviewed</p>
                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  animate={screenOn ? { scale: 1, rotate: 0 } : {}}
                  transition={{ delay: 2.2, duration: 0.4, type: "spring", stiffness: 300 }}
                >
                  <Check className="h-3.5 w-3.5 text-teal" strokeWidth={2.5} />
                </motion.div>
              </div>
              <p className="text-[11px] text-[#6b7280] mt-0.5 font-medium">
                Dr. Sarah Chen · Board Certified
              </p>
            </motion.div>
          </div>

          {/* Home indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: screenOn ? 1 : 0 }}
            transition={{ delay: 1.0, duration: 0.3 }}
            className="flex justify-center pb-[6px] pt-2"
          >
            <div className="w-[100px] h-[4px] bg-[#c4c0bb] rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const phoneRotateX = useTransform(scrollYProgress, [0, 0.5], [0, 8]);
  const phoneScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotX = useSpring(useTransform(mouseY, [-300, 300], [3, -3]), { stiffness: 150, damping: 20 });
  const rotY = useSpring(useTransform(mouseX, [-300, 300], [-3, 3]), { stiffness: 150, damping: 20 });

  const glowOpacity = useMotionValue(0);
  const glowSpring = useSpring(glowOpacity, { stiffness: 60, damping: 15 });

  useEffect(() => {
    const timer = setTimeout(() => glowOpacity.set(1), 800);
    return () => clearTimeout(timer);
  }, [glowOpacity]);

  function handleMouseMove(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-teal/[0.02] pt-28 pb-24 lg:pt-44 lg:pb-40 noise-overlay"
      onMouseMove={handleMouseMove}
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0d94880a_1px,transparent_1px),linear-gradient(to_bottom,#0d94880a_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-[10%] w-[500px] h-[500px] bg-teal/[0.04] rounded-full blur-[100px] animate-float-slow" />
      <div className="absolute bottom-10 right-[5%] w-[400px] h-[400px] bg-cyan-200/[0.06] rounded-full blur-[80px] animate-float-medium" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal/[0.02] rounded-full blur-[120px] animate-float-fast" />

      <motion.div style={{ opacity: heroOpacity }} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left: Copy */}
          <motion.div style={{ y: y1 }}>
            {/* Live counter */}
            <LiveCounter />

            {/* Badge */}
            <div>
              <motion.span
                initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.15, duration: 0.7 }}
                className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-teal/20 text-teal px-3.5 py-1.5 rounded-full text-[13px] font-medium mb-8 shadow-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal" />
                </span>
                Now available in Florida & Texas
              </motion.span>
            </div>

            {/* Headline — cinematic word reveal */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-navy leading-[1.05] mb-8">
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  Skip the doctor.
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="block text-gradient-hero italic"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  Order it yourself.
                </motion.span>
              </span>
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-lg"
            >
              Don&apos;t wait weeks for a doctor&apos;s appointment just to order routine
              bloodwork. Pick the tests you want, walk into Quest or Labcorp,
              and pay{" "}
              <span className="font-semibold text-foreground">up to 80% less</span>{" "}
              than you would through a hospital.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Button
                size="lg"
                className="bg-teal hover:bg-teal/90 text-white text-base px-8 h-14 rounded-xl shadow-lg shadow-teal/25 hover:shadow-xl hover:shadow-teal/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                asChild
              >
                <Link href="/tests">
                  Browse Tests <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base h-14 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                asChild
              >
                <Link href="/how-it-works">How It Works</Link>
              </Button>
            </motion.div>

            {/* Trust signals — staggered fade */}
            <div className="flex items-center gap-6 sm:gap-8 text-sm">
              {[
                "No doctor visit needed",
                "Physician reviewed",
                "No insurance required",
              ].map((text, i) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 + i * 0.12, duration: 0.5 }}
                  className={`flex items-center gap-2 text-muted-foreground ${
                    i === 2 ? "hidden sm:flex" : ""
                  }`}
                >
                  <div className="w-4 h-4 bg-teal/10 rounded-full flex items-center justify-center">
                    <Check className="h-2.5 w-2.5 text-teal" />
                  </div>
                  <span>{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: iPhone mockup with 3D tilt */}
          <motion.div
            style={{ y: y2 }}
            className="relative hidden lg:flex justify-center"
          >
            {/* Glow that intensifies as screen turns on */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[500px] bg-gradient-to-b from-teal/12 via-cyan-100/12 to-teal/5 rounded-[60px] blur-3xl"
              style={{ opacity: glowSpring }}
            />

            <div className="relative" style={{ perspective: 800 }}>
              {/* Phone with 3D mouse-tracking tilt + scroll shrink + perpetual float */}
              <motion.div
                initial={{ opacity: 0, y: 60, rotateX: 12 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  rotateX: rotX,
                  rotateY: rotY,
                  scale: phoneScale,
                }}
              >
                {/* Perpetual gentle float */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <PhoneMockup />
                </motion.div>
              </motion.div>

              {/* Floating price card — gentle orbit */}
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: -3, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, rotate: -3, scale: 1 }}
                transition={{ delay: 2.4, duration: 0.7, type: "spring", stiffness: 100 }}
                className="absolute -bottom-4 -left-20"
              >
                <motion.div
                  animate={{ y: [0, -5, 0], rotate: [-3, -2, -3] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-white/95 backdrop-blur-lg rounded-xl shadow-xl border border-slate-100 px-5 py-3.5 ring-1 ring-black/[0.02]"
                >
                  <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                    Your cost
                  </p>
                  <p className="text-2xl font-bold text-gradient">$24.99</p>
                  <p className="text-[10px] text-muted-foreground">
                    <span className="line-through">Hospital: $200+</span>
                    <span className="ml-1.5 text-emerald-600 font-bold">-87%</span>
                  </p>
                </motion.div>
              </motion.div>

              {/* Floating time card — gentle orbit */}
              <motion.div
                initial={{ opacity: 0, y: -30, rotate: 3, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, rotate: 3, scale: 1 }}
                transition={{ delay: 2.5, duration: 0.7, type: "spring", stiffness: 100 }}
                className="absolute -top-2 -right-20"
              >
                <motion.div
                  animate={{ y: [0, -6, 0], rotate: [3, 4, 3] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="bg-white/95 backdrop-blur-lg rounded-xl shadow-xl border border-slate-100 px-5 py-3.5 ring-1 ring-black/[0.02]"
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Clock className="h-3.5 w-3.5 text-teal" />
                    <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                      Results
                    </p>
                  </div>
                  <p className="text-xl font-bold text-foreground">1–3 days</p>
                </motion.div>
              </motion.div>

              {/* "No Rx needed" badge — gentle orbit */}
              <motion.div
                initial={{ opacity: 0, x: 30, rotate: 2, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, rotate: 2, scale: 1 }}
                transition={{ delay: 2.6, duration: 0.7, type: "spring", stiffness: 100 }}
                className="absolute top-[38%] -right-24"
              >
                <motion.div
                  animate={{ y: [0, -4, 0], rotate: [2, 3, 2] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="bg-white/95 backdrop-blur-lg rounded-xl shadow-xl border border-slate-100 px-4 py-3 ring-1 ring-black/[0.02]"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 bg-teal rounded-full flex items-center justify-center shadow-sm">
                      <Shield className="h-3.5 w-3.5 text-white" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-foreground">No Rx needed</p>
                      <p className="text-[9px] text-muted-foreground font-medium">You order directly</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
