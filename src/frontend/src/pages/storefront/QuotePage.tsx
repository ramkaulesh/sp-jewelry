import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, FileText } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function QuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
    quantity: "",
    timeline: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.description) {
      toast.error("Please fill in all required fields");
      return;
    }
    setSubmitted(true);
    toast.success("Quote request submitted!");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 bg-primary/10">
          <FileText className="h-6 w-6 text-primary" />
        </div>
        <h1 className="font-display text-3xl font-bold mb-2">
          Request a Quote
        </h1>
        <p className="text-muted-foreground">
          Tell us what you need and we'll get back to you within 24 hours.
        </p>
      </div>

      {submitted ? (
        <Card data-ocid="quote.success_state">
          <CardContent className="p-8 text-center">
            <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-accent" />
            <h2 className="font-display text-xl font-bold mb-2">
              Quote Request Received!
            </h2>
            <p className="text-muted-foreground">
              We'll review your request and send you a detailed quote within 24
              hours.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Reference: QUO-{Math.floor(1000 + Math.random() * 9000)}
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="mt-1"
                    data-ocid="quote.name.input"
                  />
                </div>
                <div>
                  <Label>
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="mt-1"
                    data-ocid="quote.email.input"
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input
                    placeholder="+1 (555) 000-0000"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Quantity / Scale</Label>
                  <Input
                    placeholder="e.g. 1 room, 50 units"
                    value={form.quantity}
                    onChange={(e) =>
                      setForm({ ...form, quantity: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label>Preferred Timeline</Label>
                <Input
                  placeholder="e.g. Within 2 weeks"
                  value={form.timeline}
                  onChange={(e) =>
                    setForm({ ...form, timeline: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label>
                  Describe Your Requirements{" "}
                  <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  placeholder="Tell us about your project, what you need, and any specific requirements..."
                  rows={5}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="mt-1"
                  data-ocid="quote.description.textarea"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground border-0 hover:bg-primary/90"
                data-ocid="quote.submit_button"
              >
                Submit Quote Request
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
