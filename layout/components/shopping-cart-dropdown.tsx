"use client";
import { ChevronDown, MenuIcon } from "lucide-react";

import { ShoppingBag, X } from "lucide-react";
import React, { useContext } from "react";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";

import { CartContext } from "@/contexts/cart-context";

import { calculateTotalPrice } from "@/app/helper";
import Each from "@/components/helpers/each";
import { useRouter } from "next/navigation";

import { useUserContext } from "@/contexts/user-context";
import useStore from "@/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dropdown } from "@/components/ui/dropdown-menu";
import useQueryCollectionByField from "@/hooks/useFirebaseFieldQuery";

// should infer current user avatar from a useCurrentUserContext()
const ShoppingCartDropdown = ({ children }: { children?: React.ReactNode }) => {
   const { authDetails, setLoggedIn, setCurrentUser, setAuthDetails } = useStore((store) => store);
   const router = useRouter();
   const { currentCart, handleRemove } = useContext(CartContext);
  
   return (
      <Dropdown>
         <Dropdown.Trigger>
            {children ?? (
               <Button variant={"ghost"} size={"none"} className="relative pr-2">
                  <ShoppingBag className="w-6" />
                  <span
                     className="absolute right-0 rounded-full bg-primary px-2"
                     style={{ top: "-5px" }}
                  >
                     <Text variant={"white"} size={"xs"} style={{ fontSize: "10px" }}>
                        {currentCart.length}
                     </Text>
                  </span>
               </Button>
            )}
         </Dropdown.Trigger>
         <Dropdown.Content className=" scrollbar w-[25rem] overflow-scroll border  bg-white  py-6 shadow-lg transition-all duration-300 ease-linear">
            <div className="grid h-[10rem] gap-4 overflow-scroll px-4 pb-4">
               <div className="space-y-2">
                  <h4 className="font-medium leading-none">Shopping Card ({currentCart.length})</h4>
               </div>
               <div className="grid gap-2">
                  {currentCart.length ? (
                     <div className="w-full">
                        <Each
                           of={currentCart}
                           render={(item: any, index: any) => (
                              <>
                                 <div className="flex items-center justify-between gap-2 py-6">
                                    <div className="flex items-center justify-start gap-2">
                                       <Image
                                          className="h-10 w-10"
                                          src={item.image}
                                          alt={item.name}
                                          width={40}
                                          height={40}
                                       />
                                       <div>
                                          <Text size={"sm"} weight={"medium"}>
                                             {item.name}
                                          </Text>
                                          <Text size={"xs"}>
                                             {item.no_of_items} x{" "}
                                             <span className="font-semibold">
                                                {item.price.toLocaleString()}
                                             </span>
                                          </Text>
                                       </div>
                                    </div>
                                    <Button
                                       onClick={() => handleRemove(item?.id, item?.chosenUnit)}
                                       className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-gray-200 text-black"
                                    >
                                       <X className="w-3" />
                                    </Button>
                                 </div>
                                 {currentCart.length !== index + 1 && <Separator />}
                              </>
                           )}
                        />
                        <div className="mt-3 flex items-center justify-between gap-2">
                           <Text size={"xs"} weight={"medium"}>
                              {currentCart.length} {currentCart.length > 1 ? "Products" : "Product"}
                           </Text>
                           <Text size={"sm"} weight={"semibold"}>
                              ₦{calculateTotalPrice(currentCart).toLocaleString()}
                           </Text>
                        </div>
                        <div className="mt-6 flex w-full flex-col gap-4">
                           <a
                              href={"/shop/checkout"}
                              className="w-full rounded-3xl bg-[#7ab42c] py-2 text-center text-xs text-white"
                           >
                              Checkout
                           </a>
                           <a
                              href={"/shop/cart"}
                              className="w-full rounded-3xl bg-gray-100 py-2 text-center text-xs text-[#7ab42c]"
                           >
                              Go to Cart
                           </a>
                        </div>
                     </div>
                  ) : (
                     <div className="flex w-full items-center justify-center py-6">
                        <Text className="text-center" size={"sm"} weight={"medium"}>
                           You have no items in your cart currently...
                        </Text>
                     </div>
                  )}
               </div>
            </div>
         </Dropdown.Content>
      </Dropdown>
   );
};

export default ShoppingCartDropdown;
