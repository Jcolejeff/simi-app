"use client";

import { Home, ShoppingCart, Heart, User } from "lucide-react";
import React, { useContext } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Each from "@/components/helpers/each";
import { Text } from "@/components/ui/text";

import useStore from "@/store";
import { CartContext } from "@/contexts/cart-context";
import useQueryCollectionByField from "@/hooks/useFirebaseFieldQuery";
function BottomNav() {
   const pathname = usePathname();
   const { loggedIn ,authDetails} = useStore((store) => store);
      const { currentCart, handleRemove } = useContext(CartContext);
 const { data: wishList, refetch } = useQueryCollectionByField(
      "wishlist",
      "userId",
      authDetails.id ?? "",
   );
   const allWishListItems = wishList ? wishList[0]?.items : [];
const links = [
   { id: 1, title: "Home", href: "/", icon: <Home className="w-10" /> },


   {
      id: 2, title: "Cart", href: "/shop/cart",
      
      icon:   <div  className="relative pr-2">
                 <ShoppingCart className="w-10" />
                  <span
                     className="absolute right-0 rounded-full bg-primary py-1 px-[0.5rem]"
                     style={{ top: "-5px" }}
                  >
                     <Text variant={"white"} size={"xs"} style={{ fontSize: "11px" }}>
                        {currentCart.length}
                     </Text>
                  </span>
               </div> 
   },
   {
      id: 3, title: "Wishlist", href:  loggedIn ? "/shop/wishlist" : "/account/signin",
      
      icon:  <div  className="relative pr-2">
              <Heart className="w-10" />
                  <span
                     className="absolute right-0 rounded-full bg-primary py-1 px-[0.5rem]"
                     style={{ top: "-5px" }}
                  >
                     <Text variant={"white"} size={"xs"} style={{ fontSize: "11px" }}>
                       {allWishListItems?.length ?? 0}
                     </Text>
                  </span>
               </div>  
   },
   {
      id: 4, title: "Account", href: loggedIn ? "/dashboard" : "/account/signin",
   
      icon: <User className="w-10" />
   },
];
   return (
      <div className="fixed bottom-0 z-[100] mt-3 flex w-full items-center justify-between border border-gray-100 bg-white p-4 shadow">
         <Each
            of={links}
            render={(item: any, index: number) => (
               <Link
                  className={`flex flex-1 flex-col ${pathname === item.href ? "text-primary-2" : "text-gray-700"} items-center justify-center gap-2`}
                  href={item.href}
               >
                  {item.icon}
                  <Text
                     className={pathname === item.href ? "text-primary-2" : "text-gray-700"}
                     size={"xs"}
                     weight={"medium"}
                  >
                     {item.title}
                  </Text>
               </Link>
            )}
         />
      </div>
   );
}

export default BottomNav;
