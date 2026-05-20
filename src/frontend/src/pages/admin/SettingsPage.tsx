import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Bell,
  Building2,
  Globe,
  Info,
  Key,
  Palette,
  Save,
  Shield,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useApp } from "../../context/AppContext";

const _INTEGRATIONS = [
  {
    name: "Stripe",
    desc: "Accept card payments",
    category: "Payments",
    connected: true,
    color: "bg-indigo-100",
    logo: "S",
  },
  {
    name: "QuickBooks",
    desc: "Sync accounting data",
    category: "Accounting",
    connected: false,
    color: "bg-indigo-100",
    logo: "QB",
  },
  {
    name: "Xero",
    desc: "Cloud accounting",
    category: "Accounting",
    connected: false,
    color: "bg-blue-100",
    logo: "X",
  },
  {
    name: "Mailchimp",
    desc: "Email marketing",
    category: "Email",
    connected: false,
    color: "bg-yellow-100",
    logo: "MC",
  },
  {
    name: "Google Analytics",
    desc: "Website analytics",
    category: "Analytics",
    connected: true,
    color: "bg-orange-100",
    logo: "GA",
  },
  {
    name: "Twilio",
    desc: "SMS notifications",
    category: "Communications",
    connected: false,
    color: "bg-red-100",
    logo: "TW",
  },
  {
    name: "Klaviyo",
    desc: "Email automation",
    category: "Email",
    connected: false,
    color: "bg-pink-100",
    logo: "KL",
  },
  {
    name: "Zapier",
    desc: "Workflow automation",
    category: "Automation",
    connected: false,
    color: "bg-orange-100",
    logo: "ZP",
  },
  {
    name: "WhatsApp Business",
    desc: "Customer messaging",
    category: "Communications",
    connected: false,
    color: "bg-indigo-100",
    logo: "WA",
  },
];

const _API_KEYS = [
  {
    label: "Production API Key",
    key: "lp_live_sk_••••••••••••••••••••••4f8a",
    created: "2024-10-01",
    lastUsed: "2024-12-08",
  },
  {
    label: "Staging API Key",
    key: "lp_test_sk_••••••••••••••••••••••7d2c",
    created: "2024-11-15",
    lastUsed: "2024-12-07",
  },
];

export default function SettingsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-foreground">Settings</h1>
      <p className="text-muted-foreground mt-2">Coming soon.</p>
    </div>
  );
}
