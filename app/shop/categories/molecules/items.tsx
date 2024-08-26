import React, { useEffect, useState } from "react";
import { ArrowUpDown } from "lucide-react";
import Each from "@/components/helpers/each";
import ShopItem from "@/components/shared/shop-item";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import ItemPagination from "./item-pagination";
import useProducts from "../../hooks/products/useProducts";

import { formatToNaira } from "@/lib/utils";
function Items() {
   const { sortedAndFilteredProducts, handleSearch, handleSortChange, handlePriceChange } =
      useProducts();
   const [minValue, setMinValue] = useState(0);
   const [maxValue, setMaxValue] = useState(500000);
   const [value, setValue] = useState([1000, 5000]);
   const count = sortedAndFilteredProducts?.length ?? 0;
   useEffect(() => {
      handlePriceChange(value[1]);
   }, [value]);
   return (
      <main className="flex-[4] p-4">
         <div className="flex items-center justify-center gap-5">
            <Text size={"sm"} weight={"medium"}>
               From {"  "}
               {formatToNaira(Number(value[0]))}
            </Text>
            <Text size={"sm"} weight={"medium"}>
               To {"  "}
               {formatToNaira(Number(value[1]))}
            </Text>
         </div>
         <div className="mb-4 flex w-full items-center justify-between">
            <Text size={"xs"} weight={"medium"}>
               Showing 1-{count} of {count} results
            </Text>
            <div className="flex items-center justify-end gap-1">
               <ArrowUpDown className="w-3" />
               <Select onValueChange={handleSortChange}>
                  <SelectTrigger className="w-[180px] bg-white">
                     <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                     <SelectItem value="year">Year</SelectItem>
                     <SelectItem value="month">Month</SelectItem>
                     <SelectItem value="day">Day</SelectItem>
                  </SelectContent>
               </Select>
            </div>
         </div>
         <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3">
            <Each
               of={sortedAndFilteredProducts || []}
               render={(item, index) => <ShopItem key={index} itemDetails={item} />}
            />
         </div>
         {count > 20 && <ItemPagination />}
      </main>
   );
}

export default Items;
