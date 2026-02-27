"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Activity,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Database,
  CreditCard,
  Shield,
  Users,
  Clock,
  Globe,
  Server,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type ServiceStatus = "healthy" | "degraded" | "down";

type ServiceCheck = {
  service: string;
  status: ServiceStatus;
  latency_ms: number;
  message: string;
  checked_at: string;
};

type HealthData = {
  status: ServiceStatus;
  timestamp: string;
  services: ServiceCheck[];
  environment: {
    node_env: string;
    base_url: string;
    fullscript_env: string;
  };
};

const SERVICE_META: Record<
  string,
  { label: string; icon: typeof Database; description: string }
> = {
  supabase_db: {
    label: "Supabase Database",
    icon: Database,
    description: "PostgreSQL database for all application data",
  },
  supabase_auth: {
    label: "Supabase Auth",
    icon: Users,
    description: "User authentication and session management",
  },
  stripe: {
    label: "Stripe Payments",
    icon: CreditCard,
    description: "Payment processing and checkout sessions",
  },
  fullscript: {
    label: "Fullscript API",
    icon: Shield,
    description: "Lab ordering, patient management, and treatment plans",
  },
};

function StatusIcon({ status }: { status: ServiceStatus }) {
  if (status === "healthy")
    return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
  if (status === "degraded")
    return <AlertTriangle className="h-5 w-5 text-amber-500" />;
  return <XCircle className="h-5 w-5 text-red-500" />;
}

function StatusBadge({ status }: { status: ServiceStatus }) {
  const config = {
    healthy: { label: "Healthy", className: "bg-emerald-100 text-emerald-700" },
    degraded: { label: "Degraded", className: "bg-amber-100 text-amber-700" },
    down: { label: "Down", className: "bg-red-100 text-red-700" },
  };
  const cfg = config[status];
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.className}`}
    >
      {cfg.label}
    </span>
  );
}

export default function HealthPage() {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const fetchHealth = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const res = await fetch("/api/admin/health");
      const data = await res.json();
      setHealth(data);
    } catch {
      setHealth(null);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchHealth();
  }, [fetchHealth]);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => fetchHealth(), 30000);
    return () => clearInterval(interval);
  }, [autoRefresh, fetchHealth]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-teal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const overallColor =
    health?.status === "healthy"
      ? "text-emerald-600"
      : health?.status === "degraded"
        ? "text-amber-600"
        : "text-red-600";

  const overallBg =
    health?.status === "healthy"
      ? "bg-emerald-50 border-emerald-200/60"
      : health?.status === "degraded"
        ? "bg-amber-50 border-amber-200/60"
        : "bg-red-50 border-red-200/60";

  const healthyCount = health?.services.filter((s) => s.status === "healthy").length ?? 0;
  const totalCount = health?.services.length ?? 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">System Health</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor all service connections and system status
          </p>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded border-border"
            />
            Auto-refresh (30s)
          </label>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchHealth(true)}
            disabled={refreshing}
            className="rounded-lg"
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
      </div>

      {/* Overall Status Banner */}
      <div className={`rounded-xl border p-6 mb-8 ${overallBg}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`h-12 w-12 rounded-full flex items-center justify-center ${
                health?.status === "healthy"
                  ? "bg-emerald-100"
                  : health?.status === "degraded"
                    ? "bg-amber-100"
                    : "bg-red-100"
              }`}
            >
              <Activity className={`h-6 w-6 ${overallColor}`} />
            </div>
            <div>
              <h2 className={`text-xl font-bold ${overallColor}`}>
                {health?.status === "healthy"
                  ? "All Systems Operational"
                  : health?.status === "degraded"
                    ? "Partial Service Degradation"
                    : "Service Outage Detected"}
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                {healthyCount} of {totalCount} services healthy
              </p>
            </div>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              Last checked:{" "}
              {health?.timestamp
                ? new Date(health.timestamp).toLocaleTimeString()
                : "—"}
            </div>
          </div>
        </div>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {(health?.services ?? []).map((svc) => {
          const meta = SERVICE_META[svc.service] || {
            label: svc.service,
            icon: Server,
            description: "",
          };
          const Icon = meta.icon;

          return (
            <div
              key={svc.service}
              className="bg-white rounded-xl border border-border/40 shadow-sm p-5"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-slate-50 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">
                      {meta.label}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {meta.description}
                    </p>
                  </div>
                </div>
                <StatusBadge status={svc.status} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <StatusIcon status={svc.status} />
                    Status
                  </span>
                  <span className="font-medium capitalize">{svc.status}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Latency</span>
                  <span
                    className={`font-mono text-xs px-2 py-0.5 rounded ${
                      svc.latency_ms < 200
                        ? "bg-emerald-50 text-emerald-700"
                        : svc.latency_ms < 500
                          ? "bg-amber-50 text-amber-700"
                          : "bg-red-50 text-red-700"
                    }`}
                  >
                    {svc.latency_ms}ms
                  </span>
                </div>
                <div className="flex items-start justify-between text-sm">
                  <span className="text-muted-foreground">Message</span>
                  <span className="text-right text-xs text-foreground max-w-[200px] truncate">
                    {svc.message}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Environment Info */}
      <div className="bg-white rounded-xl border border-border/40 shadow-sm">
        <div className="p-5 border-b border-border/30 flex items-center gap-2">
          <Globe className="h-4 w-4 text-muted-foreground" />
          <h2 className="font-semibold text-foreground text-sm">Environment</h2>
        </div>
        <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Node Environment</p>
            <p className="text-sm font-mono font-medium">
              {health?.environment.node_env ?? "—"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Supabase URL</p>
            <p className="text-sm font-mono font-medium truncate">
              {health?.environment.base_url ?? "—"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Fullscript Env</p>
            <p className="text-sm font-mono font-medium">
              {health?.environment.fullscript_env ?? "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
