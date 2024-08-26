/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useStore from "store";
import { Unbounded } from "next/font/google";
import Spinner from "@/components/ui/spinner";
const unbounded = Unbounded({ subsets: ["latin"] });

interface IRouteGuard {
   children: JSX.Element;
}

const RouteGuard = ({ children }: IRouteGuard) => {
   const loggedIn = useStore((state) => state.loggedIn);
   const router = useRouter();

   useEffect(() => {
      if (!loggedIn) {
         router.push("/login");
      }
   }, [loggedIn, router]);

   if (!loggedIn) {
      return <Spinner />;
   }

   return <>{children}</>;
};

export default RouteGuard;
