"use client";

import React from "react";
import { dashboardRoutes } from "../dashboard-routes";
import Each from "@/components/helpers/each";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import useStore from "@/store";
import { useRouter } from "next/navigation";


function Stickybar({ handleSticky }: { handleSticky: any }) {
   const pathname = usePathname();
   const router = useRouter();
     const {  setLoggedIn, setCurrentUser, setAuthDetails } = useStore((store) => store);
   return (
      <div className="fixed left-0 z-[100000] flex h-[100vh] w-[70%] flex-1 flex-col items-center justify-start gap-2 bg-white p-3">
         <div className="flex w-full items-start justify-start px-4 py-2">
            <X onClick={handleSticky} className="w-4" />
         </div>
         <Each
            of={dashboardRoutes}
            render={(route: any, index: number) => (
               <Link
                  className={`w-full rounded-md border ${pathname === route.href ? "border-gray-100 bg-gray-100 text-[#7ab42c]" : "border-transparent"} px-2 py-3 text-sm`}
                  href={route.href}
               >
                  {route.title}
               </Link>
            )}
         />

         <Button  onClick={() => {
                  setLoggedIn(false);
                  setCurrentUser(null);
                  setAuthDetails({});

                  router.push("/account/signin");
               }} className="mt-10 w-full">Logout</Button>
      </div>
   );
}

export default Stickybar;
