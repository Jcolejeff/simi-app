"use client";

import { Search, ArrowUpDown, ArrowUpDownIcon, SearchIcon } from "lucide-react";

import Each from "@/components/helpers/each";
import { Input } from "@/components/ui/input";

import useWindowDimensions from "@/hooks/useWindowDimensions";

import dummyimg from "../../images/dummy-category.png";
import { useRouter } from "next/navigation";

import "./categories.css";
import CategoryItem from "./category-item";
import { useState } from "react";
import { categoriesId, splitStringBySpaceAndReplaceWithDash } from "@/lib/utils";
import useCategories from "../shop/hooks/categories/useCategories";
import useStore from "@/store";
import Image from "next/image";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SearchBar from "@/components/shared/search";

interface category {
   id: number;
   img: any;
   title: string;
}

const herocategories: category[] = [
   { id: 1, img: dummyimg, title: "Fresh Fruit" },
   { id: 2, img: dummyimg, title: "Fresh Fruit" },
   { id: 3, img: dummyimg, title: "Fresh Fruit" },
   { id: 4, img: dummyimg, title: "Fresh Fruit" },
];

export default function Hero() {
   const { width } = useWindowDimensions();
   const router = useRouter();
   const [searchInput, setSearchInput] = useState("");
   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault(); // Prevent default form submission
      let link = `/search?q=${splitStringBySpaceAndReplaceWithDash(searchInput.trim() as string)}`;

      router.push(link);
   };
   const { setSelectedCategory, selectedCategory } = useStore((state) => state);
   const { data } = useCategories();
   return (
      <div
         className="relative flex h-[450px] flex-col items-center justify-center gap-6 border border-primary bg-primary px-4 pt-[80px]"
         style={{
            backgroundImage: `url(/images/home/herobg.png)`,
            backgroundRepeat: "repeat",
            backgroundSize: "contain",
         }}
      >
         <h2 className="mt-[3.75rem] hidden text-center text-3xl font-semibold text-white md:block">
            Need foodstuffs? ...
         </h2>

         <form
            className="flex w-full max-w-lg items-center justify-between "
            onSubmit={handleSubmit}
         >
            <SearchBar />
            <div className="flex h-fit  items-center justify-center  rounded-full bg-white px-4 py-3 md:hidden">
               <SearchIcon className="w-3" />
            </div>
         </form>

         <div className="category w-full max-w-lg p-2">
            <Each
               of={
                  data?.categories
                     ?.filter(
                        (item: any) =>
                           item.id !== categoriesId.farmOffTake &&
                           item.id !== categoriesId.flashSales,
                     )
                     ?.slice(0, 4) || []
               }
               render={(category: any, index: number) => (
                  <Link
                     href={`/shop/categories`}
                     onClick={() => setSelectedCategory(category.id)}
                     style={{
                        display: "flex",
                        flexDirection: "column",
                     }}
                     className="flex flex-col items-center justify-center"
                     key={index}
                  >
                     <div className="overflow-hidden rounded-full bg-white px-2 py-2">
                        <Image
                           src={category.image}
                           alt={category.name}
                           width={70}
                           height={50}
                           className="h-16 w-16 rounded-full object-cover"
                        />
                     </div>
                     <Text
                        variant={"white"}
                        weight={"medium"}
                        className="text-center text-xs capitalize lg:text-sm"
                     >
                        {category.name?.slice(0, 14)}..
                     </Text>
                  </Link>
               )}
            />
         </div>
      </div>
   );
}
