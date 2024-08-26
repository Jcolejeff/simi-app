"use client";
import { HeartIcon, AlignJustify, ShoppingBag } from "lucide-react";
import React, { useContext, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { Show } from "@/components/helpers/show";
import { Separator } from "@/components/ui/separator";

import { useUserContext } from "@/contexts/user-context";
import useWindowDimensions from "@/hooks/useWindowDimensions";

import ProfileIconDropdown from "../components/dashboard/profile-icon-dropdown";
import { Button } from "../components/ui/button";
import { Text } from "../components/ui/text";
import logo from "../public/images/home/logo.png";

import { MobileNav } from "./components/mobile-nav";
import ShoppingCart from "./components/shopping-cart";
import { TopNav } from "./components/top-nav";
import Marquee from "react-marquee-slider";
import useStore from "@/store";
import { CartContext } from "@/contexts/cart-context";
import { calculateTotalPrice } from "@/app/helper";
import useAnnouncement from "@/app/shop/hooks/announcement/announcement";
import ShoppingCartDropdown from "./components/shopping-cart-dropdown";
import useQueryCollectionByField from "@/hooks/useFirebaseFieldQuery";
import { cn } from "@/lib/utils";
const Header = () => {
   const { loggedIn, authDetails } = useStore((store) => store);
   const { data: info } = useAnnouncement();
   const data = info ? info[0] : {};

   const { currentCart } = useContext(CartContext);
   const amount = Number(calculateTotalPrice(currentCart));

   const { width } = useWindowDimensions();
   const { data: wishList, refetch } = useQueryCollectionByField(
      "wishlist",
      "userId",
      authDetails.id ?? "",
   );

   const allWishListItems = wishList ? wishList[0]?.items : [];
   const [isVisible, setIsVisible] = useState<boolean>(false);

   const handleVisibility = () => {
      setIsVisible(!isVisible);
   };

   return (
      <div
         className="fixed top-0 z-40 w-full"
         style={{
            zIndex: 10,
         }}
      >
         <Show>
            <Show.When isTrue={isVisible}>
               <MobileNav handleVisibility={handleVisibility} />
            </Show.When>
         </Show>
         <section className="w-full bg-white shadow">
            

            <main className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-4 py-4 md:px-0">
               <Button
                  className="block md:hidden"
                  variant={"ghost"}
                  size={"none"}
                  onClick={handleVisibility}
               >
                  <AlignJustify className="w-8 h-8" />
               </Button>
               <div className="hidden min-w-[24rem] items-center justify-between gap-8 md:flex">
                  <Link href={"/"}>
                     <Image src={logo} alt="mfa-logo" className="h-12 w-12" />
                  </Link>
                  <TopNav />
               </div>
               <Link href={"/"} className="block h-12 w-12 md:hidden">
                  <Image src={logo} alt="mfa-logo" className="h-full w-full" />
               </Link>
              

            </main>
         </section>
      </div>
   );
};

export default Header;
