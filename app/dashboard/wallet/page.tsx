"use client";
import React from "react";
import DashboardLayout from "../molecules/dashboard-layout";
import TextBoxWithLine from "@/components/dashboard/items-header";
import LineDivider from "@/components/dashboard/line-divider";
import CouponCard from "@/components/dashboard/coupon-card";
import WalletCard from "@/components/dashboard/my-wallet-card";
import { ChevronDown } from "lucide-react";
import MyWalletTransactionCard from "@/components/dashboard/my-wallet-transaction-card";
import {
   Select,
   SelectTrigger,
   SelectContent,
   SelectValue,
   SelectItem,
   SelectGroup,
} from "@/components/ui/select";
import { Copy, Eye, Plus } from "lucide-react";
import useStore from "@/store";
import useQueryCollectionByField from "@/hooks/useFirebaseFieldQuery";
import { reverseArray } from "@/lib/helpers";
import EmptyContentWrapper from "@/hoc/EmptyContentWrapper";

function Page() {
   const { authDetails } = useStore((store) => store);
   const { data: transactions, refetch } = useQueryCollectionByField(
      "transactions",
      "userId",
      authDetails.id ?? "",
   );
   const refetchTransactions = () => {
      refetch();
   };
   return (
      <DashboardLayout>
         <div className="h-auto">
            <TextBoxWithLine text="My Wallet" />
            {/* wallet card */}
            <div className="w-[40%]">
               <WalletCard refetchTransactions={refetchTransactions} />
            </div>
            <div className=" mt-10 max-h-[500px] overflow-scroll ">
               <p className="mb-2 ml-5 text-sm font-bold text-[#151515]">Payment Transactions</p>

               <EmptyContentWrapper
                  isEmpty={transactions && transactions?.length <= 0}
                  customMessage="No transactions yet"
                  className="flex h-full w-full items-center justify-center py-12 "
               >
                  <div>
                     {transactions &&
                        reverseArray(transactions[0]?.transactions ?? [])?.map(
                           (item: any, index: number) => {
                              console.log(item);
                              return (
                                 <MyWalletTransactionCard
                                    key={index}
                                    name={item?.type === "credit" ? "Credit" : "Debit"}
                                    date={new Date(item?.date.seconds * 1000).toDateString()}
                                    amount={item?.amount}
                                    type={item?.type}
                                 />
                              );
                           },
                        )}
                  </div>
               </EmptyContentWrapper>
            </div>
         </div>
      </DashboardLayout>
   );
}

export default Page;
