import { ShoppingBag, ChevronRight } from "lucide-react";
import React from "react";

import { Text } from "@/components/ui/text";
import Each from "../helpers/each";

function RouteDisplay({ route, routes }: { route: string; routes?: string[] }) {
   return (
      <div
         style={{
            backgroundImage: `url(/images/shop/route-display-bg.png)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
         }}
         className="hidden w-full items-center justify-between bg-black p-8 md:flex"
      >
         <div className="mx-auto flex w-full max-w-[1200px] items-center justify-start gap-2">
            <ShoppingBag className="w-6 text-white" />
            {!routes ? (
               <>
                  <ChevronRight className="w-6 text-white" />
                  <Text className="text-primary-2" weight={"medium"} size={"sm"}>
                     {route}
                  </Text>
               </>
            ) : (
               <>
                  <Each
                     of={routes}
                     render={(route: any, index: number) => (
                        <React.Fragment key={index}>
                           <ChevronRight className="w-6 text-white" />
                           <Text className="text-primary-2" weight={"medium"} size={"sm"}>
                              {route}
                           </Text>
                        </React.Fragment>
                     )}
                  />
               </>
            )}
         </div>
      </div>
   );
}

export default RouteDisplay;
