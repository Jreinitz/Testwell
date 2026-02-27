import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = getSupabase();

    if (body.challenge) {
      return NextResponse.json({ challenge: body.challenge });
    }

    const { event_type, data } = body;

    console.log(`[Fullscript webhook] ${event_type}`, JSON.stringify(data));

    switch (event_type) {
      case "lab_order.updated": {
        const labOrderStatus = data.status;
        const treatmentPlanId = data.treatment_plan_id;

        if (treatmentPlanId) {
          let mappedStatus = "lab_ordered";
          if (labOrderStatus === "results_available" || labOrderStatus === "completed") {
            mappedStatus = "results_ready";
          } else if (labOrderStatus === "kit_shipped") {
            mappedStatus = "kit_shipped";
          } else if (labOrderStatus === "kit_delivered") {
            mappedStatus = "kit_delivered";
          } else if (labOrderStatus === "specimen_received") {
            mappedStatus = "specimen_received";
          }

          await supabase
            .from("orders")
            .update({
              status: mappedStatus,
              fullscript_lab_order_id: data.id,
              updated_at: new Date().toISOString(),
            })
            .eq("fullscript_treatment_plan_id", treatmentPlanId);
        }
        break;
      }

      case "order.placed": {
        console.log("[Fullscript webhook] Order placed:", data.id);
        break;
      }

      default:
        console.log(`[Fullscript webhook] Unhandled event: ${event_type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Fullscript webhook error:", err);
    return NextResponse.json({ received: true }, { status: 200 });
  }
}
