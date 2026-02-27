import { NextResponse } from "next/server";

function maskValue(val: string | undefined): string {
  if (!val) return "";
  if (val.length <= 8) return "***";
  return val.slice(0, 4) + "..." + val.slice(-4);
}

const ENV_VARS = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "STRIPE_SECRET_KEY",
  "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "FULLSCRIPT_CLIENT_ID",
  "FULLSCRIPT_CLIENT_SECRET",
  "FULLSCRIPT_PRACTITIONER_ID",
  "FULLSCRIPT_API_URL",
  "FULLSCRIPT_ENV",
  "NEXT_PUBLIC_FULLSCRIPT_ENV",
  "NEXT_PUBLIC_FULLSCRIPT_API_URL",
  "NEXT_PUBLIC_FULLSCRIPT_CLIENT_ID",
  "NEXT_PUBLIC_BASE_URL",
];

export async function GET() {
  const env_vars = ENV_VARS.map((name) => ({
    name,
    set: !!process.env[name],
    masked: maskValue(process.env[name]),
  }));

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";

  const supabaseRef = supabaseUrl.match(/https:\/\/([^.]+)\./)?.[1] || "";

  const urls = {
    supabase: supabaseRef
      ? `https://supabase.com/dashboard/project/${supabaseRef}`
      : supabaseUrl,
    fullscript_api: process.env.FULLSCRIPT_API_URL || "",
    stripe_dashboard: "https://dashboard.stripe.com",
    webhook_url: `${baseUrl}/api/webhooks/fullscript`,
    oauth_callback: `${baseUrl}/api/auth/fullscript/callback`,
  };

  return NextResponse.json({ env_vars, urls });
}
