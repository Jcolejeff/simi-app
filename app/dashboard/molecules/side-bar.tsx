"use client";

import React from "react";
import { dashboardRoutes } from "../dashboard-routes";
import Each from "@/components/helpers/each";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import useStore from "@/store";
import { useRouter } from "next/navigation";
function Sidebar() {
   const pathname = usePathname();
   const { setLoggedIn, setCurrentUser, setAuthDetails } = useStore((store) => store);
   const router = useRouter();
   return (
      <div className="hidden flex-1 flex-col items-center justify-start gap-2 bg-white p-3 md:flex">
         <Each
            of={dashboardRoutes}
            render={(route: any, index: number) => (
               <Link
                  className={`w-full rounded-md border duration-200 hover:border-gray-100 hover:bg-gray-100 hover:text-[#7ab42c] ${pathname === route.href ? "border-gray-100 bg-gray-100 text-[#7ab42c]" : "border-transparent"} px-2 py-3 text-sm`}
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
               }} className="mt-5 w-full">Logout</Button>
      </div>
   );
}

export default Sidebar;
