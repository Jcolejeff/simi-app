import { X } from "lucide-react";
import React from "react";

import Image from "next/image";

import Each from "@/components/helpers/each";
import { Button } from "@/components/ui/button";

import { Routes } from "@/routes";

import logo from "../../images/logo.png";

import MobileLinkItem from "./mobile-link-item";

export function MobileNav({ handleVisibility }: { handleVisibility: any }) {
   return (
      <div
         className="boder-white z-10000 fixed left-0 top-0 z-50 flex h-[99.8vh] w-[60%] flex-col items-center justify-start gap-[20px] border bg-white shadow-sm"
         style={{ width: "70%", height: "99.8vh" }}
      >
         <div className="flex w-full items-center justify-start p-4">
            <Button variant={"ghost"} size={"none"} onClick={() => handleVisibility()}>
               <X className="w-4" />
            </Button>
         </div>
         <div
            style={{ height: "60%" }}
            className="flex w-full flex-col items-center justify-between gap-2 p-4"
         >
            <Each
               of={Routes}
               render={(item: any, index) => (
                  <MobileLinkItem handleVisibility={handleVisibility} key={index} item={item} />
               )}
            />
         </div>
         <div className="flex w-full flex-1 items-center justify-center">
            <Image src={logo} alt="mfa_logo" />
         </div>
      </div>
   );
}
