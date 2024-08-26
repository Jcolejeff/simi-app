"use client";

import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { CartContext } from "@/contexts/cart-context";
import { calculateTotalPrice } from "../../../helper";
import Link from "next/link";

function CartTotal() {
   const { currentCart } = useContext(CartContext);

   return (
      <div className="mt-6 w-full bg-white p-4">
         <Text size={"lg"} weight={"medium"}>
            Cart Total
         </Text>
         <div className="mt-3 flex items-center justify-between">
            <Text size={"sm"} weight={"medium"}>
               Subtotal:
            </Text>
            <Text size={"sm"} weight={"medium"}>
               ₦{calculateTotalPrice(currentCart).toLocaleString()}
            </Text>
         </div>
         {/* <div className="mt-3 flex items-center justify-between">
            <Text size={"sm"} weight={"medium"}>
               Shipping:
            </Text>
            <Text size={"sm"} weight={"medium"}>
               Free
            </Text>
         </div> */}
         <div className="mt-3 flex items-center justify-between">
            <Text size={"sm"} weight={"medium"}>
               Total:
            </Text>
            <Text size={"sm"} weight={"medium"}>
               ₦{calculateTotalPrice(currentCart).toLocaleString()}
            </Text>
         </div>
         <div className="my-4 flex w-full items-center justify-center">
            <Link
               href={"/shop/checkout"}
               className="mb-3 mt-5 w-full rounded-3xl bg-[#7ab42c] px-4 py-2 text-center text-xs text-white"
            >
               Proceed to checkout
            </Link>
         </div>
         {/* <Text size={"sm"} weight={"medium"}>
            Have a coupon code?
         </Text> */}
         {/* <div className="mt-5 flex w-full items-center justify-between overflow-hidden rounded-full border border-gray-300 p-1">
            <input
               type="text"
               placeholder="Coupon code"
               className="border-none pl-2 text-xs outline-none focus:ring-0"
            />
            <Button className="rounded-3xl bg-black px-5 text-xs text-white">Apply</Button>
         </div> */}
      </div>
   );
}

export default CartTotal;
