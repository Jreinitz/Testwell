"use client";

import { motion } from "framer-motion";
import { Building2, ShieldCheck, Microscope, Award } from "lucide-react";

const partners = [
  { name: "Quest Diagnostics", description: "2,200+ patient service centers", icon: Building2 },
  { name: "Labcorp", description: "1,900+ patient service centers", icon: Building2 },
  { name: "CLIA Certified", description: "Federally accredited laboratories", icon: ShieldCheck },
  { name: "CAP Accredited", description: "College of American Pathologists", icon: Award },
];

const certifications = [
  "CLIA Certified",
  "CAP Accredited",
  "HIPAA Compliant",
  "SOC 2 Type II",
  "256-bit Encryption",
  "Board Certified Physicians",
];

export function LabPartners() {
  return (
    <section className="py-20 lg:py-28 bg-white border-y border-border/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#0d948808_0%,transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-sm text-muted-foreground uppercase tracking-[0.2em] font-medium">
            Trusted Lab Partners & Certifications
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 mb-14">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-slate-50 rounded-2xl border border-border/30 flex items-center justify-center group-hover:border-teal/20 group-hover:shadow-md transition-all duration-300">
                <partner.icon className="h-7 w-7 text-slate-400 group-hover:text-teal transition-colors" />
              </div>
              <p className="text-sm font-semibold text-foreground mb-1">
                {partner.name}
              </p>
              <p className="text-xs text-muted-foreground">{partner.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {certifications.map((cert) => (
            <span
              key={cert}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-slate-50 border border-border/30 px-3 py-1.5 rounded-full"
            >
              <Microscope className="h-3 w-3 text-teal" />
              {cert}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
