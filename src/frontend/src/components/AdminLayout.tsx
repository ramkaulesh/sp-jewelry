import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link, Outlet } from "@tanstack/react-router";
import {
  BarChart2,
  Bell,
  Calendar,
  DollarSign,
  ExternalLink,
  FileText,
  Gem,
  HeadphonesIcon,
  LayoutDashboard,
  Megaphone,
  Menu,
  Package,
  Settings,
  ShoppingCart,
  UserCog,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

// Platform identity color — always indigo, never business accent

const NAV_ITEMS = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin",
  },
  { key: "orders", label: "Orders", icon: ShoppingCart, path: "/admin/orders" },
  {
    key: "products",
    label: "Products & Inventory",
    icon: Package,
    path: "/admin/products",
  },
  {
    key: "customers",
    label: "Customers & CRM",
    icon: Users,
    path: "/admin/customers",
  },
  {
    key: "invoices",
    label: "Invoices & Quotes",
    icon: FileText,
    path: "/admin/invoices",
  },
  {
    key: "finance",
    label: "Finance",
    icon: DollarSign,
    path: "/admin/finance",
  },
  {
    key: "events",
    label: "Events & Bookings",
    icon: Calendar,
    path: "/admin/events",
  },
  {
    key: "marketing",
    label: "Marketing",
    icon: Megaphone,
    path: "/admin/marketing",
  },
  {
    key: "analytics",
    label: "Analytics",
    icon: BarChart2,
    path: "/admin/analytics",
  },
  { key: "staff", label: "Staff", icon: UserCog, path: "/admin/staff" },
  {
    key: "support",
    label: "Support",
    icon: HeadphonesIcon,
    path: "/admin/support",
  },
  {
    key: "settings",
    label: "Settings",
    icon: Settings,
    path: "/admin/settings",
  },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(
    () =>
      typeof localStorage !== "undefined" &&
      localStorage.getItem("adminBannerDismissed") === "true",
  );

  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "";

  const isActive = (path: string) => {
    if (path === "/admin") return currentPath === "/admin";
    return currentPath.startsWith(path);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo — exact h-14 to match main header */}
      <div
        className="h-14 px-4 flex items-center border-b border-sidebar-border flex-shrink-0"
        style={{ minHeight: "56px" }}
      >
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary flex-shrink-0">
            <Gem className="h-4 w-4 text-primary-foreground" />
          </div>
          {(sidebarOpen || mobileSidebarOpen) && (
            <div>
              <div className="font-display font-bold text-sidebar-foreground text-sm leading-tight tracking-tight">
                SP Jewelry
              </div>
              <div className="text-[11px] text-sidebar-foreground/45 leading-tight">
                Admin
              </div>
            </div>
          )}
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.key}
              to={item.path as "/admin"}
              onClick={() => setMobileSidebarOpen(false)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg mb-0.5 text-sm font-medium transition-opacity ${
                active
                  ? "text-primary font-semibold"
                  : "text-sidebar-foreground/55 hover:text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
              style={
                active
                  ? {
                      backgroundColor: "oklch(var(--primary) / 0.08)",
                      borderLeft: "2.5px solid oklch(var(--primary))",
                      paddingLeft: "10px",
                    }
                  : {}
              }
              data-ocid={`admin.${item.key}.link`}
            >
              <Icon
                className={`h-4 w-4 flex-shrink-0 ${active ? "text-primary" : ""}`}
              />
              {(sidebarOpen || mobileSidebarOpen) && (
                <span className="truncate">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-sidebar-border">
        <Link
          to="/store"
          className="flex items-center gap-2.5 px-3 py-2 text-sidebar-foreground/45 hover:text-sidebar-foreground text-xs font-medium transition-opacity rounded-lg hover:bg-sidebar-accent"
          data-ocid="admin.storefront.link"
        >
          <ExternalLink className="h-4 w-4 flex-shrink-0" />
          {(sidebarOpen || mobileSidebarOpen) && <span>View Storefront</span>}
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-200 flex-shrink-0 ${
          sidebarOpen ? "w-64 min-w-[256px]" : "w-16"
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close sidebar"
            className="absolute inset-0 bg-black/60 w-full h-full"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header — exact h-14 matching sidebar logo area */}
        <header
          className="bg-card border-b border-border px-4 flex items-center justify-between gap-3 flex-shrink-0"
          style={{ height: "56px", minHeight: "56px" }}
        >
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setSidebarOpen(!sidebarOpen);
                setMobileSidebarOpen(!mobileSidebarOpen);
              }}
              className="p-1.5 hover:bg-muted rounded-lg transition-colors"
              data-ocid="admin.sidebar.toggle"
            >
              <Menu className="h-4 w-4 text-foreground/60" />
            </button>

            <span className="font-display font-semibold text-sm text-foreground/70 hidden sm:block">
              SP Jewelry — Admin
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="relative p-2 hover:bg-muted rounded-lg transition-colors"
              data-ocid="admin.notifications.button"
            >
              <Bell className="h-4 w-4 text-foreground/60" />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-destructive" />
            </button>
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarFallback className="text-xs font-semibold bg-primary text-primary-foreground">
                SP
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Welcome Banner */}
        {!bannerDismissed && (
          <div
            className="flex items-center justify-between px-5 py-2.5 flex-shrink-0 bg-primary/5 border-b border-primary/15"
            data-ocid="admin.onboarding.panel"
          >
            <div className="flex items-center gap-2 text-sm">
              <Gem className="h-4 w-4 flex-shrink-0 text-primary" />
              <span className="text-foreground/60 text-[13px]">
                Welcome to the SP Jewelry admin — manage orders, products, and
                more.
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                if (typeof localStorage !== "undefined") {
                  localStorage.setItem("adminBannerDismissed", "true");
                }
                setBannerDismissed(true);
              }}
              className="p-1 rounded hover:bg-black/10 transition-colors flex-shrink-0 ml-4 text-muted-foreground"
              aria-label="Dismiss"
              data-ocid="admin.onboarding.close_button"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
