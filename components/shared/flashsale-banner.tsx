"use client";

import { ArrowRight } from "lucide-react";
import React from "react";

import Image from "next/image";
import Link from "next/link";

import useWindowDimensions from "@/hooks/useWindowDimensions";

import bg from "../../images/flash-sale.png";
import { Text } from "../ui/text";
import Timer from "../ui/timer";
import useSections from "@/app/shop/hooks/sections/sections";

function FlashSaleBanner() {
   const { width } = useWindowDimensions();
   const { data: info } = useSections();
   const data = info ? info[0] : {};
   if (width && width < 745) {
      return (
         <main className="w-full px-2">
            <div className="flex w-full items-center justify-between rounded-md border border-[#DFC900] bg-[#DFC900] p-2">
               <Text variant={"white"} size={"sm"} weight={"semibold"}>
                  Flash Sale
               </Text>
               <div className="flex items-center gap-2 rounded-md bg-white p-2">
                  <Text variant={"primary"} size={"xs"} weight={"semibold"}>
                     Closing in:
                  </Text>
                  <Timer
                     className="rounded-md bg-[#7ab42c] p-2 text-xs font-medium text-white"
                     availableDate={data?.FlashSaleAvailable || ""}
                  />
               </div>
            </div>
         </main>
      );
   }

   return (
      <div className="relative overflow-hidden rounded-2xl">
         <Image src={bg} alt="bg" width={800} height={600} />
         <div className="absolute right-0 top-0 h-full w-full max-w-[350px] p-4">
            <Text className="my-2 uppercase text-white" size={"sm"} weight={"medium"}>
               Flash Sale
            </Text>
            <span className="my-4 flex items-center gap-2">
               <Text className="text-[#7ab42c]" size={"5xl"} weight={"bold"}>
                  30%
               </Text>
               <Text variant={"white"} size={"5xl"} weight={"bold"}>
                  OFF
               </Text>
            </span>
            <div className="flex items-center justify-between gap-2 rounded-md bg-white p-2">
               <Text size={"sm"} weight={"semibold"}>
                  Closing in:
               </Text>
               <Timer
                  className="rounded-md bg-[#7ab42c] p-2 text-xs text-white"
                  availableDate={data?.FlashSaleAvailable || ""}
               />
            </div>
            <Link
               href={"/shop/flash-sales"}
               className="mt-4 flex w-[50%] items-center justify-center gap-1 rounded-3xl bg-[#7ab42c] px-6 py-2 text-xs text-white"
            >
               Shop Now
               <ArrowRight className="w-4 text-white" />
            </Link>
         </div>
      </div>
   );
}

export default FlashSaleBanner;
