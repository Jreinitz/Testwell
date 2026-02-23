"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity } from "lucide-react";

function getBaseCount(): number {
  const now = new Date();
  const hoursSinceMidnight = now.getHours() + now.getMinutes() / 60;
  return Math.floor(hoursSinceMidnight * 47 + 312);
}

function Digit({ value }: { value: string }) {
  return (
    <span
      className="relative inline-flex justify-center overflow-hidden"
      style={{ width: "0.65em", height: "1.4em" }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={value}
          initial={{ y: 14, opacity: 0, filter: "blur(2px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -14, opacity: 0, filter: "blur(2px)" }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function RollingNumber({ value }: { value: number }) {
  const formatted = value.toLocaleString();

  return (
    <span className="inline-flex items-center tabular-nums font-bold text-foreground leading-none">
      {formatted.split("").map((char, i) =>
        char === "," ? (
          <span key={`c-${i}`} className="w-[0.25em] text-center">,</span>
        ) : (
          <Digit key={`d-${i}`} value={char} />
        )
      )}
    </span>
  );
}

export function LiveCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setCount(getBaseCount());
    setMounted(true);
  }, []);

  const scheduleTick = useCallback(() => {
    intervalRef.current = setTimeout(() => {
      setCount((prev) => (prev ?? 0) + Math.floor(Math.random() * 3) + 1);
      scheduleTick();
    }, 3500 + Math.random() * 4500);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    scheduleTick();
    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [mounted, scheduleTick]);

  if (!mounted || count === null) {
    return <div className="h-[36px]" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay: 0.05, duration: 0.6 }}
      className="flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-slate-200/60 px-3.5 py-1.5 rounded-full text-[13px] shadow-sm w-fit mb-4"
    >
      <span className="relative flex items-center justify-center w-5 h-5">
        <Activity className="h-3.5 w-3.5 text-teal relative z-10" />
        <span className="absolute inset-0 animate-ping rounded-full bg-teal/20" />
      </span>
      <span className="text-muted-foreground font-medium flex items-center gap-1">
        <RollingNumber value={count} />
        <span className="ml-0.5">labs ordered today</span>
      </span>
    </motion.div>
  );
}
