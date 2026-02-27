"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ShoppingCart,
  Trash2,
  ShieldCheck,
  Lock,
  FlaskConical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart/cart-context";
import { useAuth } from "@/lib/supabase/auth-provider";
import { toast } from "sonner";
import { useState } from "react";

export default function CheckoutPage() {
  const { items, removeItem, clearCart, totalPrice, itemCount } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please sign in to continue");
      router.push("/login?redirect=/checkout");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ testId: i.testId, name: i.name, price: i.price })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
      setIsLoading(false);
    }
  };

  if (itemCount === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="h-8 w-8 text-muted-foreground/40" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-3">
              Your cart is empty
            </h1>
            <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
              Browse our lab tests and add the ones you need. Save up to 80% compared to hospital pricing.
            </p>
            <Button
              className="bg-teal text-white hover:bg-teal/90 rounded-xl h-12 px-8 font-semibold shadow-md shadow-teal/15"
              asChild
            >
              <Link href="/tests">Browse Lab Tests</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            href="/tests"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue shopping
          </Link>

          <h1 className="text-3xl font-bold text-foreground mb-2">
            Your Cart
          </h1>
          <p className="text-muted-foreground mb-8">
            {itemCount} test{itemCount !== 1 ? "s" : ""} selected
          </p>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-3">
              {items.map((item, index) => (
                <motion.div
                  key={item.testId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white border border-border/40 rounded-xl p-5 flex items-center justify-between shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-teal/10 rounded-lg flex items-center justify-center">
                      <FlaskConical className="h-5 w-5 text-teal" />
                    </div>
                    <div>
                      <Link
                        href={`/tests/${item.slug}`}
                        className="font-medium text-foreground hover:text-teal transition-colors"
                      >
                        {item.name}
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-foreground">
                      ${item.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => {
                        removeItem(item.testId);
                        toast.success(`${item.name} removed from cart`);
                      }}
                      className="text-muted-foreground hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))}

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    clearCart();
                    toast.success("Cart cleared");
                  }}
                  className="text-sm text-muted-foreground hover:text-red-500 transition-colors"
                >
                  Clear all
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-border/40 rounded-2xl p-6 shadow-sm sticky top-24">
                <h2 className="text-lg font-semibold text-foreground mb-5">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-5">
                  {items.map((item) => (
                    <div
                      key={item.testId}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-muted-foreground truncate mr-3">
                        {item.name}
                      </span>
                      <span className="text-foreground font-medium shrink-0">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border/30 pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="text-xl font-bold text-foreground">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full bg-teal text-white hover:bg-teal/90 rounded-xl h-12 font-semibold text-base shadow-md shadow-teal/15 hover:shadow-lg hover:shadow-teal/20 transition-all"
                  onClick={handleCheckout}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Processing..."
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4" />
                      Proceed to Payment
                    </>
                  )}
                </Button>

                <div className="mt-5 space-y-3">
                  {[
                    { icon: ShieldCheck, text: "HIPAA compliant & secure" },
                    { icon: Lock, text: "256-bit SSL encryption" },
                  ].map(({ icon: Icon, text }) => (
                    <div
                      key={text}
                      className="flex items-center gap-2 text-xs text-muted-foreground"
                    >
                      <Icon className="h-3.5 w-3.5 text-teal" />
                      {text}
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-border/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Image
                      src="/logo-mark.svg"
                      alt="TestWell"
                      width={16}
                      height={20}
                    />
                    <span className="text-xs font-semibold text-foreground">
                      TestWell Guarantee
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    All tests are physician-reviewed and processed at certified Quest Diagnostics and Labcorp facilities. Results in 1-3 business days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
