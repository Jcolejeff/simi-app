"use client";

import { ArrowRight } from "lucide-react";
import React from "react";

import Image from "next/image";
import Link from "next/link";

import useWindowDimensions from "@/hooks/useWindowDimensions";

import bg from "../../images/farm-offtake.png";
import { Text } from "../ui/text";
import Timer from "../ui/timer";
import useSections from "@/app/shop/hooks/sections/sections";

function OfftakeBanner() {
   const { width } = useWindowDimensions();
  const { data: info } = useSections();
  const data = info ? info[0] : {};
   if (width && width < 745) {
      return (
         <main className="w-full px-2">
            <div className="flex w-full items-center justify-between rounded-md border border-red-600 bg-red-600 p-2">
               <Text variant={"white"} size={"sm"} weight={"semibold"}>
                  Farm Offtake
               </Text>
               <div className="flex items-center justify-end gap-2 rounded-md p-2">
                  <Text variant={"white"} size={"xs"} weight={"medium"}>
                     Closing in:
                  </Text>
                  <Timer
                     className="rounded-md bg-white p-2 text-xs font-medium text-black"
                     availableDate={data?.FarmOffTakeAvailable || ""}
                  />
               </div>
            </div>
         </main>
      );
   }

   return (
      <div className="relative overflow-hidden rounded-2xl">
         <Image src={bg} alt="bg" width={800} height={600} />
         <div className="absolute right-0 top-0 h-full max-w-[350px] p-4">
            <Text className="text-[#7ab42c]" size={"xl"} weight={"semibold"}>
               FARM OFFTAKE
            </Text>
            <Text className="my-2 text-gray-300" size={"xs"} weight={"medium"}>
               Free on all your order, Free Delivery and 30 days money-back guarantee
            </Text>
            <Timer availableDate={data?.FarmOffTakeAvailable || ""} />
            <Link
               href={"/shop/off-take"}
               className="mt-4 flex w-[50%] items-center justify-center gap-1 rounded-3xl bg-[#7ab42c] px-6 py-2 text-xs text-white"
            >
               Shop Now
               <ArrowRight className="w-4 text-white" />
            </Link>
         </div>
      </div>
   );
}

export default OfftakeBanner;
