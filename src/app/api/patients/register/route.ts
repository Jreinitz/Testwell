import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createPatient, findPatientByEmail } from "@/lib/fullscript/client";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

function formatPhoneForFullscript(phone: string): string | undefined {
  if (!phone) return undefined;
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return undefined;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, first_name, last_name, date_of_birth, gender, phone } = body;

    if (!email || !first_name || !last_name) {
      return NextResponse.json(
        { error: "email, first_name, and last_name are required" },
        { status: 400 }
      );
    }

    const existing = await findPatientByEmail(email);
    if (existing) {
      const supabase = getSupabase();
      await supabase
        .from("profiles")
        .update({ fullscript_patient_id: existing.id })
        .eq("id", (
          await supabase
            .from("profiles")
            .select("id")
            .eq("first_name", first_name)
            .eq("last_name", last_name)
            .limit(1)
            .single()
        ).data?.id ?? "");

      return NextResponse.json({
        fullscript_patient_id: existing.id,
        already_existed: true,
      });
    }

    const mobile_number = formatPhoneForFullscript(phone);

    const result = await createPatient({
      email,
      first_name,
      last_name,
      date_of_birth: date_of_birth || undefined,
      gender: gender || undefined,
      mobile_number,
    });

    if (result.error) {
      console.error("Fullscript patient creation failed:", result.error);
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    const fsPatientId = result.patient?.id || result.id;

    if (fsPatientId) {
      const supabase = getSupabase();

      const { data: authUsers } = await supabase.auth.admin.listUsers();
      const authUser = authUsers?.users?.find((u) => u.email === email);

      if (authUser) {
        await supabase
          .from("profiles")
          .update({ fullscript_patient_id: fsPatientId })
          .eq("id", authUser.id);
      }
    }

    return NextResponse.json({
      fullscript_patient_id: fsPatientId,
      already_existed: false,
    });
  } catch (err) {
    console.error("Patient registration error:", err);
    return NextResponse.json(
      { error: "Failed to register patient with lab partner" },
      { status: 500 }
    );
  }
}
