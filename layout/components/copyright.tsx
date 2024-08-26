import React from "react";

import Image from "next/image";

import Each from "@/components/helpers/each";
import { Text } from "@/components/ui/text";

import flutterwave from "../../images/flutterwave.png";
import mastercard from "../../images/mastercard.png";
import paystack from "../../images/paystack.png";
import visa from "../../images/visa.png";

const images = [paystack, flutterwave, mastercard, visa];

function Copyright() {
   return (
      <div className="mb-6 flex w-full flex-col items-center justify-between gap-8 px-4 pt-6 sm:flex-row md:gap-2">
         <Text style={{ color: "#989898" }} size={"xs"} weight={"medium"}>
            &copy; MYFOODANGELS.COM, All rights reserved.
         </Text>

         <div className="flex items-center justify-end gap-2">
            <Each
               of={images}
               render={(item, index) => (
                  <Image key={index} className="h-10 w-10" src={item} alt="Partners" />
               )}
            />
         </div>
      </div>
   );
}

export default Copyright;
