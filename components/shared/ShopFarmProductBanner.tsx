import Image from "next/image";
import React from "react";
import { Text } from "../ui/text";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";

const ShopFarmProductBanner = () => {
   return (
      <div
         style={{
            backgroundImage: `url(/images/shop/shop-farm-banner.png)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
         }}
         className=" w-full bg-black px-8 py-12 text-center md:py-20"
      >
         <div className="mx-auto max-w-[90%] md:max-w-[720px]">
            <Text className="mb-2 text-[#B7B7B7]">Stay Healthy</Text>
            <Text className="mb-4 text-[24px] font-semibold leading-[100%] text-white md:text-[48px]">
               Shop farm fresh healthy products with us!
            </Text>
            <Button className="mx-auto flex items-center gap-4 rounded-full bg-[#7AB42C] px-8 py-[12px]">
               <span>Shop Now</span>
               <ArrowRightIcon />
            </Button>
         </div>
      </div>
   );
};

export default ShopFarmProductBanner;
