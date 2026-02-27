import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No authorization code" }, { status: 400 });
  }

  try {
    const tokenRes = await fetch(
      `${process.env.FULLSCRIPT_API_URL}/api/oauth/token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grant_type: "authorization_code",
          client_id: process.env.FULLSCRIPT_CLIENT_ID,
          client_secret: process.env.FULLSCRIPT_CLIENT_SECRET,
          code,
          redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/fullscript/callback`,
        }),
      }
    );

    if (!tokenRes.ok) {
      const err = await tokenRes.text();
      return NextResponse.json(
        { error: "Token exchange failed", details: err },
        { status: 400 }
      );
    }

    const { oauth } = await tokenRes.json();

    const expiresAt = new Date(
      new Date(oauth.created_at).getTime() + oauth.expires_in * 1000
    );

    await getSupabase().from("fullscript_tokens").upsert(
      {
        practitioner_id: oauth.resource_owner.id,
        access_token: oauth.access_token,
        refresh_token: oauth.refresh_token,
        expires_at: expiresAt.toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "practitioner_id" }
    );

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    return NextResponse.redirect(`${baseUrl}/provider?auth=success`);
  } catch (err) {
    console.error("Fullscript OAuth error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
