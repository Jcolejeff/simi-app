import React from "react";
import DashboardLayout from "../molecules/dashboard-layout";
import TextBoxWithLine from "@/components/dashboard/items-header";
import Card from "@/components/dashboard/card";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, Plus } from "lucide-react";
import { Text } from "@/components/ui/text";
import paystack from "@/images/paystack.png";
import flutterwave from "@/images/flutterwave.png";
import visa from "@/images/blue_visa.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const paymentPlatforms = [
   { id: 1, title: "Paystack", imagehref: paystack },
   { id: 2, title: "Flutterwave", imagehref: flutterwave },
   { id: 3, title: "", imagehref: visa },
];

function page() {
   return (
      <DashboardLayout>
         <div className="h-auto">
            <TextBoxWithLine text="Payment Methods" />
            <Separator />
            <TextBoxWithLine text="Cards" />
            <div className="flex flex-col items-center gap-2 py-4 md:flex-row">
               <Card
                  className="bg-[#232323]"
                  cardType="visa"
                  cardNumber={"0234  5687  8945  567"}
                  expiryDate="2/14"
                  nameOnCard="CHIOMA AZUKA"
               />
               <Button variant={"ghost"} className="flex flex-col items-center justify-center">
                  <Plus className="mb-2 w-6 text-[#7ab42c]" />
                  <Text size={"xs"} weight={"medium"}>
                     Add a card
                  </Text>
               </Button>
            </div>
            <Separator />
            <div className="my-4 flex flex-wrap items-center justify-start gap-4">
               {paymentPlatforms.map((platform: any) => (
                  <div key={platform.id} className="flex items-center justify-start gap-1">
                     <Image src={platform.imagehref} className="w-8" alt={platform.title} />
                     <Text size={"sm"} weight={"medium"}>
                        {platform.title}
                     </Text>
                  </div>
               ))}
            </div>
            <Separator />
            <div className="mb-4 flex cursor-pointer items-center gap-2 p-4 hover:underline">
               <Text size={"sm"} weight={"medium"}>
                  Add more payment method
               </Text>{" "}
               <ChevronRight className="w-4" />
            </div>
         </div>
      </DashboardLayout>
   );
}

export default page;
