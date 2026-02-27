import { NextResponse } from "next/server";
import { getSessionGrant } from "@/lib/fullscript/client";

export async function POST() {
  try {
    const grant = await getSessionGrant();

    if (grant.error) {
      return NextResponse.json(
        { error: grant.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      secret_token: grant.secret_token,
      expires_at: grant.expires_at,
    });
  } catch (err) {
    console.error("Session grant error:", err);
    return NextResponse.json(
      { error: "Failed to get session grant" },
      { status: 500 }
    );
  }
}
