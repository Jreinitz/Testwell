import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

async function fetchUserMetrics(supabase: ReturnType<typeof getSupabase>) {
  try {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()).toISOString();

    const [authResult, rolesResult] = await Promise.all([
      supabase.auth.admin.listUsers({ perPage: 1000 }),
      supabase.from("profiles").select("role"),
    ]);

    const users = authResult.data?.users || [];
    const total = authResult.data?.total ?? users.length;
    const newThisWeek = users.filter((u) => u.created_at >= oneWeekAgo).length;
    const newThisMonth = users.filter((u) => u.created_at >= oneMonthAgo).length;

    const byRole: Record<string, number> = {};
    for (const row of rolesResult.data || []) {
      byRole[row.role] = (byRole[row.role] || 0) + 1;
    }

    return { total, by_role: byRole, new_this_week: newThisWeek, new_this_month: newThisMonth };
  } catch (err) {
    console.error("User metrics error:", err);
    return { total: 0, by_role: {}, new_this_week: 0, new_this_month: 0 };
  }
}

async function fetchOrderMetrics(supabase: ReturnType<typeof getSupabase>) {
  try {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()).toISOString();

    const [allOrders, revenueWeek, revenueMonth] = await Promise.all([
      supabase.from("orders").select("status, total_amount, created_at"),
      supabase
        .from("orders")
        .select("total_amount")
        .not("status", "in", "(pending,cancelled)")
        .gte("created_at", oneWeekAgo),
      supabase
        .from("orders")
        .select("total_amount")
        .not("status", "in", "(pending,cancelled)")
        .gte("created_at", oneMonthAgo),
    ]);

    const orders = allOrders.data || [];
    const total = orders.length;

    const byStatus: Record<string, number> = {};
    for (const order of orders) {
      byStatus[order.status] = (byStatus[order.status] || 0) + 1;
    }

    const revenueOrders = orders.filter(
      (o) => o.status !== "pending" && o.status !== "cancelled"
    );
    const revenueTotal = revenueOrders.reduce(
      (sum, o) => sum + (parseFloat(o.total_amount) || 0),
      0
    );
    const revenueThisWeek = (revenueWeek.data || []).reduce(
      (sum, o) => sum + (parseFloat(o.total_amount) || 0),
      0
    );
    const revenueThisMonth = (revenueMonth.data || []).reduce(
      (sum, o) => sum + (parseFloat(o.total_amount) || 0),
      0
    );
    const avgOrderValue = revenueOrders.length > 0 ? revenueTotal / revenueOrders.length : 0;

    return {
      total,
      by_status: byStatus,
      revenue_total: Math.round(revenueTotal * 100) / 100,
      revenue_this_week: Math.round(revenueThisWeek * 100) / 100,
      revenue_this_month: Math.round(revenueThisMonth * 100) / 100,
      avg_order_value: Math.round(avgOrderValue * 100) / 100,
    };
  } catch (err) {
    console.error("Order metrics error:", err);
    return {
      total: 0,
      by_status: {},
      revenue_total: 0,
      revenue_this_week: 0,
      revenue_this_month: 0,
      avg_order_value: 0,
    };
  }
}

async function fetchTestMetrics(supabase: ReturnType<typeof getSupabase>) {
  try {
    const { data: items } = await supabase.from("order_items").select("test_name");

    const rows = items || [];
    const totalOrdered = rows.length;

    const counts: Record<string, number> = {};
    for (const item of rows) {
      counts[item.test_name] = (counts[item.test_name] || 0) + 1;
    }

    const mostPopular = Object.entries(counts)
      .map(([test_name, count]) => ({ test_name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return { total_ordered: totalOrdered, most_popular: mostPopular };
  } catch (err) {
    console.error("Test metrics error:", err);
    return { total_ordered: 0, most_popular: [] };
  }
}

async function fetchConversionMetrics(supabase: ReturnType<typeof getSupabase>) {
  try {
    const { data: orders } = await supabase.from("orders").select("status");

    const rows = orders || [];

    const needsAction = rows.filter((o) => o.status === "paid").length;
    const inProgressStatuses = ["lab_ordered", "kit_shipped", "kit_delivered", "specimen_received"];
    const inProgress = rows.filter((o) => inProgressStatuses.includes(o.status)).length;

    const qualifying = rows.filter(
      (o) => o.status !== "pending" && o.status !== "cancelled"
    );
    const completed = rows.filter((o) => o.status === "completed").length;
    const completionRate = qualifying.length > 0 ? Math.round((completed / qualifying.length) * 10000) / 100 : 0;

    return { needs_action: needsAction, in_progress: inProgress, completion_rate: completionRate };
  } catch (err) {
    console.error("Conversion metrics error:", err);
    return { needs_action: 0, in_progress: 0, completion_rate: 0 };
  }
}

export async function GET() {
  const supabase = getSupabase();

  const [users, orders, tests, conversion] = await Promise.all([
    fetchUserMetrics(supabase),
    fetchOrderMetrics(supabase),
    fetchTestMetrics(supabase),
    fetchConversionMetrics(supabase),
  ]);

  return NextResponse.json({ users, orders, tests, conversion });
}
