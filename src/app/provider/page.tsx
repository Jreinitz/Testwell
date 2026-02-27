"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ClipboardList,
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

type Order = {
  id: string;
  status: string;
  total_amount: number;
  created_at: string;
  profiles: { first_name: string; last_name: string; email: string } | null;
  order_items: { test_name: string; price: number }[];
};

type Stats = {
  pending: number;
  paid: number;
  labOrdered: number;
  completed: number;
  total: number;
};

export default function ProviderDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<Stats>({
    pending: 0,
    paid: 0,
    labOrdered: 0,
    completed: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      const allOrders = data.orders || [];
      setOrders(allOrders);

      setStats({
        pending: allOrders.filter(
          (o: Order) => o.status === "pending"
        ).length,
        paid: allOrders.filter(
          (o: Order) => o.status === "paid" || o.status === "awaiting_plan"
        ).length,
        labOrdered: allOrders.filter(
          (o: Order) =>
            o.status === "lab_ordered" ||
            o.status === "processing" ||
            o.status === "kit_shipped" ||
            o.status === "kit_delivered" ||
            o.status === "specimen_received"
        ).length,
        completed: allOrders.filter(
          (o: Order) =>
            o.status === "results_ready" || o.status === "completed"
        ).length,
        total: allOrders.length,
      });
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  }

  const actionableOrders = orders.filter(
    (o) => o.status === "paid" || o.status === "awaiting_plan"
  );

  const statCards = [
    {
      label: "Action Required",
      value: stats.paid,
      icon: AlertCircle,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200/60",
    },
    {
      label: "In Progress",
      value: stats.labOrdered,
      icon: Clock,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200/60",
    },
    {
      label: "Completed",
      value: stats.completed,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200/60",
    },
    {
      label: "Total Orders",
      value: stats.total,
      icon: TrendingUp,
      color: "text-teal",
      bg: "bg-teal/5",
      border: "border-teal/20",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-teal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Manage patient lab test orders
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <div
            key={card.label}
            className={`bg-white rounded-xl border ${card.border} p-5 shadow-sm`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center`}>
                <card.icon className={`h-5 w-5 ${card.color}`} />
              </div>
              <span className={`text-2xl font-bold ${card.color}`}>
                {card.value}
              </span>
            </div>
            <p className="text-sm text-muted-foreground font-medium">
              {card.label}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-border/40 shadow-sm">
        <div className="p-5 border-b border-border/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
              <AlertCircle className="h-4 w-4 text-amber-600" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">
                Orders Needing Action
              </h2>
              <p className="text-xs text-muted-foreground">
                These orders have been paid and need lab requisitions
              </p>
            </div>
          </div>
          <Link
            href="/provider/orders"
            className="text-sm text-teal hover:text-teal/80 font-medium flex items-center gap-1"
          >
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {actionableOrders.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-7 w-7 text-emerald-500" />
            </div>
            <p className="text-foreground font-medium">All caught up!</p>
            <p className="text-sm text-muted-foreground mt-1">
              No orders currently need your attention.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border/30">
            {actionableOrders.slice(0, 5).map((order) => (
              <Link
                key={order.id}
                href={`/provider/orders/${order.id}`}
                className="flex items-center justify-between p-5 hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-teal/10 rounded-full flex items-center justify-center">
                    <ClipboardList className="h-5 w-5 text-teal" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {order.profiles
                        ? `${order.profiles.first_name} ${order.profiles.last_name}`
                        : "Unknown Patient"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {order.order_items.length} test
                      {order.order_items.length !== 1 ? "s" : ""} &middot; $
                      {Number(order.total_amount).toFixed(2)} &middot;{" "}
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-700">
                    Needs Action
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
