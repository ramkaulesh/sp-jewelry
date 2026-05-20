import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";

export default function AccountWishlist() {
  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl font-bold">Wishlist</h2>
      <Card>
        <CardContent
          className="py-16 text-center"
          data-ocid="account.wishlist.empty_state"
        >
          <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <p className="font-semibold text-foreground">Coming Soon</p>
          <p className="text-sm text-muted-foreground mt-1">
            Save your favorite pieces for later — this feature is coming soon.
          </p>
          <Link to="/catalog">
            <Button
              variant="outline"
              className="mt-4"
              data-ocid="account.wishlist.browse_button"
            >
              Browse Catalog
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
