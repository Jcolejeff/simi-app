import { Text } from "../ui/text";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import Image from "next/image";
import { recentBlogs } from "./mockData";

const RecentlyAddedBlogs = ({ isHidden }: { isHidden?: boolean }) => {
   return (
      <div
         className={`rounded-xl bg-white p-4 text-[#1A1A1A] ${isHidden ? "hidden md:block" : ""}`}
      >
         <Text className="mb-2 text-[24px] font-medium">Recently Added</Text>
         <div className="flex flex-col gap-4">
            {recentBlogs.map(({ title, dateAdded, image }, index) => (
               <div
                  onClick={() => {}}
                  className="group grid grid-cols-[80px,1fr] gap-2 hover:cursor-pointer"
                  key={index}
               >
                  <Image
                     alt="recent-blog-img"
                     src={image}
                     className="h-full max-h-[60px] w-full rounded object-cover"
                  />
                  <div>
                     <Text className="mb-2 text-[16px] font-medium text-[#1A1A1A] group-hover:underline">
                        {title}
                     </Text>
                     <span className="flex items-center gap-2 text-[14px]">
                        <CalendarIcon color="#7AB42C" />
                        <Text className="text-[14px] text-[#666666]">
                           {format(dateAdded, "LLL d y")}
                        </Text>
                     </span>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default RecentlyAddedBlogs;
