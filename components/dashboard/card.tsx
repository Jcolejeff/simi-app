import { Copy, Eye, Plus } from "lucide-react";
import { Text } from "../ui/text";
import mastercard from "@/images/mastercard.png";
import visa from "@/images/visa.png";
import Image from "next/image";
import { Wifi } from "lucide-react";

type CardProp = {
   className: string;
   cardType: "visa" | "mastercard";
   cardNumber: string | number;
   expiryDate: string;
   nameOnCard: string;
};
const Card = ({ className, cardType, expiryDate, nameOnCard, cardNumber }: CardProp) => {
   const Type = () => {
      return (
         <Image src={cardType === "mastercard" ? mastercard : visa} alt="Card" className="w-8" />
      );
   };

   return (
      <div
         className={`${className} h-55 mx-4 mb-4 flex w-full max-w-[270px] flex-col items-center justify-between rounded-3xl p-4`}
      >
         <div className="mb-6 flex w-full items-center justify-between">
            <Wifi className="text-gray-300" />
            <Type />
         </div>
         <h2 className="text-lg font-medium tracking-wide text-white">{cardNumber}</h2>
         <div className="mt-8 flex w-full items-center justify-between">
            <Text className="font-medium text-white" size={"xs"}>
               {expiryDate}
            </Text>
            <Text className="text-[10px] font-medium text-gray-300">{nameOnCard}</Text>
         </div>
      </div>
   );
};

export default Card;
