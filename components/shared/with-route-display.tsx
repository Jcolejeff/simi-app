"use client";
import { ReactNode } from "react";

import useWindowDimensions from "@/hooks/useWindowDimensions";

import { isWidthGreaterOrEqualTo768 } from "@/helper";

import Container from "@/components/shared/container";
import RouteDisplay from "@/components/shared/route-display";

const WithRouteDisplay = ({
   route,
   children,
   containerMaxWidth,
   extraChildrenClassname,
}: {
   route: string;
   children: ReactNode;
   containerMaxWidth?: string;
   extraChildrenClassname?: string;
}) => {
   const { width } = useWindowDimensions();

   return (
      <div className="pt-4 md:pt-[70px]">
         {isWidthGreaterOrEqualTo768(width) && <RouteDisplay route={route} />}
         <Container backgroundColor="bg-gray-100">
            <section
               style={{ maxWidth: containerMaxWidth || "1200px" }}
               className={`mx-auto mt-8 flex w-full flex-col items-center justify-center gap-1 p-4 ${extraChildrenClassname}`}
            >
               {children}
            </section>
         </Container>
      </div>
   );
};

export default WithRouteDisplay;
