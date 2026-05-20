import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin } from "lucide-react";
import { toast } from "sonner";
import { useApp } from "../../context/AppContext";

export default function AccountBookings() {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-bold text-foreground">
        My Bookings
      </h2>
      <div
        className="text-center py-16 text-muted-foreground"
        data-ocid="account.bookings.empty_state"
      >
        <p className="text-base">No bookings yet.</p>
        <p className="text-sm mt-1">Appointment booking coming soon.</p>
      </div>
    </div>
  );
}
