import React from "react";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ShopItem as ItemType } from "@/types";
import dummyItem from "@/images/dummy-item.png";
import Image from "next/image";
import { Text } from "@/components/ui/text";
import Each from "@/components/helpers/each";

const dummyItems = [
   {
      id: 1,
      name: "Dummy Item 1",
      price: 1000,
      image: dummyItem,
   },
   {
      id: 2,
      name: "Dummy Item 2",
      price: 2000,
      image: dummyItem,
   },
   {
      id: 3,
      name: "Dummy Item 3",
      price: 3000,
      image: dummyItem,
   },
   {
      id: 4,
      name: "Dummy Item 4",
      price: 4000,
      image: dummyItem,
   },
];

function RecentlyViewed() {
   return (
      <AccordionItem className="border-0" value="item-4">
         <AccordionTrigger>Recently Viewed</AccordionTrigger>
         <AccordionContent className="flex flex-col items-center justify-start gap-1 pt-8">
            <Each
               of={dummyItems}
               render={(item) => (
                  <div className="mb-3 flex w-full items-center justify-between gap-2 px-4">
                     <Image className="w-24" src={item.image} alt="Product" />
                     <div>
                        <Text className="mb-2 text-gray-500" size={"sm"} weight={"medium"}>
                           {item.name}
                        </Text>
                        <Text className="text-gray-500" size={"sm"} weight={"medium"}>
                           From:{" "}
                           <span className="font-semibold text-black">
                              ₦{item.price.toLocaleString()}
                           </span>
                        </Text>
                     </div>
                  </div>
               )}
            />
         </AccordionContent>
      </AccordionItem>
   );
}

export default RecentlyViewed;
