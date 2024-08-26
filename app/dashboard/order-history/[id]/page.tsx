import DashboardLayout from "../../molecules/dashboard-layout";
import { format } from "date-fns";
import CustomStepper from "@/components/shared/stepper/CustomStepper";
import { formatToNaira, reverseSplitStringByDashAndReplaceWithSpace } from "@/lib/utils";
import { db } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Order } from "@/types";
import { notFound } from "next/navigation";

import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import Image from "next/image";
interface params {
   params: {
      id: string;
   };
}
export const revalidate = 60;

async function Page({ params: { id } }: params) {
   const slug = id;
   async function queryCollectionByField(
      collectionName: string,
      fieldName: string,
      productSlug: string,
   ) {
      const q = query(collection(db, collectionName), where(fieldName, "==", productSlug));

      try {
         const querySnapshot = await getDocs(q);
         if (!querySnapshot.empty) {
            const firstDoc = querySnapshot.docs[0];
            return { id: firstDoc.id, ...firstDoc.data() };
         } else {
            console.log("No matching documents found.");
            return null;
         }
      } catch (error) {
         console.error("Error querying documents: ", error);
         return null;
      }
   }

   const order: Order | null = (await queryCollectionByField(
      "orders",
      "orderId",
      slug,
   )) as Order | null;

   if (!slug) return notFound();
   if (!order) return notFound();
   const TableHeadings = ["Product", "Price", "Quantity", "Subtotal"];
   const checkStepValue = (status: string) => {
      switch (status.toLowerCase()) {
         case "order received":
            return 1;
         case "pending":
            return 2;
         case "en route":
            return 3;
         case "delivered":
            return 4;
         default:
            return 1;
      }
   };
   return (
      <DashboardLayout removePadding>
         <div className="flex items-center gap-2 border-b px-4 py-4 text-[14px] text-[#4D4D4D]">
            <h1 className="text-[20px] font-[500]">Order Details</h1>
            <p>•</p>
            <p>{order.createdDate}</p>
            <p>•</p>
            <p></p>
         </div>
         <div className="my-4 grid gap-4 px-4 md:grid-cols-[2fr,1fr]">
            <div className="grid rounded-xl border md:grid-cols-2">
               <div>
                  <div className="p-4">
                     <div className="mb-8">
                        <p className="mb-2 text-[16px] leading-[24px] text-[#1A1A1A]">
                           {order.address}
                        </p>
                        <p className="text-[14px] text-[#666666]">{order.address}</p>
                     </div>
                     <div className="mb-2">
                        <p className=" text-[12px] uppercase text-[#999999]">Email</p>
                        <p className="break-all text-[14px] text-[#1A1A1A]">{order.email}</p>
                     </div>
                     <div>
                        <p className="text-[12px] uppercase text-[#999999]">Phone</p>
                        <p className="text-[14px] text-[#1A1A1A]">{order.phone}</p>
                     </div>
                  </div>
               </div>
            </div>
            <div className="rounded-xl border">
               <div className="flex gap-4 border-b p-4">
                  <div>
                     <p className="mb-[4px] text-[12px] uppercase text-[#999999]">Order ID:</p>
                     <p className="text-[14px] text-[#1A1A1A]">{order.orderId}</p>
                  </div>
                  <div>
                     {/* <p className="mb-[4px] text-[12px] uppercase text-[#999999]">
                        Payment Method:
                     </p>
                     <p className="text-[14px] text-[#1A1A1A]">Paypal</p> */}
                  </div>
               </div>
               <div className="flex flex-col gap-6 p-4">
                  {/* <div className="flex justify-between text-[14px]">
                     <p className="text-[#666666]">Subtotal:</p>
                     <p className="font-medium ">₦3365.00</p>
                  </div>
                  <div className="flex justify-between text-[14px]">
                     <p className="text-[#666666]">Discount</p>
                     <p className="font-medium ">20%</p>
                  </div>
                  <div className="flex justify-between border-b pb-6 text-[14px]">
                     <p className="text-[#666666]">Shipping</p>
                     <p className="font-medium ">Free</p>
                  </div> */}
                  <div className="flex justify-between text-[18px]">
                     <p className="capitalize text-[#1A1A1A]">total</p>
                     <p className="font-medium text-[#2C742F]">
                        {formatToNaira(order.totalAmount)}
                     </p>
                  </div>
               </div>
            </div>
         </div>
         <div className="px-4 md:py-12">
            {/* Add your stepper logic */}
            <CustomStepper
               steps={["Order received", "Pending", "En route", "Delivered"]}
               activeStep={checkStepValue(order.status)}
            />
         </div>
         {/* desktop */}
         <div className="hidden w-full overflow-auto px-4 md:block">
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
                  {order.cartItems.map((item, idx) => (
                     <TableRow className="border-none text-[#333333]" key={idx}>
                        <TableCell className="flex items-center gap-2">
                           <Image
                              alt="product-image"
                              src={item.image}
                              width={45}
                              height={45}
                              className="h-[45px] w-[45px]"
                           />
                           <span>{item.name}</span>
                        </TableCell>
                        <TableCell className="">{formatToNaira(item.price)}</TableCell>
                        <TableCell>x{item.no_of_items}</TableCell>
                        <TableCell className="">
                           {formatToNaira(item.no_of_items * item.price)}
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </div>
         {/* mobile */}
         <div className="px-4 md:hidden">
            <div className="mb-8 flex flex-col gap-4">
               {order.cartItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 rounded-xl bg-slate-100 p-4">
                     <Image
                        alt="product-image"
                        className="h-[80px] w-[80px]"
                        src={item.image}
                        width={80}
                        height={80}
                     />
                     <div>
                        <p className="mb-2 text-[14px] font-[500] text-[#1A1A1A]">{item.name}</p>
                        <div className="flex items-end gap-4">
                           <p className="text-[10px] text-[#767676]">
                              Price:{" "}
                              <span className="text-[14px] font-[500] text-[#1A1A1A]">
                                 {formatToNaira(item.price)}
                              </span>
                           </p>
                           <p className="text-[10px] text-[#767676]">
                              Qty:{" "}
                              <span className="text-[14px] font-[500] text-[#1A1A1A]">
                                 {item.no_of_items}
                              </span>
                           </p>
                        </div>
                        <p className="text-[10px] text-[#767676]">
                           Sub total:{" "}
                           <span className="text-[14px] font-[500] text-[#1A1A1A]">
                              {formatToNaira(item.no_of_items * item.price)}
                           </span>
                        </p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </DashboardLayout>
   );
}

export default Page;
