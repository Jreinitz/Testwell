"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
  HelpCircle,
  Building,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const fadeUp = {
  initial: { opacity: 0, y: 24 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } as const,
};

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "support@test-well.com",
    detail: "We respond within 24 hours",
  },
  {
    icon: MapPin,
    title: "Locations",
    value: "Florida & Texas",
    detail: "4,000+ Quest & Labcorp locations",
  },
  {
    icon: Clock,
    title: "Hours",
    value: "Mon–Fri, 9am–6pm EST",
    detail: "Weekend emails answered Monday",
  },
];

const topics = [
  { value: "general", label: "General Inquiry" },
  { value: "test-question", label: "Question About a Test" },
  { value: "results", label: "Results Help" },
  { value: "billing", label: "Billing & Pricing" },
  { value: "partnership", label: "Partnership / Business" },
  { value: "other", label: "Other" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Message sent successfully!", {
      description: "We'll get back to you within 24 hours.",
    });
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#0d948810_0%,transparent_50%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="max-w-3xl">
            <p className="text-sm font-medium text-teal uppercase tracking-[0.2em] mb-4">
              Contact
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-6">
              Get in{" "}
              <span className="text-gradient italic">touch</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Have a question about a test, need help with results, or want to
              explore a partnership? We&apos;re here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 -mt-4">
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="bg-white rounded-2xl border border-border/30 p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-10 h-10 bg-teal/10 rounded-xl flex items-center justify-center mb-4">
                  <info.icon className="h-5 w-5 text-teal" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  {info.title}
                </h3>
                <p className="text-base font-medium text-foreground mb-1">
                  {info.value}
                </p>
                <p className="text-xs text-muted-foreground">{info.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_420px] gap-14 lg:gap-20">
            {/* Form */}
            <motion.div {...fadeUp}>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Send us a message
              </h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and we&apos;ll get back to you within one
                business day.
              </p>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-teal/5 border border-teal/15 rounded-2xl p-10 text-center"
                >
                  <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="h-8 w-8 text-teal" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Message sent!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Thanks for reaching out. We&apos;ll respond within 24 hours.
                  </p>
                  <Button
                    variant="outline"
                    className="rounded-xl"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: "", email: "", topic: "", message: "" });
                    }}
                  >
                    Send another message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        className="h-12 rounded-xl border-border/40"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="h-12 rounded-xl border-border/40"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="topic"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Topic
                    </label>
                    <select
                      id="topic"
                      name="topic"
                      value={formData.topic}
                      onChange={handleChange}
                      className="w-full h-12 px-4 rounded-xl border border-border/40 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all appearance-none"
                      required
                    >
                      <option value="" disabled>
                        Select a topic
                      </option>
                      {topics.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="How can we help?"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-border/40 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all resize-none"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-teal text-white hover:bg-teal/90 rounded-xl h-12 px-8 font-semibold shadow-md shadow-teal/15 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-slate-50 rounded-2xl border border-border/30 p-7">
                <div className="flex items-center gap-3 mb-4">
                  <HelpCircle className="h-5 w-5 text-teal" />
                  <h3 className="font-bold text-foreground">FAQ</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Find quick answers to common questions about ordering, lab
                  visits, results, and more.
                </p>
                <Button
                  variant="outline"
                  className="rounded-xl w-full"
                  asChild
                >
                  <Link href="/#faq">
                    View FAQ <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="bg-slate-50 rounded-2xl border border-border/30 p-7">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="h-5 w-5 text-teal" />
                  <h3 className="font-bold text-foreground">Need urgent help?</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  If you have a question about abnormal results or a medical
                  concern, please contact your healthcare provider directly.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl border border-border/30 p-7">
                <div className="flex items-center gap-3 mb-4">
                  <Building className="h-5 w-5 text-teal" />
                  <h3 className="font-bold text-foreground">Partnerships</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Interested in offering TestWell to your employees, patients, or
                  members? Select &quot;Partnership / Business&quot; in the form and
                  we&apos;ll be in touch.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
