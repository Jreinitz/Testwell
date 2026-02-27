"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  DollarSign,
  Users,
  ClipboardList,
  TrendingUp,
  Activity,
  ArrowRight,
  AlertCircle,
  Clock,
  CheckCircle2,
  BarChart3,
  FlaskConical,
} from "lucide-react";

type Analytics = {
  users: {
    total: number;
    by_role: Record<string, number>;
    new_this_week: number;
    new_this_month: number;
  };
  orders: {
    total: number;
    by_status: Record<string, number>;
    revenue_total: number;
    revenue_this_week: number;
    revenue_this_month: number;
    avg_order_value: number;
  };
  tests: {
    total_ordered: number;
    most_popular: { test_name: string; count: number }[];
  };
  conversion: {
    needs_action: number;
    in_progress: number;
    completion_rate: number;
  };
};

type HealthData = {
  status: "healthy" | "degraded" | "down";
  services: {
    service: string;
    status: "healthy" | "degraded" | "down";
    latency_ms: number;
    message: string;
  }[];
};

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [health, setHealth] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/analytics").then((r) => r.json()),
      fetch("/api/admin/health").then((r) => r.json()),
    ]).then(([a, h]) => {
      setAnalytics(a);
      setHealth(h);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-teal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const healthColor =
    health?.status === "healthy"
      ? "text-emerald-600"
      : health?.status === "degraded"
        ? "text-amber-600"
        : "text-red-600";

  const healthBg =
    health?.status === "healthy"
      ? "bg-emerald-50 border-emerald-200/60"
      : health?.status === "degraded"
        ? "bg-amber-50 border-amber-200/60"
        : "bg-red-50 border-red-200/60";

  const revenueCards = [
    {
      label: "Total Revenue",
      value: `$${(analytics?.orders.revenue_total ?? 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200/60",
    },
    {
      label: "This Month",
      value: `$${(analytics?.orders.revenue_this_month ?? 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      icon: TrendingUp,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200/60",
    },
    {
      label: "Total Orders",
      value: analytics?.orders.total ?? 0,
      icon: ClipboardList,
      color: "text-teal",
      bg: "bg-teal/5",
      border: "border-teal/20",
    },
    {
      label: "Total Users",
      value: analytics?.users.total ?? 0,
      icon: Users,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      border: "border-indigo-200/60",
    },
  ];

  const operationalCards = [
    {
      label: "Needs Action",
      value: analytics?.conversion.needs_action ?? 0,
      icon: AlertCircle,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200/60",
    },
    {
      label: "In Progress",
      value: analytics?.conversion.in_progress ?? 0,
      icon: Clock,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200/60",
    },
    {
      label: "Completion Rate",
      value: `${analytics?.conversion.completion_rate ?? 0}%`,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200/60",
    },
    {
      label: "Avg Order Value",
      value: `$${(analytics?.orders.avg_order_value ?? 0).toFixed(2)}`,
      icon: BarChart3,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-200/60",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Platform overview and operational metrics
          </p>
        </div>
        <Link
          href="/admin/health"
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-colors ${healthBg}`}
        >
          <Activity className={`h-4 w-4 ${healthColor}`} />
          <span className={healthColor}>
            System {health?.status === "healthy" ? "Healthy" : health?.status === "degraded" ? "Degraded" : "Issues Detected"}
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {revenueCards.map((card) => (
          <div
            key={card.label}
            className={`${card.bg} border ${card.border} rounded-xl p-5`}
          >
            <div className="flex items-center justify-between mb-3">
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </div>
            <p className="text-2xl font-bold text-foreground">{card.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {operationalCards.map((card) => (
          <div
            key={card.label}
            className={`${card.bg} border ${card.border} rounded-xl p-5`}
          >
            <div className="flex items-center justify-between mb-3">
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </div>
            <p className="text-2xl font-bold text-foreground">{card.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Breakdown */}
        <div className="bg-white rounded-xl border border-border/40 shadow-sm">
          <div className="p-5 border-b border-border/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <h2 className="font-semibold text-foreground text-sm">Users</h2>
            </div>
            <Link
              href="/admin/users"
              className="text-xs text-teal hover:text-teal/80 font-medium flex items-center gap-1"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="p-5 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Patients</span>
              <span className="font-medium">{analytics?.users.by_role?.patient ?? 0}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Providers</span>
              <span className="font-medium">{analytics?.users.by_role?.provider ?? 0}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Admins</span>
              <span className="font-medium">{analytics?.users.by_role?.admin ?? 0}</span>
            </div>
            <div className="border-t border-border/30 pt-3 flex justify-between text-sm">
              <span className="text-muted-foreground">New this week</span>
              <span className="font-medium text-teal">+{analytics?.users.new_this_week ?? 0}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">New this month</span>
              <span className="font-medium text-teal">+{analytics?.users.new_this_month ?? 0}</span>
            </div>
          </div>
        </div>

        {/* Popular Tests */}
        <div className="bg-white rounded-xl border border-border/40 shadow-sm">
          <div className="p-5 border-b border-border/30 flex items-center gap-2">
            <FlaskConical className="h-4 w-4 text-muted-foreground" />
            <h2 className="font-semibold text-foreground text-sm">Most Popular Tests</h2>
          </div>
          <div className="p-5 space-y-3">
            {(analytics?.tests.most_popular ?? []).slice(0, 5).map((test, i) => (
              <div key={test.test_name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-teal/10 text-teal text-xs flex items-center justify-center font-bold">
                    {i + 1}
                  </span>
                  <span className="text-foreground truncate max-w-[200px]">{test.test_name}</span>
                </div>
                <span className="text-muted-foreground font-medium">{test.count} ordered</span>
              </div>
            ))}
            {(analytics?.tests.most_popular ?? []).length === 0 && (
              <p className="text-sm text-muted-foreground">No tests ordered yet</p>
            )}
            <div className="border-t border-border/30 pt-3 flex justify-between text-sm">
              <span className="text-muted-foreground">Total tests ordered</span>
              <span className="font-bold text-foreground">{analytics?.tests.total_ordered ?? 0}</span>
            </div>
          </div>
        </div>

        {/* Order Status Breakdown */}
        <div className="bg-white rounded-xl border border-border/40 shadow-sm lg:col-span-2">
          <div className="p-5 border-b border-border/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
              <h2 className="font-semibold text-foreground text-sm">Orders by Status</h2>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs text-teal hover:text-teal/80 font-medium flex items-center gap-1"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Object.entries(analytics?.orders.by_status ?? {}).map(([status, count]) => {
                const statusLabels: Record<string, { label: string; color: string }> = {
                  pending: { label: "Pending", color: "text-slate-600" },
                  paid: { label: "Paid", color: "text-amber-600" },
                  lab_ordered: { label: "Lab Ordered", color: "text-blue-600" },
                  kit_shipped: { label: "Kit Shipped", color: "text-indigo-600" },
                  specimen_received: { label: "Specimen Rcvd", color: "text-purple-600" },
                  results_ready: { label: "Results Ready", color: "text-emerald-600" },
                  completed: { label: "Completed", color: "text-emerald-700" },
                  cancelled: { label: "Cancelled", color: "text-red-600" },
                };
                const cfg = statusLabels[status] || { label: status, color: "text-slate-500" };
                return (
                  <div key={status} className="text-center">
                    <p className={`text-2xl font-bold ${cfg.color}`}>{count}</p>
                    <p className="text-xs text-muted-foreground mt-1">{cfg.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
