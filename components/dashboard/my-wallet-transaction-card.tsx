import { formatToNaira } from "@/lib/utils";
import { Text } from "../ui/text";
import { TrendingDown, TrendingUp } from "lucide-react";

const MyWalletTransactionCard = ({
   name,
   date,
   type,
   amount,
}: {
   name: string;
   date: string;
   type: string;
   amount: number;
}) => {
   return (
      <div className="h-55 w-85 m-4 flex items-center justify-between gap-2 rounded-xl border border-gray-200 p-4">
         <div className="flex items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
               {type === "credit" ? (
                  <TrendingUp className="w-4 text-green-500" />
               ) : (
                  <TrendingDown className="w-4 text-red-500" />
               )}
            </div>
            <div className="px-3">
               <p className="font-bold">{name}</p>
               <p className="text-sm ">{date}</p>
            </div>
         </div>
         <Text size={"sm"} weight={"medium"} className={type === "credit" ? "text-green-500" : ""}>
            {formatToNaira(amount)}
         </Text>
         <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
            {type === "credit" ? (
               <TrendingUp className="invisible w-4 text-green-500" />
            ) : (
               <TrendingDown className="invisible w-4 text-red-500" />
            )}
         </div>
      </div>
   );
};

export default MyWalletTransactionCard;
