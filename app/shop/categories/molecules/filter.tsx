"use client";

import { Filter as FilterIcon } from "lucide-react";
import React from "react";

import {
   Accordion,
   AccordionItem,
   AccordionContent,
   AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import styles from "../page.module.css";

import Price from "./price";
import ProductCategories from "./product-categories";
import Recommended from "./recommended";
import RecentlyViewed from "./recently-viewed";
import useStore from "@/store";
function Filter() {
   const { setSelectedCategory } = useStore((state) => state);
   const clearFilters = () => {
      setSelectedCategory(null);
   };

   return (
      <aside className={`${styles.filter_section} flex-[1.5] p-2`}>
         <Button onClick={clearFilters} className="w-full rounded-2xl">
            Clear Filters
            <FilterIcon className="w-3" />
         </Button>
         <Accordion type="single" collapsible className="mt-3 w-full rounded-xl bg-white px-4 py-2">
            <ProductCategories />
            {/* <Price /> */}
            <Recommended />
            {/* <RecentlyViewed /> */}
         </Accordion>
      </aside>
   );
}

export default Filter;
