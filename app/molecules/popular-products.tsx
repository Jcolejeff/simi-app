"use client";
import { ArrowRight } from "lucide-react";
import React from "react";

import Link from "next/link";

import Each from "@/components/helpers/each";
import Container from "@/components/shared/container";
import ShopItem from "@/components/shared/shop-item";
import { Text } from "@/components/ui/text";

import { ShopItem as ItemType } from "@/types";

import useProducts from "../shop/hooks/products/useProducts";
import { categoriesId } from "@/lib/utils";
function PopularProducts() {
   const { sortedAndFilteredProducts } = useProducts("all");

   return (
      <Container backgroundColor="bg-white">
         <main
            style={{ maxWidth: "1200px" }}
            className="mx-auto flex w-full flex-col items-center justify-center gap-1 py-4"
         >
            <div className="w-full py-4">
               <div className="flex w-full items-center justify-between px-4">
                  <Text size={"xl"} weight={"semibold"}>
                     Popular Products
                  </Text>
                  <Link
                     href={"/shop/popular-products"}
                     className="flex items-center justify-start gap-1 rounded-3xl bg-gray-100 px-4 py-2 text-sm text-primary-2"
                  >
                     View All
                     <ArrowRight className="w-4 text-primary-2" />
                  </Link>
               </div>
               <div className="grid w-full grid-cols-2 gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
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
   );
}

export default PopularProducts;
