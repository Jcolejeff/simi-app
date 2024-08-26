import { format } from "date-fns";
import Link from "next/link";
import React from "react";

const OrderTableMobile = ({ pagedData }: { pagedData: any[] }) => {
   return (
      <div className="flex flex-col gap-2 md:hidden">
         {pagedData.map((order, idx) => (
            <div
               key={idx}
               className="grid grid-cols-[2fr,2fr,1.5fr] items-end gap-2 rounded-[16px] bg-slate-100 px-4 py-6"
            >
               <div>
                  <p className="mb-2 text-[14px] font-semibold text-[#1a1a1a]">{order.orderId}</p>
                  <p className="text-[10px] font-[400] text-[#828282]">
                     {format(new Date(order.datePurchased), "d LLL, y")}
                  </p>
               </div>
               <div>
                  <p className="mb-2 text-[14px] font-semibold text-[#1a1a1a]">
                     ₦{order.total}{" "}
                     <span className="text-[12px] font-[400]">
                        ({order.quantityPurchased}
                        {order.quantityPurchased > 1 ? " Products" : " Product"})
                     </span>
                  </p>
                  <p className="text-[10px] font-[400] capitalize text-[#333333]">
                     {order.transactionStatus}
                  </p>
               </div>
               <Link
                  href="/dashboard/order-history/something"
                  className="text-right text-[12px] font-medium text-[#7AB42C] hover:cursor-pointer hover:underline"
               >
                  View Details
               </Link>
            </div>
         ))}
      </div>
   );
};

export default OrderTableMobile;
