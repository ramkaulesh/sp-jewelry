import { Button } from "@/components/ui/button";
import { type DemoProduct, useApp } from "@/context/AppContext";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Lock, Package, RefreshCw, Truck } from "lucide-react";
import { motion } from "motion/react";

// ─── Home Page ────────────────────────────────────────────────────────────────

// ─── Category data ───────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    name: "Rings",
    image: "/assets/generated/category-rings.dim_600x400.jpg",
    seed: "ring-sp",
  },
  {
    name: "Necklaces",
    image: "/assets/generated/category-necklaces.dim_600x400.jpg",
    seed: "necklace-sp",
  },
  {
    name: "Bracelets",
    image: "/assets/generated/category-bracelets.dim_600x400.jpg",
    seed: "bracelet-sp",
  },
  {
    name: "Earrings",
    image: "/assets/generated/category-earrings.dim_600x400.jpg",
    seed: "earring-sp",
  },
  {
    name: "Pendants",
    image: "/assets/generated/category-pendants.dim_600x400.jpg",
    seed: "pendant-sp",
  },
  {
    name: "Sets",
    image: "/assets/generated/category-sets.dim_600x400.jpg",
    seed: "sets-sp",
  },
];

const TRUST_BADGES = [
  { icon: Truck, label: "Free Shipping", detail: "On orders over $200" },
  {
    icon: Package,
    label: "Authenticity Guaranteed",
    detail: "Certified genuine gemstones",
  },
  { icon: Lock, label: "Secure Checkout", detail: "256-bit SSL encryption" },
  { icon: RefreshCw, label: "30-Day Returns", detail: "Hassle-free returns" },
];

