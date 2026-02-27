"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ClipboardList,
  ArrowRight,
  Search,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type Order = {
  id: string;
  status: string;
  total_amount: number;
  created_at: string;
  profiles: { first_name: string; last_name: string; email: string } | null;
  order_items: { test_name: string; price: number }[];
};

const STATUS_CONFIG: Record<
  string,
  { label: string; className: string }
> = {
  pending: { label: "Pending Payment", className: "bg-slate-100 text-slate-700" },
  paid: { label: "Paid — Needs Action", className: "bg-amber-100 text-amber-700" },
  awaiting_plan: { label: "Awaiting Plan", className: "bg-amber-100 text-amber-700" },
  plan_activated: { label: "Plan Activated", className: "bg-blue-100 text-blue-700" },
  lab_ordered: { label: "Lab Ordered", className: "bg-blue-100 text-blue-700" },
  kit_shipped: { label: "Kit Shipped", className: "bg-indigo-100 text-indigo-700" },
  kit_delivered: { label: "Kit Delivered", className: "bg-indigo-100 text-indigo-700" },
  specimen_received: { label: "Specimen Received", className: "bg-purple-100 text-purple-700" },
  processing: { label: "Processing", className: "bg-blue-100 text-blue-700" },
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

export default function ProviderOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  }

  const filtered = orders.filter((order) => {
    if (filter === "action") {
      return order.status === "paid" || order.status === "awaiting_plan";
    }
    if (filter === "in_progress") {
      return [
        "plan_activated",
        "lab_ordered",
        "kit_shipped",
        "kit_delivered",
        "specimen_received",
        "processing",
      ].includes(order.status);
    }
    if (filter === "completed") {
      return order.status === "results_ready" || order.status === "completed";
    }
    return true;
  }).filter((order) => {
    if (!search) return true;
    const q = search.toLowerCase();
    const name = order.profiles
      ? `${order.profiles.first_name} ${order.profiles.last_name}`.toLowerCase()
      : "";
    const email = order.profiles?.email?.toLowerCase() || "";
    return name.includes(q) || email.includes(q) || order.id.includes(q);
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-teal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground mt-1">
          {orders.length} total order{orders.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex gap-1 bg-white border border-border/40 rounded-lg p-1 shadow-sm">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                filter === tab.value
                  ? "bg-teal text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by patient name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 rounded-lg border-border/40"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border/40 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="h-7 w-7 text-muted-foreground/40" />
            </div>
            <p className="text-foreground font-medium">No orders found</p>
            <p className="text-sm text-muted-foreground mt-1">
              {search
                ? "Try adjusting your search query."
                : "Orders will appear here when patients place them."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border/30">
            {filtered.map((order) => {
              const statusCfg = STATUS_CONFIG[order.status] || {
                label: order.status,
                className: "bg-slate-100 text-slate-700",
              };
              return (
                <Link
                  key={order.id}
                  href={`/provider/orders/${order.id}`}
                  className="flex items-center justify-between p-5 hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-teal/10 rounded-full flex items-center justify-center shrink-0">
                      <ClipboardList className="h-5 w-5 text-teal" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {order.profiles
                          ? `${order.profiles.first_name} ${order.profiles.last_name}`
                          : "Unknown Patient"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {order.order_items
                          .map((i) => i.test_name)
                          .join(", ")}{" "}
                        &middot; ${Number(order.total_amount).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground hidden sm:block">
                      {new Date(order.created_at).toLocaleDateString()}
                    </span>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${statusCfg.className}`}
                    >
                      {statusCfg.label}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
