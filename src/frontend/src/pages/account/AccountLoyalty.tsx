import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Gift, Star, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { useApp } from "../../context/AppContext";

export default function AccountLoyalty() {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-bold text-foreground">
        Loyalty &amp; Rewards
      </h2>
      <div
        className="text-center py-16 text-muted-foreground"
        data-ocid="account.loyalty.empty_state"
      >
        <p className="text-base">Loyalty program coming soon.</p>
        <p className="text-sm mt-1">
          Earn points on every purchase and redeem them for exclusive rewards.
        </p>
      </div>
    </div>
  );
}
