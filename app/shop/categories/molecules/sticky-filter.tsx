"use client";
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Filter as FilterIcon } from "lucide-react";
import React from "react";

import {
   Accordion,
   AccordionItem,
   AccordionContent,
   AccordionTrigger,
} from "@/components/ui/accordion";

import styles from "../page.module.css";

import Price from "./price";
import ProductCategories from "./product-categories";
import Recommended from "./recommended";
import RecentlyViewed from "./recently-viewed";
import { Label } from "@/components/ui/label";
import { Filter } from "lucide-react";

export function StickyFilter() {
   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button variant="outline">
               <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7ab42c] ">
                  <Filter className="w-3 text-white" />
               </div>
            </Button>
         </DialogTrigger>
         <DialogContent className="h-[500px] w-[95%] bg-white">
            <aside className={`${styles.filter_section} flex-[1.5] p-2`}>
               <Button className="w-full rounded-2xl">
                  Filter
                  <FilterIcon className="w-3" />
               </Button>
               <Accordion
                  type="single"
                  collapsible
                  className="mt-3 w-full rounded-xl bg-white px-4 py-2"
               >
                  <ProductCategories />
                  {/* <Price /> */}
                  <Recommended />
                  <RecentlyViewed />
               </Accordion>
            </aside>
         </DialogContent>
      </Dialog>
   );
}
