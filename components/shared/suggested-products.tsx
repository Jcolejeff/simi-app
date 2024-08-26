"use client";
import { ShoppingCartIcon } from "lucide-react";
import React, { useContext } from "react";

import Image from "next/image";

import tomato from "@/images/tomato.png";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../ui/accordion";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import useProducts from "@/app/shop/hooks/products/useProducts";
import { CartContext } from "@/contexts/cart-context";
import { ShopItem as ItemType } from "@/types";
import { shuffleArray } from "@/helper";

function SuggestedProducts({ productSlug }: { productSlug: string }) {
   const { sortedAndFilteredProducts } = useProducts("all");
   const { handlePlus } = useContext(CartContext);
   return (
      <div className="flex-1">
         <Accordion type="single" collapsible className="mt-3 w-full rounded-xl bg-white px-4 py-2">
            <AccordionItem className="border-0" value="item-1">
               <AccordionTrigger>Suggested Products</AccordionTrigger>
               <AccordionContent className="">
                  {shuffleArray(sortedAndFilteredProducts || [])
                     .filter((item) => item?.slug !== productSlug)
                     .slice(0, 2)
                     .map((item: ItemType, index: number) => (
                        <div key={index} className="mb-3 flex w-full items-center gap-2">
                           <Image
                              src={item?.image}
                              alt="Product"
                              width={80}
                              height={80}
                              className="h-20 w-20"
                           />
                           <div className="w-full">
                              <Text className="mb-2" size={"xs"} weight={"medium"}>
                                 {item?.name}
                              </Text>
                              <Text size={"xs"} weight={"medium"}>
                                 From: ₦{item?.price}
                              </Text>
                              <Button
                                 className="mt-4 w-full rounded-3xl  border border-primary-2 bg-transparent text-xs text-primary-2"
                                 onClick={() => handlePlus(item)}
                              >
                                 Add to Cart <ShoppingCartIcon className="w-4 text-primary-2" />
                              </Button>
                           </div>
                        </div>
                     ))}
               </AccordionContent>
            </AccordionItem>
         </Accordion>
      </div>
   );
}

export default SuggestedProducts;
