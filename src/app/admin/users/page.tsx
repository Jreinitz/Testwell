"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Users,
  Search,
  Shield,
  Stethoscope,
  User,
  Mail,
  MapPin,
  Calendar,
  Plus,
  X,
  Loader2,
  Pencil,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type UserProfile = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  state: string | null;
  created_at: string;
  order_count: number;
};

const ROLE_CONFIG: Record<string, { label: string; className: string; icon: typeof Shield }> = {
  admin: { label: "Admin", className: "bg-amber-100 text-amber-700", icon: Shield },
  provider: { label: "Provider", className: "bg-blue-100 text-blue-700", icon: Stethoscope },
  patient: { label: "Patient", className: "bg-teal/10 text-teal", icon: User },
};

const FILTER_TABS = [
  { value: "all", label: "All" },
  { value: "patient", label: "Patients" },
  { value: "provider", label: "Providers" },
  { value: "admin", label: "Admins" },
];

type ModalMode = null | "create" | "edit";

const EMPTY_FORM = {
  email: "",
  password: "",
  first_name: "",
  last_name: "",
  role: "patient",
  state: "",
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<ModalMode>(null);
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const fetchUsers = useCallback(() => {
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((data) => {
        setUsers(data.users || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setEditingUser(null);
    setModal("create");
  };

  const openEdit = (u: UserProfile) => {
    setEditingUser(u);
    setForm({
      email: u.email,
      password: "",
      first_name: u.first_name,
      last_name: u.last_name,
      role: u.role,
      state: u.state || "",
    });
    setModal("edit");
  };

  const closeModal = () => {
    setModal(null);
    setEditingUser(null);
    setForm(EMPTY_FORM);
  };

  const handleCreate = async () => {
    if (!form.email || !form.password || !form.first_name || !form.last_name) {
      toast.error("All fields except state are required");
      return;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          first_name: form.first_name,
          last_name: form.last_name,
          role: form.role,
          state: form.state || null,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to create user");
        setSaving(false);
        return;
      }

      toast.success(`${ROLE_CONFIG[form.role]?.label || "User"} account created for ${form.email}`);
      closeModal();
      fetchUsers();
    } catch {
      toast.error("Failed to create user");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async () => {
    if (!editingUser) return;

    setSaving(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingUser.id,
          first_name: form.first_name,
          last_name: form.last_name,
          role: form.role,
          state: form.state || null,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to update user");
        setSaving(false);
        return;
      }

      toast.success(`Updated ${form.first_name} ${form.last_name}`);
      closeModal();
      fetchUsers();
    } catch {
      toast.error("Failed to update user");
    } finally {
      setSaving(false);
    }
  };

  const filtered = users.filter((u) => {
    if (filter !== "all" && u.role !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        u.email.toLowerCase().includes(q) ||
        u.first_name.toLowerCase().includes(q) ||
        u.last_name.toLowerCase().includes(q)
      );
    }
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-teal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Users</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {users.length} total users across all roles
          </p>
        </div>
        <Button
          onClick={openCreate}
          className="bg-teal text-white hover:bg-teal/90 rounded-xl h-10 px-4 font-semibold shadow-sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create User
        </Button>
      </div>

      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div className="flex gap-2">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                filter === tab.value
                  ? "bg-teal text-white shadow-sm"
                  : "bg-white text-muted-foreground hover:bg-slate-50 border border-border/40"
              }`}
            >
              {tab.label}
              {tab.value !== "all" && (
                <span className="ml-1.5 text-xs opacity-70">
                  ({users.filter((u) => u.role === tab.value).length})
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 border border-border/40 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/50"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border/40 shadow-sm overflow-hidden">
        <div className="divide-y divide-border/30">
          {filtered.length === 0 ? (
            <div className="p-10 text-center">
              <Users className="h-10 w-10 mx-auto text-muted-foreground/50 mb-3" />
              <p className="text-sm text-muted-foreground">No users found</p>
            </div>
          ) : (
            filtered.map((u) => {
              const roleCfg = ROLE_CONFIG[u.role] || ROLE_CONFIG.patient;
              const initials =
                (u.first_name?.[0] || "") + (u.last_name?.[0] || "") || "?";

              return (
                <div
                  key={u.id}
                  className="flex items-center justify-between p-5 hover:bg-slate-50/50 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-teal/10 text-teal flex items-center justify-center text-sm font-bold">
                      {initials.toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-foreground text-sm">
                          {u.first_name} {u.last_name}
                        </p>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${roleCfg.className}`}
                        >
                          {roleCfg.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {u.email}
                        </span>
                        {u.state && (
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {u.state}
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(u.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {u.role === "patient" && (
                      <p className="text-sm font-medium text-foreground">
                        {u.order_count} order{u.order_count !== 1 ? "s" : ""}
                      </p>
                    )}
                    <button
                      onClick={() => openEdit(u)}
                      className="p-2 rounded-lg hover:bg-slate-100 text-muted-foreground hover:text-foreground transition-colors"
                      title="Edit user"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Create / Edit Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-border/30">
              <h2 className="text-lg font-bold text-foreground">
                {modal === "create" ? "Create New User" : "Edit User"}
              </h2>
              <button
                onClick={closeModal}
                className="p-1 rounded-lg hover:bg-slate-100 text-muted-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Role selector */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Role
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["patient", "provider", "admin"] as const).map((r) => {
                    const cfg = ROLE_CONFIG[r];
                    const Icon = cfg.icon;
                    const selected = form.role === r;
                    return (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, role: r }))}
                        className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl border-2 transition-all text-sm font-medium ${
                          selected
                            ? "border-teal bg-teal/5 text-teal"
                            : "border-border/40 hover:border-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        {cfg.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name fields */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={form.first_name}
                    onChange={(e) => setForm((f) => ({ ...f, first_name: e.target.value }))}
                    placeholder="John"
                    className="w-full px-3 py-2.5 border border-border/40 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/50"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={form.last_name}
                    onChange={(e) => setForm((f) => ({ ...f, last_name: e.target.value }))}
                    placeholder="Doe"
                    className="w-full px-3 py-2.5 border border-border/40 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/50"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="user@example.com"
                  disabled={modal === "edit"}
                  className="w-full px-3 py-2.5 border border-border/40 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/50 disabled:bg-slate-50 disabled:text-muted-foreground"
                />
                {modal === "edit" && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Email cannot be changed after account creation
                  </p>
                )}
              </div>

              {/* Password (create only) */}
              {modal === "create" && (
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                    placeholder="At least 6 characters"
                    className="w-full px-3 py-2.5 border border-border/40 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/50"
                  />
                </div>
              )}

              {/* State (for patients) */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">
                  State
                  <span className="text-muted-foreground font-normal ml-1">(optional)</span>
                </label>
                <div className="relative">
                  <select
                    value={form.state}
                    onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-border/40 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal/50 appearance-none bg-white"
                  >
                    <option value="">No state</option>
                    <option value="FL">Florida</option>
                    <option value="TX">Texas</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-border/30 flex items-center justify-between">
              <button
                onClick={closeModal}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <Button
                onClick={modal === "create" ? handleCreate : handleUpdate}
                disabled={saving}
                className="bg-teal text-white hover:bg-teal/90 rounded-xl h-10 px-6 font-semibold shadow-sm disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {modal === "create" ? "Creating..." : "Saving..."}
                  </>
                ) : modal === "create" ? (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Account
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
