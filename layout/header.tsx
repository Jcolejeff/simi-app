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
            <Show>
               <Show.When isTrue={!data?.isDurationPast && data?.showAnnouncement}>
                  <div className="w-full bg-gray-200 py-2">
                     {width ? (
                        <Marquee
                           direction="ltr"
                           scatterRandomly={false}
                           onInit={() => {}}
                           onFinish={() => {}}
                           resetAfterTries={1}
                           velocity={25}
                        >
                           <Text size={"xs"} weight={"medium"}>
                              {data?.announcementText}
                           </Text>
                           <Text size={"xs"} weight={"medium"}>
                              .
                           </Text>
                        </Marquee>
                     ) : (
                        <div className="my-1 flex items-center px-5">
                           <Text size={"xs"} weight={"medium"}>
                              {data?.announcementText}
                           </Text>
                        </div>
                     )}
                  </div>
               </Show.When>
            </Show>

            <main className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-4 py-4 md:px-0">
               <Button
                  className="block md:hidden"
                  variant={"ghost"}
                  size={"none"}
                  onClick={handleVisibility}
               >
                  <AlignJustify className="w-4" />
               </Button>
               <div className="hidden min-w-[24rem] items-center justify-between gap-8 md:flex">
                  <Link href={"/"}>
                     <Image src={logo} alt="mfa-logo" className="h-8 w-12" />
                  </Link>
                  <TopNav />
               </div>
               <Link href={"/"} className="block h-10 w-12 md:hidden">
                  <Image src={logo} alt="mfa-logo" className="h-full w-full" />
               </Link>
               {width && width > 1040 && (
                  <div className="flex items-center gap-4">
                     <div className="flex items-center gap-2">
                        <Link
                           href={"/shop/wishlist"}
                           className={cn("relative pr-2", loggedIn ? "block" : "hidden")}
                        >
                           <HeartIcon className="w-6" />

                           <span
                              className="absolute right-0 rounded-full bg-primary px-2"
                              style={{ top: "-5px" }}
                           >
                              <Text variant={"white"} size={"xs"} style={{ fontSize: "10px" }}>
                                 {allWishListItems?.length}
                              </Text>
                           </span>
                        </Link>
                        <Separator orientation="vertical" />
                        <div className="flex items-center justify-start gap-4">
                           {/* <ShoppingCart /> */}
                           <ShoppingCartDropdown />
                           <span className="flex flex-col">
                              <Text size={"xs"}>Shopping cart</Text>
                              <Text weight={"bold"} size={"xs"}>
                                 ₦{calculateTotalPrice(currentCart).toLocaleString() || 0}
                              </Text>
                           </span>
                        </div>
                     </div>

                     {loggedIn ? (
                        <ProfileIconDropdown />
                     ) : (
                        <div className="flex">
                           <Link
                              style={{ marginLeft: "50px" }}
                              className="text-xs font-medium text-gray-600 hover:underline"
                              href={"/account/signin"}
                           >
                              Login
                           </Link>
                           <Link
                              style={{ marginLeft: "3px" }}
                              className="text-xs font-medium text-gray-600 hover:underline"
                              href={"/account/register"}
                           >
                              / Register
                           </Link>
                        </div>
                     )}
                  </div>
               )}

               {width && width <= 1040 && <ShoppingCart />}
            </main>
         </section>
      </div>
   );
};

export default Header;
