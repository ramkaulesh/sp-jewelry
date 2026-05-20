import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";

export default function AccountOrders() {
  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl font-bold">My Orders</h2>
      <Card>
        <CardContent
          className="py-16 text-center"
          data-ocid="account.orders.empty_state"
        >
          <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <p className="font-semibold text-foreground">No orders yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            When you place an order, it will appear here.
          </p>
          <Link to="/catalog">
            <Button
              variant="outline"
              className="mt-4"
              data-ocid="account.orders.browse_button"
            >
              Start Shopping
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
