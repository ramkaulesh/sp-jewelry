import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import AccountLayout from "./components/AccountLayout";
import AdminLayout from "./components/AdminLayout";
import StorefrontLayout from "./components/StorefrontLayout";
import { AppProvider } from "./context/AppContext";
import AccountBookings from "./pages/account/AccountBookings";
import AccountDashboard from "./pages/account/AccountDashboard";
import AccountInvoices from "./pages/account/AccountInvoices";
import AccountLoyalty from "./pages/account/AccountLoyalty";
import AccountOrders from "./pages/account/AccountOrders";
import AccountQuotes from "./pages/account/AccountQuotes";
import AccountSettings from "./pages/account/AccountSettings";
import AccountSupport from "./pages/account/AccountSupport";
import AccountWishlist from "./pages/account/AccountWishlist";
import AnalyticsPage from "./pages/admin/AnalyticsPage";
import CustomersPage from "./pages/admin/CustomersPage";
import DashboardPage from "./pages/admin/DashboardPage";
import EventsPage from "./pages/admin/EventsPage";
import FinancePage from "./pages/admin/FinancePage";
import InvoicesPage from "./pages/admin/InvoicesPage";
import MarketingPage from "./pages/admin/MarketingPage";
import OrdersPage from "./pages/admin/OrdersPage";
import ProductsPage from "./pages/admin/ProductsPage";
import SettingsPage from "./pages/admin/SettingsPage";
import StaffPage from "./pages/admin/StaffPage";
import SupportPage from "./pages/admin/SupportPage";
import DemoAccessPage from "./pages/auth/DemoAccessPage";

import CartPage from "./pages/storefront/CartPage";
import CatalogPage from "./pages/storefront/CatalogPage";
import CheckoutPage from "./pages/storefront/CheckoutPage";
import HomePage from "./pages/storefront/HomePage";
import ProductDetailPage from "./pages/storefront/ProductDetailPage";
import QuotePage from "./pages/storefront/QuotePage";
import StorefrontShopPage from "./pages/storefront/StorefrontShopPage";

const rootRoute = createRootRoute({ component: () => <Outlet /> });

// Storefront
const storefrontRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "storefront",
  component: StorefrontLayout,
});
const homeRoute = createRoute({
  getParentRoute: () => storefrontRoute,
  path: "/",
  component: HomePage,
});
const storeRoute = createRoute({
  getParentRoute: () => storefrontRoute,
  path: "/store",
  component: StorefrontShopPage,
});
const catalogRoute = createRoute({
  getParentRoute: () => storefrontRoute,
  path: "/catalog",
  component: CatalogPage,
});
const productRoute = createRoute({
  getParentRoute: () => storefrontRoute,
  path: "/product/$id",
  component: ProductDetailPage,
});
const cartRoute = createRoute({
  getParentRoute: () => storefrontRoute,
  path: "/cart",
  component: CartPage,
});
const checkoutRoute = createRoute({
  getParentRoute: () => storefrontRoute,
  path: "/checkout",
  component: CheckoutPage,
});
const quoteRoute = createRoute({
  getParentRoute: () => storefrontRoute,
  path: "/quote",
  component: QuotePage,
});
const loginRoute = createRoute({
  getParentRoute: () => storefrontRoute,
  path: "/login",
  component: DemoAccessPage,
});
const registerRoute = createRoute({
  getParentRoute: () => storefrontRoute,
  path: "/register",
  component: DemoAccessPage,
});
const demoRoute = createRoute({
  getParentRoute: () => storefrontRoute,
  path: "/demo",
  component: DemoAccessPage,
});

// Admin
const adminLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminLayout,
});
const adminIndexRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/",
  component: DashboardPage,
});
const adminOrdersRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/orders",
  component: OrdersPage,
});
const adminProductsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/products",
  component: ProductsPage,
});
const adminCustomersRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/customers",
  component: CustomersPage,
});
const adminInvoicesRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/invoices",
  component: InvoicesPage,
});
const adminFinanceRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/finance",
  component: FinancePage,
});
const adminEventsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/events",
  component: EventsPage,
});
const adminMarketingRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/marketing",
  component: MarketingPage,
});
const adminAnalyticsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/analytics",
  component: AnalyticsPage,
});
const adminStaffRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/staff",
  component: StaffPage,
});
const adminSupportRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/support",
  component: SupportPage,
});
const adminSettingsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/settings",
  component: SettingsPage,
});

// Account
const accountLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/account",
  component: AccountLayout,
});
const accountIndexRoute = createRoute({
  getParentRoute: () => accountLayoutRoute,
  path: "/",
  component: AccountDashboard,
});
const accountOrdersRoute = createRoute({
  getParentRoute: () => accountLayoutRoute,
  path: "/orders",
  component: AccountOrders,
});
const accountInvoicesRoute = createRoute({
  getParentRoute: () => accountLayoutRoute,
  path: "/invoices",
  component: AccountInvoices,
});
const accountQuotesRoute = createRoute({
  getParentRoute: () => accountLayoutRoute,
  path: "/quotes",
  component: AccountQuotes,
});
const accountBookingsRoute = createRoute({
  getParentRoute: () => accountLayoutRoute,
  path: "/bookings",
  component: AccountBookings,
});
const accountLoyaltyRoute = createRoute({
  getParentRoute: () => accountLayoutRoute,
  path: "/loyalty",
  component: AccountLoyalty,
});
const accountSettingsRoute = createRoute({
  getParentRoute: () => accountLayoutRoute,
  path: "/settings",
  component: AccountSettings,
});
const accountSupportRoute = createRoute({
  getParentRoute: () => accountLayoutRoute,
  path: "/support",
  component: AccountSupport,
});
const accountWishlistRoute = createRoute({
  getParentRoute: () => accountLayoutRoute,
  path: "/wishlist",
  component: AccountWishlist,
});

const routeTree = rootRoute.addChildren([
  storefrontRoute.addChildren([
    homeRoute,
    storeRoute,
    catalogRoute,
    productRoute,
    cartRoute,
    checkoutRoute,
    quoteRoute,
    loginRoute,
    registerRoute,
    demoRoute,
  ]),
  adminLayoutRoute.addChildren([
    adminIndexRoute,
    adminOrdersRoute,
    adminProductsRoute,
    adminCustomersRoute,
    adminInvoicesRoute,
    adminFinanceRoute,
    adminEventsRoute,
    adminMarketingRoute,
    adminAnalyticsRoute,
    adminStaffRoute,
    adminSupportRoute,
    adminSettingsRoute,
  ]),
  accountLayoutRoute.addChildren([
    accountIndexRoute,
    accountOrdersRoute,
    accountInvoicesRoute,
    accountQuotesRoute,
    accountBookingsRoute,
    accountLoyaltyRoute,
    accountSettingsRoute,
    accountSupportRoute,
    accountWishlistRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </AppProvider>
  );
}
