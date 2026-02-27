import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  try {
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("id, first_name, last_name, state, fullscript_patient_id, created_at, role")
      .eq("role", "patient")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: orders } = await supabase
      .from("orders")
      .select("user_id");

    const orderCounts: Record<string, number> = {};
    (orders || []).forEach((o) => {
      orderCounts[o.user_id] = (orderCounts[o.user_id] || 0) + 1;
    });

    const { data: authUsers } = await supabase.auth.admin.listUsers();

    const emailMap: Record<string, string> = {};
    (authUsers?.users || []).forEach((u) => {
      emailMap[u.id] = u.email || "";
    });

    const patients = (profiles || []).map((p) => ({
      ...p,
      email: emailMap[p.id] || "",
      order_count: orderCounts[p.id] || 0,
    }));

    return NextResponse.json({ patients });
  } catch (err) {
    console.error("Patients fetch error:", err);
    return NextResponse.json(
      { error: "Failed to fetch patients" },
      { status: 500 }
    );
  }
}
