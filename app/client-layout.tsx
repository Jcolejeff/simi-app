"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import Newsletter from "@/components/shared/newsletter";

import UserProvider, { useUserContext } from "@/contexts/user-context";
import WorkspaceProvider from "@/contexts/workspace-context";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import Footer from "@/layout/footer";
import Header from "@/layout/header";
import Topbar from "@/layout/topbar";
import { CartProvider } from "@/contexts/cart-context";
import algoliasearch from "algoliasearch/lite";
import useSections from "./shop/hooks/sections/sections";
import useStore from "@/store";
import { InstantSearch, SearchBox, Hits, Highlight, Configure } from "react-instantsearch";
const searchClient = algoliasearch("7IGIHUZ06I", "60c379c16c8524fa0a2c6ceb105b824a");

import "./globals.css";

export default function RootClientLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const { width } = useWindowDimensions();
   const { data: info } = useSections();
   const { setShowFarmOffTakesForAll, setShowFlashSalesForAll } = useStore();
   const data = info ? info[0] : {};
   useEffect(() => {
      setShowFarmOffTakesForAll(data?.showOfftakes as boolean);
      setShowFlashSalesForAll(data?.showFlashSales as boolean);
   }, [info]);
   return (
      <InstantSearch searchClient={searchClient} indexName="products">
         <CartProvider>
            <main className="min-h-screen">
               <Header />
               {children}
               {width && width > 768 && <Newsletter />}
               <Footer />
            </main>
         </CartProvider>
      </InstantSearch>
   );
}
