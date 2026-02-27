import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const API_URL = process.env.FULLSCRIPT_API_URL!;
const CLIENT_ID = process.env.FULLSCRIPT_CLIENT_ID!;
const CLIENT_SECRET = process.env.FULLSCRIPT_CLIENT_SECRET!;
const PRACTITIONER_ID = process.env.FULLSCRIPT_PRACTITIONER_ID!;

async function getAccessToken(): Promise<string> {
  const { data: tokenRow } = await supabase
    .from("fullscript_tokens")
    .select("*")
    .eq("practitioner_id", PRACTITIONER_ID)
    .single();

  if (!tokenRow) {
    throw new Error("No Fullscript tokens found. Complete the OAuth flow first.");
  }

  const now = new Date();
  const expiresAt = new Date(tokenRow.expires_at);

  if (now < expiresAt) {
    return tokenRow.access_token;
  }

  const refreshRes = await fetch(`${API_URL}/api/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "refresh_token",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: tokenRow.refresh_token,
    }),
  });

  if (!refreshRes.ok) {
    const err = await refreshRes.text();
    throw new Error(`Token refresh failed: ${err}`);
  }

  const { oauth } = await refreshRes.json();

  const newExpiresAt = new Date(
    new Date(oauth.created_at).getTime() + oauth.expires_in * 1000
  );

  await supabase
    .from("fullscript_tokens")
    .update({
      access_token: oauth.access_token,
      refresh_token: oauth.refresh_token,
      expires_at: newExpiresAt.toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("practitioner_id", PRACTITIONER_ID);

  return oauth.access_token;
}

async function fsRequest(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = await getAccessToken();

  return fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
}

export async function createPatient(data: {
  email: string;
  first_name: string;
  last_name: string;
  date_of_birth?: string;
  gender?: string;
  mobile_number?: string;
  metadata?: { id: string };
}) {
  const res = await fsRequest("/api/clinic/patients", {
    method: "POST",
    body: JSON.stringify({ ...data, send_welcome_email: "false" }),
  });
  return res.json();
}

export async function findPatientByEmail(email: string) {
  const res = await fsRequest(
    `/api/clinic/search/patients?query=${encodeURIComponent(email)}`
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data.patients?.[0] || null;
}

export async function getLabOrders(patientId?: string) {
  const query = patientId ? `?patient_id=${patientId}` : "";
  const res = await fsRequest(`/api/clinic/labs/orders${query}`);
  return res.json();
}

export async function getLabOrder(orderId: string) {
  const res = await fsRequest(`/api/clinic/labs/orders/${orderId}`);
  return res.json();
}

export async function inOfficeCheckout(treatmentPlanId: string) {
  const res = await fsRequest(
    `/api/clinic/treatment_plans/${treatmentPlanId}/in_office_checkout`,
    { method: "POST" }
  );
  return res.json();
}

export async function getSessionGrant() {
  const res = await fsRequest("/api/clinic/embeddable/session_grants", {
    method: "POST",
  });
  return res.json();
}

export async function getClinic() {
  const res = await fsRequest("/api/clinic");
  return res.json();
}

export async function listTreatmentPlans(patientId: string) {
  const res = await fsRequest(
    `/api/clinic/patients/${patientId}/treatment_plans`
  );
  return res.json();
}
