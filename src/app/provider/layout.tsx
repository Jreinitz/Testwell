"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/supabase/auth-provider";
import { Toaster } from "sonner";

const sidebarLinks = [
  { href: "/provider", label: "Dashboard", icon: LayoutDashboard },
  { href: "/provider/orders", label: "Orders", icon: ClipboardList },
  { href: "/provider/patients", label: "Patients", icon: Users },
  { href: "/provider/settings", label: "Settings", icon: Settings },
];

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex">
      <aside
        className={`fixed inset-y-0 left-0 z-40 bg-white border-r border-border/40 flex flex-col transition-all duration-300 ${
          collapsed ? "w-[72px]" : "w-64"
        }`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-border/30">
          <Link href="/provider" className="flex items-center gap-2.5">
            <Image src="/logo-mark.svg" alt="TestWell" width={24} height={30} />
            {!collapsed && (
              <span className="text-lg font-bold tracking-tight">
                Test<span className="text-teal">Well</span>
              </span>
            )}
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-slate-100"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        {!collapsed && (
          <div className="px-4 py-3 border-b border-border/30">
            <p className="text-xs font-semibold text-teal uppercase tracking-wider">
              Provider Portal
            </p>
          </div>
        )}

        <nav className="flex-1 py-4 px-3 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/provider" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-teal/10 text-teal"
                    : "text-muted-foreground hover:bg-slate-100 hover:text-foreground"
                } ${collapsed ? "justify-center px-2" : ""}`}
              >
                <link.icon
                  className={`shrink-0 ${
                    isActive ? "text-teal" : "text-muted-foreground"
                  }`}
                  size={18}
                />
                {!collapsed && link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border/30">
          {!collapsed && user && (
            <div className="px-3 py-2 mb-2">
              <p className="text-sm font-medium text-foreground truncate">
                {user.email}
              </p>
              <p className="text-xs text-muted-foreground">Provider</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            className={`w-full text-muted-foreground hover:text-red-500 hover:bg-red-50 ${
              collapsed ? "px-2 justify-center" : "justify-start"
            }`}
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {!collapsed && <span className="ml-2">Sign out</span>}
          </Button>
        </div>
      </aside>

      <main
        className={`flex-1 transition-all duration-300 ${
          collapsed ? "ml-[72px]" : "ml-64"
        }`}
      >
        <div className="p-6 lg:p-8">{children}</div>
      </main>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "white",
            border: "1px solid hsl(var(--border))",
            borderRadius: "0.75rem",
          },
        }}
      />
    </div>
  );
}
