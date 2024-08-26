import React, { useState } from "react";
import { useSearchBox, useHits, Hits } from "react-instantsearch";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Paperclip, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const Hit = ({ hit }: { hit: any }) => {
   console.log(hit);
   return (
      <Link
         href={`/shop/${hit.slug}`}
         className="flex items-center  gap-2 p-2 capitalize hover:bg-gray-100"
      >
         <Paperclip className="w-4" />
         <div>
            <p className="text-sm">{hit.name}</p>
            <p className="text-xs">{hit.desc.slice(0, 30)}</p>
         </div>
      </Link>
   );
};

const SearchBar: React.FC = () => {
   const [isOpen, setIsOpen] = useState(false);
   const { query, refine } = useSearchBox();
   const { hits } = useHits();

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      refine(e.target.value);
   };

   return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
         <DialogTrigger asChild>
            <Button variant="ghost" className="relative w-full">
               <Search className="absolute left-6 top-1/2 w-4 -translate-y-1/2 transform md:hidden" />
               <Input
                  className="w-full rounded-full bg-white py-6 pl-[40px] md:pl-2"
                  placeholder="I am looking for..."
                  name="search"
                  readOnly
               />
               <Search className="absolute right-8 top-1/2 hidden w-4 -translate-y-1/2 transform md:block" />
            </Button>
         </DialogTrigger>
         <DialogContent className="w-[95%] max-w-md bg-white">
            <div className="">
               <Input
                  type="search"
                  placeholder="Search..."
                  value={query}
                  onChange={handleInputChange}
                  className="w-full"
               />
            </div>
            {query && (
               <div className="mt-4 max-h-[60vh] overflow-y-auto">
                  {hits.map((hit) => (
                     <Hit key={hit.objectID} hit={hit} />
                  ))}
               </div>
            )}
            {/* {query && <Hits hitComponent={Hit} />} */}
         </DialogContent>
      </Dialog>
   );
};

export default SearchBar;
