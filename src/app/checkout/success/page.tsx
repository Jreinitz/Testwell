"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  Package,
  Info,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart/cart-context";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.1,
            }}
            className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-emerald-100"
          >
            <CheckCircle2 className="h-10 w-10 text-emerald-500" />
          </motion.div>

          <h1 className="text-3xl font-bold text-foreground mb-3">
            Order Confirmed!
          </h1>
          <p className="text-muted-foreground mb-8 max-w-sm mx-auto leading-relaxed">
            Your payment was successful. Our physician will review your order
            and you&apos;ll receive your lab requisition shortly.
          </p>

          <div className="bg-white border border-border/40 rounded-2xl p-6 shadow-sm mb-6">
            <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2 justify-center">
              <Package className="h-4 w-4 text-teal" />
              What happens next
            </h2>
            <div className="space-y-4 text-left">
              {[
                {
                  step: "1",
                  title: "Physician Review",
                  desc: "Our licensed physician reviews and approves your lab order.",
                },
                {
                  step: "2",
                  title: "Lab Requisition Sent",
                  desc: "You\u2019ll receive an email with your lab requisition and instructions on where to go.",
                },
                {
                  step: "3",
                  title: "Get Tested",
                  desc: "Walk into any Quest or Labcorp near you \u2014 no appointment needed.",
                },
                {
                  step: "4",
                  title: "View Results",
                  desc: "You\u2019ll be notified when results are ready. Access them through your lab portal.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-3">
                  <div className="w-7 h-7 bg-teal/10 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-teal">
                    {item.step}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fullscript Portal Info */}
          <div className="bg-blue-50/70 border border-blue-200/60 rounded-2xl p-5 mb-8 text-left">
            <div className="flex gap-3">
              <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-blue-900 mb-1">
                  About your lab portal
                </p>
                <p className="text-xs text-blue-800/80 leading-relaxed">
                  Your lab order is processed through our certified lab
                  partner. You&apos;ll receive an email with your lab
                  requisition and instructions. To view your requisition and
                  results, you may need to{" "}
                  <span className="font-medium">
                    create a free patient portal account
                  </span>{" "}
                  using the same email you signed up with here. This is a
                  one-time setup.
                </p>
                <a
                  href="https://patient.fullscript.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 hover:text-blue-900 mt-2 transition-colors"
                >
                  Access Lab Portal
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="bg-teal text-white hover:bg-teal/90 rounded-xl h-12 px-6 font-semibold shadow-md shadow-teal/15"
              asChild
            >
              <Link href="/account">
                View My Orders
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              className="rounded-xl h-12 px-6 font-medium"
              asChild
            >
              <Link href="/tests">Order More Tests</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
