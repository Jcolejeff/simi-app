// components/PayWithWalletModal.tsx
import React, { useContext, useState } from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits, Highlight, Configure } from "react-instantsearch";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Eye, Filter, Search } from "lucide-react";
import { Input } from "../ui/input";
import { set } from "date-fns";
import useStore from "@/store";
import useQueryCollectionByField from "@/hooks/useFirebaseFieldQuery";
import { formatToNaira } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";
import ProcessError from "@/lib/error";
import Spinner from "../ui/spinner";
import { useRouter } from "next/navigation";
import { CartContext } from "@/contexts/cart-context";
import { useQueryClient } from "@tanstack/react-query";
interface IProps {
   open: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
   amount: number;
   orderDetails: any;
   revokeCouponCodeForUser: any;
   couponCode: string;
}

const PayWithWalletModal: React.FC<IProps> = ({
   open,
   setOpen,
   amount,
   orderDetails,
   revokeCouponCodeForUser,
   couponCode,
}) => {
   const [isLoading, setIsLoading] = useState(false);
   const { authDetails } = useStore((store) => store);
   const router = useRouter();
   const { currentCart, clearCart } = useContext(CartContext);
   const queryClient = useQueryClient();

   const { data: walletBalance, refetch: refetchWalletBalance } = useQueryCollectionByField(
      "wallets",
      "userId",
      authDetails.id ?? "",
   );
   const balance = walletBalance?.[0]?.balance ?? 0;
   const updateWallet = async () => {
      setIsLoading(true);
      const payload = {
         email: authDetails.email,
         amount: amount,
         reference: "MFAPaidWithWallet" + Math.floor(Math.random() * 100000000000000000 + 165538),
         name: `${authDetails.firstName} ${authDetails.lastName}`,
         firstName: authDetails.firstName,
         lastName: authDetails.lastName,
         userId: authDetails.id,
         ...orderDetails,
      };

      try {
         await axios.post("/api/payment/pay-with-wallet", payload);

         toast.success("Wallet updated successfully");
         queryClient.invalidateQueries({
            queryKey: ["wallets", "userId", authDetails.id ?? ""],
         });

         if (couponCode) {
            revokeCouponCodeForUser();
         }
         clearCart();
         router.push("/shop/categories");
      } catch (error) {
         console.error("Error updating wallet:", error);
         ProcessError(error);
         toast.error("Error updating wallet. Please try again.");
      }
      setIsLoading(false);
   };
   return (
      <Dialog onOpenChange={setOpen} open={open}>
         <DialogTrigger asChild></DialogTrigger>
         <DialogContent className=" w-[95%] bg-white">
            <div className="h-55 w-85 mb-5 ml-5 mt-5 flex flex-col justify-between rounded-3xl bg-gradient-to-r from-[#72a929] to-[#83bf33] p-4 text-xl text-white">
               <div>
                  <p className="mb-6 text-sm font-normal text-white">Account balance</p>
                  <h2 className="mb-6 mr-4 text-4xl font-bold text-white">
                     {formatToNaira(balance)}
                  </h2>

                  <p>Pay {formatToNaira(amount)} From your wallet</p>
               </div>

               <button
                  onClick={updateWallet}
                  className="my-4 w-fit rounded-md border border-white px-6 py-3 text-base disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
                  disabled={balance < amount || isLoading}
               >
                  {balance < amount ? "Insufficient funds" : isLoading ? <Spinner /> : "Pay"}
               </button>
            </div>
         </DialogContent>
      </Dialog>
   );
};

export default PayWithWalletModal;
