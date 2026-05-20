import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { useApp } from "../../context/AppContext";

export default function AccountInvoices() {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-bold text-foreground">
        My Invoices
      </h2>
      <div
        className="text-center py-16 text-muted-foreground"
        data-ocid="account.invoices.empty_state"
      >
        <p className="text-base">No invoices yet.</p>
      </div>
    </div>
  );
}
