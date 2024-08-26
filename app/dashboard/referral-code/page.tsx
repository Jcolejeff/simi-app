"use client";
import React from "react";
import DashboardLayout from "../molecules/dashboard-layout";
import TextBoxWithLine from "@/components/dashboard/items-header";
import LineDivider from "@/components/dashboard/line-divider";
import useStore from "@/store";
import useQueryCollectionByField from "@/hooks/useFirebaseFieldQuery";
import { copyToClipboard } from "@/helper";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import Spinner from "@/components/ui/spinner";
function Page() {
   const { authDetails } = useStore((store) => store);
   const [isLoading, setIsLoading] = React.useState(false);
   const { data: balance, refetch: refetchBalance } = useQueryCollectionByField(
      "referrals",
      "userId",
      authDetails.id ?? "",
   );

   const withdrawToWallet = async () => {
      setIsLoading(true);
      const payload = {
         email: authDetails.email,

         name: `${authDetails.firstName} ${authDetails.lastName}`,
         firstName: authDetails.firstName,
         lastName: authDetails.lastName,
         userId: authDetails.id,
      };

      try {
         await axios.post("/api/payment/redeem-points", payload);
         refetchBalance();

         toast.success("Wallet updated successfully");
      } catch (error) {
         console.error("Error updating wallet:", error);
         toast.error("Error updating wallet. Please try again.");
      }
      setIsLoading(false);
   };

   return (
      <DashboardLayout>
         <div style={{ height: "auto" }}>
            <TextBoxWithLine text="Referral Code" />
            <LineDivider width="95%" color="#DDDDDD" />
            <div className="grid grid-cols-2 px-5 py-3">
               <p style={{ fontWeight: "500" }} className="text-content mb-4 mt-2">
                  Your referral code is
               </p>
               <button
                  style={{
                     backgroundColor: "#F7F7F7",
                     color: "#7AB42C",
                     fontWeight: "600",
                  }}
                  className="mb-10 px-6 py-4 text-base"
               >
                  {balance?.[0]?.referralCode ?? 0}
               </button>
               <p style={{ fontWeight: "500" }} className="text-content mb-4 mt-2">
                  Your Total Points is
               </p>
               <button
                  style={{
                     backgroundColor: "#F7F7F7",
                     color: "#7AB42C",
                     fontWeight: "600",
                  }}
                  className="mb-10 px-6 py-4 text-base"
               >
                  {balance?.[0]?.points ?? 0}
               </button>
               <button
                  onClick={() => {
                     copyToClipboard(
                        `https://myfoodangels.com/account/register?ref=${balance?.[0]?.referralCode ?? 0}`,
                        "Referral Link Copied to Clipboard",
                     );
                  }}
                  className="flex items-center gap-2 text-center text-[1rem] font-[600] capitalize leading-[27px] text-primary-2 "
               >
                  Copy Link
                  <span>
                     <Copy size={17} className="text-black" />
                  </span>
               </button>
               <button
                  disabled={isLoading || balance?.[0]?.points <= 0}
                  onClick={() => {
                     withdrawToWallet();
                  }}
                  className=" gap-2 rounded-md  border border-primary-2 py-3 text-center text-[1rem] font-[600] capitalize leading-[27px] text-primary-2 disabled:cursor-not-allowed disabled:opacity-50"
               >
                  {isLoading ? (
                     <Spinner color="green" className="mx-auto text-primary-2" />
                  ) : (
                     "Withdraw to Wallet"
                  )}
               </button>
            </div>
         </div>
      </DashboardLayout>
   );
}

export default Page;
