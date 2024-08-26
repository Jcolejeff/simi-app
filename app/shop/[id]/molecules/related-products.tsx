"use client";
import { Text } from "@/components/ui/text";
import React from "react";
import ShopItem from "@/components/shared/shop-item";
import useProducts from "../../hooks/products/useProducts";
import { SingleProduct } from "@/types";
import { ShopItem as ItemType } from "@/types";
import { shuffleArray } from "@/helper";
import Each from "@/components/helpers/each";

const RelatedProducts = ({ productSlug }: { productSlug: string }) => {
   const { sortedAndFilteredProducts } = useProducts("all");

   return (
      <div>
         <Text size={"lg"} weight={"semibold"}>
            Related Products
         </Text>
         <div className="grid w-full grid-cols-2 gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
            <Each
               of={
                  shuffleArray(sortedAndFilteredProducts || [])
                     .filter((item) => item?.slug !== productSlug)
                     .slice(0, 4) || []
               }
               render={(item: ItemType, index: number) => (
                  <ShopItem key={index} itemDetails={item} />
               )}
            />
         </div>
      </div>
   );
};

export default RelatedProducts;
