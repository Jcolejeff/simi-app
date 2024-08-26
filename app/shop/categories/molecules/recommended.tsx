import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ShopItem as ItemType } from "@/types";
import dummyItem from "@/images/dummy-item.png";
import Image from "next/image";
import { Text } from "@/components/ui/text";
import Each from "@/components/helpers/each";
import useProducts from "../../hooks/products/useProducts";
import { shuffleArray } from "@/helper";
import { ShoppingCartIcon } from "lucide-react";
import { formatToNaira, splitStringBySpaceAndReplaceWithDash } from "@/lib/utils";
import Link from "next/link";

function Recommended() {
   const { sortedAndFilteredProducts } = useProducts("all");

   return (
      <AccordionItem className="border-0" value="item-3">
         <AccordionTrigger>Recommended for you</AccordionTrigger>
         <AccordionContent className="flex flex-col items-center justify-start gap-1 pt-8">
            {shuffleArray(sortedAndFilteredProducts || [])
               .slice(0, 3)
               .map((item: ItemType, index: number) => (
                  <Link
                     href={`/shop/${splitStringBySpaceAndReplaceWithDash(item.name)}`}
                     className="mb-3 flex w-full items-center  gap-8 px-4"
                     key={index}
                  >
                     <Image
                        className="h-16 w-20 rounded-md"
                        src={item.image}
                        alt="Product"
                        width={100}
                        height={100}
                     />
                     <div>
                        <Text className="mb-2 text-gray-500" size={"sm"} weight={"medium"}>
                           {item.name}
                        </Text>
                        <Text className="text-gray-500" size={"sm"} weight={"medium"}>
                           From:{" "}
                           <span className="font-semibold text-black">
                              {formatToNaira(Number(item.units && item.units[0].price) ?? 0)}
                           </span>
                        </Text>
                     </div>
                  </Link>
               ))}
         </AccordionContent>
      </AccordionItem>
   );
}

export default Recommended;
