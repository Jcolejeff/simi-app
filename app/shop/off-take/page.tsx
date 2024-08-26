"use client";

import React from "react";

import Each from "@/components/helpers/each";
import Container from "@/components/shared/container";
import OfftakeBanner from "@/components/shared/offtake-banner";
import ShopItem from "@/components/shared/shop-item";

import { ShopItem as ItemType } from "@/types";

import RouteDisplay from "../../../components/shared/route-display";

import { revalidateNumber } from "@/lib/utils";
import { categoriesId } from "@/lib/utils";
import useProducts from "../hooks/products/useProducts";
import { Show } from "@/components/helpers/show";
import useSections from "../hooks/sections/sections";
import { Text } from "@/components/ui/text";
import Timer from "@/components/ui/timer";
export const revalidate = 60;
function Page() {
   const { sortedAndFilteredProducts } = useProducts(categoriesId.farmOffTake);
   const { data: info } = useSections();
   const data = info ? info[0] : {};

   return (
      <>
         <head>
            <title>Farm Offtake | MyFoodAngels</title>
            <meta
               name="description"
               content="Explore our Farm Offtake program at MyFoodAngels. Purchase fresh produce directly from farms at the best prices. Limited time offers available."
            />
            <meta
               name="keywords"
               content="Farm Offtake, MyFoodAngels, Fresh Produce, Farm-to-Table, Online Grocery, Farm Products"
            />
            <meta name="robots" content="index, follow" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            <link rel="icon" href="/icon.png" />
            <meta property="og:title" content="Farm Offtake | MyFoodAngels" />
            <meta
               property="og:description"
               content="Explore our Farm Offtake program at MyFoodAngels. Purchase fresh produce directly from farms at the best prices. Limited time offers available."
            />
            <meta property="og:url" content="https://myfoodangels.com/shop/off-take" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="/og.jpg" />
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content="Farm Offtake | MyFoodAngels" />
            <meta
               property="twitter:description"
               content="Explore our Farm Offtake program at MyFoodAngels. Purchase fresh produce directly from farms at the best prices. Limited time offers available."
            />
            <meta property="twitter:image" content="/og.jpg" />
         </head>
         <Show>
            <Show.When isTrue={data?.showOfftakes}>
               <div className="pt-[4rem]">
                  <RouteDisplay route="Farm Offtake" />
                  <Container backgroundColor="bg-gray-100">
                     <main className="mx-auto mt-8 flex w-full max-w-[1200px] flex-col items-center justify-center gap-1 py-4">
                        <OfftakeBanner />
                        <div className="w-full py-4">
                           <div className="grid w-full grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4">
                              <Each
                                 of={sortedAndFilteredProducts || []}
                                 render={(item: ItemType, index: number) => (
                                    <ShopItem key={index} itemDetails={item} />
                                 )}
                              />
                           </div>
                        </div>
                     </main>
                  </Container>
               </div>
            </Show.When>
            <Show.Else>
               <div className="pt-[4rem]">
                  <RouteDisplay route="Farm Offtake" />
                  <Container backgroundColor="bg-gray-100">
                     <div className="flex items-center justify-between gap-2 rounded-md bg-white p-2 py-8">
                        <Text size={"sm"} weight={"semibold"}>
                           Closing in:
                        </Text>
                        <Timer
                           className="rounded-md bg-[#7ab42c] p-2 text-xs text-white"
                           availableDate={data?.FarmOffTakeAvailable || ""}
                        />
                     </div>
                  </Container>
               </div>
            </Show.Else>
         </Show>
      </>
   );
}

export default Page;
