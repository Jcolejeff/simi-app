"use client";

import React from "react";

import Container from "@/components/shared/container";
import { Text } from "@/components/ui/text";
import tomato from "@/images/tomato.png";
import CartMobile from "./molecules/cart-mobile";
import CartTable from "./molecules/cart-table";
import RouteDisplay from "../../../components/shared/route-display";

function page() {
   return (
      <div className="pt-[4rem]">
         <head>
            <title>Shopping cart | MyFoodAngels</title>
            <meta
               name="description"
               content="Review your shopping cart and checkout your items with MyFoodAngels. Shop for groceries, fresh produce, and more."
            />
            <meta
               name="keywords"
               content="Shopping Cart, MyFoodAngels, Online Shopping, Grocery Shopping, Checkout"
            />
            <meta name="robots" content="index, follow" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            <link rel="icon" href="/icon.png" />
            <meta property="og:title" content="Shopping cart | MyFoodAngels" />
            <meta
               property="og:description"
               content="Review your shopping cart and checkout your items with MyFoodAngels. Shop for groceries, fresh produce, and more."
            />
            <meta property="og:url" content="https://myfoodangels.com/shop/cart" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="/og.jpg" />
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content="Shopping cart | MyFoodAngels" />
            <meta
               property="twitter:description"
               content="Review your shopping cart and checkout your items with MyFoodAngels. Shop for groceries, fresh produce, and more."
            />
            <meta property="twitter:image" content="/og.jpg" />
         </head>
         <RouteDisplay route={"Shopping cart"} />
         <Container backgroundColor="bg-gray-100">
            <main className="mx-auto my-8 flex w-full max-w-[1200px] flex-col items-center justify-center gap-1 p-4">
               <Text size={"md"} weight={"semibold"}>
                  My Shopping cart
               </Text>
               <CartMobile />
               <CartTable />
            </main>
         </Container>
      </div>
   );
}

export default page;
