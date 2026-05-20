import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useApp } from "../../context/AppContext";

export default function AccountQuotes() {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-bold text-foreground">
        My Quotes
      </h2>
      <div
        className="text-center py-16 text-muted-foreground"
        data-ocid="account.quotes.empty_state"
      >
        <p className="text-base">No quotes yet.</p>
      </div>
    </div>
  );
}
