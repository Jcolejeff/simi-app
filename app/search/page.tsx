"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useCallback, useEffect, useState } from "react";
import { getCreatedDateFromDocument, url } from "@/lib/utils";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import EmptyContentWrapper from "@/hoc/EmptyContentWrapper";
import CardsLoader from "@/hoc/CardsLoader";
import {
   Pagination,
   PaginationContent,
   PaginationEllipsis,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
} from "components/ui/pagination";
import ShopItem from "@/components/shared/shop-item";
import { ShopItem as ItemType } from "@/types";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "@/firebase";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Each from "@/components/helpers/each";
import useQueryCollectionByField from "@/hooks/useFirebaseFieldQuery";
interface DataEntry {
   name: string;
   details: Array<Array<string>>;
}

const ProductSearchPage = () => {
   const searchParams = useSearchParams();
   const query = searchParams.get("q");
   const [searchInput, setSearchInput] = useState<string>("");
   const router = useRouter();
   const pathname = usePathname();
   const { data, isSuccess, isError, isLoading } = useQueryCollectionByField(
      "products",
      "name",
      searchInput,
   );
   // Get a new searchParams string by merging the current
   // searchParams with a provided key/value pair
   const createQueryString = useCallback(
      (name: string, value: string) => {
         const params = new URLSearchParams(searchParams.toString());
         params.set(name, value.trim());

         return params.toString();
      },
      [searchParams],
   );

   useEffect(() => {
      if (query) {
         setSearchInput(query);
      }
   }, []);
   return (
      <div className="container relative mt-32 h-full w-full  max-w-[1700px]  scroll-mt-32 items-center    px-container-base   transition-all duration-500 ease-in-out  lg:px-container-lg xl:px-container-xl">
         <head>
            <title>Search | MyFoodAngels</title>
            <meta
               name="description"
               content="Search for products and services on MyFoodAngels. Find the best deals on groceries, fresh produce, and more."
            />
            <meta
               name="keywords"
               content="Search, MyFoodAngels, Online Shopping, Grocery Shopping, Fresh Produce"
            />
            <meta name="robots" content="index, follow" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            <link rel="icon" href="/icon.png" />
            <meta property="og:title" content="Search | MyFoodAngels" />
            <meta
               property="og:description"
               content="Search for products and services on MyFoodAngels. Find the best deals on groceries, fresh produce, and more."
            />
            <meta property="og:url" content="https://myfoodangels.com/search" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="/og.jpg" />
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content="Search | MyFoodAngels" />
            <meta
               property="twitter:description"
               content="Search for products and services on MyFoodAngels. Find the best deals on groceries, fresh produce, and more."
            />
            <meta property="twitter:image" content="/og.jpg" />
         </head>
         <section className=" mb-16">
            <h2 className="  mb-3 text-[1.2rem] font-[700]  leading-[130%] tracking-[0.02rem] transition-all duration-500 ease-in-out md:mb-0  md:text-[1.7rem] md:leading-[4rem] md:tracking-[0.0225rem]">
               {searchInput ? `Search Results for “${searchInput}”` : "Enter your search term"}
            </h2>
            <p className="text-xs font-medium md:text-base">
               {searchInput
                  ? `Showing ${data?.length ?? 0} products related to ${searchInput}`
                  : ""}
            </p>
            <div className="mt-6 flex items-center gap-2 pr-4 md:gap-6">
               <div className="w-full rounded-full border bg-white px-[1rem] shadow-sm   md:py-3">
                  <div className="flex h-full items-center md:gap-4">
                     <SearchIcon className="w-4 text-primary-9" />
                     <div className="flex-grow">
                        <Input
                           className="form-input placeholder:text-textColor-disabled w-full border-0 placeholder:text-xs focus:!ring-0"
                           type="text"
                           onChange={(e) => {
                              setSearchInput(e.target.value);
                              router.push(pathname + "?" + createQueryString("q", e.target.value));
                           }}
                           value={searchInput}
                           placeholder={"Find a course, or topic"}
                           name={"search"}
                        />
                     </div>
                  </div>
               </div>
               <Button
                  onClick={() => {
                     setSearchInput(searchInput);
                  }}
                  className="bg-primary-2 px-6  text-white md:py-4"
               >
                  Go
               </Button>
            </div>

            <section id="data">
               <EmptyContentWrapper
                  isEmpty={(!isLoading && data && data.length < 1) || isError}
                  customMessage="No product found at the moment."
                  className="mt-[3rem]"
               >
                  <CardsLoader isLoading={isLoading}>
                     <div className="w-full ">
                        <div className=" mt-[3rem] grid w-full grid-cols-1 place-items-stretch  gap-x-[1.5rem] gap-y-[1.875rem] md:grid-cols-3  ">
                           <Each
                              of={data ? data : []}
                              render={(item: ItemType, index: number) => (
                                 <ShopItem key={index} itemDetails={item} />
                              )}
                           />
                        </div>
                     </div>
                  </CardsLoader>
               </EmptyContentWrapper>
            </section>
         </section>
      </div>
   );
};

export default ProductSearchPage;
