"use client";

import React, { useContext } from "react";
import Image from "next/image";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";

import CartTotal from "./cart-total";
import { CartContext } from "@/contexts/cart-context";
import EmptyContentWrapper from "@/hoc/EmptyContentWrapper";
import Link from "next/link";

function CartMobile() {
   const { currentCart, handleMinus, handlePlus, handleRemove,clearCart } = useContext(CartContext);

   return (
      <div className="my-5 block w-full bg-white p-4 md:hidden">
          <EmptyContentWrapper
               isEmpty={currentCart && currentCart?.length <= 0}
               customMessage="Empty Cart"
               className=" flex md:hidden h-full w-full items-center justify-center py-12 "
         >
             <>
          {currentCart &&
            currentCart.map((item: any) => (
               <div
                  className="flex w-full items-start justify-between border-b border-gray-300 px-3 py-5"
                  key={item.id}
               >
                  <div className="flex w-full  items-start gap-4">
                     <Image src={item.image} alt={item.name} width={50} height={50} />
                     <div>
                        {" "}
                        <Text size={"sm"} weight={"medium"} className="capitalize">
                           {item.name}
                        </Text>{" "}
                       
                        <Text size={"sm"}>₦{item.price.toLocaleString()}</Text>
                    
                        <div className="my-3">
                           <div className="flex w-fit items-center gap-2 rounded-full border border-gray-300 p-2">
                              <Button
                                 onClick={() => handleMinus(item)}
                                 className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-gray-200 text-black"
                              >
                                 <Minus className="w-4" />
                              </Button>
                              <Text size={"sm"} weight={"medium"}>
                                 {item.no_of_items}
                              </Text>
                              <Button
                                 onClick={() => handlePlus(item)}
                                 className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-gray-200 text-black"
                              >
                                 <Plus className="w-6 text-black" />
                              </Button>
                           </div>
                        </div>
                     </div>
                  </div>
                  <Button
                     onClick={() => handleRemove(item.id, item.chosenUnit)}
                     className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-200 text-black"
                  >
                     <X className="w-3" />
                  </Button>
               </div>
            ))}
                <div className="mt-5 flex w-full items-center justify-between px-4">
               <Link
                  href="/shop/categories"
                  className="rounded-3xl bg-[#7ab42c] px-5 py-2 text-xs text-white"
               >
                  Return to shop
               </Link>
               <Button
                  onClick={clearCart}
                  className="rounded-3xl bg-[#7ab42c] px-5 py-2 text-xs text-white"
               >
                  Clear Cart
               </Button>
            </div>
         <CartTotal /></>

            </EmptyContentWrapper>
        
      </div>
   );
}

export default CartMobile;
