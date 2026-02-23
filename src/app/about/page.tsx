"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Heart,
  Shield,
  DollarSign,
  Target,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const values = [
  {
    icon: DollarSign,
    title: "Radical Transparency",
    description:
      "No hidden fees, no surprise bills, no insurance games. The price you see is the price you pay — always.",
  },
  {
    icon: Heart,
    title: "Patient First",
    description:
      "We believe everyone deserves access to their own health data. No gatekeeper, no appointment, no waiting room.",
  },
  {
    icon: Shield,
    title: "Clinical Rigor",
    description:
      "Every order is physician-reviewed. Every lab is CLIA-certified. We never compromise on quality or compliance.",
  },
  {
    icon: Target,
    title: "Accessibility",
    description:
      "With 4,000+ Quest and Labcorp locations, a lab is almost always within driving distance. We're bringing lab access to everyone.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#0d948810_0%,transparent_50%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="max-w-3xl">
            <p className="text-sm font-medium text-teal uppercase tracking-[0.2em] mb-4">
              About TestWell
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-6">
              Lab testing should be{" "}
              <span className="text-gradient italic">simple</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              We started TestWell because ordering a basic blood test shouldn&apos;t
              require a doctor&apos;s appointment, an insurance pre-auth, or a
              surprise $800 bill. It should be as easy as ordering anything else
              online — and a fraction of the price.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <motion.div {...fadeUp}>
              <p className="text-sm font-medium text-teal uppercase tracking-[0.2em] mb-4">
                Our Mission
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-6">
                Democratize access to{" "}
                <span className="text-gradient italic">health data</span>
              </h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  In the US, a basic metabolic panel can cost anywhere from $35 to
                  $500+ depending on where you go and whether you have insurance.
                  That&apos;s not a healthcare system — it&apos;s a pricing maze.
                </p>
                <p>
                  TestWell partners with the same CLIA-certified laboratories used
                  by hospitals and clinics — Quest Diagnostics and Labcorp — but
                  eliminates the middlemen, the markups, and the bureaucracy. Every
                  order is reviewed by a licensed physician. Every result is
                  delivered digitally in 1–3 business days.
                </p>
                <p>
                  We believe that understanding your own body shouldn&apos;t be a
                  luxury. It should be a right.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="bg-gradient-to-br from-teal/5 to-cyan-50/40 rounded-3xl border border-teal/10 p-10 lg:p-14"
            >
              <div className="space-y-8">
                {[
                  { value: "80%", label: "Average savings vs hospital pricing" },
                  { value: "4,000+", label: "Quest & Labcorp locations" },
                  { value: "1–3 days", label: "Average results turnaround" },
                  { value: "$0", label: "Hidden fees or membership costs" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  >
                    <p className="text-3xl font-bold text-teal mb-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-slate-50 border-y border-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-medium text-teal uppercase tracking-[0.2em] mb-4">
              Our Values
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-4">
              What we{" "}
              <span className="text-gradient italic">stand for</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-border/30 p-7 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center mb-5">
                  <value.icon className="h-6 w-6 text-teal" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#0d948815_0%,transparent_60%)]" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <motion.div {...fadeUp}>
            <Lightbulb className="h-10 w-10 text-teal mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-5">
              Ready to take control of your health?
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto">
              Browse our full catalog, pick the tests you need, and visit a lab
              near you — all at a fraction of the usual cost.
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
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
