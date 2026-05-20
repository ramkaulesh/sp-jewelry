import { Button } from "@/components/ui/button";
import { Search, ShoppingBag, SlidersHorizontal } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useApp } from "../../context/AppContext";
import {
  type DemoProduct,
  JEWELRY_CATEGORIES,
  type JewelryCategory,
} from "../../data/demoData";

type SortBy = "featured" | "price-asc" | "price-desc" | "newest";

const formatPrice = (cents: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    cents / 100,
  );

const TRUST_BADGES = [
  { icon: "✦", label: "Handcrafted Quality" },
  { icon: "✦", label: "Free Shipping Over $100" },
  { icon: "✦", label: "Secure Checkout" },
  { icon: "✦", label: "30-Day Returns" },
];

interface ProductCardProps {
  product: DemoProduct;
  index: number;
  onAddToCart: (product: DemoProduct) => void;
}

function ProductCard({ product, index, onAddToCart }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    setIsAdding(true);
    onAddToCart(product);
    setTimeout(() => setIsAdding(false), 700);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: Math.min(index * 0.05, 0.4),
        ease: "easeOut",
      }}
      className="group bg-card border border-border rounded-2xl overflow-hidden flex flex-col hover:border-primary/40 hover:shadow-lg transition-all duration-300"
      data-ocid={`shop.product.item.${index + 1}`}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        {!imageError && product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-5xl opacity-30">💎</div>
          </div>
        )}

        {product.featured && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider">
            Featured
          </div>
        )}

        {/* Quick add overlay on hover */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-3">
          <Button
            type="button"
            onClick={handleAdd}
            disabled={isAdding}
            className="w-full h-9 text-xs font-semibold gap-2 bg-primary text-primary-foreground hover:opacity-90 transition-opacity rounded-xl"
            data-ocid={`shop.product.add_button.${index + 1}`}
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            {isAdding ? "Added!" : "Add to Cart"}
          </Button>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">
            {product.category}
          </p>
          <h3 className="font-display font-semibold text-foreground text-sm leading-snug line-clamp-2">
            {product.name}
          </h3>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-base font-bold text-foreground">
            {formatPrice(product.price)}
          </span>
          <Button
            type="button"
            size="sm"
            onClick={handleAdd}
            disabled={isAdding}
            className="h-8 px-3 text-xs font-semibold gap-1.5 bg-primary text-primary-foreground hover:opacity-90 transition-opacity rounded-lg"
            data-ocid={`shop.product.quick_add.${index + 1}`}
          >
            <ShoppingBag className="h-3 w-3" />
            Add
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

export default function StorefrontShopPage() {
  const { products, addToCart } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    JewelryCategory | "All"
  >("All");
  const [sortBy, setSortBy] = useState<SortBy>("featured");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result: DemoProduct[] = products;

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }

    switch (sortBy) {
      case "price-asc":
        return [...result].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...result].sort((a, b) => b.price - a.price);
      case "newest":
        return [...result].reverse();
      default:
        return [...result].sort((a, b) =>
          a.featured === b.featured ? 0 : a.featured ? -1 : 1,
        );
    }
  }, [products, selectedCategory, searchQuery, sortBy]);

  const handleAddToCart = (product: DemoProduct) => {
    addToCart(product);
    toast.success(`${product.name} added to cart`, {
      icon: "✨",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ─── Hero Banner ─── */}
      <section className="relative overflow-hidden bg-card border-b border-border">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background opacity-90" />
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, oklch(0.6 0.18 280) 0%, transparent 60%), radial-gradient(circle at 80% 20%, oklch(0.55 0.14 150) 0%, transparent 50%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-primary mb-4">
              SP Jewelry Collection
            </p>
            <h1
              className="font-display font-bold text-foreground leading-tight tracking-tight mb-5"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
            >
              Our Collections
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
              Timeless Elegance, Crafted for You
            </p>
          </motion.div>
        </div>

        <div className="absolute top-8 left-12 w-2 h-2 rounded-full bg-primary/30 animate-pulse" />
        <div
          className="absolute bottom-12 right-16 w-3 h-3 rounded-full bg-primary/20 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 right-8 w-1.5 h-1.5 rounded-full bg-primary/25 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        />
      </section>

      {/* ─── Filters & Search Bar ─── */}
      <section className="sticky top-0 z-20 bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 py-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search jewelry..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                data-ocid="shop.search_input"
              />
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortBy)}
                className="py-2.5 px-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
                data-ocid="shop.sort.select"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm hover:bg-muted transition-colors"
              data-ocid="shop.filters.toggle"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filter
            </button>

            <span className="hidden md:block text-xs text-muted-foreground ml-auto whitespace-nowrap">
              {filteredProducts.length} piece
              {filteredProducts.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="pb-4">
            <div
              className="flex items-center gap-2 overflow-x-auto"
              data-ocid="shop.category.list"
            >
              <button
                type="button"
                onClick={() => setSelectedCategory("All")}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border transition-colors ${
                  selectedCategory === "All"
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:border-primary hover:text-foreground"
                }`}
                data-ocid="shop.category.all"
              >
                All
              </button>

              {JEWELRY_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() =>
                    setSelectedCategory(cat.name as JewelryCategory)
                  }
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border transition-colors ${
                    selectedCategory === cat.name
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-muted-foreground border-border hover:border-primary hover:text-foreground"
                  }`}
                  data-ocid={`shop.category.${cat.id}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {showFilters && (
            <div className="sm:hidden pb-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortBy)}
                className="w-full py-2 px-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none"
                data-ocid="shop.sort.select.mobile"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          )}
        </div>
      </section>

      {/* ─── Product Grid ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {filteredProducts.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-24 text-center"
            data-ocid="shop.empty_state"
          >
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <ShoppingBag className="h-7 w-7 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              No pieces found
            </h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Try adjusting your search or category filters to discover our
              collections.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-5 px-5 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
              data-ocid="shop.empty_state.reset_button"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            data-ocid="shop.product.list"
          >
            {filteredProducts.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </section>

      {/* ─── Bottom Banner ─── */}
      <section className="bg-muted/40 border-t border-border py-14">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
            SP Jewelry Promise
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
            Every Piece, A Story
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Each creation is hand-selected for its exceptional quality,
            artistry, and timeless beauty. We believe fine jewelry is more than
            adornment — it is memory made tangible.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {TRUST_BADGES.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 text-muted-foreground text-sm"
              >
                <span className="text-primary">{badge.icon}</span>
                <span className="font-medium text-foreground">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
