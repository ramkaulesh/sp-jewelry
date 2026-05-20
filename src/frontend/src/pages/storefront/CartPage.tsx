import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { useApp } from "../../context/AppContext";

export default function CartPage() {
  const { cart, removeFromCart, updateCartQty, cartTotal } = useApp();

  // cartTotal is in cents — convert to dollars
  const cartTotalDollars = cartTotal / 100;
  const shipping = cartTotalDollars > 150 ? 0 : 14.95;
  const tax = cartTotalDollars * 0.08;
  const total = cartTotalDollars + shipping + tax;

  if (!cart || cart.length === 0) {
    return (
      <div
        className="max-w-2xl mx-auto px-4 py-24 text-center"
        data-ocid="cart.empty_state"
      >
        <div className="w-20 h-20 rounded-full bg-card border border-border flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="h-9 w-9 text-muted-foreground" />
        </div>
        <h2 className="font-display text-3xl font-bold mb-3 tracking-tight">
          Your cart is empty
        </h2>
        <p className="text-muted-foreground mb-8 text-base">
          Discover our exquisite collection of fine jewelry.
        </p>
        <Link to="/catalog">
          <Button
            className="bg-primary text-primary-foreground border-0 hover:bg-primary/90 px-8"
            data-ocid="cart.browse.button"
          >
            Explore the Collection
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <h1 className="font-display text-3xl font-bold tracking-tight">
          Shopping Cart
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          {cart.length} item{cart.length !== 1 ? "s" : ""} in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-3">
          {cart.map((item, idx) => (
            <Card
              key={item.product.id}
              className="bg-card border-border"
              data-ocid={`cart.item.${idx + 1}`}
            >
              <CardContent className="p-5 flex items-center gap-5">
                <div className="w-20 h-20 rounded-xl bg-muted border border-border flex-shrink-0 overflow-hidden">
                  {item.product.imageUrl ? (
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">
                      💎
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground leading-tight">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 uppercase tracking-wide">
                    {item.product.category}
                  </p>
                  <p className="font-bold mt-2 text-sm text-primary">
                    ${(item.product.price / 100).toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-border rounded-lg overflow-hidden">
                    <button
                      type="button"
                      onClick={() =>
                        updateCartQty(item.product.id, item.quantity - 1)
                      }
                      className="px-2.5 py-2 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                      aria-label="Decrease quantity"
                      data-ocid={`cart.decrement.${idx + 1}`}
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="px-3 text-sm font-semibold min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateCartQty(item.product.id, item.quantity + 1)
                      }
                      className="px-2.5 py-2 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                      aria-label="Increase quantity"
                      data-ocid={`cart.increment.${idx + 1}`}
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

                  <span className="text-sm font-semibold w-16 text-right">
                    ${((item.product.price / 100) * item.quantity).toFixed(2)}
                  </span>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 text-muted-foreground hover:text-destructive transition-colors rounded-md hover:bg-destructive/10"
                    aria-label="Remove item"
                    data-ocid={`cart.delete_button.${idx + 1}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:sticky lg:top-24 h-fit">
          <Card className="bg-card border-border">
            <CardContent className="p-6 space-y-5">
              <h3 className="font-display font-semibold text-lg">
                Order Summary
              </h3>
              <Separator className="bg-border" />

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">
                    ${cartTotalDollars.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0
                      ? "Complimentary"
                      : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Est. Tax (8%)</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
              </div>

              <Separator className="bg-border" />

              <div className="flex justify-between font-bold text-base">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>

              {shipping > 0 && (
                <p className="text-xs text-muted-foreground text-center">
                  Free shipping on orders over $150
                </p>
              )}

              <Link to="/checkout" className="block">
                <Button
                  className="w-full bg-primary text-primary-foreground border-0 hover:bg-primary/90 h-11"
                  data-ocid="cart.checkout.button"
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Link
                to="/catalog"
                className="block text-center text-xs text-muted-foreground hover:text-foreground transition-colors"
                data-ocid="cart.continue_shopping.link"
              >
                Continue shopping
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
