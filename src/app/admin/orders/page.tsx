"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ClipboardList,
  ArrowRight,
  Search,
} from "lucide-react";

type Order = {
  id: string;
  user_id: string;
  status: string;
  total_amount: string;
  created_at: string;
  fullscript_treatment_plan_id: string | null;
  order_items: { test_name: string; price: string }[];
  profiles: { first_name: string; last_name: string; email?: string } | null;
};

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  pending: { label: "Pending Payment", className: "bg-slate-100 text-slate-700" },
  paid: { label: "Paid — Needs Action", className: "bg-amber-100 text-amber-700" },
  awaiting_plan: { label: "Awaiting Plan", className: "bg-amber-100 text-amber-700" },
  plan_activated: { label: "Plan Activated", className: "bg-blue-100 text-blue-700" },
  lab_ordered: { label: "Lab Ordered", className: "bg-blue-100 text-blue-700" },
  kit_shipped: { label: "Kit Shipped", className: "bg-indigo-100 text-indigo-700" },
  kit_delivered: { label: "Kit Delivered", className: "bg-indigo-100 text-indigo-700" },
  specimen_received: { label: "Specimen Received", className: "bg-purple-100 text-purple-700" },
  results_ready: { label: "Results Ready", className: "bg-emerald-100 text-emerald-700" },
  completed: { label: "Completed", className: "bg-emerald-100 text-emerald-700" },
  cancelled: { label: "Cancelled", className: "bg-red-100 text-red-700" },
};

const FILTER_TABS = [
  { value: "all", label: "All" },
  { value: "action", label: "Needs Action" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then((data) => {
        setOrders(data.orders || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = orders.filter((o) => {
    if (filter === "action" && o.status !== "paid") return false;
    if (
      filter === "in_progress" &&
      !["lab_ordered", "kit_shipped", "kit_delivered", "specimen_received"].includes(o.status)
    )
      return false;
    if (
      filter === "completed" &&
      !["results_ready", "completed"].includes(o.status)
    )
      return false;

    if (search) {
      const q = search.toLowerCase();
      const name = `${o.profiles?.first_name || ""} ${o.profiles?.last_name || ""}`.toLowerCase();
      const email = (o.profiles?.email || "").toLowerCase();
      return name.includes(q) || email.includes(q) || o.id.includes(q);
    }
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-teal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">All Orders</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {orders.length} total orders across all patients
        </p>
      </div>

      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div className="flex gap-2">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                filter === tab.value
                  ? "bg-teal text-white shadow-sm"
                  : "bg-white text-muted-foreground hover:bg-slate-50 border border-border/40"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by patient or order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 border border-border/40 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/50"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border/40 shadow-sm overflow-hidden">
        <div className="divide-y divide-border/30">
          {filtered.length === 0 ? (
            <div className="p-10 text-center">
              <ClipboardList className="h-10 w-10 mx-auto text-muted-foreground/50 mb-3" />
              <p className="text-sm text-muted-foreground">No orders found</p>
            </div>
          ) : (
            filtered.map((order) => {
              const statusCfg = STATUS_CONFIG[order.status] || {
                label: order.status,
                className: "bg-slate-100 text-slate-600",
              };
              const testNames = order.order_items
                .map((i) => i.test_name)
                .join(", ");

              return (
                <Link
                  key={order.id}
                  href={`/provider/orders/${order.id}`}
                  className="flex items-center justify-between p-5 hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center">
                      <ClipboardList className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-foreground text-sm">
                          {order.profiles?.first_name}{" "}
                          {order.profiles?.last_name}
                        </p>
                        <span className="text-xs text-muted-foreground font-mono">
                          #{order.id.slice(0, 8)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 max-w-md truncate">
                        {testNames} · ${parseFloat(order.total_amount).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-xs text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap ${statusCfg.className}`}
                    >
                      {statusCfg.label}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
