import { Link, Outlet, useRouter } from "@tanstack/react-router";
import { Gem, Menu, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function StorefrontLayout() {
  const { cartCount } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = router.state.location.pathname;
  const isLandingPage = pathname === "/" || pathname.startsWith("/#");

  const navLinks = [
    { to: "/catalog", label: "Collections" },
    { to: "/store", label: "Our Story" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Main Header */}
      {!isLandingPage && (
        <header className="sticky top-0 z-40 bg-card border-b border-border/40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
            {/* Logo */}
            <Link
              to="/store"
              className="flex items-center gap-2.5 flex-shrink-0 group"
              data-ocid="storefront.home.link"
            >
              <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                <Gem className="h-4 w-4 text-primary" />
              </div>
              <span className="font-display text-lg font-semibold tracking-wide text-foreground group-hover:text-primary transition-colors">
                SP Jewelry
              </span>
            </Link>

            {/* Center Nav — desktop */}
            <nav
              className="hidden md:flex items-center gap-1"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm px-4 py-2 rounded-md font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors tracking-wide"
                  data-ocid={`storefront.${link.label.toLowerCase().replace(/ /g, "_")}.link`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-1">
              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2.5 hover:bg-muted/40 rounded-lg transition-colors text-muted-foreground hover:text-foreground flex items-center"
                aria-label={`Cart — ${cartCount} items`}
                data-ocid="storefront.cart.button"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-5 w-5 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile menu toggle */}
              <button
                type="button"
                className="md:hidden p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/40 transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                data-ocid="storefront.mobile_menu.toggle"
              >
                {menuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Nav Drawer */}
          {menuOpen && (
            <div className="md:hidden border-t border-border/40 bg-card px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm px-4 py-3 rounded-md font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors tracking-wide"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </header>
      )}

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      {!isLandingPage && (
        <footer className="bg-card border-t border-border/40 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
              {/* Brand */}
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                    <Gem className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-display text-lg font-semibold text-foreground">
                    SP Jewelry
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                  Exquisite gemstones and hand-crafted precious metals. Each
                  piece is a testament to artistry and devotion.
                </p>
              </div>

              {/* Collections */}
              <div className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Collections
                </h3>
                <nav
                  className="flex flex-col gap-2"
                  aria-label="Footer collections"
                >
                  <Link
                    to="/catalog"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-ocid="footer.catalog.link"
                  >
                    All Jewelry
                  </Link>
                  <Link
                    to="/catalog"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Rings
                  </Link>
                  <Link
                    to="/catalog"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Necklaces
                  </Link>
                  <Link
                    to="/catalog"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Bracelets
                  </Link>
                </nav>
              </div>

              {/* Info */}
              <div className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  About
                </h3>
                <nav className="flex flex-col gap-2" aria-label="Footer about">
                  <Link
                    to="/store"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-ocid="footer.about.link"
                  >
                    Our Story
                  </Link>
                  <Link
                    to="/store"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Craftsmanship
                  </Link>
                  <Link
                    to="/store"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Sustainability
                  </Link>
                </nav>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-border/30 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-muted-foreground">
                &copy; {new Date().getFullYear()} SP Jewelry. All rights
                reserved.
              </p>
              <p className="text-xs text-muted-foreground">
                Built with love using{" "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors underline underline-offset-2"
                >
                  caffeine.ai
                </a>
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
