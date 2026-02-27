import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not configured");
  return new Stripe(key);
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.order_id;
    const userId = session.metadata?.user_id;

    if (!orderId) {
      console.error("No order_id in session metadata");
      return NextResponse.json({ received: true });
    }

    await supabase
      .from("orders")
      .update({
        status: "paid",
        stripe_payment_intent_id:
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id,
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId);

    if (userId) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("fullscript_patient_id, first_name, last_name")
        .eq("id", userId)
        .single();

      if (profile && !profile.fullscript_patient_id) {
        try {
          const { data: tokenRow } = await supabase
            .from("fullscript_tokens")
            .select("access_token")
            .eq("practitioner_id", process.env.FULLSCRIPT_PRACTITIONER_ID!)
            .single();

          if (tokenRow) {
            const patientRes = await fetch(
              `${process.env.FULLSCRIPT_API_URL}/api/clinic/patients`,
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${tokenRow.access_token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: session.customer_email,
                  first_name: profile.first_name,
                  last_name: profile.last_name,
                  send_welcome_email: "false",
                }),
              }
            );

            const patientData = await patientRes.json();

            if (patientData.patient?.id) {
              await supabase
                .from("profiles")
                .update({ fullscript_patient_id: patientData.patient.id })
                .eq("id", userId);
            }
          }
        } catch (err) {
          console.error("Failed to create Fullscript patient:", err);
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
