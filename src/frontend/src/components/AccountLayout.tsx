import { Link, Outlet } from "@tanstack/react-router";
import {
  Calendar,
  ChevronRight,
  FileText,
  HeadphonesIcon,
  LayoutDashboard,
  MessageSquare,
  Settings,
  ShoppingBag,
} from "lucide-react";

// Platform indigo for the portal identity

const ACCOUNT_NAV = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/account" },
  { label: "Orders", icon: ShoppingBag, path: "/account/orders" },
  { label: "Invoices", icon: FileText, path: "/account/invoices" },
  { label: "Quotes", icon: MessageSquare, path: "/account/quotes" },
  { label: "Bookings", icon: Calendar, path: "/account/bookings" },
  { label: "Support", icon: HeadphonesIcon, path: "/account/support" },
  { label: "Account Settings", icon: Settings, path: "/account/settings" },
];

export default function AccountLayout() {
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <div className="bg-background min-h-screen">
      {/* Portal header */}
      <header
        className="bg-background border-b border-border px-6 flex items-center justify-between"
        style={{ height: "56px" }}
      >
        <div className="flex items-center gap-2.5">
          <Link to="/store" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-xs bg-primary">
              S
            </div>
            <span className="font-display font-semibold text-sm text-foreground tracking-tight">
              SP Jewelry
            </span>
          </Link>
          <span className="text-border text-sm">/</span>
          <span className="text-sm text-muted-foreground font-medium">
            My Account
          </span>
        </div>
        <Link
          to="/store"
          className="text-xs font-medium hover:underline text-primary"
        >
          Back to Store
        </Link>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar nav */}
          <aside className="w-full md:w-56 flex-shrink-0">
            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
              {ACCOUNT_NAV.map((item) => {
                const Icon = item.icon;
                const active = currentPath === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path as "/account"}
                    className={`flex items-center gap-3 px-4 py-2.5 text-sm border-b last:border-0 transition-opacity ${
                      active
                        ? "font-semibold bg-muted/60 border-l-2 border-l-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    }`}
                    data-ocid={`account.${item.label.toLowerCase().replace(/ /g, "_")}.link`}
                  >
                    <Icon
                      className={`h-4 w-4 flex-shrink-0 ${active ? "text-primary" : ""}`}
                    />
                    <span className="flex-1 text-[13px]">{item.label}</span>
                    {active && (
                      <ChevronRight className="h-3 w-3 text-primary" />
                    )}
                  </Link>
                );
              })}
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto py-4 px-6 flex items-center justify-between border-t border-border bg-muted/40">
        <span className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} SP Jewelry
        </span>
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Built with ♥ using caffeine.ai
        </a>
      </footer>
    </div>
  );
}
