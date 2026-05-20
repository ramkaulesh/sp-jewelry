import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AccountSupport() {
  const [form, setForm] = useState({ subject: "", category: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.subject || !form.message) {
      toast.error("Please fill in all fields");
      return;
    }
    setSubmitted(true);
    toast.success("Support request submitted!");
  };

  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl font-bold text-foreground">
        Support
      </h2>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Contact Us</CardTitle>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div
              className="text-center py-6"
              data-ocid="account.support.success_state"
            >
              <MessageSquare className="h-10 w-10 mx-auto mb-3 text-primary" />
              <p className="font-semibold text-foreground">
                Request Submitted!
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                We'll get back to you within 24 hours.
              </p>
              <Button
                type="button"
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSubmitted(false);
                  setForm({ subject: "", category: "", message: "" });
                }}
                data-ocid="account.support.reset_button"
              >
                Submit Another
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="support-subject">Subject</Label>
                <Input
                  id="support-subject"
                  placeholder="Brief description of your issue"
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                  className="mt-1"
                  data-ocid="account.support.subject.input"
                />
              </div>
              <div>
                <Label>Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => setForm({ ...form, category: v })}
                >
                  <SelectTrigger
                    className="mt-1"
                    data-ocid="account.support.category.select"
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="order">Order Issue</SelectItem>
                    <SelectItem value="product">Product Enquiry</SelectItem>
                    <SelectItem value="returns">
                      Returns &amp; Exchanges
                    </SelectItem>
                    <SelectItem value="shipping">Shipping</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="support-message">Message</Label>
                <Textarea
                  id="support-message"
                  rows={4}
                  placeholder="Describe your issue in detail..."
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="mt-1"
                  data-ocid="account.support.message.textarea"
                />
              </div>
              <Button type="submit" data-ocid="account.support.submit_button">
                Submit Request
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
