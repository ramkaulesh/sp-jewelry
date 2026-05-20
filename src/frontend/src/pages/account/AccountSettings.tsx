import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { toast } from "sonner";

export default function AccountSettings() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl font-bold">Account Settings</h2>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Personal Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Full Name</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1"
              placeholder="Your full name"
              data-ocid="account.settings.name.input"
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1"
              placeholder="your@email.com"
              data-ocid="account.settings.email.input"
            />
          </div>
          <div>
            <Label>Phone</Label>
            <Input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="mt-1"
              placeholder="+1 (555) 000-0000"
            />
          </div>
          <Button
            variant="default"
            onClick={() => toast.success("Details saved")}
            data-ocid="account.settings.save_button"
          >
            Save Changes
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Change Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Current Password</Label>
            <Input
              type="password"
              className="mt-1"
              data-ocid="account.settings.current_password.input"
            />
          </div>
          <div>
            <Label>New Password</Label>
            <Input
              type="password"
              className="mt-1"
              data-ocid="account.settings.new_password.input"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => toast.success("Password updated")}
            data-ocid="account.settings.password.save_button"
          >
            Update Password
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Communication Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            {
              label: "Order Updates",
              desc: "Get notified about your order status",
            },
            {
              label: "Marketing Emails",
              desc: "Promotions, new products, and news",
            },
            {
              label: "SMS Notifications",
              desc: "Text message alerts for order updates",
            },
          ].map((pref) => (
            <div
              key={pref.label}
              className="flex items-center justify-between py-2 border-b last:border-0"
            >
              <div>
                <p className="text-sm font-medium">{pref.label}</p>
                <p className="text-xs text-muted-foreground">{pref.desc}</p>
              </div>
              <Switch
                defaultChecked={pref.label === "Order Updates"}
                data-ocid={`account.settings.${pref.label.toLowerCase().replace(/ /g, "_")}.switch`}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
