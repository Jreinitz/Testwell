"use client";

import { useEffect, useState } from "react";
import {
  Settings,
  Globe,
  Database,
  CreditCard,
  Shield,
  Key,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Copy,
} from "lucide-react";
import { toast } from "sonner";

type EnvCheck = {
  name: string;
  set: boolean;
  masked?: string;
};

type ConfigData = {
  env_vars: EnvCheck[];
  urls: {
    supabase: string;
    fullscript_api: string;
    stripe_dashboard: string;
    webhook_url: string;
    oauth_callback: string;
  };
};

export default function AdminSettingsPage() {
  const [config, setConfig] = useState<ConfigData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/config")
      .then((r) => r.json())
      .then((data) => {
        setConfig(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-teal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const envGroups = [
    {
      title: "Supabase",
      icon: Database,
      vars: (config?.env_vars || []).filter((v) => v.name.includes("SUPABASE")),
    },
    {
      title: "Stripe",
      icon: CreditCard,
      vars: (config?.env_vars || []).filter((v) => v.name.includes("STRIPE")),
    },
    {
      title: "Fullscript",
      icon: Shield,
      vars: (config?.env_vars || []).filter((v) => v.name.includes("FULLSCRIPT")),
    },
    {
      title: "Application",
      icon: Globe,
      vars: (config?.env_vars || []).filter(
        (v) =>
          !v.name.includes("SUPABASE") &&
          !v.name.includes("STRIPE") &&
          !v.name.includes("FULLSCRIPT")
      ),
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Configuration overview and integration URLs
        </p>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* Environment Variables */}
        {envGroups.map((group) => {
          if (group.vars.length === 0) return null;
          const Icon = group.icon;
          const allSet = group.vars.every((v) => v.set);

          return (
            <div
              key={group.title}
              className="bg-white rounded-xl border border-border/40 shadow-sm"
            >
              <div className="p-5 border-b border-border/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <h2 className="font-semibold text-foreground text-sm">
                    {group.title}
                  </h2>
                </div>
                {allSet ? (
                  <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    All configured
                  </span>
                ) : (
                  <span className="text-xs text-red-600 font-medium flex items-center gap-1">
                    <XCircle className="h-3.5 w-3.5" />
                    Missing variables
                  </span>
                )}
              </div>
              <div className="divide-y divide-border/20">
                {group.vars.map((v) => (
                  <div
                    key={v.name}
                    className="flex items-center justify-between px-5 py-3"
                  >
                    <div className="flex items-center gap-2">
                      <Key className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm font-mono text-foreground">
                        {v.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {v.set ? (
                        <>
                          <span className="text-xs font-mono text-muted-foreground">
                            {v.masked}
                          </span>
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        </>
                      ) : (
                        <>
                          <span className="text-xs text-red-500">Not set</span>
                          <XCircle className="h-4 w-4 text-red-400" />
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Important URLs */}
        <div className="bg-white rounded-xl border border-border/40 shadow-sm">
          <div className="p-5 border-b border-border/30 flex items-center gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <h2 className="font-semibold text-foreground text-sm">
              Integration URLs
            </h2>
          </div>
          <div className="divide-y divide-border/20">
            {[
              {
                label: "Fullscript Webhook URL",
                value: config?.urls.webhook_url || "",
                description: "Register this URL in your Fullscript webhook settings",
              },
              {
                label: "Fullscript OAuth Callback",
                value: config?.urls.oauth_callback || "",
                description: "OAuth redirect URI registered in Fullscript",
              },
              {
                label: "Stripe Dashboard",
                value: config?.urls.stripe_dashboard || "",
                description: "Manage payments, subscriptions, and webhooks",
                external: true,
              },
              {
                label: "Supabase Dashboard",
                value: config?.urls.supabase || "",
                description: "Database, auth, and storage management",
                external: true,
              },
            ].map((url) => (
              <div key={url.label} className="px-5 py-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-foreground">
                    {url.label}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard(url.value)}
                      className="p-1 rounded hover:bg-slate-100 transition-colors"
                      title="Copy URL"
                    >
                      <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                    {url.external && (
                      <a
                        href={url.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded hover:bg-slate-100 transition-colors"
                      >
                        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-1.5">
                  {url.description}
                </p>
                <p className="text-xs font-mono bg-slate-50 px-3 py-2 rounded-lg break-all">
                  {url.value || "Not configured"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
