import React from "react";
import DashboardLayout from "../molecules/dashboard-layout";
import { Text } from "@/components/ui/text";

function page() {
   return (
      <DashboardLayout>
         <div className="border border-gray-300">
            <Text>Pre Orders</Text>
         </div>
      </DashboardLayout>
   );
}

export default page;
