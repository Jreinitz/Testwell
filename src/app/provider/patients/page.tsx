"use client";

import { useEffect, useState } from "react";
import { Users, Search, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";

type Patient = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  state: string | null;
  fullscript_patient_id: string | null;
  created_at: string;
  order_count: number;
};

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  async function fetchPatients() {
    try {
      const res = await fetch("/api/patients");
      const data = await res.json();
      setPatients(data.patients || []);
    } catch (err) {
      console.error("Failed to fetch patients:", err);
    } finally {
      setLoading(false);
    }
  }

  const filtered = patients.filter((p) => {
    if (!search) return true;
    const q = search.toLowerCase();
    const name = `${p.first_name} ${p.last_name}`.toLowerCase();
    return name.includes(q) || p.email.toLowerCase().includes(q);
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-teal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Patients</h1>
        <p className="text-muted-foreground mt-1">
          {patients.length} registered patient
          {patients.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="mb-6">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 rounded-lg border-border/40"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border/40 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-7 w-7 text-muted-foreground/40" />
            </div>
            <p className="text-foreground font-medium">No patients found</p>
            <p className="text-sm text-muted-foreground mt-1">
              {search
                ? "Try adjusting your search."
                : "Patients will appear here after they sign up and place orders."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border/30">
            {filtered.map((patient) => (
              <div
                key={patient.id}
                className="flex items-center justify-between p-5 hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-teal/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-teal">
                      {patient.first_name[0]}
                      {patient.last_name[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {patient.first_name} {patient.last_name}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <Mail className="h-3 w-3" />
                      {patient.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  {patient.state && (
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-medium rounded">
                      {patient.state}
                    </span>
                  )}
                  <span className="text-muted-foreground">
                    {patient.order_count} order
                    {patient.order_count !== 1 ? "s" : ""}
                  </span>
                  {patient.fullscript_patient_id && (
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-xs font-medium rounded">
                      FS Linked
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {new Date(patient.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