function formatPrice(cents: number): string {
  return `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

function ProductCard({
  product,
  index,
}: { product: DemoProduct; index: number }) {
  const { addToCart } = useApp();
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-cinematic transition-all duration-500"
      data-ocid={`featured_products.item.${index + 1}`}
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
      </div>
      <div className="p-5">
        <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">
          {product.category}
        </p>
        <h3 className="font-display text-lg text-foreground leading-snug mb-2 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-between mt-4">
          <span className="text-primary font-semibold text-lg">
            {formatPrice(product.price)}
          </span>
          <Button
            size="sm"
            onClick={() => addToCart(product)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            data-ocid={`featured_products.add_button.${index + 1}`}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default function HomePage() {
  const { products } = useApp();
  const featuredProducts = products.filter((p) => p.featured).slice(0, 6);

  return (
    <div className="bg-background">
      {/* ══════════════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-dvh flex items-center justify-center overflow-hidden"
        data-ocid="hero.section"
      >
        {/* Background image with cinematic overlay */}
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hero-jewelry.dim_1600x900.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/80 to-background/60" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 30% 50%, oklch(0.52 0.18 265 / 0.12) 0%, transparent 60%)",
            }}
          />
        </div>

        {/* Floating glow accent */}
        <div
          className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full pointer-events-none animate-glow-pulse"
          style={{
            background:
              "radial-gradient(circle, oklch(0.52 0.18 265 / 0.08) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, oklch(0.58 0.16 155 / 0.06) 0%, transparent 70%)",
            animation: "glow-pulse 4s ease-in-out infinite 2s",
          }}
        />

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="text-xs tracking-[0.35em] uppercase text-primary mb-6 font-medium">
              Est. Fine Jewellers
            </p>
            <h1 className="leading-none mb-3">
              <span
                className="block font-display italic text-primary"
                style={{
                  fontSize: "clamp(5rem, 15vw, 12rem)",
                  lineHeight: 0.9,
                }}
              >
                SP
              </span>
              <span
                className="block font-body tracking-[0.3em] uppercase text-foreground font-light"
                style={{
                  fontSize: "clamp(1.5rem, 5vw, 3.5rem)",
                  letterSpacing: "0.35em",
                }}
              >
                JEWELRY
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
            className="text-muted-foreground text-lg md:text-xl font-light tracking-wide mt-8 mb-10"
          >
            Timeless Elegance. Handcrafted Brilliance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/catalog">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 h-13 text-sm tracking-widest uppercase font-medium shadow-glow-sapphire transition-all duration-300"
                data-ocid="hero.primary_button"
              >
                Shop Collection
              </Button>
            </Link>
            <Link to="/store">
              <Button
                size="lg"
                variant="outline"
                className="border-foreground/30 text-foreground hover:bg-foreground/10 px-10 h-13 text-sm tracking-widest uppercase font-medium transition-all duration-300"
                data-ocid="hero.secondary_button"
              >
                Discover More
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
          data-ocid="hero.scroll_indicator"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 2 — FEATURED CATEGORIES
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="py-24 px-6 bg-muted/30"
        data-ocid="categories.section"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-3">
              Curated for You
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground italic">
              Explore Our Collections
            </h2>
            <div className="mt-4 mx-auto w-16 h-px bg-primary/50" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                data-ocid={`categories.item.${i + 1}`}
              >
                <Link
                  to="/catalog"
                  search={{ category: cat.name } as Record<string, string>}
                >
                  <div className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent group-hover:from-background/75 transition-all duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                      <span className="font-display text-foreground text-xl md:text-2xl italic">
                        {cat.name}
                      </span>
                      <span className="text-primary text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 3 — FEATURED PRODUCTS
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="py-24 px-6 bg-background"
        data-ocid="featured_products.section"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-accent mb-3">
              Handpicked
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground italic">
              Featured Pieces
            </h2>
            <div className="mt-4 mx-auto w-16 h-px bg-accent/50" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center mt-14"
          >
            <Link to="/catalog">
              <Button
                variant="outline"
                size="lg"
                className="border-border text-foreground hover:bg-card px-12 tracking-widest uppercase text-xs"
                data-ocid="featured_products.view_all_button"
              >
                View All Pieces
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 4 — BRAND STORY
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="py-24 px-6 bg-card border-y border-border"
        data-ocid="brand_story.section"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4">
                Our Heritage
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-foreground italic leading-tight mb-6">
                The Art of
                <br />
                SP Jewelry
              </h2>
              <div className="w-12 h-px bg-primary/50 mb-8" />
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                Each SP Jewelry piece is born from a reverence for the rare and
                the beautiful. Our master artisans hand-select every gemstone,
                setting only those that meet our exacting standards for colour,
                clarity, and luminosity.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-10">
                Crafted in 18k gold with time-honoured techniques and modern
                precision, every creation is a heirloom in the making — designed
                to be worn, treasured, and passed through generations.
              </p>
              <Link to="/catalog">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 tracking-widest uppercase text-xs shadow-glow-sapphire transition-all duration-300"
                  data-ocid="brand_story.shop_button"
                >
                  Explore the Collection
                </Button>
              </Link>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-cinematic">
                <img
                  src="/assets/generated/brand-story.dim_800x600.jpg"
                  alt="SP Jewelry artisan at work"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-background/40 to-transparent" />
              </div>
              {/* Floating accent badge */}
              <div className="absolute -bottom-6 -left-6 bg-background border border-border rounded-xl px-6 py-4 shadow-elevated">
                <p className="font-display italic text-primary text-2xl">18k</p>
                <p className="text-xs tracking-widest uppercase text-muted-foreground">
                  Gold Crafted
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 5 — TRUST BADGES
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="py-16 px-6 bg-background border-b border-border"
        data-ocid="trust_badges.section"
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {TRUST_BADGES.map((badge, i) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex flex-col items-center text-center gap-3"
                  data-ocid={`trust_badges.item.${i + 1}`}
                >
                  <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center bg-primary/10">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium text-sm">
                      {badge.label}
                    </p>
                    <p className="text-muted-foreground text-xs mt-1">
                      {badge.detail}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
