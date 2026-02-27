"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  Package,
  ClipboardList,
  LogOut,
  CheckCircle2,
  Clock,
  FlaskConical,
  Settings,
  Save,
  Loader2,
  ExternalLink,
  Info,
  Mail,
  Truck,
  TestTube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/supabase/auth-provider";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { toast } from "sonner";

type OrderItem = {
  test_name: string;
  price: number;
};

type Order = {
  id: string;
  status: string;
  total_amount: number;
  created_at: string;
  order_items: OrderItem[];
};

type Profile = {
  first_name: string;
  last_name: string;
  state: string | null;
  date_of_birth: string | null;
  phone: string | null;
  gender: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  zip: string | null;
};

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; icon: typeof Clock }
> = {
  pending: { label: "Pending Payment", color: "text-slate-500", icon: Clock },
  paid: { label: "Paid — Processing", color: "text-amber-600", icon: Clock },
  awaiting_plan: { label: "Processing", color: "text-amber-600", icon: Clock },
  plan_activated: {
    label: "Plan Created",
    color: "text-blue-600",
    icon: ClipboardList,
  },
  lab_ordered: {
    label: "Lab Ordered",
    color: "text-blue-600",
    icon: FlaskConical,
  },
  kit_shipped: {
    label: "Kit Shipped",
    color: "text-indigo-600",
    icon: Package,
  },
  kit_delivered: {
    label: "Kit Delivered",
    color: "text-indigo-600",
    icon: Package,
  },
  specimen_received: {
    label: "Sample Received",
    color: "text-purple-600",
    icon: FlaskConical,
  },
  processing: {
    label: "Processing Results",
    color: "text-blue-600",
    icon: Clock,
  },
  results_ready: {
    label: "Results Ready",
    color: "text-emerald-600",
    icon: CheckCircle2,
  },
  completed: {
    label: "Completed",
    color: "text-emerald-600",
    icon: CheckCircle2,
  },
  cancelled: { label: "Cancelled", color: "text-red-500", icon: Clock },
};

