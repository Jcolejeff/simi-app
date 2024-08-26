"use client";

import React, { useEffect, useState } from "react";

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";

import { formatToNaira } from "@/lib/utils";
import useProducts from "../../hooks/products/useProducts";

function Price({ handlePriceChange }: { handlePriceChange: (newValue: number | null) => void }) {
   const price = 100000;
   const step = 1000;
   const maxPrice = 500000;
   const [selectedPrice, setSelectedPrice] = useState(0);
   useEffect(() => {
      if (selectedPrice > 0) {
         handlePriceChange(selectedPrice);
      } else {
         handlePriceChange(null);
      }
   }, [selectedPrice]);
   return (
      <AccordionItem className="border-0" value="item-2">
         <AccordionTrigger>Price</AccordionTrigger>
         <AccordionContent className="flex flex-col items-center justify-start gap-1 pt-8">
            <Text size={"sm"} weight={"medium"}>
               Max {"  "}
               {formatToNaira(Number(maxPrice))}
            </Text>
            <input
               type="range"
               name={"price"}
               min={0}
               max={maxPrice}
               value={selectedPrice}
               onChange={(e) => setSelectedPrice(Number(e.target.value) || 0)}
               className={`range range-primary w-full fill-primary-1`}
               step={step}
            />
            <div className="flex items-center justify-center gap-5">
               <Text size={"sm"} weight={"medium"}>
                  {formatToNaira(Number(selectedPrice))}
               </Text>
            </div>
         </AccordionContent>
      </AccordionItem>
   );
}

export default Price;
