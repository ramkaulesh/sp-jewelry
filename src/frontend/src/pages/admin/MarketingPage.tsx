import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Plus, Star, Tag, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useApp } from "../../context/AppContext";

const _DISCOUNT_CODES = [
  {
    code: "LAUNCH20",
    type: "20% off",
    uses: 14,
    limit: 100,
    valid: "2025-01-31",
    status: "active",
  },
  {
    code: "WELCOME10",
    type: "10% off",
    uses: 47,
    limit: 50,
    valid: "2024-12-31",
    status: "active",
  },
  {
    code: "VIP15",
    type: "15% off",
    uses: 8,
    limit: 25,
    valid: "2025-06-30",
    status: "active",
  },
  {
    code: "WINTER25",
    type: "$25 off",
    uses: 0,
    limit: 200,
    valid: "2025-02-28",
    status: "draft",
  },
];

const _CAMPAIGNS = [
  {
    name: "December Newsletter",
    status: "sent",
    sent: 1240,
    opens: 387,
    clicks: 94,
    date: "2024-12-05",
  },
  {
    name: "Black Friday Re-engagement",
    status: "sent",
    sent: 850,
    opens: 340,
    clicks: 112,
    date: "2024-11-29",
  },
  {
    name: "New Year Campaign",
    status: "draft",
    sent: 0,
    opens: 0,
    clicks: 0,
    date: "2025-01-01",
  },
];

export default function MarketingPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-foreground">Marketing</h1>
      <p className="text-muted-foreground mt-2">Coming soon.</p>
    </div>
  );
}
