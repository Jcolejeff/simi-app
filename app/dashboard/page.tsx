"use client";
import React from "react";
import RouteDisplay from "@/components/shared/route-display";
import Container from "@/components/shared/container";
import Sidebar from "./molecules/side-bar";
import DashboardLayout from "./molecules/dashboard-layout";
import { Text } from "@/components/ui/text";
import OrderTableDesktop from "@/components/dashboard/orders-history/OrderTableDesktop";
import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import useStore from "@/store";
import useQueryCollectionByField from "@/hooks/useFirebaseFieldQuery";
import { checkStatus, formatToNaira } from "@/lib/utils";
import useUserInfo from "@/hooks/useUser";
import EmptyContentWrapper from "@/hoc/EmptyContentWrapper";

function Page() {
   const { authDetails, setLoggedIn, setCurrentUser, setAuthDetails } = useStore((store) => store);
   const { data } = useQueryCollectionByField("orders", "userId", authDetails.id ?? "", true);

   return (
      <DashboardLayout backgroundColor="bg-transparent">
         <div className="flex h-full flex-col px-4 md:px-0">
            <div className="flex w-full flex-col gap-4 bg-gray-100 pb-4 md:flex-row">
               <div className="flex w-full flex-1 items-center justify-center bg-white">
                  <div className="flex flex-col items-center">
                     <div className="mt-6 h-[10rem] w-[10rem] rounded-full">
                        <Image
                           src={
                              authDetails?.photoURL ||
                              "https://images.unsplash.com/photo-1610513320995-1ad4bbf25e55?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dk"
                           }
                           alt="Profile Image"
                           className="h-full w-full rounded-full object-cover"
                           width={300}
                           height={300}
                        />
                     </div>
                     <Text size={"md"} weight={"semibold"}>
                        {authDetails?.firstName || ""} {authDetails?.lastName || ""}
                     </Text>
                     <Text size={"sm"}>Customer</Text>
                     <Link
                        href={"/dashboard/settings"}
                        className="mb-4 py-3 text-sm font-bold text-[#7AB42C]"
                     >
                        Edit profile
                     </Link>
                  </div>
               </div>

               <div className="w-full flex-1 items-start justify-center bg-white p-4">
                  <Text size={"sm"} className=" text-gray-600">
                     BILLING ADDRESS
                  </Text>
                  <div>
                     <Text size={"md"} weight={"bold"}>
                        {authDetails?.firstName || ""} {authDetails?.lastName || ""}
                     </Text>
                     <Text size={"sm"} className="text-gray-600">
                        {authDetails.addressDetails?.address || ""}{" "}
                        {authDetails.addressDetails?.state || ""}{" "}
                        {authDetails.addressDetails?.country || ""}{" "}
                        {authDetails.addressDetails?.zipcode || ""}
                     </Text>
                  </div>
                  <div className="mb-2 mt-6">
                     <Text size={"sm"}>{authDetails.email}</Text>
                     <Text size={"sm"}>{authDetails.phone || "Add Phone Number"}</Text>
                  </div>
                  <Link
                     href={"/dashboard/settings"}
                     className="mb-4 py-3 text-sm font-bold text-[#7AB42C]"
                  >
                     Edit Address
                  </Link>
               </div>
            </div>
            <div className="w-full bg-white p-4">
               <div className="flex items-center justify-between p-4">
                  <h1 className="text-[15px] font-bold">Recent Order History</h1>
                  <p className="text-sm text-[#7AB42C]">View all</p>
               </div>

               <EmptyContentWrapper
                  isEmpty={data && data?.length <= 0}
                  customMessage="No Orders Placed Yet"
                  className="flex h-full w-full items-center justify-center py-12 "
               >
                  <>
                     <div className="hidden w-full min-w-[500px] md:table">
                        <Table>
                           <TableHeader style={{ background: "#F2F2F2" }}>
                              <TableRow>
                                 <TableHead className="w-[100px]">ORDER ID</TableHead>
                                 <TableHead>DATE</TableHead>
                                 <TableHead>TOTAL</TableHead>
                                 <TableHead>STATUS</TableHead>
                                 <TableHead> </TableHead>
                              </TableRow>
                           </TableHeader>
                           <TableBody>
                              {data?.slice(0, 5)?.map((order, idx) => (
                                 <TableRow key={idx}>
                                    <TableCell className="font-medium">{order.orderId}</TableCell>
                                    <TableCell>{order.createdDate}</TableCell>
                                    <TableCell>{formatToNaira(order.totalAmount)}</TableCell>
                                    <TableCell>
                                       <span
                                          className={`${
                                             order.status.toLowerCase() === "delivered"
                                                ? "text-green-500"
                                                : order.status === "cancelled"
                                                  ? "text-red-500"
                                                  : "text-yellow-500"
                                          }`}
                                       >
                                          {order.status}
                                       </span>
                                    </TableCell>
                                    <TableCell style={{ color: "#7AB42C" }}>
                                       <Link href={`/dashboard/order-history/${order.orderId}`}>
                                          View Details
                                       </Link>
                                    </TableCell>
                                 </TableRow>
                              ))}
                           </TableBody>
                        </Table>
                     </div>
                     <div className="flex flex-col gap-2 md:hidden">
                        {data?.slice(0, 5)?.map((order, idx) => (
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
                                    {/* <span className="text-[12px] font-[400]">
                                 ({order.quantityPurchased}
                                 {order.quantityPurchased > 1 ? " Products" : " Product"})
                              </span> */}
                                 </p>
                                 <p
                                    className={`text-[10px] font-[400] capitalize  ${checkStatus(
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
                  </>
               </EmptyContentWrapper>
            </div>
         </div>
      </DashboardLayout>
   );
}

export default Page;
