"use client";
import React from "react";
import DashboardLayout from "../molecules/dashboard-layout";
import AccountSettings from "./molecules/account-settings";
import BillingAddress from "./molecules/billing-address";
import PasswordChange from "./molecules/change-password";
import useUserInfo from "@/hooks/useUser";

function Page() {
   const { refetch } = useUserInfo();
   const refetchUserInfo = () => {
      refetch();
   };

   return (
      <DashboardLayout backgroundColor={"bg-transparent"}>
         <AccountSettings refetchUserInfo={refetchUserInfo} />
         <BillingAddress refetchUserInfo={refetchUserInfo} />
         <PasswordChange refetchUserInfo={refetchUserInfo} />
      </DashboardLayout>
   );
}

export default Page;
