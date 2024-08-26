"use client";

import { ORDERHISTORY } from "@/components/dashboard/orders-history/mock-orders";
import DashboardLayout from "../molecules/dashboard-layout";
import { Button } from "@/components/ui/button";
import useClientPaginator from "@/hooks/useClientPagination";
import { Icon } from "@iconify/react";
import OrderTableDesktop from "@/components/dashboard/orders-history/OrderTableDesktop";
import { format } from "date-fns";
import Link from "next/link";
import useStore from "@/store";
import useQueryCollectionByField from "@/hooks/useFirebaseFieldQuery";
import { checkStatus, formatToNaira } from "@/lib/utils";
import EmptyContentWrapper from "@/hoc/EmptyContentWrapper";

const Page = () => {
   const { authDetails } = useStore((store) => store);
   const { data } = useQueryCollectionByField("orders", "userId", authDetails.id ?? "", true);

   const {
      handleNext,
      handlePrevious,
      isGreaterThanDataLength,
      isLessThanFirstPage,
      pagedData,
      setCurrentPage,
      pageNumbers,
      currentPage,
   } = useClientPaginator({ data: data ?? [], perPage: 5 });
   console.log(data);

   const btnClassName =
      "bg-slate-100 buttonStyle rounded-full button disabled:bg-[#F2F2F2] disabled:text-[#B3B3B3] w-[48px] h-[48px] text-2xl border border-[#E6E6E6] text-[#1A1A1A]";
   return (
      <DashboardLayout removePadding>
         <h1 className="px-4 py-4 pt-8 text-[20px] font-[500] md:pt-4">Order History</h1>

         <EmptyContentWrapper
            isEmpty={pagedData && pagedData.length <= 0}
            customMessage="No Orders Placed Yet"
            className="flex h-full w-full items-center justify-center py-12 "
         >
            <>
               <div className="hidden w-full overflow-auto md:block">
                  <OrderTableDesktop pagedData={pagedData} />
               </div>

               <div className="flex flex-col gap-2 md:hidden">
                  {pagedData.map((order, idx) => (
                     <div
                        key={idx}
                        className="grid grid-cols-[2fr,2fr,1.5fr] items-end gap-2 rounded-[16px] bg-slate-50 px-4 py-6"
                     >
                        <div>
                           <p className="mb-2 text-[14px] font-semibold text-[#1a1a1a]">
                              {order.orderId?.slice(0,6)}
                           </p>
                           <p className="text-[10px] font-[400] text-[#828282]">
                              {order.createdDate}
                           </p>
                        </div>
                        <div>
                           <p className="mb-2 text-[14px] font-semibold text-[#1a1a1a]">
                              {formatToNaira(order.totalAmount)}
                              <span className="text-[12px] font-[400]">
                                 {/* ({order.quantityPurchased}
                           {order.quantityPurchased > 1 ? " Products" : " Product"}) */}
                              </span>
                           </p>
                           <p
                              className={`text-[10px] font-[400] capitalize  text-green-500 ${checkStatus(
                                 order.status,
                              )}`}
                           >
                              {order.status}
                           </p>
                        </div>
                        <Link
                           href={`/dashboard/order-history/${order.orderId}`}
                           className="text-right text-[12px] font-medium text-[#7AB42C] hover:cursor-pointer hover:underline"
                        >
                           View Details
                        </Link>
                     </div>
                  ))}
               </div>
               <div className="my-12 flex flex-col items-center">
                  <div className="flex items-center gap-2">
                     <Button
                        aria-disabled={isLessThanFirstPage}
                        disabled={isLessThanFirstPage}
                        className={btnClassName}
                        onClick={handlePrevious}
                     >
                        <Icon icon="iconamoon:arrow-left-2" width="32" height="32" />
                     </Button>
                     {pageNumbers.map((page, idx) => (
                        <Button
                           className={`buttonStyle button h-[45px] w-[45px] rounded-full ${page === currentPage ? "bg-[#7AB42C] text-white" : "bg-white text-[#666666]"} text-[16px]`}
                           onClick={() => {
                              if (currentPage !== page) setCurrentPage(page);
                           }}
                           key={idx}
                        >
                           <span className="">{page}</span>
                        </Button>
                     ))}
                     <Button
                        aria-disabled={isGreaterThanDataLength}
                        disabled={isGreaterThanDataLength}
                        className={btnClassName}
                        onClick={handleNext}
                     >
                        <Icon icon="iconamoon:arrow-right-2" width="32" height="32" />
                     </Button>
                  </div>
               </div>
            </>
         </EmptyContentWrapper>
      </DashboardLayout>
   );
};

export default Page;
