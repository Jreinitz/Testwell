import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { inOfficeCheckout } from "@/lib/fullscript/client";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: orderId } = await params;
    const body = await request.json();
    const { treatmentPlanId } = body;

    if (!treatmentPlanId) {
      return NextResponse.json(
        { error: "treatmentPlanId is required" },
        { status: 400 }
      );
    }

    const { data: order } = await supabase
      .from("orders")
      .select("id, status")
      .eq("id", orderId)
      .single();

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const checkoutResult = await inOfficeCheckout(treatmentPlanId);

    await supabase
      .from("orders")
      .update({
        status: "lab_ordered",
        fullscript_treatment_plan_id: treatmentPlanId,
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId);

    return NextResponse.json({
      success: true,
      checkout: checkoutResult,
    });
  } catch (err) {
    console.error("Order activation error:", err);
    return NextResponse.json(
      { error: "Failed to activate order" },
      { status: 500 }
    );
  }
}
