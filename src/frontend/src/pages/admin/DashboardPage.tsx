import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  FileText,
  HeadphonesIcon,
  Package,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useApp } from "../../context/AppContext";

// Platform indigo — used for charts and KPI icons (identity, not business accent)
const _PLATFORM_INDIGO = "oklch(0.55 0.22 264)";
const _PLATFORM_INDIGO_HEX = "#6366f1";

export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
      <p className="text-muted-foreground mt-2">Coming soon.</p>
    </div>
  );
}
