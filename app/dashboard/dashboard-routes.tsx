import { User } from "lucide-react";

export const dashboardRoutes: { id: number; title: string; href: string; icon?: any }[] = [
   { id: 1, title: "Profile", href: "/dashboard", icon: <User /> },
   // { id: 2, title: "Pre-orders", href: "/dashboard/pre-orders" },
   { id: 3, title: "Order History", href: "/dashboard/order-history" },
   // { id: 4, title: "Subscriptions", href: "/dashboard/dashboard" },
   // { id: 5, title: "Downloads", href: "/dashboard/dashboard" },
   { id: 6, title: "My Wallet", href: "/dashboard/wallet" },
   { id: 7, title: "Referral Code", href: "/dashboard/referral-code" },
   { id: 8, title: "Coupons", href: "/dashboard/coupons" },
   // { id: 9, title: "Payment Methods", href: "/dashboard/payment-methods" },
   { id: 10, title: "Settings", href: "/dashboard/settings" },
];
