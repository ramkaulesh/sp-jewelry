import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Gem,
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useApp } from "../../context/AppContext";

export default function ProductDetailPage() {
  const params = useParams({ strict: false }) as { id?: string };
  const { products, addToCart } = useApp();
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const product = products.find((p) => p.id === params.id);
  const related = product
    ? products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4)
    : [];

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <Gem className="h-16 w-16 mx-auto mb-6 text-muted-foreground/30" />
        <p className="text-muted-foreground text-lg mb-6">Piece not found.</p>
        <Link to="/catalog">
          <Button
            variant="outline"
            className="border-border hover:border-primary/50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Collections
          </Button>
        </Link>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price / 100);

  return (
    <div className="bg-background min-h-screen">
      {/* Back navigation */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            data-ocid="product.back_link"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Collections
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* Left: Image */}
          <div>
            <div className="w-full aspect-square rounded-2xl bg-muted relative overflow-hidden shadow-[0_16px_64px_rgba(0,0,0,0.6)] border border-border">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Gem className="h-20 w-20 text-muted-foreground/20" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent pointer-events-none" />
              {product.featured && (
                <Badge className="absolute top-5 left-5 bg-primary text-primary-foreground border-0 px-3 py-1 text-xs font-bold tracking-wider uppercase">
                  Featured
                </Badge>
              )}
            </div>
            {/* Thumbnail row */}
            <div className="flex gap-3 mt-4">
              {[1, 2, 3].map((imgIdx) => (
                <div
                  key={imgIdx}
                  className={`w-20 h-20 rounded-xl bg-muted cursor-pointer border-2 overflow-hidden transition-all duration-200 ${
                    imgIdx === 1
                      ? "border-primary shadow-[0_0_12px_rgba(82,96,250,0.35)]"
                      : "border-transparent opacity-50 hover:opacity-75 hover:border-border"
                  }`}
                >
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex flex-col">
            {/* Category badge */}
            <div className="mb-4">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] bg-primary/10 text-primary border border-primary/25">
                {product.category}
              </span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl font-normal text-foreground mb-4 leading-tight tracking-tight">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-primary tracking-tight">
                {formattedPrice}
              </span>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
              {product.description}
            </p>

            <div className="flex items-center gap-2 mb-6 py-3 border-y border-border">
              <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0" />
              <span className="text-sm text-muted-foreground">
                Available · Handcrafted to order · 2–5 business days
              </span>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center border border-border rounded-lg bg-card overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-3 py-2.5 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  data-ocid="product.qty_minus"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-5 py-2.5 font-semibold text-foreground min-w-[3rem] text-center">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty(qty + 1)}
                  className="px-3 py-2.5 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  data-ocid="product.qty_plus"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <Button
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold tracking-wide shadow-[0_0_24px_rgba(82,96,250,0.4)] hover:shadow-[0_0_32px_rgba(82,96,250,0.55)] transition-all duration-300"
                onClick={() => {
                  addToCart(product, qty);
                  toast.success(`${qty}× ${product.name} added to cart`);
                }}
                data-ocid="product.add_button"
              >
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full bg-card border border-border">
                <TabsTrigger
                  value="description"
                  className="flex-1 data-[state=active]:bg-primary/15 data-[state=active]:text-primary"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="specs"
                  className="flex-1 data-[state=active]:bg-primary/15 data-[state=active]:text-primary"
                >
                  Details
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="description"
                className="mt-4 text-sm text-muted-foreground leading-relaxed"
              >
                {product.description}
              </TabsContent>
              <TabsContent value="specs" className="mt-4">
                <dl className="space-y-0 text-sm">
                  {[
                    { label: "Category", value: product.category },
                    { label: "Availability", value: "In Stock" },
                    { label: "Collection", value: "SP Jewelry" },
                    { label: "Craftsmanship", value: "Handcrafted" },
                    { label: "Delivery", value: "2–5 business days" },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex justify-between py-2.5 border-b border-border last:border-0"
                    >
                      <dt className="text-muted-foreground">{label}</dt>
                      <dd className="font-medium text-foreground">{value}</dd>
                    </div>
                  ))}
                </dl>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-20 pt-12 border-t border-border">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-1">
                  From the same collection
                </p>
                <h2 className="font-display text-2xl text-foreground">
                  You May Also Love
                </h2>
              </div>
              <Link
                to="/catalog"
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {related.map((rel, idx) => (
                <motion.div
                  key={rel.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.08,
                    ease: "easeOut",
                  }}
                  className="bg-card rounded-xl border border-border overflow-hidden group hover:border-primary/30 hover:shadow-[0_6px_24px_rgba(0,0,0,0.4)] transition-all duration-300"
                  data-ocid={`product.related.${idx + 1}`}
                >
                  <Link to="/product/$id" params={{ id: rel.id }}>
                    <div className="aspect-square bg-muted overflow-hidden">
                      {rel.imageUrl ? (
                        <img
                          src={rel.imageUrl}
                          alt={rel.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Gem className="h-8 w-8 text-muted-foreground/30" />
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-[10px] text-primary font-semibold uppercase tracking-[0.15em] mb-1">
                        {rel.category}
                      </p>
                      <h3 className="font-display text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                        {rel.name}
                      </h3>
                      <p className="text-xs font-bold text-foreground mt-1">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(rel.price / 100)}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
