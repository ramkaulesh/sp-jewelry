import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Grid,
  List,
  Search,
  ShoppingCart,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useApp } from "../../context/AppContext";

export default function CatalogPage() {
  const { products, addToCart } = useApp();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");
  const [view, setView] = useState<"grid" | "list">("grid");

  const categories = [
    "all",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const filtered = products
    .filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "all" || p.category === category;
      return matchSearch && matchCat;
    })
    .sort((a, b) => {
      if (sort === "price_asc") return a.price - b.price;
      if (sort === "price_desc") return b.price - a.price;
      if (sort === "featured")
        return a.featured === b.featured ? 0 : a.featured ? -1 : 1;
      return 0;
    });

  const formatPrice = (cents: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(cents / 100);

  return (
    <div className="bg-background min-h-screen">
      {/* Cinematic page header */}
      <div className="relative bg-card border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-2">
              SP Jewelry · Fine Collection
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-2 tracking-tight">
              Our Collections
            </h1>
            <p className="text-muted-foreground text-sm">
              {filtered.length} of {products.length} exquisite pieces
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Category filter pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              data-ocid={`catalog.filter.${c}`}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase border transition-all duration-200 ${
                category === c
                  ? "bg-primary/15 text-primary border-primary/40 shadow-[0_0_12px_rgba(82,96,250,0.25)]"
                  : "bg-transparent text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
              }`}
            >
              {c === "all" ? "All Pieces" : c}
            </button>
          ))}
        </div>

        {/* Filters row */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search the collection…"
              className="pl-9 bg-card border-border placeholder:text-muted-foreground/50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-ocid="catalog.search_input"
            />
          </div>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger
              className="w-full sm:w-44 bg-card border-border"
              data-ocid="catalog.sort.select"
            >
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="featured">Featured First</SelectItem>
              <SelectItem value="price_asc">Price: Low → High</SelectItem>
              <SelectItem value="price_desc">Price: High → Low</SelectItem>
            </SelectContent>
          </Select>
          {/* View toggle */}
          <div className="flex border border-border rounded-lg overflow-hidden bg-card">
            <button
              type="button"
              onClick={() => setView("grid")}
              data-ocid="catalog.view_grid.toggle"
              className={`px-3 py-2 transition-colors ${
                view === "grid"
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label="Grid view"
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setView("list")}
              data-ocid="catalog.view_list.toggle"
              className={`px-3 py-2 transition-colors ${
                view === "list"
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label="List view"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div
            className="text-center py-24 text-muted-foreground"
            data-ocid="catalog.empty_state"
          >
            <Search className="h-14 w-14 mx-auto mb-4 opacity-20" />
            <p className="font-semibold text-lg mb-1">No pieces found</p>
            <p className="text-sm">Try adjusting your search or filter.</p>
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
            {filtered.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: Math.min(idx * 0.05, 0.3),
                  ease: "easeOut",
                }}
                className="bg-card rounded-2xl border border-border overflow-hidden group hover:shadow-[0_8px_32px_rgba(0,0,0,0.45)] hover:border-primary/30 transition-all duration-300 flex flex-col"
                data-ocid={`catalog.item.${idx + 1}`}
              >
                {/* Image */}
                <Link
                  to="/product/$id"
                  params={{ id: product.id }}
                  className="relative block"
                >
                  <div className="aspect-square bg-muted relative overflow-hidden">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Sparkles className="h-10 w-10 text-muted-foreground/30" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {product.featured && (
                      <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase text-primary-foreground bg-primary z-10">
                        Featured
                      </div>
                    )}
                  </div>
                </Link>

                {/* Info */}
                <div className="p-4 flex flex-col flex-1">
                  <p className="text-[10px] text-primary font-semibold uppercase tracking-[0.15em] mb-1.5">
                    {product.category}
                  </p>
                  <Link to="/product/$id" params={{ id: product.id }}>
                    <h3 className="font-display text-foreground text-base leading-snug mb-1.5 hover:text-primary transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-4 flex-1 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-foreground text-base tracking-tight">
                      {formatPrice(product.price)}
                    </span>
                    <Link
                      to="/product/$id"
                      params={{ id: product.id }}
                      className="text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                    >
                      View <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(product);
                      toast.success(`${product.name} added to cart`);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold tracking-wide text-primary-foreground bg-primary hover:bg-primary/90 transition-all duration-200 shadow-[0_0_16px_rgba(82,96,250,0.3)] hover:shadow-[0_0_22px_rgba(82,96,250,0.45)]"
                    data-ocid={`catalog.add_button.${idx + 1}`}
                  >
                    <ShoppingCart className="h-3.5 w-3.5" />
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* List view */
          <div className="space-y-3">
            {filtered.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.3,
                  delay: Math.min(idx * 0.04, 0.25),
                  ease: "easeOut",
                }}
                className="bg-card border border-border rounded-xl overflow-hidden flex items-stretch hover:border-primary/30 hover:shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-200"
                data-ocid={`catalog.item.${idx + 1}`}
              >
                <Link
                  to="/product/$id"
                  params={{ id: product.id }}
                  className="w-28 sm:w-36 flex-shrink-0 bg-muted overflow-hidden"
                >
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Sparkles className="h-8 w-8 text-muted-foreground/30" />
                    </div>
                  )}
                </Link>
                <div className="flex flex-1 items-center gap-4 px-5 py-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-primary font-semibold uppercase tracking-[0.15em] mb-0.5">
                      {product.category}
                    </p>
                    <Link to="/product/$id" params={{ id: product.id }}>
                      <h3 className="font-display text-foreground text-sm hover:text-primary transition-colors line-clamp-1 mb-0.5">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {product.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="font-bold text-foreground text-sm">
                      {formatPrice(product.price)}
                    </span>
                    <Button
                      size="sm"
                      className="text-primary-foreground h-8 px-3 text-xs bg-primary hover:bg-primary/90"
                      onClick={() => {
                        addToCart(product);
                        toast.success(`${product.name} added to cart`);
                      }}
                      data-ocid={`catalog.add_button.${idx + 1}`}
                    >
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
