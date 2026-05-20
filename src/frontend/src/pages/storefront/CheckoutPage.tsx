import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, CreditCard, Lock, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useApp } from "../../context/AppContext";

type Step = "contact" | "payment" | "confirm" | "complete";

const STEPS_CONFIG = [
  { key: "contact" as Step, label: "Delivery", icon: Truck },
  { key: "payment" as Step, label: "Payment", icon: CreditCard },
  { key: "confirm" as Step, label: "Review", icon: CheckCircle2 },
];

interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  card: string;
  expiry: string;
  cvv: string;
}

const stepIndex = (s: Step) => STEPS_CONFIG.findIndex((x) => x.key === s);

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useApp();
  const [step, setStep] = useState<Step>("contact");
  const [orderId] = useState(
    () => `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
  );
  const [form, setForm] = useState<CheckoutForm>({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    card: "",
    expiry: "",
    cvv: "",
  });
  const [loading, setLoading] = useState(false);

  // cartTotal is in cents — convert to dollars for all math
  const subtotal = cartTotal / 100;
  const shipping = subtotal > 150 ? 0 : 14.95;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const field = (key: keyof CheckoutForm) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value })),
  });

  const placeOrder = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1800));
    setLoading(false);
    clearCart();
    setStep("complete");
    toast.success("Order confirmed! Thank you for your purchase.");
  };

  // ── Complete state
  if (step === "complete") {
    return (
      <div
        className="max-w-lg mx-auto px-4 py-24 text-center"
        data-ocid="checkout.success_state"
      >
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-primary/10 border border-primary/30">
          <CheckCircle2 className="h-9 w-9 text-primary" />
        </div>
        <h1 className="font-display text-3xl font-bold mb-3 tracking-tight">
          Order Confirmed
        </h1>
        <p className="text-muted-foreground mb-1 text-sm font-mono">
          {orderId}
        </p>
        <p className="text-muted-foreground text-sm mb-10">
          A confirmation has been sent to{" "}
          <span className="text-foreground font-medium">
            {form.email || "your email"}
          </span>
          .
        </p>
        <div className="bg-card border border-border rounded-xl p-5 mb-8 text-left space-y-1">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
            Shipping to
          </p>
          <p className="text-sm font-semibold">{form.name}</p>
          <p className="text-sm text-muted-foreground">{form.street}</p>
          <p className="text-sm text-muted-foreground">
            {form.city}
            {form.state ? `, ${form.state}` : ""} {form.zip}
          </p>
          <p className="text-sm text-muted-foreground">{form.country}</p>
        </div>
        <Link to="/catalog">
          <Button
            className="bg-primary text-primary-foreground border-0 hover:bg-primary/90 px-10"
            data-ocid="checkout.continue_shopping.button"
          >
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  // ── Empty cart
  if (cart.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <p className="text-muted-foreground mb-6">Your cart is empty.</p>
        <Link to="/catalog">
          <Button className="bg-primary text-primary-foreground border-0 hover:bg-primary/90">
            Browse Collection
          </Button>
        </Link>
      </div>
    );
  }

  const currentStepIdx = stepIndex(step);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-1 mb-12">
        {STEPS_CONFIG.map((s, idx) => {
          const isActive = s.key === step;
          const isDone = currentStepIdx > idx;
          const Icon = s.icon;
          return (
            <div key={s.key} className="flex items-center gap-1">
              <div
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                    : isDone
                      ? "bg-primary/15 text-primary border border-primary/30"
                      : "bg-card text-muted-foreground border border-border"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:block">{s.label}</span>
              </div>
              {idx < STEPS_CONFIG.length - 1 && (
                <div
                  className={`w-8 h-px mx-1 ${isDone ? "bg-primary/40" : "bg-border"}`}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Step 1: Contact & Delivery */}
          {step === "contact" && (
            <Card className="bg-card border-border">
              <CardContent className="p-7 space-y-5">
                <div>
                  <h2 className="font-display text-xl font-bold">
                    Contact & Delivery
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    Guest checkout — no account required
                  </p>
                </div>
                <Separator className="bg-border" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                      Full Name
                    </Label>
                    <Input
                      placeholder="Alexandra Smith"
                      className="bg-background border-input"
                      data-ocid="checkout.name.input"
                      {...field("name")}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                      Email
                    </Label>
                    <Input
                      type="email"
                      placeholder="alex@example.com"
                      className="bg-background border-input"
                      data-ocid="checkout.email.input"
                      {...field("email")}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                      Phone
                    </Label>
                    <Input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="bg-background border-input"
                      {...field("phone")}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                      Street Address
                    </Label>
                    <Input
                      placeholder="123 Park Avenue"
                      className="bg-background border-input"
                      data-ocid="checkout.street.input"
                      {...field("street")}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                      City
                    </Label>
                    <Input
                      placeholder="New York"
                      className="bg-background border-input"
                      {...field("city")}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                        State
                      </Label>
                      <Input
                        placeholder="NY"
                        className="bg-background border-input"
                        {...field("state")}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                        ZIP
                      </Label>
                      <Input
                        placeholder="10001"
                        className="bg-background border-input"
                        {...field("zip")}
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                      Country
                    </Label>
                    <Input
                      placeholder="United States"
                      className="bg-background border-input"
                      {...field("country")}
                    />
                  </div>
                </div>
                <Button
                  className="w-full bg-primary text-primary-foreground border-0 hover:bg-primary/90 h-11"
                  onClick={() => setStep("payment")}
                  data-ocid="checkout.contact.submit_button"
                >
                  Continue to Payment
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Payment */}
          {step === "payment" && (
            <Card className="bg-card border-border">
              <CardContent className="p-7 space-y-5">
                <div>
                  <h2 className="font-display text-xl font-bold">
                    Secure Payment
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    Your payment information is encrypted
                  </p>
                </div>
                <Separator className="bg-border" />

                <div className="flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-xl p-4">
                  <Lock className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">SSL Secured Checkout</p>
                    <p className="text-xs text-muted-foreground">
                      Powered by Stripe. We never store your card details.
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                    Card Number
                  </Label>
                  <Input
                    placeholder="4242 4242 4242 4242"
                    className="bg-background border-input font-mono"
                    data-ocid="checkout.card.input"
                    {...field("card")}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                      Expiry
                    </Label>
                    <Input
                      placeholder="MM / YY"
                      className="bg-background border-input font-mono"
                      data-ocid="checkout.expiry.input"
                      {...field("expiry")}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                      CVV
                    </Label>
                    <Input
                      placeholder="···"
                      className="bg-background border-input font-mono"
                      data-ocid="checkout.cvv.input"
                      {...field("cvv")}
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-1">
                  <Button
                    variant="outline"
                    onClick={() => setStep("contact")}
                    className="flex-1"
                    data-ocid="checkout.payment.back_button"
                  >
                    Back
                  </Button>
                  <Button
                    className="flex-1 bg-primary text-primary-foreground border-0 hover:bg-primary/90 h-11"
                    onClick={() => setStep("confirm")}
                    data-ocid="checkout.payment.submit_button"
                  >
                    Review Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Review & Confirm */}
          {step === "confirm" && (
            <Card className="bg-card border-border">
              <CardContent className="p-7 space-y-5">
                <div>
                  <h2 className="font-display text-xl font-bold">
                    Review Your Order
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    Please confirm all details before placing your order
                  </p>
                </div>
                <Separator className="bg-border" />

                <div className="bg-muted/30 border border-border rounded-xl p-4 text-sm space-y-1">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    Delivering to
                  </p>
                  <p className="font-semibold">{form.name || "—"}</p>
                  <p className="text-muted-foreground">{form.street}</p>
                  <p className="text-muted-foreground">
                    {form.city}
                    {form.state ? `, ${form.state}` : ""} {form.zip}
                  </p>
                  <p className="text-muted-foreground">{form.country}</p>
                  <p className="text-muted-foreground mt-1">{form.email}</p>
                </div>

                <div className="space-y-2">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-muted-foreground">
                        <span className="text-foreground font-medium">
                          {item.quantity}×
                        </span>{" "}
                        {item.product.name}
                      </span>
                      <span className="font-semibold">
                        $
                        {((item.product.price / 100) * item.quantity).toFixed(
                          2,
                        )}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator className="bg-border" />

                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      {shipping === 0
                        ? "Complimentary"
                        : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator className="bg-border" />
                  <div className="flex justify-between font-bold text-base">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-1">
                  <Button
                    variant="outline"
                    onClick={() => setStep("payment")}
                    className="flex-1"
                    data-ocid="checkout.confirm.back_button"
                  >
                    Back
                  </Button>
                  <Button
                    className="flex-1 bg-primary text-primary-foreground border-0 hover:bg-primary/90 h-11"
                    onClick={placeOrder}
                    disabled={loading}
                    data-ocid="checkout.confirm.submit_button"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Placing Order…
                      </span>
                    ) : (
                      "Complete Purchase"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:sticky lg:top-24 h-fit">
          <Card className="bg-card border-border">
            <CardContent className="p-5">
              <h3 className="font-display font-semibold mb-4">Order Summary</h3>

              <div className="space-y-3 mb-4">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center gap-3"
                  >
                    <div className="w-12 h-12 rounded-lg bg-muted border border-border flex-shrink-0 overflow-hidden">
                      {item.product.imageUrl ? (
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-lg">
                          💎
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="text-xs font-semibold">
                      ${((item.product.price / 100) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <Separator className="bg-border my-3" />

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <Separator className="bg-border my-3" />

              <div className="flex justify-between font-bold text-sm">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <Lock className="h-3 w-3" />
                <span>Secure & encrypted checkout</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
