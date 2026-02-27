"use client";

import { useEffect, useState, useCallback, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ClipboardList,
  User,
  Package,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type OrderItem = {
  id: string;
  test_id: string;
  test_name: string;
  price: number;
};

type Order = {
  id: string;
  user_id: string;
  status: string;
  total_amount: number;
  stripe_checkout_session_id: string | null;
  fullscript_treatment_plan_id: string | null;
  fullscript_lab_order_id: string | null;
  created_at: string;
  updated_at: string;
  profiles: { first_name: string; last_name: string; email: string } | null;
  order_items: OrderItem[];
};

const STATUS_STEPS = [
  { key: "paid", label: "Payment Received" },
  { key: "lab_ordered", label: "Lab Requisition Sent" },
  { key: "kit_shipped", label: "Kit Shipped" },
  { key: "results_ready", label: "Results Available" },
  { key: "completed", label: "Completed" },
];

function getStepIndex(status: string): number {
  const map: Record<string, number> = {
    paid: 0,
    awaiting_plan: 0,
    plan_activated: 1,
    lab_ordered: 1,
    kit_shipped: 2,
    kit_delivered: 2,
    specimen_received: 2,
    processing: 2,
    results_ready: 3,
    completed: 4,
  };
  return map[status] ?? -1;
}

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: orderId } = use(params);
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [activating, setActivating] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);

  const fetchOrder = useCallback(async () => {
    try {
      const res = await fetch(`/api/orders?user_id=&status=`);
      const data = await res.json();
      const found = (data.orders || []).find(
        (o: Order) => o.id === orderId
      );
      if (found) setOrder(found);
    } catch (err) {
      console.error("Failed to fetch order:", err);
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const handleActivateOrder = async (treatmentPlanId: string) => {
    if (!order) return;
    setActivating(true);

    try {
      const res = await fetch(`/api/orders/${order.id}/activate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ treatmentPlanId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Activation failed");
      }

      toast.success("Order activated! Lab requisition is being processed.");
      await fetchOrder();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to activate order"
      );
    } finally {
      setActivating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-teal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-20">
        <p className="text-foreground font-medium">Order not found</p>
        <Button
          variant="outline"
          className="mt-4 rounded-xl"
          onClick={() => router.push("/provider/orders")}
        >
          Back to Orders
        </Button>
      </div>
    );
  }

  const currentStep = getStepIndex(order.status);
  const needsAction =
    order.status === "paid" || order.status === "awaiting_plan";

  return (
    <div>
      <Link
        href="/provider/orders"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Orders
      </Link>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Order Header */}
          <div className="bg-white rounded-xl border border-border/40 p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  Order #{order.id.slice(0, 8)}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Placed {new Date(order.created_at).toLocaleDateString()} at{" "}
                  {new Date(order.created_at).toLocaleTimeString()}
                </p>
              </div>
              <StatusBadge status={order.status} />
            </div>

            {/* Progress Steps */}
            <div className="flex items-center gap-0 mt-6">
              {STATUS_STEPS.map((step, idx) => {
                const isComplete = idx <= currentStep;
                const isCurrent = idx === currentStep;
                return (
                  <div key={step.key} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          isComplete
                            ? "bg-teal text-white"
                            : "bg-slate-100 text-muted-foreground"
                        } ${isCurrent ? "ring-2 ring-teal/30 ring-offset-2" : ""}`}
                      >
                        {isComplete ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          idx + 1
                        )}
                      </div>
                      <span
                        className={`text-[10px] font-medium mt-1.5 text-center ${
                          isComplete
                            ? "text-teal"
                            : "text-muted-foreground"
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    {idx < STATUS_STEPS.length - 1 && (
                      <div
                        className={`h-0.5 flex-1 -mx-1 mt-[-18px] ${
                          idx < currentStep ? "bg-teal" : "bg-slate-200"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Panel */}
          {needsAction && (
            <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold text-amber-900">
                    Action Required
                  </h3>
                  <p className="text-sm text-amber-700 mt-1">
                    This order has been paid. Use the Fullscript portal to
                    create a treatment plan with the requested lab tests,
                    then activate it below.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => setShowEmbed(!showEmbed)}
                  className="bg-teal text-white hover:bg-teal/90 rounded-xl shadow-sm"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {showEmbed
                    ? "Hide Fullscript Panel"
                    : "Open Fullscript Panel"}
                </Button>

                {showEmbed && (
                  <FullscriptEmbedPanel
                    patientEmail={order.profiles?.email || ""}
                    onActivate={handleActivateOrder}
                    activating={activating}
                  />
                )}
              </div>
            </div>
          )}

          {/* Lab Tests */}
          <div className="bg-white rounded-xl border border-border/40 p-6 shadow-sm">
            <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Package className="h-4 w-4 text-teal" />
              Ordered Tests
            </h2>
            <div className="space-y-3">
              {order.order_items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-slate-50/50 rounded-lg border border-border/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-teal/10 rounded-md flex items-center justify-center">
                      <ClipboardList className="h-4 w-4 text-teal" />
                    </div>
                    <span className="font-medium text-foreground text-sm">
                      {item.test_name}
                    </span>
                  </div>
                  <span className="font-semibold text-foreground">
                    ${Number(item.price).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Patient Info */}
          <div className="bg-white rounded-xl border border-border/40 p-6 shadow-sm">
            <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <User className="h-4 w-4 text-teal" />
              Patient
            </h2>
            {order.profiles ? (
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium text-foreground">
                    {order.profiles.first_name} {order.profiles.last_name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground text-sm break-all">
                    {order.profiles.email}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Patient info unavailable
              </p>
            )}
          </div>

          {/* Payment Info */}
          <div className="bg-white rounded-xl border border-border/40 p-6 shadow-sm">
            <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-teal" />
              Payment
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="font-bold text-foreground">
                  ${Number(order.total_amount).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <span className="text-sm font-medium text-emerald-600">
                  Paid
                </span>
              </div>
            </div>
          </div>

          {/* Timestamps */}
          <div className="bg-white rounded-xl border border-border/40 p-6 shadow-sm">
            <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4 text-teal" />
              Timeline
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Created</p>
                <p className="text-sm font-medium text-foreground">
                  {new Date(order.created_at).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Last Updated</p>
                <p className="text-sm font-medium text-foreground">
                  {new Date(order.updated_at).toLocaleString()}
                </p>
              </div>
              {order.fullscript_treatment_plan_id && (
                <div>
                  <p className="text-xs text-muted-foreground">
                    Treatment Plan ID
                  </p>
                  <p className="text-sm font-mono text-foreground break-all">
                    {order.fullscript_treatment_plan_id}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; className: string }> = {
    pending: { label: "Pending", className: "bg-slate-100 text-slate-700" },
    paid: { label: "Paid", className: "bg-amber-100 text-amber-700" },
    awaiting_plan: { label: "Awaiting Plan", className: "bg-amber-100 text-amber-700" },
    plan_activated: { label: "Plan Active", className: "bg-blue-100 text-blue-700" },
    lab_ordered: { label: "Lab Ordered", className: "bg-blue-100 text-blue-700" },
    kit_shipped: { label: "Kit Shipped", className: "bg-indigo-100 text-indigo-700" },
    kit_delivered: { label: "Kit Delivered", className: "bg-indigo-100 text-indigo-700" },
    specimen_received: { label: "Specimen Received", className: "bg-purple-100 text-purple-700" },
    processing: { label: "Processing", className: "bg-blue-100 text-blue-700" },
    results_ready: { label: "Results Ready", className: "bg-emerald-100 text-emerald-700" },
    completed: { label: "Completed", className: "bg-emerald-100 text-emerald-700" },
    cancelled: { label: "Cancelled", className: "bg-red-100 text-red-700" },
  };
  const c = config[status] || { label: status, className: "bg-slate-100 text-slate-700" };
  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${c.className}`}>
      {c.label}
    </span>
  );
}

function FullscriptEmbedPanel({
  patientEmail,
  onActivate,
  activating,
}: {
  patientEmail: string;
  onActivate: (treatmentPlanId: string) => void;
  activating: boolean;
}) {
  const [treatmentPlanId, setTreatmentPlanId] = useState("");
  const [embedReady, setEmbedReady] = useState(false);
  const [embedError, setEmbedError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function initEmbed() {
      try {
        const res = await fetch("/api/fullscript/session-grant", {
          method: "POST",
        });
        const data = await res.json();

        if (!res.ok || data.error) {
          if (mounted) setEmbedError(data.error || "Failed to get session grant");
          return;
        }

        if (mounted) setEmbedReady(true);
      } catch (err) {
        if (mounted) setEmbedError("Failed to initialize Fullscript connection");
      }
    }

    initEmbed();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="mt-4 bg-white rounded-xl border border-border/40 p-6">
      <div className="mb-4">
        <h3 className="font-semibold text-foreground text-sm">
          Fullscript Integration
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Create a treatment plan in Fullscript for{" "}
          <span className="font-medium">{patientEmail}</span>, then paste the
          Treatment Plan ID below to process the order.
        </p>
      </div>

      {embedError ? (
        <div className="bg-red-50 border border-red-200/60 rounded-lg p-4 mb-4">
          <p className="text-sm text-red-700">{embedError}</p>
          <p className="text-xs text-red-600 mt-1">
            Make sure the Fullscript OAuth flow has been completed.
          </p>
        </div>
      ) : !embedReady ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground py-4">
          <Loader2 className="h-4 w-4 animate-spin" />
          Connecting to Fullscript...
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-teal/5 border border-teal/20 rounded-lg p-4">
            <p className="text-sm text-foreground font-medium mb-2">
              Steps to process this order:
            </p>
            <ol className="text-xs text-muted-foreground space-y-1.5 list-decimal pl-4">
              <li>
                Open your{" "}
                <a
                  href={`https://${process.env.NEXT_PUBLIC_FULLSCRIPT_ENV || "us-snd"}.fullscript.com/treatment-plans`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal underline"
                >
                  Fullscript Dashboard
                </a>
              </li>
              <li>Find the patient ({patientEmail}) or create them</li>
              <li>Create a treatment plan with the requested lab tests</li>
              <li>Activate the treatment plan</li>
              <li>Copy the Treatment Plan ID and paste it below</li>
            </ol>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-1.5">
              Treatment Plan ID
            </label>
            <input
              type="text"
              placeholder="e.g., abc123-def456-..."
              value={treatmentPlanId}
              onChange={(e) => setTreatmentPlanId(e.target.value)}
              className="w-full px-3 py-2.5 border border-border/40 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/50"
            />
          </div>

          <Button
            onClick={() => onActivate(treatmentPlanId)}
            disabled={!treatmentPlanId.trim() || activating}
            className="w-full bg-teal text-white hover:bg-teal/90 rounded-xl h-11 font-semibold shadow-sm disabled:opacity-50"
          >
            {activating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Activate &amp; Mark as Ordered
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
