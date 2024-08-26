import React, { useEffect } from "react";

import Each from "@/components/helpers/each";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import useStore from "@/store";
import { getCreatedDateFromDocument } from "@/lib/utils";
import ProcessError from "@/lib/error";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import useCategories from "../../hooks/categories/useCategories";

const categories = [
   "Animal Protein",
   "Beverages",
   "Canned Foods",
   "Christmans Bundles",
   "Condiments",
   "Cooking Oils",
   "Dry Foods",
];

function ProductCategories() {
   const { setSelectedCategory, selectedCategory } = useStore((state) => state);
   const { data } = useCategories();
   return (
      <AccordionItem className="border-0" value="item-1">
         <AccordionTrigger>Product Categories</AccordionTrigger>
         <RadioGroup
            onValueChange={(value) => {
               setSelectedCategory(value);
            }}
            value={selectedCategory}
         >
            <Each
               of={data?.categories || categories}
               render={(item: any, index: number) => (
                  <Label htmlFor={item?.id} className="flex items-center space-x-2 py-3">
                     <RadioGroupItem value={item?.id} id={item?.id} />
                     <p className="capitalize text-gray-600">
                        {item?.name}
                        {/* (123) */}
                     </p>
                  </Label>
               )}
            />
         </RadioGroup>
      </AccordionItem>
   );
}

export default ProductCategories;
