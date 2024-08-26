"use client";

import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import React from "react";
import { TableHeadings } from "./mock-orders";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { checkStatus, formatToNaira } from "@/lib/utils";

const OrderTableDesktop = ({ pagedData }: { pagedData: any[] }) => {
   const { push } = useRouter();

   return (
      <Table className="w-full py-[0px]">
         <TableHeader className="bg-[#F2F2F2]">
            <TableRow className="border-none px-6">
               {TableHeadings.map((heading, idx) => (
                  <TableHead key={idx} className="text-xs uppercase">
                     {heading}
                  </TableHead>
               ))}
            </TableRow>
         </TableHeader>
         <TableBody>
            {pagedData.map((order, idx) => (
               <TableRow className="border-none text-[#333333]" key={idx}>
                  <TableCell className="">{order.orderId}</TableCell>
                  <TableCell className="whitespace-nowrap">{order.createdDate}</TableCell>
                  <TableCell className="">
                     <span className="font-medium"> {formatToNaira(order.totalAmount)}</span>
                     {/* ({order.quantityPurchased}
                     {order.quantityPurchased > 1 ? " Products" : " Product"}) */}
                  </TableCell>
                  <TableCell className="capitalize">
                     {" "}
                     <span className={`${checkStatus(order.status)}`}>{order.status}</span>
                  </TableCell>
                  <TableCell
                     onClick={() => push(`/dashboard/order-history/${order.orderId}`)}
                     className="text-right font-medium text-[#7AB42C] hover:cursor-pointer hover:underline"
                  >
                     View Details
                  </TableCell>
               </TableRow>
            ))}
         </TableBody>
      </Table>
   );
};

export default OrderTableDesktop;