const TABS = [
  { id: "orders", label: "Orders", icon: ClipboardList },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function AccountPage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>("orders");

  const fetchData = useCallback(async () => {
    if (!user) return;

    const supabase = createClient();

    const [profileRes, ordersRes] = await Promise.all([
      supabase
        .from("profiles")
        .select(
          "first_name, last_name, state, date_of_birth, phone, gender, address_line1, address_line2, city, zip"
        )
        .eq("id", user.id)
        .single(),
      supabase
        .from("orders")
        .select(
          "id, status, total_amount, created_at, order_items (test_name, price)"
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false }),
    ]);

    if (profileRes.data) setProfile(profileRes.data);
    if (ordersRes.data) setOrders(ordersRes.data);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/account");
      return;
    }
    if (user) fetchData();
  }, [user, authLoading, router, fetchData]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-teal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-teal/10 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-teal">
                  {profile?.first_name?.[0]}
                  {profile?.last_name?.[0]}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {profile?.first_name} {profile?.last_name}
                </h1>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-red-500"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </Button>
          </div>

          {/* Stat Cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <StatCard
              label="Total Orders"
              value={orders.length}
              icon={Package}
            />
            <StatCard
              label="Active Orders"
              value={
                orders.filter(
                  (o) =>
                    !["completed", "cancelled", "results_ready"].includes(
                      o.status
                    )
                ).length
              }
              icon={Clock}
            />
            <StatCard
              label="Results Ready"
              value={
                orders.filter(
                  (o) =>
                    o.status === "results_ready" || o.status === "completed"
                ).length
              }
              icon={CheckCircle2}
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-white border border-border/40 rounded-lg p-1 shadow-sm mb-6 w-fit">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  activeTab === tab.id
                    ? "bg-teal text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-slate-50"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "orders" ? (
            <OrdersTab orders={orders} />
          ) : (
            <SettingsTab
              profile={profile}
              email={user?.email || ""}
              onProfileUpdate={(p) => setProfile(p)}
              userId={user?.id || ""}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}

const STATUS_GUIDANCE: Record<string, { message: string; icon: typeof Clock; actionLabel?: string; actionUrl?: string }> = {
  paid: {
    message: "Your order has been received and is being reviewed by our physician. You\u2019ll be notified once your lab requisition is ready.",
    icon: Clock,
  },
  awaiting_plan: {
    message: "Our physician is preparing your lab order. This usually takes less than 24 hours.",
    icon: Clock,
  },
  plan_activated: {
    message: "Your lab order has been approved and is being processed.",
    icon: ClipboardList,
  },
  lab_ordered: {
    message: "Your lab requisition has been sent to your email by our lab partner Fullscript. Check your inbox (and spam folder) for instructions on where to get your blood drawn.",
    icon: Mail,
  },
  kit_shipped: {
    message: "Your lab collection kit has been shipped! Watch for it in the mail. You\u2019ll receive tracking information via email from Fullscript.",
    icon: Truck,
  },
  kit_delivered: {
    message: "Your collection kit has been delivered. Follow the included instructions to collect your sample and send it back using the prepaid shipping label.",
    icon: Package,
  },
  specimen_received: {
    message: "The lab has received your sample and is processing it. Results typically take 1\u20133 business days.",
    icon: TestTube,
  },
  results_ready: {
    message: "Your results are ready! View them through the Fullscript patient portal using the same email you signed up with.",
    icon: CheckCircle2,
    actionLabel: "View Results on Fullscript",
    actionUrl: "https://patient.fullscript.com",
  },
  completed: {
    message: "This order is complete. Your results are available on the Fullscript patient portal.",
    icon: CheckCircle2,
    actionLabel: "View Results on Fullscript",
    actionUrl: "https://patient.fullscript.com",
  },
};

function OrdersTab({ orders }: { orders: Order[] }) {
  const hasActiveOrders = orders.some(
    (o) => !["completed", "cancelled", "pending"].includes(o.status)
  );

  return (
    <div className="space-y-4">
      {/* Fullscript Portal Info Banner — shown when patient has active orders */}
      {hasActiveOrders && (
        <div className="bg-blue-50/70 border border-blue-200/60 rounded-xl p-4">
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-blue-900 mb-1">
                Your labs are handled by Fullscript
              </p>
              <p className="text-xs text-blue-800/80 leading-relaxed">
                TestWell partners with{" "}
                <span className="font-medium">Fullscript</span> to process your
                lab orders and deliver results. You&apos;ll receive emails from
                Fullscript on behalf of TestWell. To view your requisition and
                results, you may need to{" "}
                <span className="font-medium">
                  create a free Fullscript patient account
                </span>{" "}
                using the same email address you used to sign up for TestWell.
                This is a one-time setup.
              </p>
              <a
                href="https://patient.fullscript.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 hover:text-blue-900 mt-2 transition-colors"
              >
                Go to Fullscript Patient Portal
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-border/40 shadow-sm">
        <div className="p-5 border-b border-border/30">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <ClipboardList className="h-4 w-4 text-teal" />
            Order History
          </h2>
        </div>

        {orders.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FlaskConical className="h-7 w-7 text-muted-foreground/40" />
            </div>
            <p className="text-foreground font-medium">No orders yet</p>
            <p className="text-sm text-muted-foreground mt-1 mb-6">
              Browse our lab tests and place your first order.
            </p>
            <Button
              className="bg-teal text-white hover:bg-teal/90 rounded-xl"
              asChild
            >
              <Link href="/tests">Browse Lab Tests</Link>
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-border/30">
            {orders.map((order, i) => {
              const statusCfg = STATUS_CONFIG[order.status] || {
                label: order.status,
                color: "text-slate-500",
                icon: Clock,
              };
              const StatusIcon = statusCfg.icon;
              const guidance = STATUS_GUIDANCE[order.status];

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-5 hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-teal/10 rounded-lg flex items-center justify-center">
                        <FlaskConical className="h-4 w-4 text-teal" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">
                          Order #{order.id.slice(0, 8)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString()}{" "}
                          &middot; ${Number(order.total_amount).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusIcon
                        className={`h-4 w-4 ${statusCfg.color}`}
                      />
                      <span
                        className={`text-xs font-semibold ${statusCfg.color}`}
                      >
                        {statusCfg.label}
                      </span>
                    </div>
                  </div>

                  {/* Ordered tests */}
                  <div className="ml-12 flex flex-wrap gap-2">
                    {order.order_items.map((item, j) => (
                      <span
                        key={j}
                        className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md"
                      >
                        {item.test_name}
                      </span>
                    ))}
                  </div>

                  {/* Contextual guidance per status */}
                  {guidance && order.status !== "pending" && order.status !== "cancelled" && (
                    <div className="ml-12 mt-3 bg-slate-50 border border-border/30 rounded-lg p-3">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {guidance.message}
                      </p>
                      {guidance.actionLabel && guidance.actionUrl && (
                        <a
                          href={guidance.actionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal hover:text-teal/80 mt-2 transition-colors"
                        >
                          {guidance.actionLabel}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function SettingsTab({
  profile,
  email,
  onProfileUpdate,
  userId,
}: {
  profile: Profile | null;
  email: string;
  onProfileUpdate: (p: Profile) => void;
  userId: string;
}) {
  const [form, setForm] = useState({
    first_name: profile?.first_name || "",
    last_name: profile?.last_name || "",
    phone: profile?.phone || "",
    date_of_birth: profile?.date_of_birth || "",
    gender: profile?.gender || "",
    state: profile?.state || "",
    address_line1: profile?.address_line1 || "",
    address_line2: profile?.address_line2 || "",
    city: profile?.city || "",
    zip: profile?.zip || "",
  });
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setDirty(true);
  };

  const handleSave = async () => {
    setSaving(true);

    const supabase = createClient();
    const { error } = await supabase
      .from("profiles")
      .update({
        first_name: form.first_name,
        last_name: form.last_name,
        phone: form.phone || null,
        date_of_birth: form.date_of_birth || null,
        gender: form.gender || null,
        state: form.state || null,
        address_line1: form.address_line1 || null,
        address_line2: form.address_line2 || null,
        city: form.city || null,
        zip: form.zip || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    setSaving(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Profile updated");
    setDirty(false);
    onProfileUpdate({
      ...form,
      date_of_birth: form.date_of_birth || null,
      phone: form.phone || null,
      gender: form.gender || null,
      state: form.state || null,
      address_line1: form.address_line1 || null,
      address_line2: form.address_line2 || null,
      city: form.city || null,
      zip: form.zip || null,
    });
  };

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="bg-white rounded-xl border border-border/40 shadow-sm">
        <div className="p-5 border-b border-border/30">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <User className="h-4 w-4 text-teal" />
            Personal Information
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            This information is used for your lab requisitions and results.
          </p>
        </div>
        <div className="p-5 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                value={form.first_name}
                onChange={(e) => update("first_name", e.target.value)}
                className="mt-1.5 rounded-lg"
              />
            </div>
            <div>
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                value={form.last_name}
                onChange={(e) => update("last_name", e.target.value)}
                className="mt-1.5 rounded-lg"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email}
              disabled
              className="mt-1.5 rounded-lg bg-slate-50 text-muted-foreground"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Contact support to change your email address.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(555) 555-5555"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="mt-1.5 rounded-lg"
              />
            </div>
            <div>
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                type="date"
                value={form.date_of_birth}
                onChange={(e) => update("date_of_birth", e.target.value)}
                className="mt-1.5 rounded-lg"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="gender">Gender</Label>
            <select
              id="gender"
              value={form.gender}
              onChange={(e) => update("gender", e.target.value)}
              className="mt-1.5 w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Prefer not to say</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="bg-white rounded-xl border border-border/40 shadow-sm">
        <div className="p-5 border-b border-border/30">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <Package className="h-4 w-4 text-teal" />
            Address
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Used for shipping lab kits if applicable.
          </p>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <Label htmlFor="address_line1">Street Address</Label>
            <Input
              id="address_line1"
              placeholder="123 Main St"
              value={form.address_line1}
              onChange={(e) => update("address_line1", e.target.value)}
              className="mt-1.5 rounded-lg"
            />
          </div>
          <div>
            <Label htmlFor="address_line2">Apt / Suite / Unit</Label>
            <Input
              id="address_line2"
              placeholder="Apt 4B"
              value={form.address_line2}
              onChange={(e) => update("address_line2", e.target.value)}
              className="mt-1.5 rounded-lg"
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="Miami"
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                className="mt-1.5 rounded-lg"
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <select
                id="state"
                value={form.state}
                onChange={(e) => update("state", e.target.value)}
                className="mt-1.5 w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select state</option>
                <option value="FL">Florida</option>
                <option value="TX">Texas</option>
              </select>
            </div>
            <div>
              <Label htmlFor="zip">ZIP Code</Label>
              <Input
                id="zip"
                placeholder="33101"
                value={form.zip}
                onChange={(e) => update("zip", e.target.value)}
                className="mt-1.5 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={!dirty || saving}
          className="bg-teal text-white hover:bg-teal/90 rounded-xl h-11 px-8 font-semibold shadow-sm shadow-teal/15 disabled:opacity-50 transition-all"
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: typeof Clock;
}) {
  return (
    <div className="bg-white rounded-xl border border-border/40 p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="w-9 h-9 bg-teal/10 rounded-lg flex items-center justify-center">
          <Icon className="h-4 w-4 text-teal" />
        </div>
        <span className="text-2xl font-bold text-foreground">{value}</span>
      </div>
      <p className="text-sm text-muted-foreground mt-2">{label}</p>
    </div>
  );
}
