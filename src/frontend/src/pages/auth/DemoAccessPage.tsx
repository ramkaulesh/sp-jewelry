import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@tanstack/react-router";
import { Gem, ShoppingBag, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export default function DemoAccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-16 relative overflow-hidden bg-background">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,oklch(0.45_0.18_264/0.15)_0%,transparent_70%)]" />

      <div className="relative w-full max-w-xl mb-10">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          data-ocid="demo.back.link"
        >
          <span>←</span>
          <span>Back to home</span>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="relative text-center mb-12 max-w-xl"
      >
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-primary shadow-lg">
            <Gem className="h-6 w-6 text-primary-foreground" />
          </div>
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-5xl tracking-tight mb-4 text-foreground">
          SP Jewelry
        </h1>
        <p className="text-base text-muted-foreground max-w-sm mx-auto">
          Discover our curated collection of fine jewelry — crafted for every
          occasion.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, delay: 0.1, ease: "easeOut" }}
        className="relative w-full max-w-sm flex flex-col gap-4 mb-10"
      >
        <Link to="/store" data-ocid="demo.shop.primary_button">
          <Button className="w-full h-12 text-base font-semibold gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <ShoppingBag className="h-5 w-5" />
            Browse the Collection
          </Button>
        </Link>
        <Link to="/catalog" data-ocid="demo.catalog.button">
          <Button
            variant="outline"
            className="w-full h-12 text-base font-semibold gap-2"
          >
            <Sparkles className="h-5 w-5" />
            View All Jewelry
          </Button>
        </Link>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.2, ease: "easeOut" }}
        className="relative text-xs text-center text-muted-foreground"
      >
        © {new Date().getFullYear()} SP Jewelry. All rights reserved.
      </motion.p>
    </div>
  );
}
