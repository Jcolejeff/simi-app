"use client";

import { ArrowRight, Search, ArrowUpDown, Filter } from "lucide-react";
import React from "react";

import Link from "next/link";

import Each from "@/components/helpers/each";
import Container from "@/components/shared/container";
import ShopItem from "@/components/shared/shop-item";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";

import { StickyFilter } from "../categories/molecules/sticky-filter";

import { ShopItem as ItemType } from "@/types";

import RouteDisplay from "../../../components/shared/route-display";

import useProducts from "../hooks/products/useProducts";
import { shuffleArray } from "@/helper";
import { Button } from "@/components/ui/button";
function Page() {
   const { sortedAndFilteredProducts, handleSearch } = useProducts("all");

   return (
      <div className="pt-[4rem]">
         <head>
            <title>Popular Products | MyFoodAngels</title>
            <meta
               name="description"
               content="Discover the most popular products at MyFoodAngels. Explore a wide selection of customer favorites and find what you need today."
            />
            <meta
               name="keywords"
               content="Popular Products, MyFoodAngels, Online Shopping, Grocery Shopping, Bestsellers"
            />
            <meta name="robots" content="index, follow" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            <link rel="icon" href="/icon.png" />
            <meta property="og:title" content="Popular Products | MyFoodAngels" />
            <meta
               property="og:description"
               content="Discover the most popular products at MyFoodAngels. Explore a wide selection of customer favorites and find what you need today."
            />
            <meta property="og:url" content="https://myfoodangels.com/shop/popular-products" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="/og.jpg" />
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content="Popular Products | MyFoodAngels" />
            <meta
               property="twitter:description"
               content="Discover the most popular products at MyFoodAngels. Explore a wide selection of customer favorites and find what you need today."
            />
            <meta property="twitter:image" content="/og.jpg" />
         </head>

         <RouteDisplay route="Popular Products" />
         <Container backgroundColor="bg-gray-100">
            <main className="mx-auto mt-8 flex w-full max-w-[1200px] flex-col items-center justify-center gap-1 py-4">
               <div className="w-full py-4">
                  <form className="mb-6 flex items-center gap-2 px-2">
                     <div className="relative w-full">
                        <Search className="absolute left-4 top-[25%] w-4" />
                        <Input
                           onChange={handleSearch}
                           className={`w-full rounded-full bg-white py-6 pl-[40px]`}
                           placeholder={"What do you need?"}
                        />
                     </div>
                  </form>
                  <div className="flex w-full items-center justify-start px-4">
                     <Text size={"lg"} weight={"semibold"}>
                        Popular Products
                     </Text>
                  </div>
                  <div className="grid w-full grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4">
                     <Each
                        of={sortedAndFilteredProducts || []}
                        render={(item: ItemType, index: number) => (
                           <ShopItem key={index} itemDetails={item} />
                        )}
                     />
                  </div>
                  <div className="mt-8 flex w-full items-center justify-between px-4">
                     <Text size={"lg"} weight={"semibold"}>
                        Recommended for you
                     </Text>
                  </div>
                  <div className="grid w-full grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4">
                     <Each
                        of={shuffleArray(sortedAndFilteredProducts?.slice(0, 4) || [])}
                        render={(item: ItemType, index: number) => (
                           <ShopItem key={index} itemDetails={item} />
                        )}
                     />
                  </div>
                  {/* <div className="mt-8 flex w-full items-center justify-between px-4">
                     <Text size={"lg"} weight={"semibold"}>
                        Recently Viewed
                     </Text>
                  </div>
                  <div className="grid w-full grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4">
                     <Each
                        of={recentItems}
                        render={(item: ItemType, index: number) => (
                           <ShopItem key={index} itemDetails={item} />
                        )}
                     />
                  </div> */}
               </div>
            </main>
         </Container>
      </div>
   );
}

export default Page;
