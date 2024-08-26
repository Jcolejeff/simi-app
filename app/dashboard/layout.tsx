"use client";

import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Text } from "@/components/ui/text";
import useStore from "@/store";
import { Metadata } from "next";

// would handle some auth checks for authenticated users

export default function AuthLayout({ children }: { children: React.ReactNode }) {
   const { authDetails, loggedIn } = useStore((store) => store);
   const router = useRouter();

   useEffect(() => {
      if (!loggedIn) {
         router.push("/account/signin");
      }
   }, [loggedIn]);

   if (!loggedIn) {
      return <></>;
   }
   return (
      <div>
         <head>
            <title>Dashboard | MyFoodAngels</title>
            <meta
               name="description"
               content="Manage your account, orders, and subscriptions on MyFoodAngels. View your order history, track your deliveries, and manage your subscriptions."
            />
            <meta name="generator" content="Next.js" />
            <meta name="application-name" content="MyFoodAngels" />
            <meta name="referrer" content="origin-when-cross-origin" />
            <meta
               name="keywords"
               content="Dashboard, MyFoodAngels, Account, Orders, Subscriptions, Order History, Track Deliveries, Manage Subscriptions"
            />
            <meta name="author" content="MyFoodAngels" />
            <meta name="creator" content="MyFoodAngels" />
            <meta name="publisher" content="MyFoodAngels" />
            <meta name="format-detection" content="email=no, address=no, telephone=no" />

            <meta property="og:title" content="Dashboard | MyFoodAngels" />
            <meta
               property="og:description"
               content="Manage your account, orders, and subscriptions on MyFoodAngels. View your order history, track your deliveries, and manage your subscriptions."
            />
            <meta property="og:url" content="https://myfoodangels.com/dashboard" />
            <meta property="og:site_name" content="MyFoodAngels" />
            <meta property="og:image" content="/images/og.jpg" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />

            <link rel="icon" href="/fav.svg" />
         </head>

         {children}
      </div>
   );
}
