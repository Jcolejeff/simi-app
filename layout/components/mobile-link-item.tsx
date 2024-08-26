"use client";

import React from "react";

import Link from "next/link";

// import { useRouter, Router } from 'next/router';
import Each from "@/components/helpers/each";
import { Button } from "@/components/ui/button";

import { Route } from "@/types";

const className =
   "w-full rounded-lg border border-gray-100 bg-gray-100 text-black py-4 text-center text-sm focus:border-gray-700 focus:bg-gray-700";

function MobileLinkItem({ item, handleVisibility }: { item: Route; handleVisibility: any }) {
   // const router = useRouter();

   const handleRoute = (route: any) => {
      handleVisibility();
      // router.push(route);
   };

   if (item.components) {
      return (
         <>
            <Each
               of={item.components}
               render={(item: any, index: number) => (
                  <Link
                     href={item.href}
                     onClick={() => handleVisibility()}
                     className={className}
                     key={index}
                  >
                     {item.title}
                  </Link>
               )}
            />
         </>
      );
   }

   return (
      <Link href={item.href} onClick={() => handleVisibility()} className={className} key={item.id}>
         {item.title}
      </Link>
   );
}

export default MobileLinkItem;
