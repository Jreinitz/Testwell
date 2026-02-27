import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function GET() {
  try {
    const supabase = getSupabase();

    const [profilesRes, authRes, ordersRes] = await Promise.all([
      supabase
        .from("profiles")
        .select("id, first_name, last_name, role, state, created_at")
        .order("created_at", { ascending: false }),
      supabase.auth.admin.listUsers({ perPage: 1000 }),
      supabase.from("orders").select("user_id"),
    ]);

    const emailMap: Record<string, string> = {};
    (authRes.data?.users || []).forEach((u) => {
      emailMap[u.id] = u.email || "";
    });

    const orderCounts: Record<string, number> = {};
    (ordersRes.data || []).forEach((o) => {
      orderCounts[o.user_id] = (orderCounts[o.user_id] || 0) + 1;
    });

    const users = (profilesRes.data || []).map((p) => ({
      ...p,
      email: emailMap[p.id] || "",
      order_count: orderCounts[p.id] || 0,
    }));

    return NextResponse.json({ users });
  } catch (err) {
    console.error("Admin users fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const body = await request.json();
    const { email, password, first_name, last_name, role, state } = body;

    if (!email || !password || !first_name || !last_name || !role) {
      return NextResponse.json(
        { error: "email, password, first_name, last_name, and role are required" },
        { status: 400 }
      );
    }

    if (!["patient", "provider", "admin"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { first_name, last_name, state: state || null },
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    const { error: profileError } = await supabase.from("profiles").upsert({
      id: authUser.user.id,
      first_name,
      last_name,
      role,
      state: state || null,
    });

    if (profileError) {
      return NextResponse.json({ error: profileError.message }, { status: 500 });
    }

    return NextResponse.json({
      user: {
        id: authUser.user.id,
        email,
        first_name,
        last_name,
        role,
        state: state || null,
      },
    });
  } catch (err) {
    console.error("Create user error:", err);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const body = await request.json();
    const { id, role, first_name, last_name, state } = body;

    if (!id) {
      return NextResponse.json({ error: "User id is required" }, { status: 400 });
    }

    const updates: Record<string, unknown> = {};
    if (role && ["patient", "provider", "admin"].includes(role)) updates.role = role;
    if (first_name !== undefined) updates.first_name = first_name;
    if (last_name !== undefined) updates.last_name = last_name;
    if (state !== undefined) updates.state = state || null;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    const { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Update user error:", err);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
