"use client";
import { ArrowRight } from "lucide-react";
import React from "react";

import Link from "next/link";

import Each from "@/components/helpers/each";
import Container from "@/components/shared/container";
import FlashSaleBanner from "@/components/shared/flashsale-banner";
import ShopItem from "@/components/shared/shop-item";
import { Text } from "@/components/ui/text";

import { ShopItem as ItemType } from "@/types";

import useProducts from "../shop/hooks/products/useProducts";
import { categoriesId } from "@/lib/utils";
import useSections from "../shop/hooks/sections/sections";
import { Show } from "@/components/helpers/show";
function FlashSales() {
   const { sortedAndFilteredProducts } = useProducts(categoriesId.flashSales);
   const { data: info } = useSections();
   const data = info ? info[0] : {};

   return (
      <Show>
         <Show.When isTrue={data?.showFlashSales}>
            <Container backgroundColor="bg-white">
               <main className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-center gap-1 py-4">
                  <FlashSaleBanner />
                  <div className="w-full py-4">
                     <div className="flex w-full items-center justify-between px-4">
                        <Text size={"2xl"} weight={"semibold"}>
                           Flash Sale
                        </Text>
                        <Link
                           href={"/shop/flash-sales"}
                           className="flex items-center justify-start gap-1 rounded-3xl bg-gray-100 px-4 py-2 text-sm text-primary-2"
                        >
                           View All
                           <ArrowRight className="w-4 text-primary-2" />
                        </Link>
                     </div>
                     <div className="grid w-full grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4">
                        <Each
                           of={sortedAndFilteredProducts?.slice(0, 8) || []}
                           render={(item: ItemType, index: number) => (
                              <ShopItem key={index} itemDetails={item} />
                           )}
                        />
                     </div>
                  </div>
               </main>
            </Container>
         </Show.When>
      </Show>
   );
}

export default FlashSales;
