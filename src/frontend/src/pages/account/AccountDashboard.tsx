import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { FileText, ShoppingBag, Star } from "lucide-react";

export default function AccountDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-primary to-primary/60 rounded-2xl p-6 text-primary-foreground">
        <h2 className="font-display text-xl font-bold mb-1">Welcome back!</h2>
        <p className="text-primary-foreground/80 text-sm">
          SP Jewelry customer portal
        </p>
        <div className="flex gap-6 mt-4">
          <div>
            <p className="text-2xl font-bold">0</p>
            <p className="text-xs text-primary-foreground/70">Orders</p>
          </div>
          <div>
            <p className="text-2xl font-bold">Silver</p>
            <p className="text-xs text-primary-foreground/70">Loyalty Tier</p>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Orders", icon: ShoppingBag, path: "/account/orders" },
          { label: "Invoices", icon: FileText, path: "/account/invoices" },
          { label: "Loyalty", icon: Star, path: "/account/loyalty" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <Link key={s.label} to={s.path as "/account"}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <Icon className="h-5 w-5 mx-auto mb-2 text-primary" />
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* No orders yet */}
      <Card>
        <CardContent
          className="py-12 text-center"
          data-ocid="account.dashboard.empty_state"
        >
          <ShoppingBag className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <p className="font-semibold text-foreground">No orders yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Your order history will appear here.
          </p>
          <Link to="/catalog">
            <Button
              variant="outline"
              className="mt-4"
              data-ocid="account.dashboard.browse_button"
            >
              Browse Collections
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
