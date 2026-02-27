"use client";

import { useState, useEffect } from "react";
import {
  Settings,
  Link as LinkIcon,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ProviderSettingsPage() {
  const [fsConnected, setFsConnected] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkFullscriptConnection();
  }, []);

  async function checkFullscriptConnection() {
    try {
      const res = await fetch("/api/fullscript/session-grant", {
        method: "POST",
      });
      setFsConnected(res.ok);
    } catch {
      setFsConnected(false);
    } finally {
      setLoading(false);
    }
  }

  const fullscriptAuthUrl = `${
    process.env.NEXT_PUBLIC_FULLSCRIPT_API_URL ||
    "https://api-us-snd.fullscript.io"
  }/api/oauth/authorize?client_id=${
    process.env.NEXT_PUBLIC_FULLSCRIPT_CLIENT_ID || ""
  }&redirect_uri=${encodeURIComponent(
    (process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000") +
      "/api/auth/fullscript/callback"
  )}&response_type=code&scope=read%20write`;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure your provider account and integrations
        </p>
      </div>

      <div className="max-w-2xl space-y-6">
        <div className="bg-white rounded-xl border border-border/40 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-teal/10 rounded-lg flex items-center justify-center">
              <LinkIcon className="h-5 w-5 text-teal" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">
                Fullscript Integration
              </h2>
              <p className="text-sm text-muted-foreground">
                Connect your Fullscript account to process lab orders
              </p>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-4 h-4 border-2 border-teal border-t-transparent rounded-full animate-spin" />
              Checking connection...
            </div>
          ) : fsConnected ? (
            <div className="bg-emerald-50 border border-emerald-200/60 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="text-sm font-medium text-emerald-800">
                    Connected
                  </p>
                  <p className="text-xs text-emerald-600">
                    Your Fullscript account is linked and ready to use.
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  window.open(fullscriptAuthUrl, "_blank");
                }}
                className="rounded-lg"
              >
                Reconnect
              </Button>
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-200/60 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="h-5 w-5 text-amber-600" />
                <p className="text-sm font-medium text-amber-800">
                  Not Connected
                </p>
              </div>
              <p className="text-xs text-amber-700 mb-4">
                Connect your Fullscript account to start processing lab orders.
              </p>
              <Button
                onClick={() => {
                  window.open(fullscriptAuthUrl, "_blank");
                  toast.info("Complete the authorization in the new tab.");
                }}
                className="bg-teal text-white hover:bg-teal/90 rounded-xl shadow-sm"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Connect Fullscript
              </Button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-border/40 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-teal/10 rounded-lg flex items-center justify-center">
              <Settings className="h-5 w-5 text-teal" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">
                Webhook Configuration
              </h2>
              <p className="text-sm text-muted-foreground">
                Configure Fullscript webhooks for real-time order updates
              </p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-xs font-medium text-foreground mb-2">
              Webhook URL
            </p>
            <code className="text-xs font-mono text-muted-foreground bg-white px-3 py-2 rounded border border-border/40 block break-all">
              {process.env.NEXT_PUBLIC_BASE_URL || "https://your-domain.com"}
              /api/webhooks/fullscript
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Add this URL in your Fullscript developer settings under webhooks.
              Subscribe to <code className="font-mono">lab_order.updated</code>{" "}
              and <code className="font-mono">order.placed</code> events.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
