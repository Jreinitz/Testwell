import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

type ServiceStatus = "healthy" | "degraded" | "down";

interface ServiceCheck {
  service: string;
  status: ServiceStatus;
  latency_ms: number;
  message: string;
  checked_at: string;
}

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not configured");
  return new Stripe(key);
}

async function timed<T>(fn: () => Promise<T>): Promise<{ result: T; latency_ms: number }> {
  const start = performance.now();
  const result = await fn();
  return { result, latency_ms: Math.round(performance.now() - start) };
}

async function checkSupabaseDb(): Promise<ServiceCheck> {
  const checked_at = new Date().toISOString();
  try {
    const supabase = getSupabase();
    const { latency_ms } = await timed(async () => {
      const { error } = await supabase.from("fullscript_tokens").select("practitioner_id").limit(0);
      if (error) throw error;
    });

    return {
      service: "supabase_db",
      status: "healthy",
      latency_ms,
      message: "Connected",
      checked_at,
    };
  } catch (err) {
    return {
      service: "supabase_db",
      status: "down",
      latency_ms: 0,
      message: err instanceof Error ? err.message : "Unknown error",
      checked_at,
    };
  }
}

async function checkSupabaseAuth(): Promise<ServiceCheck> {
  const checked_at = new Date().toISOString();
  try {
    const supabase = getSupabase();
    const { result, latency_ms } = await timed(() =>
      supabase.auth.admin.listUsers({ perPage: 1 })
    );

    if (result.error) {
      return {
        service: "supabase_auth",
        status: "degraded",
        latency_ms,
        message: result.error.message,
        checked_at,
      };
    }

    return {
      service: "supabase_auth",
      status: "healthy",
      latency_ms,
      message: `Connected — ${(result.data && "total" in result.data ? result.data.total : result.data?.users?.length) ?? 0} total user(s)`,
      checked_at,
    };
  } catch (err) {
    return {
      service: "supabase_auth",
      status: "down",
      latency_ms: 0,
      message: err instanceof Error ? err.message : "Unknown error",
      checked_at,
    };
  }
}

async function checkStripe(): Promise<ServiceCheck> {
  const checked_at = new Date().toISOString();
  try {
    const stripe = getStripe();
    const { result, latency_ms } = await timed(() => stripe.balance.retrieve());

    return {
      service: "stripe",
      status: "healthy",
      latency_ms,
      message: `Connected — balance available in ${result.available.map((b) => b.currency.toUpperCase()).join(", ")}`,
      checked_at,
    };
  } catch (err) {
    return {
      service: "stripe",
      status: "down",
      latency_ms: 0,
      message: err instanceof Error ? err.message : "Unknown error",
      checked_at,
    };
  }
}

async function checkFullscript(): Promise<ServiceCheck> {
  const checked_at = new Date().toISOString();
  const apiUrl = process.env.FULLSCRIPT_API_URL;
  const practitionerId = process.env.FULLSCRIPT_PRACTITIONER_ID;

  if (!apiUrl || !practitionerId) {
    return {
      service: "fullscript",
      status: "down",
      latency_ms: 0,
      message: "Missing FULLSCRIPT_API_URL or FULLSCRIPT_PRACTITIONER_ID",
      checked_at,
    };
  }

  try {
    const supabase = getSupabase();

    const { data: tokenRow, error: tokenError } = await supabase
      .from("fullscript_tokens")
      .select("access_token, expires_at")
      .eq("practitioner_id", practitionerId)
      .single();

    if (tokenError || !tokenRow) {
      return {
        service: "fullscript",
        status: "down",
        latency_ms: 0,
        message: "No tokens found — complete OAuth flow first",
        checked_at,
      };
    }

    const tokenExpired = new Date(tokenRow.expires_at) < new Date();
    if (tokenExpired) {
      return {
        service: "fullscript",
        status: "degraded",
        latency_ms: 0,
        message: "Access token expired — needs refresh",
        checked_at,
      };
    }

    const { latency_ms } = await timed(async () => {
      const res = await fetch(`${apiUrl}/api/clinic/patients?page[limit]=1`, {
        headers: {
          Authorization: `Bearer ${tokenRow.access_token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
      return res.json();
    });

    return {
      service: "fullscript",
      status: "healthy",
      latency_ms,
      message: "Connected",
      checked_at,
    };
  } catch (err) {
    return {
      service: "fullscript",
      status: "down",
      latency_ms: 0,
      message: err instanceof Error ? err.message : "Unknown error",
      checked_at,
    };
  }
}

function deriveOverallStatus(services: ServiceCheck[]): ServiceStatus {
  if (services.some((s) => s.status === "down")) return "down";
  if (services.some((s) => s.status === "degraded")) return "degraded";
  return "healthy";
}

export async function GET() {
  const results = await Promise.allSettled([
    checkSupabaseDb(),
    checkSupabaseAuth(),
    checkStripe(),
    checkFullscript(),
  ]);

  const services: ServiceCheck[] = results.map((r, i) => {
    if (r.status === "fulfilled") return r.value;
    const fallbackNames = ["supabase_db", "supabase_auth", "stripe", "fullscript"];
    return {
      service: fallbackNames[i],
      status: "down" as const,
      latency_ms: 0,
      message: r.reason instanceof Error ? r.reason.message : "Check failed unexpectedly",
      checked_at: new Date().toISOString(),
    };
  });

  const fullscriptUrl = process.env.FULLSCRIPT_API_URL || "";
  let fullscriptEnv = "unknown";
  if (fullscriptUrl.includes("us-snd")) fullscriptEnv = "us-snd";
  else if (fullscriptUrl.includes("us.fullscript")) fullscriptEnv = "us-prod";
  else if (fullscriptUrl.includes("ca-snd")) fullscriptEnv = "ca-snd";
  else if (fullscriptUrl.includes("ca.fullscript")) fullscriptEnv = "ca-prod";

  const body = {
    status: deriveOverallStatus(services),
    timestamp: new Date().toISOString(),
    services,
    environment: {
      node_env: process.env.NODE_ENV || "development",
      base_url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      fullscript_env: fullscriptEnv,
    },
  };

  const httpStatus = body.status === "healthy" ? 200 : body.status === "degraded" ? 207 : 503;

  return NextResponse.json(body, { status: httpStatus });
}
