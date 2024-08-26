"use client";

import React from "react";

import Each from "@/components/helpers/each";
import Container from "@/components/shared/container";
import FlashSaleBanner from "@/components/shared/flashsale-banner";
import ShopItem from "@/components/shared/shop-item";

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
   const { sortedAndFilteredProducts } = useProducts(categoriesId.flashSales);
   const { data: info } = useSections();
   const data = info ? info[0] : {};
   return (
      <>
         <head>
            <title>Flash Sales | MyFoodAngels</title>
            <meta
               name="description"
               content="Don't miss out on amazing discounts with MyFoodAngels Flash Sales. Shop now and enjoy limited-time offers on a wide range of products."
            />
            <meta
               name="keywords"
               content="Flash Sales, MyFoodAngels, Discounts, Online Shopping, Limited Time Offers, Grocery Deals"
            />
            <meta name="robots" content="index, follow" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            <link rel="icon" href="/icon.png" />
            <meta property="og:title" content="Flash Sales | MyFoodAngels" />
            <meta
               property="og:description"
               content="Don't miss out on amazing discounts with MyFoodAngels Flash Sales. Shop now and enjoy limited-time offers on a wide range of products."
            />
            <meta property="og:url" content="https://myfoodangels.com/shop/flash-sales" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="/og.jpg" />
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content="Flash Sales | MyFoodAngels" />
            <meta
               property="twitter:description"
               content="Don't miss out on amazing discounts with MyFoodAngels Flash Sales. Shop now and enjoy limited-time offers on a wide range of products."
            />
            <meta property="twitter:image" content="/og.jpg" />
         </head>
         <Show>
            <Show.When isTrue={data?.showFlashSales}>
               <div className="pt-[4rem]">
                  <RouteDisplay route="Flash Sales" />
                  <Container backgroundColor="bg-gray-100">
                     <main className="mx-auto mt-8 flex w-full max-w-[1200px] flex-col items-center justify-center gap-1 py-4">
                        <FlashSaleBanner />
                        <div className="w-full py-4">
                           <div className="grid w-full grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4">
                              <Each
                                 of={sortedAndFilteredProducts || []}
                                 render={(item: any, index: number) => (
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
                  <RouteDisplay route="Flash Sales" />
                  <Container backgroundColor="bg-gray-100">
                     <div className="flex items-center justify-between gap-2 rounded-md bg-white p-2 py-8">
                        <Text size={"sm"} weight={"semibold"}>
                           Closing in:
                        </Text>
                        <Timer
                           className="rounded-md bg-[#7ab42c] p-2 text-xs text-white"
                           availableDate={data?.FlashSaleAvailable || ""}
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
