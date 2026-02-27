import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const status = request.nextUrl.searchParams.get("status");
    const userId = request.nextUrl.searchParams.get("user_id");

    let query = supabase
      .from("orders")
      .select(`
        *,
        order_items (*),
        profiles (first_name, last_name)
      `)
      .order("created_at", { ascending: false });

    if (status) {
      query = query.eq("status", status);
    }

    if (userId) {
      query = query.eq("user_id", userId);
    }

    const { data: orders, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: authUsers } = await supabase.auth.admin.listUsers();
    const emailMap: Record<string, string> = {};
    (authUsers?.users || []).forEach((u) => {
      emailMap[u.id] = u.email || "";
    });

    const enriched = (orders || []).map((order) => ({
      ...order,
      profiles: order.profiles
        ? {
            ...order.profiles,
            email: emailMap[order.user_id] || "",
          }
        : null,
    }));

    return NextResponse.json({ orders: enriched });
  } catch (err) {
    console.error("Orders fetch error:", err);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
