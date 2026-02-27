"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, ChevronDown } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function SignupPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    state: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          state: formData.state,
          date_of_birth: formData.dateOfBirth || null,
          gender: formData.gender || null,
          phone: formData.phone || null,
        },
      },
    });

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    }

    try {
      await fetch("/api/patients/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          first_name: formData.firstName,
          last_name: formData.lastName,
          date_of_birth: formData.dateOfBirth || undefined,
          gender: formData.gender || undefined,
          phone: formData.phone || undefined,
        }),
      });
    } catch {
      // Non-blocking — patient will be created in Fullscript later if this fails
    }

    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50/40 to-background flex flex-col">
      <header className="p-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 mb-6"
            >
              <Image
                src="/logo-mark.svg"
                alt="TestWell"
                width={28}
                height={34}
              />
              <span className="text-2xl font-bold text-foreground">
                Test<span className="text-teal">Well</span>
              </span>
            </Link>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Create your account
            </h1>
            <p className="text-muted-foreground">
              {step === 1
                ? "Order lab tests in minutes. No doctor visit required."
                : "A few more details for your lab orders."}
            </p>
          </div>

          <div className="bg-white border border-border/40 rounded-2xl p-6 shadow-lg shadow-black/[0.03]">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-teal" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  You&apos;re all set!
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Your account has been created. You can now browse and order lab
                  tests.
                </p>
                <Link
                  href="/tests"
                  onClick={() => router.refresh()}
                  className="inline-flex px-6 py-3 bg-teal text-white font-semibold rounded-xl hover:bg-teal/90 transition-all shadow-md shadow-teal/15"
                >
                  Browse Lab Tests
                </Link>
              </motion.div>
            ) : step === 1 ? (
              <form onSubmit={handleStep1} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="At least 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    minLength={6}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    State
                  </label>
                  <div className="relative">
                    <select
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all appearance-none"
                      required
                    >
                      <option value="" disabled>
                        Select your state
                      </option>
                      <option value="FL">Florida</option>
                      <option value="TX">Texas</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">
                    TestWell is currently available in Florida and Texas only.
                  </p>
                </div>

                {/* Step indicator */}
                <div className="flex items-center justify-center gap-2 pt-1">
                  <div className="w-8 h-1 rounded-full bg-teal" />
                  <div className="w-8 h-1 rounded-full bg-slate-200" />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-teal text-white font-semibold rounded-xl hover:bg-teal/90 transition-all shadow-md shadow-teal/15"
                >
                  Continue
                </button>
              </form>
            ) : (
              <motion.form
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="bg-teal/5 border border-teal/20 rounded-lg p-3 mb-1">
                  <p className="text-xs text-teal-800 leading-relaxed">
                    This information is needed for your lab orders and helps us
                    set up your account with our lab partner. All fields below
                    are required.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="dateOfBirth"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Date of Birth
                  </label>
                  <input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Biological Sex
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                      { value: "x", label: "Other" },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() =>
                          setFormData((f) => ({ ...f, gender: opt.value }))
                        }
                        className={`px-3 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                          formData.gender === opt.value
                            ? "border-teal bg-teal/5 text-teal"
                            : "border-border hover:border-border/80 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">
                    Required by labs for accurate reference ranges.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(555) 555-5555"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1.5">
                    Used for lab order notifications and updates.
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1 w-4 h-4 rounded border-border text-teal focus:ring-teal accent-teal"
                    required
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-muted-foreground"
                  >
                    I agree to the{" "}
                    <Link href="/terms" className="text-teal hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-teal hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                {/* Step indicator */}
                <div className="flex items-center justify-center gap-2 pt-1">
                  <div className="w-8 h-1 rounded-full bg-teal" />
                  <div className="w-8 h-1 rounded-full bg-teal" />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-3 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-slate-50 transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || !formData.gender}
                    className="flex-1 py-3 bg-teal text-white font-semibold rounded-xl hover:bg-teal/90 transition-all disabled:opacity-50 shadow-md shadow-teal/15"
                  >
                    {isLoading ? "Creating account..." : "Create Account"}
                  </button>
                </div>
              </motion.form>
            )}

            {!isSubmitted && (
              <div className="mt-6 text-center">
                <p className="text-muted-foreground text-sm">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-teal hover:underline font-medium"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            )}
          </div>

          {!isSubmitted && step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8"
            >
              <p className="text-sm font-medium text-foreground mb-4 text-center">
                Why TestWell?
              </p>
              <div className="space-y-3">
                {[
                  "Up to 80% less than hospital pricing",
                  "Results in 1–3 business days",
                  "4,000+ Quest & Labcorp locations",
                ].map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-teal" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
